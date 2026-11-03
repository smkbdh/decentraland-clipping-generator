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
RAW_DIR = BASE_DIR / "mw4_multiplayer_raw"
RAW_FILE = RAW_DIR / "TopPlaysFinalists102726_16x9.mp4"
VIDEOS_DIR = BASE_DIR / "ready_videos" / "mw4_multiplayer_videos"
VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
OVERLAYS_DIR = BASE_DIR / "ready_videos" / "v4_overlays"
OVERLAYS_DIR.mkdir(parents=True, exist_ok=True)

# Fonts
IMPACT = "C:/Windows/Fonts/impact.ttf"
ARIBLK = "C:/Windows/Fonts/ariblk.ttf"
ARIAL_BD = "C:/Windows/Fonts/arialbd.ttf"
EMOJI_FONT = "C:/Windows/Fonts/seguiemj.ttf"

# High-Energy Tactical Badges with Emojis
BADGES = [
    "🔥 MW4 MULTIPLAYER • TOP PLAYS 🔥",
    "⚡ MW4 MULTIPLAYER • PRO LOBBY ⚡",
    "💀 MW4 MULTIPLAYER • UNREAL HIGHLIGHTS 💀",
    "👑 MW4 MULTIPLAYER • TOP 1% CLUTCHES 👑",
    "🎯 MW4 MULTIPLAYER • GOD-TIER AIM 🎯",
    "🚨 MW4 MULTIPLAYER • MAXIMUM FPS 🚨"
]

# 25 Master NLP Headlines (Pattern Interrupts, Open Loops, Identity Framing)
NLP_HEADLINES = [
    "THE ENEMY LITERALLY DID NOT SEE THIS COMING",
    "WAIT... HOW IS THIS GUN EVEN LEGAL IN MW4?!",
    "ONLY TOP 1% PLAYERS UNDERSTAND THIS MOVEMENT",
    "BRO UNLOCKED GOD-TIER AIM IN MW4 MULTIPLAYER",
    "WATCH UNTIL 0:08 OR YOU WILL MISS THE SQUAD WIPE",
    "THE CLEANEST 1v4 CLUTCH IN CALL OF DUTY HISTORY",
    "STOP SCROLLING: THIS FLANK BROKE THE ENTIRE LOBBY",
    "THEY ACCUSED HIM OF HACKING AFTER THIS PLAY",
    "THIS NEW WEAPON BUILD HAS ZERO RECOIL",
    "CONTROLLER OR MNK? BE HONEST IN COMMENTS",
    "HOW DID THAT LAST BULLET ACTUALLY HIT?!",
    "THE AUDIO IN THIS CLIP IS SATISFYING AS HELL",
    "HE THOUGHT HE WAS SAFE BEHIND THAT COVER",
    "FASTEST SLIDE CANCEL REACTION TIME IN MW4",
    "100% ACCURACY UNDER HEAVY ARTILLERY FIRE",
    "WAIT FOR HIS TEAMMATE'S REACTION AT THE END",
    "THIS IS WHY EVERYONE IS SWITCHING TO MW4",
    "IS THIS THE MOST TOXIC LOADOUT RIGHT NOW?",
    "BRO JUST DELETED THE ENEMY TEAM IN 3 SECONDS",
    "RATE THIS MOVEMENT FROM 1 TO 10 OR YOU ARE COPPER",
    "THE HITMARKER SOUND DESIGN IS PURE SATISFACTION",
    "PROVEN: THIS ROUTE WINS EVERY SEARCH & DESTROY",
    "FLICK SHOT SO FAST YOU HAVE TO REPLAY IT",
    "NO FILTER: MW4 GRAPHICS ARE OFFICIALLY UNREAL",
    "THAT FINAL HEADSHOT SAVED THE ENTIRE MATCH"
]

# 25 High-Tech Context Lines
SUB_CONTEXTS = [
    "120 FPS Max Settings • Uncut Gunplay",
    "Tactical Sprint & Slide Cancel Breakdown",
    "Clean Weapon Handling & Recoil Control",
    "Competitive Search & Destroy Clutch Round",
    "Fast Paced Hardpoint Defense Showcase",
    "Crisp Weapon Audio & Tactical Reloads",
    "High Velocity Sniper Feed Across Perimeter",
    "Tactical Breach & Close Quarters Combat",
    "Insane Killstreak Deployment Turning Match",
    "Flanking Enemy Squad With Suppressed SMG",
    "Akimbo Secondary Clutch In Search Mode",
    "Micro Recoil Adjustment On Rapid Burst",
    "Point Blank Shotgun Action In Corridors",
    "Precision Corner Clearing & Crosshair Aim",
    "Bullet Impact Physics & Particle Effects",
    "Speed Reload & Aggressive Flank Route",
    "High Refresh Rate 144Hz Gunfight Feed",
    "Clean Iron Sight Tracking At Long Range",
    "Flick Shot Reaction Time At 240Hz Play",
    "Tactical Equipment Breach & Squad Wipe",
    "Zero Recoil M4 Setup Dominating Corridors",
    "Ultra Responsive ADS Speed & Quickdraw",
    "Mastering Vertical Angles In Urban Warfare",
    "Aggressive Push Across Open Chokepoints",
    "Flawless Sound Whore Audio Recognition"
]

