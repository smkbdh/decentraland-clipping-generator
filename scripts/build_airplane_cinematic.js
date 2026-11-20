const net = require('net');

const blenderScript = `
import bpy
import math

# ==============================================================================
# 1. PURGE & RESET SCENE
# ==============================================================================
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

for block in list(bpy.data.meshes):
    if block.users == 0:
        bpy.data.meshes.remove(block)
for block in list(bpy.data.materials):
    if block.users == 0:
        bpy.data.materials.remove(block)
for block in list(bpy.data.cameras):
    if block.users == 0:
        bpy.data.cameras.remove(block)
for block in list(bpy.data.lights):
    if block.users == 0:
        bpy.data.lights.remove(block)

scene = bpy.context.scene
scene.render.fps = 30
scene.frame_start = 1
scene.frame_end = 300  # Exactly 10.0 Seconds @ 30 FPS

# ==============================================================================
# 2. SHADERS & PBR MATERIALS FACTORY
# ==============================================================================
def create_mat(name, color=(0.5, 0.5, 0.5, 1.0), roughness=0.5, metallic=0.0, emission=None, emission_strength=0.0, alpha=1.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        if "Base Color" in bsdf.inputs:
            bsdf.inputs["Base Color"].default_value = color
        if "Roughness" in bsdf.inputs:
            bsdf.inputs["Roughness"].default_value = roughness
        if "Metallic" in bsdf.inputs:
            bsdf.inputs["Metallic"].default_value = metallic
        if "Alpha" in bsdf.inputs:
            bsdf.inputs["Alpha"].default_value = alpha
        if emission and "Emission Color" in bsdf.inputs:
            bsdf.inputs["Emission Color"].default_value = emission
            if "Emission Strength" in bsdf.inputs:
                bsdf.inputs["Emission Strength"].default_value = emission_strength
    return mat

mat_hull_gloss = create_mat("FuselageGlossWhite", (0.96, 0.96, 0.98, 1.0), roughness=0.15, metallic=0.05)
mat_hull_inner = create_mat("CabinWallCream", (0.90, 0.91, 0.93, 1.0), roughness=0.6)
mat_wing_grey  = create_mat("WingMetal", (0.72, 0.74, 0.78, 1.0), roughness=0.25, metallic=0.45)
mat_engine_dark= create_mat("EngineTitanium", (0.15, 0.17, 0.20, 1.0), roughness=0.2, metallic=0.85)
mat_engine_glow= create_mat("EngineExhaustGlow", (1.0, 0.45, 0.08, 1.0), emission=(1.0, 0.45, 0.08, 1.0), emission_strength=20.0)
mat_win_glow   = create_mat("WindowAmberGlow", (1.0, 0.92, 0.75, 1.0), emission=(1.0, 0.92, 0.75, 1.0), emission_strength=10.0)
mat_glass      = create_mat("ClearGlass", (0.75, 0.88, 0.98, 0.2), roughness=0.04, alpha=0.2)
mat_carpet     = create_mat("AisleNavyCarpet", (0.06, 0.10, 0.18, 1.0), roughness=0.9)
mat_seat_blue  = create_mat("AirlineSeatBlue", (0.12, 0.24, 0.42, 1.0), roughness=0.55)
mat_seat_frame = create_mat("SeatFrameDark", (0.12, 0.12, 0.15, 1.0), roughness=0.35, metallic=0.5)
mat_light_strip= create_mat("AisleLEDStrip", (1.0, 0.96, 0.88, 1.0), emission=(1.0, 0.96, 0.88, 1.0), emission_strength=16.0)

# Character Materials
mat_stewardess = create_mat("StewardessUniform", (0.04, 0.07, 0.18, 1.0), roughness=0.45)
mat_stew_scarf = create_mat("SilkScarfRed", (0.9, 0.08, 0.10, 1.0), roughness=0.35)
mat_pilot_white= create_mat("PilotShirtWhite", (0.98, 0.98, 1.0, 1.0), roughness=0.55)
mat_pilot_gold = create_mat("CaptainEpaulets", (1.0, 0.8, 0.1, 1.0), metallic=0.8, roughness=0.2)
mat_pilot_tie  = create_mat("BlackTie", (0.05, 0.05, 0.05, 1.0), roughness=0.6)
mat_skin       = create_mat("SkinWarm", (0.84, 0.64, 0.54, 1.0), roughness=0.5)
mat_hair_dark  = create_mat("HairDarkBrown", (0.08, 0.06, 0.04, 1.0), roughness=0.7)
mat_hair_blonde= create_mat("HairBlonde", (0.78, 0.65, 0.40, 1.0), roughness=0.6)
mat_weapon_baton= create_mat("WeaponBatonHeavy", (0.1, 0.1, 0.1, 1.0), emission=(1.0, 0.2, 0.05, 1.0), emission_strength=1.5, roughness=0.2, metallic=0.9) # Dark combat steel with aggressive edge
mat_hud_display= create_mat("AvionicsHUDGreen", (0.05, 1.0, 0.5, 1.0), emission=(0.05, 1.0, 0.5, 1.0), emission_strength=35.0)
mat_hud_alert  = create_mat("AvionicsHUDWarning", (1.0, 0.25, 0.05, 1.0), emission=(1.0, 0.25, 0.05, 1.0), emission_strength=30.0)

# ==============================================================================
# 3. ENVIRONMENT & SKY LIGHTING (DUSK STRATOSPHERE)
# ==============================================================================
world = scene.world
if world and world.node_tree:
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs["Color"].default_value = (0.06, 0.10, 0.22, 1.0) # Deep twilight blue
        bg.inputs["Strength"].default_value = 0.65

# Golden Horizon Sun
bpy.ops.object.light_add(type='SUN', location=(-30, -50, 25))
sun = bpy.context.active_object
sun.name = "DuskHorizonSun"
sun.data.energy = 6.0
sun.data.color = (1.0, 0.50, 0.16)
sun.rotation_euler = (math.radians(-22), math.radians(-38), math.radians(40))

# Massive Cloud Sea Below
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, -18))
clouds = bpy.context.active_object
clouds.name = "StratosphereClouds"
clouds.scale = (260, 260, 1)
clouds.data.materials.append(create_mat("CloudDeck", (0.76, 0.69, 0.72, 1.0), roughness=0.95))

# ==============================================================================
# 4. AIRLINER EXTERIOR HULL, SWEPT WINGS & JET TURBINES
# ==============================================================================
plane_root = bpy.data.objects.new("Airliner_Master_Root", None)
scene.collection.objects.link(plane_root)

# Main Fuselage Body (Z: 1.35, Y from -18 to +15)
bpy.ops.mesh.primitive_cylinder_add(radius=2.2, depth=28, location=(0, -2.0, 1.35))
fuselage = bpy.context.active_object
fuselage.name = "Fuselage_Main"
fuselage.rotation_euler = (math.radians(90), 0, 0)
fuselage.data.materials.append(mat_hull_gloss)
fuselage.parent = plane_root

# Aerodynamic Nose Cone
bpy.ops.mesh.primitive_cone_add(radius1=2.2, radius2=0.3, depth=6.0, location=(0, 15.0, 1.35))
nose = bpy.context.active_object
nose.name = "Cockpit_NoseCone"
nose.rotation_euler = (math.radians(-90), 0, 0)
nose.data.materials.append(mat_hull_gloss)
nose.parent = plane_root

# Swept Wings
bpy.ops.mesh.primitive_cube_add(location=(0, -3.0, 0.7))
wings = bpy.context.active_object
wings.name = "SweptWings"
wings.scale = (17.5, 2.6, 0.14)
wings.rotation_euler = (math.radians(3), 0, 0)
wings.data.materials.append(mat_wing_grey)
wings.parent = plane_root

# Jet Engine Pods with glowing exhausts
for side, s_name in [(-1, "L"), (1, "R")]:
    bpy.ops.mesh.primitive_cylinder_add(radius=0.85, depth=3.6, location=(side * 6.2, -2.5, -0.4))
    engine = bpy.context.active_object
    engine.name = f"JetEngine_{s_name}"
    engine.rotation_euler = (math.radians(90), 0, 0)
    engine.data.materials.append(mat_engine_dark)
    engine.parent = plane_root
    
    bpy.ops.mesh.primitive_cylinder_add(radius=0.65, depth=0.2, location=(side * 6.2, -4.3, -0.4))
    exhaust = bpy.context.active_object
    exhaust.name = f"ExhaustGlow_{s_name}"
    exhaust.rotation_euler = (math.radians(90), 0, 0)
    exhaust.data.materials.append(mat_engine_glow)
    exhaust.parent = plane_root

# Tail Fin
bpy.ops.mesh.primitive_cube_add(location=(0, -15.5, 4.6))
tail_fin = bpy.context.active_object
tail_fin.name = "TailVerticalFin"
tail_fin.scale = (0.12, 2.2, 3.2)
tail_fin.rotation_euler = (math.radians(-28), 0, 0)
tail_fin.data.materials.append(mat_hull_gloss)
tail_fin.parent = plane_root

# Glowing Passenger Windows along Left and Right
window_positions_y = [-8.0, -6.5, -5.0, -3.5, -2.0, -0.5, 1.0, 2.5, 4.0, 5.5]
for side in [-1, 1]:
    for idx, wy in enumerate(window_positions_y):
        # We skip window #4 on left side (wy = -3.5) to serve as the open camera portal!
        if side < 0 and abs(wy - (-3.5)) < 0.1:
            continue
        bpy.ops.mesh.primitive_cube_add(location=(side * 2.21, wy, 1.4))
        win = bpy.context.active_object
        win.name = f"Window_{'L' if side < 0 else 'R'}_{idx+1}"
        win.scale = (0.02, 0.28, 0.38)
        win.data.materials.append(mat_win_glow)
        win.parent = plane_root

# ==============================================================================
# 5. CABIN INTERIOR: FLOOR, CEILING, AISLE & SEATED PASSENGERS
# ==============================================================================
# Cabin Floor & Aisle Carpet
bpy.ops.mesh.primitive_cube_add(location=(0, -0.5, 0.25))
floor = bpy.context.active_object
floor.name = "CabinFloor"
floor.scale = (2.05, 9.5, 0.04)
floor.data.materials.append(mat_carpet)
floor.parent = plane_root

# Ceiling
bpy.ops.mesh.primitive_cube_add(location=(0, -0.5, 2.45))
ceiling = bpy.context.active_object
ceiling.name = "CabinCeiling"
ceiling.scale = (2.05, 9.5, 0.04)
ceiling.data.materials.append(mat_hull_inner)
ceiling.parent = plane_root

# Overhead LED Strip along the Aisle
bpy.ops.mesh.primitive_cube_add(location=(0, -0.5, 2.43))
led = bpy.context.active_object
led.name = "AisleLEDBar"
led.scale = (0.14, 9.4, 0.02)
led.data.materials.append(mat_light_strip)
led.parent = plane_root

# Warm overhead cabin light sources
for ly in [-6.0, -2.5, 1.0, 4.5]:
    bpy.ops.object.light_add(type='POINT', location=(0, ly, 2.25))
    clight = bpy.context.active_object
    clight.data.energy = 115
    clight.data.color = (1.0, 0.94, 0.86)
    clight.data.shadow_soft_size = 0.5
    clight.parent = plane_root

# Passenger Seat Rows & Seated Crowd (Left & Right)
seat_row_y = [-7.0, -5.5, -4.0, -2.5, -1.0, 0.5, 2.0, 3.5, 5.0]
for idx, ry in enumerate(seat_row_y):
    for side in [-1, 1]:
        sx = side * 1.25
        bpy.ops.mesh.primitive_cube_add(location=(sx, ry, 0.55))
        seat_b = bpy.context.active_object
        seat_b.scale = (0.6, 0.35, 0.32)
        seat_b.data.materials.append(mat_seat_blue)
        seat_b.parent = plane_root
        
        bpy.ops.mesh.primitive_cube_add(location=(sx, ry - 0.28, 0.95))
        seat_back = bpy.context.active_object
        seat_back.scale = (0.6, 0.08, 0.45)
        seat_back.rotation_euler = (math.radians(-6), 0, 0)
        seat_back.data.materials.append(mat_seat_blue)
        seat_back.parent = plane_root
        
        if (idx + (1 if side > 0 else 0)) % 2 == 0:
            bpy.ops.mesh.primitive_cylinder_add(radius=0.18, depth=0.55, location=(sx, ry - 0.08, 0.88))
            p_torso = bpy.context.active_object
            p_torso.data.materials.append(mat_seat_frame)
            p_torso.parent = plane_root
            
            bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.12, location=(sx, ry - 0.1, 1.3))
            p_head = bpy.context.active_object
            p_head.data.materials.append(mat_skin)
            p_head.parent = plane_root
            
            bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.125, location=(sx, ry - 0.1, 1.34))
            p_hair = bpy.context.active_object
            p_hair.data.materials.append(mat_hair_dark if idx % 2 == 0 else mat_hair_blonde)
            p_hair.parent = plane_root

# ==============================================================================
# 6. STEWARDESS CHARACTER & TURBULENCE STUMBLE CHOREOGRAPHY
# ==============================================================================
bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0, 0.0, 0.25))
stew_root = bpy.context.active_object
stew_root.name = "Stewardess_Choreography_Root"
stew_root.parent = plane_root

# Upper Body / Tailored Navy Blazer
bpy.ops.mesh.primitive_cylinder_add(radius=0.17, depth=0.55, location=(0, 0, 0.82))
stew_blazer = bpy.context.active_object
stew_blazer.data.materials.append(mat_stewardess)
stew_blazer.parent = stew_root

# Neck
bpy.ops.mesh.primitive_cylinder_add(radius=0.07, depth=0.18, location=(0, 0, 1.15))
stew_neck = bpy.context.active_object
stew_neck.data.materials.append(mat_skin)
stew_neck.parent = stew_root

# Red Silk Scarf around neck
bpy.ops.mesh.primitive_torus_add(major_radius=0.12, minor_radius=0.035, location=(0, 0, 1.12))
stew_scarf = bpy.context.active_object
stew_scarf.data.materials.append(mat_stew_scarf)
stew_scarf.parent = stew_root

# Pencil Skirt & Legs
bpy.ops.mesh.primitive_cylinder_add(radius=0.16, depth=0.6, location=(0, 0, 0.35))
stew_skirt = bpy.context.active_object
stew_skirt.data.materials.append(mat_stewardess)
stew_skirt.parent = stew_root

# Head & Elegant Hair Bun
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.12, location=(0, 0, 1.32))
stew_head = bpy.context.active_object
stew_head.data.materials.append(mat_skin)
stew_head.parent = stew_root

bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.13, location=(0, -0.04, 1.36))
stew_hair = bpy.context.active_object
stew_hair.data.materials.append(mat_hair_dark)
stew_hair.parent = stew_root

# Right Arm (Clutches seat during stumble & pounds cockpit door)
bpy.ops.mesh.primitive_cylinder_add(radius=0.05, depth=0.5, location=(0.24, 0, 0.78))
stew_arm_r = bpy.context.active_object
stew_arm_r.name = "Stew_Arm_Right"
stew_arm_r.data.materials.append(mat_stewardess)
stew_arm_r.parent = stew_root

# Left Arm
bpy.ops.mesh.primitive_cylinder_add(radius=0.05, depth=0.5, location=(-0.24, 0, 0.78))
stew_arm_l = bpy.context.active_object
stew_arm_l.name = "Stew_Arm_Left"
stew_arm_l.data.materials.append(mat_stewardess)
stew_arm_l.parent = stew_root

# --- STEWARDESS ANIMATION KEYFRAMES ---
# Stays perfectly upright and walks steadily from frame 1 to 160
stew_root.location = (0, 0.5, 0.25)
stew_root.rotation_euler = (0, 0, 0)
stew_arm_r.rotation_euler = (0, 0, 0)
stew_arm_l.rotation_euler = (0, 0, 0)
stew_root.keyframe_insert(data_path="location", frame=1)
stew_root.keyframe_insert(data_path="rotation_euler", frame=1)
stew_arm_r.keyframe_insert(data_path="rotation_euler", frame=1)
stew_arm_l.keyframe_insert(data_path="rotation_euler", frame=1)

stew_root.location = (0, 3.2, 0.25)
stew_root.rotation_euler = (0, 0, 0)
stew_arm_r.rotation_euler = (0, 0, 0)
stew_arm_l.rotation_euler = (0, 0, 0)
stew_root.keyframe_insert(data_path="location", frame=160)
stew_root.keyframe_insert(data_path="rotation_euler", frame=160)
stew_arm_r.keyframe_insert(data_path="rotation_euler", frame=160)
stew_arm_l.keyframe_insert(data_path="rotation_euler", frame=160)

# Sudden violent stumble at frame 175-185!
stew_root.location = (0.35, 3.8, 0.18)
stew_root.rotation_euler = (math.radians(14), math.radians(-28), math.radians(22)) # Sideways fall
stew_arm_r.rotation_euler = (math.radians(-50), math.radians(70), 0) # Arm grabs seat
stew_arm_l.rotation_euler = (math.radians(35), math.radians(-30), 0) # Arm balances
stew_root.keyframe_insert(data_path="location", frame=178)
stew_root.keyframe_insert(data_path="rotation_euler", frame=178)
stew_arm_r.keyframe_insert(data_path="rotation_euler", frame=178)
stew_arm_l.keyframe_insert(data_path="rotation_euler", frame=178)

# Second jolt
stew_root.location = (0.22, 4.3, 0.22)
stew_root.rotation_euler = (math.radians(-8), math.radians(12), math.radians(-10))
stew_root.keyframe_insert(data_path="location", frame=195)
stew_root.keyframe_insert(data_path="rotation_euler", frame=195)

# Regains balance and hurries forward to cockpit door
stew_root.location = (0, 5.2, 0.25)
stew_root.rotation_euler = (0, 0, 0)
stew_arm_r.rotation_euler = (0, 0, 0)
stew_arm_l.rotation_euler = (0, 0, 0)
stew_root.keyframe_insert(data_path="location", frame=212)
stew_root.keyframe_insert(data_path="rotation_euler", frame=212)
stew_arm_r.keyframe_insert(data_path="rotation_euler", frame=212)
stew_arm_l.keyframe_insert(data_path="rotation_euler", frame=212)

# Arrives at Cockpit Door at Y: 7.05 and frantically bangs on it!
stew_root.location = (0, 7.05, 0.25)
stew_arm_r.rotation_euler = (math.radians(-85), 0, math.radians(20))
stew_root.keyframe_insert(data_path="location", frame=238)
stew_arm_r.keyframe_insert(data_path="rotation_euler", frame=238)

for kf, arm_rot in [(242, -65), (245, -88), (248, -68), (252, -85)]:
    stew_arm_r.rotation_euler = (math.radians(arm_rot), 0, math.radians(20))
    stew_arm_r.keyframe_insert(data_path="rotation_euler", frame=kf)

# ==============================================================================
# 7. COCKPIT INTERIOR & THE LIFE-OR-DEATH PILOT FIGHT
# ==============================================================================
# Bulkhead Wall
bpy.ops.mesh.primitive_cube_add(location=(-1.15, 7.4, 1.35))
wall_l = bpy.context.active_object
wall_l.scale = (0.75, 0.08, 1.1)
wall_l.data.materials.append(mat_hull_inner)
wall_l.parent = plane_root

bpy.ops.mesh.primitive_cube_add(location=(1.15, 7.4, 1.35))
wall_r = bpy.context.active_object
wall_r.scale = (0.75, 0.08, 1.1)
wall_r.data.materials.append(mat_hull_inner)
wall_r.parent = plane_root

# Cockpit Door (Swings violently open as camera breaches! Frames 242 - 255)
bpy.ops.mesh.primitive_cube_add(location=(-0.38, 7.42, 1.35))
cockpit_door = bpy.context.active_object
cockpit_door.name = "Cockpit_Security_Door"
cockpit_door.scale = (0.38, 0.04, 1.05)
cockpit_door.data.materials.append(mat_seat_frame)
cockpit_door.parent = plane_root

cockpit_door.rotation_euler = (0, 0, 0)
cockpit_door.keyframe_insert(data_path="rotation_euler", frame=240)
cockpit_door.rotation_euler = (0, 0, math.radians(-75))
cockpit_door.location = (-0.55, 7.6, 1.35)
cockpit_door.keyframe_insert(data_path="rotation_euler", frame=254)
cockpit_door.keyframe_insert(data_path="location", frame=254)

# Cockpit Windshield (Panorama looking out at twilight sky)
bpy.ops.mesh.primitive_cube_add(location=(0, 13.5, 1.9))
windshield = bpy.context.active_object
windshield.name = "CockpitWindshield"
windshield.scale = (1.7, 0.9, 0.65)
windshield.rotation_euler = (math.radians(-32), 0, 0)
windshield.data.materials.append(mat_glass)
windshield.parent = plane_root

# Main Instrument Panel / Dashboard
bpy.ops.mesh.primitive_cube_add(location=(0, 11.6, 1.05))
dash = bpy.context.active_object
dash.scale = (1.8, 0.65, 0.45)
dash.data.materials.append(mat_engine_dark)
dash.parent = plane_root

# HUDs
hud_coords = [(-0.85, 11.2, 1.25), (-0.35, 11.2, 1.25), (0.35, 11.2, 1.25), (0.85, 11.2, 1.25)]
for idx, (hx, hy, hz) in enumerate(hud_coords):
    bpy.ops.mesh.primitive_cube_add(location=(hx, hy, hz))
    hud = bpy.context.active_object
    hud.scale = (0.20, 0.02, 0.18)
    hud.data.materials.append(mat_hud_display if idx != 1 else mat_hud_alert)
    hud.parent = plane_root

# Cockpit Lighting
bpy.ops.object.light_add(type='POINT', location=(0, 9.8, 2.1))
cockpit_top_light = bpy.context.active_object
cockpit_top_light.data.energy = 130
cockpit_top_light.data.color = (0.2, 0.95, 0.75)
cockpit_top_light.parent = plane_root

bpy.ops.object.light_add(type='POINT', location=(0, 10.8, 1.4))
cockpit_dash_light = bpy.context.active_object
cockpit_dash_light.data.energy = 80
cockpit_dash_light.data.color = (1.0, 0.35, 0.08)
cockpit_dash_light.parent = plane_root

# --- PILOT 1: THE CAPTAIN (Left Seat X: -0.65) - Defending & Fighting Back ---
bpy.ops.object.empty_add(type='PLAIN_AXES', location=(-0.65, 9.7, 0.25))
cap_root = bpy.context.active_object
cap_root.name = "Captain_Defending_Root"
cap_root.parent = plane_root

# Captain Seat (Low profile backrest so fight is clearly visible)
bpy.ops.mesh.primitive_cube_add(location=(-0.65, 9.7, 0.55))
cap_seat_b = bpy.context.active_object
cap_seat_b.scale = (0.32, 0.32, 0.32)
cap_seat_b.data.materials.append(mat_seat_frame)
cap_seat_b.parent = plane_root

bpy.ops.mesh.primitive_cube_add(location=(-0.65, 9.4, 0.85))
cap_seat_back = bpy.context.active_object
cap_seat_back.scale = (0.32, 0.06, 0.35)
cap_seat_back.data.materials.append(mat_seat_blue)
cap_seat_back.parent = plane_root

# Captain Torso
bpy.ops.mesh.primitive_cylinder_add(radius=0.19, depth=0.6, location=(0, 0, 0.85))
cap_torso = bpy.context.active_object
cap_torso.data.materials.append(mat_pilot_white)
cap_torso.parent = cap_root

for side in [-0.19, 0.19]:
    bpy.ops.mesh.primitive_cube_add(location=(side, 0, 1.15))
    epaulet = bpy.context.active_object
    epaulet.scale = (0.05, 0.09, 0.02)
    epaulet.data.materials.append(mat_pilot_gold)
    epaulet.parent = cap_torso

# Captain Head & Pilot Cap
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.13, location=(0, 0, 1.3))
cap_head = bpy.context.active_object
cap_head.data.materials.append(mat_skin)
cap_head.parent = cap_root

bpy.ops.mesh.primitive_cylinder_add(radius=0.15, depth=0.08, location=(0, -0.02, 1.42))
cap_hat = bpy.context.active_object
cap_hat.data.materials.append(mat_stewardess)
cap_hat.parent = cap_root

# Captain Defensive Raised Arms (Both arms blocking the weapon strike)
bpy.ops.mesh.primitive_cylinder_add(radius=0.055, depth=0.55, location=(0.26, -0.12, 1.3))
cap_arm_r = bpy.context.active_object
cap_arm_r.name = "Captain_Defending_Arm_R"
cap_arm_r.rotation_euler = (math.radians(-75), math.radians(-35), math.radians(45))
cap_arm_r.data.materials.append(mat_pilot_white)
cap_arm_r.parent = cap_root

bpy.ops.mesh.primitive_cylinder_add(radius=0.055, depth=0.55, location=(0.18, -0.22, 1.35))
cap_arm_l = bpy.context.active_object
cap_arm_l.name = "Captain_Defending_Arm_L"
cap_arm_l.rotation_euler = (math.radians(-65), math.radians(-20), math.radians(35))
cap_arm_l.data.materials.append(mat_pilot_white)
cap_arm_l.parent = cap_root

# --- PILOT 2: THE ROGUE ATTACKER (Unbuckled, Lunging with Baton!) ---
bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0.35, 9.5, 0.25))
atk_root = bpy.context.active_object
atk_root.name = "Attacker_Pilot_Root"
atk_root.parent = plane_root

# Attacker Seat
bpy.ops.mesh.primitive_cube_add(location=(0.65, 9.7, 0.55))
atk_seat = bpy.context.active_object
atk_seat.scale = (0.32, 0.32, 0.32)
atk_seat.data.materials.append(mat_seat_frame)
atk_seat.parent = plane_root

# Attacker Torso (Leaning aggressively into center aisle toward Captain)
bpy.ops.mesh.primitive_cylinder_add(radius=0.19, depth=0.62, location=(0, 0, 0.88))
atk_torso = bpy.context.active_object
atk_torso.data.materials.append(mat_pilot_white)
atk_torso.parent = atk_root

# Attacker Head
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.13, location=(0, 0, 1.35))
atk_head = bpy.context.active_object
atk_head.data.materials.append(mat_skin)
atk_head.parent = atk_root

# Attacker Striking Arm (Raised overhead wielding weapon)
bpy.ops.mesh.primitive_cylinder_add(radius=0.06, depth=0.55, location=(-0.22, -0.15, 1.45))
atk_arm_swing = bpy.context.active_object
atk_arm_swing.name = "Attacker_Striking_Arm"
atk_arm_swing.rotation_euler = (math.radians(-115), math.radians(-25), math.radians(-35))
atk_arm_swing.data.materials.append(mat_pilot_white)
atk_arm_swing.parent = atk_root

# The Weapon ("в руке палка" - Heavy Tactical Baton)
bpy.ops.mesh.primitive_cylinder_add(radius=0.048, depth=1.05, location=(-0.38, -0.28, 1.82))
baton = bpy.context.active_object
baton.name = "Cockpit_Fight_Baton"
baton.rotation_euler = (math.radians(-70), math.radians(-30), math.radians(-40))
baton.data.materials.append(mat_weapon_baton)
baton.parent = atk_arm_swing

# Attacker Arm 2 (Choking / gripping Captain's collar)
bpy.ops.mesh.primitive_cylinder_add(radius=0.055, depth=0.55, location=(-0.32, 0.05, 1.18))
atk_arm_grapple = bpy.context.active_object
atk_arm_grapple.rotation_euler = (math.radians(-40), math.radians(-50), math.radians(20))
atk_arm_grapple.data.materials.append(mat_pilot_white)
atk_arm_grapple.parent = atk_root

# --- BRAWL ANIMATION KEYFRAMES (Frames 240 - 300) ---
for f in range(240, 301, 6):
    strike_phase = math.sin((f - 240) * 0.45)
    swing_angle = -115 + strike_phase * 45
    atk_arm_swing.rotation_euler = (math.radians(swing_angle), math.radians(-25), math.radians(-35))
    atk_root.location = (0.35 - strike_phase * 0.12, 9.5 - strike_phase * 0.08, 0.25)
    atk_root.rotation_euler = (math.radians(strike_phase * 8), math.radians(-15), math.radians(-12))
    atk_arm_swing.keyframe_insert(data_path="rotation_euler", frame=f)
    atk_root.keyframe_insert(data_path="location", frame=f)
    atk_root.keyframe_insert(data_path="rotation_euler", frame=f)
    
    cap_def_angle = -75 - strike_phase * 25
    cap_arm_r.rotation_euler = (math.radians(cap_def_angle), math.radians(-35), math.radians(45))
    cap_root.location = (-0.65 - strike_phase * 0.06, 9.7 + strike_phase * 0.05, 0.25)
    cap_root.rotation_euler = (math.radians(10 + strike_phase * 6), math.radians(-12), math.radians(35))
    cap_arm_r.keyframe_insert(data_path="rotation_euler", frame=f)
    cap_root.keyframe_insert(data_path="location", frame=f)
    cap_root.keyframe_insert(data_path="rotation_euler", frame=f)

# ==============================================================================
# 8. MASTER CONTINUOUS CINEMATIC CAMERA TRAJECTORY (300 FRAMES)
# ==============================================================================
bpy.ops.object.camera_add(location=(-14.0, -18.0, 4.5))
cam = bpy.context.active_object
cam.name = "Master_Action_Camera"
scene.camera = cam
cam.data.lens = 24  # 24mm Ultra-Wide Dynamic Cinema Lens
scene.render.use_motion_blur = True

# --- 4 DISTINCT PHASES OF CAMERA FLIGHT ---

# PHASE 1: EXTERIOR FLYBY (Frames 1 - 65 / 0.0s - 2.2s)
cam.location = (-13.0, -16.0, 4.0)
cam.rotation_euler = (math.radians(82), math.radians(-6), math.radians(-42))
cam.keyframe_insert(data_path="location", frame=1)
cam.keyframe_insert(data_path="rotation_euler", frame=1)

cam.location = (-6.5, -9.0, 2.4)
cam.rotation_euler = (math.radians(86), math.radians(-4), math.radians(-32))
cam.keyframe_insert(data_path="location", frame=40)
cam.keyframe_insert(data_path="rotation_euler", frame=40)

# Angling directly toward the open window portal at Y: -3.5
cam.location = (-3.0, -4.2, 1.45)
cam.rotation_euler = (math.radians(89), math.radians(-2), math.radians(-45))
cam.keyframe_insert(data_path="location", frame=65)
cam.keyframe_insert(data_path="rotation_euler", frame=65)

# PHASE 2: PIERCE THROUGH WINDOW INTO CABIN AISLE (Frames 66 - 90 / 2.2s - 3.0s)
# Point-blank dive into window opening
cam.location = (-2.0, -3.5, 1.4)
cam.rotation_euler = (math.radians(90), 0, math.radians(-65))
cam.keyframe_insert(data_path="location", frame=72)
cam.keyframe_insert(data_path="rotation_euler", frame=72)

# Emerging inside the cabin center aisle
cam.location = (-0.8, -3.0, 1.35)
cam.rotation_euler = (math.radians(90), 0, math.radians(-25))
cam.keyframe_insert(data_path="location", frame=80)
cam.keyframe_insert(data_path="rotation_euler", frame=80)

cam.location = (0, -2.2, 1.32)
cam.rotation_euler = (math.radians(90), 0, 0)
cam.keyframe_insert(data_path="location", frame=90)
cam.keyframe_insert(data_path="rotation_euler", frame=90)

# Gliding down the center aisle (Stewardess is walking ahead at 2.5m distance)
cam.location = (0, 0.2, 1.32)
cam.rotation_euler = (math.radians(90), 0, 0)
cam.keyframe_insert(data_path="location", frame=155)
cam.keyframe_insert(data_path="rotation_euler", frame=155)

# PHASE 3: SUDDEN TURBULENCE JOLT & CAMERA ROLL (Frames 160 - 200 / 5.3s - 6.7s)
cam.location = (-0.22, 1.0, 1.15)
cam.rotation_euler = (math.radians(95), math.radians(-16), math.radians(8)) # Dutch Roll!
cam.keyframe_insert(data_path="location", frame=172)
cam.keyframe_insert(data_path="rotation_euler", frame=172)

cam.location = (0.25, 1.8, 1.25)
cam.rotation_euler = (math.radians(85), math.radians(14), math.radians(-6))
cam.keyframe_insert(data_path="location", frame=186)
cam.keyframe_insert(data_path="rotation_euler", frame=186)

# Stabilization & tracking stewardess forward (Frames 200 - 235 / 6.7s - 7.8s)
cam.location = (0, 3.8, 1.32)
cam.rotation_euler = (math.radians(90), 0, 0)
cam.keyframe_insert(data_path="location", frame=210)
cam.keyframe_insert(data_path="rotation_euler", frame=210)

cam.location = (0, 5.8, 1.35)
cam.rotation_euler = (math.radians(90), 0, 0)
cam.keyframe_insert(data_path="location", frame=235)
cam.keyframe_insert(data_path="rotation_euler", frame=235)

# PHASE 4: BREACH THROUGH DOOR INTO THE COCKPIT FIGHT! (Frames 240 - 300 / 8.0s - 10.0s)
cam.location = (0, 7.3, 1.35)
cam.rotation_euler = (math.radians(90), 0, 0)
cam.keyframe_insert(data_path="location", frame=248)
cam.keyframe_insert(data_path="rotation_euler", frame=248)

# Framing BOTH fighting pilots dynamically from 1.6m away
cam.location = (-0.1, 8.0, 1.35)
cam.rotation_euler = (math.radians(88), math.radians(-5), math.radians(6))
cam.keyframe_insert(data_path="location", frame=270)
cam.keyframe_insert(data_path="rotation_euler", frame=270)

# Intense push-in between the weapon and the defending captain
cam.location = (-0.08, 8.45, 1.42)
cam.rotation_euler = (math.radians(87), math.radians(4), math.radians(-3))
cam.keyframe_insert(data_path="location", frame=300)
cam.keyframe_insert(data_path="rotation_euler", frame=300)

# Set 3D Viewport in Blender to Camera Rendered View
for window in bpy.context.window_manager.windows:
    for area in window.screen.areas:
        if area.type == 'VIEW_3D':
            for space in area.spaces:
                if space.type == 'VIEW_3D':
                    space.shading.type = 'RENDERED'
                    space.region_3d.view_perspective = 'CAMERA'

print(">>> PERFECTED AIRLINER CONTINUOUS 10-SEC ACTION SEQUENCE BUILT! <<<")
`;

const client = new net.Socket();
client.connect(9876, '127.0.0.1', () => {
  console.log('Sending perfected cinematic scene to Blender...');
  client.write(JSON.stringify({
    type: 'execute_code',
    params: { code: blenderScript }
  }));
});

let responseData = '';
client.on('data', (data) => {
  responseData += data.toString();
  try {
    const parsed = JSON.parse(responseData);
    console.log('Result from Blender:', parsed);
    client.destroy();
  } catch (e) {
    // waiting for full json
  }
});

client.on('error', (err) => {
  console.error('Socket error:', err);
});
