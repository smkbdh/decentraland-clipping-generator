"""Create a linked Blender episode using local Russian ASR and acoustic mouth cues."""

import argparse, json, math, shutil, subprocess, wave
from pathlib import Path
import numpy as np

from buddah_character_director import direct


def write(path, value):
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False), encoding="utf8")


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("audio", type=Path)
    p.add_argument(
        "--project",
        required=True,
        type=Path,
        help="new episode .blend path in a new folder",
    )
    p.add_argument(
        "--master", type=Path, default=Path(r"D:\Buddah\AI_BUDDAH_MASTER.blend")
    )
    p.add_argument("--context", type=Path)
    p.add_argument("--model", default="base")
    p.add_argument("--aspect", choices=["9:16", "16:9"], default="9:16")
    p.add_argument("--fps", type=int, default=30)
    p.add_argument("--preset", choices=["explainer", "quiet"], default="explainer")
    p.add_argument(
        "--blender",
        default=r"C:\Program Files\Blender Foundation\Blender 5.3\blender.exe",
    )
    p.add_argument(
        "--rhubarb",
        default=r"D:\Buddah\tools\Rhubarb-Lip-Sync-1.14.0-Windows\rhubarb.exe",
    )
    p.add_argument(
        "--preview",
        action="store_true",
        help="render a maximum of 15 seconds at 25 percent",
    )
    a = p.parse_args()
    project = a.project.resolve()
    master = a.master.resolve()
    audio = a.audio.resolve()
    if (
        project.suffix.lower() != ".blend"
        or project == master
        or not master.is_file()
        or not audio.is_file()
        or not 12 <= a.fps <= 60
    ):
        p.error("Invalid project, master, audio or FPS")
    folder = project.parent
    folder.mkdir(parents=True, exist_ok=False)
    source = folder / ("narration" + audio.suffix.lower())
    shutil.copy2(audio, source)
    wav = folder / "voice.wav"
    subprocess.run(
        [
            "ffmpeg",
            "-v",
            "error",
            "-i",
            str(audio),
            "-vn",
            "-ac",
            "1",
            "-ar",
            "16000",
            "-c:a",
            "pcm_s16le",
            str(wav),
        ],
        check=True,
    )
    with wave.open(str(wav)) as f:
        rate = f.getframerate()
        samples = (
            np.frombuffer(f.readframes(f.getnframes()), "<i2").astype(float) / 32768
        )
    duration = len(samples) / rate
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        # The existing Whisper CLI is also local; use cached model weights explicitly.
        weights = Path.home() / ".cache" / "whisper" / (a.model + ".pt")
        if not weights.is_file():
            raise SystemExit("Local Whisper model missing: " + str(weights))
        subprocess.run(
            [
                "whisper",
                str(wav),
                "--model",
                str(weights),
                "--language",
                "ru",
                "--device",
                "cpu",
                "--fp16",
                "False",
                "--threads",
                "4",
                "--word_timestamps",
                "True",
                "--output_format",
                "json",
                "--output_dir",
                str(folder),
            ],
            check=True,
        )
        transcript = json.loads((folder / "voice.json").read_text(encoding="utf8"))[
            "segments"
        ]
    else:
        model = WhisperModel(
            a.model, device="cpu", compute_type="int8", local_files_only=True
        )
        segments, _ = model.transcribe(str(wav), language="ru", word_timestamps=True)
        transcript = [
            dict(
                start=s.start,
                end=s.end,
                text=s.text.strip(),
                words=[
                    dict(word=w.word, start=w.start, end=w.end) for w in (s.words or [])
                ],
            )
            for s in segments
        ]
    write(
        folder / "transcript.json",
        dict(language="ru", duration=duration, segments=transcript),
    )
    raw = folder / "mouth-cues.json"
    subprocess.run(
        [
            a.rhubarb,
            "-r",
            "phonetic",
            "--quiet",
            "--extendedShapes",
            "GHX",
            "-f",
            "json",
            "-o",
            str(raw),
            str(wav),
        ],
        check=True,
    )
    mapping = dict(
        X="sil", A="mbp", B="ch", C="ee", D="aa", E="oh", F="oh", G="fv", H="th_l"
    )
    cues = [
        dict(start=c["start"], end=c["end"], viseme=mapping[c["value"]])
        for c in json.loads(raw.read_text())["mouthCues"]
    ]
    write(
        folder / "visemes.json",
        dict(method="Rhubarb phonetic acoustic mouth cues", events=cues),
    )
    context = json.loads(a.context.read_text(encoding="utf-8-sig")) if a.context else {}
    plan, shots = direct(
        transcript, samples, rate, duration, context, a.preset, a.aspect
    )
    write(folder / "acting_plan.json", plan)
    write(folder / "camera_plan.json", shots)
    subprocess.run(
        [
            a.blender,
            "-b",
            "--python-exit-code",
            "1",
            "-P",
            str(Path(__file__).with_name("build_linked_episode.py")),
            "--",
            str(project),
            str(master),
            str(a.fps),
        ],
        check=True,
    )
    if a.preview:
        frames = min(math.ceil(duration * a.fps), 15 * a.fps)
        subprocess.run(
            [
                a.blender,
                "-b",
                str(project),
                "--python-expr",
                "import bpy; bpy.context.scene.render.resolution_percentage=25",
                "-o",
                str(folder / "preview" / "frame_"),
                "-s",
                "1",
                "-e",
                str(frames),
                "-a",
            ],
            check=True,
        )
        subprocess.run(
            [
                "ffmpeg",
                "-v",
                "error",
                "-framerate",
                str(a.fps),
                "-start_number",
                "1",
                "-i",
                str(folder / "preview" / "frame_%04d.png"),
                "-i",
                str(audio),
                "-t",
                str(frames / a.fps),
                "-vf",
                "pad=ceil(iw/2)*2:ceil(ih/2)*2",
                "-c:v",
                "libx264",
                "-pix_fmt",
                "yuv420p",
                "-c:a",
                "aac",
                str(folder / "preview.mp4"),
            ],
            check=True,
        )


if __name__ == "__main__":
    main()
