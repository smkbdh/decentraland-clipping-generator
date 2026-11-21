const net = require('net');

const renderScript = `
import bpy

scene = bpy.context.scene

scene.render.engine = 'BLENDER_EEVEE_NEXT' if hasattr(bpy.types, 'RenderSettings') and 'BLENDER_EEVEE_NEXT' in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items] else 'BLENDER_EEVEE'
scene.render.resolution_x = 540
scene.render.resolution_y = 960
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'

frames = [
    (25, "D:/Buddah/hybrid_reel_01_clouds.png"),
    (95, "D:/Buddah/hybrid_reel_02_cabin.png"),
    (155, "D:/Buddah/hybrid_reel_03_turbulence.png"),
    (175, "D:/Buddah/hybrid_reel_04_tunnel.png"),
    (260, "D:/Buddah/hybrid_reel_05_blender_ui.png")
]

for f, path in frames:
    scene.frame_set(f)
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    print(f"Rendered frame {f} -> {path}")

print(">>> ALL HYBRID REEL PREVIEWS RENDERED <<<")
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
