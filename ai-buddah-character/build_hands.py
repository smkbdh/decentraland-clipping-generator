"""AI Buddah toy hands v3 — rigged chibi hands with finger bones, painted for Workbench FLAT.

blender -b D:/Buddah/AI_BUDDAH_MASTER.blend --python build_hands.py -- <out.blend>

What it does:
  * moves Hand_L/R onto the visual wrist and adds 15 finger bones per hand (Thumb1..3, Index1..3, ...);
  * builds each hand from smooth separate parts (palm + 5 digits, joints are spheres, so bending never tears);
  * skins every ring of a digit to its phalanx bones (soft blend at the joints, preserve volume);
  * paints one shared 2048 texture in the parts' own coordinates: lit back, warm side shadows, pink palm,
    flushed fingertips, joint creases. The shading follows each finger when it bends, so poses stay readable
    with the flat, unlit render;
  * sets the "relaxed" shape from hand_gestures.py as the default pose.
"""
import bpy, bmesh, sys, math, os
import numpy as np
from mathutils import Vector, Matrix

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import hand_gestures as hg  # noqa: E402

OUT = sys.argv[sys.argv.index("--") + 1]
ARM = bpy.data.objects["Armature_Buddah"]
N = 28  # verts per ring
SCALE = 1.25  # chibi hands are big; the design below is in unscaled units

# sRGB palette sampled from the face paint
LIGHT = np.array([251, 166, 116]) / 255
MID = np.array([240, 147, 99]) / 255
SHADOW = np.array([212, 120, 80]) / 255
DEEP = np.array([170, 90, 58]) / 255
PALM = np.array([252, 178, 136]) / 255
FLUSH = np.array([238, 128, 102]) / 255

# ---------------------------------------------------------------- design (local hand space)
# X across (+ toward the pinky), Y back of the hand, Z up the arm (fingers hang toward -Z)
DIGITS = {
    #        head                 direction          back       phalanges            r_base  r_mid   r_tip
    "Index": ((-.050, .004, -.096), (-.10, 0, -1), (0, 1, 0), (.037, .026, .024), .0200, .0186, .0174),
    "Middle": ((-.0165, .005, -.101), (-.015, 0, -1), (0, 1, 0), (.040, .028, .025), .0206, .0192, .0178),
    "Ring": ((.017, .004, -.098), (.07, 0, -1), (0, 1, 0), (.037, .026, .024), .0196, .0182, .0170),
    "Pinky": ((.049, .002, -.090), (.17, 0, -1), (0, 1, 0), (.030, .021, .020), .0170, .0160, .0150),
    "Thumb": ((-.047, -.014, -.032), (-.50, -.38, -.78), (-.80, .50, -.10), (.040, .030, .027), .0275, .0218, .0192),
}


def side_frame(sign):
    across = np.array([.70 * sign, .714, 0]); across /= np.linalg.norm(across)
    dorsal = np.array([.714 * sign, -.70, 0]); dorsal /= np.linalg.norm(dorsal)
    up = np.array([0., 0., 1.])
    wrist = np.array([sign * .528, -.215, 1.012])
    return across, dorsal, up, wrist


def nrm(v):
    v = np.asarray(v, float); return v / np.linalg.norm(v)


