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
# 2. PBR SHADERS & MATERIALS
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

# Act 1 & 2 Reality Materials (Sunset airliner & cabin)
mat_hull_gloss  = create_mat("FuselageGlossWhite", (0.96, 0.96, 0.98, 1.0), roughness=0.15, metallic=0.05)
mat_hull_inner  = create_mat("CabinWallCream", (0.90, 0.91, 0.93, 1.0), roughness=0.6)
mat_wing_grey   = create_mat("WingMetal", (0.72, 0.74, 0.78, 1.0), roughness=0.25, metallic=0.45)
mat_engine_dark = create_mat("EngineTitanium", (0.15, 0.17, 0.20, 1.0), roughness=0.2, metallic=0.85)
mat_engine_glow = create_mat("EngineExhaustGlow", (1.0, 0.45, 0.08, 1.0), emission=(1.0, 0.45, 0.08, 1.0), emission_strength=20.0)
mat_win_glow    = create_mat("WindowAmberGlow", (1.0, 0.92, 0.75, 1.0), emission=(1.0, 0.92, 0.75, 1.0), emission_strength=10.0)
mat_carpet      = create_mat("AisleNavyCarpet", (0.06, 0.10, 0.18, 1.0), roughness=0.9)
mat_seat_blue   = create_mat("AirlineSeatBlue", (0.12, 0.24, 0.42, 1.0), roughness=0.55)
mat_seat_frame  = create_mat("SeatFrameDark", (0.12, 0.12, 0.15, 1.0), roughness=0.35, metallic=0.5)
mat_light_strip = create_mat("AisleLEDStrip", (1.0, 0.96, 0.88, 1.0), emission=(1.0, 0.96, 0.88, 1.0), emission_strength=16.0)
mat_passenger   = create_mat("PassengerCrowd", (0.15, 0.16, 0.2, 1.0), roughness=0.7)

# Act 3 Digital Mirrored Geometric Tunnel (Ref #3: Bright white abstract geometric perspective)
mat_tunnel_white = create_mat("TunnelEmissiveWhite", (1.0, 1.0, 1.0, 1.0), emission=(1.0, 1.0, 1.0, 1.0), emission_strength=12.0)
mat_tunnel_mirror= create_mat("TunnelChromeMirror", (0.92, 0.95, 1.0, 1.0), roughness=0.03, metallic=0.98)
mat_digital_cyan = create_mat("DigitalNeonCyan", (0.0, 0.9, 1.0, 1.0), emission=(0.0, 0.9, 1.0, 1.0), emission_strength=20.0)
mat_digital_pink = create_mat("DigitalNeonMagenta", (1.0, 0.1, 0.6, 1.0), emission=(1.0, 0.1, 0.6, 1.0), emission_strength=20.0)

# Act 4 Blender Viewport & UI (Ref #4)
mat_blender_orange = create_mat("BlenderSelectOrange", (1.0, 0.48, 0.05, 1.0), emission=(1.0, 0.48, 0.05, 1.0), emission_strength=18.0)
mat_grid_floor     = create_mat("BlenderViewportDark", (0.11, 0.12, 0.14, 1.0), roughness=0.85)
mat_grid_sublines  = create_mat("GridSubdivisionLine", (0.24, 0.26, 0.30, 1.0), roughness=0.5)
mat_axis_x_red     = create_mat("BlenderAxisRedX", (1.0, 0.15, 0.15, 1.0), emission=(1.0, 0.15, 0.15, 1.0), emission_strength=25.0)
mat_axis_y_green   = create_mat("BlenderAxisGreenY", (0.15, 0.95, 0.25, 1.0), emission=(0.15, 0.95, 0.25, 1.0), emission_strength=25.0)
mat_axis_z_blue    = create_mat("BlenderAxisBlueZ", (0.2, 0.55, 1.0, 1.0), emission=(0.2, 0.55, 1.0, 1.0), emission_strength=25.0)
mat_cursor_white   = create_mat("CursorWhite", (1.0, 1.0, 1.0, 1.0), emission=(1.0, 1.0, 1.0, 1.0), emission_strength=18.0)
mat_ui_panel_bg    = create_mat("BlenderUIPanelSlate", (0.15, 0.16, 0.18, 1.0), roughness=0.5)
mat_ui_header_bar  = create_mat("BlenderUIHeaderDark", (0.09, 0.10, 0.11, 1.0), roughness=0.4)
mat_node_bsdf      = create_mat("ShaderNodeBody", (0.18, 0.26, 0.22, 1.0), roughness=0.4)
mat_noodle_wire    = create_mat("ShaderNoodleWire", (0.2, 0.9, 0.4, 1.0), emission=(0.2, 0.9, 0.4, 1.0), emission_strength=20.0)
mat_keyframe_gold  = create_mat("TimelineKeyframeGold", (0.95, 0.75, 0.1, 1.0), emission=(0.95, 0.75, 0.1, 1.0), emission_strength=20.0)

