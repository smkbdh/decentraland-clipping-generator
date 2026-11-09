import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import re
import json
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
SCRATCH_DIR = BASE_DIR / "scratch"
MASTER_POOL_DIR = SCRATCH_DIR / "master_unique_120"
AUDIO_FILE = SCRATCH_DIR / "music_test" / "smoke_buddah_audio.mp4"
OUTPUT_DIR = BASE_DIR / "ready_music_videos"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

WIDTH = 1080
HEIGHT = 1920
TARGET_DURATION = 14.5  # Optimal high-loop Reel duration

# Exactly 30 100% Unique, Non-Repeating Footage Clips
# ZERO footage overlap across the entire campaign!
UNIQUE_30_CLIPS = [
    MASTER_POOL_DIR / "50428.mp4",  # 01: Model seated in cyan laser ring
    MASTER_POOL_DIR / "44550.mp4",  # 02: Blonde model with sports car
    MASTER_POOL_DIR / "1229.mp4",   # 03: Tattooed brunette in neon window
    MASTER_POOL_DIR / "1968.mp4",   # 04: Smoke Buddah mystical smoke plumes
    MASTER_POOL_DIR / "40747.mp4",  # 05: Red sports car night cruise
    MASTER_POOL_DIR / "50433.mp4",  # 06: Sensual dancer backbend cyan laser
    MASTER_POOL_DIR / "44555.mp4",  # 07: Blonde model sitting on hood
    MASTER_POOL_DIR / "1230.mp4",   # 08: Tattooed brunette close-up red neon
    MASTER_POOL_DIR / "1300.mp4",   # 09: Urban girl green neon portrait
    MASTER_POOL_DIR / "49878.mp4",  # 10: Tokyo night skyline panorama
    MASTER_POOL_DIR / "50434.mp4",  # 11: Cyber laser line face close-up
    MASTER_POOL_DIR / "44558.mp4",  # 12: Blonde model sunglasses red lipstick
    MASTER_POOL_DIR / "1231.mp4",   # 13: Brunette by red neon sign
    MASTER_POOL_DIR / "44691.mp4",  # 14: Highway speed tail lights mist
    MASTER_POOL_DIR / "1299.mp4",   # 15: Model black lingerie leather couch
    MASTER_POOL_DIR / "50432.mp4",  # 16: Model in blue laser portal
    MASTER_POOL_DIR / "44552.mp4",  # 17: Sports car cockpit neon
    MASTER_POOL_DIR / "1234.mp4",   # 18: Tattooed brunette on stool
    MASTER_POOL_DIR / "1302.mp4",   # 19: Urban girl dark glass corridor
    MASTER_POOL_DIR / "42048.mp4",  # 20: Aerial highway interchange loop
    MASTER_POOL_DIR / "50429.mp4",  # 21: Dancer green laser column
    MASTER_POOL_DIR / "44556.mp4",  # 22: Blonde walking past sports car
    MASTER_POOL_DIR / "1232.mp4",   # 23: Red neon atmosphere glow
    MASTER_POOL_DIR / "51406.mp4",  # 24: Girl listening headphones night
    MASTER_POOL_DIR / "40746.mp4",  # 25: Tokyo neon skyscrapers
    MASTER_POOL_DIR / "50435.mp4",  # 26: Dancer purple UV laser glow
    MASTER_POOL_DIR / "44559.mp4",  # 27: Blonde model driver seat sunglasses
    MASTER_POOL_DIR / "1227.mp4",   # 28: Brunette night amusement park
    MASTER_POOL_DIR / "50436.mp4",  # 29: Full body dancer cyan laser stream
    MASTER_POOL_DIR / "44560.mp4"   # 30: Blonde model standing by car neon tube
]

# Assert all 30 clips exist and are 100% unique
assert len(UNIQUE_30_CLIPS) == 30, "Must have exactly 30 clips"
assert len(set(UNIQUE_30_CLIPS)) == 30, "CRITICAL: Duplicate clips detected in exhaustion pool!"
for p in UNIQUE_30_CLIPS:
    assert p.exists(), f"Missing required asset: {p}"

