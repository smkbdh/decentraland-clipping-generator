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
for i in range(math.ceil(duration / 0.45) + 1):
    t = min(duration, i * 0.45)
    rot("Spine", 1, 0.012 * math.sin(2 * math.pi * t / 4.8), t)
    rot("Chest", 0, 0.009 * math.sin(2 * math.pi * t / 3.6), t)
for i in range(1, int(duration / 3.7) + 1):
    t = i * 3.7 - 0.24
    for dt, v in [(0, 0), (0.08, 1), (0.19, 0)]:
        for side in "LR":
            prop("blink_" + side, v, t + dt)
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
# Gestures: arms are solved to hand targets, fingers posed from hand_gestures.py (full strength, eased in/out).
a = action("Gesture")
neutral = hg.gesture_values(arm, "neutral")
hg.key_values(arm, neutral, frame(0))
solved = {}
for e in plan["events"]:
    if e["gesture"] in ("neutral", "nod"):
        continue
    name = hg.resolve(e["gesture"])
    vals = solved.setdefault(name, hg.gesture_values(arm, name))
    half = solved.setdefault(name + "@half", hg.transition_values(arm, name, .5))
    start, end = e["start"], e["end"]
    ramp = min(0.4, (end - start) * 0.3)
    hg.key_values(arm, neutral, frame(start))
    hg.key_values(arm, half, frame(start + ramp * .45))   # IK in-between: the hand travels, joints follow
    settle = 0.16
    if end - start - 2 * ramp > settle + 0.2:
        over = {k: tuple(v + (v - h) * hg.OVERSHOOT for v, h in zip(vals[k], half[k])) if k[1] == "rotation_euler" else vals[k]
                for k in vals}
        hg.key_values(arm, over, frame(start + ramp))     # overshoot a touch, then settle
        hg.key_values(arm, vals, frame(start + ramp + settle))
    else:
        hg.key_values(arm, vals, frame(start + ramp))
        settle = 0.0
    sides = [sd for sd in "RL" if sd in hg.GESTURES[name]]
    period, moves = hg.HOLD_MOTION.get(name, hg.HOLD_DRIFT)
    t, sign = start + ramp + settle + period / 2, 1
    while t < end - ramp - period / 4:
        extra = {(f"{base}_{sd}", "rotation_euler"): (axis, sign * amp * (-1 if mirror and sd == "L" else 1))
                 for sd in sides for base, axis, amp, mirror in moves}
        hg.key_values(arm, vals, frame(t), extra=extra)
        t += period / 2; sign = -sign
    hg.key_values(arm, vals, frame(end - ramp))
    hg.key_values(arm, half, frame(end - ramp * .45))
    hg.key_values(arm, neutral, frame(end))
finish(a)
# Body: torso and shoulders take part in each gesture (additive over idle breathing and the arm poses).
# The torso leads the arm a little on the way in and lags on the way out (overlap), never snapping.
a = action("Body")
body_bones = ("Chest", "Spine", "Clavicle_R", "Clavicle_L")
for bn in body_bones:
    arm.pose.bones[bn].rotation_mode = "XYZ"
    arm.pose.bones[bn].rotation_euler = (0, 0, 0)
    arm.pose.bones[bn].keyframe_insert("rotation_euler", frame=frame(0))
gest_events = [e for e in plan["events"] if e["gesture"] not in ("neutral", "nod")]
for i, e in enumerate(gest_events):
    nxt = gest_events[i + 1]["start"] if i + 1 < len(gest_events) else duration
    offs = hg.body_offsets(e["gesture"])
    start, end = e["start"], e["end"]
    ramp = min(0.4, (end - start) * 0.3)

    def key_body(t, k):
        for bn in body_bones:
            v = offs.get((bn, "rotation_euler"), (0, 0, 0))
            arm.pose.bones[bn].rotation_euler = tuple(c * k for c in v)
            arm.pose.bones[bn].keyframe_insert("rotation_euler", frame=frame(t))
    key_body(start, 0.0)
    key_body(start + ramp * .8, 1.0)
    key_body(max(start + ramp * .8 + .05, end - ramp), .8)
    key_body(min(end + .15, nxt, duration), 0.0)
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
