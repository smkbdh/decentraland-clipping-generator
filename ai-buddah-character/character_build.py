"""
AI Будда v1.0 — 3D Character Builder (Architecture & Geometry)
Constructs the complete stylized chibi 3D character matching the official Character Sheet:
- Proportions: ~2.8 heads height (~1.4m total)
- Colors: Robe #FF7A00, Hoodie #1F1F23, Beads #00C6D7, Gold #FFD166, Skin #F5E8DB, Hair #2B2B2B
- Components:
  * Stylized Chibi Head with anime cheeks and mouth socket
  * Big expressive Anime Eyes with double white specular highlights
  * Styled Arched Eyebrows & Golden Forehead Gem (Bindi / Third Eye)
  * Ears with Golden Hoop Earring on Left Lobe
  * Slick dark hair with 5 golden partition ribs
  * Turquoise Mala Beads Necklace with circular Golden Om Medallion
  * Saffron Orange Monk Kasaya Robe with diagonal gold piping
  * Dark Charcoal Techwear Hoodie with draped hood and 8-petal glowing Lotus on back
  * Loose monk trousers & chunky techwear sneakers (white sole, black upper, gold trim)
  * Radiant Golden Lotus Halo / Aura behind head
  * Floating AI Cat-Bot companion with glowing cyan digital smile
- Facial Shape Keys (8 Speech Visemes + Core Emotions)
- Isolated in collection 'AI_BUDDAH_CHARACTER' & scene 'Scene_Buddah_Studio'.
"""

import bpy
if bpy.data.objects.get("Head turn") and bpy.data.objects.get("Head"):
    raise RuntimeError("This procedural builder targets the legacy blockout. Open the portrait master to animate it.")
import bmesh
import math
from mathutils import Vector, Euler, Matrix

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    r = int(hex_str[0:2], 16) / 255.0
    g = int(hex_str[2:4], 16) / 255.0
    b = int(hex_str[4:6], 16) / 255.0
    def srgb_to_lin(c):
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return (srgb_to_lin(r), srgb_to_lin(g), srgb_to_lin(b), 1.0)

# ==============================================================================
# 1. SETUP STUDIO SCENE & COLLECTION
# ==============================================================================
COL_NAME = "AI_BUDDAH_CHARACTER"
SCENE_NAME = "Scene_Buddah_Studio"

# Clear existing objects in character collection
if COL_NAME in bpy.data.collections:
    char_col = bpy.data.collections[COL_NAME]
    for obj in list(char_col.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
else:
    char_col = bpy.data.collections.new(COL_NAME)
    if char_col.name not in bpy.context.scene.collection.children:
        bpy.context.scene.collection.children.link(char_col)

# Ensure studio scene exists
if SCENE_NAME in bpy.data.scenes:
    studio_scene = bpy.data.scenes[SCENE_NAME]
else:
    studio_scene = bpy.data.scenes.new(SCENE_NAME)

if char_col.name not in studio_scene.collection.children:
    studio_scene.collection.children.link(char_col)

bpy.context.window.scene = studio_scene

# Render Settings
studio_scene.render.engine = 'BLENDER_EEVEE_NEXT' if hasattr(bpy.types, 'RenderSettings') and 'BLENDER_EEVEE_NEXT' in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items] else 'BLENDER_EEVEE'
if hasattr(studio_scene, 'view_settings'):
    studio_scene.view_settings.view_transform = 'AgX'
    try:
        studio_scene.view_settings.look = 'AgX - High Contrast'
    except:
        pass

# Studio Dark Cyc World
studio_world = bpy.data.worlds.get("Buddah_Studio_World")
if not studio_world:
    studio_world = bpy.data.worlds.new("Buddah_Studio_World")
studio_scene.world = studio_world
studio_world.use_nodes = True
bg_node = studio_world.node_tree.nodes.get("Background")
if bg_node:
    bg_node.inputs["Color"].default_value = (0.035, 0.04, 0.05, 1.0)
    bg_node.inputs["Strength"].default_value = 1.0

def link_to_char(obj):
    if obj.name not in char_col.objects:
        char_col.objects.link(obj)
    if obj.name in studio_scene.collection.objects:
        studio_scene.collection.objects.unlink(obj)
    return obj

