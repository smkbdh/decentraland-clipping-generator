import sys
import io
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
if sys.stderr.encoding.lower() != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8')

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
SCRATCH_DIR = BASE_DIR / "scratch"
FAST_CUTS_DIR = SCRATCH_DIR / "fast_cuts"
NATIVE_DIR = SCRATCH_DIR / "native_vertical_pool"
GIRLS_DIR = SCRATCH_DIR / "girls_vertical_pool"
AUDIO_FILE = SCRATCH_DIR / "music_test" / "smoke_buddah_audio.mp4"
OVERLAY_IMG = SCRATCH_DIR / "girls_overlay.png"
OUTPUT_VIDEO = SCRATCH_DIR / "smoke_buddah_girls_aesthetic_master.mp4"

WIDTH = 1080
HEIGHT = 1920

def create_overlay():
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Soft bottom dark vignette for crystal clear text readability
    for y in range(450):
        alpha = int(190 * (y / 450.0))
        draw.line([(0, HEIGHT - 450 + y), (WIDTH, HEIGHT - 450 + y)], fill=(0, 0, 0, alpha))
        
    font_bold = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 40)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 26)
    
    # Minimalist Clean Hook (Lower-third)
    hook = "POV: 2 AM, city lights, feeling this vibe..."
    bbox1 = draw.textbbox((0, 0), hook, font=font_bold)
    w1 = bbox1[2] - bbox1[0]
    x1 = (WIDTH - w1) // 2
    y1 = HEIGHT - 330
    
    for ox, oy in [(-2, -2), (2, -2), (-2, 2), (2, 2), (0, 3)]:
        draw.text((x1 + ox, y1 + oy), hook, font=font_bold, fill=(0, 0, 0, 230))
    draw.text((x1, y1), hook, font=font_bold, fill=(255, 255, 255, 255))
    
    # Sound Tag Pill (frosted glass)
    sound_text = "Smoke Buddah — Paradise (One Take)"
    bbox_s = draw.textbbox((0, 0), sound_text, font=font_badge)
    sw = bbox_s[2] - bbox_s[0]
    
    pill_w = sw + 80
    pill_h = 56
    pill_x = (WIDTH - pill_w) // 2
    pill_y = HEIGHT - 230
    
    draw.rounded_rectangle(
        [(pill_x, pill_y), (pill_x + pill_w, pill_y + pill_h)],
        radius=28,
        fill=(10, 10, 15, 180),
        outline=(255, 255, 255, 80),
        width=1
    )
    # White play triangle
    draw.polygon([(pill_x + 30, pill_y + 19), (pill_x + 30, pill_y + 37), (pill_x + 44, pill_y + 28)], fill=(255, 255, 255, 240))
    draw.text((pill_x + 54, pill_y + 12), sound_text, font=font_badge, fill=(245, 245, 245, 245))
    
    img.save(OVERLAY_IMG, "PNG")
    print(f"Overlay created at {OVERLAY_IMG}")

def render_master_reel():
    create_overlay()
    
    # 9 Strictly 1080x1920 Fullscreen Native Shots (Aesthetic Girls + Sports Cars + Night City)
    # BPM = 142.9 -> 1 bar = 1.68s, 2 bars = 3.36s
    shots = [
        (FAST_CUTS_DIR / "49878.mp4", 1.0, 3.36),   # 1. Tokyo night skyline panorama
        (NATIVE_DIR / "1231.mp4", 1.5, 1.68),      # 2. Tattooed brunette girl by red neon sign
        (GIRLS_DIR / "44558.mp4", 1.0, 1.68),      # 3. Blonde model close-up sunglasses & red lipstick
        (GIRLS_DIR / "44551.mp4", 1.0, 1.68),      # 4. Girl reflection in car rearview mirror neon
        (FAST_CUTS_DIR / "40747.mp4", 2.0, 1.68),  # 5. Red sports car cruising down neon avenue (THE DROP)
        (GIRLS_DIR / "44555.mp4", 1.5, 1.68),      # 6. Girl sitting on sports car hood vibing in rhythm
        (FAST_CUTS_DIR / "42048.mp4", 2.0, 1.68),  # 7. Aerial highway interchange drone loop
        (GIRLS_DIR / "44552.mp4", 1.5, 1.68),      # 8. Girl inside luxury sports car cockpit in neon
        (NATIVE_DIR / "44678.mp4", 2.0, 3.36),     # 9. Dreamy red/gold bokeh outro
    ]
    
    total_dur = sum(s[2] for s in shots)
    print(f"Rendering pure vertical master reel: {total_dur:.2f}s across {len(shots)} shots...")
    
    cmd = ["ffmpeg", "-y"]
    filter_parts = []
    concat_inputs = []
    
    for idx, (path, ss, dur) in enumerate(shots):
        cmd.extend(["-ss", f"{ss:.2f}", "-t", f"{dur:.2f}", "-i", str(path)])
        filter_parts.append(
            f"[{idx}:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,unsharp=5:5:1.0:5:5:0.0,eq=contrast=1.12:saturation=1.18,fps=30,setsar=1[v{idx}]"
        )
        concat_inputs.append(f"[v{idx}]")
        
    overlay_idx = len(shots)
    cmd.extend(["-i", str(OVERLAY_IMG)])
    
    audio_idx = len(shots) + 1
    cmd.extend(["-ss", "0.0", "-t", f"{total_dur:.2f}", "-i", str(AUDIO_FILE)])
    
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
        "-b:v", "18M",
        "-maxrate", "22M",
        "-bufsize", "45M",
        "-g", "60",
        "-keyint_min", "60",
        "-x264-params", "scenecut=0:open-gop=0",
        "-c:a", "aac",
        "-b:a", "320k",
        str(OUTPUT_VIDEO)
    ])
    
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode != 0:
        print("FFmpeg error:", res.stderr.decode('utf-8', errors='ignore'))
        return False
        
    print(f"SUCCESS: Girls Aesthetic Master Reel created at {OUTPUT_VIDEO} ({OUTPUT_VIDEO.stat().st_size / (1024*1024):.2f} MB)")
    return True

if __name__ == "__main__":
    render_master_reel()
