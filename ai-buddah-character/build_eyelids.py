"""Перестроить веки AI Будды по реальному контуру глаз.

blender -b D:/Buddah/AI_BUDDAH_MASTER.blend --python build_eyelids.py -- <out.blend> [preview_dir]

1. Рендерит голову в фас (Workbench, flat, Standard) — так же, как рендерятся эпизоды.
2. По цвету кожи под глазом находит для каждого столбца верх и низ глаза.
3. Строит сетку века по этому контуру, сажает её на поверхность головы (ray_cast) чуть впереди.
   Basis — веко схлопнуто к верхней линии глаза (невидимо), ключ Close — веко закрывает глаз.
4. Нижние ряды века — тёмная линия ресниц. Драйверы — Root["blink_L"/"blink_R"].
"""
import bpy, sys, math
import numpy as np
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:]
OUT = argv[0]
PREVIEW = argv[1] if len(argv) > 1 else None

s = bpy.context.scene
head = bpy.data.objects["Head"]
arm = bpy.data.objects["Armature_Buddah"]
root = arm.pose.bones["Root"]
pivot = bpy.data.objects["Head turn"]
_r = s.render
SAVED_SETTINGS = dict(camera=s.camera, rx=_r.resolution_x, ry=_r.resolution_y, pct=_r.resolution_percentage,
                      engine=_r.engine, ft=_r.film_transparent, fp=_r.filepath, fmt=_r.image_settings.file_format,
                      ct=s.display.shading.color_type, light=s.display.shading.light, vt=s.view_settings.view_transform)

# --- 1. фронтальный рендер головы в мировых координатах ---
for k in [k for k in root.keys() if not k.startswith("_")]:
    if isinstance(root[k], float):
        root[k] = 0.0
root["viseme_sil"] = 1.0
for old in ["Upper lid Left", "Lash Left", "Upper lid Right", "Lash Right", "Eyelid.L", "Eyelid.R"]:
    o = bpy.data.objects.get(old)
    if o:
        bpy.data.objects.remove(o, do_unlink=True)
bpy.context.view_layer.update()
CZ, SCALE, RES = 2.2, 1.2, 1200  # центр кадра по Z, ширина ортокамеры, пиксели
cd = bpy.data.cameras.new("EyeScan"); cd.type = "ORTHO"; cd.ortho_scale = SCALE
cam = bpy.data.objects.new("EyeScan", cd); s.collection.objects.link(cam)
cam.location = (0, -6, CZ); cam.rotation_euler = (math.pi / 2, 0, 0); s.camera = cam
r = s.render
r.engine = "BLENDER_WORKBENCH"; s.display.shading.color_type = "TEXTURE"; s.display.shading.light = "FLAT"
s.view_settings.view_transform = "Standard"; r.resolution_x = r.resolution_y = RES; r.resolution_percentage = 100
r.film_transparent = False; r.image_settings.file_format = "PNG"
scan_path = bpy.app.tempdir + "eyescan.png"
r.filepath = scan_path
bpy.ops.render.render(write_still=True)
img = bpy.data.images.load(scan_path)
px = np.array(img.pixels[:]).reshape(RES, RES, 4)[::-1, :, :3]  # строка 0 = верх кадра
bpy.data.images.remove(img)
bpy.data.objects.remove(cam, do_unlink=True)

def to_px(x, z):
    return int((x / SCALE + 0.5) * RES), int((0.5 - (z - CZ) / SCALE) * RES)

def to_world(col, row):
    return (col / RES - 0.5) * SCALE, CZ + (0.5 - row / RES) * SCALE

def srgb_to_lin(c):
    c = np.asarray(c)
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)

