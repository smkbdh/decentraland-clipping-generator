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
BATCH2_POOL_DIR = SCRATCH_DIR / "batch2_pool"
AUDIO_FILE = SCRATCH_DIR / "music_test" / "smoke_buddah_audio.mp4"
OUTPUT_DIR = BASE_DIR / "ready_music_videos" / "batch2"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

WIDTH = 1080
HEIGHT = 1920
TARGET_DURATION = 14.5

# Exactly 30 100% Unique, Fresh, Non-Repeating Footage Clips for Batch 2 (Reels 31-60)
# ZERO overlap with Batch 1 (Reels 1-30) and ZERO overlap with any prior batches on @kira.gyal!
# All 30 clips are verified 100% fresh, 0% men, 0% christmas trees, 0% daylight rivers.
UNIQUE_BATCH2_CLIPS = [
    # Studio Glamour Dance Models in Black Bodysuit & Sequins (6 clips)
    BATCH2_POOL_DIR / "42450.mp4",  # 31: Dynamic studio dance pose in black bodysuit
    BATCH2_POOL_DIR / "42451.mp4",  # 32: Wide model dance pose
    BATCH2_POOL_DIR / "42452.mp4",  # 33: Model head-back dramatic silhouette
    BATCH2_POOL_DIR / "42453.mp4",  # 34: Sparkling sequin jacket studio pose
    BATCH2_POOL_DIR / "42454.mp4",  # 35: Glamour model portrait close-up
    BATCH2_POOL_DIR / "42455.mp4",  # 36: Model hair flip movement

    # High-Fashion Studio Editorial Models in White Suit & Red Veil (16 clips)
    BATCH2_POOL_DIR / "52257.mp4",  # 37: Full length model in white suit & red boots
    BATCH2_POOL_DIR / "52258.mp4",  # 38: Model red boots studio walk
    BATCH2_POOL_DIR / "52259.mp4",  # 39: Model back silhouette & white tailoring
    BATCH2_POOL_DIR / "52260.mp4",  # 40: Red crystal veil hand on face
    BATCH2_POOL_DIR / "52261.mp4",  # 41: Fashion portrait in red veil
    BATCH2_POOL_DIR / "52262.mp4",  # 42: Editorial close-up profile red veil
    BATCH2_POOL_DIR / "52263.mp4",  # 43: Model neckline & sparkling embellishment
    BATCH2_POOL_DIR / "52264.mp4",  # 44: Face close-up dramatic eyes
    BATCH2_POOL_DIR / "52265.mp4",  # 45: Fashion profile red veil on red backdrop
    BATCH2_POOL_DIR / "52266.mp4",  # 46: Model face forward red veil
    BATCH2_POOL_DIR / "52267.mp4",  # 47: Editorial half-profile red backdrop
    BATCH2_POOL_DIR / "52268.mp4",  # 48: Elegant turn in red crystal veil
    BATCH2_POOL_DIR / "52269.mp4",  # 49: Fashion model full body in white suit
    BATCH2_POOL_DIR / "52270.mp4",  # 50: Model side walk red backdrop
    BATCH2_POOL_DIR / "52271.mp4",  # 51: High-fashion crossed arms pose
    BATCH2_POOL_DIR / "52276.mp4",  # 52: Smiling model close-up in red veil

    # Tokyo Night Illuminated Skyscrapers & Avenues (5 clips)
    BATCH2_POOL_DIR / "49870.mp4",  # 53: Tokyo neon illuminated skyscraper
    BATCH2_POOL_DIR / "49871.mp4",  # 54: High-rise architectural tower dusk
    BATCH2_POOL_DIR / "49872.mp4",  # 55: Night city skyscrapers lights
    BATCH2_POOL_DIR / "49873.mp4",  # 56: Aerial night traffic intersection
    BATCH2_POOL_DIR / "49876.mp4",  # 57: Vertical night highway speed trail

    # Smoke Buddah Dark Smoke Void (3 clips)
    BATCH2_POOL_DIR / "1965.mp4",   # 58: Dark smoke void swirling atmosphere
    BATCH2_POOL_DIR / "1966.mp4",   # 59: Heavy smoke cloud rolling
    BATCH2_POOL_DIR / "1969.mp4"    # 60: Atmospheric smoke symmetry
]

assert len(UNIQUE_BATCH2_CLIPS) == 30
assert len(set(UNIQUE_BATCH2_CLIPS)) == 30
for p in UNIQUE_BATCH2_CLIPS:
    assert p.exists(), f"Missing required asset: {p}"