HOOKS_30 = [
    {"hook": "POV: 2 AM, city lights, feeling this vibe...", "caption": "POV: 2 AM drive with this track on repeat. Tap audio to save! Track: Smoke Buddah — Paradise"},
    {"hook": "Headphones on, world completely muted", "caption": "Put your headphones on and feel this beat. Smoke Buddah - Paradise (One Take)"},
    {"hook": "Driving through the city with no destination...", "caption": "Night drives with no destination in mind. Track: Smoke Buddah — Paradise"},
    {"hook": "This sound was made for empty highways", "caption": "Empty roads & the right bassline. Tap sound to add to your night playlist"},
    {"hook": "Underrated track that feels like a movie", "caption": "Sounds like straight out of a cinematic movie soundtrack. Smoke Buddah"},
    {"hook": "Tell me you don't feel chills when this drops...", "caption": "Late night drive therapy. Track: Smoke Buddah — Paradise (One Take)"},
    {"hook": "When the bass hits at 120 mph...", "caption": "Speeding through city lights to this sound. Tap audio to use!"},
    {"hook": "Night drives heal what words never could", "caption": "Therapy on wheels. Smoke Buddah - Paradise (One Take)"},
    {"hook": "POV: city lights in the rearview mirror...", "caption": "City skyline & this song playing on repeat."},
    {"hook": "Put this on your late night drive playlist", "caption": "Must-have track for midnight cruising. Smoke Buddah"},
    {"hook": "That one track you never skip...", "caption": "Never skipping this one. Smoke Buddah - Paradise (One Take)"},
    {"hook": "Lost in the city lights with this playing...", "caption": "Neon reflections and heavy 808s. Save this audio!"},
    {"hook": "Just me, the road, and this song...", "caption": "Solo midnight drive vibes. Track: Smoke Buddah — Paradise"},
    {"hook": "When music matches the exact vibe of the road...", "caption": "Perfect soundtrack for late hours. Smoke Buddah"},
    {"hook": "Close your eyes and listen to this flow...", "caption": "Flow is unmatched. Paradise (One Take) by Smoke Buddah"},
    {"hook": "Windows down, cold breeze, this track...", "caption": "Cold night breeze & pure music. Tap audio to listen!"},
    {"hook": "The streets are empty for a reason", "caption": "Empty streets & high volume. Smoke Buddah - Paradise"},
    {"hook": "This needs to be in a cyberpunk movie", "caption": "Cyberpunk night drive aesthetic. Save this audio!"},
    {"hook": "You just found your new favorite sound", "caption": "Your new late night obsession. Smoke Buddah — Paradise"},
    {"hook": "Entering the tunnel right as the beat drops...", "caption": "Tunnel run with this sound. Smoke Buddah - Paradise"},
    {"hook": "Cruising through the city at midnight...", "caption": "Midnight run through neon streets. Tap audio to listen!"},
    {"hook": "Can't stop replaying this one take...", "caption": "Pure lyricism and delivery. Smoke Buddah — Paradise"},
    {"hook": "Driving home after 3 AM with this on...", "caption": "3 AM thoughts and heavy bassline. Paradise (One Take)"},
    {"hook": "Wet asphalt, neon reflections, and this sound...", "caption": "Rainy city nights & chill beats. Smoke Buddah"},
    {"hook": "Clearing my mind with the volume on 100", "caption": "Max volume therapy. Smoke Buddah — Paradise (One Take)"},
    {"hook": "When the roads are yours and the music hits...", "caption": "The feeling of an open road. Smoke Buddah"},
    {"hook": "POV: finding that one song that gives you chills...", "caption": "Instant chills when the flow starts. Tap audio to save!"},
    {"hook": "Nothing beats night highway drives with this...", "caption": "Highway speed and pure music. Smoke Buddah"},
    {"hook": "Put this sound on and thank me later", "caption": "Trust me and turn this up. Smoke Buddah — Paradise"},
    {"hook": "Soundtrack to 3 AM drives alone in the city...", "caption": "Late night solo cruise anthem. Smoke Buddah - Paradise"}
]

font_path = "C:/Windows/Fonts/seguibl.ttf"
font_large = ImageFont.truetype(font_path, 52)
font_sub = ImageFont.truetype(font_path, 26)

def clean_hook(text):
    # Strictly strip emojis and non-standard symbols that cause tofu box glyphs
    cleaned = re.sub(r'[^\x00-\x7F\u0400-\u04FF\s\.,!\?:;\'\"—–-]', '', text)
    return re.sub(r'\s+', ' ', cleaned).strip()

