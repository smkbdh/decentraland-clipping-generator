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

BATCH7_VIDEOS = [
    {
        "index": 31,
        "out_name": "MW4_DMZ_Video31_First_Mission_Push.mp4",
        "file": RAW_DIR / "mw4_first_mission.mp4",
        "start": "00:01:05",
        "duration": "14",
        "is_vertical": False,
        "title_top": "ONE SQUAD. ONE CHANCE. NO BACKUP.",
        "title_sub": "Coordinated squad assault deep behind lines",
        "caption": (
            "One Squad. One Chance. No Backup.\n"
            "Coordinated squad assault deep behind enemy lines in DMZ.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 32,
        "out_name": "MW4_DMZ_Video32_FOB_Perimeter_Breach.mp4",
        "file": RAW_DIR / "mw4_fob_base.mp4",
        "start": "00:00:45",
        "duration": "14",
        "is_vertical": True,
        "title_top": "DMZ MOMENTS NEVER DISAPPOINT",
        "title_sub": "Securing the forward operating base depot",
        "caption": (
            "DMZ moments never disappoint.\n"
            "Securing the forward operating base depot under heavy pressure.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 33,
        "out_name": "MW4_DMZ_Video33_Long_Range_Recon_Sniper.mp4",
        "file": RAW_DIR / "mw4_sniping_a.mp4",
        "start": "00:00:15",
        "duration": "14",
        "is_vertical": False,
        "title_top": "DMZ JUST HITS DIFFERENT",
        "title_sub": "Long range thermal surveillance and eliminate",
        "caption": (
            "DMZ just hits different.\n"
            "Long range thermal surveillance and precision elimination.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 34,
        "out_name": "MW4_DMZ_Video34_Armored_Convoy_Pursuit.mp4",
        "file": RAW_DIR / "mw4_driving.mp4",
        "start": "00:00:15",
        "duration": "14",
        "is_vertical": False,
        "title_top": "THE DMZ HYPE IS REAL",
        "title_sub": "High speed extraction through hostile patrol lines",
        "caption": (
            "The DMZ hype is real.\n"
            "High speed extraction through hostile patrol lines.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 35,
        "out_name": "MW4_DMZ_Video35_Extraction_Timer_Panic.mp4",
        "file": RAW_DIR / "mw4_oct26.mp4",
        "start": "00:00:10",
        "duration": "14",
        "is_vertical": False,
        "title_top": "COULD YOU HAVE MADE THAT EXFIL",
        "title_sub": "Final countdown to exfil chopper liftoff",
        "caption": (
            "Could you have made that Exfil.\n"
            "Final countdown to exfil chopper liftoff with incoming reinforcements.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    }
]

def render_clip(item):
    idx = item["index"]
    out_file = OUT_DIR / item["out_name"]
    print(f"\n🎬 РЕНДЕРИНГ ВИДЕО #{idx}: {item['out_name']}...")
    
    t_top = item["title_top"].replace("'", "").replace(":", "")
    t_sub = item["title_sub"].replace("'", "").replace(":", "")

    if item["is_vertical"]:
        vf = (
            f"scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
            f"drawbox=y=0:h=320:color=black@0.75:t=fill,"
            f"drawbox=y=316:h=6:color=0xFFCC00@0.9:t=fill,"
            f"drawtext=fontfile='{FONT}':text='{t_top}':fontsize=46:fontcolor=0xFFCC00:x=(w-text_w)/2:y=130,"
            f"drawtext=fontfile='{FONT}':text='{t_sub}':fontsize=32:fontcolor=white:x=(w-text_w)/2:y=210"
        )
    else:
        vf = (
            f"[0:v]split=2[bg][fg];"
            f"[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=25:5[blurred];"
            f"[fg]scale=1080:-1[sharp];"
            f"[blurred][sharp]overlay=(W-w)/2:(H-h)/2[base];"
            f"[base]drawbox=y=0:h=320:color=black@0.75:t=fill,"
            f"drawbox=y=316:h=6:color=0xFFCC00@0.9:t=fill,"
            f"drawtext=fontfile='{FONT}':text='{t_top}':fontsize=46:fontcolor=0xFFCC00:x=(w-text_w)/2:y=130,"
            f"drawtext=fontfile='{FONT}':text='{t_sub}':fontsize=32:fontcolor=white:x=(w-text_w)/2:y=210"
        )

    cmd = [
        "ffmpeg", "-y",
        "-ss", item["start"],
        "-t", item["duration"],
        "-i", str(item["file"]),
        "-filter_complex", vf,
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "22",
        "-c:a", "aac",
        "-b:a", "192k",
        "-ar", "44100",
        "-movflags", "+faststart",
        str(out_file)
    ]

    t0 = time.time()
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode == 0:
        size_mb = out_file.stat().st_size / (1024 * 1024)
        print(f"✅ ВИДЕО #{idx} ГОТОВО: {size_mb:.2f} МБ (время рендера: {time.time()-t0:.1f}с)")
        return True
    else:
        print(f"❌ ОШИБКА РЕНДЕРА #{idx}:\n", res.stderr.decode('utf-8', errors='ignore')[-500:])
        return False

def main():
    print("=" * 60)
    print("  СТАРТ РЕНДЕРА ПАРТИИ #7 (ВИДЕО 31 - 35) ")
    print("=" * 60)
    for v in BATCH7_VIDEOS:
        render_clip(v)
    print("\n🎉 ВСЕ ВИДЕО ПАРТИИ #7 УСПЕШНО ОТРЕНДЕРЕНЫ!")

if __name__ == "__main__":
    main()
