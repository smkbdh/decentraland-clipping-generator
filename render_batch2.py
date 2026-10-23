import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
BEAT = BASE_DIR / "assets" / "chill_beat.wav"
FONT = "C\\\\:/Windows/Fonts/arialbd.ttf"
OUT_DIR = BASE_DIR / "ready_videos"
SRC_DIR = BASE_DIR / "batch2_clips"

OUT_DIR.mkdir(exist_ok=True)

BATCH2_JOBS = [
    {
        "out_name": "5_Decentraland_Halloweeks_Plaza_Makeover.mp4",
        "src": SRC_DIR / "Halloweeks in Decentraland - Exploring Halloween Themed Minigames and the New Plaza Makeover!.mp4",
        "start": "00:01:12",
        "duration": "17",
        "top": "HALLOWEEKS IS LIVE THROUGH NOV 1",
        "sub": "POV: checking out the Halloween plaza takeover",
    },
    {
        "out_name": "6_Decentraland_Sunday_Night_Club_Party.mp4",
        "src": SRC_DIR / "Sunday Night Went CRAZY at the Club... Now I Gotta Clean it All Up!.mp4",
        "start": "00:00:48",
        "duration": "17",
        "top": "SUNDAY NIGHT AT THE CLUB WENT CRAZY",
        "sub": "an adult 3D world with real people",
    },
    {
        "out_name": "7_Decentraland_Halloweeks_Monster_Recon.mp4",
        "src": SRC_DIR / "Monster Recon in Decentraland Has Been Updated for Halloween and It Looks AMAZING.mp4",
        "start": "00:02:18",
        "duration": "17",
        "top": "HALLOWEEKS IS LIVE THROUGH NOV 1",
        "sub": "hunting Halloween monsters in 3D arena",
    },
    {
        "out_name": "8_Decentraland_Jetpack_Joyrides_Sky.mp4",
        "src": SRC_DIR / "Jetpacks and Joyrides Through the Skies of Decentraland.mp4",
        "start": "00:01:25",
        "duration": "16",
        "top": "POV: FLYING OVER THE 3D CITY",
        "sub": "jetpacks in a free social world for adults",
    }
]

for job in BATCH2_JOBS:
    src_file = job["src"]
    out_file = OUT_DIR / job["out_name"]
    print(f"\n[+] Rendering {job['out_name']} ...")
    
    top_esc = job["top"].replace(":", "\\:").replace("'", "\\'")
    sub_esc = job["sub"].replace(":", "\\:").replace("'", "\\'")
    
    vf = (
        "scale=-2:1920,"
        "crop=1080:1920:(in_w-1080)/2:0,"
        f"drawtext=fontfile={FONT}:text='{top_esc}':fontcolor=white:fontsize=44:box=1:boxcolor=black@0.75:boxborderw=18:x=(w-text_w)/2:y=280,"
        f"drawtext=fontfile={FONT}:text='{sub_esc}':fontcolor=yellow:fontsize=32:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=365"
    )
    
    # We mix original audio with background beat at subtle volume
    cmd = [
        "ffmpeg", "-y",
        "-ss", job["start"],
        "-i", str(src_file),
        "-stream_loop", "-1",
        "-i", str(BEAT),
        "-t", job["duration"],
        "-filter_complex", f"[0:v]{vf}[v];[0:a]volume=1.0[a0];[1:a]volume=0.35[a1];[a0][a1]amix=inputs=2:duration=first[a]",
        "-map", "[v]",
        "-map", "[a]",
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "20",
        "-c:a", "aac",
        "-b:a", "192k",
        str(out_file)
    ]
    
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f" -> SUCCESS: {out_file.name} ({round(out_file.stat().st_size / (1024*1024), 2)} MB)")
    else:
        print(f" -> ERROR: {res.stderr[-400:]}")

print("\nBatch 2 Rendering Complete!")
