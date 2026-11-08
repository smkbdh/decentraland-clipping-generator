import os
import sys
import codecs
import re
import time
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach(), errors="replace")

BASE_DIR = Path(__file__).resolve().parent
SRC_VIDEO = BASE_DIR / "clipping" / "MW4_S1_WARZONE_TRAILER_FULL_COD_Channel_ESRB_16x9_4K_REV01.mp4"
VIDEOS_DIR = BASE_DIR / "ready_videos" / "warzone_s1_videos"
VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
OVERLAYS_DIR = BASE_DIR / "ready_videos" / "warzone_s1_overlays"
OVERLAYS_DIR.mkdir(parents=True, exist_ok=True)

# Fonts
IMPACT = "C:/Windows/Fonts/impact.ttf"
ARIBLK = "C:/Windows/Fonts/ariblk.ttf"
ARIAL_BD = "C:/Windows/Fonts/arialbd.ttf"
EMOJI_FONT = "C:/Windows/Fonts/seguiemj.ttf"

BADGES = [
    "🔥 CALL OF DUTY: WARZONE • SEASON 1 🔥",
    "⚡ WARZONE SEASON 1 • DEPLOY NOW ⚡",
    "💀 NEW WARZONE MAPS: HAJIN & ZODIAC 💀",
    "👑 WARZONE SEASON 1 • TOP ACTION 👑",
    "🎯 SEASON 1 OUT NOW • WARZONE 🎯",
    "🚨 CALL OF DUTY: WARZONE • MAJOR UPDATE 🚨"
]

NLP_HEADLINES = [
    "THE NEW CALL OF DUTY WARZONE LOOKS INSANE",
    "SEASON 1 OUT NOW: TWO BRAND NEW MAPS IN WARZONE",
    "WAIT... WARZONE IN KOREA IS ACTUALLY UNREAL?!",
    "STOP SCROLLING: THIS NEW WARZONE UPDATE IS PEAK",
    "THE GRAPHICS IN WARZONE SEASON 1 ARE NEXT LEVEL",
    "HAJIN AND ZODIAC MAPS HAVE CHANGED WARZONE FOREVER",
    "NEW ZIPLINE LAUNCHER IN WARZONE SEASON 1 IS CRAZY",
    "THE MOVEMENT IN THIS NEW WARZONE UPDATE IS BUTTERY",
    "IS THIS THE BEST CALL OF DUTY UPDATE IN YEARS?",
    "DEPLOY TO HAJIN RIGHT NOW IN WARZONE SEASON 1",
    "NO FILTER: WARZONE SEASON 1 LOOKS LIKE A MOVIE",
    "WARZONE SEASON 1 IS OFFICIALLY LIVE WORLDWIDE",
    "THIS IS WHY EVERY GAMER IS RETURNING TO WARZONE",
    "NEW GRABBER DRONE IN WARZONE SEASON 1 IS DIABOLICAL",
    "THE COMBAT INTEGRATION IN WARZONE IS FLAWLESS",
    "CALL OF DUTY WARZONE JUST DROPPED THE BIGGEST UPDATE",
    "UNREAL ATMOSPHERE IN WARZONE'S NEW KOREA MAP",
    "BEST WEAPON HANDLING WE HAVE EVER SEEN IN WARZONE",
    "EVERY SECOND OF WARZONE SEASON 1 GOES HARD",
    "WARZONE SEASON 1 MARKS A NEW ERA FOR CALL OF DUTY"
]

SUB_CONTEXTS = [
    "Season 1 Out Now • Hajin & Zodiac Maps",
    "Free-To-Play Combat Integration with MW4",
    "New Zipline Launcher & Grabber Drone",
    "Deploy to Hajin • 120 FPS 4K Showcase",
    "New Elite Perks & Tactical Movement",
    "High Velocity Urban Firefights in Korea",
    "Full Modern Warfare 4 Combat Integration",
    "Season 1 Live Now on All Platforms",
    "New Chokepoint Action in Zodiac Map",
    "Uncut Cinematic Trailer Breakdown"
]

RETENTION_HOOKS = [
    "⚡ Would you survive this drop? Comment below 👇",
    "🔥 Rate this Season 1 trailer 1 to 10? 👇",
    "🎮 Which map are you dropping first: Hajin or Zodiac? 🗺️",
    "💀 Tag a teammate who needs to see this update 💨",
    "👑 Is Warzone officially back on top? Tell me 👇",
    "🚀 Have you tried the new Zipline Launcher yet? 👀",
    "💣 1v4 in Hajin: Could you clutch this up? 💬",
    "🔥 Drop your favorite loadout for Season 1 👇",
    "🎯 That drop animation at the end was crazy 🤯",
    "⚡ Season 1 is out now! Who are you squading with? 👇"
]

