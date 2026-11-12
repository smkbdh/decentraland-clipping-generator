import os, sys, json, re, subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
TRAILER_PATH = BASE_DIR / "clipping" / "warzone_s1_trailer.mp4.webm"
OUTPUT_DIR = BASE_DIR / "ready_videos" / "warzone_tiktok_batch"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# 10 viral clip configurations
CLIPS = [
    {
        "id": "clip_01_vehicle_action",
        "title": "Warzone Season 1 Vehicle Action",
        "start": "01:03",
        "end": "01:14",
        "hook": "Warzone Season 1 vehicle action\nlooks like a movie 🤯🔥",
        "caption": "Season 1 marks a major update to Call of Duty: Warzone! The vehicle combat in Hajin hits different 🔥 @callofduty\nSeason 1 out now\n🎵 Agust D (Suga from BTS) - “Haegeum”\n\n#Ad #Warzone #CallOfDuty #MW4"
    },
    {
        "id": "clip_02_sniper_helipad",
        "title": "Warzone Season 1 Sniper Scenes",
        "start": "01:30",
        "end": "01:41",
        "hook": "Warzone Season 1 sniper scenes\nlook incredible 🔥",
        "caption": "The new sniper combat and rooftop action in Warzone Season 1 is crazy 🎯 @callofduty\nSeason 1 out now\n🎵 Agust D (Suga from BTS) - “Haegeum”\n\n#Ad #Warzone #CallOfDuty #WarzoneSniper"
    },
    {
        "id": "clip_03_dual_wield_lasers",
        "title": "Warzone Season 1 Dual Wield Action",
        "start": "01:46",
        "end": "01:57",
        "hook": "Warzone Season 1 dual-wield\naction looks incredible ☠️🔥",
        "caption": "Akimbo dual-wield with green lasers is back in Warzone Season 1 ☠️🔥 Deploy to Zodiac now! @callofduty\nSeason 1 out now\n🎵 Agust D (Suga from BTS) - “Haegeum”\n\n#Ad #Warzone #CallOfDuty #CODWarzone"
    },
    {
        "id": "clip_04_balcony_overlook",
        "title": "Warzone Season 1 Trailer Graphics",
        "start": "01:38",
        "end": "01:47",
        "hook": "This Warzone Season 1 trailer\nlooks so good 🤯",
        "caption": "Deploying to the highest towers in Warzone Season 1! The graphics upgrade is insane @callofduty\nSeason 1 out now\n🎵 Agust D (Suga from BTS) - “Haegeum”\n\n#Ad #Warzone #CallOfDuty #Gamer"
    },
    {
        "id": "clip_05_rooftop_chopper_blast",
        "title": "Warzone Season 1 Action Movie Vibes",
        "start": "01:54",
        "end": "02:05",
        "hook": "Warzone Season 1 trailer is giving\naction movie vibes 🤯🔥",
        "caption": "Straight out of an action blockbuster movie 🎬 Warzone Season 1 is officially live! @callofduty\nSeason 1 out now\n🎵 Agust D (Suga from BTS) - “Haegeum”\n\n#Ad #Warzone #CallOfDuty #Action"
    },
    {
        "id": "clip_06_skydive_airdrop",
        "title": "Warzone Season 1 Skydive Entrance",
        "start": "00:32",
        "end": "00:44",
        "hook": "Warzone Season 1 skydive entrance\nis pure cinema 🪂🔥",
        "caption": "Dropping into the brand new map Hajin! Where are we landing boys? @callofduty\nSeason 1 out now\n🎵 Agust D (Suga from BTS) - “Haegeum”\n\n#Ad #Warzone #CallOfDuty #WarzoneLoadout"
    },
    {
        "id": "clip_07_night_stealth_raid",
        "title": "Warzone Season 1 Night Stealth Raid",
        "start": "01:10",
        "end": "01:21",
        "hook": "Warzone Season 1 night stealth raid\nlooks intense ⚡️🔥",
        "caption": "The night atmosphere in Season 1 is next level! Deploy to Hajin conflict today @callofduty\nSeason 1 out now\n🎵 Agust D (Suga from BTS) - “Haegeum”\n\n#Ad #Warzone #CallOfDuty #Gaming"
    },
    {
        "id": "clip_08_thermal_cqb",
        "title": "Warzone Season 1 CQB Combat",
        "start": "01:19",
        "end": "01:28",
        "hook": "Warzone Season 1 CQB combat\nis so satisfying 🎯🔥",
        "caption": "Close quarters combat in Season 1 hits different! Tag your duo @callofduty\nSeason 1 out now\n🎵 Agust D (Suga from BTS) - “Haegeum”\n\n#Ad #Warzone #CallOfDuty #ModernWarfare"
    },
    {
        "id": "clip_09_train_city_breach",
        "title": "Warzone Season 1 New Map Reveal",
        "start": "00:13",
        "end": "00:25",
        "hook": "New Warzone Season 1 map\nlooks unreal 🏙️🔥",
        "caption": "New maps Hajin and Zodiac bring brand new combat dynamics to Warzone! @callofduty\nSeason 1 out now\n🎵 Agust D (Suga from BTS) - “Haegeum”\n\n#Ad #Warzone #CallOfDuty #WarzoneClips"
    },
    {
        "id": "clip_10_monorail_gadgets",
        "title": "Warzone Season 1 New Gadgets",
        "start": "02:04",
        "end": "02:15",
        "hook": "Warzone Season 1 new gadgets\nare actually insane 🤯🔥",
        "caption": "Zipline Launchers and Grabber Drones change the game in Season 1! @callofduty\nSeason 1 out now\n🎵 Agust D (Suga from BTS) - “Haegeum”\n\n#Ad #Warzone #CallOfDuty #WarzoneMoments"
    }
]

