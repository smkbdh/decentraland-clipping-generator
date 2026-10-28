import subprocess
import time
import sys
import codecs
from pathlib import Path

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

BASE_DIR = Path(__file__).resolve().parent
RAW_DIR = BASE_DIR / "mw4_raw"
OUT_DIR = BASE_DIR / "ready_videos" / "mw4_videos"
OUT_DIR.mkdir(parents=True, exist_ok=True)

FONT = "C\\:/Windows/Fonts/arialbd.ttf"

BATCH6_VIDEOS = [
    {
        "index": 26,
        "out_name": "MW4_DMZ_Video26_Chopper_Gunner_Cover.mp4",
        "file": RAW_DIR / "mw4_extract.mp4",
        "start": "00:00:14",
        "duration": "14",
        "is_vertical": False,
        "title_top": "COULD YOU HAVE MADE THAT EXFIL",
        "title_sub": "Machinegun suppression from extraction bird",
        "caption": (
            "Could you have made that Exfil.\n"
            "Machinegun suppression from the extraction bird as hostiles push in.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 27,
        "out_name": "MW4_DMZ_Video27_Stealth_Infiltration_Alley.mp4",
        "file": RAW_DIR / "mw4_first_mission.mp4",
        "start": "00:00:35",
        "duration": "14",
        "is_vertical": False,
        "title_top": "ONE SQUAD. ONE CHANCE. NO BACKUP.",
        "title_sub": "Tactical infiltration through contested territory",
        "caption": (
            "One Squad. One Chance. No Backup.\n"
            "Tactical infiltration through contested territory with full squad stealth.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 28,
        "out_name": "MW4_DMZ_Video28_Counter_Sniping_Rooftops.mp4",
        "file": RAW_DIR / "mw4_sniping_b.mp4",
        "start": "00:00:25",
        "duration": "14",
        "is_vertical": False,
        "title_top": "DMZ MOMENTS NEVER DISAPPOINT",
        "title_sub": "Counter sniping enemy rooftop spotters",
        "caption": (
            "DMZ moments never disappoint.\n"
            "Counter sniping enemy rooftop spotters before they alert their team.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 29,
        "out_name": "MW4_DMZ_Video29_Field_Crafting_Blueprints.mp4",
        "file": RAW_DIR / "mw4_3d_printer.mp4",
        "start": "00:00:40",
        "duration": "14",
        "is_vertical": True,
        "title_top": "DMZ JUST HITS DIFFERENT",
        "title_sub": "Field crafting weapon blueprints on demand",
        "caption": (
            "DMZ just hits different.\n"
            "Field crafting weapon blueprints on demand changes everything.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 30,
        "out_name": "MW4_DMZ_Video30_Final_Gear_Checks_FOB.mp4",
        "file": RAW_DIR / "mw4_fob_base.mp4",
        "start": "00:00:20",
        "duration": "14",
        "is_vertical": True,
        "title_top": "THE DMZ HYPE IS REAL",
        "title_sub": "Final gear checks before DMZ deployment",
        "caption": (
            "The DMZ hype is real.\n"
            "Final gear checks before dropping into the extraction zone.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    }
]

def render_batch6():
    print(f"🎬 РЕНДЕР ПАРТИИ #6 ({len(BATCH6_VIDEOS)} ВИДЕО: 26 - 30) CALL OF DUTY: MW4 DMZ...")

    for item in BATCH6_VIDEOS:
        i = item["index"]
        out_file = OUT_DIR / item["out_name"]
        print(f"\n[{i}/30] Рендерим: {item['out_name']}...")

        if item["is_vertical"]:
            base_filter = "scale=1080:1920"
        else:
            base_filter = "crop=ih*9/16:ih:(iw-ow)/2:0,scale=1080:1920"

        top_txt = item["title_top"].replace(":", "\\:").replace("'", "\\'")
        sub_txt = item["title_sub"].replace(":", "\\:").replace("'", "\\'")

        vf = (
            f"{base_filter},"
            f"drawtext=fontfile='{FONT}':text='{top_txt}':"
            f"fontsize=46:fontcolor=white:borderw=4:bordercolor=black:"
            f"x=(w-text_w)/2:y=180,"
            f"drawtext=fontfile='{FONT}':text='{sub_txt}':"
            f"fontsize=36:fontcolor=yellow:borderw=3:bordercolor=black:"
            f"x=(w-text_w)/2:y=245"
        )

        cmd = [
            "ffmpeg", "-y",
            "-ss", item["start"],
            "-i", str(item["file"]),
            "-t", item["duration"],
            "-vf", vf,
            "-c:v", "libx264", "-preset", "fast", "-crf", "20",
            "-c:a", "aac", "-b:a", "192k",
            str(out_file)
        ]

        t0 = time.time()
        res = subprocess.run(cmd, capture_output=True, text=True)
        t_cost = time.time() - t0

        if res.returncode == 0:
            sz = out_file.stat().st_size / (1024 * 1024)
            print(f"✅ Готово за {t_cost:.1f} сек! Размер: {sz:.1f} MB -> {out_file.name}")
        else:
            print(f"❌ Ошибка рендера:\n{res.stderr[-300:]}")

    # Append to METADATA document
    doc_path = OUT_DIR / "MW4_CAMPAIGN_READY_POSTS.md"
    lines = [
        "\n\n## 🚀 ПАРТИЯ #6 (ВИДЕО 26 - 30)\n\n"
    ]
    for item in BATCH6_VIDEOS:
        i = item["index"]
        lines.append(f"### Видео #{i}: `{item['out_name']}`\n")
        lines.append(f"- **Заголовок на экране:** `{item['title_top']}`\n")
        lines.append(f"- **Подзаголовок:** `{item['title_sub']}`\n")
        lines.append(f"- **Длительность:** `{item['duration']} сек`\n")
        lines.append(f"- **Готовое описание для TikTok / Instagram Reels:**\n")
        lines.append("```text\n" + item["caption"] + "\n```\n\n")
        lines.append("---\n\n")

    with open(doc_path, "a", encoding="utf-8") as f:
        f.writelines(lines)

    print(f"\n🎉 Все 5 новых видео (26-30) готовы в: {OUT_DIR}")

if __name__ == "__main__":
    render_batch6()
