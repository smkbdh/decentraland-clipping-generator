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
BATCH3_POOL_DIR = SCRATCH_DIR / "batch3_pool"
AUDIO_FILE = SCRATCH_DIR / "music_test" / "smoke_buddah_audio.mp4"
OUTPUT_DIR = BASE_DIR / "ready_music_videos" / "batch3"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

WIDTH = 1080
HEIGHT = 1920
TARGET_DURATION = 14.5

# Exactly 30 100% Unique, Fresh Clips for Batch 3 (Reels 61-90)
# ZERO overlap with Batch 1 (01-30), Batch 2 (31-60), or prior account history!
UNIQUE_BATCH3_CLIPS = [
    # High-Fashion Editorial Models in White Suit & Red Veil (11 clips)
    BATCH3_POOL_DIR / "52272.mp4",  # 61: Fashion model in white suit & red veil
    BATCH3_POOL_DIR / "52273.mp4",  # 62: Model walking forward in white tailoring
    BATCH3_POOL_DIR / "52274.mp4",  # 63: Model crossing arms red studio backdrop
    BATCH3_POOL_DIR / "52275.mp4",  # 64: Model adjusting red crystal veil
    BATCH3_POOL_DIR / "52277.mp4",  # 65: Fashion dramatic face close-up
    BATCH3_POOL_DIR / "52278.mp4",  # 66: Fashion model in white dress and red boots
    BATCH3_POOL_DIR / "52279.mp4",  # 67: Fashion model in white suit blonde ponytail
    BATCH3_POOL_DIR / "52280.mp4",  # 68: Fashion model white outfit hands on head
    BATCH3_POOL_DIR / "52281.mp4",  # 69: Fashion model close-up red crystals
    BATCH3_POOL_DIR / "52282.mp4",  # 70: Fashion model face portrait red crystals
    BATCH3_POOL_DIR / "52283.mp4",  # 71: Model headshot red crystal embellishment

    # Glamour Studio Dance Models in Black Bodysuit & Sequins (5 clips)
    BATCH3_POOL_DIR / "42456.mp4",  # 72: Model hair flip dynamic studio movement
    BATCH3_POOL_DIR / "42457.mp4",  # 73: Model head roll in black bodysuit
    BATCH3_POOL_DIR / "42458.mp4",  # 74: Glamour duet studio movement
    BATCH3_POOL_DIR / "42459.mp4",  # 75: Glamour model dynamic spin in sequins
    BATCH3_POOL_DIR / "42460.mp4",  # 76: Glamour studio dance silhouette

    # Cyberpunk Asian Model with Microchip Art & Laser Glow (6 clips)
    BATCH3_POOL_DIR / "50443.mp4",  # 77: Cyberpunk model with microchip face art & neon eyes
    BATCH3_POOL_DIR / "50444.mp4",  # 78: Cyberpunk model in UV laser reflection
    BATCH3_POOL_DIR / "50445.mp4",  # 79: Microchip cyber face art close-up
    BATCH3_POOL_DIR / "50446.mp4",  # 80: Cyberpunk model in green jacket & cyan laser rings
    BATCH3_POOL_DIR / "50447.mp4",  # 81: Model in green cyber hoodie neon lights
    BATCH3_POOL_DIR / "50448.mp4",  # 82: Model with eyes closed in atmospheric neon glow

    # Tokyo Night Illuminated Skyscrapers & Speed (3 clips)
    BATCH3_POOL_DIR / "49874.mp4",  # 83: Tokyo illuminated night architectural tower
    BATCH3_POOL_DIR / "49875.mp4",  # 84: Tokyo skyline skyscraper illuminated angle
    BATCH3_POOL_DIR / "49877.mp4",  # 85: Vertical night highway speed cars trail

    # Tokyo Neon Night Avenues & Architecture (1 clip)
    BATCH3_POOL_DIR / "40740.mp4",  # 86: Neon skyscrapers & night traffic drive

    # Smoke Buddah Dark Smoke Void (4 clips)
    BATCH3_POOL_DIR / "1960.mp4",   # 87: Smoke Buddah rolling white smoke cloud
    BATCH3_POOL_DIR / "1964.mp4",   # 88: Smoke Buddah curling smoke whisps black void
    BATCH3_POOL_DIR / "1963.mp4",   # 89: Smoke Buddah symmetrical smoke frame
    BATCH3_POOL_DIR / "1967.mp4"    # 90: Smoke Buddah swirling smoke whisps
]

