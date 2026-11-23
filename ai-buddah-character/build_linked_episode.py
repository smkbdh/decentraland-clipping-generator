"""Blender executor. All timing is derived from episode JSON, in seconds."""

import bpy, json, math, sys
from pathlib import Path
from mathutils import Vector

sys.path.insert(0, str(Path(__file__).resolve().parent))
import hand_gestures as hg  # noqa: E402

project, master, fps = sys.argv[sys.argv.index("--") + 1 :]
project = Path(project)
folder = project.parent
fps = int(fps)
if project.exists() or project.resolve() == Path(master).resolve():
    raise ValueError("Output must be a new episode")


def read(name):
    return json.loads((folder / (name + ".json")).read_text(encoding="utf8"))


plan = read("acting_plan")
duration = read("transcript")["duration"]
cues = read("visemes")["events"]
bpy.ops.wm.read_factory_settings(use_empty=True)
s = bpy.context.scene
with bpy.data.libraries.load(master, link=True) as (source, selected):
    selected.collections = ["AI_BUDDAH_CHARACTER"]
lib = selected.collections[0]
s.collection.children.link(lib)
asset = lib.override_hierarchy_create(s, bpy.context.view_layer, do_fully_editable=True)
s.collection.children.unlink(lib)
arm = next(o for o in asset.all_objects if o.type == "ARMATURE")
root = arm.pose.bones["Root"]


def frame(t):
    return 1 + t * fps


s.render.fps = fps
s.frame_end = max(1, math.ceil(duration * fps))
s.render.resolution_x, s.render.resolution_y = (
    (1080, 1920) if plan["aspect"] == "9:16" else (1920, 1080)
)
s.render.resolution_percentage = 100
s.render.engine = "BLENDER_WORKBENCH"
s.display.shading.color_type = "TEXTURE"
s.display.shading.light = "FLAT"
s.view_settings.view_transform = "Standard"
s.render.film_transparent = True
s.render.image_settings.color_mode = "RGBA"
s.render.filepath = "//rgba/frame_"
s.render.use_sequencer = False


def action(name):
    arm.animation_data_create()
    a = bpy.data.actions.new(name)
    arm.animation_data.action = a
    return a


def finish(a, blend="REPLACE"):
    ad = arm.animation_data
    if not a.slots:
        ad.action = None
        bpy.data.actions.remove(a)
        return
    slot = ad.action_slot
    ad.action = None
    track = ad.nla_tracks.new()
    track.name = a.name
    strip = track.strips.new(a.name, int(a.frame_range[0]), a)
    strip.action_slot = slot
    strip.extrapolation = "NOTHING"
    strip.blend_type = blend
    a.asset_mark()


def prop(key, value, t):
    root[key] = value
    root.keyframe_insert(data_path='["' + key + '"]', frame=frame(t))


def rot(bone, axis, value, t):
    b = arm.pose.bones[bone]
    b.rotation_euler[axis] = value
    b.keyframe_insert(data_path="rotation_euler", index=axis, frame=frame(t))


a = action("Speech")
names = ["sil", "aa", "oh", "ee", "ch", "mbp", "fv", "th_l"]


# Unit-sum coarticulation with short ramps on either side of each acoustic boundary.
def weights(t):
    vals = {n: 0.0 for n in names}
    for c in active:
        ramp = min(0.035, (c["end"] - c["start"]) / 3)
        if ramp <= 0:
            continue
        v = min(
            1, (t - c["start"] + ramp) / (2 * ramp), (c["end"] + ramp - t) / (2 * ramp)
        )
        vals[c["viseme"]] += max(0, v)
    total = sum(vals.values())
    if total < 1:
        vals["sil"] += 1 - total
    return {n: v / max(1, total) for n, v in vals.items()}


idx = 0
active = []
for f in range(s.frame_end):
    t = f / fps
    while idx < len(cues) and cues[idx]["start"] <= t + 0.04:
        active.append(cues[idx])
        idx += 1
    active = [c for c in active if c["end"] + 0.04 >= t]
    for n, v in weights(t).items():
        prop("viseme_" + n, v, t)
