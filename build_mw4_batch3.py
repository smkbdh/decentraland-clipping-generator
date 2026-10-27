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

BATCH3_VIDEOS = [
    {
        "index": 11,
        "out_name": "MW4_DMZ_Video11_One_Squad_High_Risk.mp4",
        "file": RAW_DIR / "mw4_first_mission.mp4",
        "start": "00:00:50",
        "duration": "14",
        "is_vertical": False,
        "title_top": "ONE SQUAD. ONE CHANCE. NO BACKUP.",
        "title_sub": "Entering the high risk sector",
        "caption": (
            "One Squad. One Chance. No Backup.\n"
            "Entering the high risk sector with squad comms only.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 12,
        "out_name": "MW4_DMZ_Video12_Exfil_Under_Mortar_Fire.mp4",
        "file": RAW_DIR / "mw4_extract.mp4",
        "start": "00:00:25",
        "duration": "14",
        "is_vertical": False,
        "title_top": "COULD YOU HAVE MADE THAT EXFIL",
        "title_sub": "Chopper extraction under direct mortar fire",
        "caption": (
            "Could you have made that Exfil.\n"
            "Chopper extraction under direct mortar fire.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 13,
        "out_name": "MW4_DMZ_Video13_Vehicle_Escape_Speed.mp4",
        "file": RAW_DIR / "mw4_driving.mp4",
        "start": "00:00:22",
        "duration": "14",
        "is_vertical": False,
        "title_top": "DMZ IS A WHOLE DIFFERENT EXPERIENCE",
        "title_sub": "Full speed tactical vehicle escape",
        "caption": (
            "DMZ is a whole different experience.\n"
            "High speed tactical evasion through active combat zones.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 14,
        "out_name": "MW4_DMZ_Video14_Scanning_Rooftops_Sniper.mp4",
        "file": RAW_DIR / "mw4_sniping_a.mp4",
        "start": "00:00:30",
        "duration": "14",
        "is_vertical": False,
        "title_top": "DMZ MOMENTS NEVER DISAPPOINT",
        "title_sub": "Spotting enemy operators before they spot us",
        "caption": (
            "DMZ moments never disappoint.\n"
            "Spotting enemy operators before they spot us.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 15,
        "out_name": "MW4_DMZ_Video15_CQB_Squad_Wipe.mp4",
        "file": RAW_DIR / "mw4_first_mission.mp4",
        "start": "00:01:25",
        "duration": "14",
        "is_vertical": False,
        "title_top": "THE DMZ HYPE IS REAL",
        "title_sub": "High intensity CQB squad wipe",
        "caption": (
            "The DMZ hype is real.\n"
            "High intensity CQB combat with zero room for error.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    }
]

def render_batch3():
    print(f"🎬 РЕНДЕР ПАРТИИ #3 ({len(BATCH3_VIDEOS)} ВИДЕО: 11 - 15) CALL OF DUTY: MW4 DMZ...")

    for item in BATCH3_VIDEOS:
        i = item["index"]
        out_file = OUT_DIR / item["out_name"]
        print(f"\n[{i}/15] Рендерим: {item['out_name']}...")

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
        "\n\n## 🚀 ПАРТИЯ #3 (ВИДЕО 11 - 15)\n\n"
    ]
    for item in BATCH3_VIDEOS:
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

    print(f"\n🎉 Все 5 новых видео (11-15) готовы в: {OUT_DIR}")

if __name__ == "__main__":
    render_batch3()