# ==============================================================================
# 2. MATERIALS PALETTE (Accurate HEX from Character Sheet)
# ==============================================================================
def create_pbr_material(name, base_hex, metallic=0.0, roughness=0.5, sss=0.0, sss_color=None, emission_hex=None, emission_strength=1.0):
    mat = bpy.data.materials.get(name)
    if not mat:
        mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = next((n for n in nodes if n.type == "BSDF_PRINCIPLED"), None)
    if bsdf:
        bsdf.inputs["Base Color"].default_value = hex_to_rgb(base_hex)
        bsdf.inputs["Metallic"].default_value = metallic
        bsdf.inputs["Roughness"].default_value = roughness
        if sss > 0:
            if "Subsurface Weight" in bsdf.inputs:
                bsdf.inputs["Subsurface Weight"].default_value = sss
                if sss_color and "Subsurface Radius" in bsdf.inputs:
                    bsdf.inputs["Subsurface Radius"].default_value = sss_color
            elif "Subsurface" in bsdf.inputs:
                bsdf.inputs["Subsurface"].default_value = sss
        if emission_hex:
            em_col = hex_to_rgb(emission_hex)
            if "Emission Color" in bsdf.inputs:
                bsdf.inputs["Emission Color"].default_value = em_col
                bsdf.inputs["Emission Strength"].default_value = emission_strength
            elif "Emission" in bsdf.inputs:
                bsdf.inputs["Emission"].default_value = em_col
    return mat

mat_skin       = create_pbr_material("Mat_Buddah_Skin", "#F5E8DB", roughness=0.45, sss=0.25, sss_color=(1.0, 0.55, 0.45))
mat_robe       = create_pbr_material("Mat_Buddah_Robe", "#FF7A00", roughness=0.75)
mat_hoodie     = create_pbr_material("Mat_Buddah_Hoodie", "#1F1F23", roughness=0.88)
mat_beads      = create_pbr_material("Mat_Buddah_Beads", "#00C6D7", roughness=0.15, sss=0.3)
mat_gold       = create_pbr_material("Mat_Buddah_Gold", "#FFD166", metallic=0.92, roughness=0.22, emission_hex="#FFD166", emission_strength=2.2)
mat_hair       = create_pbr_material("Mat_Buddah_Hair", "#2B2B2B", roughness=0.55)
mat_sclera     = create_pbr_material("Mat_Buddah_Sclera", "#FAF9F5", roughness=0.1)
mat_iris       = create_pbr_material("Mat_Buddah_Iris", "#181412", roughness=0.15)
mat_highlight  = create_pbr_material("Mat_Buddah_Highlight", "#FFFFFF", roughness=0.0, emission_hex="#FFFFFF", emission_strength=6.0)
mat_sole       = create_pbr_material("Mat_Buddah_Sole", "#F2EFE8", roughness=0.6)
mat_halo       = create_pbr_material("Mat_Buddah_Halo", "#FFD166", emission_hex="#FFD166", emission_strength=12.0)
mat_bot_gold   = create_pbr_material("Mat_Bot_Gold", "#FFD166", metallic=0.95, roughness=0.2)
mat_bot_visor  = create_pbr_material("Mat_Bot_Visor", "#101214", roughness=0.05)
mat_bot_face   = create_pbr_material("Mat_Bot_DigitalFace", "#00C6D7", emission_hex="#00C6D7", emission_strength=14.0)

# ==============================================================================
# 3. HEAD & CHIBI FACIAL GEOMETRY
# Center of head at (0, 0, 1.15)
# ==============================================================================
bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=24, radius=0.24, location=(0, 0, 1.15))
head = bpy.context.active_object
head.name = "Buddah_Head"
head.data.materials.append(mat_skin)
link_to_char(head)

# Sculpt Chibi Proportions: Chubby cheeks, soft chin, cute jaw
bm = bmesh.new()
bm.from_mesh(head.data)
for v in bm.verts:
    z_rel = v.co.z
    y_rel = v.co.y
    x_rel = v.co.x
    
    # Chubby cheeks: expand laterally on lower front
    if -0.14 < z_rel < 0.08 and y_rel > -0.05:
        factor = 1.0 + 0.15 * math.cos(z_rel * 10.0) * (y_rel + 0.12)
        v.co.x *= factor
    
    # Chin shaping: cute taper
    if z_rel < -0.12 and y_rel > 0:
        v.co.x *= 0.88
        v.co.y += 0.02

