import os, sys, json, re, subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
RAW_DIR = BASE_DIR / "raw_clips" / "ring_drone"
OUT_DIR = BASE_DIR / "ready_videos" / "ring_drone_batch"
OUT_DIR.mkdir(parents=True, exist_ok=True)
BANNER_DIR = BASE_DIR / "scratch" / "ring_banners"
BANNER_DIR.mkdir(parents=True, exist_ok=True)

# 6 Viral Ring Drone Clips
CLIPS_CONFIG = [
    {
        "id": "ring_01_flies_around_house",
        "title": "This camera literally flies around your house",
        "inputs": [RAW_DIR / "Clip 04.mp4", RAW_DIR / "Clip 06.mp4"],
        "hook": "This camera literally flies\naround your house 🤯🚁",
        "caption": "this is the new Ring Drone from @Ring #ad"
    },
    {
        "id": "ring_02_robotics_lineup",
        "title": "Ring just made an indoor patrol drone",
        "inputs": [RAW_DIR / "Clip 07 (1).mp4"],
        "hook": "Ring just made an indoor\npatrol drone 🤖👀",
        "caption": "the new Ring Robotics lineup is here👀 @Ring #ad"
    },
    {
        "id": "ring_03_autonomous_security",
        "title": "Autonomous home security is actually here",
        "inputs": [RAW_DIR / "Clip 08.mp4"],
        "hook": "Autonomous home security\nis actually here 🔒👀",
        "caption": "Ring announces Ring Robotics, ushering in a new era of autonomous security @Ring #ad"
    },
    {
        "id": "ring_04_first_look_reveal",
        "title": "First look at the new Ring Drone",
        "inputs": [RAW_DIR / "Clip 01.mp4", RAW_DIR / "Clip 02 (1).mp4"],
        "hook": "First look at the new\nRing Drone 👀🔥",
        "caption": "first look at the Ring Drone 👀 @Ring #ad"
    },
    {
        "id": "ring_05_docking_and_patrol",
        "title": "Ring just changed home security forever",
        "inputs": [RAW_DIR / "Clip 05.mp4", RAW_DIR / "Clip 03 (1).mp4"],
        "hook": "Ring just changed home\nsecurity forever 🤯🚁",
        "caption": "Ring just showed off the Ring Drone @Ring #ad"
    },
    {
        "id": "ring_06_everyone_talking",
        "title": "Everyone is talking about the new Ring Drone",
        "inputs": [RAW_DIR / "Drone_Break the Notification.mp4"],
        "hook": "Everyone is talking about\nthe new Ring Drone 💬👀",
        "caption": "a closer look at the Ring Drone from @Ring #ad"
    }
]

def render_hook_banner(text, width=1080, font_size=52, line_spacing=14):
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

    pad_x, pad_y = 36, 24
    banner_w = width
    banner_h = total_height + pad_y * 2
    banner_img = Image.new("RGBA", (banner_w, banner_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(banner_img)

    # Calculate max line width to draw a subtle modern semi-transparent pill behind text
    max_w = max(m[0] for m in line_metrics)
    pill_box = [
        (banner_w - max_w) // 2 - pad_x,
        4,
        (banner_w + max_w) // 2 + pad_x,
        banner_h - 4
    ]
    draw.rounded_rectangle(pill_box, radius=24, fill=(0, 0, 0, 190), outline=(255, 255, 255, 50), width=2)

    cur_y = pad_y
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
    print("🚀 Generating Ring Drone Batch (6 High-Retention Clips)...")
    rendered_clips = []

    for idx, c in enumerate(CLIPS_CONFIG, 1):
        print(f"\n[{idx}/6] Rendering {c['id']}...")
        banner_path = BANNER_DIR / f"{c['id']}_banner.png"
        banner = render_hook_banner(c['hook'])
        banner.save(banner_path)

        out_file = OUT_DIR / f"{c['id']}.mp4"
        inputs = c['inputs']

        if len(inputs) == 1:
            # Single input: scale to 1080x1920, boost contrast and sharpness, overlay banner at y=280
            cmd = [
                "ffmpeg", "-y",
                "-i", str(inputs[0]),
                "-i", str(banner_path),
                "-filter_complex",
                "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
                "eq=contrast=1.18:brightness=0.04:saturation=1.22,unsharp=5:5:0.8:5:5:0.4[vgrade];"
                "[vgrade][1:v]overlay=(W-w)/2:280[outv];"
                "[0:a]aformat=channel_layouts=stereo[outa]",
                "-map", "[outv]", "-map", "[outa]",
                "-c:v", "libx264", "-crf", "18", "-preset", "veryfast",
                "-c:a", "aac", "-b:a", "192k",
                str(out_file)
            ]
        else:
            # Two inputs stitched
            # In1 may or may not have audio, in2 has audio
            # Let's normalize both video to 1080x1920 30fps and concat
            cmd = [
                "ffmpeg", "-y",
                "-i", str(inputs[0]),
                "-i", str(inputs[1]),
                "-i", str(banner_path),
                "-filter_complex",
                "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=30[v0];"
                "[1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=30[v1];"
                "[v0][v1]concat=n=2:v=1:a=0[vcat];"
                "[vcat]eq=contrast=1.18:brightness=0.04:saturation=1.22,unsharp=5:5:0.8:5:5:0.4[vgrade];"
                "[vgrade][2:v]overlay=(W-w)/2:280[outv];"
                "[1:a]aformat=channel_layouts=stereo[outa]",
                "-map", "[outv]", "-map", "[outa]",
                "-c:v", "libx264", "-crf", "18", "-preset", "veryfast",
                "-c:a", "aac", "-b:a", "192k",
                str(out_file)
            ]

        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"❌ Error rendering {c['id']}: {res.stderr[:300]}")
        else:
            size_mb = out_file.stat().st_size / (1024 * 1024)
            print(f"✅ Rendered: {out_file.name} ({size_mb:.2f} MB)")
            rendered_clips.append((c, out_file))

    # Save metadata
    meta_path = OUT_DIR / "metadata.json"
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(CLIPS_CONFIG, f, default=str, ensure_ascii=False, indent=2)
    print(f"\n📁 Metadata saved to {meta_path}")

    # Contact sheet
    print("\n📸 Generating contact sheet...")
    sheet_w, sheet_h = 360, 640
    cols = 3
    rows = (len(rendered_clips) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * sheet_w, rows * sheet_h), color="black")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", 20)

    for i, (c, vpath) in enumerate(rendered_clips):
        thumb_path = BANNER_DIR / f"{c['id']}_thumb.jpg"
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

    contact_path = Path(r"C:\Users\humun\.gemini\antigravity\brain\6c34c86a-df7c-453b-80e4-19ab331d7d1d\ring_drone_batch_sheet.jpg")
    sheet.save(contact_path, quality=90)
    print(f"🖼️ Contact sheet saved to {contact_path}")

if __name__ == "__main__":
    main()
