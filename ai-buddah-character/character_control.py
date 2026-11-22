"""
AI Будда — контроллер мастер-персонажа (D:\\Buddah\\AI_BUDDAH_MASTER.blend).

Работает с реальным ригом портрета (коллекция AI_BUDDAH_CHARACTER -> AI_BUDDAH_PORTRAIT).
Все лицевые контролы — кастомные свойства кости Root у Armature_Buddah; драйверы
в мастере переводят их в shape keys головы, губ, рта, зубов, языка и век.

Контролы Root (0..1, gaze -1..1):
  viseme_sil, viseme_aa, viseme_oh, viseme_ee, viseme_ch, viseme_mbp, viseme_fv, viseme_th_l
      viseme_sil — нейтральный закрытый рот (своего shape key нет, это просто «все визмы = 0»)
  emotion_skeptic, emotion_surprise   — единственные эмоции, вылепленные в портрете
  blink_L, blink_R                    — веки раздельно (во время моргания взгляд гасится)
  jaw_open                            — простое открытие рта (зубы + язык), без формы визмы
  gaze_x, gaze_z                      — смещение зрачков/области глаз

Кости для поз: Head, Neck, Spine, Chest, Clavicle_*, UpperArm_*, Forearm_*, Hand_*.

Пример (внутри Blender, в т.ч. через Blender MCP):
    from character_control import BuddahController
    b = BuddahController()
    b.set_viseme("aa", 0.8)
    b.set_emotion("skeptic")
    b.look_at((0.4, -3.0, 2.3))
    b.set_pose("point_right")
    b.key(frame=12)
"""

import math

import bpy
from mathutils import Vector

VISEMES = ("sil", "aa", "oh", "ee", "ch", "mbp", "fv", "th_l")
EMOTIONS = ("neutral", "skeptic", "surprise")
POSES = ("neutral", "explain", "point_left", "point_right")
GAZE_HEIGHT = 2.2  # высота глаз в локальных координатах арматуры, как в build_linked_episode.py
POSE_BONES = ("Head", "Neck", "Spine", "Chest",
              "Clavicle_L", "UpperArm_L", "Forearm_L", "Hand_L",
              "Clavicle_R", "UpperArm_R", "Forearm_R", "Hand_R")


def _clamp(v, lo=0.0, hi=1.0):
    return max(lo, min(hi, float(v)))


