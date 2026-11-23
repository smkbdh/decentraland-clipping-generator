"""Clean up the hood/mantle texture where the portrait bake is smeared (sides, under the arms).

    blender -b AI_BUDDAH_MASTER.blend --python paint_mantle.py -- out.blend

The portrait bake (640x189, projected from the front) is sharp only on surfaces that faced the camera.
On the sides of the mantle it stretched into dark streaks that read as a blurry slab in 3/4 shots.
This script transfers the old texture to a new 2048 smart-projected UV (Cycles bake), bakes position and
normal into the same layout, and keeps the art where the surface faced the camera while painting the
rest as clean cloth in the same colours with baked light (the render is FLAT). Idempotent.
"""
import bpy, sys, math
import numpy as np

OBJECTS = {"Hood and mantle": "dark", "Wrapped robe": "warm"}   # object -> which trusted colour fills the sides
TEX = 2048
UVN = "CleanUV"


def sstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def ensure_uv(ob):
    me = ob.data
    if UVN in me.uv_layers:
        me.uv_layers.active = me.uv_layers[UVN]
        return
    src = me.uv_layers.active
    me.uv_layers.new(name=UVN)
    me.uv_layers.active = me.uv_layers[UVN]
    bpy.ops.object.select_all(action="DESELECT")
    bpy.context.view_layer.objects.active = ob; ob.select_set(True)
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.uv.smart_project(angle_limit=math.radians(55), island_margin=.006)
    bpy.ops.object.mode_set(mode="OBJECT")


def bake_to(ob, img, build):
    """Bake an emission network (build(nodes, links) -> socket) into img on the active UV."""
    mat = ob.data.materials[0]
    nt = mat.node_tree
    out = next(n for n in nt.nodes if n.type == "OUTPUT_MATERIAL")
    old_link = out.inputs["Surface"].links[0].from_socket if out.inputs["Surface"].links else None
    em = nt.nodes.new("ShaderNodeEmission")
    nt.links.new(build(nt.nodes, nt.links), em.inputs["Color"])
    nt.links.new(em.outputs["Emission"], out.inputs["Surface"])
    tgt = nt.nodes.new("ShaderNodeTexImage"); tgt.image = img
    for n in nt.nodes:
        n.select = False
    tgt.select = True; nt.nodes.active = tgt
    bpy.ops.object.bake(type="EMIT", margin=8, use_clear=True)
    nt.nodes.remove(tgt); nt.nodes.remove(em)
    if old_link:
        nt.links.new(old_link, out.inputs["Surface"])


def pixels(img):
    a = np.empty(img.size[0] * img.size[1] * 4, np.float32)
    img.pixels.foreach_get(a)
    return a.reshape(img.size[1], img.size[0], 4)


