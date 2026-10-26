import subprocess
import time
from pathlib import Path
from auto_pipeline import upload_and_publish

BASE_DIR = Path(__file__).resolve().parent
OUT_DIR = BASE_DIR / "ready_videos" / "hooked_videos"
OUT_DIR.mkdir(parents=True, exist_ok=True)
BEAT = BASE_DIR / "assets" / "chill_beat.wav"
FONT = "C\\\\:/Windows/Fonts/arialbd.ttf"

JOBS = [
    {
        "out_name": "Hook5_PlateHead_to_CherryBlossom.mp4",
        "hook_file": BASE_DIR / "Plate Head.mp4",
        "hook_start": "00:00:00",
        "hook_duration": "1.9",
        "hook_top": "HOW MY BRAIN FEELS ON MONDAY 💀",
        "hook_sub": "escaping to this 3D festival",
        "body_file": BASE_DIR / "batch3_clips" / "Cherry Blossom Party.mov",
        "body_start": "00:00:25",
        "body_duration": "13",
        "body_top": "CHERRY BLOSSOM FESTIVAL IN 3D 🌸",
        "body_sub": "dancing with people around the world",
        "mix_beat": True,
        "yt_title": "How My Brain Feels on Monday 🌸 #shorts",
        "yt_desc": (
            "The whole crowd danced through this entire DJ set. Come hang out 🌸\n"
            "Decentraland is a free social gaming world for adults, available on desktop and mobile.\n\n"
            "@decentraland_foundation #decentraland #cherryblossom #gaming #adultgaming #shorts"
        )
    },
    {
        "out_name": "Hook6_SandalThrow_to_PumpkinBall.mp4",
        "hook_file": BASE_DIR / "Sandal Throw.mp4",
        "hook_start": "00:00:00",
        "hook_duration": "3.0",
        "hook_top": "NOBODY CAN DODGE THIS 💀",
        "hook_sub": "entering the pumpkin arena",
        "body_file": BASE_DIR / "raw_clips" / "Pumpkin Ball-005.mov",
        "body_start": "00:00:45",
        "body_duration": "12",
        "body_top": "HALLOWEEKS IS LIVE THROUGH NOV 1 🎃",
        "body_sub": "haunted pumpkin arena is wild",
        "mix_beat": True,
        "yt_title": "Nobody Can Dodge This 🎃 #shorts",
        "yt_desc": (
            "Halloweeks is live through Nov 1. Jump in if you dare 🎃\n"
            "Decentraland is a free social gaming world for adults, available on desktop and mobile.\n\n"
            "@decentraland_foundation #decentraland #halloweeks #halloween #gaming #shorts"
        )
    },
    {
        "out_name": "Hook7_BottleKick_to_Skychaser.mp4",
        "hook_file": BASE_DIR / "Martial Artist Kicks an Airborne Bottle.mp4",
        "hook_start": "00:00:00",
        "hook_duration": "2.9",
        "hook_top": "CLEANEST SKILL SHOT EVER 🎯",
        "hook_sub": "soaring over the 3D city",
        "body_file": BASE_DIR / "raw_clips" / "Skychaser-010.mp4",
        "body_start": "00:01:10",
        "body_duration": "13",
        "body_top": "FLYING WITH JETPACKS OVER 3D CITY 🚀",
        "body_sub": "free social gaming world for adults",
        "mix_beat": True,
        "yt_title": "Cleanest Skill Shot Ever 🚀 #shorts",
        "yt_desc": (
            "Jetpacks and joyrides through the skies. Come hang out 🚀\n"
            "Decentraland is a free social gaming world for adults, available on desktop and mobile.\n\n"
            "@decentraland_foundation #decentraland #virtualworld #gaming #adultgaming #shorts"
        )
    },
    {
        "out_name": "Hook8_DirtyFace_to_MonsterRecon.mp4",
        "hook_file": BASE_DIR / "Dirty Face.mp4",
        "hook_start": "00:00:00",
        "hook_duration": "2.5",
        "hook_top": "AFTER 1 ROUND IN THE DUNGEON 💀",
        "hook_sub": "surviving the Halloween monster arena",
        "body_file": BASE_DIR / "batch2_clips" / "Monster Recon in Decentraland Has Been Updated for Halloween and It Looks AMAZING.mp4",
        "body_start": "00:02:40",
        "body_duration": "13",
        "body_top": "HALLOWEEKS IS LIVE THROUGH NOV 1 🎃",
        "body_sub": "hunting Halloween monsters in 3D arena",
        "mix_beat": False,
        "yt_title": "After 1 Round in the Arena 🎃 #shorts",
        "yt_desc": (
            "Halloweeks is live through Nov 1. Monster Recon got updated for Halloween 🎃\n"
            "Decentraland is a free social gaming world for adults, available on desktop and mobile.\n\n"
            "@decentraland_foundation #decentraland #halloweeks #gaming #adultgaming #shorts"
        )
    }
]

def render_hook_part(hook_path: Path, start: str, duration: str, top_text: str, sub_text: str, out_hook: Path):
    top_esc = top_text.replace(":", "\\:").replace("'", "\\'")
    sub_esc = sub_text.replace(":", "\\:").replace("'", "\\'")
    vf = (
        "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        "fps=30,"
        f"drawtext=fontfile={FONT}:text='{top_esc}':fontcolor=white:fontsize=46:box=1:boxcolor=black@0.75:boxborderw=18:x=(w-text_w)/2:y=280,"
        f"drawtext=fontfile={FONT}:text='{sub_esc}':fontcolor=yellow:fontsize=32:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=365"
    )
    cmd = [
        "ffmpeg", "-y",
        "-ss", start,
        "-i", str(hook_path),
        "-t", duration,
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
    print("Auto-Building & Publishing Batch 2 of Hooked Videos")
    print("=" * 60)
    
    published_links = []
    
    for idx, job in enumerate(JOBS, 5):
        final_file = OUT_DIR / job["out_name"]
        hook_tmp = OUT_DIR / f"tmp_hook_{idx}.mp4"
        body_tmp = OUT_DIR / f"tmp_body_{idx}.mp4"
        
        print(f"\n[{idx-4}/4] Building: {job['out_name']} ...")
        print(f" -> Rendering Hook: {job['hook_file'].name}")
        render_hook_part(job["hook_file"], job["hook_start"], job["hook_duration"], job["hook_top"], job["hook_sub"], hook_tmp)
        
        print(f" -> Rendering Decentraland Body: {job['body_file'].name}")
        render_body_part(job["body_file"], job["body_start"], job["body_duration"], job["body_top"], job["body_sub"], job["mix_beat"], body_tmp)
        
        print(f" -> Merging into {final_file.name} ...")
        concat_parts(hook_tmp, body_tmp, final_file)
        
        size_mb = round(final_file.stat().st_size / (1024 * 1024), 2)
        print(f" Rendered: {final_file.name} ({size_mb} MB)")
        
        # Auto-Publish to YouTube
        print(f" -> Publishing to YouTube Shorts...")
        try:
            yt_url = upload_and_publish(final_file, job["yt_title"], job["yt_desc"])
            published_links.append((job["out_name"], yt_url))
            print(" Waiting 5s before next upload...")
            time.sleep(5)
        except Exception as e:
            print(f" Publish Error for {final_file.name}: {e}")

    print("\n" + "=" * 60)
    print("ALL HOOKED VIDEOS PUBLISHED TO YOUTUBE!")
    print("=" * 60)
    for name, url in published_links:
        print(f" - {name} -> {url}")

if __name__ == "__main__":
    main()