class BuddahController:
    def __init__(self, armature_name="Armature_Buddah"):
        arm = bpy.context.scene.objects.get(armature_name)
        if arm is None:
            # После Library Override имя может получить суффикс (.001 и т.п.)
            arm = next((o for o in bpy.context.scene.objects
                        if o.type == "ARMATURE" and o.name.startswith(armature_name)), None)
        if arm is None:
            raise ValueError(f"Арматура '{armature_name}' не найдена в сцене. "
                             "Подключите коллекцию AI_BUDDAH_CHARACTER из AI_BUDDAH_MASTER.blend.")
        self.arm = arm
        self.root = arm.pose.bones["Root"]
        missing = [k for k in self.controls() if k not in self.root]
        if missing:
            raise ValueError(f"В риге нет контролов {missing}: это не актуальный мастер AI Будды.")

    # --- служебное -------------------------------------------------------
    @staticmethod
    def controls():
        return ([f"viseme_{v}" for v in VISEMES]
                + [f"emotion_{e}" for e in EMOTIONS if e != "neutral"]
                + ["blink_L", "blink_R", "jaw_open", "gaze_x", "gaze_z"])

    def _set(self, key, value):
        self.root[key] = value

    def _refresh(self):
        self.arm.update_tag()
        bpy.context.view_layer.update()

    # --- речь ------------------------------------------------------------
    def set_viseme(self, name, weight=1.0):
        """Одна визма с весом; остальные обнуляются, остаток уходит в viseme_sil."""
        name = name.lower().removeprefix("viseme_")
        if name == "l":
            name = "th_l"
        if name not in VISEMES:
            raise ValueError(f"Неизвестная визма '{name}'. Доступны: {', '.join(VISEMES)}")
        w = _clamp(weight)
        for v in VISEMES:
            self._set(f"viseme_{v}", 0.0)
        if name == "sil":
            self._set("viseme_sil", 1.0)
        else:
            self._set(f"viseme_{name}", w)
            self._set("viseme_sil", 1.0 - w)
        self._refresh()

    def set_visemes(self, weights):
        """Смешанная коартикуляция: {'aa': 0.6, 'oh': 0.4}. Сумма нормируется до <= 1."""
        vals = {v: 0.0 for v in VISEMES}
        for k, w in weights.items():
            k = k.lower().removeprefix("viseme_")
            if k not in vals:
                raise ValueError(f"Неизвестная визма '{k}'")
            vals[k] = max(0.0, float(w))
        total = sum(vals.values())
        if total > 1:
            vals = {k: w / total for k, w in vals.items()}
        elif total < 1:
            vals["sil"] += 1 - total
        for k, w in vals.items():
            self._set(f"viseme_{k}", w)
        self._refresh()

    def open_jaw(self, weight=1.0):
        self._set("jaw_open", _clamp(weight))
        self._refresh()

    # --- лицо ------------------------------------------------------------
    def set_emotion(self, name, weight=1.0):
        """neutral | skeptic | surprise — других эмоций в портрете нет."""
        name = name.lower().removeprefix("emotion_")
        if name not in EMOTIONS:
            raise ValueError(f"Эмоции '{name}' нет в портрете. Доступны: {', '.join(EMOTIONS)}")
        for e in EMOTIONS[1:]:
            self._set(f"emotion_{e}", 0.0)
        if name != "neutral":
            self._set(f"emotion_{name}", _clamp(weight))
        self._refresh()

    def blink(self, side="BOTH", weight=1.0):
        """side: 'L', 'R' или 'BOTH'."""
        side = side.upper()
        if side not in ("L", "R", "BOTH"):
            raise ValueError("side должен быть 'L', 'R' или 'BOTH'")
        w = _clamp(weight)
        if side in ("L", "BOTH"):
            self._set("blink_L", w)
        if side in ("R", "BOTH"):
            self._set("blink_R", w)
        self._refresh()

    def look_at(self, point, turn_head=True):
        """Взгляд (и по умолчанию поворот головы) на точку в мировых координатах."""
        local = self.arm.matrix_world.inverted() @ Vector(point)
        self._set("gaze_x", _clamp(local.x, -1, 1))
        self._set("gaze_z", _clamp(local.z - GAZE_HEIGHT, -1, 1))
        if turn_head:
            yaw = math.atan2(local.x, max(0.25, -local.y))
            self.turn_head(yaw)
        self._refresh()

    def turn_head(self, yaw=0.0, nod=0.0):
        """yaw — поворот головы в радианах (±0.65), nod — кивок шеей (<0 вниз)."""
        head = self.arm.pose.bones["Head"]
        neck = self.arm.pose.bones["Neck"]
        head.rotation_mode = neck.rotation_mode = "XYZ"
        head.rotation_euler[1] = _clamp(yaw, -0.65, 0.65)
        neck.rotation_euler[0] = _clamp(nod, -0.3, 0.3)
        self._refresh()

    # --- тело ------------------------------------------------------------
    def set_pose(self, name="neutral", amount=1.0):
        """neutral | explain | point_left | point_right (те же жесты, что в build_linked_episode.py)."""
        if name not in POSES:
            raise ValueError(f"Позы '{name}' нет. Доступны: {', '.join(POSES)}")
        for bn in POSE_BONES:
            if bn in ("Head", "Neck"):
                continue
            b = self.arm.pose.bones[bn]
            b.rotation_mode = "XYZ"
            b.rotation_euler = (0.0, 0.0, 0.0)
        if name != "neutral":
            side = "L" if name == "point_left" else "R"
            sign = -1 if side == "L" else 1
            lift = 0.95 if name.startswith("point") else 0.38
            self.arm.pose.bones[f"UpperArm_{side}"].rotation_euler[2] = -sign * lift * amount
            self.arm.pose.bones[f"Forearm_{side}"].rotation_euler[0] = -0.6 * amount
        self._refresh()

    # --- анимация --------------------------------------------------------
    def key(self, frame=None):
        """Ставит ключи на все лицевые контролы и кости поз в текущем (или указанном) кадре."""
        f = bpy.context.scene.frame_current if frame is None else frame
        for k in self.controls():
            self.root.keyframe_insert(data_path=f'["{k}"]', frame=f)
        for bn in POSE_BONES:
            self.arm.pose.bones[bn].keyframe_insert(data_path="rotation_euler", frame=f)

    def reset_all(self):
        for k in self.controls():
            self._set(k, 0.0)
        self._set("viseme_sil", 1.0)
        self.turn_head(0.0, 0.0)
        self.set_pose("neutral")
