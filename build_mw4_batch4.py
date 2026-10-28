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

BATCH4_VIDEOS = [
    {
        "index": 16,
        "out_name": "MW4_DMZ_Video16_Sniper_Tracking_City.mp4",
        "file": RAW_DIR / "mw4_sniping_b.mp4",
        "start": "00:00:10",
        "duration": "14",
        "is_vertical": False,
        "title_top": "DMZ JUST HITS DIFFERENT",
        "title_sub": "Tracking enemy squads across the city",
        "caption": (
            "DMZ just hits different.\n"
            "Tracking enemy squads across the city before making a move.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 17,
        "out_name": "MW4_DMZ_Video17_Hajin_Map_Atmosphere.mp4",
        "file": RAW_DIR / "mw4_oct26.mp4",
        "start": "00:00:26",
        "duration": "14",
        "is_vertical": True,
        "title_top": "THE NEW DMZ MAP HAJIN LOOKS BEAUTIFUL",
        "title_sub": "Atmosphere and lighting in DMZ Hajin",
        "caption": (
            "The new DMZ map Hajin looks beautiful.\n"
            "The atmosphere and tactical tension in this mode are unmatched.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 18,
        "out_name": "MW4_DMZ_Video18_Crafting_Tactical_Vests.mp4",
        "file": RAW_DIR / "mw4_3d_printer.mp4",
        "start": "00:00:25",
        "duration": "14",
        "is_vertical": True,
        "title_top": "DMZ GAMEPLAY JUST FEELS RIGHT",
        "title_sub": "Crafting high tier tactical vests",
        "caption": (
            "DMZ Gameplay just feels right.\n"
            "Crafting high tier tactical armor mid mission.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 19,
        "out_name": "MW4_DMZ_Video19_Last_Second_Exfil_Sprint.mp4",
        "file": RAW_DIR / "mw4_first_mission.mp4",
        "start": "00:02:00",
        "duration": "14",
        "is_vertical": False,
        "title_top": "AGAINST ALL ODDS. SUCCESSFUL EXFIL",
        "title_sub": "Last second sprint to exfil bird",
        "caption": (
            "Against all odds. Successful Exfil.\n"
            "Last second sprint to the extraction chopper under heavy suppression.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 20,
        "out_name": "MW4_DMZ_Video20_FOB_Custom_Loadout.mp4",
        "file": RAW_DIR / "mw4_fob_base.mp4",
        "start": "00:00:40",
        "duration": "14",
        "is_vertical": True,
        "title_top": "DMZ IS A WHOLE DIFFERENT EXPERIENCE",
        "title_sub": "Custom loadout tuning at forward operating base",
        "caption": (
            "DMZ is a whole different experience.\n"
            "Custom loadout tuning and weapon mastery at the FOB.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    }
]

def render_batch4():
    print(f"🎬 РЕНДЕР ПАРТИИ #4 ({len(BATCH4_VIDEOS)} ВИДЕО: 16 - 20) CALL OF DUTY: MW4 DMZ...")

    for item in BATCH4_VIDEOS:
        i = item["index"]
        out_file = OUT_DIR / item["out_name"]
        print(f"\n[{i}/20] Рендерим: {item['out_name']}...")

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
        "\n\n## 🚀 ПАРТИЯ #4 (ВИДЕО 16 - 20)\n\n"
    ]
    for item in BATCH4_VIDEOS:
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

    print(f"\n🎉 Все 5 новых видео (16-20) готовы в: {OUT_DIR}")

if __name__ == "__main__":
    render_batch4()