# --- 2. контур глаз ---
def eye_profile(sign):
    cx, cz = 0.236 * sign, 354 / 110 - 115 / 110  # центр глаза, как в gaze_library.py
    c0, r0 = to_px(cx, cz)
    cheek = px[r0 + int(0.16 / SCALE * RES), c0]  # кожа под глазом
    lid = px[r0 - int(0.115 / SCALE * RES), c0]   # кожа между бровью и глазом (светлее щеки)
    skin = (np.linalg.norm(px - cheek, axis=2) < 0.16) | (np.linalg.norm(px - lid, axis=2) < 0.12)
    print("SKIN cheek", np.round(cheek, 3), "lid", np.round(lid, 3))
    half_w = int(0.21 / SCALE * RES)
    cols, tops, bots = [], [], []
    for col in range(c0 - half_w, c0 + half_w + 1):
        # идём от центральной строки вверх и вниз, пока не встретим 3 подряд пикселя кожи
        def walk(step):
            row, run = r0, 0
            for _ in range(int(0.16 / SCALE * RES)):
                row += step
                run = run + 1 if skin[row, col] else 0
                if run >= 3:
                    return row - step * 3
            return None
        if skin[r0, col] and skin[r0 - 4, col] and skin[r0 + 4, col]:
            continue
        t, b = walk(-1), walk(1)
        if t is not None and b is not None and b - t > 6:
            cols.append(col); tops.append(t); bots.append(b)
    cols, tops, bots = map(np.array, (cols, tops, bots))
    k = 5  # сгладить контур
    tops = np.convolve(np.pad(tops, k, mode="edge"), np.ones(2 * k + 1) / (2 * k + 1), "valid")
    kb = 9
    bots = np.convolve(np.pad(bots, kb, mode="edge"), np.ones(2 * kb + 1) / (2 * kb + 1), "valid")
    # к уголкам глаза верх и низ сходятся (форма линзы), чтобы не было квадратных углов
    n = len(cols)
    edge = max(4, int(n * 0.14))
    mid = (tops + bots) / 2
    for i in range(n):
        d = min(i, n - 1 - i)
        if d < edge:
            f = 0.35 + 0.65 * math.sin(math.pi / 2 * d / edge)
            tops[i] = mid[i] - (mid[i] - tops[i]) * f
            bots[i] = mid[i] + (bots[i] - mid[i]) * (0.6 + 0.4 * f)
    print("PROFILE", "top rows", np.round(tops[:: max(1, n // 8)]).astype(int).tolist())
    # цвет века = медиана кожи на полоске чуть выше контура глаза (средняя половина глаза)
    band = [px[int(tops[i]) - dy, cols[i]] for i in range(n // 4, 3 * n // 4) for dy in (13, 17, 21)]
    band = [c for c in band if np.linalg.norm(c - cheek) < 0.3]  # отбросить подводку и бровь
    lid_color = np.median(band, axis=0) if band else cheek
    print("LIDCOLOR", np.round(lid_color, 3), "samples", len(band))
    return cols, tops, bots, srgb_to_lin(lid_color)

# --- 3. сетка века ---
def surface(x, z):
    """Точка на поверхности головы (ray_cast спереди), в мировых координатах."""
    dg = bpy.context.evaluated_depsgraph_get()
    hit, loc, nrm, idx, obj, mat = s.ray_cast(dg, Vector((x, -5, z)), Vector((0, 1, 0)))
    return loc if hit and obj.name == "Head" else None

def build(side, sign):
    cols, tops, bots, skin_lin = eye_profile(sign)
    step = 3
    sel = list(range(0, len(cols), step))
    if sel[-1] != len(cols) - 1:
        sel.append(len(cols) - 1)
    ROWS = 10
    LASH = 2  # нижние ряды — ресницы
    me = bpy.data.meshes.new("Eyelid." + side)
    ob = bpy.data.objects.new("Eyelid." + side, me)
    for c in head.users_collection:
        c.objects.link(ob)
    verts_open, verts_close = [], []
    for i in sel:
        t, b = tops[i] - 1.5, bots[i] + 1.0  # чуть перекрыть подводку и нижние ресницы
        for j in range(ROWS + 1):
            row = t + (b - t) * j / ROWS
            x, z = to_world(cols[i], row)
            xo, zo = to_world(cols[i], t)
            pc = surface(x, z) or surface(xo, zo)
            po = surface(xo, zo) or pc
            fwd = Vector((0, -0.006, 0))
            verts_close.append(pc + fwd)
            verts_open.append(po + fwd)
    n = ROWS + 1
    all_faces = []
    for ci in range(len(sel) - 1):
        for j in range(ROWS):
            all_faces.append((ci * n + j, (ci + 1) * n + j, (ci + 1) * n + j + 1, ci * n + j + 1))
    me.from_pydata([v.copy() for v in verts_open], [], all_faces)
    skin_mat = bpy.data.materials.get("Eyelid skin " + side) or bpy.data.materials.new("Eyelid skin " + side)
    skin_mat.diffuse_color = (*skin_lin, 1)
    lash_mat = bpy.data.materials.get("Eyelid lash") or bpy.data.materials.new("Eyelid lash")
    lash_mat.diffuse_color = (0.012, 0.009, 0.008, 1)
    me.materials.append(skin_mat); me.materials.append(lash_mat)
    for p in me.polygons:
        j = p.index % ROWS
        p.material_index = 1 if j >= ROWS - LASH else 0
    # в локальные координаты родителя (Head turn), чтобы веко поворачивалось с головой
    ob.parent = pivot
    inv = pivot.matrix_world.inverted()
    for v, w in zip(me.vertices, verts_open):
        v.co = inv @ w
    ob.shape_key_add(name="Basis")
    key = ob.shape_key_add(name="Close")
    for d, w in zip(key.data, verts_close):
        d.co = inv @ w
    drv = key.driver_add("value").driver
    drv.type = "AVERAGE"
    var = drv.variables.new(); var.name = "blink"
    var.targets[0].id = arm; var.targets[0].data_path = f'pose.bones["Root"]["blink_{side}"]'
    return ob, len(sel)

for side, sign in (("L", 1), ("R", -1)):
    ob, ncols = build(side, sign)
    print("EYELID", ob.name, "columns", ncols)

# --- превью фаз ---
if PREVIEW:
    cd = bpy.data.cameras.new("Prev"); cd.type = "ORTHO"; cd.ortho_scale = 1.1
    cam = bpy.data.objects.new("Prev", cd); s.collection.objects.link(cam)
    cam.location = (0, -6, 2.3); cam.rotation_euler = (math.pi / 2, 0, 0); s.camera = cam
    r.resolution_x = r.resolution_y = 420
    for v in (0.0, 0.35, 0.7, 1.0):
        root["blink_L"] = root["blink_R"] = v
        arm.update_tag(); bpy.context.view_layer.update()
        r.filepath = f"{PREVIEW}/lid_{v:.2f}.png"; bpy.ops.render.render(write_still=True)
    root["blink_L"] = root["blink_R"] = 0.0
    bpy.data.objects.remove(cam, do_unlink=True)
k = SAVED_SETTINGS
s.camera = k["camera"]
r.resolution_x, r.resolution_y, r.resolution_percentage = k["rx"], k["ry"], k["pct"]
r.engine, r.film_transparent, r.filepath = k["engine"], k["ft"], k["fp"]
r.image_settings.file_format = k["fmt"]
s.display.shading.color_type, s.display.shading.light, s.view_settings.view_transform = k["ct"], k["light"], k["vt"]
bpy.ops.wm.save_as_mainfile(filepath=OUT)
print("SAVED", OUT)
