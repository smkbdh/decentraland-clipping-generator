const net = require('net');

const blenderScript = `
import bpy
import math
import random

random.seed(42)

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
scene.frame_end = 270  # Exactly 9.0 Seconds @ 30 FPS

# Vertical 9:16 Reel Format (1080x1920)
scene.render.resolution_x = 1080
scene.render.resolution_y = 1920
scene.render.resolution_percentage = 50
scene.render.image_settings.file_format = 'PNG'

scene.render.engine = 'BLENDER_EEVEE_NEXT' if hasattr(bpy.types, 'RenderSettings') and 'BLENDER_EEVEE_NEXT' in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items] else 'BLENDER_EEVEE'

if hasattr(scene, 'view_settings'):
    scene.view_settings.view_transform = 'AgX'
    scene.view_settings.look = 'AgX - High Contrast'

# ==============================================================================
# 2. MASTER MATERIALS PALETTE
# ==============================================================================
def make_mat(name, base_color, metallic=0.0, roughness=0.5, emission=None, emission_strength=1.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = base_color
        bsdf.inputs["Metallic"].default_value = metallic
        bsdf.inputs["Roughness"].default_value = roughness
        if emission:
            if "Emission Color" in bsdf.inputs:
                bsdf.inputs["Emission Color"].default_value = emission
                bsdf.inputs["Emission Strength"].default_value = emission_strength
            elif "Emission" in bsdf.inputs:
                bsdf.inputs["Emission"].default_value = emission
    return mat

mat_white_gloss  = make_mat("AirlinerWhite", (0.92, 0.93, 0.95, 1.0), roughness=0.15)
mat_navy_fabric  = make_mat("SeatFabricNavy", (0.05, 0.09, 0.18, 1.0), roughness=0.8)
mat_metal_trim   = make_mat("CabinBrushedAlum", (0.75, 0.77, 0.80, 1.0), metallic=0.85, roughness=0.25)
mat_cabin_wall   = make_mat("CabinWallSoftWhite", (0.88, 0.89, 0.92, 1.0), roughness=0.4)
mat_carpet       = make_mat("NavyAisleCarpet", (0.04, 0.07, 0.14, 1.0), roughness=0.9)
mat_ceiling_led  = make_mat("CeilingLEDBar", (1.0, 0.98, 0.92, 1.0), emission=(1.0, 0.98, 0.92, 1.0), emission_strength=14.0)
mat_aisle_led    = make_mat("AisleCyanGuide", (0.1, 0.85, 1.0, 1.0), emission=(0.1, 0.85, 1.0, 1.0), emission_strength=12.0)
mat_cloud        = make_mat("SunsetCloudSoft", (0.95, 0.85, 0.78, 1.0), roughness=0.9)
mat_passenger    = make_mat("PassengerCrowd", (0.12, 0.14, 0.18, 1.0), roughness=0.7)
mat_skin         = make_mat("PassengerSkin", (0.82, 0.62, 0.52, 1.0), roughness=0.55)

mat_tunnel_white = make_mat("TunnelEmissiveWhite", (1.0, 1.0, 1.0, 1.0), emission=(1.0, 1.0, 1.0, 1.0), emission_strength=16.0)
mat_tunnel_mirror= make_mat("TunnelChromeMirror", (0.92, 0.95, 1.0, 1.0), roughness=0.03, metallic=0.98)
mat_neon_cyan    = make_mat("NeonCyanVoxel", (0.0, 0.95, 1.0, 1.0), emission=(0.0, 0.95, 1.0, 1.0), emission_strength=24.0)
mat_neon_pink    = make_mat("NeonPinkVoxel", (1.0, 0.12, 0.65, 1.0), emission=(1.0, 0.12, 0.65, 1.0), emission_strength=24.0)

mat_blender_orange = make_mat("BlenderSelectOrange", (1.0, 0.48, 0.05, 1.0), emission=(1.0, 0.48, 0.05, 1.0), emission_strength=18.0)
mat_grid_floor     = make_mat("BlenderViewportFloor", (0.10, 0.11, 0.13, 1.0), roughness=0.85)
mat_grid_sublines  = make_mat("GridSubdivisionLine", (0.24, 0.26, 0.30, 1.0), roughness=0.5)
mat_axis_x_red     = make_mat("AxisRedX", (1.0, 0.15, 0.15, 1.0), emission=(1.0, 0.15, 0.15, 1.0), emission_strength=25.0)
mat_axis_y_green   = make_mat("AxisGreenY", (0.15, 0.95, 0.25, 1.0), emission=(0.15, 0.95, 0.25, 1.0), emission_strength=25.0)
mat_axis_z_blue    = make_mat("AxisBlueZ", (0.2, 0.55, 1.0, 1.0), emission=(0.2, 0.55, 1.0, 1.0), emission_strength=25.0)
mat_cursor_white   = make_mat("CursorWhite", (1.0, 1.0, 1.0, 1.0), emission=(1.0, 1.0, 1.0, 1.0), emission_strength=18.0)
mat_ui_panel_bg    = make_mat("UIPanelSlate", (0.15, 0.16, 0.18, 1.0), roughness=0.5)
mat_ui_header_bar  = make_mat("UIHeaderDark", (0.09, 0.10, 0.11, 1.0), roughness=0.4)
mat_node_bsdf      = make_mat("ShaderNodeBody", (0.18, 0.26, 0.22, 1.0), roughness=0.4)
mat_noodle_wire    = make_mat("ShaderNoodleWire", (0.2, 0.9, 0.4, 1.0), emission=(0.2, 0.9, 0.4, 1.0), emission_strength=20.0)

# ==============================================================================
# 3. ENVIRONMENT & SUNSET SKY GRADIENT (User Ref #1)
# ==============================================================================
world = scene.world
if world and world.node_tree:
    nt = world.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputWorld")
    bg = nt.nodes.new("ShaderNodeBackground")
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    tex = nt.nodes.new("ShaderNodeTexGradient")
    coord = nt.nodes.new("ShaderNodeTexCoord")
    mapping = nt.nodes.new("ShaderNodeMapping")
    mapping.inputs["Rotation"].default_value[0] = 1.5708
    
    ramp.color_ramp.elements[0].position = 0.42
    ramp.color_ramp.elements[0].color = (1.0, 0.48, 0.16, 1.0) # Golden Sunset Horizon
    ramp.color_ramp.elements[1].position = 0.82
    ramp.color_ramp.elements[1].color = (0.08, 0.12, 0.28, 1.0) # Deep Twilight Dusk
    
    nt.links.new(coord.outputs["Generated"], mapping.inputs["Vector"])
    nt.links.new(mapping.outputs["Vector"], tex.inputs["Vector"])
    nt.links.new(tex.outputs["Fac"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], bg.inputs["Color"])
    bg.inputs["Strength"].default_value = 1.5
    nt.links.new(bg.outputs["Background"], out.inputs["Surface"])

bpy.ops.object.light_add(type='SUN', location=(-35, -45, 25))
sun = bpy.context.active_object
sun.name = "DuskSun"
sun.data.energy = 7.0
sun.data.color = (1.0, 0.58, 0.25)
sun.rotation_euler = (math.radians(-25), math.radians(-35), math.radians(45))

# ==============================================================================
# 4. MASTER ROOT GROUPS & TIMELINE VISIBILITY
# ==============================================================================
root_reality = bpy.data.objects.new("Root_Reality", None)
scene.collection.objects.link(root_reality)

center_tunnel_y = 13.5
root_digital = bpy.data.objects.new("Root_DigitalTunnel", None)
root_digital.location = (0, center_tunnel_y, 1.25)
scene.collection.objects.link(root_digital)

center_blender_y = 38.0
root_blender = bpy.data.objects.new("Root_BlenderViewport", None)
root_blender.location = (0, center_blender_y, 0)
scene.collection.objects.link(root_blender)

def key_scale(obj, kf_list):
    for f, sc_val in kf_list:
        obj.scale = (sc_val, sc_val, sc_val)
        obj.keyframe_insert(data_path="scale", frame=f)

# Reality is visible frames 1-145, then shrinks out during shockwave
key_scale(root_reality, [(1, 1.0), (145, 1.0), (155, 0.0001)])

# Digital Tunnel scales in right at shockwave (138-142), active through 195, scales down at 200
key_scale(root_digital, [(1, 0.0001), (138, 0.0001), (142, 1.0), (195, 1.0), (200, 0.0001)])

# Blender Viewport scales in right around its own center Y=38.0 at frame 150
key_scale(root_blender, [(1, 0.0001), (145, 0.0001), (155, 1.0)])

# ==============================================================================
# 5. ACT 1 & 2: AIRLINER, CLOUD DECK & EXPANSIVE CABIN (Ref #1 & Ref #2)
# ==============================================================================
for i in range(50):
    cx = random.uniform(-30, 30)
    cy = random.uniform(-32, 18)
    cz = random.uniform(-8, -4)
    bpy.ops.mesh.primitive_uv_sphere_add(segments=20, ring_count=12, location=(cx, cy, cz))
    c_puff = bpy.context.active_object
    c_puff.scale = (random.uniform(4.0, 9.0), random.uniform(4.0, 9.0), random.uniform(1.0, 2.0))
    c_puff.data.materials.append(mat_cloud)
    c_puff.parent = root_reality

# Airliner Fuselage
bpy.ops.mesh.primitive_cylinder_add(radius=1.8, depth=22, location=(0, -4.0, 1.2))
fuselage = bpy.context.active_object
fuselage.name = "Airliner_Fuselage"
fuselage.rotation_euler = (math.radians(90), 0, 0)
fuselage.data.materials.append(mat_white_gloss)
fuselage.parent = root_reality

bpy.ops.mesh.primitive_cone_add(radius1=1.8, radius2=0.25, depth=4.8, location=(0, 7.0, 1.2))
nose = bpy.context.active_object
nose.rotation_euler = (math.radians(-90), 0, 0)
nose.data.materials.append(mat_white_gloss)
nose.parent = root_reality

bpy.ops.mesh.primitive_cube_add(location=(0, -5.0, 0.6))
wings = bpy.context.active_object
wings.scale = (11.5, 1.8, 0.08)
wings.data.materials.append(mat_white_gloss)
wings.parent = root_reality

bpy.ops.mesh.primitive_cube_add(location=(0, -13.5, 2.8))
tail_fin = bpy.context.active_object
tail_fin.scale = (0.08, 1.4, 1.9)
tail_fin.rotation_euler = (math.radians(-25), 0, 0)
tail_fin.data.materials.append(mat_white_gloss)
tail_fin.parent = root_reality

for eng_x in [-4.0, 4.0]:
    bpy.ops.mesh.primitive_cylinder_add(radius=0.6, depth=2.4, location=(eng_x, -4.5, 0.1))
    engine = bpy.context.active_object
    engine.rotation_euler = (math.radians(90), 0, 0)
    engine.data.materials.append(mat_metal_trim)
    engine.parent = root_reality

for win_y in [-11.0, -9.0, -7.0, -5.0, -3.0, -1.0, 1.0, 3.0]:
    for side in [-1, 1]:
        bpy.ops.mesh.primitive_cube_add(location=(side * 1.81, win_y, 1.35))
        win = bpy.context.active_object
        win.scale = (0.02, 0.28, 0.38)
        win.data.materials.append(mat_ceiling_led)
        win.parent = root_reality

# Clean, Spacious Passenger Interior
bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=1.65, depth=14.0, end_fill_type='NOTHING', location=(0, -2.0, 1.25))
cabin_shell = bpy.context.active_object
cabin_shell.rotation_euler = (math.radians(90), 0, 0)
cabin_shell.data.materials.append(mat_cabin_wall)
cabin_shell.parent = root_reality

bpy.ops.mesh.primitive_cube_add(location=(0, -2.0, 0.25))
floor_plane = bpy.context.active_object
floor_plane.scale = (1.5, 7.5, 0.02)
floor_plane.data.materials.append(mat_carpet)
floor_plane.parent = root_reality

bpy.ops.mesh.primitive_cube_add(location=(0, -2.0, 2.35))
led = bpy.context.active_object
led.scale = (0.22, 7.4, 0.02)
led.data.materials.append(mat_ceiling_led)
led.parent = root_reality

bpy.ops.mesh.primitive_cube_add(location=(0, -2.0, 0.26))
f_led = bpy.context.active_object
f_led.scale = (0.05, 7.4, 0.01)
f_led.data.materials.append(mat_aisle_led)
f_led.parent = root_reality

for ly in [-6.0, -3.0, 0.0, 3.0]:
    bpy.ops.object.light_add(type='POINT', location=(0, ly, 2.1))
    l = bpy.context.active_object
    l.data.energy = 95
    l.data.color = (0.95, 0.96, 1.0)
    l.parent = root_reality

for idx, ry in enumerate([-6.5, -5.0, -3.5, -2.0, -0.5, 1.0, 2.5]):
    for side in [-1, 1]:
        sx = side * 1.05
        bpy.ops.mesh.primitive_cube_add(location=(sx, ry, 0.55))
        seat_c = bpy.context.active_object
        seat_c.scale = (0.52, 0.35, 0.26)
        seat_c.data.materials.append(mat_navy_fabric)
        seat_c.parent = root_reality
        
        bpy.ops.mesh.primitive_cube_add(location=(sx, ry - 0.25, 0.95))
        seat_b = bpy.context.active_object
        seat_b.scale = (0.52, 0.08, 0.42)
        seat_b.rotation_euler = (math.radians(-5), 0, 0)
        seat_b.data.materials.append(mat_navy_fabric)
        seat_b.parent = root_reality
        
        bpy.ops.mesh.primitive_cube_add(location=(sx, ry - 0.26, 1.25))
        seat_h = bpy.context.active_object
        seat_h.scale = (0.42, 0.09, 0.16)
        seat_h.data.materials.append(mat_metal_trim)
        seat_h.parent = root_reality
        
        if (idx + (1 if side > 0 else 0)) % 2 == 0:
            bpy.ops.mesh.primitive_cylinder_add(radius=0.16, depth=0.55, location=(sx, ry - 0.08, 0.88))
            p_torso = bpy.context.active_object
            p_torso.data.materials.append(mat_passenger)
            p_torso.parent = root_reality
            
            bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.12, location=(sx, ry - 0.1, 1.26))
            p_head = bpy.context.active_object
            p_head.data.materials.append(mat_skin)
            p_head.parent = root_reality

# ==============================================================================
# 6. ACT 3: TURBULENCE EXPLOSION & ABSTRACT MIRRORED GEOMETRIC TUNNEL (Ref #3)
# ==============================================================================
# Exploded Voxel Shards relative to root_digital (center_tunnel_y = 13.5, Z=1.25)
voxel_coords = [
    (-1.2, -9.0, 0.35), (1.1, -8.6, -0.05), (-0.8, -8.1, 0.85), (0.9, -7.7, -0.55),
    (-1.4, -7.3, -0.25), (1.3, -6.7, 0.65), (0.0, -6.3, 0.95), (-0.9, -5.7, -0.65),
    (0.8, -5.3, 0.55), (-1.2, -4.7, 0.15), (1.1, -4.3, -0.35), (0.0, -3.7, -0.75)
]
for idx, (vx, vy, vz) in enumerate(voxel_coords):
    bpy.ops.mesh.primitive_cube_add(location=(vx, vy, vz))
    cube = bpy.context.active_object
    cube.scale = (0.24, 0.24, 0.24)
    cube.rotation_euler = (math.radians(idx * 30), math.radians(idx * 45), math.radians(idx * 20))
    cube.data.materials.append(mat_neon_cyan if idx % 2 == 0 else mat_neon_pink)
    cube.parent = root_digital

# Mirrored Geometric Tunnel (Ref #3): 11 Faceted Octagons correctly oriented along Y
tunnel_rings = 11
ring_start_rel_y = -8.0
ring_spacing = 1.6

for r_idx in range(tunnel_rings):
    ry = ring_start_rel_y + r_idx * ring_spacing
    rot_angle = math.radians(r_idx * 15)
    
    # Outer Faceted Octagon (Mirror Chrome walls) - rotated around Y!
    bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=2.5, depth=1.4, end_fill_type='NOTHING', location=(0, ry, 0))
    ring_outer = bpy.context.active_object
    ring_outer.rotation_euler = (math.radians(90), rot_angle, 0)
    ring_outer.data.materials.append(mat_tunnel_mirror)
    ring_outer.parent = root_digital
    
    # Glowing White Frame Rings
    for side_offset in [-0.65, 0.65]:
        bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=2.46, depth=0.08, end_fill_type='NOTHING', location=(0, ry + side_offset, 0))
        frame_ring = bpy.context.active_object
        frame_ring.rotation_euler = (math.radians(90), rot_angle, 0)
        frame_ring.data.materials.append(mat_tunnel_white)
        frame_ring.parent = root_digital

    for angle in [0, 45, 90, 135, 180, 225, 270, 315]:
        rad = math.radians(angle) + rot_angle
        px = math.cos(rad) * 2.42
        pz = math.sin(rad) * 2.42
        bpy.ops.mesh.primitive_cube_add(location=(px, ry, pz))
        strut = bpy.context.active_object
        strut.scale = (0.04, 0.7, 0.04)
        strut.rotation_euler = (0, math.radians(90), rad)
        strut.data.materials.append(mat_neon_cyan if r_idx % 2 == 0 else mat_tunnel_white)
        strut.parent = root_digital

for ty in [-6.0, -1.0, 4.0, 8.0]:
    bpy.ops.object.light_add(type='POINT', location=(0, ty, 0))
    tl = bpy.context.active_object
    tl.data.energy = 110
    tl.data.color = (0.85, 0.95, 1.0)
    tl.parent = root_digital

# ==============================================================================
# 7. ACT 4: BLENDER 3D VIEWPORT / AI PRODUCTION META-WORKSPACE (Ref #4)
# Objects relative to root_blender (center_blender_y = 38.0, Z=0)
# ==============================================================================
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0))
grid_plane = bpy.context.active_object
grid_plane.name = "Blender_Grid_Floor"
grid_plane.scale = (40, 40, 1)
grid_plane.data.materials.append(mat_grid_floor)
grid_plane.parent = root_blender

for gx in range(-18, 19, 2):
    if gx == 0: continue
    bpy.ops.mesh.primitive_cube_add(location=(gx, 0, 0.005))
    gline = bpy.context.active_object
    gline.scale = (0.02, 20.0, 0.002)
    gline.data.materials.append(mat_grid_sublines)
    gline.parent = root_blender

for gy in range(-18, 19, 2):
    if gy == 0: continue
    bpy.ops.mesh.primitive_cube_add(location=(0, gy, 0.005))
    gline = bpy.context.active_object
    gline.scale = (20.0, 0.02, 0.002)
    gline.data.materials.append(mat_grid_sublines)
    gline.parent = root_blender

bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0.01))
axis_x = bpy.context.active_object
axis_x.scale = (20.0, 0.045, 0.005)
axis_x.data.materials.append(mat_axis_x_red)
axis_x.parent = root_blender

bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0.01))
axis_y = bpy.context.active_object
axis_y.scale = (0.045, 20.0, 0.005)
axis_y.data.materials.append(mat_axis_y_green)
axis_y.parent = root_blender

# 3D Transform Gizmo at center of wireframe airplane
bpy.ops.mesh.primitive_cylinder_add(radius=0.04, depth=2.2, location=(1.1, 0, 3.5))
g_x = bpy.context.active_object
g_x.rotation_euler = (0, math.radians(90), 0)
g_x.data.materials.append(mat_axis_x_red)
g_x.parent = root_blender

bpy.ops.mesh.primitive_cone_add(radius1=0.14, depth=0.45, location=(2.3, 0, 3.5))
g_xc = bpy.context.active_object
g_xc.rotation_euler = (0, math.radians(90), 0)
g_xc.data.materials.append(mat_axis_x_red)
g_xc.parent = root_blender

bpy.ops.mesh.primitive_cylinder_add(radius=0.04, depth=2.2, location=(0, 1.1, 3.5))
g_y = bpy.context.active_object
g_y.rotation_euler = (math.radians(90), 0, 0)
g_y.data.materials.append(mat_axis_y_green)
g_y.parent = root_blender

bpy.ops.mesh.primitive_cone_add(radius1=0.14, depth=0.45, location=(0, 2.3, 3.5))
g_yc = bpy.context.active_object
g_yc.rotation_euler = (math.radians(-90), 0, 0)
g_yc.data.materials.append(mat_axis_y_green)
g_yc.parent = root_blender

bpy.ops.mesh.primitive_cylinder_add(radius=0.04, depth=2.2, location=(0, 0, 4.6))
g_z = bpy.context.active_object
g_z.data.materials.append(mat_axis_z_blue)
g_z.parent = root_blender

bpy.ops.mesh.primitive_cone_add(radius1=0.14, depth=0.45, location=(0, 0, 5.8))
g_zc = bpy.context.active_object
g_zc.data.materials.append(mat_axis_z_blue)
g_zc.parent = root_blender

for axis, col, euler in [("X", mat_axis_x_red, (0, math.radians(90), 0)), ("Y", mat_axis_y_green, (math.radians(90), 0, 0)), ("Z", mat_axis_z_blue, (0, 0, 0))]:
    bpy.ops.mesh.primitive_torus_add(major_radius=1.8, minor_radius=0.025, location=(0, 0, 3.5))
    arc = bpy.context.active_object
    arc.rotation_euler = euler
    arc.data.materials.append(col)
    arc.parent = root_blender

bpy.ops.mesh.primitive_torus_add(major_radius=0.38, minor_radius=0.03, location=(0, 0, 3.5))
cursor = bpy.context.active_object
cursor.data.materials.append(mat_cursor_white)
cursor.parent = root_blender

# 3D Wireframe Airplane Model in Active Selection Orange (#FF7800)
bpy.ops.mesh.primitive_cylinder_add(radius=1.8, depth=14.0, location=(0, 0, 3.5))
w_plane = bpy.context.active_object
w_plane.rotation_euler = (math.radians(90), 0, 0)
w_plane.data.materials.append(mat_blender_orange)
w_plane.parent = root_blender
mod = w_plane.modifiers.new(name="Wireframe", type='WIREFRAME')
mod.thickness = 0.04
mod.use_replace = True

bpy.ops.mesh.primitive_cone_add(radius1=1.8, radius2=0.2, depth=3.5, location=(0, 8.5, 3.5))
w_nose = bpy.context.active_object
w_nose.rotation_euler = (math.radians(-90), 0, 0)
w_nose.data.materials.append(mat_blender_orange)
w_nose.parent = root_blender
mod_n = w_nose.modifiers.new(name="Wireframe", type='WIREFRAME')
mod_n.thickness = 0.035
mod_n.use_replace = True

bpy.ops.mesh.primitive_cube_add(location=(0, -1.0, 3.0))
w_wings = bpy.context.active_object
w_wings.scale = (12.0, 1.8, 0.08)
w_wings.data.materials.append(mat_blender_orange)
w_wings.parent = root_blender
mod_w = w_wings.modifiers.new(name="Wireframe", type='WIREFRAME')
mod_w.thickness = 0.035
mod_w.use_replace = True

bpy.ops.mesh.primitive_cube_add(location=(0, -6.5, 5.2))
w_tail = bpy.context.active_object
w_tail.scale = (0.08, 1.4, 1.8)
w_tail.rotation_euler = (math.radians(-25), 0, 0)
w_tail.data.materials.append(mat_blender_orange)
w_tail.parent = root_blender
mod_t = w_tail.modifiers.new(name="Wireframe", type='WIREFRAME')
mod_t.thickness = 0.035
mod_t.use_replace = True

# Floating UI Elements
bpy.ops.mesh.primitive_cube_add(location=(0, 11.0, 11.0))
hbar = bpy.context.active_object
hbar.scale = (12.0, 0.08, 0.45)
hbar.data.materials.append(mat_ui_header_bar)
hbar.parent = root_blender

for idx, (tx, name, col) in enumerate([
    (-7.0, "Layout", mat_ui_panel_bg),
    (-3.8, "Modeling", mat_ui_panel_bg),
    (-0.6, "Shading", mat_blender_orange),
    (2.6, "GeometryNodes", mat_ui_panel_bg),
    (6.0, "AI_Production", mat_neon_cyan)
]):
    bpy.ops.mesh.primitive_cube_add(location=(tx, 10.9, 11.0))
    tab = bpy.context.active_object
    tab.scale = (1.3, 0.02, 0.35)
    tab.data.materials.append(col)
    tab.parent = root_blender

bpy.ops.mesh.primitive_cube_add(location=(7.5, 3.5, 7.0))
outliner = bpy.context.active_object
outliner.scale = (2.8, 0.08, 2.2)
outliner.rotation_euler = (0, 0, math.radians(-16))
outliner.data.materials.append(mat_ui_panel_bg)
outliner.parent = root_blender

bpy.ops.mesh.primitive_cube_add(location=(-7.0, 4.5, 7.2))
node1 = bpy.context.active_object
node1.scale = (1.8, 0.08, 1.4)
node1.rotation_euler = (0, 0, math.radians(16))
node1.data.materials.append(mat_node_bsdf)
node1.parent = root_blender

bpy.ops.mesh.primitive_cube_add(location=(-4.2, 5.5, 7.5))
node2 = bpy.context.active_object
node2.scale = (1.0, 0.08, 1.0)
node2.rotation_euler = (0, 0, math.radians(16))
node2.data.materials.append(mat_ui_panel_bg)
node2.parent = root_blender

bpy.ops.mesh.primitive_cylinder_add(radius=0.03, depth=2.0, location=(-5.5, 5.0, 7.3))
noodle = bpy.context.active_object
noodle.rotation_euler = (0, math.radians(75), math.radians(20))
noodle.data.materials.append(mat_noodle_wire)
noodle.parent = root_blender

bpy.ops.object.light_add(type='POINT', location=(-7, -4, 12))
wl1 = bpy.context.active_object
wl1.data.energy = 420
wl1.data.color = (0.88, 0.94, 1.0)
wl1.parent = root_blender

# ==============================================================================
# 8. 9:16 VERTICAL CINEMATIC ONE-TAKE CAMERA (270 FRAMES = 9.0 SEC)
# ==============================================================================
bpy.ops.object.camera_add(location=(-13.0, -16.0, 4.5))
cam = bpy.context.active_object
cam.name = "Master_Reel_Camera"
scene.camera = cam
cam.data.lens = 22
scene.render.use_motion_blur = True

# PHASE 1: EXTERIOR SUNSET CLOUDS FLYBY (Frames 1 - 55 / 0.0s - 1.8s)
cam.location = (-13.0, -16.0, 4.5)
cam.rotation_euler = (math.radians(82), math.radians(-5), math.radians(-38))
cam.keyframe_insert(data_path="location", frame=1)
cam.keyframe_insert(data_path="rotation_euler", frame=1)

cam.location = (-6.5, -9.0, 2.8)
cam.rotation_euler = (math.radians(85), math.radians(-3), math.radians(-32))
cam.keyframe_insert(data_path="location", frame=35)
cam.keyframe_insert(data_path="rotation_euler", frame=35)

cam.location = (-2.8, -4.2, 1.45)
cam.rotation_euler = (math.radians(89), 0, math.radians(-42))
cam.keyframe_insert(data_path="location", frame=55)
cam.keyframe_insert(data_path="rotation_euler", frame=55)

# PHASE 2: PIERCE THROUGH WINDOW INTO CABIN AISLE (Frames 56 - 135 / 1.8s - 4.5s)
cam.location = (-1.8, -3.5, 1.35)
cam.rotation_euler = (math.radians(90), 0, math.radians(-55))
cam.keyframe_insert(data_path="location", frame=62)
cam.keyframe_insert(data_path="rotation_euler", frame=62)

cam.location = (0, -2.0, 1.25)
cam.rotation_euler = (math.radians(90), 0, 0)
cam.keyframe_insert(data_path="location", frame=75)
cam.keyframe_insert(data_path="rotation_euler", frame=75)

cam.location = (0, 1.0, 1.25)
cam.rotation_euler = (math.radians(90), 0, 0)
cam.keyframe_insert(data_path="location", frame=135)
cam.keyframe_insert(data_path="rotation_euler", frame=135)

# PHASE 3: TURBULENCE HIT & DIGITAL SHOCKWAVE (Frames 136 - 195 / 4.5s - 6.5s)
# Violent Dutch Roll inside cabin
cam.location = (-0.22, 2.5, 1.1)
cam.rotation_euler = (math.radians(96), math.radians(-18), math.radians(10))
cam.keyframe_insert(data_path="location", frame=145)
cam.keyframe_insert(data_path="rotation_euler", frame=145)

# Plunges forward directly into exploding voxels & geometric tunnel
cam.location = (0.24, 5.5, 1.2)
cam.rotation_euler = (math.radians(84), math.radians(15), math.radians(-8))
cam.keyframe_insert(data_path="location", frame=155)
cam.keyframe_insert(data_path="rotation_euler", frame=155)

cam.location = (0, 11.0, 1.25)
cam.rotation_euler = (math.radians(90), 0, 0)
cam.keyframe_insert(data_path="location", frame=170)
cam.keyframe_insert(data_path="rotation_euler", frame=170)

cam.location = (0, 19.0, 1.25)
cam.rotation_euler = (math.radians(90), 0, 0)
cam.keyframe_insert(data_path="location", frame=190)
cam.keyframe_insert(data_path="rotation_euler", frame=190)

# PHASE 4: EXIT INTO BLENDER 3D VIEWPORT META-WORKSPACE (Frames 196 - 270 / 6.5s - 9.0s)
cam.location = (0, 24.0, 2.2)
cam.rotation_euler = (math.radians(84), 0, 0)
cam.keyframe_insert(data_path="location", frame=205)
cam.keyframe_insert(data_path="rotation_euler", frame=205)

cam.location = (-5.5, 29.0, 6.2)
cam.rotation_euler = (math.radians(70), math.radians(-8), math.radians(-24))
cam.keyframe_insert(data_path="location", frame=240)
cam.keyframe_insert(data_path="rotation_euler", frame=240)

cam.location = (-7.5, 27.5, 7.5)
cam.rotation_euler = (math.radians(65), math.radians(-6), math.radians(-28))
cam.keyframe_insert(data_path="location", frame=270)
cam.keyframe_insert(data_path="rotation_euler", frame=270)

# Set all keyframe interpolation to BEZIER
try:
    if cam.animation_data and cam.animation_data.action:
        if hasattr(cam.animation_data.action, 'fcurves'):
            for fcurve in cam.animation_data.action.fcurves:
                for kp in fcurve.keyframe_points:
                    kp.interpolation = 'BEZIER'
except Exception as e:
    print(f"Interpolation note: {e}")

# Set active viewport to camera and rendered shading
for window in bpy.context.window_manager.windows:
    for area in window.screen.areas:
        if area.type == 'VIEW_3D':
            for space in area.spaces:
                if space.type == 'VIEW_3D':
                    space.region_3d.view_perspective = 'CAMERA'
                    space.shading.type = 'RENDERED'

print(">>> MASTER HYBRID JET REEL SUCCESSFULLY GENERATED IN BLENDER <<<")
`;

const client = new net.Socket();
client.connect(9876, '127.0.0.1', () => {
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
    // waiting
  }
});

client.on('error', (err) => {
  console.error('Socket error:', err);
});