def create_overlay(idx, hook_text):
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    clean_text = clean_hook(hook_text).upper()
    words = clean_text.split()
    lines = []
    curr = []
    for w in words:
        curr.append(w)
        line = " ".join(curr)
        bbox = draw.textbbox((0, 0), line, font=font_large)
        if (bbox[2] - bbox[0]) > 900:
            curr.pop()
            lines.append(" ".join(curr))
            curr = [w]
    if curr:
        lines.append(" ".join(curr))
    
    line_h = 70
    total_h = len(lines) * line_h
    start_y = 520
    
    # Draw dark rounded pill background
    max_w = max(draw.textbbox((0, 0), l, font=font_large)[2] - draw.textbbox((0, 0), l, font=font_large)[0] for l in lines)
    box_pad_x = 40
    box_pad_y = 30
    box_x0 = (WIDTH - max_w) // 2 - box_pad_x
    box_x1 = (WIDTH + max_w) // 2 + box_pad_x
    box_y0 = start_y - box_pad_y
    box_y1 = start_y + total_h + box_pad_y - 15
    
    draw.rounded_rectangle([box_x0, box_y0, box_x1, box_y1], radius=24, fill=(0, 0, 0, 205))
    
    # Draw dense text with black outline and pure white fill
    for i, line in enumerate(lines):
        bbox = draw.textbbox((0, 0), line, font=font_large)
        w = bbox[2] - bbox[0]
        x = (WIDTH - w) // 2
        y = start_y + i * line_h
        for dx in [-2, -1, 0, 1, 2]:
            for dy in [-2, -1, 0, 1, 2]:
                if dx != 0 or dy != 0:
                    draw.text((x + dx, y + dy), line, font=font_large, fill=(0, 0, 0, 255))
        draw.text((x, y), line, font=font_large, fill=(255, 255, 255, 255))
    
    # Bottom audio badge (zero emojis to prevent tofu boxes!)
    badge_text = "AUDIO: SMOKE BUDDAH — PARADISE (ONE TAKE)"
    b_bbox = draw.textbbox((0, 0), badge_text, font=font_sub)
    bw = b_bbox[2] - b_bbox[0]
    bx = (WIDTH - bw) // 2
    by = 1650
    draw.rounded_rectangle([bx - 25, by - 14, bx + bw + 25, by + 40], radius=18, fill=(0, 0, 0, 190))
    draw.text((bx, by), badge_text, font=font_sub, fill=(255, 215, 0, 255))
    
    return img

def render_reel(idx):
    reel_num = idx + 1
    out_mp4 = OUTPUT_DIR / f"girls_reel_{reel_num:02d}.mp4"
    if out_mp4.exists() and out_mp4.stat().st_size > 1000000:
        print(f"⏩ Reel {reel_num:02d} already rendered. Skipping.", flush=True)
        return out_mp4
    
    source_clip = UNIQUE_30_CLIPS[idx]
    hook_data = HOOKS_30[idx]
    
    # Generate overlay
    overlay_img = create_overlay(idx, hook_data["hook"])
    overlay_png = SCRATCH_DIR / f"overlay_{reel_num:02d}.png"
    overlay_img.save(overlay_png)
    
    print(f"🎬 Rendering Reel {reel_num:02d}/30 using exclusive clip: {source_clip.name}...", flush=True)
    
    # FFmpeg command: loop source clip seamlessly if needed to reach TARGET_DURATION,
    # crop/scale to 1080:1920, overlay text, and mux Smoke Buddah audio
    cmd = [
        "ffmpeg", "-y",
        "-stream_loop", "-1",
        "-ss", "00:00:00.5",
        "-t", str(TARGET_DURATION),
        "-i", str(source_clip),
        "-i", str(AUDIO_FILE),
        "-i", str(overlay_png),
        "-filter_complex",
        "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920[bg];"
        "[bg][2:v]overlay=0:0[v]",
        "-map", "[v]",
        "-map", "1:a:0",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "20",
        "-c:a", "aac", "-b:a", "192k",
        "-t", str(TARGET_DURATION),
        str(out_mp4)
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    overlay_png.unlink(missing_ok=True)
    print(f"✅ Reel {reel_num:02d} rendered: {out_mp4.name} ({out_mp4.stat().st_size/(1024*1024):.1f}MB)", flush=True)
    return out_mp4

print("🚀 Starting Rendering of All 30 Completely Unique Reels with Zero Footage Overlap...", flush=True)

metadata = []
for i in range(30):
    reel_file = render_reel(i)
    meta = {
        "index": i + 1,
        "filename": reel_file.name,
        "filepath": str(reel_file),
        "source_asset": UNIQUE_30_CLIPS[i].name,
        "hook": HOOKS_30[i]["hook"],
        "caption": HOOKS_30[i]["caption"],
        "audio_asset_id": "1181575584539647",
        "audio_title": "Smoke Buddah — Paradise (One Take)"
    }
    metadata.append(meta)

with open(OUTPUT_DIR / "batch_30_metadata.json", "w", encoding="utf-8") as f:
    json.dump(metadata, f, indent=2, ensure_ascii=False)

print("\n🎉 ALL 30 REELS SUCCESSFULLY RENDERED!", flush=True)
print(f"Output directory: {OUTPUT_DIR}")
print(f"Metadata file: {OUTPUT_DIR / 'batch_30_metadata.json'}")