def process(obj_name, kind):
    ob = bpy.data.objects[obj_name]
    mat = ob.data.materials[0]
    src_tex = next(n for n in mat.node_tree.nodes if n.type == "TEX_IMAGE" and n.image)
    if not ob.get("mantle_src"):
        ob["mantle_src"] = src_tex.image.name          # the original portrait bake, reused on re-runs
    src_img = bpy.data.images[ob["mantle_src"]]
    portrait = "PortraitUV"          # a name: layer references go stale once a UV layer is added
    ensure_uv(ob)
    scene = bpy.context.scene
    engine = scene.render.engine
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = 1
    bpy.ops.object.select_all(action="DESELECT")
    bpy.context.view_layer.objects.active = ob; ob.select_set(True)

    def img(name, float_buffer):
        im = bpy.data.images.get(name)
        if im:
            bpy.data.images.remove(im)
        im = bpy.data.images.new(name, TEX, TEX, alpha=False, float_buffer=float_buffer)
        if float_buffer:
            im.colorspace_settings.name = "Non-Color"
        return im

    col_img, pos_img, nrm_img = img("mantle_col", True), img("mantle_pos", True), img("mantle_nrm", True)

    def colour(nodes, links):
        uv = nodes.new("ShaderNodeUVMap"); uv.uv_map = portrait
        t = nodes.new("ShaderNodeTexImage"); t.image = src_img; t.interpolation = "Cubic"
        links.new(uv.outputs["UV"], t.inputs["Vector"])
        return t.outputs["Color"]

    def geo(which):
        def f(nodes, links):
            g = nodes.new("ShaderNodeNewGeometry")
            if which == "Position":
                m = nodes.new("ShaderNodeVectorMath"); m.operation = "MULTIPLY_ADD"
                m.inputs[1].default_value = (.25, .25, .25); m.inputs[2].default_value = (.5, .5, 0)
                links.new(g.outputs["Position"], m.inputs[0])
                return m.outputs["Vector"]
            m = nodes.new("ShaderNodeVectorMath"); m.operation = "MULTIPLY_ADD"
            m.inputs[1].default_value = (.5, .5, .5); m.inputs[2].default_value = (.5, .5, .5)
            links.new(g.outputs["Normal"], m.inputs[0])
            return m.outputs["Vector"]
        return f

    bake_to(ob, col_img, colour)
    bake_to(ob, pos_img, geo("Position"))
    bake_to(ob, nrm_img, geo("Normal"))
    scene.render.engine = engine

    col = pixels(col_img)[..., :3]                       # linear (float image of an sRGB texture)
    nrm = pixels(nrm_img)[..., :3] * 2 - 1
    pos = (pixels(pos_img)[..., :3] - np.array([.5, .5, 0])) / .25
    filled = np.linalg.norm(nrm, axis=2) > .5
    srgb = np.where(col <= .0031308, col * 12.92, 1.055 * np.clip(col, 0, None) ** (1 / 2.4) - .055)
    # the art was projected from the front and the back: it is trustworthy where the surface faced either
    facing = np.abs(nrm[..., 1])
    keep = sstep(.30, .65, facing)
    # clean cloth colour for the sides: median of the trusted cloth of this kind
    lum = srgb.mean(axis=2)
    pick = (lum < .35) if kind == "dark" else (srgb[..., 0] > srgb[..., 1] * 1.3) & (lum > .22)
    trusted = filled & (keep > .9) & pick
    base = np.median(srgb[trusted], axis=0) if trusted.sum() > 100 else np.array([.16, .12, .15])
    if kind == "dark":
        base = np.maximum(base, np.array([40, 30, 42]) / 255)   # same plum black as the sleeves, never flat 0
    lo, hi = base * .55, np.minimum(base * 1.6 + .02, 1)
    shade = np.clip(.62 + .25 * nrm[..., 2] + .25 * facing, 0, 1)
    clean = lo * (1 - shade[..., None]) + base * shade[..., None]
    clean = clean + (hi - base) * np.clip(shade - .8, 0, None)[..., None] / .2
    # soft vertical folds on the hanging panels
    folds = .12 * np.exp(-((np.sin(pos[..., 0] * 38 + pos[..., 1] * 9) - .7) / .35) ** 2) * sstep(1.45, .9, pos[..., 2])
    clean *= (1 - folds)[..., None]
    final = srgb * keep[..., None] + clean * (1 - keep[..., None])
    final[~filled] = base
    lin = np.where(final <= .04045, final / 12.92, ((final + .055) / 1.055) ** 2.4)

    name = obj_name + " clean"
    res = bpy.data.images.get(name)
    if res:
        src_tex.image = src_img
        bpy.data.images.remove(res)
    res = bpy.data.images.new(name, TEX, TEX, alpha=False, float_buffer=True)
    res.pixels.foreach_set(np.concatenate([lin, np.ones(lin.shape[:2] + (1,))], 2).astype(np.float32).ravel())
    res.update(); res.pack()
    src_tex.image = res
    uvn = next((n for n in mat.node_tree.nodes if n.type == "UVMAP"), None) or mat.node_tree.nodes.new("ShaderNodeUVMap")
    uvn.uv_map = UVN
    mat.node_tree.links.new(uvn.outputs["UV"], src_tex.inputs["Vector"])
    ob.data.uv_layers[UVN].active_render = True
    for n in ("mantle_col", "mantle_pos", "mantle_nrm"):
        bpy.data.images.remove(bpy.data.images[n])
    print("cleaned", obj_name, "base", np.round(base * 255).astype(int))


def main():
    out = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else bpy.data.filepath
    for name, kind in OBJECTS.items():
        process(name, kind)
    bpy.ops.wm.save_as_mainfile(filepath=out)
    print("SAVED", out)


main()
