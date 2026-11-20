const net = require('net');

const blenderScript = `
import bpy
import math

# 1. Reset Scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Clean orphan meshes & materials
for block in list(bpy.data.meshes):
    if block.users == 0:
        bpy.data.meshes.remove(block)
for block in list(bpy.data.materials):
    if block.users == 0:
        bpy.data.materials.remove(block)

scene = bpy.context.scene
scene.render.fps = 30
scene.frame_start = 1
scene.frame_end = 120

# 2. Materials Factory
def create_mat(name, color=(0.1, 0.1, 0.1, 1.0), roughness=0.5, metallic=0.0, emission_color=None, emission_strength=0.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    if bsdf:
        if "Base Color" in bsdf.inputs:
            bsdf.inputs["Base Color"].default_value = color
        if "Roughness" in bsdf.inputs:
            bsdf.inputs["Roughness"].default_value = roughness
        if "Metallic" in bsdf.inputs:
            bsdf.inputs["Metallic"].default_value = metallic
        if emission_color and "Emission Color" in bsdf.inputs:
            bsdf.inputs["Emission Color"].default_value = emission_color
            if "Emission Strength" in bsdf.inputs:
                bsdf.inputs["Emission Strength"].default_value = emission_strength
    return mat

mat_dark_floor = create_mat("DarkGlossFloor", color=(0.02, 0.03, 0.05, 1.0), roughness=0.08, metallic=0.92)
mat_rack_metal = create_mat("RackDarkMetal", color=(0.04, 0.05, 0.07, 1.0), roughness=0.35, metallic=0.85)
mat_neon_cyan = create_mat("NeonCyan", color=(0, 0.9, 1.0, 1.0), emission_color=(0, 0.9, 1.0, 1.0), emission_strength=25.0)
mat_neon_amber = create_mat("NeonAmber", color=(1.0, 0.6, 0.1, 1.0), emission_color=(1.0, 0.6, 0.1, 1.0), emission_strength=20.0)
mat_neon_green = create_mat("NeonGreen", color=(0.1, 1.0, 0.4, 1.0), emission_color=(0.1, 1.0, 0.4, 1.0), emission_strength=22.0)
mat_core_glow = create_mat("CoreGoldGlow", color=(0.1, 0.9, 1.0, 1.0), roughness=0.1, metallic=0.5, emission_color=(0.0, 0.85, 1.0, 1.0), emission_strength=35.0)
mat_ring_chrome = create_mat("RingChrome", color=(0.8, 0.85, 0.9, 1.0), roughness=0.05, metallic=1.0)

# 3. Environment & World
world = scene.world
if world and world.node_tree:
    nodes = world.node_tree.nodes
    bg = nodes.get("Background")
    if bg:
        bg.inputs["Color"].default_value = (0.005, 0.008, 0.015, 1.0)
        bg.inputs["Strength"].default_value = 0.4

# 4. Long Reflective Floor (100m hall)
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0))
floor = bpy.context.active_object
floor.name = "Datacenter_Floor"
floor.scale = (16, 40, 1)
floor.data.materials.append(mat_dark_floor)

# Neon Floor Rails
for x_pos in [-1.8, 1.8]:
    bpy.ops.mesh.primitive_cube_add(location=(x_pos, 0, 0.01))
    rail = bpy.context.active_object
    rail.name = f"FloorRail_{x_pos}"
    rail.scale = (0.04, 25, 0.01)
    rail.data.materials.append(mat_neon_cyan)

# 5. Server Racks (6 on left, 6 on right)
rack_y_positions = [-9.0, -6.5, -4.0, -1.5, 1.0, 3.5]
for side in [-1, 1]:
    x_base = side * 3.4
    for idx, y_pos in enumerate(rack_y_positions):
        # Server Cabinet Body
        bpy.ops.mesh.primitive_cube_add(location=(x_base, y_pos, 1.8))
        rack = bpy.context.active_object
        rack.name = f"ServerRack_{'L' if side < 0 else 'R'}_{idx+1}"
        rack.scale = (0.6, 1.0, 1.8)
        rack.data.materials.append(mat_rack_metal)
        
        # Blade slots with LED strips
        for slot in range(4):
            z_slot = 0.6 + slot * 0.8
            bpy.ops.mesh.primitive_cube_add(location=(x_base - (side * 0.58), y_pos, z_slot))
            strip = bpy.context.active_object
            strip.name = f"LED_Strip_{'L' if side < 0 else 'R'}_{idx}_{slot}"
            strip.scale = (0.02, 0.85, 0.05)
            # Alternate LED colors
            led_mat = mat_neon_cyan if (idx + slot) % 2 == 0 else (mat_neon_green if slot % 2 == 0 else mat_neon_amber)
            strip.data.materials.append(led_mat)

# 6. Overhead Cable Trays & Overhead Linear Lights
for y_pos in rack_y_positions:
    bpy.ops.mesh.primitive_cylinder_add(radius=0.08, depth=7.2, location=(0, y_pos, 3.7))
    beam = bpy.context.active_object
    beam.rotation_euler = (0, math.radians(90), 0)
    beam.data.materials.append(mat_rack_metal)
    
    # Overhead soft cyan light
    bpy.ops.object.light_add(type='POINT', location=(0, y_pos, 3.5))
    lt = bpy.context.active_object
    lt.data.energy = 180
    lt.data.color = (0.3, 0.8, 1.0)
    lt.data.shadow_soft_size = 0.5

# 7. Quantum Core (Target Focal Object at the End of Hall)
core_loc = (0, 6.5, 2.2)

# Floating Faceted Crystalline Core
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=1.1, location=core_loc)
core = bpy.context.active_object
core.name = "Quantum_AI_Core"
core.data.materials.append(mat_core_glow)

# Animate Core Rotation (Frames 1-120)
core.rotation_euler = (0, 0, 0)
core.keyframe_insert(data_path="rotation_euler", frame=1)
core.rotation_euler = (math.radians(45), math.radians(90), math.radians(180))
core.keyframe_insert(data_path="rotation_euler", frame=120)

# Orbital Data Ring 1
bpy.ops.mesh.primitive_torus_add(major_radius=1.8, minor_radius=0.04, location=core_loc)
ring1 = bpy.context.active_object
ring1.name = "DataRing_Inner"
ring1.data.materials.append(mat_ring_chrome)
ring1.rotation_euler = (math.radians(25), 0, 0)
ring1.keyframe_insert(data_path="rotation_euler", frame=1)
ring1.rotation_euler = (math.radians(25), math.radians(180), math.radians(360))
ring1.keyframe_insert(data_path="rotation_euler", frame=120)

# Orbital Data Ring 2 (Perpendicular)
bpy.ops.mesh.primitive_torus_add(major_radius=2.3, minor_radius=0.035, location=core_loc)
ring2 = bpy.context.active_object
ring2.name = "DataRing_Outer"
ring2.data.materials.append(mat_neon_cyan)
ring2.rotation_euler = (0, math.radians(45), 0)
ring2.keyframe_insert(data_path="rotation_euler", frame=1)
ring2.rotation_euler = (math.radians(180), math.radians(45), -math.radians(180))
ring2.keyframe_insert(data_path="rotation_euler", frame=120)

# Core Point Light (Omni glow)
bpy.ops.object.light_add(type='POINT', location=core_loc)
core_light = bpy.context.active_object
core_light.name = "Core_PointLight"
core_light.data.energy = 850
core_light.data.color = (0.1, 0.9, 1.0)
core_light.data.shadow_soft_size = 1.0

# 8. Cinematic Camera with Push-In Animation & Depth of Field
bpy.ops.object.camera_add(location=(0, -11.5, 1.5))
cam = bpy.context.active_object
cam.name = "Cinematic_Cam"
scene.camera = cam
cam.data.lens = 32  # 32mm wide cinematic lens

# Depth of Field setup
cam.data.dof.use_dof = True
cam.data.dof.focus_object = core
cam.data.dof.aperture_fstop = 2.0

# Camera Dolly-In Keyframes
# Frame 1: Low-angle dramatic entry
cam.location = (0, -11.5, 1.35)
cam.rotation_euler = (math.radians(86), 0, 0)
cam.keyframe_insert(data_path="location", frame=1)
cam.keyframe_insert(data_path="rotation_euler", frame=1)

# Frame 120: Smooth cinematic push towards core
cam.location = (0, 1.0, 1.95)
cam.rotation_euler = (math.radians(82), 0, 0)
cam.keyframe_insert(data_path="location", frame=120)
cam.keyframe_insert(data_path="rotation_euler", frame=120)

# Set Viewport to Rendered mode so the user sees all lights & glow immediately!
for window in bpy.context.window_manager.windows:
    for area in window.screen.areas:
        if area.type == 'VIEW_3D':
            for space in area.spaces:
                if space.type == 'VIEW_3D':
                    space.shading.type = 'RENDERED'
                    space.region_3d.view_perspective = 'CAMERA'

print(">>> CINEMATIC CYBERPUNK DATACENTER CREATED SUCCESSFULLY! <<<")
`;

const client = new net.Socket();
client.connect(9876, '127.0.0.1', () => {
  console.log('Sending cinematic scene builder to Blender...');
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
