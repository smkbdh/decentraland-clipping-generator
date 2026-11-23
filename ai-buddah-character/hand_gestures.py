"""Hand shapes and gestures for AI Buddah (Armature_Buddah with finger bones from build_hands.py).

Use inside Blender:
    import hand_gestures as hg
    hg.apply_gesture(arm, "thumbs_up")          # arms + fingers, both sides
    hg.key_gesture(arm, "thumbs_up", frame=120)  # same, keyed
    hg.apply_shape(arm, "R", "point")           # fingers only

Finger values are degrees. Curl is positive toward the palm; spread is positive toward the pinky.
Arm placements are given for the RIGHT side in rest armature space (character faces -Y, camera side);
the left side is mirrored automatically (x -> -x).
"""
import math

try:  # the tables below are also read outside Blender (director, docs)
    from mathutils import Euler, Matrix, Quaternion, Vector
except ImportError:  # pragma: no cover
    Euler = Matrix = Quaternion = Vector = None

DIGITS = ("Thumb", "Index", "Middle", "Ring", "Pinky")
CURL_SIGN = -1.0  # bone local X: negative rotation bends toward the palm

# ---------------------------------------------------------------- finger shapes
# finger: (curl1, curl2, curl3, spread)
# thumb:  (thumbward, fingerward, backward, roll, curl2, curl3) - the first three are the direction of the
#         thumb's first bone in hand space (thumbward = away from the index finger on the thumb side,
#         fingerward = wrist->knuckles, backward = out of the back of the hand); roll twists the curl plane.
def _f(c1, c2, c3, sp=0):
    return (c1, c2, c3, sp)


CURLED = {"Middle": _f(88, 100, 60), "Ring": _f(90, 100, 60, 2), "Pinky": _f(92, 100, 60, 4)}
THUMB_HOLD = (.10, .62, -.78, 15, 35, 25)   # thumb folded over curled middle/ring fingers
THUMB_FIST = (.05, .55, -.83, 25, 30, 20)   # thumb across the front of index+middle
SHAPES = {
    "relaxed": {"Thumb": (.55, .72, -.42, 0, 15, 10), "Index": _f(16, 26, 14, -2), "Middle": _f(22, 32, 16),
                "Ring": _f(28, 38, 18, 2), "Pinky": _f(34, 42, 20, 5)},
    "open": {"Thumb": (.72, .62, -.30, 0, 4, 4), "Index": _f(3, 4, 2, -4), "Middle": _f(2, 3, 2),
             "Ring": _f(3, 4, 2, 4), "Pinky": _f(4, 5, 3, 9)},
    "spread": {"Thumb": (.92, .36, -.15, 0, 0, -5), "Index": _f(0, 2, 0, -14), "Middle": _f(0, 2, 0, -3),
               "Ring": _f(0, 2, 0, 9), "Pinky": _f(0, 3, 0, 22)},
    "flat": {"Thumb": (.30, .93, -.20, 0, 0, 0), "Index": _f(0, 0, 0, 0), "Middle": _f(0, 0, 0),
             "Ring": _f(0, 0, 0, 0), "Pinky": _f(0, 0, 0, 2)},
    "cupped": {"Thumb": (.50, .62, -.60, 0, 15, 10), "Index": _f(20, 18, 10, -2), "Middle": _f(22, 20, 10),
               "Ring": _f(24, 22, 10, 2), "Pinky": _f(26, 24, 12, 5)},
    "fist": {"Thumb": THUMB_FIST, "Index": _f(85, 100, 60, -2), **CURLED},
    "point": {"Thumb": THUMB_HOLD, "Index": _f(0, 0, 0, -2), **CURLED},
    "thumbs_up": {"Thumb": (1.0, -.05, .05, 0, 0, -8), "Index": _f(85, 100, 60, -2), **CURLED},
    "peace": {"Thumb": THUMB_HOLD, "Index": _f(0, 0, 0, -17), "Middle": _f(0, 0, 0, 15),
              "Ring": _f(90, 100, 60, 2), "Pinky": _f(92, 100, 60, 4)},
    "rock": {"Thumb": THUMB_HOLD, "Index": _f(0, 0, 0, -8), "Middle": _f(88, 100, 60),
             "Ring": _f(90, 100, 60, 2), "Pinky": _f(0, 0, 0, 12)},
    "call_me": {"Thumb": (1.0, .10, .05, 0, 0, -5), "Index": _f(85, 100, 60, -2), "Middle": _f(88, 100, 60),
                "Ring": _f(90, 100, 60, 2), "Pinky": _f(0, 0, 0, 16)},
    "ok": {"Thumb": (.25, .70, -.67, 20, 20, 15), "Index": _f(42, 62, 45, -4), "Middle": _f(6, 8, 4, 4),
           "Ring": _f(8, 8, 4, 8), "Pinky": _f(12, 10, 5, 16)},
    "pinch": {"Thumb": (.30, .72, -.62, 15, 12, 8), "Index": _f(35, 42, 25, -2), **CURLED},
    "pinched": {"Thumb": (.05, .78, -.62, 20, 20, 10), "Index": _f(40, 40, 25, 4), "Middle": _f(42, 40, 25, 0),
                "Ring": _f(44, 40, 25, -5), "Pinky": _f(46, 40, 25, -10)},
    "finger_heart": {"Thumb": (.05, .70, -.71, 30, 10, 0), "Index": _f(40, 70, 25, 0), **CURLED},
    "crossed": {"Thumb": THUMB_HOLD, "Index": _f(4, 6, 4, 5), "Middle": _f(22, 4, 2, -15),
                "Ring": _f(90, 100, 60, 2), "Pinky": _f(92, 100, 60, 4)},
    "vulcan": {"Thumb": (.92, .36, -.15, 0, 0, -5), "Index": _f(0, 0, 0, -9), "Middle": _f(0, 0, 0, -10),
               "Ring": _f(0, 0, 0, 15), "Pinky": _f(0, 0, 0, 17)},
    "middle": {"Thumb": THUMB_HOLD, "Index": _f(85, 100, 60, -2), "Middle": _f(0, 0, 0),
               "Ring": _f(90, 100, 60, 2), "Pinky": _f(92, 100, 60, 4)},
    "heart_half": {"Thumb": (.90, .35, -.25, 0, 0, 0), "Index": _f(30, 55, 40, 0), "Middle": _f(32, 58, 40, 0),
                   "Ring": _f(34, 60, 40, 0), "Pinky": _f(36, 62, 40, 0)},
}