bm.to_mesh(head.data)
bm.free()
head.data.update()

# Subsurf & Smooth
sub_head = head.modifiers.new("Subsurf", type='SUBSURF')
sub_head.levels = 1
sub_head.render_levels = 2
bpy.ops.object.shade_smooth()

# ==============================================================================
# 4. FACIAL SHAPE KEYS (Speech Visemes & Emotions)
# ==============================================================================
head.shape_key_add(name="Basis")

def add_head_shape_key(name, deform_func):
    sk = head.shape_key_add(name=name)
    for idx, v in enumerate(head.data.vertices):
        sk.data[idx].co = deform_func(v.co.copy())
    return sk

# 8 Speech Visemes
def def_viseme_aa(co):
    if co.z < 1.10 and co.y > 0.10:
        d = math.sqrt(co.x**2 + (co.y - 0.22)**2)
        w = max(0.0, 1.0 - d / 0.15)
        co.z -= 0.055 * w
        co.y += 0.015 * w
    return co
add_head_shape_key("viseme_aa", def_viseme_aa)

def def_viseme_oh(co):
    if co.z < 1.12 and co.y > 0.12:
        d = math.sqrt(co.x**2 + (co.z - 1.06)**2)
        w = max(0.0, 1.0 - d / 0.14)
        co.x *= (1.0 - 0.35 * w)
        co.y += 0.035 * w
        co.z -= 0.025 * w
    return co
add_head_shape_key("viseme_oh", def_viseme_oh)

def def_viseme_ee(co):
    if co.z < 1.12 and co.y > 0.12:
        d = math.sqrt(co.x**2 + (co.z - 1.06)**2)
        w = max(0.0, 1.0 - d / 0.16)
        co.x *= (1.0 + 0.28 * w)
        co.z += 0.015 * w
    return co
add_head_shape_key("viseme_ee", def_viseme_ee)

def def_viseme_ch(co):
    if co.z < 1.12 and co.y > 0.12:
        d = math.sqrt(co.x**2 + (co.z - 1.06)**2)
        w = max(0.0, 1.0 - d / 0.14)
        co.z -= 0.018 * w
        co.x *= (1.0 + 0.12 * w)
    return co
add_head_shape_key("viseme_ch", def_viseme_ch)

def def_viseme_mbp(co):
    if co.z < 1.12 and co.y > 0.12:
        d = math.sqrt(co.x**2 + (co.z - 1.06)**2)
        w = max(0.0, 1.0 - d / 0.12)
        co.y -= 0.015 * w
        co.z += 0.010 * w
    return co
add_head_shape_key("viseme_mbp", def_viseme_mbp)

def def_viseme_fv(co):
    if co.z < 1.08 and co.y > 0.12:
        d = math.sqrt(co.x**2 + (co.z - 1.04)**2)
        w = max(0.0, 1.0 - d / 0.12)
        co.y -= 0.020 * w
        co.z += 0.022 * w
    return co
add_head_shape_key("viseme_fv", def_viseme_fv)

def def_viseme_th_l(co):
    if co.z < 1.10 and co.y > 0.12:
        d = math.sqrt(co.x**2 + (co.z - 1.06)**2)
        w = max(0.0, 1.0 - d / 0.14)
        co.z -= 0.028 * w
    return co
add_head_shape_key("viseme_th_l", def_viseme_th_l)

def def_viseme_sil(co):
    return co
add_head_shape_key("viseme_sil", def_viseme_sil)

# Core Emotions
def def_emotion_smile(co):
    if co.z < 1.14 and co.y > 0.10:
        d = math.sqrt(co.x**2 + (co.z - 1.06)**2)
        w = max(0.0, 1.0 - d / 0.18)
        co.z += 0.035 * w
        co.x *= (1.0 + 0.18 * w)
        if co.z > 1.08 and abs(co.x) > 0.08:
            co.y += 0.022 * w
    return co
add_head_shape_key("emotion_smile", def_emotion_smile)