assert len(UNIQUE_BATCH3_CLIPS) == 30
assert len(set(UNIQUE_BATCH3_CLIPS)) == 30
for p in UNIQUE_BATCH3_CLIPS:
    assert p.exists(), f"Missing required asset: {p}"

HOOKS_BATCH3 = [
    {"hook": "Late night drives feel unreal with this bass", "caption": "The midnight highway therapy you needed. Track: Smoke Buddah — Paradise (One Take)"},
    {"hook": "POV: 4 AM cruising and this song comes on...", "caption": "Empty streets & pure flow. Tap audio to use in your next reel! Smoke Buddah"},
    {"hook": "Nobody can duplicate this kind of flow in 2026", "caption": "Pure lyricism and unmatched delivery. Smoke Buddah - Paradise"},
    {"hook": "This is what aesthetic night drives are made of", "caption": "Neon reflections and heavy 808s. Save this sound!"},
    {"hook": "Your playlist is incomplete without this track", "caption": "Elite hip-hop vibe for late nights. Smoke Buddah — Paradise"},
    {"hook": "When the bass drops right into your soul...", "caption": "Turn the volume all the way up. Smoke Buddah - Paradise (One Take)"},
    {"hook": "Found the ultimate track for midnight contemplation", "caption": "Deep thoughts & cinematic production. Tap audio to save!"},
    {"hook": "Speeding past city lights with zero worries", "caption": "Midnight cruising anthem. Track: Smoke Buddah — Paradise"},
    {"hook": "Tell me this beat doesn't give you goosebumps", "caption": "Chills every single time the beat kicks in. Smoke Buddah"},
    {"hook": "The rhythm that makes the entire world fade away", "caption": "Pure atmospheric escape. Smoke Buddah - Paradise (One Take)"},
    {"hook": "POV: you finally found that one song on repeat", "caption": "Stuck in my head all night long. Save this audio now!"},
    {"hook": "This track was definitely built for high speeds", "caption": "Late night highway acceleration. Smoke Buddah — Paradise"},
    {"hook": "Underground rap at its absolute highest level", "caption": "One take, zero hesitation. Pure energy. Smoke Buddah"},
    {"hook": "Volume at 100, windows rolled all the way down", "caption": "Cold night air & heavy bass. Track: Smoke Buddah — Paradise"},
    {"hook": "The algorithm delivered the exact vibe you wanted", "caption": "Midnight aesthetic perfection. Smoke Buddah - Paradise"},
    {"hook": "Nothing beats driving under neon signs with this", "caption": "Tokyo midnight aesthetic & heavy 808s. Tap sound to save!"},
    {"hook": "When a song sounds even better at 3 AM...", "caption": "Night hours hit completely different. Smoke Buddah — Paradise"},
    {"hook": "That euphoric drop you never knew you needed", "caption": "Clean production & raw vocal flow. Smoke Buddah (One Take)"},
    {"hook": "Put your headphones on and enter another dimension", "caption": "Close your eyes and let the beat take over. Smoke Buddah"},
    {"hook": "The flow is so smooth it feels effortless", "caption": "Masterclass in delivery and timing. Track: Smoke Buddah — Paradise"},
    {"hook": "Cruising alone in the city has never felt so cinematic", "caption": "City skyline & solo drives. Tap audio to listen!"},
    {"hook": "This is the soundtrack to your next midnight drive", "caption": "Save this audio for your late night road trips. Smoke Buddah"},
    {"hook": "When the headlights cut through the dark empty streets", "caption": "Late night freedom & deep beats. Smoke Buddah - Paradise"},
    {"hook": "You will never skip this track once it comes on", "caption": "On repeat for hours. Smoke Buddah — Paradise (One Take)"},
    {"hook": "Bassline heavy enough to shake the entire car", "caption": "Subwoofer test approved. Turn it up! Smoke Buddah"},
    {"hook": "This sound belongs on every night drive playlist", "caption": "Essential midnight driving music. Tap audio to save!"},
    {"hook": "Aesthetic vibes and dark atmospheric soundscapes", "caption": "Visuals and sound in perfect harmony. Smoke Buddah — Paradise"},
    {"hook": "When timing, flow, and delivery align perfectly", "caption": "Raw talent on the microphone. Smoke Buddah (One Take)"},
    {"hook": "The exact feeling of driving into the sunrise", "caption": "From midnight cruising to golden hour. Smoke Buddah"},
    {"hook": "Turn this track all the way up and just drive", "caption": "Escape everything for 15 seconds. Track: Smoke Buddah — Paradise"}
]

