"""Repaint the bell sleeves as clean toon cloth (replaces the blurry 640x204 portrait bake).

    blender -b AI_BUDDAH_MASTER.blend --python paint_sleeves.py -- out.blend

The portrait bake only had real detail on the front of the sleeve; sides, back and the inside were smeared
orange/black, and a lifted arm put exactly those parts on screen. This script:
  * gives each sleeve a cylindrical UV (around the sleeve x along it) in rest pose,
  * paints a 2048 texture in those coordinates: dark plum cloth with soft baked light (the render is FLAT),
    a few long folds, a glowing gold lotus on the outer upper arm, a dotted gold stitch and a cuff trim,
  * adds a Solidify shell so the inside of the bell reads as orange lining with a gold rim.
Re-running replaces the previous result (idempotent).
"""
import bpy, sys, math
import numpy as np
from mathutils import Vector

TEX = 2048
SHOULDER = {"R": Vector((.36, 0, 1.52))}
ELBOW = {"R": Vector((.48, -.08, 1.23))}
CUFF = {"R": Vector((.541, -.165, .972))}
for d in (SHOULDER, ELBOW, CUFF):
    d["L"] = Vector((-d["R"].x, d["R"].y, d["R"].z))

CLOTH = np.array([40, 29, 42]) / 255      # plum black, sampled from the sleeve front in the art
CLOTH_HI = np.array([92, 68, 90]) / 255
CLOTH_LO = np.array([12, 8, 13]) / 255
GOLD = np.array([255, 196, 92]) / 255
GOLD_DEEP = np.array([214, 120, 40]) / 255
LINING = (0.80, 0.36, 0.10)              # linear-ish display colours for the plain materials
LINING_DEEP = (0.035, 0.018, 0.02)     # shadowed inside of the bell
RIM = (0.93, 0.62, 0.22)
SEAM = math.radians(-140)                 # texture seam on the back/body side, never in view


def s2l(c):
    c = np.asarray(c, float)
    return np.where(c <= .04045, c / 12.92, ((c + .055) / 1.055) ** 2.4)


def sstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def axis_param(p, side):
    """Closest point on shoulder->elbow->cuff polyline: (s in 0..1 by arc length, point, tangent)."""
    a, b, c = SHOULDER[side], ELBOW[side], CUFF[side]
    l1, l2 = (b - a).length, (c - b).length
    best = None
    for (p0, p1, off, ln) in ((a, b, 0.0, l1), (b, c, l1, l2)):
        d = p1 - p0
        t = max(0.0, min(1.0, (p - p0).dot(d) / d.length_squared))
        q = p0 + d * t
        dist = (p - q).length
        if best is None or dist < best[0]:
            best = (dist, (off + t * ln) / (l1 + l2), q, d.normalized())
    return best[1], best[2], best[3], l1 + l2


def frame(tangent, side):
    out = Vector((1 if side == "R" else -1, 0, 0))
    out = (out - tangent * out.dot(tangent)).normalized()
    front = tangent.cross(out).normalized()
    if front.y > 0:
        front = -front
    return out, front


def build_uv(sl, side):
    me = sl.data
    uv = me.uv_layers.get("ToonUV") or me.uv_layers.new(name="ToonUV")
    mw = sl.matrix_world
    vu, vv, radius = {}, {}, {}
    for v in me.vertices:
        p = mw @ v.co
        s, q, tan, total = axis_param(p, side)
        out, front = frame(tan, side)
        r = p - q
        th = math.atan2(r.dot(front), r.dot(out))
        vu[v.index] = ((th - SEAM) % (2 * math.pi)) / (2 * math.pi)
        vv[v.index] = s
        radius[v.index] = (r - tan * r.dot(tan)).length
    for f in me.polygons:
        us = [vu[me.loops[li].vertex_index] for li in f.loop_indices]
        wrap = max(us) - min(us) > .5
        for li in f.loop_indices:
            vi = me.loops[li].vertex_index
            u = vu[vi] + (1 if wrap and vu[vi] < .5 else 0)
            uv.data[li].uv = (u, 1 - vv[vi])
    uv.active = True
    uv.active_render = True
    # mean radius along the sleeve, for metric painting
    bins = np.zeros(32); cnt = np.zeros(32)
    for i, s in vv.items():
        k = min(31, int(s * 32)); bins[k] += radius[i]; cnt[k] += 1
    prof = np.where(cnt > 0, bins / np.maximum(cnt, 1), np.nan)
    good = ~np.isnan(prof)
    prof = np.interp(np.arange(32), np.flatnonzero(good), prof[good])
    return prof, total


def lotus_mask(x, y, w):
    """Outline lotus, metres; petals point toward -y (the shoulder). Returns line intensity 0..1."""
    lines = np.zeros_like(x)

    def petal(cx, cy, ang, a, b):
        ca, sa = math.cos(ang), math.sin(ang)
        dx, dy = x - cx, y - cy
        px, py = dx * ca + dy * sa, -dx * sa + dy * ca
        # pointed petal: ellipse narrowed toward the tip
        tip = np.clip(-py / b, 0, 1)
        aa = a * (1 - .65 * tip ** 1.6)
        d = np.sqrt((px / np.maximum(aa, 1e-4)) ** 2 + (py / b) ** 2)
        edge = np.abs(d - 1) * np.minimum(aa, b)
        return np.clip(1 - edge / w, 0, 1)

    lines = np.maximum(lines, petal(0, 0, 0, .0105, .030))
    for sg in (-1, 1):
        lines = np.maximum(lines, petal(sg * .016, .006, sg * .55, .0095, .025))
        lines = np.maximum(lines, petal(sg * .029, .016, sg * 1.05, .0085, .020))
    base = np.clip(1 - np.abs(np.sqrt(x ** 2 + ((y - .010) * 2.2) ** 2) - .028) / w, 0, 1)
    base *= (y > .018)
    return np.maximum(lines, base)


