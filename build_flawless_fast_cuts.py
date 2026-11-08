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
    
    # TOP SLEEK PILL
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
    
    dot_x = pill_x + 36
    dot_y = pill_y + 32
    draw.ellipse([(dot_x, dot_y), (dot_x + 12, dot_y + 12)], fill=(46, 213, 115, 255))
    draw.text((dot_x + 24, pill_y + 25), "LATE NIGHT DRIVE • ON REPEAT", font=font_badge, fill=(180, 215, 255, 240))
    draw.text((pill_x + 36, pill_y + 65), "POV: when this track hits different...", font=font_hook, fill=(255, 255, 255, 255))
    
    # BOTTOM SOUND BADGE
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
    
    tri_x = badge_x + 35
    tri_y = badge_y + 26
    draw.polygon([(tri_x, tri_y), (tri_x, tri_y + 22), (tri_x + 18, tri_y + 11)], fill=(255, 255, 255, 240))
    draw.text((tri_x + 32, badge_y + 20), "Smoke Buddah — Paradise (One Take)", font=font_track, fill=(255, 255, 255, 255))
    
    overlay_path = SCRATCH_DIR / "sleek_fast_cuts_overlay.png"
    overlay.save(overlay_path)
    return overlay_path

def build_perfect_fast_cuts_reel():
    overlay = create_sleek_overlay()
    audio = SCRATCH_DIR / "music_test" / "smoke_buddah_audio.mp4"
    output_video = SCRATCH_DIR / "smoke_buddah_rapid_cuts_flawless.mp4"
    
    # 11 rapid dynamic cuts (1.8s to 2.2s each)
    shots = [
        (FAST_CUTS_DIR / "49.mp4", 1.0, 1.8),       # Headlights close-up
        (FAST_CUTS_DIR / "74.mp4", 1.5, 2.0),       # Red sports car on highway
        (FAST_CUTS_DIR / "63.mp4", 1.0, 1.8),       # Cockpit / steering wheel / speedometer
        (STOCK_DIR / "42037.mp4", 2.0, 2.2),        # Luxury car drift / turn
        (FAST_CUTS_DIR / "40746.mp4", 1.0, 2.0),    # Tokyo neon skyscrapers
        (FAST_CUTS_DIR / "42048.mp4", 0.0, 2.0),    # Highway light trails
        (STOCK_DIR / "40.mp4", 3.0, 2.2),           # POV night bridge drive
        (FAST_CUTS_DIR / "64.mp4", 2.0, 2.2),       # Accelerating into night
        (STOCK_DIR / "42037.mp4", 6.0, 2.0),        # Second angle of luxury car
        (FAST_CUTS_DIR / "40746.mp4", 5.0, 2.0),    # Downtown traffic intersection
        (FAST_CUTS_DIR / "74.mp4", 4.5, 2.4)        # Supercar passing close
    ]
    
    total_duration = sum(s[2] for s in shots)
    print(f"🎬 Рендерим 11-плановый динамичный монтаж ({total_duration:.1f} сек)...")
    
    # Build filtergraph with filter-based concat (ZERO timebase freeze bug!)
    cmd = ["ffmpeg", "-y"]
    filter_parts = []
    concat_inputs = []
    
    for idx, (path, ss, duration) in enumerate(shots):
        cmd.extend(["-ss", str(ss), "-t", str(duration), "-i", str(path)])
        filter_parts.append(
            f"[{idx}:v]scale=-2:1920,crop=1080:1920,unsharp=5:5:1.1:5:5:0.0,eq=contrast=1.12:saturation=1.2,fps=30,setsar=1[v{idx}]"
        )
        concat_inputs.append(f"[v{idx}]")
        
    # Overlay is input #11
    overlay_idx = len(shots)
    cmd.extend(["-i", str(overlay)])
    
    # Audio is input #12
    audio_idx = len(shots) + 1
    cmd.extend(["-ss", "00:00:00", "-t", str(total_duration), "-i", str(audio)])
    
    # Concatenate all normalized shots in filtergraph
    concat_str = "".join(concat_inputs) + f"concat=n={len(shots)}:v=1:a=0[vcat]"
    overlay_str = f"[vcat][{overlay_idx}:v]overlay=0:0[vout]"
    
    full_filter = ";".join(filter_parts) + ";" + concat_str + ";" + overlay_str
    
    cmd.extend([
        "-filter_complex", full_filter,
        "-map", "[vout]",
        "-map", f"{audio_idx}:a:0",
        "-c:v", "libx264",
        "-preset", "medium",
        "-profile:v", "high",
        "-level", "4.2",
        "-pix_fmt", "yuv420p",
        "-crf", "16",
        "-b:v", "16M",
        "-maxrate", "20M",
        "-bufsize", "40M",
        "-g", "60",
        "-keyint_min", "60",
        "-x264-params", "scenecut=0:open-gop=0",
        "-c:a", "aac",
        "-b:a", "320k",
        str(output_video)
    ])
    
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode != 0:
        print("Ошибка FFmpeg:", res.stderr.decode('utf-8', errors='ignore'))
        return None
        
    print(f"🎉 11-ПЛАНОВЫЙ МОНТАЖ УСПЕШНО ОТСРЕНДЕРЕН: {output_video.name} ({output_video.stat().st_size / (1024*1024):.2f} MB)")
    return output_video, total_duration

if __name__ == "__main__":
    build_perfect_fast_cuts_reel()