def def_emotion_surprise(co):
    if co.z < 1.14 and co.y > 0.10:
        d = math.sqrt(co.x**2 + (co.z - 1.05)**2)
        w = max(0.0, 1.0 - d / 0.16)
        co.x *= (1.0 - 0.25 * w)
        co.z -= 0.065 * w
        co.y += 0.030 * w
    return co
add_head_shape_key("emotion_surprise", def_emotion_surprise)

def def_emotion_skeptic(co):
    if co.z < 1.14 and co.y > 0.10:
        if co.x > 0.02:
            d = math.sqrt((co.x - 0.08)**2 + (co.z - 1.06)**2)
            w = max(0.0, 1.0 - d / 0.12)
            co.z += 0.038 * w
            co.x += 0.015 * w
        elif co.x < -0.02:
            d = math.sqrt((co.x + 0.08)**2 + (co.z - 1.06)**2)
            w = max(0.0, 1.0 - d / 0.12)
            co.z -= 0.018 * w
    return co
add_head_shape_key("emotion_skeptic", def_emotion_skeptic)

def def_emotion_serious(co):
    if co.z < 1.12 and co.y > 0.12:
        d = math.sqrt(co.x**2 + (co.z - 1.06)**2)
        w = max(0.0, 1.0 - d / 0.14)
        co.z -= 0.018 * w
        co.y -= 0.010 * w
    return co
add_head_shape_key("emotion_serious", def_emotion_serious)

# ==============================================================================
# 5. EYES & SPECULAR HIGHLIGHTS (Front-facing at Y = 0.18..0.24)
# ==============================================================================
for side_name, sx in [("L", -0.105), ("R", 0.105)]:
    # Sclera (Eyeball)
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=16, radius=0.062, location=(sx, 0.185, 1.16))
    eye = bpy.context.active_object
    eye.name = f"Buddah_Eye_{side_name}"
    eye.scale = (1.05, 0.65, 1.15)
    eye.data.materials.append(mat_sclera)
    bpy.ops.object.shade_smooth()
    link_to_char(eye)

    # Iris disc
    bpy.ops.mesh.primitive_cylinder_add(radius=0.044, depth=0.008, location=(sx, 0.228, 1.16))
    iris = bpy.context.active_object
    iris.name = f"Buddah_Iris_{side_name}"
    iris.rotation_euler = (math.radians(90), 0, 0)
    iris.scale = (1.0, 1.08, 1.0)
    iris.data.materials.append(mat_iris)
    bpy.ops.object.shade_smooth()
    link_to_char(iris)

    # Primary Highlight (Top Left)
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8, radius=0.014, location=(sx - 0.014, 0.236, 1.178))
    hl1 = bpy.context.active_object
    hl1.name = f"Buddah_Eye_HL1_{side_name}"
    hl1.data.materials.append(mat_highlight)
    link_to_char(hl1)

    # Secondary Highlight (Bottom Right)
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8, radius=0.0075, location=(sx + 0.016, 0.236, 1.142))
    hl2 = bpy.context.active_object
    hl2.name = f"Buddah_Eye_HL2_{side_name}"
    hl2.data.materials.append(mat_highlight)
    link_to_char(hl2)

    # Upper Eyelid for Blinking
    bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=0.068, depth=0.02, end_fill_type='NOTHING', location=(sx, 0.185, 1.16))
    eyelid = bpy.context.active_object
    eyelid.name = f"Buddah_Eyelid_Upper_{side_name}"
    eyelid.rotation_euler = (math.radians(90), 0, 0)
    eyelid.scale = (1.08, 1.18, 0.7)
    eyelid.data.materials.append(mat_skin)
    link_to_char(eyelid)

    eyelid.shape_key_add(name="Basis")
    sk_el_blink = eyelid.shape_key_add(name=f"blink_{side_name}")
    for idx, vert in enumerate(eyelid.data.vertices):
        co = vert.co.copy()
        if co.z > 0:
            co.z = -co.z * 0.95
            co.y += 0.012
        sk_el_blink.data[idx].co = co

