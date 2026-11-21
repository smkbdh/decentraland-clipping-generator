const net = require('net');

const renderScript = `
import bpy

scene = bpy.context.scene

scene.render.engine = 'BLENDER_EEVEE_NEXT' if hasattr(bpy.types, 'RenderSettings') and 'BLENDER_EEVEE_NEXT' in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items] else 'BLENDER_EEVEE'
scene.render.resolution_x = 960
scene.render.resolution_y = 540
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'

frames_to_render = [
    (30, "D:/Buddah/reality_to_digital_01_clouds.png"),
    (115, "D:/Buddah/reality_to_digital_02_cabin.png"),
    (168, "D:/Buddah/reality_to_digital_03_shatter.png"),
    (185, "D:/Buddah/reality_to_digital_04_tunnel.png"),
    (290, "D:/Buddah/reality_to_digital_05_blender_ui.png")
]

for frame_num, out_path in frames_to_render:
    scene.frame_set(frame_num)
    scene.render.filepath = out_path
    bpy.ops.render.render(write_still=True)
    print(f"Rendered frame {frame_num} -> {out_path}")

print(">>> ALL 5 DEFINITIVE PREVIEW FRAMES RENDERED SUCCESSFULLY <<<")
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
    // waiting for full json
  }
});

client.on('error', (err) => {
  console.error('Socket error:', err);
});