# Client-required caption templates strictly adhering to FTC and brief guidelines
CAPTION_TEMPLATES = [
    "Season 1 marks a major update to Call of Duty: Warzone as the combat experience becomes fully integrated with Modern Warfare 4! Deploy to Hajin and Zodiac, gear up with the Zipline Launcher and Grabber Drone, and test new Elite Perks.",
    "Call of Duty: Warzone gets two brand new maps Hajin and Zodiac in Season 1! The action in Korea hits different with next-level graphics and smooth movement.",
    "The new Call of Duty: Warzone Season 1 is officially live! Experience the new maps, new gear like the Grabber Drone, and high-stakes squad combat.",
    "Huge update for Call of Duty: Warzone! Season 1 brings full integration, intense urban warfare in Hajin, and elite combat mechanics.",
    "Call of Duty: Warzone Season 1 has arrived. Jump into the new maps Hajin and Zodiac with refreshed movement and tactical weapons."
]

def get_clip_metadata(idx):
    badge = BADGES[(idx - 1) % len(BADGES)]
    headline = NLP_HEADLINES[(idx - 1) % len(NLP_HEADLINES)]
    sub_ctx = SUB_CONTEXTS[(idx - 1) % len(SUB_CONTEXTS)]
    retention = RETENTION_HOOKS[(idx - 1) % len(RETENTION_HOOKS)]
    body_text = CAPTION_TEMPLATES[(idx - 1) % len(CAPTION_TEMPLATES)]

    # 151.67s raw duration; spread 50 clips across 8s to 142s (134s span)
    span = 134.0
    start_sec = 6.0 + ((idx - 1) * 2.68) % span
    start_str = f"00:{int(start_sec)//60:02d}:{int(start_sec)%60:02d}"
    duration = "11.5"

    slug = re.sub(r'[^a-zA-Z0-9]', '_', headline[:20]).strip('_')
    out_name = f"Warzone_S1_Video{idx}_{slug}.mp4"

    # Mandatory caption elements:
    # 1. @callofduty
    # 2. Season 1 out now
    # 3. 🎵 Agust D (Suga from BTS) - “Haegeum”
    # 4. #Ad (on its own line)
    caption = (
        f"{body_text}\n\n"
        f"Season 1 out now\n"
        f"@callofduty\n"
        f"🎵 Agust D (Suga from BTS) - “Haegeum”\n\n"
        f"#Ad\n"
        f"#Warzone #CallOfDuty #Gaming"
    )

    return {
        "index": idx,
        "badge": badge,
        "headline": headline,
        "sub_ctx": sub_ctx,
        "retention": retention,
        "start_str": start_str,
        "duration": duration,
        "out_name": out_name,
        "caption": caption
    }

