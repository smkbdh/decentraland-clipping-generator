const net = require('net');

const renderScript = `
import bpy

scene = bpy.context.scene
scene.render.image_settings.file_format = 'PNG'
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.resolution_percentage = 100

# Render 1: Hero full-body establishing shot with campfire & sunset
scene.frame_set(50)
scene.render.filepath = 'D:/Buddah/wow_troll_hero_shot.png'
bpy.ops.render.render(write_still=True)

# Render 2: Intense close-up on tusks, ears, and piercing yellow eyes
scene.frame_set(285)
scene.render.filepath = 'D:/Buddah/wow_troll_closeup_shot.png'
bpy.ops.render.render(write_still=True)

print(">>> WOW RENDERS COMPLETE: hero_shot & closeup_shot saved to D:/Buddah/ <<<")
`;

const client = new net.Socket();
client.connect(9876, '127.0.0.1', () => {
  console.log('Rendering WoW frames from Blender...');
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