def paint(prof, total, side):
    n = TEX
    u = (np.arange(n) + .5) / n
    v = (np.arange(n) + .5) / n
    U, V = np.meshgrid(u, v)
    s = 1 - V                                   # 0 shoulder .. 1 cuff
    th = U * 2 * math.pi + SEAM
    th = (th + math.pi) % (2 * math.pi) - math.pi
    r = np.interp(s * 31, np.arange(32), prof)
    # baked light: key from front-top-outside, soft wrap, darker toward the armpit and inside the bell
    nx, ny = np.cos(th), np.sin(th)             # out, front components of the cloth normal
    key = np.clip(.35 * nx + .80 * ny + .25, 0, None) / 1.4
    shade = .30 + .70 * key ** .8
    shade *= 1 - .25 * sstep(.20, .0, s)        # armpit
    shade *= 1 - .18 * sstep(.25, 1.0, -nx)     # body side
    # long soft folds drifting along the sleeve
    folds = np.zeros_like(s)
    for k, (c, drift, wdt, depth) in enumerate([(.6, .9, .10, .30), (1.5, -.6, .14, .22), (-.4, .5, .12, .25),
                                                  (2.4, .7, .10, .18), (-1.6, -.8, .15, .20)]):
        d = np.angle(np.exp(1j * (th - (c + drift * s))))
        folds += depth * np.exp(-(d / wdt) ** 2) * sstep(.15, .55, s)
    shade *= 1 - folds
    hi = np.clip(shade - .75, 0, None) / .25
    col = CLOTH_LO[None, None] * (1 - shade[..., None]) + CLOTH[None, None] * shade[..., None]
    col = col * (1 - hi[..., None]) + CLOTH_HI[None, None] * hi[..., None]
    # lotus on the outer upper arm, a little toward the front
    th0, s0, k = math.radians(48), .42, 1.8
    x = np.angle(np.exp(1j * (th - th0))) * r / k
    y = -(s - s0) * total / k                 # petals point to the shoulder
    line = lotus_mask(x, y, .0016)
    glow = lotus_mask(x, y, .0045) * .45
    g = np.clip(line + glow * (1 - line), 0, 1)[..., None]
    gold = GOLD_DEEP[None, None] * (1 - line[..., None]) + GOLD[None, None] * line[..., None]
    col = col * (1 - g) + gold * g
    # dotted stitch around the forearm and a solid trim at the cuff
    stitch_s = .80
    dash = (np.sin(th * r * 2 * math.pi / .012) > .2).astype(float)
    st = np.clip(1 - np.abs(s - stitch_s) * total / .0016, 0, 1) * dash * (key * .7 + .3)
    col = col * (1 - st[..., None] * .9) + GOLD_DEEP[None, None] * st[..., None] * .9
    trim = np.clip(1 - np.abs(s - .955) * total / .0028, 0, 1) * (key * .6 + .4)
    col = col * (1 - trim[..., None]) + GOLD[None, None] * trim[..., None]
    rgba = np.concatenate([np.clip(col, 0, 1), np.ones((n, n, 1))], axis=2)   # byte image: sRGB values
    return rgba[::-1].astype(np.float32)        # image rows start at the bottom; V was top-down


def plain_material(name, rgb):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    m.diffuse_color = (*rgb, 1)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = (*rgb, 1)
    return m


def main():
    out = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else bpy.data.filepath
    for side in ("R", "L"):
        sl = bpy.data.objects["Sleeve." + side]
        prof, total = build_uv(sl, side)
        img_name = f"Sleeve.{side} toon"
        img = bpy.data.images.get(img_name) or bpy.data.images.new(img_name, TEX, TEX, alpha=False)
        if tuple(img.size) != (TEX, TEX):
            img.scale(TEX, TEX)
        img.pixels.foreach_set(paint(prof, total, side).ravel())
        img.update(); img.pack()
        mat = sl.data.materials[0]
        tex = next(nd for nd in mat.node_tree.nodes if nd.type == "TEX_IMAGE")
        tex.image = img
        tex.extension = "REPEAT"
        tex.interpolation = "Cubic"
        uvn = next((nd for nd in mat.node_tree.nodes if nd.type == "UVMAP"), None) or mat.node_tree.nodes.new("ShaderNodeUVMap")
        uvn.uv_map = "ToonUV"
        mat.node_tree.links.new(uvn.outputs["UV"], tex.inputs["Vector"])
        # lining shell: slots 0 cloth, 1 cuff lining cap, 2 lining, 3 deep lining (cap's shell), 4-5 rim
        mats = sl.data.materials
        want = [mats[0], mats[1], plain_material(f"Sleeve lining {side}", LINING),
                plain_material(f"Sleeve lining deep {side}", LINING_DEEP), plain_material(f"Sleeve rim {side}", RIM), plain_material(f"Sleeve rim {side}", RIM)]
        while len(mats) < 6:
            mats.append(None)
        for i, m in enumerate(want):
            mats[i] = m
        mats[1].diffuse_color = (*LINING_DEEP, 1)
        mod = sl.modifiers.get("Lining") or sl.modifiers.new("Lining", "SOLIDIFY")
        mod.thickness = .006
        mod.offset = -1.0
        mod.use_rim = True
        mod.use_even_offset = False      # even offset spikes on the gathered cuff
        mod.use_quality_normals = True
        mod.material_offset = 2
        mod.material_offset_rim = 4
        # added after the armature modifier, so the shell follows the deformed cloth
    bpy.ops.wm.save_as_mainfile(filepath=out)
    print("SAVED", out)


main()
