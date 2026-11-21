"""
AI Будда v1.0 — Character Rigging & Facial Control Driver Architecture
Builds:
- Armature_Buddah: Complete humanoid skeletal rig (Root, Spine, Chest, Neck, Head, Limbs).
- Eye Tracking Targets with DAMPED_TRACK constraints for natural gaze.
- Custom Properties on Root bone for all 8 speech visemes and emotional expressions.
- Animation Drivers connecting Root bone properties directly to mesh Shape Keys.
- Parent bindings for rigid accessories and clothing.
"""

import bpy
import math
from mathutils import Vector

COL_NAME = "AI_BUDDAH_CHARACTER"
SCENE_NAME = "Scene_Buddah_Studio"

char_col = bpy.data.collections.get(COL_NAME)
studio_scene = bpy.data.scenes.get(SCENE_NAME)

if studio_scene:
    bpy.context.window.scene = studio_scene

# Remove existing armature if rebuilding
if "Armature_Buddah" in bpy.data.objects:
    bpy.data.objects.remove(bpy.data.objects["Armature_Buddah"], do_unlink=True)

# Create Armature
arm_data = bpy.data.armatures.new("Armature_Buddah_Data")
arm_obj = bpy.data.objects.new("Armature_Buddah", arm_data)
if char_col:
    char_col.objects.link(arm_obj)
bpy.context.view_layer.objects.active = arm_obj
arm_obj.select_set(True)

bpy.ops.object.mode_set(mode='EDIT')
eb = arm_data.edit_bones

# 1. CORE SPINE HIERARCHY
b_root = eb.new("Root")
b_root.head = (0, 0, 0)
b_root.tail = (0, 0, 0.15)

b_pelvis = eb.new("Pelvis")
b_pelvis.head = (0, 0, 0.50)
b_pelvis.tail = (0, 0, 0.60)
b_pelvis.parent = b_root

b_spine = eb.new("Spine")
b_spine.head = (0, 0, 0.60)
b_spine.tail = (0, 0, 0.72)
b_spine.parent = b_pelvis

b_chest = eb.new("Chest")
b_chest.head = (0, 0, 0.72)
b_chest.tail = (0, 0, 0.86)
b_chest.parent = b_spine

b_neck = eb.new("Neck")
b_neck.head = (0, -0.01, 0.86)
b_neck.tail = (0, -0.01, 0.95)
b_neck.parent = b_chest

b_head = eb.new("Head")
b_head.head = (0, -0.01, 0.95)
b_head.tail = (0, -0.01, 1.40)
b_head.parent = b_neck

# 2. ARMS & SHOULDERS
for side, sx in [("L", -1.0), ("R", 1.0)]:
    b_clav = eb.new(f"Clavicle_{side}")
    b_clav.head = (sx * 0.04, 0, 0.84)
    b_clav.tail = (sx * 0.18, 0.02, 0.80)
    b_clav.parent = b_chest

    b_upper = eb.new(f"UpperArm_{side}")
    b_upper.head = (sx * 0.18, 0.02, 0.80)
    b_upper.tail = (sx * 0.28, 0.04, 0.64)
    b_upper.parent = b_clav

    b_fore = eb.new(f"Forearm_{side}")
    b_fore.head = (sx * 0.28, 0.04, 0.64)
    b_fore.tail = (sx * 0.32, 0.08, 0.49)
    b_fore.parent = b_upper

    b_hand = eb.new(f"Hand_{side}")
    b_hand.head = (sx * 0.32, 0.08, 0.49)
    b_hand.tail = (sx * 0.35, 0.14, 0.42)
    b_hand.parent = b_fore

# 3. LEGS & FEET
for side, sx in [("L", -1.0), ("R", 1.0)]:
    b_thigh = eb.new(f"Thigh_{side}")
    b_thigh.head = (sx * 0.11, -0.01, 0.50)
    b_thigh.tail = (sx * 0.11, 0.0, 0.28)
    b_thigh.parent = b_pelvis

    b_shin = eb.new(f"Shin_{side}")
    b_shin.head = (sx * 0.11, 0.0, 0.28)
    b_shin.tail = (sx * 0.11, 0.02, 0.10)
    b_shin.parent = b_thigh

    b_foot = eb.new(f"Foot_{side}")
    b_foot.head = (sx * 0.11, 0.02, 0.10)
    b_foot.tail = (sx * 0.11, 0.16, 0.02)
    b_foot.parent = b_shin

# 4. EYE LOOK-AT TARGETS & COMPANIONS
b_eye_tgt = eb.new("Eye_Target_Master")
b_eye_tgt.head = (0, 1.2, 1.15)
b_eye_tgt.tail = (0, 1.35, 1.15)
b_eye_tgt.parent = b_root

for side, sx in [("L", -0.11), ("R", 0.11)]:
    b_et = eb.new(f"Eye_Target_{side}")
    b_et.head = (sx, 1.2, 1.15)
    b_et.tail = (sx, 1.3, 1.15)
    b_et.parent = b_eye_tgt

b_halo = eb.new("Halo_Bone")
b_halo.head = (0, -0.16, 1.18)
b_halo.tail = (0, -0.16, 1.35)
b_halo.parent = b_head

b_bot = eb.new("Bot_Master")
b_bot.head = (0.42, 0.10, 1.05)
b_bot.tail = (0.42, 0.10, 1.20)
b_bot.parent = b_root

bpy.ops.object.mode_set(mode='OBJECT')

