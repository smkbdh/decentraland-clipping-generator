const net = require('net');

const renderScript = `
import bpy

scene = bpy.context.scene

# Configure output
scene.render.resolution_x = 540
scene.render.resolution_y = 960
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'

frames = [
    (25, "D:/Buddah/user_reel_01_exterior.png"),
    (80, "D:/Buddah/user_reel_02_cabin.png"),
    (130, "D:/Buddah/user_reel_03_aisle.png"),
    (165, "D:/Buddah/user_reel_04_turbulence.png"),
    (205, "D:/Buddah/user_reel_05_shards.png")
]

for f, path in frames:
    scene.frame_set(f)
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    print(f"Rendered frame {f} -> {path}")

print(">>> ALL USER REEL PREVIEWS RENDERED <<<")
`;

const client = new net.Socket();
client.connect(9876, '127.0.0.1', () => {
  console.log('Rendering user reel preview frames...');
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