# ==============================================================================
# 3. ENVIRONMENT & SKY LIGHTING (DUSK STRATOSPHERE)
# ==============================================================================
world = scene.world
if world and world.node_tree:
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs["Color"].default_value = (0.06, 0.09, 0.18, 1.0)
        bg.inputs["Strength"].default_value = 0.65

bpy.ops.object.light_add(type='SUN', location=(-30, -50, 25))
sun = bpy.context.active_object
sun.name = "DuskHorizonSun"
sun.data.energy = 5.5
sun.data.color = (1.0, 0.50, 0.16)
sun.rotation_euler = (math.radians(-22), math.radians(-38), math.radians(40))

# Stratosphere Cloud Deck Below (Z: -18)
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, -5, -18))
clouds = bpy.context.active_object
clouds.name = "StratosphereClouds"
clouds.scale = (220, 220, 1)
clouds.data.materials.append(create_mat("CloudDeck", (0.76, 0.69, 0.72, 1.0), roughness=0.95))

# ==============================================================================
# 4. ROOT OBJECTS FOR STAGING & TRANSITIONS
# ==============================================================================
root_reality = bpy.data.objects.new("Root_Act1_2_Reality", None)
scene.collection.objects.link(root_reality)

root_digital = bpy.data.objects.new("Root_Act3_DigitalTunnel", None)
scene.collection.objects.link(root_digital)

root_blender = bpy.data.objects.new("Root_Act4_BlenderViewport", None)
scene.collection.objects.link(root_blender)

# Hide Digital Tunnel and Blender UI during Act 1 and Act 2 (Scale 0 from frame 1 to 140)
root_digital.scale = (0.0001, 0.0001, 0.0001)
root_digital.keyframe_insert(data_path="scale", frame=1)
root_digital.keyframe_insert(data_path="scale", frame=140)
root_digital.scale = (1.0, 1.0, 1.0)
root_digital.keyframe_insert(data_path="scale", frame=145)

root_blender.scale = (0.0001, 0.0001, 0.0001)
root_blender.keyframe_insert(data_path="scale", frame=1)
root_blender.keyframe_insert(data_path="scale", frame=175)
root_blender.scale = (1.0, 1.0, 1.0)
root_blender.keyframe_insert(data_path="scale", frame=190)

# Reality geometry dissolves / scales down at Frame 158 - 170
root_reality.scale = (1.0, 1.0, 1.0)
root_reality.keyframe_insert(data_path="scale", frame=1)
root_reality.keyframe_insert(data_path="scale", frame=156)
root_reality.scale = (0.0001, 0.0001, 0.0001)
root_reality.keyframe_insert(data_path="scale", frame=170)

# ==============================================================================
# 5. ACT 1 & ACT 2: REALISTIC AIRLINER & CABIN
# ==============================================================================
# Exterior Fuselage
bpy.ops.mesh.primitive_cylinder_add(radius=2.2, depth=22, location=(0, -4.5, 1.35))
fuselage = bpy.context.active_object
fuselage.name = "Fuselage_Main"
fuselage.rotation_euler = (math.radians(90), 0, 0)
fuselage.data.materials.append(mat_hull_gloss)
fuselage.parent = root_reality

# Nose Cone
bpy.ops.mesh.primitive_cone_add(radius1=2.2, radius2=0.3, depth=5.0, location=(0, 7.5, 1.35))
nose = bpy.context.active_object
nose.name = "NoseCone"
nose.rotation_euler = (math.radians(-90), 0, 0)
nose.data.materials.append(mat_hull_gloss)
nose.parent = root_reality

# Swept Wings
bpy.ops.mesh.primitive_cube_add(location=(0, -5.0, 0.7))
wings = bpy.context.active_object
wings.name = "SweptWings"
wings.scale = (17.5, 2.6, 0.14)
wings.rotation_euler = (math.radians(3), 0, 0)
wings.data.materials.append(mat_wing_grey)
wings.parent = root_reality