# shapes whose thumb tip must meet a point on another finger: (bone, fraction along it, offset to its back)
TOUCH = {"ok": ("Index3", 1.0, -.010), "pinch": ("Index3", 1.0, -.032), "pinched": ("Middle3", 1.0, -.012),
         "finger_heart": ("Index2", .55, .016)}


def apply_shape(arm, side, shape, amount=1.0, base="relaxed"):
    """Pose the five digits of one hand. amount blends from `base` (0) to `shape` (1)."""
    a, b = SHAPES[base], SHAPES[shape]
    mirror = 1.0 if side == "R" else -1.0
    for digit in DIGITS:
        v = [x + (y - x) * amount for x, y in zip(a[digit], b[digit])]
        if digit == "Thumb":
            tw, fw, bw, roll, c2, c3 = v
            _aim_thumb(arm, side, Vector((mirror * tw, fw, bw)), mirror * roll)
            _rot(arm, f"Thumb2_{side}", CURL_SIGN * c2, 0, 0)
            _rot(arm, f"Thumb3_{side}", CURL_SIGN * c3, 0, 0)
        else:
            c1, c2, c3, sp = v
            _rot(arm, f"{digit}1_{side}", CURL_SIGN * c1, 0, -mirror * sp)
            _rot(arm, f"{digit}2_{side}", CURL_SIGN * c2, 0, 0)
            _rot(arm, f"{digit}3_{side}", CURL_SIGN * c3, 0, 0)
    if shape in TOUCH and amount > .999:
        _touch_thumb(arm, side, *TOUCH[shape])