# 25 Interactive NLP Retention Hooks with Readable Emojis
RETENTION_HOOKS = [
    "🔥 Rate this clutch 1 to 10? Comment below 👇",
    "💀 Wait for the 3rd kill... Pure skill or aim assist? 🎯",
    "👀 Would you win this 1v4 or rage quit? 💬",
    "🎮 Controller or MnK? Be honest 👇",
    "⚡ Turn SOUND ON for that final hitmarker 🎧",
    "🤯 How did he hit that last shot?! Tell me 👇",
    "👑 Tag a teammate who needs to learn this movement 💨",
    "🔥 What weapon build is this?! Drop your guess 👇",
    "🚨 Don't blink at 0:07... Look at the minimap 🗺️",
    "💀 His reaction in the killcam was insane 😭",
    "💣 1 HP and a dream! Could you pull this off? 👇",
    "🎯 Is MW4 officially the best looking COD? 💬",
    "⚡ Watch until the squad wipe at the end 🔥",
    "👀 Notice the crosshair placement on that corner 🎯",
    "🔥 That weapon recoil control is illegal 💀",
    "👑 Rate this movement: 1/10 or 10/10? 👇",
    "😱 The enemy team definitely reported this 😭",
    "💥 Cleanest flick shot you'll see all day 💨",
    "🎯 Which map has the best gunfights? Comment 👇",
    "🔥 Wait for the double collateral at the end 🤯",
    "💀 He really thought he had the flank 😭",
    "⚡ Rate this reaction time from 1-10 👇",
    "👑 Best sound design in gaming history? 🎧",
    "🚨 Did you catch the enemy behind him at 0:05? 👀",
    "🔥 Tag the friend who always sells the 1v1 👇"
]

def get_clip_metadata(idx):
    badge = BADGES[(idx - 1) % len(BADGES)]
    headline = NLP_HEADLINES[(idx - 1) % len(NLP_HEADLINES)]
    sub_ctx = SUB_CONTEXTS[(idx - 1) % len(SUB_CONTEXTS)]
    retention = RETENTION_HOOKS[(idx - 1) % len(RETENTION_HOOKS)]

    # Dynamic start offset across 470s of raw footage
    span = 470.0
    start_sec = 4.0 + ((idx - 1) * 2.33) % span
    start_str = f"00:{int(start_sec)//60:02d}:{int(start_sec)%60:02d}"
    duration = "11.5"

    slug = re.sub(r'[^a-zA-Z0-9]', '_', headline[:20]).strip('_')
    out_name = f"MW4_MP_v4_Video{idx}_{slug}.mp4"

    caption = (
        f"{headline} 🔥\n"
        f"{sub_ctx} ⚡\n\n"
        f"@callofduty\n"
        f"#Ad\n"
        f"#MW4 #CallOfDuty #Gaming #GamingClips"
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
        # Draw 4px black outline for ultra contrast
        for ox in range(-4, 5):
            for oy in range(-4, 5):
                if ox != 0 or oy != 0:
                    draw.text((lx + ox, ly + oy), line, font=f_head, fill=(0, 0, 0, 255))
        # Pure White High-Contrast Fill
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
    # Neon Accent Bottom Border
    draw.rounded_rectangle([b_box_x1, b_box_y2 - 6, b_box_x2, b_box_y2], radius=3, fill=(255, 230, 0, 255))

    # Bottom Hook: Segoe UI Emoji with auto-scale to NEVER overflow
    f_size = 32
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

    # Outline
    for ox in range(-3, 4):
        for oy in range(-3, 4):
            if ox != 0 or oy != 0:
                draw.text((hx + ox, hy + oy), meta["retention"], font=f_hook, fill=(0, 0, 0, 255))
    # Electric Yellow Fill
    draw.text((hx, hy), meta["retention"], font=f_hook, fill=(255, 230, 0, 255))

    img.save(overlay_path, "PNG")

def render_v4_video(idx):
    meta = get_clip_metadata(idx)
    out_file = VIDEOS_DIR / meta["out_name"]

    if out_file.exists() and out_file.stat().st_size > 1000000:
        return out_file

    overlay_path = OVERLAYS_DIR / f"overlay_v4_{idx}.png"
    generate_overlay_png(meta, overlay_path)

    # FFmpeg video filter:
    # 1. Split raw 16:9 into background blurred + foreground sharp
    # 2. Crop blurred background to 1080x1920
    # 3. Overlay sharp 16:9 centered at (W-w)/2:(H-h)/2
    # 4. Overlay crisp PIL transparent PNG overlay (zero text overflow, perfect font/emojis)
    # 5. Volume boost 1.25x for punchy game audio
    vf = (
        f"[0:v]split=2[bg][fg];"
        f"[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=20:4[blurred];"
        f"[fg]scale=1080:-1[sharp];"
        f"[blurred][sharp]overlay=(W-w)/2:(H-h)/2[base];"
        f"[base][1:v]overlay=0:0[vout];"
        f"[0:a]volume=1.25[aout]"
    )

    cmd = [
        "ffmpeg", "-y",
        "-ss", meta["start_str"],
        "-t", meta["duration"],
        "-i", str(RAW_FILE),
        "-i", str(overlay_path),
        "-filter_complex", vf,
        "-map", "[vout]",
        "-map", "[aout]",
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
        print(f"✅ ВИДЕО #{idx} (v4.0 NLP) ОТСРЕНДЕРЕНО: {size_mb:.2f} МБ (за {time.time()-t0:.1f}с)", flush=True)
        return out_file
    else:
        print(f"❌ ОШИБКА РЕНДЕРА #{idx}: {res.stderr.decode('utf-8', errors='ignore')[-300:]}", flush=True)
        return None

if __name__ == "__main__":
    print("Тестирование генерации ролика v4.0 #1...")
    out = render_v4_video(1)
    print("Результат:", out)