# Jet Engines
for side, s_name in [(-1, "L"), (1, "R")]:
    bpy.ops.mesh.primitive_cylinder_add(radius=0.85, depth=3.6, location=(side * 6.2, -4.5, -0.4))
    engine = bpy.context.active_object
    engine.name = f"JetEngine_{s_name}"
    engine.rotation_euler = (math.radians(90), 0, 0)
    engine.data.materials.append(mat_engine_dark)
    engine.parent = root_reality
    
    bpy.ops.mesh.primitive_cylinder_add(radius=0.65, depth=0.2, location=(side * 6.2, -6.3, -0.4))
    exhaust = bpy.context.active_object
    exhaust.rotation_euler = (math.radians(90), 0, 0)
    exhaust.data.materials.append(mat_engine_glow)
    exhaust.parent = root_reality

# Tail Fin
bpy.ops.mesh.primitive_cube_add(location=(0, -15.5, 4.6))
tail_fin = bpy.context.active_object
tail_fin.scale = (0.12, 2.2, 3.2)
tail_fin.rotation_euler = (math.radians(-28), 0, 0)
tail_fin.data.materials.append(mat_hull_gloss)
tail_fin.parent = root_reality

# Passenger Windows
for side in [-1, 1]:
    for idx, wy in enumerate([-8.0, -6.5, -5.0, -3.5, -2.0, -0.5, 1.0, 2.5, 4.0]):
        if side < 0 and abs(wy - (-3.5)) < 0.1:
            continue # Open portal for camera penetration
        bpy.ops.mesh.primitive_cube_add(location=(side * 2.21, wy, 1.4))
        win = bpy.context.active_object
        win.scale = (0.02, 0.28, 0.38)
        win.data.materials.append(mat_win_glow)
        win.parent = root_reality

# Cabin Interior (Open forward end so camera smoothly continues into deconstruction)
bpy.ops.mesh.primitive_cube_add(location=(0, -0.5, 0.25))
floor = bpy.context.active_object
floor.name = "CabinFloor"
floor.scale = (2.05, 7.5, 0.04)
floor.data.materials.append(mat_carpet)
floor.parent = root_reality

bpy.ops.mesh.primitive_cube_add(location=(0, -0.5, 2.45))
ceiling = bpy.context.active_object
ceiling.name = "CabinCeiling"
ceiling.scale = (2.05, 7.5, 0.04)
ceiling.data.materials.append(mat_hull_inner)
ceiling.parent = root_reality

bpy.ops.mesh.primitive_cube_add(location=(0, -0.5, 2.43))
led = bpy.context.active_object
led.scale = (0.14, 7.4, 0.02)
led.data.materials.append(mat_light_strip)
led.parent = root_reality

for ly in [-5.0, -2.0, 1.5, 5.0]:
    bpy.ops.object.light_add(type='POINT', location=(0, ly, 2.25))
    clight = bpy.context.active_object
    clight.data.energy = 110
    clight.data.color = (1.0, 0.94, 0.86)
    clight.parent = root_reality

# Cabin Seats & Passenger Crowd (Y: -6.0 to 5.0)
for idx, ry in enumerate([-6.0, -4.5, -3.0, -1.5, 0.0, 1.5, 3.0, 4.5]):
    for side in [-1, 1]:
        sx = side * 1.25
        bpy.ops.mesh.primitive_cube_add(location=(sx, ry, 0.55))
        seat_b = bpy.context.active_object
        seat_b.scale = (0.6, 0.35, 0.32)
        seat_b.data.materials.append(mat_seat_blue)
        seat_b.parent = root_reality
        
        bpy.ops.mesh.primitive_cube_add(location=(sx, ry - 0.28, 0.95))
        seat_back = bpy.context.active_object
        seat_back.scale = (0.6, 0.08, 0.45)
        seat_back.rotation_euler = (math.radians(-6), 0, 0)
        seat_back.data.materials.append(mat_seat_blue)
        seat_back.parent = root_reality
        
        if (idx + (1 if side > 0 else 0)) % 2 == 0:
            bpy.ops.mesh.primitive_cylinder_add(radius=0.18, depth=0.55, location=(sx, ry - 0.08, 0.88))
            p_torso = bpy.context.active_object
            p_torso.data.materials.append(mat_passenger)
            p_torso.parent = root_reality
            
            bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.12, location=(sx, ry - 0.1, 1.3))
            p_head = bpy.context.active_object
            p_head.data.materials.append(mat_passenger)
            p_head.parent = root_reality

