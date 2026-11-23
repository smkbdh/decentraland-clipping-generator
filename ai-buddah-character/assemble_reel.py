"""Собрать вертикальный рилс AI Будды из reel.json и отрендеренного эпизода персонажа.

    python assemble_reel.py D:/Buddah/<reel>/reel.json [--still 15.2] [--output out.mp4]

reel.json (пути — абсолютные или относительно reel.json):
  episode      папка эпизода от animate_from_audio.py (там transcript.json, rgba/frame_####.png)
  voice        исходный файл голоса
  category, handle, character{scale,y}, music{src,volume,duckTo}
  caption_fixes  [{"find": ["Маур"], "to": ["Маор"]}, ...]  — правки ошибок распознавания по словам
  broll / cards / sfx  — см. BuddahReel.tsx; поле src у них — путь к файлу
"""

import argparse, json, os, shutil, subprocess, tempfile
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[1] / "projects" / "geo_documentary_episode_02"


def fix_words(words, fixes):
    out, i = [], 0
    while i < len(words):
        for fx in fixes:
            n = len(fx["find"])
            if [w["word"] for w in words[i : i + n]] == fx["find"]:
                a, b = words[i]["start"], words[i + n - 1]["end"]
                step = (b - a) / len(fx["to"])
                out += [dict(word=t, start=a + k * step, end=a + (k + 1) * step) for k, t in enumerate(fx["to"])]
                i += n
                break
        else:
            out.append(words[i])
            i += 1
    return out


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("reel", type=Path)
    p.add_argument("--output", type=Path)
    p.add_argument("--still", type=float, help="вместо видео отрендерить один кадр на этой секунде")
    a = p.parse_args()
    reel_path = a.reel.resolve()
    base = reel_path.parent
    cfg = json.loads(reel_path.read_text(encoding="utf-8-sig"))
    res = lambda s: (base / s).resolve()
    episode = res(cfg["episode"])
    report = json.loads((episode / "animation_report.json").read_text())
    fps = report["fps"]
    frames = sorted((episode / "rgba").glob("frame_*.png"))
    if not frames:
        raise SystemExit("Нет кадров персонажа: отрендерите episode.blend (blender -b episode.blend -a)")
    transcript = json.loads((episode / "transcript.json").read_text(encoding="utf8"))
    words = [dict(word=w["word"].strip(), start=w["start"], end=w["end"])
             for s in transcript["segments"] for w in s["words"] if w["word"].strip()]
    words = fix_words(words, cfg.get("caption_fixes", []))

    out = (a.output or base / ("still.png" if a.still is not None else "reel.mp4")).resolve()
    with tempfile.TemporaryDirectory(dir=base) as tmp:
        public = Path(tmp) / "public"
        (public / "frames").mkdir(parents=True)
        for f in frames:
            os.link(f, public / "frames" / f.name)
        staged = {}

        def stage(src):
            src_path = res(src)
            if src_path not in staged:
                name = f"m{len(staged):02d}_{src_path.name}"
                shutil.copyfile(src_path, public / name)
                staged[src_path] = name
            return staged[src_path]

        props = dict(
            fps=fps,
            durationInFrames=len(frames),
            frameCount=len(frames),
            voice=stage(cfg["voice"]),
            category=cfg.get("category", ""),
            handle=cfg.get("handle", "@BUDDAH_AI"),
            character=cfg.get("character", dict(scale=0.8, y=280)),
            captions=words,
            broll=[dict(b, src=stage(b["src"])) for b in cfg.get("broll", [])],
            cards=[dict(c, items=[dict(i, src=stage(i["src"])) if "src" in i else i for i in c["items"]])
                   if "items" in c else c for c in cfg.get("cards", [])],
            sfx=[dict(s, src=stage(s["src"])) for s in cfg.get("sfx", [])],
        )
        tracks_file = episode / "tracks.json"
        if tracks_file.exists():
            props["tracks"] = json.loads(tracks_file.read_text(encoding="utf8"))
        if cfg.get("music"):
            props["music"] = dict(cfg["music"], src=stage(cfg["music"]["src"]))
        (base / "reel_props.json").write_text(json.dumps(props, ensure_ascii=False, indent=1), encoding="utf8")
        props_file = Path(tmp) / "props.json"
        props_file.write_text(json.dumps(props, ensure_ascii=False), encoding="utf8")
        cli = PROJECT / "node_modules" / "@remotion" / "cli" / "remotion-cli.js"
        cmd = ["node", str(cli)]
        if a.still is not None:
            cmd += ["still", "src/reels/BuddahReel.tsx", "BuddahReel", str(out), "--frame", str(round(a.still * fps))]
        else:
            cmd += ["render", "src/reels/BuddahReel.tsx", "BuddahReel", str(out), "--concurrency", "4",
                    "--crf", "18", "--audio-bitrate", "192k"]
        cmd += ["--public-dir", str(public), "--props", str(props_file)]
        subprocess.run(cmd, cwd=PROJECT, check=True)
    print(out)


if __name__ == "__main__":
    main()
