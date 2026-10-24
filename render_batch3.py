import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
BEAT = BASE_DIR / "assets" / "chill_beat.wav"
FONT = "C\\\\:/Windows/Fonts/arialbd.ttf"
OUT_DIR = BASE_DIR / "ready_videos"
SRC_DIR = BASE_DIR / "batch3_clips"
RAW_DIR = BASE_DIR / "raw_clips"

OUT_DIR.mkdir(exist_ok=True)

BATCH3_JOBS = [
    {
        "out_name": "9_Decentraland_Halloweeks_Events_Showcase.mp4",
        "src": SRC_DIR / "Decentraland is Ready for Halloween with Its Halloweeks Events and Minigames... Are You_.mp4",
        "start": "00:01:40",
        "duration": "17",
        "top": "HALLOWEEKS IS LIVE THROUGH NOV 1",
        "sub": "exploring Halloween events in 3D",
        "has_streamer_audio": True
    },
    {
        "out_name": "10_Decentraland_Cherry_Blossom_Party.mp4",
        "src": SRC_DIR / "Cherry Blossom Party.mov",
        "start": "00:00:20",
        "duration": "17",
        "top": "POV: CHERRY BLOSSOM PARTY IN 3D",
        "sub": "dancing with people around the world",
        "has_streamer_audio": False
    },
    {
        "out_name": "11_Decentraland_Chill_Fishing_Social.mp4",
        "src": SRC_DIR / "Fishing.mov",
        "start": "00:00:30",
        "duration": "17",
        "top": "FRIDAY NIGHT CHILL & FISHING",
        "sub": "free social world for adults - come hang out",
        "has_streamer_audio": False
    },
    {
        "out_name": "12_Decentraland_Slay_The_Steps_Tower.mp4",
        "src": RAW_DIR / "Slay the Steps 3-011.mov",
        "start": "00:01:10",
        "duration": "17",
        "top": "POV: ONE STEP AWAY FROM WINNING",
        "sub": "come play together - free on PC and mobile",
        "has_streamer_audio": False
    }
]

for job in BATCH3_JOBS:
    src_file = job["src"]
    out_file = OUT_DIR / job["out_name"]
    print(f"\n[+] Rendering {job['out_name']} from {src_file.name} ...")
    
    top_esc = job["top"].replace(":", "\\:").replace("'", "\\'")
    sub_esc = job["sub"].replace(":", "\\:").replace("'", "\\'")
    
    vf = (
        "scale=-2:1920,"
        "crop=1080:1920:(in_w-1080)/2:0,"
        f"drawtext=fontfile={FONT}:text='{top_esc}':fontcolor=white:fontsize=44:box=1:boxcolor=black@0.75:boxborderw=18:x=(w-text_w)/2:y=280,"
        f"drawtext=fontfile={FONT}:text='{sub_esc}':fontcolor=yellow:fontsize=32:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=365"
    )
    
    if job["has_streamer_audio"]:
        # Mix original reaction audio with subtle background beat
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
    else:
        # Mix clean royalty-free beat for gameplay clips
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

print("\nBatch 3 Rendering Complete!")
