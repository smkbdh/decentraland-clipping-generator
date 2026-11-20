const net = require('net');

const blenderScript = `
import bpy
import math

# ==========================================
# 1. RESET & CLEAN SCENE
# ==========================================
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

for block in list(bpy.data.meshes):
    if block.users == 0:
        bpy.data.meshes.remove(block)
for block in list(bpy.data.materials):
    if block.users == 0:
        bpy.data.materials.remove(block)

scene = bpy.context.scene
scene.render.fps = 30
scene.frame_start = 1
scene.frame_end = 300  # 10 full seconds

# ==========================================
# 2. PBR SHADERS & MATERIALS
# ==========================================
def make_pbr(name, base_color, roughness=0.5, metallic=0.0, emission=None, emission_strength=0.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        if "Base Color" in bsdf.inputs:
            bsdf.inputs["Base Color"].default_value = base_color
        if "Roughness" in bsdf.inputs:
            bsdf.inputs["Roughness"].default_value = roughness
        if "Metallic" in bsdf.inputs:
            bsdf.inputs["Metallic"].default_value = metallic
        if emission and "Emission Color" in bsdf.inputs:
            bsdf.inputs["Emission Color"].default_value = emission
            if "Emission Strength" in bsdf.inputs:
                bsdf.inputs["Emission Strength"].default_value = emission_strength
    return mat

# Warcraft Darkspear Palette
mat_troll_skin = make_pbr("TrollSkin", (0.18, 0.65, 0.70, 1.0), roughness=0.4) # Vibrant turquoise blue
mat_troll_tusks = make_pbr("TrollTusks", (0.95, 0.92, 0.82, 1.0), roughness=0.25) # Polished ivory tusks
mat_troll_eyes = make_pbr("TrollEyes", (1.0, 0.9, 0.1, 1.0), emission=(1.0, 0.9, 0.1, 1.0), emission_strength=25.0) # Piercing yellow eyes
mat_leather_dark = make_pbr("LeatherDark", (0.09, 0.08, 0.07, 1.0), roughness=0.6) # Black/charcoal leather
mat_leather_red = make_pbr("LeatherRed", (0.42, 0.15, 0.08, 1.0), roughness=0.5) # Warm rust-brown shoulder pads & boots
mat_steel_dagger = make_pbr("SteelDagger", (0.88, 0.92, 0.96, 1.0), roughness=0.1, metallic=0.98)
mat_wood_totem = make_pbr("WoodTotem", (0.22, 0.13, 0.08, 1.0), roughness=0.75)
mat_voodoo_rune = make_pbr("VoodooRune", (0.0, 0.95, 1.0, 1.0), emission=(0.0, 0.95, 1.0, 1.0), emission_strength=30.0)
mat_durotar_rock = make_pbr("DurotarRock", (0.62, 0.28, 0.15, 1.0), roughness=0.85) # Red sandstone canyon
mat_fire_flame = make_pbr("FireFlame", (1.0, 0.5, 0.05, 1.0), emission=(1.0, 0.5, 0.05, 1.0), emission_strength=45.0)

# ==========================================
# 3. ATMOSPHERIC WORLD & CINEMATIC 3-POINT LIGHTING
# ==========================================
world = scene.world
if world and world.node_tree:
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs["Color"].default_value = (0.22, 0.06, 0.03, 1.0) # Fiery Durotar sunset atmosphere
        bg.inputs["Strength"].default_value = 0.65

# Key Torch Light (Warm Orange Fire from front-left)
bpy.ops.object.light_add(type='POINT', location=(-2.6, -3.5, 3.2))
key_light = bpy.context.active_object
key_light.name = "Key_Torch_Light"
key_light.data.energy = 950
key_light.data.color = (1.0, 0.65, 0.35)
key_light.data.shadow_soft_size = 0.5

# Fill Light (Cool Dusk Blue from front-right for cinematic color contrast)
bpy.ops.object.light_add(type='POINT', location=(3.2, -3.2, 2.5))
fill_light = bpy.context.active_object
fill_light.name = "Fill_Cool_Light"
fill_light.data.energy = 450
fill_light.data.color = (0.35, 0.65, 1.0)
fill_light.data.shadow_soft_size = 0.8

# Rim Sun / Backlight (Fiery Golden Sunset behind Troll, rimming silhouette)
bpy.ops.object.light_add(type='POINT', location=(0.0, 4.5, 4.2))
rim_light = bpy.context.active_object
rim_light.name = "Rim_Sunset_Light"
rim_light.data.energy = 1600
rim_light.data.color = (1.0, 0.45, 0.12)
rim_light.data.shadow_soft_size = 0.4

# ==========================================
# 4. DUROTAR ROCKY CANYON & CAMP
# ==========================================
# Main Plateau Ground
bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=8.5, depth=1.5, location=(0, 0, -0.75))
ground = bpy.context.active_object
ground.name = "Durotar_Plateau"
ground.data.materials.append(mat_durotar_rock)

# Background Canyon Rock Pillars
for idx, (rx, ry, rz, sx, sy, sz) in enumerate([
    (-6.5, 4.5, 3.0, 2.2, 3.0, 6.0),
    (6.5, 5.0, 3.2, 2.4, 3.2, 6.5),
    (-4.0, 8.5, 4.0, 3.0, 2.5, 8.0),
    (4.0, 8.8, 4.2, 3.2, 2.8, 8.5),
    (0.0, 10.5, 5.0, 5.0, 2.5, 9.5),
]):
    bpy.ops.mesh.primitive_cube_add(location=(rx, ry, rz))
    cliff = bpy.context.active_object
    cliff.name = f"CanyonCliff_{idx+1}"
    cliff.scale = (sx, sy, sz)
    cliff.rotation_euler = (math.radians(4), math.radians(-3), math.radians(idx * 35))
    cliff.data.materials.append(mat_durotar_rock)

# Burning Voodoo Torches
for idx, (tx, ty) in enumerate([(-2.5, -2.0), (2.5, -2.0), (-3.2, 2.5), (3.2, 2.5)]):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.1, depth=2.5, location=(tx, ty, 1.25))
    pole = bpy.context.active_object
    pole.data.materials.append(mat_wood_totem)
    
    bpy.ops.mesh.primitive_cone_add(radius1=0.38, radius2=0.2, depth=0.32, location=(tx, ty, 2.55))
    bowl = bpy.context.active_object
    bowl.data.materials.append(mat_leather_dark)
    
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.28, location=(tx, ty, 2.85))
    flame = bpy.context.active_object
    flame.scale = (0.8, 0.8, 1.5)
    flame.data.materials.append(mat_fire_flame)
    
    bpy.ops.object.light_add(type='POINT', location=(tx, ty, 3.0))
    fl = bpy.context.active_object
    fl.data.color = (1.0, 0.5, 0.1)
    fl.data.shadow_soft_size = 0.5
    for f in range(1, 301, 6):
        fl.data.energy = 300 + math.sin(f * 0.4 + idx) * 90 + math.cos(f * 0.8 + idx * 2) * 50
        fl.data.keyframe_insert(data_path="energy", frame=f)

# Tribal Voodoo Totem
bpy.ops.mesh.primitive_cylinder_add(radius=0.38, depth=4.5, location=(-2.8, 1.8, 2.25))
totem = bpy.context.active_object
totem.data.materials.append(mat_wood_totem)
for rz in [1.5, 2.6, 3.6]:
    bpy.ops.mesh.primitive_torus_add(major_radius=0.42, minor_radius=0.035, location=(-2.8, 1.8, rz))
    rune = bpy.context.active_object
    rune.data.materials.append(mat_voodoo_rune)

# ==========================================
# 5. PROTAGONIST: DARKSPEAR TROLL "MK BBDH"
# ==========================================
# Focal Target Empty for Camera Tracking
bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0, -0.2, 2.6))
cam_target = bpy.context.active_object
cam_target.name = "Troll_Camera_Target"

# Troll Parent Root
bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0, 0, 0))
troll_root = bpy.context.active_object
troll_root.name = "Troll_Mkbbdh_Root"

def link_troll(o):
    o.parent = troll_root

# --- Legs (Bent knees, tall troll stoop) ---
for side in [-1, 1]:
    xl = side * 0.48
    # Thigh
    bpy.ops.mesh.primitive_cylinder_add(radius=0.19, depth=0.95, location=(xl, -0.05, 1.55))
    thigh = bpy.context.active_object
    thigh.rotation_euler = (math.radians(20), 0, math.radians(side * -10))
    thigh.data.materials.append(mat_leather_dark)
    link_troll(thigh)
    
    # Shin / Calf
    bpy.ops.mesh.primitive_cylinder_add(radius=0.16, depth=1.0, location=(xl * 1.12, 0.18, 0.8))
    shin = bpy.context.active_object
    shin.rotation_euler = (math.radians(-25), 0, math.radians(side * 6))
    shin.data.materials.append(mat_leather_dark)
    link_troll(shin)
    
    # Boots (Heavy layered rust-brown leather)
    bpy.ops.mesh.primitive_cube_add(location=(xl * 1.12, 0.18, 0.45))
    boot = bpy.context.active_object
    boot.scale = (0.24, 0.28, 0.4)
    boot.data.materials.append(mat_leather_red)
    link_troll(boot)
    
    # Two-Toed Troll Foot
    bpy.ops.mesh.primitive_cube_add(location=(xl * 1.18, -0.16, 0.08))
    foot = bpy.context.active_object
    foot.scale = (0.24, 0.42, 0.09)
    foot.data.materials.append(mat_troll_skin)
    link_troll(foot)

# --- Torso & Pelvis ---
bpy.ops.mesh.primitive_cylinder_add(radius=0.44, depth=1.05, location=(0, 0, 2.3))
torso = bpy.context.active_object
torso.name = "Troll_Torso"
torso.rotation_euler = (math.radians(14), 0, 0) # Hunched rogue posture
torso.scale = (1.0, 0.78, 1.0)
torso.data.materials.append(mat_leather_dark)
link_troll(torso)

# Chest Vest Front (Rust brown leather lacing)
bpy.ops.mesh.primitive_cube_add(location=(0, -0.34, 2.4))
vest = bpy.context.active_object
vest.scale = (0.3, 0.06, 0.4)
vest.rotation_euler = (math.radians(14), 0, 0)
vest.data.materials.append(mat_leather_red)
link_troll(vest)

# Leather Belt with Buckle
bpy.ops.mesh.primitive_cylinder_add(radius=0.46, depth=0.18, location=(0, -0.02, 1.9))
belt = bpy.context.active_object
belt.scale = (1.02, 0.8, 1.0)
belt.data.materials.append(mat_leather_dark)
link_troll(belt)

bpy.ops.mesh.primitive_cube_add(location=(0, -0.38, 1.9))
buckle = bpy.context.active_object
buckle.scale = (0.1, 0.02, 0.08)
buckle.data.materials.append(mat_troll_tusks)
link_troll(buckle)

# --- Shoulders & Massive Layered Pauldrons ---
for side in [-1, 1]:
    xs = side * 0.82
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.24, location=(xs, -0.05, 2.75))
    sh_joint = bpy.context.active_object
    sh_joint.data.materials.append(mat_troll_skin)
    link_troll(sh_joint)
    
    # Layer 1 Pauldron Plate
    bpy.ops.mesh.primitive_cube_add(location=(xs * 1.14, -0.05, 2.95))
    p1 = bpy.context.active_object
    p1.name = f"Pauldron_{'L' if side < 0 else 'R'}_Top"
    p1.scale = (0.38, 0.45, 0.18)
    p1.rotation_euler = (math.radians(12), math.radians(side * -28), math.radians(side * 18))
    p1.data.materials.append(mat_leather_red)
    link_troll(p1)
    
    # Layer 2 Pauldron Plate (Lower rim)
    bpy.ops.mesh.primitive_cube_add(location=(xs * 1.18, -0.05, 2.75))
    p2 = bpy.context.active_object
    p2.scale = (0.34, 0.42, 0.14)
    p2.rotation_euler = (math.radians(12), math.radians(side * -32), math.radians(side * 18))
    p2.data.materials.append(mat_leather_dark)
    link_troll(p2)

# --- Arms & Dual Daggers ---
for side in [-1, 1]:
    xa = side * 0.92
    # Upper Arm
    bpy.ops.mesh.primitive_cylinder_add(radius=0.14, depth=0.9, location=(xa, -0.08, 2.2))
    up_arm = bpy.context.active_object
    up_arm.rotation_euler = (math.radians(-16), math.radians(side * -18), 0)
    up_arm.data.materials.append(mat_troll_skin)
    link_troll(up_arm)
    
    # Forearm
    bpy.ops.mesh.primitive_cylinder_add(radius=0.13, depth=0.85, location=(xa * 1.05, -0.38, 1.6))
    fore_arm = bpy.context.active_object
    fore_arm.rotation_euler = (math.radians(38), math.radians(side * -12), 0)
    fore_arm.data.materials.append(mat_troll_skin)
    link_troll(fore_arm)
    
    # Leather Bracer Wrap
    bpy.ops.mesh.primitive_cylinder_add(radius=0.16, depth=0.5, location=(xa * 1.05, -0.38, 1.6))
    bracer = bpy.context.active_object
    bracer.rotation_euler = (math.radians(38), math.radians(side * -12), 0)
    bracer.data.materials.append(mat_leather_dark)
    link_troll(bracer)
    
    # Hand
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.15, location=(xa * 1.08, -0.7, 1.28))
    hand = bpy.context.active_object
    hand.data.materials.append(mat_troll_skin)
    link_troll(hand)
    
    # Curved Rogue Dagger (Blade)
    bpy.ops.mesh.primitive_cone_add(radius1=0.09, radius2=0.015, depth=0.85, location=(xa * 1.1, -0.82, 1.12))
    blade = bpy.context.active_object
    blade.scale = (0.35, 1.3, 1.0)
    blade.rotation_euler = (math.radians(70), math.radians(side * 22), 0)
    blade.data.materials.append(mat_steel_dagger)
    link_troll(blade)
    
    # Dagger Crossguard & Hilt
    bpy.ops.mesh.primitive_cylinder_add(radius=0.04, depth=0.3, location=(xa * 1.1, -0.72, 1.25))
    hilt = bpy.context.active_object
    hilt.rotation_euler = (math.radians(70), math.radians(side * 22), 0)
    hilt.data.materials.append(mat_leather_red)
    link_troll(hilt)

# --- Neck & Troll Head ---
# Neck (Thrust forward)
bpy.ops.mesh.primitive_cylinder_add(radius=0.19, depth=0.48, location=(0, -0.25, 2.85))
neck = bpy.context.active_object
neck.rotation_euler = (math.radians(38), 0, 0)
neck.data.materials.append(mat_troll_skin)
link_troll(neck)

# Head Base (Angular predator jaw)
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.35, location=(0, -0.46, 3.08))
head = bpy.context.active_object
head.name = "Troll_Head"
head.scale = (0.85, 1.2, 0.95)
head.data.materials.append(mat_troll_skin)
link_troll(head)

# Troll Nose / Muzzle
bpy.ops.mesh.primitive_cone_add(radius1=0.13, radius2=0.04, depth=0.38, location=(0, -0.74, 3.06))
nose = bpy.context.active_object
nose.rotation_euler = (math.radians(-65), 0, 0)
nose.data.materials.append(mat_troll_skin)
link_troll(nose)

# Piercing Golden Glowing Eyes
for side in [-1, 1]:
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=0.055, location=(side * 0.17, -0.72, 3.14))
    eye = bpy.context.active_object
    eye.data.materials.append(mat_troll_eyes)
    link_troll(eye)

# Huge Pointed Ears (Angled back and out)
for side in [-1, 1]:
    bpy.ops.mesh.primitive_cone_add(radius1=0.15, radius2=0.02, depth=0.95, location=(side * 0.52, -0.34, 3.25))
    ear = bpy.context.active_object
    ear.name = f"TrollEar_{'L' if side < 0 else 'R'}"
    ear.scale = (0.38, 0.85, 1.0)
    ear.rotation_euler = (math.radians(-32), math.radians(side * 68), math.radians(side * -25))
    ear.data.materials.append(mat_troll_skin)
    link_troll(ear)

# Iconic Huge Curved Tusks (White ivory curving up from jaw)
for side in [-1, 1]:
    bpy.ops.mesh.primitive_cone_add(radius1=0.12, radius2=0.02, depth=0.82, location=(side * 0.24, -0.72, 3.0))
    tusk = bpy.context.active_object
    tusk.name = f"TrollTusk_{'L' if side < 0 else 'R'}"
    tusk.scale = (0.75, 0.75, 1.25)
    tusk.rotation_euler = (math.radians(-42), math.radians(side * 24), math.radians(side * -16))
    tusk.data.materials.append(mat_troll_tusks)
    link_troll(tusk)

# Hair / Mohawk
bpy.ops.mesh.primitive_cube_add(location=(0, -0.38, 3.48))
hair = bpy.context.active_object
hair.scale = (0.13, 0.45, 0.28)
hair.rotation_euler = (math.radians(22), 0, 0)
hair.data.materials.append(mat_leather_red)
link_troll(hair)

# Subtle Breathing Idle Loop (Sine wave)
for f in range(1, 301, 12):
    breath = math.sin(f * 0.12) * 0.02
    troll_root.location = (0, 0, breath)
    troll_root.keyframe_insert(data_path="location", frame=f)

# ==========================================
# 6. HOLLYWOOD 10-SEC CINEMATIC CAMERA
# WITH TRACK-TO CONSTRAINT
# ==========================================
bpy.ops.object.camera_add(location=(-2.8, -5.5, 1.6))
cam = bpy.context.active_object
cam.name = "Cinematic_WoW_Camera"
scene.camera = cam
cam.data.lens = 42  # 42mm Portrait / Action lens

# Professional Track-To Constraint: Always locks onto Troll upper body!
track = cam.constraints.new(type='TRACK_TO')
track.target = cam_target
track.track_axis = 'TRACK_NEGATIVE_Z'
track.up_axis = 'UP_Y'

# Depth of field focusing on Troll Head
cam.data.dof.use_dof = True
cam.data.dof.focus_object = head
cam.data.dof.aperture_fstop = 2.4

# 10-Second 4-Phase Camera Trajectory (300 frames)
# Phase 1 (Frame 1): Dramatic low-angle establishing hero shot looking up
cam.location = (-2.6, -5.4, 1.4)
cam.keyframe_insert(data_path="location", frame=1)

# Phase 2 (Frame 100): Sweeping arc to front medium shot
cam.location = (-0.8, -4.2, 1.9)
cam.keyframe_insert(data_path="location", frame=100)

# Phase 3 (Frame 200): Orbiting right to showcase dagger and leather pauldrons
cam.location = (1.8, -3.4, 2.2)
cam.keyframe_insert(data_path="location", frame=200)

# Phase 4 (Frame 300): Intense close-up on tusks, piercing yellow eyes and face
cam.location = (0.3, -2.1, 2.85)
cam.keyframe_insert(data_path="location", frame=300)

# Set 3D Viewport in Blender to Rendered mode
for window in bpy.context.window_manager.windows:
    for area in window.screen.areas:
        if area.type == 'VIEW_3D':
            for space in area.spaces:
                if space.type == 'VIEW_3D':
                    space.shading.type = 'RENDERED'
                    space.region_3d.view_perspective = 'CAMERA'

print(">>> WOW TROLL MK BBDH CINEMATIC SCENE ASSEMBLED WITH TRACK-TO CAMERA! <<<")
`;

const client = new net.Socket();
client.connect(9876, '127.0.0.1', () => {
  console.log('Sending updated WoW Troll scene builder to Blender...');
  client.write(JSON.stringify({
    type: 'execute_code',
    params: { code: blenderScript }
  }));
});

client.on('data', (data) => {
  console.log('Result from Blender:', data.toString());
  client.destroy();
});

client.on('error', (err) => {
  console.error('Socket error:', err);
});