# ==============================================================================
# 6. ACT 3: DIGITAL DECONSTRUCTION & ABSTRACT MIRRORED TUNNEL (Ref #3)
# ==============================================================================
# Floating digital voxels & mesh shards (Y: 6.0 to 14.0)
voxel_positions = [
    (-1.4, 6.5, 1.6), (1.3, 7.0, 1.2), (-0.9, 7.8, 2.2), (1.1, 8.4, 0.7),
    (-1.5, 9.2, 1.0), (1.4, 9.8, 2.0), (0.0, 10.5, 2.3), (-1.0, 11.2, 0.6),
    (0.9, 11.8, 1.9), (-1.3, 12.5, 1.5), (1.2, 13.0, 1.0), (0.0, 13.8, 0.5)
]
for idx, (vx, vy, vz) in enumerate(voxel_positions):
    bpy.ops.mesh.primitive_cube_add(location=(vx, vy, vz))
    cube = bpy.context.active_object
    cube.name = f"Voxel_Shard_{idx}"
    cube.scale = (0.22, 0.22, 0.22)
    cube.rotation_euler = (math.radians(idx * 30), math.radians(idx * 45), math.radians(idx * 20))
    cube.data.materials.append(mat_digital_cyan if idx % 2 == 0 else mat_digital_pink)
    cube.parent = root_digital

# Abstract Mirrored Geometric Tunnel (Ref #3: Perspective Polyhedral Corridor)
# Constructed using HOLLOW octagonal rings (end_fill_type='NOTHING') with chrome mirror & bright emissive facets!
tunnel_rings = 12
ring_start_y = 14.0
ring_spacing = 1.8

for r_idx in range(tunnel_rings):
    ry = ring_start_y + r_idx * ring_spacing
    rot_angle = math.radians(r_idx * 15)
    
    # Outer Faceted Octagon (Mirror Chrome walls)
    bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=2.6, depth=1.6, end_fill_type='NOTHING', location=(0, ry, 1.35))
    ring_outer = bpy.context.active_object
    ring_outer.name = f"Tunnel_Wall_{r_idx}"
    ring_outer.rotation_euler = (math.radians(90), 0, rot_angle)
    ring_outer.data.materials.append(mat_tunnel_mirror)
    ring_outer.parent = root_digital
    
    # Glowing White Frame Rings at each section joint (Ref #3 bright geometric frames)
    for side_offset in [-0.75, 0.75]:
        bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=2.55, depth=0.08, end_fill_type='NOTHING', location=(0, ry + side_offset, 1.35))
        frame_ring = bpy.context.active_object
        frame_ring.rotation_euler = (math.radians(90), 0, rot_angle)
        frame_ring.data.materials.append(mat_tunnel_white)
        frame_ring.parent = root_digital

    # Sharp geometric corner struts / neon ribs
    for angle in [0, 45, 90, 135, 180, 225, 270, 315]:
        rad = math.radians(angle) + rot_angle
        px = math.cos(rad) * 2.5
        pz = 1.35 + math.sin(rad) * 2.5
        bpy.ops.mesh.primitive_cube_add(location=(px, ry, pz))
        strut = bpy.context.active_object
        strut.scale = (0.04, 0.8, 0.04)
        strut.rotation_euler = (0, math.radians(90), rad)
        strut.data.materials.append(mat_digital_cyan if r_idx % 2 == 0 else mat_tunnel_white)
        strut.parent = root_digital

# Tunnel Lighting along interior
for ty in [16.0, 22.0, 28.0, 32.0]:
    bpy.ops.object.light_add(type='POINT', location=(0, ty, 1.35))
    t_light = bpy.context.active_object
    t_light.data.energy = 90
    t_light.data.color = (0.85, 0.95, 1.0)
    t_light.parent = root_digital

# ==============================================================================
# 7. ACT 4: THE BLENDER 3D VIEWPORT / AI PRODUCTION META-WORKSPACE (Ref #4)
# Space centered around Y: 52.0, Z: 3.5
# ==============================================================================
workspace_center_y = 52.0

# 1. INFINITE 3D FLOOR GRID (40 x 40)
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, workspace_center_y, 0))
grid_plane = bpy.context.active_object
grid_plane.name = "Blender_Grid_Floor"
grid_plane.scale = (40, 40, 1)
grid_plane.data.materials.append(mat_grid_floor)
grid_plane.parent = root_blender

