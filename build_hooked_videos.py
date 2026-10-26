import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
OUT_DIR = BASE_DIR / "ready_videos" / "hooked_videos"
OUT_DIR.mkdir(parents=True, exist_ok=True)
BEAT = BASE_DIR / "assets" / "chill_beat.wav"
FONT = "C\\\\:/Windows/Fonts/arialbd.ttf"

JOBS = [
    {
        "out_name": "Hook1_BumpySlide_to_Halloween.mp4",
        "hook_file": BASE_DIR / "Bumpy Slide.mp4",
        "hook_top": "ME IN REAL LIFE 💀",
        "hook_sub": "vs me in Decentraland",
        "body_file": BASE_DIR / "raw_clips" / "Pumpkin Ball-005.mov",
        "body_start": "00:00:22",
        "body_duration": "13",
        "body_top": "HALLOWEEKS IS LIVE THROUGH NOV 1 🎃",
        "body_sub": "haunted pumpkin arena is wild",
        "mix_beat": True
    },
    {
        "out_name": "Hook2_Golfer_to_SlayTheSteps.mp4",
        "hook_file": BASE_DIR / "Golfer Loses Balance During Tee Shot.mp4",
        "hook_top": "MY BALANCE IN REAL LIFE 💀",
        "hook_sub": "why is this so relatable",
        "body_file": BASE_DIR / "raw_clips" / "Gameplay-20261023T062401Z-1-009" / "Gameplay" / "Desktop" / "Slay the steps 4.mov",
        "body_start": "00:00:10",
        "body_duration": "13",
        "body_top": "WE LOST EVERY ROUND BUT HAD A BLAST 😂",
        "body_sub": "come play together - free on PC & mobile",
        "mix_beat": True
    },
    {
        "out_name": "Hook3_LaunchTackle_to_Jetpack.mp4",
        "hook_file": BASE_DIR / "Launch Tackle.mp4",
        "hook_top": "HOW MONDAY HITS YOU 💀",
        "hook_sub": "needed this escape tonight",
        "body_file": BASE_DIR / "raw_clips" / "Skychaser-010.mp4",
        "body_start": "00:00:25",
        "body_duration": "13",
        "body_top": "FLYING WITH JETPACKS OVER THE 3D CITY 🚀",
        "body_sub": "free social gaming world for adults",
        "mix_beat": True
    },
    {
        "out_name": "Hook4_CornThrow_to_ClubParty.mp4",
        "hook_file": BASE_DIR / "Corn Throw.mp4",
        "hook_top": "WHEN LIFE THROWS HANDS 💀",
        "hook_sub": "escaped to the virtual club",
        "body_file": BASE_DIR / "batch2_clips" / "Sunday Night Went CRAZY at the Club... Now I Gotta Clean it All Up!.mp4",
        "body_start": "00:00:48",
        "body_duration": "14",
        "body_top": "SUNDAY NIGHT AT THE CLUB WENT CRAZY 🪩",
        "body_sub": "dancing with people from around the globe",
        "mix_beat": False
    }
]

def render_hook_part(hook_path: Path, top_text: str, sub_text: str, out_hook: Path):
    top_esc = top_text.replace(":", "\\:").replace("'", "\\'")
    sub_esc = sub_text.replace(":", "\\:").replace("'", "\\'")
    vf = (
        "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        "fps=30,"
        f"drawtext=fontfile={FONT}:text='{top_esc}':fontcolor=white:fontsize=48:box=1:boxcolor=black@0.75:boxborderw=18:x=(w-text_w)/2:y=280,"
        f"drawtext=fontfile={FONT}:text='{sub_esc}':fontcolor=yellow:fontsize=34:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=365"
    )
    cmd = [
        "ffmpeg", "-y",
        "-i", str(hook_path),
        "-vf", vf,
        "-c:v", "libx264", "-preset", "fast", "-crf", "20",
        "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-ac", "2",
        str(out_hook)
    ]
    subprocess.run(cmd, check=True, capture_output=True)

def render_body_part(body_path: Path, start: str, duration: str, top_text: str, sub_text: str, mix_beat: bool, out_body: Path):
    top_esc = top_text.replace(":", "\\:").replace("'", "\\'")
    sub_esc = sub_text.replace(":", "\\:").replace("'", "\\'")
    vf = (
        "scale=-2:1920,crop=1080:1920:(in_w-1080)/2:0,"
        "fps=30,"
        f"drawtext=fontfile={FONT}:text='{top_esc}':fontcolor=white:fontsize=44:box=1:boxcolor=black@0.75:boxborderw=18:x=(w-text_w)/2:y=280,"
        f"drawtext=fontfile={FONT}:text='{sub_esc}':fontcolor=yellow:fontsize=32:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=365"
    )
    if mix_beat:
        cmd = [
            "ffmpeg", "-y",
            "-ss", start,
            "-i", str(body_path),
            "-stream_loop", "-1",
            "-i", str(BEAT),
            "-t", duration,
            "-vf", vf,
            "-map", "0:v:0",
            "-map", "1:a:0",
            "-c:v", "libx264", "-preset", "fast", "-crf", "20",
            "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-ac", "2",
            str(out_body)
        ]
    else:
        cmd = [
            "ffmpeg", "-y",
            "-ss", start,
            "-i", str(body_path),
            "-stream_loop", "-1",
            "-i", str(BEAT),
            "-t", duration,
            "-filter_complex", f"[0:v]{vf}[v];[0:a]volume=1.0[a0];[1:a]volume=0.3[a1];[a0][a1]amix=inputs=2:duration=first[a]",
            "-map", "[v]",
            "-map", "[a]",
            "-c:v", "libx264", "-preset", "fast", "-crf", "20",
            "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-ac", "2",
            str(out_body)
        ]
    subprocess.run(cmd, check=True, capture_output=True)

def concat_parts(hook_part: Path, body_part: Path, out_final: Path):
    list_file = out_final.with_suffix(".txt")
    with open(list_file, "w", encoding="utf-8") as f:
        f.write(f"file '{hook_part.as_posix()}'\n")
        f.write(f"file '{body_part.as_posix()}'\n")
    
    cmd = [
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(list_file),
        "-c", "copy",
        str(out_final)
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    list_file.unlink(missing_ok=True)
    hook_part.unlink(missing_ok=True)
    body_part.unlink(missing_ok=True)

def main():
    print("=" * 60)
    print("Building 4 Viral Hooked Videos for Decentraland")
    print("=" * 60)
    
    for idx, job in enumerate(JOBS, 1):
        final_file = OUT_DIR / job["out_name"]
        hook_tmp = OUT_DIR / f"tmp_hook_{idx}.mp4"
        body_tmp = OUT_DIR / f"tmp_body_{idx}.mp4"
        
        print(f"\n[{idx}/4] Processing: {job['out_name']} ...")
        print(f" -> Rendering Hook: {job['hook_file'].name}")
        render_hook_part(job["hook_file"], job["hook_top"], job["hook_sub"], hook_tmp)
        
        print(f" -> Rendering Body: {job['body_file'].name}")
        render_body_part(job["body_file"], job["body_start"], job["body_duration"], job["body_top"], job["body_sub"], job["mix_beat"], body_tmp)
        
        print(f" -> Merging into {final_file.name} ...")
        concat_parts(hook_tmp, body_tmp, final_file)
        
        size_mb = round(final_file.stat().st_size / (1024 * 1024), 2)
        print(f" SUCCESS: {final_file.name} ({size_mb} MB)")

    print("\nAll 4 Hooked Videos rendered successfully! Saved in:")
    print(str(OUT_DIR))

if __name__ == "__main__":
    main()