def render_hook_banner(text, width=1080, font_size=48, line_spacing=14):
    text_font = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", font_size)
    emoji_font = ImageFont.truetype(r"C:\Windows\Fonts\seguiemj.ttf", font_size)
    lines = text.strip().split('\n')
    emoji_pattern = re.compile(
        r'([\U00010000-\U0010ffff\u2600-\u27bf\u2300-\u23ff\u2b50\u200d\ufe0f]+)'
    )
    line_metrics = []
    total_height = 0
    for line in lines:
        parts = emoji_pattern.split(line)
        parts = [p for p in parts if p]
        line_parts = []
        line_w = 0
        line_h = 0
        for part in parts:
            is_emoji = bool(emoji_pattern.match(part))
            f = emoji_font if is_emoji else text_font
            bbox = f.getbbox(part)
            pw = bbox[2] - bbox[0]
            ph = bbox[3] - bbox[1]
            line_parts.append((part, is_emoji, pw, ph, f))
            line_w += pw
            line_h = max(line_h, ph)
        line_metrics.append((line_w, line_h, line_parts))
        total_height += line_h + line_spacing
    total_height -= line_spacing

    banner_img = Image.new("RGBA", (width, total_height + 40), (0, 0, 0, 0))
    draw = ImageDraw.Draw(banner_img)
    cur_y = 20
    for line_w, line_h, line_parts in line_metrics:
        cur_x = (width - line_w) // 2
        for part, is_emoji, pw, ph, f in line_parts:
            if is_emoji:
                draw.text((cur_x, cur_y), part, font=f, embedded_color=True)
            else:
                draw.text((cur_x, cur_y), part, font=f, fill=(255, 255, 255, 255))
            cur_x += pw
        cur_y += line_h + line_spacing
    return banner_img

def main():
    print("🚀 Starting Warzone TikTok Batch Generator (10 Clips)...")
    banner_dir = BASE_DIR / "scratch" / "banners"
    banner_dir.mkdir(parents=True, exist_ok=True)

    rendered_files = []
    for idx, c in enumerate(CLIPS, 1):
        print(f"\n--- [{idx}/{len(CLIPS)}] Rendering {c['id']} ---")
        banner_path = banner_dir / f"{c['id']}_banner.png"
        banner = render_hook_banner(c['hook'])
        banner.save(banner_path)

        out_video = OUTPUT_DIR / f"{c['id']}.mp4"
        cmd = [
            "ffmpeg", "-y",
            "-ss", c['start'], "-to", c['end'],
            "-i", str(TRAILER_PATH),
            "-i", str(banner_path),
            "-filter_complex",
            "[0:v]scale=1080:608,eq=contrast=1.22:brightness=0.06:saturation=1.28,unsharp=5:5:0.8:5:5:0.4[vgrade];"
            "[vgrade]pad=1080:1920:0:656:black[padded];"
            "[padded][1:v]overlay=0:390[outv]",
            "-map", "[outv]", "-map", "0:a",
            "-shortest",
            "-c:v", "libx264", "-crf", "18", "-preset", "veryfast",
            "-c:a", "aac", "-b:a", "192k",
            str(out_video)
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"❌ Error rendering {c['id']}: {res.stderr[:300]}")
        else:
            size_mb = out_video.stat().st_size / (1024 * 1024)
            print(f"✅ Rendered: {out_video.name} ({size_mb:.2f} MB)")
            rendered_files.append((c, out_video))

    # Save metadata
    meta_path = OUTPUT_DIR / "metadata.json"
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(CLIPS, f, ensure_ascii=False, indent=2)
    print(f"\n📁 Metadata saved to {meta_path}")

    # Generate Contact Sheet of all rendered clips
    print("\n📸 Generating contact sheet...")
    sheet_w, sheet_h = 360, 640 # 1/3 scale of 1080x1920
    cols = 5
    rows = 2
    sheet = Image.new("RGB", (cols * sheet_w, rows * sheet_h), color="black")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", 20)

    for i, (c, vpath) in enumerate(rendered_files):
        # Extract middle frame
        thumb_path = banner_dir / f"{c['id']}_thumb.jpg"
        cmd_thumb = [
            "ffmpeg", "-y", "-ss", "00:00:03", "-i", str(vpath),
            "-vframes", "1", "-s", f"{sheet_w}x{sheet_h}", str(thumb_path)
        ]
        subprocess.run(cmd_thumb, capture_output=True)
        if thumb_path.exists():
            thumb = Image.open(thumb_path)
            col = i % cols
            row = i // cols
            x = col * sheet_w
            y = row * sheet_h
            sheet.paste(thumb, (x, y))
            draw.rectangle([x + 10, y + 10, x + 160, y + 42], fill="black")
            draw.text((x + 15, y + 15), f"Clip #{i+1:02d}", fill="yellow", font=font)

    contact_path = Path(r"C:\Users\humun\.gemini\antigravity\brain\6c34c86a-df7c-453b-80e4-19ab331d7d1d\warzone_tiktok_batch_sheet.jpg")
    sheet.save(contact_path, quality=90)
    print(f"🖼️ Contact sheet saved to {contact_path}")

if __name__ == "__main__":
    main()
