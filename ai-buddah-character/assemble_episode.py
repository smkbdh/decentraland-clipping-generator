"""Assemble a rendered episode using the project's existing Remotion installation."""

import argparse, json, os, shutil, struct, subprocess, tempfile
from pathlib import Path

p = argparse.ArgumentParser(description=__doc__)
p.add_argument("episode", type=Path)
p.add_argument("--frames", choices=["preview", "rgba"], default="preview")
p.add_argument("--output", type=Path, required=True)
a = p.parse_args()
folder = a.episode.resolve().parent
out = a.output.resolve()
if out.exists():
    p.error("Output exists")
frames = sorted((folder / a.frames).glob("frame_*.png"), key=lambda image: int(image.stem.split("_")[-1]))
if not frames:
    raise RuntimeError("No rendered frames")
report = json.loads((folder / "animation_report.json").read_text())
with frames[0].open("rb") as f:
    f.seek(16)
    width, height = struct.unpack(">II", f.read(8))
project = (
    Path(__file__).resolve().parents[1] / "projects" / "geo_documentary_episode_02"
)
with tempfile.TemporaryDirectory(dir=folder) as tmp:
    public = Path(tmp) / "public"
    stage = public / "frames"
    stage.mkdir(parents=True)
    for i, frame in enumerate(frames, 1):
        if frame.name != f"frame_{i:04d}.png":
            raise ValueError("Frame sequence has gaps")
        os.link(frame, stage / frame.name)
    source = next(folder.glob("narration.*"), folder / "voice.wav")
    shutil.copyfile(source, public / source.name)
    props = Path(tmp) / "props.json"
    props.write_text(
        json.dumps(
            dict(
                frameCount=len(frames),
                fps=report["fps"],
                width=width,
                height=height,
                background="#202229",
                voice=source.name,
            )
        )
    )
    cli = project / "node_modules" / "@remotion" / "cli" / "remotion-cli.js"
    subprocess.run(
        [
            "node",
            str(cli),
            "render",
            "src/BuddahHost.tsx",
            "BuddahHost",
            str(out),
            "--public-dir",
            str(public),
            "--props",
            str(props),
            "--concurrency",
            "2",
        ],
        cwd=project,
        check=True,
    )
