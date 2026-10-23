import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
BEAT = BASE_DIR / "assets" / "chill_beat.wav"
FONT = "C\\\\:/Windows/Fonts/arialbd.ttf"
OUT_DIR = BASE_DIR / "ready_videos"
OUT_DIR.mkdir(exist_ok=True)

JOBS = [
    {
        "out_name": "2_Decentraland_Jetpack_Skychaser.mp4",
        "src": BASE_DIR / "raw_clips" / "Skychaser-010.mp4",
        "start": "00:00:25",
        "duration": "16",
        "top": "A FREE 3D WORLD FOR ADULTS?",
        "sub": "flying through the city with a jetpack"
    },
    {
        "out_name": "3_Decentraland_Dungeons_Of_Antrom.mp4",
        "src": BASE_DIR / "raw_clips" / "Gameplay-20261023T062401Z-1-009" / "Gameplay" / "Desktop" / "Dungeons of Antrom.mov",
        "start": "00:00:35",
        "duration": "17",
        "top": "WHEN GAME NIGHT GETS INTENSE",
        "sub": "dungeon boss battle with the group"
    },
    {
        "out_name": "4_Decentraland_Slay_The_Steps.mp4",
        "src": BASE_DIR / "raw_clips" / "Gameplay-20261023T062401Z-1-009" / "Gameplay" / "Desktop" / "Slay the steps 4.mov",
        "start": "00:00:10",
        "duration": "16",
        "top": "WE LOST EVERY ROUND BUT HAD A BLAST",
        "sub": "come play together - free on PC and mobile"
    }
]

for job in JOBS:
    src_file = job["src"]
    out_file = OUT_DIR / job["out_name"]
    print(f"\n[+] Rendering {job['out_name']} from {src_file.name}...")
    
    top_esc = job["top"].replace(":", "\\:").replace("'", "\\'")
    sub_esc = job["sub"].replace(":", "\\:").replace("'", "\\'")
    
    vf = (
        "scale=-2:1920,"
        "crop=1080:1920:(in_w-1080)/2:0,"
        f"drawtext=fontfile={FONT}:text='{top_esc}':fontcolor=white:fontsize=46:box=1:boxcolor=black@0.75:boxborderw=18:x=(w-text_w)/2:y=280,"
        f"drawtext=fontfile={FONT}:text='{sub_esc}':fontcolor=yellow:fontsize=34:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=365"
    )
    
    cmd = [
        "ffmpeg", "-y",
        "-ss", job["start"],
        "-i", str(src_file),
        "-stream_loop", "-1",
        "-i", str(BEAT),
        "-t", job["duration"],
        "-vf", vf,
        "-map", "0:v:0",
        "-map", "1:a:0",
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

print("\nAll batch renders complete!")