def _hand_fk(arm, side, bone, override=None):
    """Matrix of `bone` in Hand space from current pose eulers (override: {bone: euler})."""
    chain = []
    b = arm.data.bones[bone]
    while b.name != f"Hand_{side}":
        chain.append(b); b = b.parent
    hand_rest = arm.data.bones[f"Hand_{side}"].matrix_local
    m = Matrix()
    prev_rest = hand_rest
    for b in reversed(chain):
        e = (override or {}).get(b.name, arm.pose.bones[b.name].rotation_euler)
        m = m @ (prev_rest.inverted() @ b.matrix_local) @ Euler(e, "XYZ").to_matrix().to_4x4()
        prev_rest = b.matrix_local
    return m


def _touch_thumb(arm, side, bone, frac, back_off, iterations=40):
    import numpy as np
    bone = f"{bone}_{side}"
    tb = arm.data.bones[bone]
    gm = _hand_fk(arm, side, bone)
    goal = gm @ Vector((0, tb.length * frac, back_off))
    t1 = f"Thumb1_{side}"
    tip_len = arm.data.bones[f"Thumb3_{side}"].length
    x0 = list(arm.pose.bones[t1].rotation_euler)
    x = list(x0)

    def res(p):
        m = _hand_fk(arm, side, f"Thumb3_{side}", {t1: p})
        tip = m @ Vector((0, tip_len, 0))
        return list(tip - goal) + [.004 * (a - b) for a, b in zip(p, x0)]
    for _ in range(iterations):
        r0 = np.array(res(x)); J = np.zeros((len(r0), 3))
        for j in range(3):
            xp = list(x); xp[j] += 1e-4
            J[:, j] = (np.array(res(xp)) - r0) / 1e-4
        step = np.linalg.lstsq(J.T @ J + 1e-6 * np.eye(3), -J.T @ r0, rcond=None)[0]
        x = [a + b for a, b in zip(x, step)]
        if np.linalg.norm(step) < 1e-6:
            break
    arm.pose.bones[t1].rotation_euler = x


def _aim_thumb(arm, side, target, roll_deg):
    """Rotate Thumb1 so it points along `target` (hand-bone space: X thumb side for R, Y fingers, Z back)."""
    hand = arm.data.bones[f"Hand_{side}"].matrix_local.to_3x3()
    rest = hand.inverted() @ arm.data.bones[f"Thumb1_{side}"].matrix_local.to_3x3()
    r = rest.col[1].normalized()
    q = r.rotation_difference(target.normalized())
    basis = rest.inverted() @ q.to_matrix() @ rest @ Matrix.Rotation(math.radians(roll_deg), 3, "Y")
    pb = arm.pose.bones[f"Thumb1_{side}"]
    pb.rotation_mode = "XYZ"
    pb.rotation_euler = basis.to_euler("XYZ")


def _rot(arm, bone, x, y, z):
    pb = arm.pose.bones[bone]
    pb.rotation_mode = "XYZ"
    pb.rotation_euler = (math.radians(x), math.radians(y), math.radians(z))


def hand_bones(side):
    names = [f"Hand_{side}"]
    for digit in DIGITS:
        names += [f"{digit}{i}_{side}" for i in (1, 2, 3)]
    return names


ARM_CHAIN = ("Clavicle", "UpperArm", "Forearm", "Hand")
HAND_EXT = .035  # gestures slide the hand out of the wide sleeve along the wrist (cartoon cheat)
SLEEVE_NARROW = .50  # lifted arms narrow the sleeve opening (cloth would fall back along the arm)

