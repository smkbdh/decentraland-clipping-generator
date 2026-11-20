const net = require('net');

const renderScript = `
import bpy

scene = bpy.context.scene
scene.render.image_settings.file_format = 'PNG'
scene.render.filepath = 'D:/Buddah/wow_troll_preview.png'
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.resolution_percentage = 100

# Frame 90: Hero medium shot with glowing eyes, tusks, daggers and flickering torches
scene.frame_set(90)

bpy.ops.render.render(write_still=True)
print(">>> WOW PREVIEW RENDER COMPLETE: D:/Buddah/wow_troll_preview.png <<<")
`;

const client = new net.Socket();
client.connect(9876, '127.0.0.1', () => {
  console.log('Rendering WoW preview from Blender...');
  client.write(JSON.stringify({
    type: 'execute_code',
    params: { code: renderScript }
  }));
});

client.on('data', (data) => {
  console.log('Result from Blender:', data.toString());
  client.destroy();
});

client.on('error', (err) => {
  console.error('Socket error:', err);
});
