const fs = require('fs');
const net = require('net');

let userPy = fs.readFileSync('c:/Users/humun/Downloads/ai_jet_reel.py', 'utf8');

// Fix Blender 5.x Compositor node_tree change (Blender 5.0+ uses compositing_node_group instead of sc.node_tree)
userPy = userPy.replace(
  "nt=sc.node_tree; nt.nodes.clear(); layer=nt.nodes.new('CompositorNodeRLayers'); out=nt.nodes.new('CompositorNodeComposite'); nt.links.new(layer.outputs['Image'],out.inputs['Image'])",
  `try:
    if hasattr(sc, 'node_tree') and sc.node_tree:
        nt=sc.node_tree; nt.nodes.clear(); layer=nt.nodes.new('CompositorNodeRLayers'); out=nt.nodes.new('CompositorNodeComposite'); nt.links.new(layer.outputs['Image'],out.inputs['Image'])
except Exception as e:
    print('Compositor setup skipped for Blender 5.x:', e)`
);

// Safe save path
userPy = userPy.replace(
  "bpy.ops.wm.save_as_mainfile(filepath=bpy.path.abspath('//ai_jet_reel.blend'))",
  `try:
    bpy.ops.wm.save_as_mainfile(filepath="D:/Buddah/ai_jet_reel.blend")
except Exception as e:
    print("Save warning:", e)`
);

// Ensure viewport visibility tracks render visibility so user sees cuts in GUI
const viewportPatch = `
for o in exterior:
 for f,state in [(1,False),(60,False),(61,True),(240,True)]:
  o.hide_viewport=state; o.keyframe_insert('hide_viewport',frame=f)
for o in interior:
 for f,state in [(1,True),(60,True),(61,False),(179,False),(180,True)]:
  o.hide_viewport=state; o.keyframe_insert('hide_viewport',frame=f)
for o in shards:
 for f,state in [(1,True),(179,True),(180,False),(240,False)]:
  o.hide_viewport=state; o.keyframe_insert('hide_viewport',frame=f)
for o in clouds:
 for f,state in [(1,False),(60,False),(61,True)]:
  o.hide_viewport=state; o.keyframe_insert('hide_viewport',frame=f)

# Ensure 3D Viewport is set to CAMERA and RENDERED view
for window in bpy.context.window_manager.windows:
    for area in window.screen.areas:
        if area.type == 'VIEW_3D':
            for space in area.spaces:
                if space.type == 'VIEW_3D':
                    space.shading.type = 'RENDERED'
                    space.region_3d.view_perspective = 'CAMERA'

print(">>> AI JET REEL BUILT AND LOADED INTO BLENDER SUCCESSFULLY! <<<")
`;

userPy += viewportPatch;

const client = new net.Socket();
client.connect(9876, '127.0.0.1', () => {
  console.log('Sending user script ai_jet_reel.py to Blender...');
  client.write(JSON.stringify({
    type: 'execute_code',
    params: { code: userPy }
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
    // wait for full response
  }
});

client.on('error', (err) => {
  console.error('Socket error:', err);
});