def sstep(a, b, x):
    t = np.clip((np.asarray(x, float) - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)


def digit_frame(spec):
    head, d, back, lens, rb, rm, rt = spec
    d = nrm(d); back = np.asarray(back, float); back = nrm(back - d * back.dot(d))
    lat = np.cross(d, back)
    return np.asarray(head, float), d, back, lat, lens, rb, rm, rt


def digit_rings(spec):
    """Rings (s, rx, ry) along a digit; s from the base pole (-rb) to the tip pole (L)."""
    head, d, back, lat, lens, rb, rm, rt = digit_frame(spec)
    L = sum(lens); j1, j2 = lens[0], lens[0] + lens[1]
    rings = []
    for k in range(8):  # base hemisphere centred on the knuckle -> bending keeps the joint closed
        phi = -math.pi / 2 + (math.pi / 2) * k / 8
        rings.append((rb * math.sin(phi), rb * math.cos(phi)))
    shaft_end = L - rt
    steps = max(12, int(shaft_end / .0022))
    for k in range(steps + 1):
        s = shaft_end * k / steps
        if s < j1:
            r = rb + (rm - rb) * sstep(0, j1, s)
        else:
            r = rm + (rt - rm) * sstep(j1, shaft_end, s)
        bump = .045 * math.exp(-((s - j1) / .006) ** 2) + .035 * math.exp(-((s - j2) / .005) ** 2)
        waist = -.03 * math.exp(-((s - (j1 + j2) / 2) / .008) ** 2)
        rings.append((s, r * (1 + bump + waist)))
    for k in range(1, 10):
        phi = (math.pi / 2) * k / 9
        rings.append((shaft_end + rt * math.sin(phi), rt * math.cos(phi)))
    return rings, (head, d, back, lat, lens, L, j1, j2, rb, rt)


PALM_KNOTS = [  # z, half-width, half-thickness, y offset of the centre
    (.105, .000, .000, -.002), (.100, .040, .030, -.002), (.092, .055, .038, -.002), (.075, .060, .039, -.002),
    (.045, .062, .036, -.002), (.020, .063, .034, -.002), (.000, .064, .033, -.002), (-.025, .064, .034, -.003), (-.050, .071, .036, -.004),
    (-.072, .074, .035, -.003), (-.086, .073, .032, -.001), (-.097, .068, .027, .001), (-.104, .058, .021, .002),
    (-.109, .044, .014, .003), (-.112, .025, .007, .003), (-.113, .000, .000, .003),
]


def palm_rings():
    zs = np.array([k[0] for k in PALM_KNOTS])
    out = []
    dense = np.linspace(zs[0], zs[-1], 64)
    for z in dense:
        i = np.searchsorted(-zs, -z)
        i = min(max(i, 1), len(zs) - 1)
        a, b = PALM_KNOTS[i - 1], PALM_KNOTS[i]
        t = (z - a[0]) / (b[0] - a[0]); t = t * t * (3 - 2 * t)
        out.append((z, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, a[3] + (b[3] - a[3]) * t))
    return out


# ---------------------------------------------------------------- texture atlas layout
TEX = 2048
MARGIN = 6
RECTS = {"Palm": (0, 1024, 2048, 1024)}
for i, name in enumerate(["Thumb", "Index", "Middle", "Ring", "Pinky"]):
    RECTS[name] = (i * 409, 0, 409, 1024)


def paint_digit(theta, s, info, thumb=False):
    head, d, back, lat, lens, L, j1, j2, rb, rt = info
    sideways = np.abs(np.sin(theta))
    ventral = (1 - np.cos(theta)) / 2
    c = LIGHT[None, None] * (1 - sstep(.15, .70, sideways)[..., None]) + MID[None, None] * sstep(.15, .70, sideways)[..., None]
    sh = sstep(.62, .95, sideways)[..., None] * (.95 - .3 * ventral[..., None])
    c = c * (1 - sh) + SHADOW * sh
    rim = sstep(.955, 1.0, sideways)[..., None] * .5
    c = c * (1 - rim) + DEEP * rim
    palmy = (ventral * (1 - sideways) ** 1.5)[..., None]
    c = c * (1 - .55 * palmy) + PALM * .55 * palmy
    # joint creases: crisp on the palm side, soft wrinkles on the back
    for j, depth in ((j1, 1.0), (j2, .8)):
        band = np.exp(-((s - j) / .0016) ** 2)[..., None]
        front = (ventral ** 2)[..., None] * (1 - sideways[..., None] * .5)
        c = c * (1 - .38 * depth * band * front) + DEEP * .38 * depth * band * front
        back_w = np.exp(-((s - j + .002) / .0025) ** 2)[..., None] * ((1 - ventral) ** 3)[..., None]
        c = c * (1 - .12 * back_w) + SHADOW * .12 * back_w
    flush = sstep(L - rt * 2.2, L, s)[..., None] * .35
    c = c * (1 - flush) + FLUSH * flush
    base_shade = (1 - sstep(-rb * .2, rb * .9, s))[..., None] * .18
    c = c * (1 - base_shade) + SHADOW * base_shade
    if thumb:  # thenar: a soft fold where the thumb meets the palm on the inside
        fold = (1 - sstep(.0, .022, s))[..., None] * (ventral[..., None] ** 2) * .25
        c = c * (1 - fold) + SHADOW * fold
    return c


def paint_palm(theta, z):
    sideways = np.abs(np.sin(theta))
    ventral = (1 - np.cos(theta)) / 2
    c = LIGHT[None, None] * (1 - sstep(.2, .8, sideways)[..., None]) + MID[None, None] * sstep(.2, .8, sideways)[..., None]
    sh = sstep(.72, .98, sideways)[..., None] * .9
    c = c * (1 - sh) + SHADOW * sh
    rim = sstep(.97, 1.0, sideways)[..., None] * .45
    c = c * (1 - rim) + DEEP * rim
    palmy = (ventral * (1 - sideways) ** 1.2)[..., None]
    c = c * (1 - .6 * palmy) + PALM * .6 * palmy
    hollow = (np.exp(-((z + .055) / .025) ** 2) * ventral ** 3 * (1 - sideways) ** 2)[..., None] * .22
    c = c * (1 - hollow) + MID * hollow
    cuff = (sstep(.0, .05, z) * .3 + sstep(.05, .10, z) * .45)[..., None]  # wrist stub darkens into the sleeve
    c = c * (1 - cuff) + DEEP * cuff
    knuckle = (np.exp(-((z + .094) / .006) ** 2) * (1 - ventral) ** 4)[..., None] * .10
    c = c * (1 - knuckle) + SHADOW * knuckle
    return c


def build_texture(infos):
    img = np.ones((TEX, TEX, 4), np.float32)
    zs = [k[0] for k in PALM_KNOTS]
    for name, (x0, y0, w, h) in RECTS.items():
        u = (np.arange(w) + .5 - MARGIN) / (w - 2 * MARGIN); v = np.clip((np.arange(h) + .5 - MARGIN) / (h - 2 * MARGIN), 0, 1)
        uu, vv = np.meshgrid(u, v)
        theta = uu * 2 * math.pi
        if name == "Palm":
            z = zs[0] + (zs[-1] - zs[0]) * vv
            col = paint_palm(theta, z)
        else:
            info = infos[name]
            s0, s1 = -info[8], info[5]
            col = paint_digit(theta, s0 + (s1 - s0) * vv, info, thumb=name == "Thumb")
        img[y0:y0 + h, x0:x0 + w, :3] = np.clip(col, 0, 1)
    old = bpy.data.images.get("Toy hand skin")
    if old:
        bpy.data.images.remove(old)
    im = bpy.data.images.new("Toy hand skin", TEX, TEX, alpha=False)
    im.pixels.foreach_set(img.ravel()); im.pack()
    return im



# ---------------------------------------------------------------- sleeves
def sleeve_axes():
    """Visual centre line of each sleeve's forearm part (the bones sit behind the cloth)."""
    info = {}
    for side in ("R", "L"):
        sl = bpy.data.objects["Sleeve." + side]
        restore_sleeve_groups(sl, side)
        gi = sl.vertex_groups["Forearm_" + side].index
        fb = ARM.data.bones["Forearm_" + side]
        h = Vector(fb.head_local); axis = (Vector(fb.tail_local) - h).normalized()
        pts = []
        for v in sl.data.vertices:
            w = next((g.weight for g in v.groups if g.group == gi), 0.0)
            if w > .5:
                pts.append(sl.matrix_world @ v.co)
        ts = [(p - h).dot(axis) for p in pts]
        t0, t1 = min(ts), max(ts)

        def centre(a, b):
            sel = [p for p, tt in zip(pts, ts) if a <= (tt - t0) / (t1 - t0) <= b]
            return sum(sel, Vector()) / len(sel)
        info[side] = (centre(.30, .50), centre(.88, 1.0))
    return info


def restore_sleeve_groups(sl, side):
    """Fold an earlier SleeveEnd group back into Forearm so the script can be re-run."""
    end = sl.vertex_groups.get("SleeveEnd_" + side)
    if not end:
        return
    fore = sl.vertex_groups["Forearm_" + side]
    for v in sl.data.vertices:
        we = next((g.weight for g in v.groups if g.group == end.index), 0.0)
        if we > 0:
            wf = next((g.weight for g in v.groups if g.group == fore.index), 0.0)
            fore.add([v.index], min(1.0, wf + we), "REPLACE")
    sl.vertex_groups.remove(end)


def recess_cuff(sl):
    """The sleeve opening was closed by a flat dark lid; a lifted arm showed it as a flat oval with the hand
    poking through. Inset it into a short dark lining tube so the opening reads as depth (run once)."""
    if sl.get("cuff_recessed"):
        return
    bm = bmesh.new(); bm.from_mesh(sl.data); bm.faces.ensure_lookup_table()
    cap = max(bm.faces, key=lambda f: len(f.verts))
    if len(cap.verts) < 32:
        bm.free(); return
    rim = [v.co.copy() for v in cap.verts]
    c = sum(rim, Vector()) / len(rim)
    r = sum((v - c).length for v in rim) / len(rim)
    res = bmesh.ops.inset_individual(bm, faces=[cap], thickness=r * .10, depth=-.05, use_even_offset=True)
    for f in res["faces"]:
        f.material_index = cap.material_index
    for v in cap.verts:                       # narrow the bottom of the lining a little more
        v.co = c + (v.co - c) * .85 + (cap.normal * -.05) * .0
    bm.to_mesh(sl.data); bm.free(); sl.data.update()
    sl["cuff_recessed"] = True


def sleeve_weights(axes):
    """The opening half of each sleeve follows SleeveEnd_*, which gestures narrow when the arm lifts."""
    for side in ("R", "L"):
        sl = bpy.data.objects["Sleeve." + side]
        mid, _end = axes[side]
        sign = 1 if side == "R" else -1
        across, dorsal, up, wrist = side_frame(sign)
        hand_head = Vector(wrist + SCALE * (-.002 * dorsal + .004 * up))
        axis = hand_head - mid; length = axis.length; axis.normalize()
        fore = sl.vertex_groups["Forearm_" + side]
        grp = sl.vertex_groups.new(name="SleeveEnd_" + side)
        for v in sl.data.vertices:
            wf = next((g.weight for g in v.groups if g.group == fore.index), 0.0)
            if wf <= 0:
                continue
            tt = ((sl.matrix_world @ v.co) - mid).dot(axis) / length
            we = wf * float(sstep(-.2, .8, tt))
            if we > 1e-4:
                grp.add([v.index], we, "REPLACE")
                fore.add([v.index], wf - we, "REPLACE")


# ---------------------------------------------------------------- bones
def set_bones(axes):
    bpy.ops.object.select_all(action="DESELECT")
    bpy.context.view_layer.objects.active = ARM; ARM.select_set(True)
    bpy.ops.object.mode_set(mode="EDIT")
    eb = ARM.data.edit_bones
    for side, sign in (("R", 1), ("L", -1)):
        across, dorsal, up, wrist = side_frame(sign)
        W = lambda p: Vector(wrist + SCALE * (p[0] * across + p[1] * dorsal + p[2] * up))
        Wd = lambda v: Vector(v[0] * across + v[1] * dorsal + v[2] * up)
        hand = eb["Hand_" + side]
        hand.use_connect = False
        hand.head = W((0, -.002, .004)); hand.tail = W((0, -.002, -.080)); hand.align_roll(Wd((0, 1, 0)))
        for name, spec in DIGITS.items():
            head, d, back, lat, lens, rb, rm, rt = digit_frame(spec)
            parent = hand; pos = head
            for i, l in enumerate(lens):
                bn = f"{name}{i + 1}_{side}"
                b = eb.get(bn) or eb.new(bn)
                b.head = W(pos); b.tail = W(pos + d * l); b.align_roll(Wd(back))
                b.parent = parent; b.use_connect = i > 0; b.use_deform = True
                parent = b; pos = pos + d * l
        mid, end = axes[side]
        sb = eb.get("SleeveEnd_" + side) or eb.new("SleeveEnd_" + side)
        # SleeveEnd sits at the wrist: scaling it gathers the opening (and the long back flap of the
        # bell) in around the wrist, so a lifted sleeve hugs the hand instead of gaping beside it
        d = (hand.head - mid).normalized()
        sb.head = hand.head.copy(); sb.tail = hand.head + d * .08; sb.align_roll(Vector((0, -1, 0)))
        sb.parent = eb["Forearm_" + side]; sb.use_connect = False; sb.use_deform = True
    bpy.ops.object.mode_set(mode="OBJECT")


# ---------------------------------------------------------------- mesh
def build_side(side, sign, infos):
    across, dorsal, up, wrist = side_frame(sign)
    W = lambda p: wrist + SCALE * (p[..., 0:1] * across + p[..., 1:2] * dorsal + p[..., 2:3] * up)
    verts, faces, uvs, groups = [], [], [], {}

    def add_tube(points_rings, rect, weights_per_ring, s_vals, s_range):
        x0, y0, w, h = rect
        x0, y0, w, h = x0 + MARGIN, y0 + MARGIN, w - 2 * MARGIN, h - 2 * MARGIN
        start = len(verts)
        for ring in points_rings:
            verts.extend(ring)
        R = len(points_rings)
        for r in range(R):
            for gname, wv in weights_per_ring[r].items():
                if wv > 1e-4:
                    groups.setdefault(gname, []).append((start + r * N, wv))
        for r in range(R - 1):
            v0 = (s_vals[r] - s_range[0]) / (s_range[1] - s_range[0])
            v1 = (s_vals[r + 1] - s_range[0]) / (s_range[1] - s_range[0])
            for k in range(N):
                a = start + r * N + k; b = start + r * N + (k + 1) % N
                faces.append((a, b, b + N, a + N))
                u0 = k / N; u1 = (k + 1) / N
                uvs.append([((x0 + u0 * w) / TEX, (y0 + v0 * h) / TEX), ((x0 + u1 * w) / TEX, (y0 + v0 * h) / TEX),
                            ((x0 + u1 * w) / TEX, (y0 + v1 * h) / TEX), ((x0 + u0 * w) / TEX, (y0 + v1 * h) / TEX)])

    theta = np.arange(N) / N * 2 * math.pi
    # palm
    rings, wts, svals = [], [], []
    p = 2.7
    for z, a, b, yc in palm_rings():
        sn, cs = np.sin(theta), np.cos(theta)
        x = a * np.sign(sn) * np.abs(sn) ** (2 / p)
        y = yc + b * np.sign(cs) * np.abs(cs) ** (2 / p)
        y = y - .004 * np.clip(-cs, 0, 1) * np.exp(-((z + .06) / .03) ** 2)  # fuller palm pad
        pts = np.stack([x, y, np.full(N, z)], 1)
        wf = float(sstep(.055, .10, z))  # the wrist stub bends with the forearm
        rings.append(W(pts)); wts.append({"Hand_" + side: 1 - wf, "Forearm_" + side: wf}); svals.append(z)
    zs = [k[0] for k in PALM_KNOTS]
    add_tube(rings, RECTS["Palm"], wts, svals, (zs[0], zs[-1]))
    # digits
    for name, spec in DIGITS.items():
        rr, info = digit_rings(spec)
        infos[name] = info
        head, d, back, lat, lens, L, j1, j2, rb, rt = info
        rings, wts, svals = [], [], []
        for s, r in rr:
            rx, ry = r, r * (.90 if name != "Thumb" else .93)
            sn, cs = np.sin(theta), np.cos(theta)
            ry_t = ry * np.where(cs < 0, 1.05, 1.0)  # finger pads
            c = head + d * s
            pts = c[None] + lat[None] * (sn * rx)[:, None] + back[None] * (cs * ry_t)[:, None]
            rings.append(W(pts)); svals.append(s)
            b1 = 1 - float(sstep(j1 - .006, j1 + .006, s)); b3 = float(sstep(j2 - .005, j2 + .005, s))
            wts.append({f"{name}1_{side}": b1, f"{name}2_{side}": 1 - b1 - b3, f"{name}3_{side}": b3})
        add_tube(rings, RECTS[name], wts, svals, (-rb, L))

    mesh = bpy.data.meshes.new("Toy hand " + side)
    mesh.from_pydata([tuple(v) for v in verts], [], faces)
    uvl = mesh.uv_layers.new(name="ToyHandUV")
    for poly, corner in zip(mesh.polygons, uvs):
        for li, uv in zip(poly.loop_indices, corner):
            uvl.data[li].uv = uv
    for poly in mesh.polygons:
        poly.use_smooth = True
    mesh.update()
    return mesh, groups


def main():
    for sd in ("R", "L"):
        recess_cuff(bpy.data.objects["Sleeve." + sd])
    axes = sleeve_axes()
    set_bones(axes)
    sleeve_weights(axes)
    infos = {}
    meshes = {}
    for side, sign in (("R", 1), ("L", -1)):
        meshes[side] = build_side(side, sign, infos)
    img = build_texture(infos)
    mat = bpy.data.materials.get("Toy hand skin") or bpy.data.materials.new("Toy hand skin")
    mat.use_nodes = True
    nt = mat.node_tree
    tex = next((n for n in nt.nodes if n.type == "TEX_IMAGE"), None) or nt.nodes.new("ShaderNodeTexImage")
    tex.image = img; tex.interpolation = "Cubic"; nt.nodes.active = tex
    bsdf = nt.nodes.get("Principled BSDF"); bsdf.inputs["Roughness"].default_value = .8
    nt.links.new(tex.outputs[0], bsdf.inputs["Base Color"])
    for side in ("R", "L"):
        obj = bpy.data.objects["Hand." + side]
        mesh, groups = meshes[side]
        mesh.materials.append(mat)
        obj.data = mesh
        obj.parent = ARM; obj.parent_type = "OBJECT"; obj.parent_bone = ""
        obj.matrix_parent_inverse = Matrix(); obj.matrix_basis = Matrix()
        obj.vertex_groups.clear()
        for gname, items in groups.items():
            vg = obj.vertex_groups.new(name=gname)
            for start, wv in items:
                vg.add(list(range(start, start + N)), wv, "REPLACE")
        obj.modifiers.clear()
        mod = obj.modifiers.new("Armature", "ARMATURE"); mod.object = ARM; mod.use_deform_preserve_volume = True
        print("HAND", side, len(mesh.vertices), len(mesh.polygons), len(groups))
    for side in ("R", "L"):
        hg.apply_shape(ARM, side, "relaxed")
    OLD = ("Anatomical hand", "Soft hand skin", "Hand skin painted", "Chibi hand", "Toy hand")
    for block in (bpy.data.meshes, bpy.data.materials, bpy.data.images):
        for item in list(block):
            if item.name.startswith(OLD) and item.users - (1 if item.use_fake_user else 0) == 0:
                block.remove(item)
    bpy.context.preferences.filepaths.save_version = 0
    bpy.ops.wm.save_as_mainfile(filepath=OUT)
    print("SAVED", OUT)


main()
