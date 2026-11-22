"""Руки AI Будды v2 — расслабленный полукулак как на арт-листе.

blender -b D:/Buddah/AI_BUDDAH_MASTER.blend --python hands_v2.py -- <out.blend>

Основа — генератор GPT (master-qa/hands-20261123-003506/hands.py): лофт-трубки → воксельный ремеш →
сглаживание → запечённая тень и ногти в атлас. Изменения:
  * пальцы гнутся по дуге (полукулак), а не висят прямыми с растопыркой;
  * большой палец лежит поверх согнутого указательного;
  * ладонь и пальцы пухлее (чиби-пропорции);
  * цвет кожи откалиброван по лицу (медиана рендера лица ≈ sRGB 0.95/0.58/0.39).
"""
import bpy, sys, math, bmesh
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree

OUT = sys.argv[sys.argv.index("--") + 1]
SKIN = np.array([1.0, 0.615, 0.41])  # отношение каналов как у кожи лица
GAIN = 0.97

# пальцы: (смещение поперёк ладони, радиус, длина, угол сгиба, разворот к центру)
FINGERS = [(-.066, .0245, .100, 1.55, .06), (-.022, .0255, .112, 1.75, .02),
           (.023, .0245, .104, 1.85, -.02), (.066, .021, .082, 1.95, -.07)]
PROFILE = [(0, .95), (.22, 1.0), (.43, .92), (.55, .94), (.70, .86), (.84, .80), (.94, .70), (1.0, .50), (1.03, .14)]