# ---------------------------------------------------------------- arm placements
# wrist: wrist centre (m); fingers: direction wrist->knuckles; palm: direction the palm faces.
# All for the right hand (character's right = +X, camera looks from -Y).
PLACEMENTS = {
    "down": None,  # rest arms, only fingers change
    "chest": dict(wrist=(.311, -.411, 1.240), fingers=(-.55, -.35, .55), palm=(-.45, .55, -.1)),
    "front_up": dict(wrist=(.42, -.34, 1.30), fingers=(-.15, -.25, 1), palm=(-.2, -1, 0)),
    "beside_face": dict(wrist=(.47, -.34, 1.48), fingers=(-.12, -.15, 1), palm=(0, -1, 0)),
    "thumb_up": dict(wrist=(.30, -.45, 1.24), fingers=(-.3, -1, .05), palm=(-1, .15, 0)),
    "point_fwd": dict(wrist=(.341, -.520, 1.312), fingers=(-.25, -1, .05), palm=(-.1, 0, -1)),
    "point_side": dict(wrist=(.80, -.16, 1.36), fingers=(1, -.25, .05), palm=(0, 0, -1)),
    "point_cross": dict(wrist=(.06, -.46, 1.30), fingers=(-1, -.3, .05), palm=(0, .2, -1)),
    "palm_up": dict(wrist=(.391, -.390, 1.208), fingers=(-.25, -1, .05), palm=(0, 0, 1)),
    "shrug": dict(wrist=(.474, -.375, 1.210), fingers=(.45, -.88, .12), palm=(0, -.1, 1)),
    "palm_down": dict(wrist=(.360, -.404, 1.225), fingers=(-.3, -1, -.05), palm=(0, 0, -1)),
    "push": dict(wrist=(.36, -.40, 1.36), fingers=(0, -.15, 1), palm=(0, -1, 0)),
    "raise": dict(wrist=(.62, -.30, 1.60), fingers=(.35, -.15, 1), palm=(.1, -1, 0)),
    "pray": dict(wrist=(.046, -.48, 1.38), fingers=(0, -.2, 1), palm=(-1, 0, 0)),
    "heart": dict(wrist=(.190, -.442, 1.360), fingers=(-.85, -.05, .5), palm=(0, -1, 0)),
    "clap": dict(wrist=(.045, -.48, 1.34), fingers=(0, -.55, 1), palm=(-1, 0, 0)),
    "cup": dict(wrist=(.07, -.40, 1.26), fingers=(-.15, -1, .1), palm=(-.35, 0, 1)),
    "open_both": dict(wrist=(.492, -.380, 1.223), fingers=(.45, -.75, .45), palm=(-.2, -.9, .3)),
    "handshake": dict(wrist=(.345, -.417, 1.244), fingers=(-.2, -1, 0), palm=(-1, 0, 0)),
    "at_viewer": dict(wrist=(.304, -.519, 1.316), fingers=(-.2, -1, .15), palm=(0, 0, -1)),
    "side_face": dict(wrist=(.45, -.36, 1.46), fingers=(-.12, -.15, 1), palm=(-.88, -.48, 0), ext=.025, sleeve=.8),
    "chin": dict(wrist=(.24, -.44, 1.40), fingers=(-.35, -.3, .9), palm=(-.3, -.5, .3)),
}