# ==============================================================================
# 6. EYEBROWS & SHAPE KEYS
# ==============================================================================
for side_name, sx in [("L", -0.105), ("R", 0.105)]:
    sign = -1.0 if side_name == "L" else 1.0
    bpy.ops.mesh.primitive_cube_add(location=(sx, 0.232, 1.25))
    brow = bpy.context.active_object
    brow.name = f"Buddah_Eyebrow_{side_name}"
    brow.scale = (0.052, 0.012, 0.015)
    brow.rotation_euler = (math.radians(-10), math.radians(sign * -18), math.radians(sign * 12))
    brow.data.materials.append(mat_hair)
    bpy.ops.object.shade_smooth()
    link_to_char(brow)

    brow.shape_key_add(name="Basis")
    sk_up = brow.shape_key_add(name=f"brow_up_{side_name}")
    sk_furrow = brow.shape_key_add(name=f"brow_furrow_{side_name}")
    for idx, vert in enumerate(brow.data.vertices):
        co_up = vert.co.copy()
        co_up.z += 0.035
        sk_up.data[idx].co = co_up

        co_f = vert.co.copy()
        co_f.z -= 0.022
        co_f.x += sign * 0.018
        sk_furrow.data[idx].co = co_f

# ==============================================================================
# 7. FOREHEAD GEM (Bindi / Third Eye)
# ==============================================================================
bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=0.024, depth=0.032, location=(0, 0.245, 1.265))
gem = bpy.context.active_object
gem.name = "Buddah_Forehead_Gem"
gem.rotation_euler = (math.radians(90), 0, math.radians(45))
gem.scale = (0.75, 1.35, 0.5)
gem.data.materials.append(mat_gold)
bpy.ops.object.shade_smooth()
link_to_char(gem)

# ==============================================================================
# 8. EARS & GOLDEN HOOP EARRING
# ==============================================================================
for side_name, sx in [("L", -0.235), ("R", 0.235)]:
    sign = -1.0 if side_name == "L" else 1.0
    bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=12, radius=0.058, location=(sx, -0.01, 1.13))
    ear = bpy.context.active_object
    ear.name = f"Buddah_Ear_{side_name}"
    ear.scale = (0.45, 0.85, 1.15)
    ear.rotation_euler = (math.radians(-5), math.radians(sign * 14), 0)
    ear.data.materials.append(mat_skin)
    bpy.ops.object.shade_smooth()
    link_to_char(ear)

# Left Earring
bpy.ops.mesh.primitive_torus_add(major_radius=0.018, minor_radius=0.004, location=(-0.252, -0.015, 1.072))
earring = bpy.context.active_object
earring.name = "Buddah_Earring_Gold_L"
earring.rotation_euler = (math.radians(90), 0, math.radians(15))
earring.data.materials.append(mat_gold)
bpy.ops.object.shade_smooth()
link_to_char(earring)

# ==============================================================================
# 9. HAIR & 5 GOLDEN GEOMETRIC PARTITION RIBS
# ==============================================================================
# Helmet Cap covering top and back of head
bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=20, radius=0.252, location=(0, -0.04, 1.18))
hair = bpy.context.active_object
hair.name = "Buddah_Hair"
hair.scale = (1.02, 0.96, 0.98)
hair.data.materials.append(mat_hair)
link_to_char(hair)

# Cut front face of hair so face is exposed cleanly
bm = bmesh.new()
bm.from_mesh(hair.data)
f_del = [f for f in bm.faces if f.calc_center_median().y > 0.02 and f.calc_center_median().z < 0.12]
bmesh.ops.delete(bm, geom=f_del, context='FACES')
bm.to_mesh(hair.data)
bm.free()
hair.data.update()
bpy.ops.object.shade_smooth()

# 5 Golden Ribs along hair (Character Sheet detail)
for angle_deg in [-36, -18, 0, 18, 36]:
    rad = math.radians(angle_deg)
    bpy.ops.mesh.primitive_cylinder_add(radius=0.006, depth=0.32, location=(math.sin(rad)*0.18, math.cos(rad)*0.02 - 0.06, 1.34))
    h_line = bpy.context.active_object
    h_line.name = f"Buddah_Hairline_Gold_{angle_deg}"
    h_line.rotation_euler = (math.radians(50), 0, -rad)
    h_line.data.materials.append(mat_gold)
    bpy.ops.object.shade_smooth()
    link_to_char(h_line)