# Coordinate Grid Lines
for gx in range(-18, 19, 2):
    if gx == 0:
        continue
    bpy.ops.mesh.primitive_cube_add(location=(gx, workspace_center_y, 0.005))
    gline = bpy.context.active_object
    gline.scale = (0.02, 20.0, 0.002)
    gline.data.materials.append(mat_grid_sublines)
    gline.parent = root_blender

for gy in range(-18, 19, 2):
    if gy == 0:
        continue
    bpy.ops.mesh.primitive_cube_add(location=(0, workspace_center_y + gy, 0.005))
    gline = bpy.context.active_object
    gline.scale = (20.0, 0.02, 0.002)
    gline.data.materials.append(mat_grid_sublines)
    gline.parent = root_blender

# Bright Red X-Axis Line
bpy.ops.mesh.primitive_cube_add(location=(0, workspace_center_y, 0.01))
axis_x_line = bpy.context.active_object
axis_x_line.scale = (20.0, 0.045, 0.005)
axis_x_line.data.materials.append(mat_axis_x_red)
axis_x_line.parent = root_blender

# Bright Green Y-Axis Line
bpy.ops.mesh.primitive_cube_add(location=(0, workspace_center_y, 0.01))
axis_y_line = bpy.context.active_object
axis_y_line.scale = (0.045, 20.0, 0.005)
axis_y_line.data.materials.append(mat_axis_y_green)
axis_y_line.parent = root_blender

# 2. 3D TRANSFORMATION GIZMO (Located at 0, 52, 3.5)
# Red X Arrow (+X)
bpy.ops.mesh.primitive_cylinder_add(radius=0.04, depth=2.4, location=(1.2, workspace_center_y, 3.5))
g_x_shaft = bpy.context.active_object
g_x_shaft.rotation_euler = (0, math.radians(90), 0)
g_x_shaft.data.materials.append(mat_axis_x_red)
g_x_shaft.parent = root_blender

bpy.ops.mesh.primitive_cone_add(radius1=0.14, radius2=0.0, depth=0.48, location=(2.5, workspace_center_y, 3.5))
g_x_cone = bpy.context.active_object
g_x_cone.rotation_euler = (0, math.radians(90), 0)
g_x_cone.data.materials.append(mat_axis_x_red)
g_x_cone.parent = root_blender

# Green Y Arrow (+Y)
bpy.ops.mesh.primitive_cylinder_add(radius=0.04, depth=2.4, location=(0, workspace_center_y + 1.2, 3.5))
g_y_shaft = bpy.context.active_object
g_y_shaft.rotation_euler = (math.radians(90), 0, 0)
g_y_shaft.data.materials.append(mat_axis_y_green)
g_y_shaft.parent = root_blender

bpy.ops.mesh.primitive_cone_add(radius1=0.14, radius2=0.0, depth=0.48, location=(0, workspace_center_y + 2.5, 3.5))
g_y_cone = bpy.context.active_object
g_y_cone.rotation_euler = (math.radians(-90), 0, 0)
g_y_cone.data.materials.append(mat_axis_y_green)
g_y_cone.parent = root_blender

# Blue Z Arrow (+Z)
bpy.ops.mesh.primitive_cylinder_add(radius=0.04, depth=2.4, location=(0, workspace_center_y, 4.7))
g_z_shaft = bpy.context.active_object
g_z_shaft.data.materials.append(mat_axis_z_blue)
g_z_shaft.parent = root_blender

bpy.ops.mesh.primitive_cone_add(radius1=0.14, radius2=0.0, depth=0.48, location=(0, workspace_center_y, 6.0))
g_z_cone = bpy.context.active_object
g_z_cone.data.materials.append(mat_axis_z_blue)
g_z_cone.parent = root_blender

# Rotation Arc Rings (Red, Green, Blue)
for axis, r_col, r_euler in [
    ("X", mat_axis_x_red, (0, math.radians(90), 0)),
    ("Y", mat_axis_y_green, (math.radians(90), 0, 0)),
    ("Z", mat_axis_z_blue, (0, 0, 0))
]:
    bpy.ops.mesh.primitive_torus_add(major_radius=1.8, minor_radius=0.025, location=(0, workspace_center_y, 3.5))
    arc = bpy.context.active_object
    arc.name = f"Gizmo_Arc_{axis}"
    arc.rotation_euler = r_euler
    arc.data.materials.append(r_col)
    arc.parent = root_blender