# gesture: per side (shape, placement); "L" missing -> relaxed hand down
GESTURES = {
    "neutral": {"R": ("relaxed", "down"), "L": ("relaxed", "down")},
    "fist": {"R": ("fist", "chest")},                                   # ✊
    "point_up": {"R": ("point", "beside_face")},                        # ☝ 👆
    "point_viewer": {"R": ("point", "at_viewer")},                      # 🫵
    "point_left": {"L": ("point", "point_side")},                       # 👈 arm out to the screen left
    "point_right": {"R": ("point", "point_side")},                      # 👉 arm out to the screen right
    "point_across_left": {"R": ("point", "point_cross")},               # across the body to the screen left
    "point_across_right": {"L": ("point", "point_cross")},              # across the body to the screen right
    "thumbs_up": {"R": ("thumbs_up", "thumb_up")},                      # 👍
    "peace": {"R": ("peace", "beside_face")},                           # ✌
    "rock": {"R": ("rock", "beside_face")},                             # 🤘
    "call_me": {"R": ("call_me", "beside_face")},                       # 🤙
    "ok": {"R": ("ok", "side_face")},                                 # 👌
    "pinched": {"R": ("pinched", "side_face")},                          # 🤌
    "pinch": {"R": ("pinch", "side_face")},                              # 🤏
    "finger_heart": {"R": ("finger_heart", "side_face")},                # 🫰
    "crossed_fingers": {"R": ("crossed", "side_face")},                  # 🤞
    "vulcan": {"R": ("vulcan", "beside_face")},                         # 🖖
    "middle_finger": {"R": ("middle", "front_up")},                     # 🖕
    "hand_raise": {"R": ("open", "beside_face")},                       # ✋ 🖐
    "wave": {"R": ("spread", "beside_face")},                           # 👋 (animate with wave_offsets)
    "stop": {"R": ("flat", "push")},                                    # 🫸
    "palm_up": {"R": ("cupped", "palm_up")},                            # 🫴
    "palm_down": {"R": ("flat", "palm_down")},                          # 🫳
    "handshake": {"R": ("open", "handshake")},                          # 🫱
    "explain": {"R": ("open", "palm_up"), "L": ("relaxed", "down")},
    "shrug": {"R": ("open", "shrug"), "L": ("open", "shrug")},          # 🤷 «не знаю»
    "open_hands": {"R": ("open", "open_both"), "L": ("open", "open_both")},  # 👐
    "raise_hands": {"R": ("open", "raise"), "L": ("open", "raise")},    # 🙌
    "pray": {"R": ("flat", "pray"), "L": ("flat", "pray")},             # 🙏
    "clap": {"R": ("flat", "clap"), "L": ("flat", "clap")},             # 👏
    "heart_hands": {"R": ("heart_half", "heart"), "L": ("heart_half", "heart")},  # 🫶
    "cupped_hands": {"R": ("cupped", "cup"), "L": ("cupped", "cup")},   # 🤲
    "double_thumbs": {"R": ("thumbs_up", "thumb_up"), "L": ("thumbs_up", "thumb_up")},
    "think": {"R": ("point", "chin")},
}
EMOJI = {"✊": "fist", "☝": "point_up", "👆": "point_up", "🫵": "point_viewer", "👈": "point_left",
         "👉": "point_right", "👍": "thumbs_up", "✌": "peace", "🤘": "rock", "🤙": "call_me", "👌": "ok",
         "🤌": "pinched", "🤏": "pinch", "🫰": "finger_heart", "🤞": "crossed_fingers", "🖖": "vulcan",
         "🖕": "middle_finger", "✋": "hand_raise", "🖐": "hand_raise", "👋": "wave", "🫸": "stop",
         "🫴": "palm_up", "🫳": "palm_down", "🫱": "handshake", "🤷": "shrug", "👐": "open_hands",
         "🙌": "raise_hands", "🙏": "pray", "👏": "clap", "🫶": "heart_hands", "🤲": "cupped_hands"}


def resolve(name):
    name = name.strip()
    for ch in list(name):
        if ch in EMOJI:
            return EMOJI[ch]
    if name not in GESTURES:
        raise ValueError(f"unknown gesture {name!r}; known: {', '.join(sorted(GESTURES))}")
    return name


# ---------------------------------------------------------------- arm solver
def _rest(arm, name):
    return arm.data.bones[name].matrix_local


def _fk(arm, side, angles, ext=0.0):
    """Armature-space matrices of the chain for given eulers (dict bone->(x,y,z)). Parent of clavicle at rest."""
    mats = {}
    parent_name = arm.data.bones[f"Clavicle_{side}"].parent.name
    parent = arm.pose.bones[parent_name].matrix  # current chest
    parent_rest = _rest(arm, parent_name)
    for base in ARM_CHAIN:
        name = f"{base}_{side}"
        local = parent_rest.inverted() @ _rest(arm, name)
        rot = Euler(angles.get(name, (0, 0, 0)), "XYZ").to_matrix().to_4x4()
        if base == "Hand":
            rot = Matrix.Translation((0, ext, 0)) @ rot
        m = parent @ local @ rot
        mats[name] = m
        parent, parent_rest = m, _rest(arm, name)
    return mats


def _side_vec(v, side):
    return Vector((v[0] if side == "R" else -v[0], v[1], v[2]))


WRIST_BACK, WRIST_PALM, WRIST_SIDE, WRIST_TWIST = (math.radians(a) for a in (22, 55, 35, 70))
WRIST_W = .05
ELBOW_W = .03
WRIST_ALIGN = .035   # metres of wrist-position error worth one radian of forearm/hand misalignment
WRIST_TWIST_MAX = math.radians(100)