# ==============================================================================
# 10. NECK, MALA BEADS & OM MEDALLION
# ==============================================================================
bpy.ops.mesh.primitive_cylinder_add(radius=0.09, depth=0.14, location=(0, -0.01, 0.90))
neck = bpy.context.active_object
neck.name = "Buddah_Neck"
neck.data.materials.append(mat_skin)
bpy.ops.object.shade_smooth()
link_to_char(neck)

# 24 Turquoise Mala Prayer Beads around neck (#00C6D7)
num_beads = 24
for b_idx in range(num_beads):
    theta = 2.0 * math.pi * b_idx / num_beads
    bx = math.sin(theta) * 0.15
    by = math.cos(theta) * 0.13 + 0.02
    bz = 0.86 - 0.12 * (1.0 + math.cos(theta)) * 0.5
    
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8, radius=0.016, location=(bx, by, bz))
    bead = bpy.context.active_object
    bead.name = f"Buddah_Mala_Bead_{b_idx:02d}"
    bead.data.materials.append(mat_beads)
    bpy.ops.object.shade_smooth()
    link_to_char(bead)

# Golden Om Medallion at front of Mala Beads (#FFD166)
bpy.ops.mesh.primitive_cylinder_add(radius=0.048, depth=0.014, location=(0, 0.175, 0.72))
medallion = bpy.context.active_object
medallion.name = "Buddah_Medallion_Om"
medallion.rotation_euler = (math.radians(90), 0, 0)
medallion.data.materials.append(mat_gold)
bpy.ops.object.shade_smooth()
link_to_char(medallion)

# Embossed Om Ring Geometry
bpy.ops.mesh.primitive_torus_add(major_radius=0.024, minor_radius=0.004, location=(0, 0.183, 0.72))
om_ring = bpy.context.active_object
om_ring.name = "Buddah_Om_Symbol"
om_ring.rotation_euler = (math.radians(90), 0, 0)
om_ring.data.materials.append(mat_gold)
bpy.ops.object.shade_smooth()
link_to_char(om_ring)

# ==============================================================================
# 11. TORSO: MONK ROBE (#FF7A00) & TECHWEAR HOODIE (#1F1F23)
# ==============================================================================
# Inner Monk Robe (Saffron Orange)
bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=0.20, depth=0.42, location=(0, 0, 0.68))
robe = bpy.context.active_object
robe.name = "Buddah_Robe"
robe.scale = (1.05, 0.88, 1.0)
robe.data.materials.append(mat_robe)
bpy.ops.object.shade_smooth()
link_to_char(robe)

# Diagonal Gold Trim on Monk Robe (Kasaya piping)
bpy.ops.mesh.primitive_cylinder_add(radius=0.008, depth=0.46, location=(0.04, 0.18, 0.70))
robe_trim = bpy.context.active_object
robe_trim.name = "Buddah_Robe_Gold_Trim"
robe_trim.rotation_euler = (0, math.radians(-32), 0)
robe_trim.data.materials.append(mat_gold)
bpy.ops.object.shade_smooth()
link_to_char(robe_trim)

# Outer Dark Techwear Hoodie (#1F1F23)
bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=0.225, depth=0.38, location=(0, -0.015, 0.69))
hoodie = bpy.context.active_object
hoodie.name = "Buddah_Hoodie"
hoodie.scale = (1.08, 0.92, 1.0)
hoodie.data.materials.append(mat_hoodie)
link_to_char(hoodie)

# Cut front opening of hoodie so orange robe shows in the middle
bm = bmesh.new()
bm.from_mesh(hoodie.data)
f_del = [f for f in bm.faces if f.calc_center_median().y > 0.10 and abs(f.calc_center_median().x) < 0.12]
bmesh.ops.delete(bm, geom=f_del, context='FACES')
bm.to_mesh(hoodie.data)
bm.free()
hoodie.data.update()
bpy.ops.object.shade_smooth()

# Draped Hood resting around neck & upper back
bpy.ops.mesh.primitive_torus_add(major_radius=0.19, minor_radius=0.055, location=(0, -0.08, 0.84))
hood_drape = bpy.context.active_object
hood_drape.name = "Buddah_Hood_Drape"
hood_drape.rotation_euler = (math.radians(25), 0, 0)
hood_drape.scale = (1.08, 1.25, 0.75)
hood_drape.data.materials.append(mat_hoodie)
bpy.ops.object.shade_smooth()
link_to_char(hood_drape)