# 3D CURSOR (Red & White dashed ring at origin)
bpy.ops.mesh.primitive_torus_add(major_radius=0.4, minor_radius=0.03, location=(0, workspace_center_y, 3.5))
cursor_ring = bpy.context.active_object
cursor_ring.name = "Blender_3D_Cursor"
cursor_ring.data.materials.append(mat_cursor_white)
cursor_ring.parent = root_blender

# 3. 3D AIRLINER MESH MODEL IN ACTIVE SELECTION ORANGE (#FF7800)
# A complete wireframe 3D model of the airplane from Act 1, selected in the viewport!
bpy.ops.mesh.primitive_cylinder_add(radius=1.8, depth=14.0, location=(0, workspace_center_y, 3.5))
wire_plane = bpy.context.active_object
wire_plane.name = "Asset_Airliner_ActiveSelection"
wire_plane.rotation_euler = (math.radians(90), 0, 0)
wire_plane.data.materials.append(mat_blender_orange)
wire_plane.parent = root_blender
mod = wire_plane.modifiers.new(name="Wireframe", type='WIREFRAME')
mod.thickness = 0.04
mod.use_replace = True

# Wireframe Tapered Nose
bpy.ops.mesh.primitive_cone_add(radius1=1.8, radius2=0.2, depth=3.5, location=(0, workspace_center_y + 8.5, 3.5))
wire_nose = bpy.context.active_object
wire_nose.rotation_euler = (math.radians(-90), 0, 0)
wire_nose.data.materials.append(mat_blender_orange)
wire_nose.parent = root_blender
mod_n = wire_nose.modifiers.new(name="Wireframe", type='WIREFRAME')
mod_n.thickness = 0.035
mod_n.use_replace = True

# Wireframe Wings
bpy.ops.mesh.primitive_cube_add(location=(0, workspace_center_y - 1.0, 3.0))
wire_wings = bpy.context.active_object
wire_wings.scale = (12.0, 1.8, 0.08)
wire_wings.data.materials.append(mat_blender_orange)
wire_wings.parent = root_blender
mod_w = wire_wings.modifiers.new(name="Wireframe", type='WIREFRAME')
mod_w.thickness = 0.035
mod_w.use_replace = True

# Wireframe Tail Fin
bpy.ops.mesh.primitive_cube_add(location=(0, workspace_center_y - 6.5, 5.2))
wire_tail = bpy.context.active_object
wire_tail.scale = (0.08, 1.4, 1.8)
wire_tail.rotation_euler = (math.radians(-25), 0, 0)
wire_tail.data.materials.append(mat_blender_orange)
wire_tail.parent = root_blender
mod_t = wire_tail.modifiers.new(name="Wireframe", type='WIREFRAME')
mod_t.thickness = 0.035
mod_t.use_replace = True

# 4. FLOATING BLENDER UI PANELS & HUD OVERLAYS (Ref #4)
# A. Top Workspace Menus Header Bar
bpy.ops.mesh.primitive_cube_add(location=(0, workspace_center_y + 11.5, 10.5))
header_bar = bpy.context.active_object
header_bar.name = "UI_Top_Header_Bar"
header_bar.scale = (14.0, 0.08, 0.45)
header_bar.data.materials.append(mat_ui_header_bar)
header_bar.parent = root_blender

for idx, (tx, name, col) in enumerate([
    (-8.0, "Layout", mat_ui_panel_bg),
    (-4.5, "Modeling", mat_ui_panel_bg),
    (-1.0, "Shading", mat_blender_orange),
    (2.5, "GeometryNodes", mat_ui_panel_bg),
    (6.2, "AI_Production", mat_digital_cyan)
]):
    bpy.ops.mesh.primitive_cube_add(location=(tx, workspace_center_y + 11.4, 10.5))
    tab = bpy.context.active_object
    tab.scale = (1.4, 0.02, 0.35)
    tab.data.materials.append(col)
    tab.parent = root_blender

# B. Floating Outliner Tree Panel (Top Right: X: +8.5, Y: 56.0, Z: 6.5)
bpy.ops.mesh.primitive_cube_add(location=(8.5, workspace_center_y + 4.0, 6.5))
outliner = bpy.context.active_object
outliner.scale = (3.2, 0.08, 2.5)
outliner.rotation_euler = (0, 0, math.radians(-18))
outliner.data.materials.append(mat_ui_panel_bg)
outliner.parent = root_blender