def _clamp_wrist(rel):
    """Limit a hand rotation relative to the straight wrist: swing (back/palm/side) and twist about the forearm.
    When the target can't be reached comfortably the hand tilts instead of breaking at the wrist."""
    q = rel.to_quaternion()
    if q.w < 0:
        q.negate()
    qt = Quaternion((q.w, 0, q.y, 0)).normalized()
    qs = q @ qt.inverted()
    tw = 2 * math.atan2(qt.y, qt.w)
    tw = (tw + math.pi) % (2 * math.pi) - math.pi
    tw = max(-WRIST_TWIST_MAX, min(WRIST_TWIST_MAX, tw))
    y = qs @ Vector((0, 1, 0))
    back = math.atan2(y.z, max(y.y, 1e-3))
    lat = math.atan2(y.x, max(y.y, 1e-3))
    back = max(-WRIST_PALM, min(WRIST_BACK, back))
    lat = max(-WRIST_SIDE, min(WRIST_SIDE, lat))
    y2 = Vector((math.tan(lat), 1, math.tan(back))).normalized()
    swing = Vector((0, 1, 0)).rotation_difference(y2)
    return (swing @ Quaternion((0, 1, 0), tw)).to_matrix()


def solve_arm(arm, side, wrist, fingers, palm, iterations=60, ext=HAND_EXT):
    """Return eulers for Clavicle/UpperArm/Forearm/Hand so the wrist reaches `wrist` with that orientation."""
    target = _side_vec(wrist, side)
    names = [f"Clavicle_{side}", f"UpperArm_{side}", f"Forearm_{side}"]
    # parameters: clavicle (x, z), upper (x, y, z), forearm (x, z)
    slots = [(0, 0), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 2)]
    weight = [6.0, 6.0, .25, .6, .25, .15, .8]
    x = [0.0] * len(slots)
    # wrist comfort: keep the hand within a cartoon-safe range of the forearm (a hand bent back past
    # ~20 deg or twisted past the forearm reads as a broken wrist); the arm moves instead of the wrist
    f_t = _side_vec(fingers, side).normalized()
    p_t = _side_vec(palm, side)
    p_t = (p_t - f_t * p_t.dot(f_t)).normalized()
    rest = _rest(arm, f"Hand_{side}").to_3x3()
    f_r = rest.col[1].normalized()          # bone Y: wrist -> knuckles
    p_r = -rest.col[2].normalized()         # bone Z is the back of the hand
    src = Matrix((f_r, p_r, f_r.cross(p_r))).transposed()
    dst = Matrix((f_t, p_t, f_t.cross(p_t))).transposed()
    want = dst @ src.inverted() @ rest     # desired armature-space rotation of the hand bone
    local = _rest(arm, f"Forearm_{side}").to_3x3().inverted() @ rest

    def wrist_strain(mats):
        rel = ((mats[f"Forearm_{side}"].to_3x3() @ local).inverted() @ want).to_quaternion()
        twist = abs(2 * math.atan2(rel.y, rel.w))
        twist = min(twist, 2 * math.pi - twist)
        y = rel.to_matrix().col[1]               # fingers in the straight-wrist frame
        back = math.atan2(y.z, max(y.y, 1e-3)) if y.y > 0 else math.copysign(math.pi / 2 + (1 - y.y), y.z)
        lateral = abs(math.atan2(y.x, max(abs(y.y), 1e-3)))
        # always prefer the forearm pointing where the hand points: the wrist then stays inside the cuff
        align = mats[f"Forearm_{side}"].to_3x3().col[1].normalized().angle(f_t)
        return [max(0.0, back - WRIST_BACK), max(0.0, -back - WRIST_PALM),
                max(0.0, lateral - WRIST_SIDE), max(0.0, twist - WRIST_TWIST), align * WRIST_ALIGN / WRIST_W]

    elbow_pref = _side_vec((.35, .30, -1), side).normalized()

    def angles_of(p):
        ang = {n: [0.0, 0.0, 0.0] for n in names}
        for (bi, ai), val in zip(slots, p):
            ang[names[bi]][ai] = val
        return ang

    def residual(p):
        mats = _fk(arm, side, angles_of(p), ext)
        wrist_now = mats[f"Hand_{side}"].translation
        r = list(wrist_now - target)
        r += [WRIST_W * s for s in wrist_strain(mats)]
        r += [w * .05 * v for w, v in zip(weight, p)]
        # natural elbow: it hangs down and a little out/back from the shoulder-wrist line, never up or forward
        sh = mats[f"UpperArm_{side}"].translation
        el = mats[f"Forearm_{side}"].translation
        line = wrist_now - sh
        off = (el - sh) - line * ((el - sh).dot(line) / max(line.length_squared, 1e-6))
        if off.length > .005:
            r.append(ELBOW_W * (1 - off.normalized().dot(elbow_pref)))
        else:
            r.append(0.0)
        return r

    import numpy as np

    def descend(x):
        for _ in range(iterations):
            r0 = np.array(residual(x))
            J = np.zeros((len(r0), len(x)))
            for j in range(len(x)):
                xp = list(x); xp[j] += 1e-4
                J[:, j] = (np.array(residual(xp)) - r0) / 1e-4
            step = np.linalg.lstsq(J.T @ J + 1e-3 * np.eye(len(x)), -J.T @ r0, rcond=None)[0]
            step = np.clip(step, -.4, .4)
            x = [a + b for a, b in zip(x, step)]
            if np.linalg.norm(step) < 1e-5:
                break
        return x, float(np.sum(np.array(residual(x)) ** 2))
    starts = [[0.0] * len(slots)]
    rng = np.random.default_rng(7)
    starts += [list(rng.uniform(-1.2, 1.2, len(slots)) * np.array([.2, .2, 1, 1, 1, 1, .5])) for _ in range(6)]
    best = min((descend(s) for s in starts), key=lambda r: r[1])
    x = best[0]
    ang = angles_of(x)
    mats = _fk(arm, side, ang, ext)
    # hand orientation: rotate rest hand frame so (fingers, palm) match the targets
    basis = (mats[f"Forearm_{side}"].to_3x3() @ local).inverted() @ want
    ang[f"Hand_{side}"] = list(_clamp_wrist(basis).to_euler("XYZ"))
    err = (mats[f"Hand_{side}"].translation - target).length
    return ang, err