font_path = "C:/Windows/Fonts/seguibl.ttf"
font_large = ImageFont.truetype(font_path, 50)
font_sub = ImageFont.truetype(font_path, 26)

def clean_hook(text):
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
    start_y = 210  # Raised into headroom: NEVER obstructs faces, eyes, or expressions!
    
    max_w = max(draw.textbbox((0, 0), l, font=font_large)[2] - draw.textbbox((0, 0), l, font=font_large)[0] for l in lines)
    box_pad_x = 40
    box_pad_y = 25
    box_x0 = (WIDTH - max_w) // 2 - box_pad_x
    box_x1 = (WIDTH + max_w) // 2 + box_pad_x
    box_y0 = start_y - box_pad_y
    box_y1 = start_y + total_h + box_pad_y - 12
    
    draw.rounded_rectangle([box_x0, box_y0, box_x1, box_y1], radius=24, fill=(0, 0, 0, 205))
    
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
    
    badge_text = "AUDIO: SMOKE BUDDAH — PARADISE (ONE TAKE)"
    b_bbox = draw.textbbox((0, 0), badge_text, font=font_sub)
    bw = b_bbox[2] - b_bbox[0]
    bx = (WIDTH - bw) // 2
    by = 1650
    draw.rounded_rectangle([bx - 25, by - 14, bx + bw + 25, by + 40], radius=18, fill=(0, 0, 0, 190))
    draw.text((bx, by), badge_text, font=font_sub, fill=(255, 215, 0, 255))
    
    return img

def render_reel(idx):
    reel_num = idx + 61  # Reels 61 to 90
    out_mp4 = OUTPUT_DIR / f"girls_reel_{reel_num:02d}.mp4"
    if out_mp4.exists() and out_mp4.stat().st_size > 1000000:
        print(f"⏩ Reel {reel_num:02d} already rendered. Skipping.", flush=True)
        return out_mp4
    
    source_clip = UNIQUE_BATCH3_CLIPS[idx]
    hook_data = HOOKS_BATCH3[idx]
    
    overlay_img = create_overlay(idx, hook_data["hook"])
    overlay_png = SCRATCH_DIR / f"overlay_b3_{reel_num:02d}.png"
    overlay_img.save(overlay_png)
    
    print(f"🎬 Rendering Batch 3 Reel {reel_num:02d}/90 using exclusive clip: {source_clip.name}...", flush=True)
    
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

print("🚀 Starting Rendering of Batch 3 (Reels 61-90) with Zero Footage Overlap...", flush=True)

metadata = []
for i in range(30):
    reel_file = render_reel(i)
    meta = {
        "index": i + 61,
        "filename": reel_file.name,
        "filepath": str(reel_file),
        "source_asset": UNIQUE_BATCH3_CLIPS[i].name,
        "hook": HOOKS_BATCH3[i]["hook"],
        "caption": HOOKS_BATCH3[i]["caption"],
        "audio_asset_id": "1181575584539647",
        "audio_title": "Smoke Buddah — Paradise (One Take)"
    }
    metadata.append(meta)

with open(OUTPUT_DIR / "batch3_metadata.json", "w", encoding="utf-8") as f:
    json.dump(metadata, f, indent=2, ensure_ascii=False)

print("\n🎉 ALL 30 REELS FOR BATCH 3 SUCCESSFULLY RENDERED!", flush=True)
print(f"Output directory: {OUTPUT_DIR}")
print(f"Metadata file: {OUTPUT_DIR / 'batch3_metadata.json'}")
