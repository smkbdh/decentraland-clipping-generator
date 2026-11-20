const net = require('net');

const renderScript = `
import bpy

scene = bpy.context.scene

scene.render.engine = 'BLENDER_EEVEE_NEXT' if hasattr(bpy.types, 'RenderSettings') and 'BLENDER_EEVEE_NEXT' in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items] else 'BLENDER_EEVEE'
scene.render.resolution_x = 960
scene.render.resolution_y = 540
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'

# Render 5 key moments
frames_to_render = [
    (25, "D:/Buddah/airplane_01_exterior.png"),
    (75, "D:/Buddah/airplane_02_window_breach.png"),
    (130, "D:/Buddah/airplane_03_cabin_aisle.png"),
    (180, "D:/Buddah/airplane_04_turbulence.png"),
    (275, "D:/Buddah/airplane_05_cockpit_fight.png")
]

for frame_num, out_path in frames_to_render:
    scene.frame_set(frame_num)
    scene.render.filepath = out_path
    bpy.ops.render.render(write_still=True)
    print(f"Rendered frame {frame_num} -> {out_path}")

print(">>> ALL 5 AIRLINER PREVIEW FRAMES RENDERED SUCCESSFULLY <<<")
`;

const client = new net.Socket();
client.connect(9876, '127.0.0.1', () => {
  console.log('Sending render preview script to Blender...');
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
    // waiting for full json
  }
});

client.on('error', (err) => {
  console.error('Socket error:', err);
});