# Back Lotus Flower Emblem (#FFD166, Character Sheet detail)
bpy.ops.mesh.primitive_cylinder_add(radius=0.085, depth=0.008, location=(0, -0.222, 0.74))
lotus_back = bpy.context.active_object
lotus_back.name = "Buddah_Lotus_Back_Emblem"
lotus_back.rotation_euler = (math.radians(90), 0, 0)
lotus_back.data.materials.append(mat_gold)
bpy.ops.object.shade_smooth()
link_to_char(lotus_back)

# 8 Lotus Petals on Back Emblem
for p_idx in range(8):
    p_ang = p_idx * (2.0 * math.pi / 8.0)
    bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=0.022, depth=0.065, location=(math.sin(p_ang)*0.055, -0.226, 0.74 + math.cos(p_ang)*0.055))
    petal = bpy.context.active_object
    petal.name = f"Buddah_Back_Petal_{p_idx}"
    petal.rotation_euler = (math.radians(90), 0, -p_ang)
    petal.data.materials.append(mat_gold)
    bpy.ops.object.shade_smooth()
    link_to_char(petal)

# ==============================================================================
# 12. ARMS & HANDS
# ==============================================================================
for side_name, sx in [("L", -0.26), ("R", 0.26)]:
    sign = -1.0 if side_name == "L" else 1.0
    
    # Upper Arm / Sleeve
    bpy.ops.mesh.primitive_cylinder_add(radius=0.075, depth=0.22, location=(sx, 0.02, 0.72))
    arm = bpy.context.active_object
    arm.name = f"Buddah_Arm_{side_name}"
    arm.rotation_euler = (math.radians(-15), math.radians(sign * -22), 0)
    arm.data.materials.append(mat_hoodie)
    bpy.ops.object.shade_smooth()
    link_to_char(arm)

    # Forearm
    bpy.ops.mesh.primitive_cylinder_add(radius=0.068, depth=0.18, location=(sx * 1.15, 0.06, 0.58))
    forearm = bpy.context.active_object
    forearm.name = f"Buddah_Forearm_{side_name}"
    forearm.rotation_euler = (math.radians(-35), math.radians(sign * -15), 0)
    forearm.data.materials.append(mat_robe)
    bpy.ops.object.shade_smooth()
    link_to_char(forearm)

    # Gold Lotus Cuff Trim
    bpy.ops.mesh.primitive_torus_add(major_radius=0.072, minor_radius=0.008, location=(sx * 1.18, 0.09, 0.51))
    cuff = bpy.context.active_object
    cuff.name = f"Buddah_Cuff_Gold_{side_name}"
    cuff.rotation_euler = (math.radians(-35), math.radians(sign * -15), 0)
    cuff.data.materials.append(mat_gold)
    bpy.ops.object.shade_smooth()
    link_to_char(cuff)

    # Hand
    bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=12, radius=0.048, location=(sx * 1.20, 0.12, 0.46))
    hand = bpy.context.active_object
    hand.name = f"Buddah_Hand_{side_name}"
    hand.scale = (0.9, 1.2, 0.8)
    hand.data.materials.append(mat_skin)
    bpy.ops.object.shade_smooth()
    link_to_char(hand)