for oy, o_col in [(8.0, mat_digital_cyan), (7.3, mat_blender_orange), (6.6, mat_tunnel_white), (5.9, mat_grid_sublines)]:
    bpy.ops.mesh.primitive_cube_add(location=(8.5, workspace_center_y + 3.85, oy))
    orow = bpy.context.active_object
    orow.scale = (2.8, 0.02, 0.18)
    orow.rotation_euler = (0, 0, math.radians(-18))
    orow.data.materials.append(o_col)
    orow.parent = root_blender

# C. Floating Shader Node Graph Panel (Left side: X: -8.0, Y: 56.0, Z: 6.8)
bpy.ops.mesh.primitive_cube_add(location=(-8.0, workspace_center_y + 5.0, 6.8))
node1 = bpy.context.active_object
node1.scale = (2.2, 0.08, 1.6)
node1.rotation_euler = (0, 0, math.radians(16))
node1.data.materials.append(mat_node_bsdf)
node1.parent = root_blender

bpy.ops.mesh.primitive_cube_add(location=(-4.8, workspace_center_y + 6.2, 7.2))
node2 = bpy.context.active_object
node2.scale = (1.2, 0.08, 1.2)
node2.rotation_euler = (0, 0, math.radians(16))
node2.data.materials.append(mat_ui_panel_bg)
node2.parent = root_blender

bpy.ops.mesh.primitive_cylinder_add(radius=0.03, depth=2.4, location=(-6.2, workspace_center_y + 5.5, 7.0))
noodle = bpy.context.active_object
noodle.rotation_euler = (0, math.radians(75), math.radians(20))
noodle.data.materials.append(mat_noodle_wire)
noodle.parent = root_blender

# D. Floating Bottom Timeline Bar with Keyframes & Playhead (Z: 0.8)
bpy.ops.mesh.primitive_cube_add(location=(0, workspace_center_y - 8.0, 0.8))
timeline = bpy.context.active_object
timeline.scale = (13.0, 0.08, 0.35)
timeline.data.materials.append(mat_ui_header_bar)
timeline.parent = root_blender

bpy.ops.mesh.primitive_cube_add(location=(1.5, workspace_center_y - 8.1, 0.8))
playhead = bpy.context.active_object
playhead.scale = (0.05, 0.02, 0.5)
playhead.data.materials.append(mat_blender_orange)
playhead.parent = root_blender

for kx in [-8.0, -4.5, -1.0, 1.5, 4.0, 7.5]:
    bpy.ops.mesh.primitive_cube_add(location=(kx, workspace_center_y - 8.1, 0.8))
    kf_diamond = bpy.context.active_object
    kf_diamond.scale = (0.1, 0.02, 0.1)
    kf_diamond.rotation_euler = (0, math.radians(45), 0)
    kf_diamond.data.materials.append(mat_keyframe_gold)
    kf_diamond.parent = root_blender

# Workspace Studio Lights
bpy.ops.object.light_add(type='POINT', location=(-8, workspace_center_y - 4, 12))
w_light1 = bpy.context.active_object
w_light1.data.energy = 400
w_light1.data.color = (0.85, 0.92, 1.0)
w_light1.parent = root_blender

bpy.ops.object.light_add(type='POINT', location=(8, workspace_center_y + 6, 9))
w_light2 = bpy.context.active_object
w_light2.data.energy = 250
w_light2.data.color = (1.0, 0.65, 0.3)
w_light2.parent = root_blender

# ==============================================================================
# 8. THE 10-SECOND CONTINUOUS MASTER CAMERA FLIGHT (300 FRAMES)
# ==============================================================================
bpy.ops.object.camera_add(location=(-12.5, -15.0, 3.8))
cam = bpy.context.active_object
cam.name = "Master_Continuous_Cinema_Camera"
scene.camera = cam
cam.data.lens = 24  # 24mm Cinema Lens
scene.render.use_motion_blur = True

# --- 4 PHASES OF CONTINUOUS ONE-TAKE CAMERA FLIGHT ---

# PHASE 1: REALISTIC AIRLINER EXTERIOR FLYBY (Frames 1 - 65 / 0.0s - 2.2s)
cam.location = (-12.5, -15.0, 3.8)
cam.rotation_euler = (math.radians(82), math.radians(-6), math.radians(-42))
cam.keyframe_insert(data_path="location", frame=1)
cam.keyframe_insert(data_path="rotation_euler", frame=1)