def apply_placement(arm, side, placement):
    names = [f"{b}_{side}" for b in ARM_CHAIN]
    if isinstance(placement, dict):
        spec = placement
    elif placement in (None, "down") or PLACEMENTS.get(placement) is None:
        spec = None
    else:
        spec = PLACEMENTS[placement]
    if spec is None:
        for n in names:
            pb = arm.pose.bones[n]; pb.rotation_mode = "XYZ"; pb.rotation_euler = (0, 0, 0)
        arm.pose.bones[f"Hand_{side}"].location = (0, 0, 0)
        _sleeve(arm, side, 1.0)
        return 0.0
    ang, err = solve_arm(arm, side, spec["wrist"], spec["fingers"], spec["palm"], ext=spec.get("ext", HAND_EXT))
    for n, e in ang.items():
        pb = arm.pose.bones[n]; pb.rotation_mode = "XYZ"; pb.rotation_euler = e
    arm.pose.bones[f"Hand_{side}"].location = (0, spec.get("ext", HAND_EXT), 0)
    _sleeve(arm, side, spec.get("sleeve", SLEEVE_NARROW))
    return err


def _sleeve(arm, side, s):
    pb = arm.pose.bones.get(f"SleeveEnd_{side}")
    if pb:
        pb.scale = (s, s, s)


def apply_gesture(arm, name):
    name = resolve(name)
    g = GESTURES[name]
    errs = {}
    for side in ("R", "L"):
        shape, placement = g.get(side, ("relaxed", "down"))
        errs[side] = apply_placement(arm, side, placement)
        apply_shape(arm, side, shape)
    return errs


def key_gesture(arm, name, frame, sides=("R", "L")):
    apply_gesture(arm, name)
    for side in sides:
        for n in [f"{b}_{side}" for b in ARM_CHAIN] + hand_bones(side)[1:]:
            arm.pose.bones[n].keyframe_insert("rotation_euler", frame=frame)
        arm.pose.bones[f"Hand_{side}"].keyframe_insert("location", frame=frame)
        if arm.pose.bones.get(f"SleeveEnd_{side}"):
            arm.pose.bones[f"SleeveEnd_{side}"].keyframe_insert("scale", frame=frame)


