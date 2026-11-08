import sys
import io
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
SCRATCH_DIR = BASE_DIR / "scratch"
FAST_CUTS_DIR = SCRATCH_DIR / "fast_cuts"
STOCK_DIR = SCRATCH_DIR / "stock_downloads"

WIDTH = 1080
HEIGHT = 1920

def create_sleek_overlay():
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    font_hook = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 46)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 26)
    font_track = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 32)
    
    # 1. TOP SLEEK PILL (y: 200)
    pill_w = 900
    pill_h = 130
    pill_x = (WIDTH - pill_w) // 2
    pill_y = 200
    
    draw.rounded_rectangle(
        [(pill_x, pill_y), (pill_x + pill_w, pill_y + pill_h)],
        radius=24,
        fill=(8, 8, 12, 190),
        outline=(255, 255, 255, 80),
        width=2
    )
    
    # Green live pulse dot
    dot_x = pill_x + 36
    dot_y = pill_y + 32
    draw.ellipse([(dot_x, dot_y), (dot_x + 12, dot_y + 12)], fill=(46, 213, 115, 255))
    draw.text((dot_x + 24, pill_y + 25), "LATE NIGHT DRIVE • ON REPEAT", font=font_badge, fill=(180, 215, 255, 240))
    draw.text((pill_x + 36, pill_y + 65), "POV: when this track hits different...", font=font_hook, fill=(255, 255, 255, 255))
    
    # 2. BOTTOM SOUND BADGE (y: 1680)
    badge_w = 780
    badge_h = 75
    badge_x = (WIDTH - badge_w) // 2
    badge_y = 1680
    
    draw.rounded_rectangle(
        [(badge_x, badge_y), (badge_x + badge_w, badge_y + badge_h)],
        radius=38,
        fill=(8, 8, 12, 200),
        outline=(255, 255, 255, 80),
        width=2
    )
    
    # Mini play triangle icon
    tri_x = badge_x + 35
    tri_y = badge_y + 26
    draw.polygon([(tri_x, tri_y), (tri_x, tri_y + 22), (tri_x + 18, tri_y + 11)], fill=(255, 255, 255, 240))
    draw.text((tri_x + 32, badge_y + 20), "Smoke Buddah — Paradise (One Take)", font=font_track, fill=(255, 255, 255, 255))
    
    overlay_path = SCRATCH_DIR / "sleek_fast_cuts_overlay.png"
    overlay.save(overlay_path)
    print(f"Overlay created: {overlay_path}")
    return overlay_path

def render_fast_cuts_reel():
    overlay = create_sleek_overlay()
    audio = SCRATCH_DIR / "music_test" / "smoke_buddah_audio.mp4"
    output_video = SCRATCH_DIR / "smoke_buddah_fast_cuts_hd.mp4"
    
    # Define our 8 rapid cuts (file, ss, t)
    shots = [
        (FAST_CUTS_DIR / "49.mp4", 1.0, 2.5),       # Headlights close-up
        (FAST_CUTS_DIR / "74.mp4", 2.0, 2.5),       # Sports car speeding
        (FAST_CUTS_DIR / "63.mp4", 1.0, 2.2),       # Glowing cockpit / wheel
        (STOCK_DIR / "42037.mp4", 2.0, 2.8),        # Luxury car drift / turn
        (FAST_CUTS_DIR / "40746.mp4", 1.0, 2.5),    # Tokyo neon skyscrapers
        (FAST_CUTS_DIR / "42048.mp4", 0.0, 2.5),    # Highway light trails
        (STOCK_DIR / "40.mp4", 3.0, 2.5),           # POV night bridge drive
        (FAST_CUTS_DIR / "64.mp4", 2.0, 3.0)        # Accelerating into night
    ]
    
    print("\n1. Готовим и нормализуем 8 динамичных кадров...")
    processed_shots = []
    for idx, (path, ss, duration) in enumerate(shots, 1):
        shot_out = SCRATCH_DIR / f"shot_{idx}.mp4"
        cmd = [
            "ffmpeg", "-y",
            "-ss", str(ss),
            "-i", str(path),
            "-t", str(duration),
            "-vf", "scale=-2:1920,crop=1080:1920,unsharp=5:5:1.1:5:5:0.0,eq=contrast=1.12:saturation=1.2",
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "16",
            "-an",
            str(shot_out)
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode != 0:
            print(f"Ошибка кадра {idx}: {res.stderr.decode('utf-8', errors='ignore')}")
            return None
        processed_shots.append(shot_out)
        print(f"  Кадр {idx}/8 готов: {duration}s")
        
    print("\n2. Склеиваем кадры и накладываем оверлей + официальный звук...")
    concat_list = SCRATCH_DIR / "concat_list.txt"
    with open(concat_list, "w", encoding="utf-8") as f:
        for p in processed_shots:
            f.write(f"file '{p.resolve()}'\n")
            
    total_duration = sum(s[2] for s in shots)
    print(f"Общая длительность динамичного ролика: {total_duration:.1f} сек")
    
    # Final merge with overlay and track
    cmd_final = [
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0", "-i", str(concat_list),
        "-i", str(overlay),
        "-ss", "00:00:00",
        "-i", str(audio),
        "-filter_complex", "[0:v][1:v]overlay=0:0[v]",
        "-map", "[v]",
        "-map", "2:a:0",
        "-c:v", "libx264",
        "-preset", "medium",
        "-profile:v", "high",
        "-level", "4.2",
        "-pix_fmt", "yuv420p",
        "-crf", "16",
        "-b:v", "16M",
        "-maxrate", "20M",
        "-bufsize", "40M",
        "-g", "48",
        "-keyint_min", "48",
        "-x264-params", "scenecut=0:open-gop=0",
        "-c:a", "aac",
        "-b:a", "320k",
        "-t", str(total_duration),
        "-shortest",
        str(output_video)
    ]
    
    res = subprocess.run(cmd_final, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode != 0:
        print("Ошибка финального рендеринга:", res.stderr.decode('utf-8', errors='ignore'))
        return None
        
    print(f"\n🎉 ФИНАЛЬНЫЙ ДИНАМИЧНЫЙ REEL ГОТОВ: {output_video.name} ({output_video.stat().st_size / (1024*1024):.2f} MB)")
    
    # Save preview image
    preview = SCRATCH_DIR / "fast_cuts_preview.jpg"
    subprocess.run(["ffmpeg", "-y", "-ss", "00:00:04", "-i", str(output_video), "-vframes", "1", str(preview)], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return output_video, total_duration

if __name__ == "__main__":
    render_fast_cuts_reel()