finish(a)
a = action("Idle")
import random
_rng = random.Random(7)
for i in range(math.ceil(duration / 0.45) + 1):
    t = min(duration, i * 0.45)
    rot("Spine", 1, 0.012 * math.sin(2 * math.pi * t / 4.8), t)
    rot("Spine", 2, 0.014 * math.sin(2 * math.pi * t / 6.3 + 1.1), t)     # slow weight shift
    rot("Chest", 0, 0.009 * math.sin(2 * math.pi * t / 3.6), t)           # breathing
    rot("Chest", 2, -0.008 * math.sin(2 * math.pi * t / 6.3 + 1.1), t)    # counter-sway keeps the head steady
# Blinks: irregular intervals, the odd double blink, and a blink whenever the gaze target changes
blinks = []
t = _rng.uniform(.8, 2.0)
while t < duration - .3:
    blinks.append(t)
    if _rng.random() < .18:
        blinks.append(t + .32)
    t += _rng.uniform(2.2, 5.2)
last_target = None
for e in plan["events"]:
    if last_target is not None and e["look_target"] != last_target:
        blinks.append(e["start"] + .02)
    last_target = e["look_target"]
blinks.sort()
kept = []
for b in blinks:
    if not kept or b - kept[-1] > .3:
        kept.append(b)
for t in kept:
    for dt, v in [(0, 0), (0.07, 1), (0.17, 0)]:
        for side in "LR":
            prop("blink_" + side, v, min(duration, t + dt))
finish(a)
for layer in ["Expression", "Eye tracking", "Head aim"]:
    a = action(layer)
    for e in plan["events"]:
        start, end = e["start"], e["end"]
        span = end - start
        for t, v in [
            (start, 0),
            (start + span * 0.30, e["intensity"]),
            (start + span * 0.68, e["intensity"]),
            (end, 0),
        ]:
            if layer == "Expression" and e["emotion"] != "neutral":
                prop("emotion_" + e["emotion"], v, t)
            if layer == "Eye tracking":
                pt = plan["objects"].get(e["look_target"])
                prop("gaze_x", max(-1, min(1, pt[0])) * v if pt else 0, t)
                prop("gaze_z", max(-1, min(1, pt[2] - 2.2)) * v if pt else 0, t)
            if layer == "Head aim":
                pt = plan["objects"].get(e["look_target"])
                angle = (
                    max(-0.65, min(0.65, math.atan2(pt[0], max(0.25, -pt[1]))))
                    if pt
                    else 0
                )
                rot("Head", 1, angle * v, t)
                rot("Neck", 0, (-0.18 if e["gesture"] == "nod" else 0.06) * v, t)
    finish(a)
# ---------------------------------------------------------------- gestures
# Arms are solved to hand targets (hand_gestures.py). Consecutive gestures flow straight into each other;
# the arms only drop to rest in a real pause. Each arrival overshoots a touch and settles.
a = action("Gesture")
neutral = hg.gesture_values(arm, "neutral")
hg.key_values(arm, neutral, frame(0))
_cache = {}


def g_vals(name):
    if name not in _cache:
        _cache[name] = hg.gesture_values(arm, name)
    return _cache[name]


def g_between(name, frm):
    if (name, frm) not in _cache:
        _cache[(name, frm)] = hg.transition_values(arm, name, .5, frm)
    return _cache[(name, frm)]


