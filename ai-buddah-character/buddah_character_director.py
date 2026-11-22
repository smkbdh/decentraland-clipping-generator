"""Create conservative blocking from timed narration and optional agent directions."""

import math
import numpy as np

import hand_gestures as hg

CAMERAS = (
    "CLOSE_UP",
    "MEDIUM_SHOT",
    "FULL_BODY",
    "THREE_QUARTER",
    "PRESENTATION_LEFT",
    "PRESENTATION_RIGHT",
)
GESTURES = tuple(hg.GESTURES) + ("nod",)  # names or emoji (👍 🙏 🫶 ...) — see hand_gestures.EMOJI
EMOTIONS = ("neutral", "skeptic", "surprise")


def pitch_span(audio, rate):
    """Pitch spread in semitones from voiced 40 ms windows."""
    pitches = []
    for start in range(0, len(audio) - 640, 320):
        window = audio[start : start + 640]
        window = (window - window.mean()) * np.hanning(len(window))
        corr = np.correlate(window, window, "full")[len(window) - 1 :]
        if corr[0] < 0.008:
            continue
        lag = 40 + int(np.argmax(corr[40:214]))
        if corr[lag] / corr[0] > 0.52:
            pitches.append(rate / lag)
    if len(pitches) < 5:
        return 0.0
    lo, hi = np.percentile(pitches, [15, 85])
    return float(12 * np.log2(hi / lo))


def direct(segments, samples, rate, duration, context, preset, aspect):
    """An agent may supply timed decisions after considering the complete transcript."""
    events = []
    objects = context.get("objects", {})
    for name, point in objects.items():
        if (
            not isinstance(name, str)
            or len(point) != 3
            or not all(math.isfinite(float(n)) for n in point)
        ):
            raise ValueError("Invalid scene target")
    previous_gesture = -10.0
    for segment in segments:
        start, end = segment["start"], min(duration, segment["end"])
        if end <= start:
            continue
        audio = samples[int(start * rate) : int(end * rate)]
        blocks = audio[: len(audio) // 320 * 320].reshape(-1, 320)
        levels = np.sqrt(np.mean(blocks**2, axis=1)) if len(blocks) else np.array([0.0])
        contrast = float(np.percentile(levels, 90) / max(0.008, np.median(levels)))
        pitch = pitch_span(audio, rate)
        event = dict(
            start=start,
            end=end,
            emotion="neutral",
            gesture="neutral",
            look_target="CAMERA",
            camera=context.get("default_camera", "MEDIUM_SHOT"),
            intensity=0.35,
            energy_contrast=round(contrast, 2),
            pitch_span_semitones=round(pitch, 2),
            text=segment["text"],
        )
        # Invitations to inspect an actual result require both a referenced target and an emphatic phrase.
        text = segment["text"].lower()
        if (
            "SCREEN_MAIN" in objects
            and "смотр" in text
            and any(x in text for x in ("результат", "получил", "экран"))
            and contrast > 1.25
        ):
            event.update(
                gesture="point_right"
                if objects["SCREEN_MAIN"][0] > 0
                else "point_left",
                look_target="SCREEN_MAIN",
                camera="PRESENTATION_LEFT"
                if objects["SCREEN_MAIN"][0] > 0
                else "PRESENTATION_RIGHT",
            )
        elif (
            "проблем" in text
            and any(x in text for x in ("одна", "одну", "но "))
            and contrast > 1.25
        ):
            event.update(emotion="skeptic")
        elif "невероят" in text and contrast > 1.8 and pitch > 1.3 and "?" not in text:
            event.update(emotion="surprise")
        elif end - start > 2.5 and preset == "explainer" and contrast > 1.35:
            event.update(gesture="explain")
        events.append(event)
    if "events" in context:
        events = [dict(e) for e in context["events"]]
    last_end = 0.0
    for e in events:
        start, end = e["start"], e["end"]
        if not (
            last_end <= start < end <= duration + 0.001 and 0 <= e["intensity"] <= 1
        ):
            raise ValueError("Invalid or overlapping direction times")
        last_end = end
        if e["gesture"] != "nod":
            e["gesture"] = hg.resolve(e["gesture"])
        if (
            e["camera"] not in CAMERAS
            or e["emotion"] not in EMOTIONS
            or e["gesture"] not in GESTURES
        ):
            raise ValueError("Unknown acting cue")
        if e["look_target"] != "CAMERA" and e["look_target"] not in objects:
            raise ValueError("Missing target " + e["look_target"])
        if e["gesture"] != "neutral":
            if start - previous_gesture < 1.5:
                e["gesture"] = "neutral"
            else:
                previous_gesture = start
    default = context.get("default_camera", "MEDIUM_SHOT")
    if default not in CAMERAS:
        raise ValueError("Unknown default camera")
    shots = [{"start": 0.0, "camera": default}]
    for e in events:
        if e["camera"] != shots[-1]["camera"]:
            if shots[-1]["start"] == e["start"]:
                shots.pop()
            shots.append({"start": e["start"], "camera": e["camera"]})
    for i, shot in enumerate(shots):
        shot["end"] = shots[i + 1]["start"] if i + 1 < len(shots) else duration
    return {"aspect": aspect, "objects": objects, "events": events}, shots


if __name__ == "__main__":
    import argparse, json, wave
    from pathlib import Path

    parser = argparse.ArgumentParser(
        description="Create direction files from decoded narration, timed transcript and scene description."
    )
    for key in ("audio", "transcript", "context", "output"):
        parser.add_argument("--" + key, required=True, type=Path)
    parser.add_argument("--aspect", choices=["16:9", "9:16"], default="9:16")
    parser.add_argument("--preset", choices=["explainer", "quiet"], default="explainer")
    args = parser.parse_args()
    with wave.open(str(args.audio)) as voice:
        if (
            voice.getsampwidth() != 2
            or voice.getnchannels() != 1
            or voice.getframerate() != 16000
        ):
            parser.error(
                "Use the decoded mono 16 kHz PCM voice.wav produced by animate_from_audio"
            )
        samples = (
            np.frombuffer(voice.readframes(voice.getnframes()), "<i2").astype(float)
            / 32768
        )
    transcript = json.loads(args.transcript.read_text(encoding="utf-8-sig"))
    context = json.loads(args.context.read_text(encoding="utf-8-sig"))
    plan, shots = direct(
        transcript["segments"],
        samples,
        16000,
        len(samples) / 16000,
        context,
        args.preset,
        args.aspect,
    )
    args.output.mkdir(parents=True, exist_ok=False)
    for name, value in [("acting_plan", plan), ("camera_plan", shots)]:
        (args.output / (name + ".json")).write_text(
            json.dumps(value, ensure_ascii=False, indent=2), encoding="utf8"
        )
