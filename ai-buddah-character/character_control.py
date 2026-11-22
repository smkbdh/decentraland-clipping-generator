"""
AI Будда v1.0 — Python Automation Controller API
Provides high-level programmatic control over AI Buddah's:
- Speech Visemes (8 visemes for automated lipsync)
- Emotional Expressions (Smile, Surprise, Skeptic, Serious)
- Gaze & Eye Tracking (Look at 3D point or camera)
- Poses (Neutral, Present, Namaste, Point)
- Blinking & Brow Gestures
"""

import bpy
import math
from mathutils import Vector

class BuddahController:
    def __init__(self, armature_name="Armature_Buddah"):
        self.arm_obj = bpy.context.scene.objects.get(armature_name)
        if not self.arm_obj:
            raise ValueError(f"Armature '{armature_name}' not found in scene.")
        self.root_bone = self.arm_obj.pose.bones.get("Root")
        self.eye_target = self.arm_obj.pose.bones.get("Eye_Target_Master")

    def set_viseme(self, viseme_name, weight=1.0):
        """Sets speech viseme weight (0.0 to 1.0)"""
        viseme_name = viseme_name.lower()
        if viseme_name in ("l", "viseme_l"):
            viseme_name = "viseme_th_l"
        if not viseme_name.startswith("viseme_"):
            viseme_name = f"viseme_{viseme_name}"
        
        # Reset other visemes to 0 for clean articulation
        for k in ["viseme_sil", "viseme_aa", "viseme_oh", "viseme_ee", "viseme_ch", "viseme_mbp", "viseme_fv", "viseme_th_l"]:
            if k in self.root_bone:
                self.root_bone[k] = 0.0
        
        if viseme_name in self.root_bone:
            self.root_bone[viseme_name] = max(0.0, min(1.0, float(weight)))
        self.arm_obj.update_tag()

    def set_emotion(self, emotion_name, weight=1.0):
        """Sets emotional expression (neutral, smile, surprise, skeptic, serious)"""
        # Clear emotions
        for k in ["emotion_smile", "emotion_surprise", "emotion_skeptic", "emotion_serious"]:
            if k in self.root_bone:
                self.root_bone[k] = 0.0
        
        prop_key = f"emotion_{emotion_name}" if not emotion_name.startswith("emotion_") else emotion_name
        if prop_key in self.root_bone:
            self.root_bone[prop_key] = max(0.0, min(1.0, float(weight)))
        
        if "gaze_x" in self.root_bone:
            if emotion_name != "neutral" and prop_key not in self.root_bone:
                raise ValueError(f"Expression unavailable on this portrait: {emotion_name}")
            self.arm_obj.update_tag()
            return
        # Adjust eyebrows to reinforce emotion
        if emotion_name == "skeptic":
            self.root_bone["brow_up_R"] = 0.85 * weight
            self.root_bone["brow_furrow_L"] = 0.40 * weight
        elif emotion_name == "surprise":
            self.root_bone["brow_up_L"] = 0.90 * weight
            self.root_bone["brow_up_R"] = 0.90 * weight
        elif emotion_name == "serious":
            self.root_bone["brow_furrow_L"] = 0.65 * weight
            self.root_bone["brow_furrow_R"] = 0.65 * weight
        elif emotion_name == "smile":
            self.root_bone["brow_up_L"] = 0.25 * weight
            self.root_bone["brow_up_R"] = 0.25 * weight
        else: # Neutral
            self.root_bone["brow_up_L"] = 0.0
            self.root_bone["brow_up_R"] = 0.0
            self.root_bone["brow_furrow_L"] = 0.0
            self.root_bone["brow_furrow_R"] = 0.0
            
        self.arm_obj.update_tag()

    def blink(self, side="BOTH", weight=1.0):
        """Controls eyelids (side: 'L', 'R', or 'BOTH')"""
        w = max(0.0, min(1.0, float(weight)))
        if side in ["L", "BOTH"]:
            self.root_bone["blink_L"] = w
        if side in ["R", "BOTH"]:
            self.root_bone["blink_R"] = w
        self.arm_obj.update_tag()

    def look_at(self, target_coord):
        """Moves eye tracking target to world or local coordinate"""
        if self.root_bone and "gaze_x" in self.root_bone:
            local = self.arm_obj.matrix_world.inverted() @ Vector(target_coord)
            self.root_bone["gaze_x"] = max(-1.0, min(1.0, local.x))
            self.root_bone["gaze_z"] = max(-1.0, min(1.0, local.z - 2.2))
            self.arm_obj.update_tag()
        if self.eye_target:
            self.eye_target.location = Vector(target_coord) - Vector((0, 0, 1.15))
            self.arm_obj.update_tag()

    def set_pose(self, pose_name="neutral"):
        """Sets predefined body poses: neutral, present, namaste, point"""
        # Reset bone transforms
        portrait = "gaze_x" in self.root_bone
        for b in self.arm_obj.pose.bones:
            if portrait and not b.name.startswith(("UpperArm_", "Forearm_", "Hand_", "Clavicle_")):
                continue
            if b.name not in ["Root"]:
                b.rotation_euler = (0, 0, 0)
                b.location = (0, 0, 0)

        if pose_name == "present":
            # Right arm gesturing forward to audience / graphic
            r_arm = self.arm_obj.pose.bones.get("UpperArm_R")
            r_fore = self.arm_obj.pose.bones.get("Forearm_R")
            if r_arm and r_fore:
                r_arm.rotation_euler = (math.radians(-35), math.radians(25), math.radians(-20))
                r_fore.rotation_euler = (math.radians(-40), math.radians(10), 0)
        elif pose_name == "namaste":
            # Both hands clasped in prayer in front of chest
            l_arm = self.arm_obj.pose.bones.get("UpperArm_L")
            r_arm = self.arm_obj.pose.bones.get("UpperArm_R")
            l_fore = self.arm_obj.pose.bones.get("Forearm_L")
            r_fore = self.arm_obj.pose.bones.get("Forearm_R")
            if l_arm and r_arm and l_fore and r_fore:
                l_arm.rotation_euler = (math.radians(-45), math.radians(-35), 0)
                r_arm.rotation_euler = (math.radians(-45), math.radians(35), 0)
                l_fore.rotation_euler = (math.radians(-70), math.radians(20), 0)
                r_fore.rotation_euler = (math.radians(-70), math.radians(-20), 0)
        elif pose_name == "point":
            r_arm = self.arm_obj.pose.bones.get("UpperArm_R")
            r_fore = self.arm_obj.pose.bones.get("Forearm_R")
            if r_arm and r_fore:
                r_arm.rotation_euler = (math.radians(-75), math.radians(15), 0)
                r_fore.rotation_euler = (math.radians(-10), 0, 0)

        self.arm_obj.update_tag()

    def reset_all(self):
        """Resets all facial, speech, and skeletal controls to neutral default"""
        for k in self.root_bone.keys():
            if k not in ['_RNA_UI']:
                self.root_bone[k] = 0.0
        self.set_pose("neutral")
        if self.eye_target:
            self.look_at((0, 1.2, 1.15))
        self.arm_obj.update_tag()

print("BuddahController class ready for automated video production.")