CHAIN_GAP = 0.6
gev = [dict(e, name=hg.resolve(e["gesture"])) for e in plan["events"] if e["gesture"] not in ("neutral", "nod")]
arrivals = []          # (time, gesture) for the cloth layer
holds = []             # (start, end, gesture) while the hand is in place, for speech beats
for i, e in enumerate(gev):
    name, start, end = e["name"], e["start"], e["end"]
    prev = gev[i - 1] if i > 0 and start - gev[i - 1]["end"] < CHAIN_GAP else None
    nxt = gev[i + 1] if i + 1 < len(gev) and gev[i + 1]["start"] - end < CHAIN_GAP else None
    ramp = min(0.4, (end - start) * 0.3)
    vals = g_vals(name)
    if prev is not None and prev["name"] == name:
        arrive = start                                   # same gesture continues: keep holding
    else:
        frm = prev["name"] if prev is not None else None
        half = g_between(name, frm)
        if prev is None:
            hg.key_values(arm, neutral, frame(start))
            t_half = start + ramp * .45
        else:
            p_ramp = min(0.4, (prev["end"] - prev["start"]) * 0.3)
            t_half = (prev["end"] - p_ramp + start + ramp) / 2
        hg.key_values(arm, half, frame(t_half))
        arrive = start + ramp
        settle = 0.16
        if end - arrive - ramp > settle + 0.2:
            over = {k: tuple(v + (v - h) * hg.OVERSHOOT for v, h in zip(vals[k], half[k]))
                    if k[1] == "rotation_euler" else vals[k] for k in vals}
            hg.key_values(arm, over, frame(arrive))
            hg.key_values(arm, vals, frame(arrive + settle))
            arrive += settle
        else:
            hg.key_values(arm, vals, frame(arrive))
        arrivals.append((start + ramp, name))
    sides = [sd for sd in "RL" if sd in hg.GESTURES[name]]
    period, moves = hg.HOLD_MOTION.get(name, hg.HOLD_DRIFT)
    hold_end = end - ramp if nxt is None else end
    t, sign = arrive + period / 2, 1
    while t < hold_end - period / 4:
        extra = {(f"{base}_{sd}", "rotation_euler"): (axis, sign * amp * (-1 if mirror and sd == "L" else 1))
                 for sd in sides for base, axis, amp, mirror in moves}
        hg.key_values(arm, vals, frame(t), extra=extra)
        t += period / 2
        sign = -sign
    hg.key_values(arm, vals, frame(end - ramp))
    holds.append((arrive, end - ramp, name))
    if nxt is None:
        hg.key_values(arm, g_between(name, None), frame(end - ramp * .45))
        hg.key_values(arm, neutral, frame(end))
finish(a)

# ---------------------------------------------------------------- body
# Torso and shoulders take part in each gesture (additive over idle breathing and the arm poses); the free
# hand comes along a little. Leads the arm in, lags it out; chained gestures blend without dropping to 0.
a = action("Body")
body_bones = ("Chest", "Spine", "Clavicle_R", "Clavicle_L", "Forearm_R", "Forearm_L")
for bn in body_bones:
    arm.pose.bones[bn].rotation_mode = "XYZ"
    arm.pose.bones[bn].rotation_euler = (0, 0, 0)
    arm.pose.bones[bn].keyframe_insert("rotation_euler", frame=frame(0))


def key_body(offs, t, k):
    for bn in body_bones:
        v = offs.get((bn, "rotation_euler"), (0, 0, 0))
        arm.pose.bones[bn].rotation_euler = tuple(c * k for c in v)
        arm.pose.bones[bn].keyframe_insert("rotation_euler", frame=frame(t))


for i, e in enumerate(gev):
    offs = dict(hg.body_offsets(e["name"]))
    sides = set(hg.GESTURES[e["name"]])
    if len(sides) == 1:                          # the free hand lifts a little instead of hanging dead
        free = "L" if "R" in sides else "R"
        offs[(f"Forearm_{free}", "rotation_euler")] = (hg.FREE_HAND_BEND, 0, 0)
    start, end = e["start"], e["end"]
    ramp = min(0.4, (end - start) * 0.3)
    chained_in = i > 0 and start - gev[i - 1]["end"] < CHAIN_GAP
    chained_out = i + 1 < len(gev) and gev[i + 1]["start"] - end < CHAIN_GAP
    if not chained_in:
        key_body(offs, start, 0.0)
    key_body(offs, start + ramp * .8, 1.0)
    key_body(offs, max(start + ramp * .8 + .05, end - ramp), .85)
    if not chained_out:
        nxt_t = gev[i + 1]["start"] if i + 1 < len(gev) else duration
        key_body(offs, min(end + .15, nxt_t, duration), 0.0)
finish(a, "ADD")

# ---------------------------------------------------------------- speech beats
# On stressed words (the loudest syllables) the active hand gives a short downbeat and the head nods with it.
import wave
import numpy as np


def word_list():
    out = []
    for seg in read("transcript")["segments"]:
        for w in seg.get("words", []):
            out.append((w["start"], w["end"], w["word"].strip()))
    return out