def generate_overlay_png(meta, overlay_path):
    W, H = 1080, 1920
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Top HUD Container: y = 350 to 625 (Strict Safe Zone)
    box_x1, box_y1, box_x2, box_y2 = 45, 350, 1035, 625
    draw.rounded_rectangle([box_x1, box_y1, box_x2, box_y2], radius=18, fill=(0, 0, 0, 220))
    # Electric Neon Yellow Accent Bar
    draw.rounded_rectangle([box_x1, box_y1, box_x2, box_y1 + 6], radius=3, fill=(255, 230, 0, 255))

    # Top Badge with Emojis
    f_badge = ImageFont.truetype(EMOJI_FONT, 26)
    bbox = draw.textbbox((0, 0), meta["badge"], font=f_badge)
    bw = bbox[2] - bbox[0]
    bx = (W - bw) // 2
    draw.text((bx, box_y1 + 18), meta["badge"], font=f_badge, fill=(255, 230, 0, 255))

    # Headline: Impact Font (Ultra Bold), Word-Wrapped with Safe Margins (max width 910px)
    f_head = ImageFont.truetype(IMPACT, 48)
    words = meta["headline"].split()
    lines = []
    cur = ""
    for w in words:
        test = f"{cur} {w}".strip()
        bb = draw.textbbox((0, 0), test, font=f_head)
        if bb[2] - bb[0] > 910 and cur:
            lines.append(cur)
            cur = w
        else:
            cur = test
    if cur:
        lines.append(cur)

    # Render Headline lines with 4px thick black contrast border
    start_y = box_y1 + 60 if len(lines) == 1 else box_y1 + 52
    line_h = 56
    for i, line in enumerate(lines):
        bb = draw.textbbox((0, 0), line, font=f_head)
        lw = bb[2] - bb[0]
        lx = (W - lw) // 2
        ly = start_y + i * line_h
        for ox in range(-4, 5):
            for oy in range(-4, 5):
                if ox != 0 or oy != 0:
                    draw.text((lx + ox, ly + oy), line, font=f_head, fill=(0, 0, 0, 255))
        draw.text((lx, ly), line, font=f_head, fill=(255, 255, 255, 255))

    # Sub Context: Crisp Silver #DCDCDC
    f_sub = ImageFont.truetype(ARIAL_BD, 28)
    bb = draw.textbbox((0, 0), meta["sub_ctx"], font=f_sub)
    sw = bb[2] - bb[0]
    sx = (W - sw) // 2
    sy = box_y2 - 46
    draw.text((sx, sy), meta["sub_ctx"], font=f_sub, fill=(220, 220, 220, 255))

    # 2. Bottom NLP Retention Box: y = 1320 to 1420
    b_box_x1, b_box_y1, b_box_x2, b_box_y2 = 70, 1320, 1010, 1420
    draw.rounded_rectangle([b_box_x1, b_box_y1, b_box_x2, b_box_y2], radius=18, fill=(0, 0, 0, 225))
    draw.rounded_rectangle([b_box_x1, b_box_y2 - 6, b_box_x2, b_box_y2], radius=3, fill=(255, 230, 0, 255))

    # Bottom Hook: Segoe UI Emoji with auto-scale to NEVER overflow
    f_size = 30
    f_hook = ImageFont.truetype(EMOJI_FONT, f_size)
    bb = draw.textbbox((0, 0), meta["retention"], font=f_hook)
    hw = bb[2] - bb[0]
    while hw > 890 and f_size > 22:
        f_size -= 2
        f_hook = ImageFont.truetype(EMOJI_FONT, f_size)
        bb = draw.textbbox((0, 0), meta["retention"], font=f_hook)
        hw = bb[2] - bb[0]

    hx = (W - hw) // 2
    hy = b_box_y1 + (b_box_y2 - b_box_y1 - (bb[3] - bb[1])) // 2

    for ox in range(-3, 4):
        for oy in range(-3, 4):
            if ox != 0 or oy != 0:
                draw.text((hx + ox, hy + oy), meta["retention"], font=f_hook, fill=(0, 0, 0, 255))
    draw.text((hx, hy), meta["retention"], font=f_hook, fill=(255, 230, 0, 255))

    img.save(overlay_path, "PNG")

def render_warzone_video(idx):
    meta = get_clip_metadata(idx)
    out_file = VIDEOS_DIR / meta["out_name"]

    if out_file.exists() and out_file.stat().st_size > 1000000:
        return out_file

    overlay_path = OVERLAYS_DIR / f"overlay_warzone_{idx}.png"
    generate_overlay_png(meta, overlay_path)

    # 4K source -> 1080x1920 9:16 vertical crop + blurred background
    vf = (
        f"[0:v]split=2[bg][fg];"
        f"[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=20:4[blurred];"
        f"[fg]scale=1080:-1[sharp];"
        f"[blurred][sharp]overlay=(W-w)/2:(H-h)/2[base];"
        f"[base][1:v]overlay=0:0[vout]"
    )

    cmd = [
        "ffmpeg", "-y",
        "-ss", meta["start_str"],
        "-t", meta["duration"],
        "-i", str(SRC_VIDEO),
        "-i", str(overlay_path),
        "-filter_complex", vf,
        "-map", "[vout]",
        "-map", "0:a?",
        "-c:v", "libx264",
        "-preset", "ultrafast",
        "-crf", "23",
        "-c:a", "aac",
        "-b:a", "192k",
        "-ar", "44100",
        "-movflags", "+faststart",
        str(out_file)
    ]

    t0 = time.time()
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode == 0 and out_file.exists():
        size_mb = out_file.stat().st_size / (1024 * 1024)
        print(f"✅ ВИДЕО #{idx} (Warzone S1) ОТСРЕНДЕРЕНО: {size_mb:.2f} МБ (за {time.time()-t0:.1f}с)", flush=True)
        return out_file
    else:
        print(f"❌ ОШИБКА РЕНДЕРА #{idx}: {res.stderr.decode('utf-8', errors='ignore')[-300:]}", flush=True)
        return None

if __name__ == "__main__":
    print("Тестирование генерации ролика Warzone S1 #1...")
    out = render_warzone_video(1)
    print("Результат:", out)