cam.location = (-6.5, -8.5, 2.2)
cam.rotation_euler = (math.radians(86), math.radians(-4), math.radians(-32))
cam.keyframe_insert(data_path="location", frame=40)
cam.keyframe_insert(data_path="rotation_euler", frame=40)

cam.location = (-3.0, -4.2, 1.45)
cam.rotation_euler = (math.radians(89), math.radians(-2), math.radians(-45))
cam.keyframe_insert(data_path="location", frame=65)
cam.keyframe_insert(data_path="rotation_euler", frame=65)

# PHASE 2: PIERCE THROUGH WINDOW INTO CABIN AISLE (Frames 66 - 145 / 2.2s - 4.8s)
cam.location = (-2.0, -3.5, 1.4)
cam.rotation_euler = (math.radians(90), 0, math.radians(-65))
cam.keyframe_insert(data_path="location", frame=72)
cam.keyframe_insert(data_path="rotation_euler", frame=72)

cam.location = (-0.8, -3.0, 1.35)
cam.rotation_euler = (math.radians(90), 0, math.radians(-25))
cam.keyframe_insert(data_path="location", frame=80)
cam.keyframe_insert(data_path="rotation_euler", frame=80)

cam.location = (0, -2.0, 1.32)
cam.rotation_euler = (math.radians(90), 0, 0)
cam.keyframe_insert(data_path="location", frame=90)
cam.keyframe_insert(data_path="rotation_euler", frame=90)

cam.location = (0, 1.8, 1.32)
cam.rotation_euler = (math.radians(90), 0, 0)
cam.keyframe_insert(data_path="location", frame=140)
cam.keyframe_insert(data_path="rotation_euler", frame=140)

# PHASE 3: SEVERE TURBULENCE SHOCKWAVE & DIGITAL TUNNEL (Frames 146 - 215 / 4.8s - 7.1s)
# Violent turbulence roll & pitch inside cabin
cam.location = (-0.25, 3.8, 1.15)
cam.rotation_euler = (math.radians(96), math.radians(-18), math.radians(10))
cam.keyframe_insert(data_path="location", frame=155)
cam.keyframe_insert(data_path="rotation_euler", frame=155)

cam.location = (0.28, 8.5, 1.25)
cam.rotation_euler = (math.radians(84), math.radians(16), math.radians(-8))
cam.keyframe_insert(data_path="location", frame=168)
cam.keyframe_insert(data_path="rotation_euler", frame=168)

# Accelerating into the white mirrored polyhedral tunnel (Ref #3)
cam.location = (0, 16.0, 1.35)
cam.rotation_euler = (math.radians(90), 0, 0)
cam.keyframe_insert(data_path="location", frame=182)
cam.keyframe_insert(data_path="rotation_euler", frame=182)

cam.location = (0, 27.0, 1.35)
cam.rotation_euler = (math.radians(90), 0, 0)
cam.keyframe_insert(data_path="location", frame=205)
cam.keyframe_insert(data_path="rotation_euler", frame=205)

# PHASE 4: BURST OUT INTO BLENDER 3D VIEWPORT META-WORKSPACE (Frames 216 - 300 / 7.2s - 10.0s)
# Exiting tunnel into the open grid space
cam.location = (0, 35.0, 2.5)
cam.rotation_euler = (math.radians(85), 0, 0)
cam.keyframe_insert(data_path="location", frame=220)
cam.keyframe_insert(data_path="rotation_euler", frame=220)

# Pulling back, ascending and panning into 3/4 high angle editor perspective
cam.location = (-7.0, 39.5, 6.8)
cam.rotation_euler = (math.radians(70), math.radians(-8), math.radians(-24))
cam.keyframe_insert(data_path="location", frame=250)
cam.keyframe_insert(data_path="rotation_euler", frame=250)

# Settling into the iconic Blender 3D Viewport composition
cam.location = (-12.0, 41.5, 10.5)
cam.rotation_euler = (math.radians(62), math.radians(-8), math.radians(-30))
cam.keyframe_insert(data_path="location", frame=290)
cam.keyframe_insert(data_path="rotation_euler", frame=290)

cam.location = (-12.2, 41.8, 10.6)
cam.rotation_euler = (math.radians(62), math.radians(-8), math.radians(-30))
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

print(">>> PERFECTED REALITY-TO-BLENDER DIGITAL PASS BUILT SUCCESSFULLY! <<<")
`;

const client = new net.Socket();
client.connect(9876, '127.0.0.1', () => {
  console.log('Sending perfected Reality-to-Digital Blender cinematic scene to Blender...');
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