for side, sign in [("R", 1), ("L", -1)]:
    obj = bpy.data.objects["Hand." + side]
    across = np.array([.70 * sign, .714, 0]); dorsal = np.array([.714 * sign, -.70, 0]); up = np.array([0., 0., 1.])
    wrist = np.array([sign * .528, -.215, 1.009])
    verts, faces, nails = [], [], []

    def world(pt):
        return wrist + pt[0] * across + pt[1] * dorsal + pt[2] * up

    def tube(sections, boxiness):
        raw = np.array(sections, dtype=float); sections = []
        for i in range(len(raw) - 1):
            p0, p1, p2, p3 = raw[max(0, i - 1)], raw[i], raw[i + 1], raw[min(len(raw) - 1, i + 2)]
            for t in [0, .33, .67]:
                sections.append(.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t
                                      + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3))
        sections.append(raw[-1]); start = len(verts); N = 24
        centers = np.array([world(sec[:3]) for sec in sections])
        for j, sec in enumerate(sections):
            tang = centers[min(len(sections) - 1, j + 1)] - centers[max(0, j - 1)]; tang /= np.linalg.norm(tang)
            v = across - tang * np.dot(across, tang); v /= np.linalg.norm(v)
            nrm = np.cross(v, tang)
            if np.dot(nrm, dorsal) < 0:
                nrm = -nrm
            for k in range(N):
                a = 2 * math.pi * k / N; c = math.cos(a); ss = math.sin(a)
                verts.append(centers[j] + v * sec[3] * math.copysign(abs(c) ** boxiness, c)
                             + nrm * sec[4] * math.copysign(abs(ss) ** boxiness, ss))
                if j:
                    i = start + (j - 1) * N + k; b = start + (j - 1) * N + (k + 1) % N
                    faces.append((i, b, b + N, i + N))
        faces.extend([tuple(range(start, start + N))[::-1], tuple(range(len(verts) - N, len(verts)))])

    # ладонь: чуть шире и толще, чем у GPT
    tube([(0, -.004, .035, .045, .036), (0, 0, .008, .054, .045), (0, 0, -.027, .065, .049),
          (.003, .002, -.064, .080, .054), (.004, .004, -.098, .095, .052), (.004, .0, -.122, .093, .046),
          (.006, -.006, -.136, .085, .036), (.005, -.012, -.142, .068, .026)], .86)

    # пальцы: дуга сгиба к ладони (отрицательный dorsal), кончики возвращаются вверх
    for i, (u, r, length, bend, toward) in enumerate(FINGERS):
        startz = -.118 - .007 * math.sin(i * math.pi / 3)
        pts, pos, steps = [], np.array([u, .004, startz]), 60
        ts = [p[0] for p in PROFILE]
        path = {0.0: pos.copy()}
        for n in range(1, steps + 1):
            s0 = (n - .5) / steps
            ang = bend * s0 ** 1.25  # сгиб нарастает к кончику
            d = np.array([toward * s0 * .2, -math.sin(ang), -math.cos(ang)])
            pos = pos + d * (length * 1.03 / steps)
            path[n / steps * 1.03] = pos.copy()
        keys = np.array(sorted(path))
        sections = []
        for t, rad in PROFILE:
            k = int(np.argmin(abs(keys - t)))
            p = path[keys[k]]
            sections.append((p[0], p[1], p[2], r * rad, r * rad * .84))
        tube(sections, .83)
        nails.append((np.array(sections[-5][:3]), np.array(sections[-3][:3]), r))

    # большой палец: от основания ладони вперёд и поверх согнутого указательного
    tube([(-.040, -.012, -.040, .016, .016), (-.055, -.016, -.052, .033, .029), (-.078, -.024, -.066, .033, .030),
          (-.094, -.040, -.086, .030, .028), (-.094, -.060, -.105, .028, .026), (-.082, -.078, -.120, .025, .023),
          (-.064, -.090, -.130, .022, .020), (-.050, -.094, -.135, .018, .017), (-.042, -.096, -.137, .009, .010)], .88)

    mesh = bpy.data.meshes.new("Chibi hand " + side); mesh.from_pydata(verts, [], faces); mesh.update()
    obj.data = mesh
    bpy.ops.object.select_all(action="DESELECT"); obj.select_set(True); bpy.context.view_layer.objects.active = obj
    bm = bmesh.new(); bm.from_mesh(mesh); bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces)); bm.to_mesh(mesh); bm.free()
    mesh.remesh_voxel_size = .003; mesh.remesh_voxel_adaptivity = 0.0; bpy.ops.object.voxel_remesh()
    for typ, value in [("SMOOTH", .75), ("DECIMATE", .55)]:
        mod = obj.modifiers.new("finish", typ)
        if typ == "SMOOTH":
            mod.factor = value; mod.iterations = 5
        else:
            mod.ratio = value
        bpy.ops.object.modifier_apply(modifier=mod.name)
    mesh = obj.data
    for poly in mesh.polygons:
        poly.use_smooth = True

    # запечённая тень/окклюзия + ногти (как у GPT), но с кожей лица
    tree = BVHTree.FromPolygons([v.co for v in mesh.vertices], [p.vertices[:] for p in mesh.polygons])
    light = Vector((-.22 * sign, -.61, .76)).normalized()
    colors = []
    for v in mesh.vertices:
        pos = v.co; n = v.normal.normalized()
        helper = Vector((0, 0, 1)) if abs(n.z) < .85 else Vector((1, 0, 0))
        tx = n.cross(helper).normalized(); ty = n.cross(tx)
        occ = 0.
        for j in range(6):
            a = 2 * math.pi * j / 6
            ray = (n * .58 + tx * math.cos(a) * .81 + ty * math.sin(a) * .81).normalized()
            hit, _, _, dist = tree.ray_cast(pos + n * .0015, ray, .036)
            if hit is not None:
                occ += 1 - dist / .036
        val = GAIN * (.86 + .14 * (max(-.45, n.dot(light)) + .45) / 1.45 - .42 * occ / 6)  # глубже тень в щелях
        local = np.array(pos) - wrist
        blush = math.exp(-((local[2] + .15) / .045) ** 2) * .035
        c = (SKIN - np.array([0, blush, blush])) * val
        for p, q, r in nails:
            axis = world(q) - world(p); l = np.linalg.norm(axis); axis /= l
            rel = np.array(pos) - (world(p) + world(q)) / 2
            if abs(rel @ axis) > .011 or abs(rel @ across) > r * .62 or np.dot(n, dorsal) < .1:
                continue
            f = max(0, 1 - (rel @ axis / .011) ** 2 - (rel @ across / (r * .62)) ** 2)
            c = c * (1 - .7 * f) + np.array([1., .74, .62]) * val * .7 * f
        colors.append(np.clip(c, 0, 1))

    bm = bmesh.new(); bm.from_mesh(mesh); bmesh.ops.triangulate(bm, faces=list(bm.faces)); bm.to_mesh(mesh); bm.free(); mesh.update()
    width = math.ceil(math.sqrt(len(mesh.polygons))); tile = 8
    pixels = np.ones((width * tile, width * tile, 4), dtype="f"); uv = mesh.uv_layers.new(name="HandSkinUV")
    yy, xx = np.mgrid[0:tile, 0:tile]; b = np.clip((xx - 1) / 5, 0, 1); c = np.clip((yy - 1) / 5, 0, 1)
    total = np.maximum(1, b + c); b = b / total; c = c / total
    for i, poly in enumerate(mesh.polygons):
        oy, ox = divmod(i, width); ox *= tile; oy *= tile
        a0, a1, a2 = [colors[k] for k in poly.vertices]
        pixels[oy:oy + tile, ox:ox + tile, :3] = a0 + (a1 - a0) * b[:, :, None] + (a2 - a0) * c[:, :, None]
        for li, (uu, vv) in zip(poly.loop_indices, [(1.5, 1.5), (6.5, 1.5), (1.5, 6.5)]):
            uv.data[li].uv = ((ox + uu) / (width * tile), (oy + vv) / (width * tile))
    old_img = bpy.data.images.get("Chibi hand skin " + side)
    if old_img:
        bpy.data.images.remove(old_img)
    im = bpy.data.images.new("Chibi hand skin " + side, width * tile, width * tile, alpha=False)
    im.pixels.foreach_set(pixels.ravel()); im.pack()
    mat = bpy.data.materials.new("Chibi hand skin " + side); mat.use_nodes = True
    texn = mat.node_tree.nodes.new("ShaderNodeTexImage"); texn.image = im; mat.node_tree.nodes.active = texn
    bs = mat.node_tree.nodes.get("Principled BSDF"); bs.inputs["Roughness"].default_value = .82
    mat.node_tree.links.new(texn.outputs[0], bs.inputs["Base Color"])
    mesh.materials.clear(); mesh.materials.append(mat); mesh.uv_layers.active = uv
    print("HAND", side, len(mesh.vertices), len(mesh.polygons))

# убрать только неиспользуемые данные прежних версий рук (бэкапы мастера лежат в master-backups)
OLD = ("Anatomical hand", "Hand.", "Soft hand skin", "Hand skin painted", "Chibi hand")
for block in (bpy.data.meshes, bpy.data.materials, bpy.data.images):
    for item in list(block):
        if item.name.startswith(OLD) and item.users - (1 if item.use_fake_user else 0) == 0:
            block.remove(item)
bpy.context.preferences.filepaths.save_version = 0
bpy.ops.wm.save_as_mainfile(filepath=OUT)
print("SAVED", OUT)
