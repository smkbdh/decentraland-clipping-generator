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

VIDEOS = [
    {
        "out_name": "MW4_DMZ_Video1_Successful_Exfil.mp4",
        "file": RAW_DIR / "mw4_extract.mp4",
        "start": "00:00:14",
        "duration": "14",
        "is_vertical": False,
        "title_top": "AGAINST ALL ODDS. SUCCESSFUL EXFIL",
        "title_sub": "Could you have made that exfil",
        "caption": (
            "Against all odds. Successful Exfil.\n"
            "The heart rate on this extraction was through the roof.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "out_name": "MW4_DMZ_Video2_One_Squad_No_Backup.mp4",
        "file": RAW_DIR / "mw4_driving.mp4",
        "start": "00:00:06",
        "duration": "14",
        "is_vertical": False,
        "title_top": "ONE SQUAD. ONE CHANCE. NO BACKUP",
        "title_sub": "Pushing straight into the fire",
        "caption": (
            "One Squad. One Chance. No Backup.\n"
            "Pushing straight into the combat zone with the boys.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "out_name": "MW4_DMZ_Video3_Sniping_Never_Disappoint.mp4",
        "file": RAW_DIR / "mw4_sniping_a.mp4",
        "start": "00:00:12",
        "duration": "14",
        "is_vertical": False,
        "title_top": "DMZ MOMENTS NEVER DISAPPOINT",
        "title_sub": "Cleanest sniper shot today",
        "caption": (
            "DMZ moments never disappoint.\n"
            "That precision sniper shot saved the entire squad run.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "out_name": "MW4_DMZ_Video4_DMZ_Hits_Different.mp4",
        "file": RAW_DIR / "mw4_sniping_b.mp4",
        "start": "00:00:18",
        "duration": "15",
        "is_vertical": False,
        "title_top": "DMZ JUST HITS DIFFERENT",
        "title_sub": "Surviving the highest threat zone",
        "caption": (
            "DMZ just hits different.\n"
            "You never know what squad is watching you through a scope.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "out_name": "MW4_DMZ_Video5_Hajin_Map_Showcase.mp4",
        "file": RAW_DIR / "mw4_oct26.mp4",
        "start": "00:00:02",
        "duration": "15",
        "is_vertical": True,
        "title_top": "THE NEW DMZ MAP HAJIN LOOKS BEAUTIFUL",
        "title_sub": "Insane atmosphere and details",
        "caption": (
            "The new DMZ map Hajin looks beautiful.\n"
            "The atmosphere and tactical tension in this mode are unmatched.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    }
]

def render_videos():
    print(f"🎬 НАЧАЛО СБОРКИ {len(VIDEOS)} РОЛИКОВ CALL OF DUTY: MW4 DMZ...")
    
    for i, item in enumerate(VIDEOS, 1):
        out_file = OUT_DIR / item["out_name"]
        print(f"\n[{i}/{len(VIDEOS)}] Рендерим: {item['out_name']}...")
        
        # Crop filter
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

    # Generate METADATA document
    doc_path = OUT_DIR / "MW4_CAMPAIGN_READY_POSTS.md"
    lines = [
        "# 🎮 CALL OF DUTY: MODERN WARFARE 4 - DMZ READY CLIPS\n\n",
        "Кампания: **Modern Warfare 4 - DMZ Live Clipping**  \n",
        "Статус: **5 готовых видео в формате 9:16 (1080x1920) с оригинальным игровым звуком**  \n",
        "Папка с файлами: `ready_videos/mw4_videos/`  \n\n",
        "---\n\n"
    ]
    
    for i, item in enumerate(VIDEOS, 1):
        lines.append(f"### Видео #{i}: `{item['out_name']}`\n")
        lines.append(f"- **Заголовок на экране:** `{item['title_top']}`\n")
        lines.append(f"- **Подзаголовок:** `{item['title_sub']}`\n")
        lines.append(f"- **Длительность:** `{item['duration']} сек`\n")
        lines.append(f"- **Готовое описание для TikTok / Instagram Reels:**\n")
        lines.append("```text\n" + item["caption"] + "\n```\n\n")
        lines.append("---\n\n")
        
    with open(doc_path, "w", encoding="utf-8") as f:
        f.writelines(lines)
        
    print(f"\n🎉 Все 5 видео собраны! Документ с описаниями сохранён в: {doc_path.name}")

if __name__ == "__main__":
    render_videos()