# hold motions played while the gesture holds: gesture -> (period s, [(bone base, euler axis, amplitude rad,
# mirror on L)]). A wave swings the forearm from the elbow like a pendulum (bone X) with the hand trailing a
# little; rocking the hand alone at the wrist read as a broken wrist.
HOLD_MOTION = {"wave": (.62, [("Forearm", 0, .24, False), ("Hand", 2, .07, True)]),
               "clap": (.32, [("Forearm", 2, .10, True)])}


def channels(arm, sides=("R", "L")):
    """Every animated channel a gesture touches: (bone, data_path)."""
    out = []
    for side in sides:
        for n in [f"{b}_{side}" for b in ARM_CHAIN] + hand_bones(side)[1:]:
            out.append((n, "rotation_euler"))
        out.append((f"Hand_{side}", "location"))
        if arm.pose.bones.get(f"SleeveEnd_{side}"):
            out.append((f"SleeveEnd_{side}", "scale"))
    return out


def _rest_spec(arm):
    """The hanging hand as a placement (right-hand space), so transitions can be solved like gestures."""
    m = _rest(arm, "Hand_R")
    return dict(wrist=tuple(m.translation), fingers=tuple(m.to_3x3().col[1]), palm=tuple(-m.to_3x3().col[2]),
                ext=0.0, sleeve=1.0)


def _blend_spec(a, b, t):
    lerp = lambda x, y: tuple(p + (q - p) * t for p, q in zip(x, y))
    return dict(wrist=lerp(a["wrist"], b["wrist"]), fingers=lerp(a["fingers"], b["fingers"]),
                palm=lerp(a["palm"], b["palm"]), ext=a.get("ext", HAND_EXT) + (b.get("ext", HAND_EXT) - a.get("ext", HAND_EXT)) * t,
                sleeve=a.get("sleeve", SLEEVE_NARROW) + (b.get("sleeve", SLEEVE_NARROW) - a.get("sleeve", SLEEVE_NARROW)) * t)


def transition_values(arm, name, t):
    """In-between of neutral -> gesture at fraction t, solved by IK along the hand's path (not by blending joint
    angles, which swings the hand through odd orientations). Returns {(bone, path): values}."""
    name = resolve(name)
    g = GESTURES[name]
    keep = {(b, p): tuple(getattr(arm.pose.bones[b], p)) for b, p in channels(arm)}
    rest = _rest_spec(arm)
    for side in ("R", "L"):
        shape, placement = g.get(side, ("relaxed", "down"))
        spec = PLACEMENTS.get(placement) if isinstance(placement, str) else placement
        apply_placement(arm, side, _blend_spec(rest, spec, t) if spec else None)
        apply_shape(arm, side, shape, t)
    vals = {(b, p): tuple(getattr(arm.pose.bones[b], p)) for b, p in channels(arm)}
    for (b, p), v in keep.items():
        setattr(arm.pose.bones[b], p, v)
    return vals


def gesture_values(arm, name):
    """Solve a gesture once and return {(bone, path): values} without leaving the pose changed."""
    keep = {(b, p): tuple(getattr(arm.pose.bones[b], p)) for b, p in channels(arm)}
    apply_gesture(arm, name)
    vals = {(b, p): tuple(getattr(arm.pose.bones[b], p)) for b, p in channels(arm)}
    for (b, p), v in keep.items():
        setattr(arm.pose.bones[b], p, v)
    return vals


def key_values(arm, values, frame, base=None, amount=1.0, extra=None):
    """Key a blend base->values (amount 0..1). extra: {(bone, path): (axis, delta)} added on top."""
    for (b, p), v in values.items():
        if base is not None:
            v = tuple(x + (y - x) * amount for x, y in zip(base[(b, p)], v))
        if extra and (b, p) in extra:
            axis, delta = extra[(b, p)]
            v = list(v); v[axis] += delta; v = tuple(v)
        pb = arm.pose.bones[b]
        pb.rotation_mode = "XYZ"
        setattr(pb, p, v)
        pb.keyframe_insert(p, frame=frame)