def loudness():
    wav = folder / "voice.wav"
    if not wav.exists():
        return None, 1
    with wave.open(str(wav)) as f:
        sr, n, ch, sw = f.getframerate(), f.getnframes(), f.getnchannels(), f.getsampwidth()
        data = np.frombuffer(f.readframes(n), dtype={2: np.int16, 4: np.int32}.get(sw, np.int16)).astype(np.float32)
    if ch > 1:
        data = data.reshape(-1, ch).mean(axis=1)
    hop = max(1, sr // 100)
    frames = data[: len(data) // hop * hop].reshape(-1, hop)
    rms = np.sqrt((frames ** 2).mean(axis=1) + 1e-9)
    return rms / (rms.max() + 1e-9), 100


rms, rate = loudness()
cands = []
for w0, w1, txt in word_list():
    if w1 - w0 < .12 or not any(ch.isalnum() for ch in txt):
        continue
    if rms is not None:
        seg = rms[int(w0 * rate):max(int(w1 * rate), int(w0 * rate) + 1)]
        peak = float(seg.max()) if len(seg) else 0.0
    else:
        peak = .5
    score = peak * (1.25 if any(ch.isdigit() for ch in txt) else 1.0) * (1 + min(len(txt), 10) / 20)
    cands.append((w0 + min(.08, (w1 - w0) * .3), score))
cands.sort(key=lambda b: -b[1])
chosen = []
for t, sc in cands:
    if sc < .45 * cands[0][1]:
        break
    if all(abs(t - c) > 1.1 for c in chosen):
        chosen.append(t)
chosen.sort()
a = action("Beats")
beat_bones = ("Forearm_R", "Forearm_L", "Hand_R", "Hand_L", "Neck", "Chest")
for bn in beat_bones:
    arm.pose.bones[bn].rotation_mode = "XYZ"
    arm.pose.bones[bn].rotation_euler = (0, 0, 0)
    arm.pose.bones[bn].keyframe_insert("rotation_euler", frame=frame(0))


def key_beat(t, k, sides):
    for bn in beat_bones:
        v = [0.0, 0.0, 0.0]
        if bn == "Neck":
            v[0] = hg.BEAT_NOD * k
        elif bn == "Chest":
            v[0] = hg.BEAT_NOD * .35 * k
        elif bn[-1] in sides and bn.startswith("Forearm"):
            v[0] = hg.BEAT_ARM * k
        elif bn[-1] in sides and bn.startswith("Hand"):
            v[0] = hg.BEAT_HAND * k
        arm.pose.bones[bn].rotation_euler = v
        arm.pose.bones[bn].keyframe_insert("rotation_euler", frame=frame(t))


for t in chosen:
    hold = next((h for h in holds if h[0] + .05 <= t <= h[1] - .1), None)
    sides = set(hg.GESTURES[hold[2]]) if hold and hold[2] not in hg.HOLD_MOTION else set()
    key_beat(max(0, t - .14), 0, sides)
    key_beat(t, 1, sides)
    key_beat(t + .12, -.25, sides)
    key_beat(t + .34, 0, sides)
finish(a, "ADD")

# ---------------------------------------------------------------- cloth inertia
# When an arm arrives, the loose bell keeps going: it drops further, bounces back and settles.
a = action("Cloth")
for sd in "RL":
    pb = arm.pose.bones.get(f"SleeveEnd_{sd}")
    if pb:
        pb.location = (0, 0, 0)
        pb.keyframe_insert("location", frame=frame(0))
for t0, name in arrivals:
    vals = g_vals(name)
    for sd in "RL":
        sag = Vector(vals.get((f"SleeveEnd_{sd}", "location"), (0, 0, 0)))
        if sd not in hg.GESTURES[name] or sag.length < 1e-4:
            continue
        pb = arm.pose.bones[f"SleeveEnd_{sd}"]
        for dt, k in ((-.06, 0), (.10, .75), (.26, -.30), (.44, .10), (.62, 0)):
            pb.location = sag * k
            pb.keyframe_insert("location", frame=frame(t0 + dt))
finish(a, "ADD")

# Eye life: small saccades on top of the gaze target (additive); a living eye never holds perfectly still.
a = action("Eye life")
_rng2 = random.Random(11)
t = 0.0
gx = gz = 0.0
prop("gaze_x", 0.0, 0.0)
prop("gaze_z", 0.0, 0.0)
while t < duration - .2:
    hold = _rng2.uniform(.45, 1.5)
    prop("gaze_x", gx, t + hold - .04)        # hold, then a quick jump (40 ms) to the next fixation
    prop("gaze_z", gz, t + hold - .04)
    gx, gz = _rng2.uniform(-.06, .06), _rng2.uniform(-.035, .035)
    t += hold
    prop("gaze_x", gx, min(duration, t))
    prop("gaze_z", gz, min(duration, t))
finish(a, "ADD")

specs = {
    "CLOSE_UP": (2.30, 1.88, 8, 0),
    "MEDIUM_SHOT": (1.96, 2.60, 10, 0),
    "FULL_BODY": (1.57, 3.72, 8, 0),
    "THREE_QUARTER": (1.57, 3.72, 30, 0),
    "PRESENTATION_LEFT": (1.57, 4.05, 8, 0.22),
    "PRESENTATION_RIGHT": (1.57, 4.05, -8, -0.22),
}
vertical = plan["aspect"] == "9:16"
if vertical:
    # Рилс: сверху карточки и субтитры, ведущий в нижней части кадра, голова целиком в ширину 9:16.
    specs = {
        "CLOSE_UP": (2.25, 2.7, 8, 0),
        "MEDIUM_SHOT": (1.95, 3.4, 10, 0),
        "FULL_BODY": (1.57, 4.4, 8, 0),
        "THREE_QUARTER": (1.75, 3.9, 30, 0),
        "PRESENTATION_LEFT": (1.6, 4.4, 8, 0.22),
        "PRESENTATION_RIGHT": (1.6, 4.4, -8, -0.22),
    }
for name, (z, scale, angle, shift) in specs.items():
    data = bpy.data.cameras.new(name)
    cam = bpy.data.objects.new(name, data)
    s.collection.objects.link(cam)
    data.type = "ORTHO"
    data.ortho_scale = scale * max(1, s.render.resolution_x / s.render.resolution_y)
    if vertical:
        data.shift_y = 0.17
    target = Vector((shift, 0, z))
    angle = math.radians(angle)
    cam.location = target + Vector((6 * math.sin(angle), -6 * math.cos(angle), 0))
    cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
for shot in read("camera_plan"):
    marker = s.timeline_markers.new(shot["camera"], frame=round(frame(shot["start"])))
    marker.camera = bpy.data.objects[shot["camera"]]
s.camera = bpy.data.objects[read("camera_plan")[0]["camera"]]
for name, coords in plan["objects"].items():
    target = bpy.data.objects.new(name, None)
    s.collection.objects.link(target)
    target.location = coords
s.sequence_editor_create().strips.new_sound(
    "Narration", str(folder / "voice.wav"), 1, 1
)
# Screen tracks for the reel compositor: where the hands are (captions dodge them) and where the feet stand
# (a soft contact shadow is drawn there). Pixel coordinates of the rendered character frame.
from bpy_extras.object_utils import world_to_camera_view

W, H = s.render.resolution_x, s.render.resolution_y
tracks = dict(width=W, height=H, shadow=[], hands=[])
mw = arm.matrix_world


def to_px(cam, p):
    co = world_to_camera_view(s, cam, p)
    return co.x * W, (1 - co.y) * H


for f in range(1, s.frame_end + 1):
    s.frame_set(f)
    cam = s.camera
    feet = [mw @ arm.pose.bones[f"Foot_{sd}"].head for sd in "LR"]
    c = (feet[0] + feet[1]) / 2
    c.z = 0.0
    half = abs(feet[1].x - feet[0].x) / 2 + .22
    p0, pxx, pyy = to_px(cam, c), to_px(cam, c + Vector((half, 0, 0))), to_px(cam, c + Vector((0, .17, 0)))
    tracks["shadow"].append([round(p0[0]), round(p0[1]), round(abs(pxx[0] - p0[0])), round(max(6, abs(pyy[1] - p0[1])))])
    pts = []
    for sd in "LR":
        pts.append(to_px(cam, mw @ arm.pose.bones[f"Hand_{sd}"].head))
        pts.append(to_px(cam, mw @ arm.pose.bones[f"Middle3_{sd}"].tail))
    tracks["hands"].append([[round(x), round(y)] for x, y in pts])
(folder / "tracks.json").write_text(json.dumps(tracks), encoding="utf8")
s.frame_set(1)
bpy.ops.wm.save_as_mainfile(filepath=str(project), relative_remap=True)
(folder / "animation_report.json").write_text(
    json.dumps(
        dict(
            fps=fps,
            duration=duration,
            frames=s.frame_end,
            master=master,
            linked=bool(asset.override_library),
            layers=[t.name for t in arm.animation_data.nla_tracks],
            cues=len(cues),
            camera_shots=len(read("camera_plan")),
            gaze="head aim and local iris-area deformation",
            format="RGBA PNG",
        ),
        indent=2,
    ),
    encoding="utf8",
)