# ==============================================================================
# 13. PANTS & SNEAKERS
# ==============================================================================
for side_name, sx in [("L", -0.11), ("R", 0.11)]:
    # Pants Leg
    bpy.ops.mesh.primitive_cylinder_add(radius=0.088, depth=0.34, location=(sx, -0.01, 0.35))
    leg = bpy.context.active_object
    leg.name = f"Buddah_Leg_{side_name}"
    leg.data.materials.append(mat_hoodie)
    bpy.ops.object.shade_smooth()
    link_to_char(leg)

    # Sneaker Midsole (Clean Off-White #F2EFE8)
    bpy.ops.mesh.primitive_cube_add(location=(sx, 0.035, 0.05))
    sole = bpy.context.active_object
    sole.name = f"Buddah_Sneaker_Sole_{side_name}"
    sole.scale = (0.072, 0.135, 0.035)
    sole.data.materials.append(mat_sole)
    bpy.ops.object.shade_smooth()
    link_to_char(sole)

    # Sneaker Upper (Charcoal #1F1F23)
    bpy.ops.mesh.primitive_cube_add(location=(sx, 0.03, 0.11))
    upper = bpy.context.active_object
    upper.name = f"Buddah_Sneaker_Upper_{side_name}"
    upper.scale = (0.068, 0.125, 0.045)
    upper.data.materials.append(mat_hoodie)
    bpy.ops.object.shade_smooth()
    link_to_char(upper)

    # Sneaker Gold Accents (#FFD166)
    bpy.ops.mesh.primitive_cylinder_add(radius=0.008, depth=0.18, location=(sx + (0.07 if side_name == "R" else -0.07), 0.03, 0.085))
    s_gold = bpy.context.active_object
    s_gold.name = f"Buddah_Sneaker_Gold_{side_name}"
    s_gold.rotation_euler = (math.radians(90), 0, 0)
    s_gold.data.materials.append(mat_gold)
    bpy.ops.object.shade_smooth()
    link_to_char(s_gold)

# ==============================================================================
# 14. LOTUS HALO / AURA (#FFD166)
# ==============================================================================
bpy.ops.mesh.primitive_torus_add(major_radius=0.32, minor_radius=0.012, location=(0, -0.16, 1.18))
halo = bpy.context.active_object
halo.name = "Buddah_Halo_Ring"
halo.rotation_euler = (math.radians(90), 0, 0)
halo.data.materials.append(mat_halo)
bpy.ops.object.shade_smooth()
link_to_char(halo)

for p_idx in range(8):
    p_ang = p_idx * (2.0 * math.pi / 8.0)
    px = math.sin(p_ang) * 0.32
    pz = 1.18 + math.cos(p_ang) * 0.32
    bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=0.035, depth=0.11, location=(px, -0.16, pz))
    h_petal = bpy.context.active_object
    h_petal.name = f"Buddah_Halo_Petal_{p_idx}"
    h_petal.rotation_euler = (math.radians(90), 0, -p_ang)
    h_petal.data.materials.append(mat_halo)
    bpy.ops.object.shade_smooth()
    link_to_char(h_petal)

# ==============================================================================
# 15. FLOATING AI CAT-BOT COMPANION
# ==============================================================================
bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=16, radius=0.085, location=(0.42, 0.10, 1.05))
bot = bpy.context.active_object
bot.name = "Buddah_AI_Bot"
bot.data.materials.append(mat_bot_gold)
bpy.ops.object.shade_smooth()
link_to_char(bot)

for ear_side, ex in [("L", -0.045), ("R", 0.045)]:
    bpy.ops.mesh.primitive_cone_add(vertices=3, radius1=0.032, depth=0.055, location=(0.42 + ex, 0.10, 1.14))
    bot_ear = bpy.context.active_object
    bot_ear.name = f"Buddah_Bot_Ear_{ear_side}"
    bot_ear.data.materials.append(mat_bot_gold)
    bpy.ops.object.shade_smooth()
    link_to_char(bot_ear)

bpy.ops.mesh.primitive_cylinder_add(radius=0.068, depth=0.02, location=(0.42, 0.175, 1.05))
visor = bpy.context.active_object
visor.name = "Buddah_Bot_Visor"
visor.rotation_euler = (math.radians(90), 0, 0)
visor.scale = (1.05, 0.75, 1.0)
visor.data.materials.append(mat_bot_visor)
bpy.ops.object.shade_smooth()
link_to_char(visor)

bpy.ops.mesh.primitive_torus_add(major_radius=0.024, minor_radius=0.005, location=(0.42, 0.186, 1.045))
bot_smile = bpy.context.active_object
bot_smile.name = "Buddah_Bot_Face_Cyan"
bot_smile.rotation_euler = (math.radians(90), 0, 0)
bot_smile.scale = (1.0, 0.45, 1.0)
bot_smile.data.materials.append(mat_bot_face)
bpy.ops.object.shade_smooth()
link_to_char(bot_smile)

print(">>> AI BUDDAH v1.0 BASE GEOMETRY BUILT CLEANLY (NO PARENTING DRIFT) <<<")
