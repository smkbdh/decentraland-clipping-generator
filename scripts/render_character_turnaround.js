const net = require('net');

const renderScript = `
import bpy
import math

SCENE_NAME = "Scene_Buddah_Studio"
COL_NAME = "AI_BUDDAH_CHARACTER"

studio_scene = bpy.data.scenes.get(SCENE_NAME)
bpy.context.window.scene = studio_scene

# Clean & Setup Studio Lighting and Cameras
setup_col_name = "AI_BUDDAH_STUDIO_SETUP"
if setup_col_name in bpy.data.collections:
    setup_col = bpy.data.collections[setup_col_name]
    for o in list(setup_col.objects):
        bpy.data.objects.remove(o, do_unlink=True)
else:
    setup_col = bpy.data.collections.new(setup_col_name)
    studio_scene.collection.children.link(setup_col)

# Tracking Target at center of character chest/face
bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0, 0, 0.92))
target_look = bpy.context.active_object
target_look.name = "Target_Character_Center"
setup_col.objects.link(target_look)
if target_look.name in studio_scene.collection.objects: studio_scene.collection.objects.unlink(target_look)

# 1. STUDIO LIGHTING
# Front Key Light
bpy.ops.object.light_add(type='AREA', location=(1.5, 2.2, 2.2))
key_l = bpy.context.active_object
key_l.name = "Buddah_Key_Light"
key_l.data.energy = 380
key_l.data.size = 1.4
key_l.data.color = (1.0, 0.96, 0.92)
setup_col.objects.link(key_l)
if key_l.name in studio_scene.collection.objects: studio_scene.collection.objects.unlink(key_l)
# Track to target
c = key_l.constraints.new('TRACK_TO')
c.target = target_look
c.track_axis = 'TRACK_NEGATIVE_Z'
c.up_axis = 'UP_Y'

# Front Fill Light
bpy.ops.object.light_add(type='AREA', location=(-1.8, 1.8, 1.6))
fill_l = bpy.context.active_object
fill_l.name = "Buddah_Fill_Light"
fill_l.data.energy = 220
fill_l.data.size = 1.8
fill_l.data.color = (0.88, 0.94, 1.0)
setup_col.objects.link(fill_l)
if fill_l.name in studio_scene.collection.objects: studio_scene.collection.objects.unlink(fill_l)
c2 = fill_l.constraints.new('TRACK_TO')
c2.target = target_look
c2.track_axis = 'TRACK_NEGATIVE_Z'
c2.up_axis = 'UP_Y'

# Back Rim Light (Warm Golden Glow for Halo and Hair)
bpy.ops.object.light_add(type='AREA', location=(0, -2.2, 2.2))
rim_l = bpy.context.active_object
rim_l.name = "Buddah_Rim_Light"
rim_l.data.energy = 320
rim_l.data.size = 1.6
rim_l.data.color = (1.0, 0.82, 0.45)
setup_col.objects.link(rim_l)
if rim_l.name in studio_scene.collection.objects: studio_scene.collection.objects.unlink(rim_l)
c3 = rim_l.constraints.new('TRACK_TO')
c3.target = target_look
c3.track_axis = 'TRACK_NEGATIVE_Z'
c3.up_axis = 'UP_Y'

# Studio Floor Disc (Matte Slate #14161B)
mat_floor = bpy.data.materials.get("Mat_Studio_Floor")
if not mat_floor:
    mat_floor = bpy.data.materials.new("Mat_Studio_Floor")
    mat_floor.use_nodes = True
    bsdf = next(n for n in mat_floor.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
    bsdf.inputs["Base Color"].default_value = (0.04, 0.045, 0.055, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.85

bpy.ops.mesh.primitive_cylinder_add(radius=3.5, depth=0.04, location=(0, 0, -0.02))
floor_cyl = bpy.context.active_object
floor_cyl.name = "Buddah_Studio_Floor"
floor_cyl.data.materials.append(mat_floor)
setup_col.objects.link(floor_cyl)
if floor_cyl.name in studio_scene.collection.objects: studio_scene.collection.objects.unlink(floor_cyl)

# 2. TEST CAMERAS (Front, 3/4, Side, Back)
cams = {
    "Cam_Front": (0, 2.8, 1.02),
    "Cam_ThreeQuarter": (2.0, 2.0, 1.15),
    "Cam_Side": (2.8, 0, 1.02),
    "Cam_Back": (0, -2.8, 1.02)
}

cam_objs = {}
for cam_name, loc in cams.items():
    bpy.ops.object.camera_add(location=loc)
    cam = bpy.context.active_object
    cam.name = cam_name
    cam.data.lens = 50
    setup_col.objects.link(cam)
    if cam.name in studio_scene.collection.objects: studio_scene.collection.objects.unlink(cam)
    
    # Track to target
    c = cam.constraints.new('TRACK_TO')
    c.target = target_look
    c.track_axis = 'TRACK_NEGATIVE_Z'
    c.up_axis = 'UP_Y'
    cam_objs[cam_name] = cam

# Set render settings
studio_scene.render.resolution_x = 1080
studio_scene.render.resolution_y = 1350
studio_scene.render.resolution_percentage = 100
studio_scene.render.image_settings.file_format = 'PNG'

# Render the 4 turnaround angles
render_targets = [
    ("Cam_Front", "d:/APP BOTS WEBSITES DEVELOPMENT/test antigravity/ai-buddah-character/renders/front.png", "D:/Buddah/ai-buddah-character/renders/front.png"),
    ("Cam_ThreeQuarter", "d:/APP BOTS WEBSITES DEVELOPMENT/test antigravity/ai-buddah-character/renders/three_quarter.png", "D:/Buddah/ai-buddah-character/renders/three_quarter.png"),
    ("Cam_Side", "d:/APP BOTS WEBSITES DEVELOPMENT/test antigravity/ai-buddah-character/renders/side.png", "D:/Buddah/ai-buddah-character/renders/side.png"),
    ("Cam_Back", "d:/APP BOTS WEBSITES DEVELOPMENT/test antigravity/ai-buddah-character/renders/back.png", "D:/Buddah/ai-buddah-character/renders/back.png")
]

for cam_name, path_local, path_buddah in render_targets:
    studio_scene.camera = cam_objs[cam_name]
    studio_scene.render.filepath = path_local
    bpy.ops.render.render(write_still=True)
    import shutil
    shutil.copyfile(path_local, path_buddah)
    print(f"Rendered {cam_name} -> {path_local}")

print(">>> ALL 4 TURNAROUND RENDERS COMPLETED SUCCESSFULLY <<<")
`;

const client = new net.Socket();
client.connect(9876, '127.0.0.1', () => {
  client.write(JSON.stringify({
    type: 'execute_code',
    params: { code: renderScript }
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
