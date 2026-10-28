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

BATCH5_VIDEOS = [
    {
        "index": 21,
        "out_name": "MW4_DMZ_Video21_Fortified_Command_Breach.mp4",
        "file": RAW_DIR / "mw4_first_mission.mp4",
        "start": "00:01:05",
        "duration": "14",
        "is_vertical": False,
        "title_top": "THE DMZ HYPE IS REAL",
        "title_sub": "Breaching fortified command post",
        "caption": (
            "The DMZ hype is real.\n"
            "Breaching fortified command posts with zero room for error.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 22,
        "out_name": "MW4_DMZ_Video22_High_Ground_Sniper_Kill.mp4",
        "file": RAW_DIR / "mw4_sniping_a.mp4",
        "start": "00:00:38",
        "duration": "14",
        "is_vertical": False,
        "title_top": "DMZ MOMENTS NEVER DISAPPOINT",
        "title_sub": "Long distance sniper elimination",
        "caption": (
            "DMZ moments never disappoint.\n"
            "Long distance sniper elimination from high ground.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 23,
        "out_name": "MW4_DMZ_Video23_Green_Smoke_Exfil.mp4",
        "file": RAW_DIR / "mw4_extract.mp4",
        "start": "00:00:00",
        "duration": "14",
        "is_vertical": False,
        "title_top": "AGAINST ALL ODDS. SUCCESSFUL EXFIL",
        "title_sub": "Green smoke popped for heavy extraction",
        "caption": (
            "Against all odds. Successful Exfil.\n"
            "Green smoke popped for extraction under intense combat pressure.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 24,
        "out_name": "MW4_DMZ_Video24_FOB_Firing_Range_Test.mp4",
        "file": RAW_DIR / "mw4_fob_base.mp4",
        "start": "00:01:10",
        "duration": "14",
        "is_vertical": True,
        "title_top": "DMZ GAMEPLAY JUST FEELS RIGHT",
        "title_sub": "Testing recoil control at FOB firing range",
        "caption": (
            "DMZ Gameplay just feels right.\n"
            "Testing recoil control and attachments at the FOB firing range.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 25,
        "out_name": "MW4_DMZ_Video25_Armored_Breach_Sector.mp4",
        "file": RAW_DIR / "mw4_driving.mp4",
        "start": "00:00:00",
        "duration": "14",
        "is_vertical": False,
        "title_top": "ONE SQUAD. ONE CHANCE. NO BACKUP.",
        "title_sub": "Armored vehicle breach into hostile sector",
        "caption": (
            "One Squad. One Chance. No Backup.\n"
            "Armored vehicle breach directly into the hostile sector.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    }
]

def render_batch5():
    print(f"🎬 РЕНДЕР ПАРТИИ #5 ({len(BATCH5_VIDEOS)} ВИДЕО: 21 - 25) CALL OF DUTY: MW4 DMZ...")

    for item in BATCH5_VIDEOS:
        i = item["index"]
        out_file = OUT_DIR / item["out_name"]
        print(f"\n[{i}/25] Рендерим: {item['out_name']}...")

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
        "\n\n## 🚀 ПАРТИЯ #5 (ВИДЕО 21 - 25)\n\n"
    ]
    for item in BATCH5_VIDEOS:
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

    print(f"\n🎉 Все 5 новых видео (21-25) готовы в: {OUT_DIR}")

if __name__ == "__main__":
    render_batch5()