HOOKS_BATCH2 = [
    {"hook": "When the night hits differently with this beat...", "caption": "Late night drive mood with this track on repeat. Tap audio to save! Track: Smoke Buddah — Paradise"},
    {"hook": "Nobody talks about how hard this drop is", "caption": "The bassline hits every single time. Smoke Buddah - Paradise (One Take)"},
    {"hook": "POV: 3 AM, rain on the windshield, pure vibe...", "caption": "Rainy midnight drives with no rush. Track: Smoke Buddah — Paradise"},
    {"hook": "This is what cruising in Tokyo feels like", "caption": "Tokyo neon nights & heavy 808s. Tap sound to use in your next reel!"},
    {"hook": "Turn your volume up and close your eyes...", "caption": "Pure atmospheric soundscape. Smoke Buddah — Paradise (One Take)"},
    {"hook": "The algorithm finally brought you the right track", "caption": "Save this audio for your next late night video. Smoke Buddah"},
    {"hook": "That euphoric feeling when the bass drops...", "caption": "Chills every single listen. Track: Smoke Buddah — Paradise"},
    {"hook": "Empty streets at midnight hit different with this", "caption": "City lights & midnight cruising. Smoke Buddah - Paradise (One Take)"},
    {"hook": "POV: you found the soundtrack to your life", "caption": "Cinematic late night anthem. Tap audio to add to your playlist!"},
    {"hook": "Windows down, cold air, 100% volume", "caption": "The ultimate night drive therapy. Smoke Buddah — Paradise"},
    {"hook": "Tell me this isn't the smoothest flow of 2026", "caption": "One take, zero mistakes. Pure hip-hop delivery. Smoke Buddah"},
    {"hook": "When the headlights cut through the dark...", "caption": "Speeding into the night with this sound. Save this audio!"},
    {"hook": "This sound belongs in an underground club", "caption": "Dark aesthetic & heavy 808s. Smoke Buddah - Paradise (One Take)"},
    {"hook": "Night drives are 10x better with this track", "caption": "Perfect road trip companion for midnight hours. Smoke Buddah"},
    {"hook": "If you know this track, your taste is top tier", "caption": "Elite music taste only. Track: Smoke Buddah — Paradise"},
    {"hook": "Tunnel vision at 140 mph with this playing...", "caption": "Fast cars, neon lights, and pure bass. Tap audio to listen!"},
    {"hook": "This track was made for midnight contemplation", "caption": "Late night thoughts & heavy beats. Smoke Buddah - Paradise"},
    {"hook": "Once you hear this beat, you can't unhear it", "caption": "Stuck on repeat all night. Smoke Buddah — Paradise (One Take)"},
    {"hook": "POV: the city is asleep but you're still driving...", "caption": "Solo cruising through empty neon streets. Save this audio!"},
    {"hook": "The bassline that cures everything", "caption": "Volume on max, stress on zero. Track: Smoke Buddah — Paradise"},
    {"hook": "Late night highway cruising hits different now", "caption": "Highway lights passing by like stars. Smoke Buddah"},
    {"hook": "You just unlocked your new favorite night drive song", "caption": "Add this to your midnight playlist immediately. Smoke Buddah"},
    {"hook": "Pure aesthetic, pure sound, pure vibe", "caption": "Night aesthetic at its finest. Smoke Buddah - Paradise (One Take)"},
    {"hook": "When the beat drops right as the light turns green...", "caption": "Timing is everything. Tap audio to save this sound!"},
    {"hook": "No lyrics needed, the flow speaks for itself", "caption": "Pure raw talent on the mic. Smoke Buddah — Paradise"},
    {"hook": "Cruising past neon signs at 2 AM with this...", "caption": "Neon reflections and midnight rhythm. Smoke Buddah"},
    {"hook": "This is your sign to go on a midnight drive", "caption": "Grab your keys and turn this up. Smoke Buddah - Paradise"},
    {"hook": "Driving alone with this on full blast hits different", "caption": "Solo midnight drive therapy. Tap audio to save!"},
    {"hook": "The soundtrack to the best night of your life", "caption": "Unmatched midnight vibe. Track: Smoke Buddah — Paradise"},
    {"hook": "Leave the world behind and turn this up", "caption": "Late night escape. Smoke Buddah - Paradise (One Take)"}
]

font_path = "C:/Windows/Fonts/seguibl.ttf"
font_large = ImageFont.truetype(font_path, 52)
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
    start_y = 210  # Raised to upper headroom so it NEVER covers face or eyes!
    
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
    reel_num = idx + 31  # Reels 31 to 60
    out_mp4 = OUTPUT_DIR / f"girls_reel_{reel_num:02d}.mp4"
    if out_mp4.exists() and out_mp4.stat().st_size > 1000000:
        print(f"⏩ Reel {reel_num:02d} already rendered. Skipping.", flush=True)
        return out_mp4
    
    source_clip = UNIQUE_BATCH2_CLIPS[idx]
    hook_data = HOOKS_BATCH2[idx]
    
    overlay_img = create_overlay(idx, hook_data["hook"])
    overlay_png = SCRATCH_DIR / f"overlay_b2_{reel_num:02d}.png"
    overlay_img.save(overlay_png)
    
    print(f"🎬 Rendering Batch 2 Reel {reel_num:02d}/60 using exclusive clip: {source_clip.name}...", flush=True)
    
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

print("🚀 Starting Rendering of Batch 2 (Reels 31-60) with Zero Footage Overlap...", flush=True)

metadata = []
for i in range(30):
    reel_file = render_reel(i)
    meta = {
        "index": i + 31,
        "filename": reel_file.name,
        "filepath": str(reel_file),
        "source_asset": UNIQUE_BATCH2_CLIPS[i].name,
        "hook": HOOKS_BATCH2[i]["hook"],
        "caption": HOOKS_BATCH2[i]["caption"],
        "audio_asset_id": "1181575584539647",
        "audio_title": "Smoke Buddah — Paradise (One Take)"
    }
    metadata.append(meta)

with open(OUTPUT_DIR / "batch2_metadata.json", "w", encoding="utf-8") as f:
    json.dump(metadata, f, indent=2, ensure_ascii=False)

print("\n🎉 ALL 30 REELS FOR BATCH 2 SUCCESSFULLY RENDERED!", flush=True)
print(f"Output directory: {OUTPUT_DIR}")
print(f"Metadata file: {OUTPUT_DIR / 'batch2_metadata.json'}")