# ==============================================================================
# 5. POSE MODE: ADD EYE TRACKING CONSTRAINTS
# ==============================================================================
bpy.ops.object.mode_set(mode='POSE')
p_bones = arm_obj.pose.bones

for side, obj_name in [("L", "Buddah_Eye_L"), ("R", "Buddah_Eye_R")]:
    eye_obj = bpy.data.objects.get(obj_name)
    if eye_obj:
        # Clear existing constraints
        eye_obj.constraints.clear()
        c = eye_obj.constraints.new('DAMPED_TRACK')
        c.target = arm_obj
        c.subtarget = f"Eye_Target_{side}"
        c.track_axis = 'TRACK_Y'

# ==============================================================================
# 6. CUSTOM PROPERTIES ON ROOT BONE (Speech Visemes & Emotions)
# ==============================================================================
root_pb = p_bones["Root"]

controls = [
    # 8 Speech Visemes
    ("viseme_sil", 0.0),
    ("viseme_aa", 0.0),
    ("viseme_oh", 0.0),
    ("viseme_ee", 0.0),
    ("viseme_ch", 0.0),
    ("viseme_mbp", 0.0),
    ("viseme_fv", 0.0),
    ("viseme_th_l", 0.0),
    # Core Emotions
    ("emotion_smile", 0.0),
    ("emotion_surprise", 0.0),
    ("emotion_skeptic", 0.0),
    ("emotion_serious", 0.0),
    # Eye & Brow Controls
    ("blink_L", 0.0),
    ("blink_R", 0.0),
    ("brow_up_L", 0.0),
    ("brow_up_R", 0.0),
    ("brow_furrow_L", 0.0),
    ("brow_furrow_R", 0.0),
]

for prop_name, default_val in controls:
    root_pb[prop_name] = default_val
    # Set UI range (0.0 to 1.0)
    id_props = root_pb.id_properties_ui(prop_name)
    id_props.update(min=0.0, max=1.0, soft_min=0.0, soft_max=1.0)

# ==============================================================================
# 7. CONNECT DRIVERS FROM ROOT BONE TO SHAPE KEYS
# ==============================================================================
head_obj = bpy.data.objects.get("Buddah_Head")
if head_obj and head_obj.data.shape_keys:
    key_blocks = head_obj.data.shape_keys.key_blocks
    
    # Connect Head shape keys (visemes & emotions)
    for prop_name, _ in controls:
        if prop_name in key_blocks:
            sk = key_blocks[prop_name]
            sk.driver_remove("value")
            fcurve = sk.driver_add("value")
            drv = fcurve.driver
            drv.type = 'AVERAGE'
            var = drv.variables.new()
            var.name = "ctrl"
            var.type = 'SINGLE_PROP'
            var.targets[0].id = arm_obj
            var.targets[0].data_path = f'pose.bones["Root"]["{prop_name}"]'

# Connect Eyelid Blinks
for side in ["L", "R"]:
    el_obj = bpy.data.objects.get(f"Buddah_Eyelid_Upper_{side}")
    if el_obj and el_obj.data.shape_keys:
        kb = el_obj.data.shape_keys.key_blocks.get(f"blink_{side}")
        if kb:
            kb.driver_remove("value")
            fc = kb.driver_add("value")
            drv = fc.driver
            drv.type = 'AVERAGE'
            var = drv.variables.new()
            var.name = "ctrl"
            var.type = 'SINGLE_PROP'
            var.targets[0].id = arm_obj
            var.targets[0].data_path = f'pose.bones["Root"]["blink_{side}"]'

# Connect Eyebrow Shape Keys
for side in ["L", "R"]:
    brow_obj = bpy.data.objects.get(f"Buddah_Eyebrow_{side}")
    if brow_obj and brow_obj.data.shape_keys:
        for action in ["up", "furrow"]:
            sk_name = f"brow_{action}_{side}"
            kb = brow_obj.data.shape_keys.key_blocks.get(sk_name)
            if kb:
                kb.driver_remove("value")
                fc = kb.driver_add("value")
                drv = fc.driver
                drv.type = 'AVERAGE'
                var = drv.variables.new()
                var.name = "ctrl"
                var.type = 'SINGLE_PROP'
                var.targets[0].id = arm_obj
                var.targets[0].data_path = f'pose.bones["Root"]["{sk_name}"]'

# ==============================================================================
# 8. BIND MESH PARTS TO BONES
# ==============================================================================
def bind_to_bone(obj_name, bone_name):
    obj = bpy.data.objects.get(obj_name)
    if obj:
        mw = obj.matrix_world.copy()
        obj.parent = arm_obj
        obj.parent_type = 'BONE'
        obj.parent_bone = bone_name
        obj.matrix_world = mw

# Head & Face
bind_to_bone("Buddah_Head", "Head")
bind_to_bone("Buddah_Neck", "Neck")
bind_to_bone("Buddah_Robe", "Spine")
bind_to_bone("Buddah_Hoodie", "Chest")
bind_to_bone("Buddah_Arm_L", "UpperArm_L")
bind_to_bone("Buddah_Arm_R", "UpperArm_R")
bind_to_bone("Buddah_Leg_L", "Thigh_L")
bind_to_bone("Buddah_Leg_R", "Thigh_R")
bind_to_bone("Buddah_Sneaker_Sole_L", "Foot_L")
bind_to_bone("Buddah_Sneaker_Sole_R", "Foot_R")
bind_to_bone("Buddah_AI_Bot", "Bot_Master")

bpy.ops.object.mode_set(mode='OBJECT')
print(">>> ARMATURE & RIG DRIVERS CONFIGURED SUCCESSFULLY <<<")
