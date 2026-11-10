import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import time
import json
import subprocess
from pathlib import Path

from auto_pipeline import upload_and_publish

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
STATE_FILE = BASE_DIR / "youtube_music_shorts_state.json"
REPORT_MD = BASE_DIR / "PUBLISHED_YOUTUBE_MUSIC_SHORTS.md"

METADATA_FILES = [
    BASE_DIR / "ready_music_videos" / "batch3" / "batch3_metadata.json",
    BASE_DIR / "ready_music_videos" / "batch2" / "batch2_metadata.json",
    BASE_DIR / "ready_music_videos" / "batch_30_metadata.json",
]

DELAY_BETWEEN_UPLOADS = 15  # seconds for YouTube API safety

def load_state():
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    # Initialize with the test upload #61
    return {
        "published": {
            "61": {
                "filename": "girls_reel_61.mp4",
                "hook": "Late night drives feel unreal with this bass",
                "youtube_url": "https://youtube.com/shorts/7rHJGRli2ro",
                "timestamp": 1794349334
            }
        }
    }

def save_state(state):
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)

def update_markdown_report(state):
    published_items = state.get("published", {})
    count = len(published_items)
    
    lines = [
        "# 🔴 PUBLISHED YOUTUBE SHORTS: Smoke Buddah — Paradise (One Take)",
        "",
        "**Артист**: Smoke Buddah  ",
        "**Трек**: *Paradise (One Take)*  ",
        "**Канал**: [Music for cafe](https://www.youtube.com/@Musicforcafe)  ",
        "**Формат**: 1080x1920 Vertical Shorts (100% Уникальные Исходники, Zero Overlap, Эстетика девушек и ночного города)  ",
        f"**Всего опубликовано в YouTube Shorts**: {count} / 90 роликов  ",
        "",
        "---",
        "",
        "### 🚀 Таблица опубликованных YouTube Shorts",
        "",
        "| # | Файл | Хук / Название | Ссылка на YouTube Shorts | Статус |",
        "|---|---|---|---|---|"
    ]
    
    for idx_str in sorted(published_items.keys(), key=lambda x: int(x)):
        item = published_items[idx_str]
        idx = int(idx_str)
        fname = item.get("filename", "")
        hook = item.get("hook", "")
        url = item.get("youtube_url", "")
        lines.append(f"| {idx:02d} | `{fname}` | {hook} | [{url}]({url}) | 🟢 LIVE (Public) |")

    lines.extend([
        "",
        "---",
        "*Обновлено автоматически роботом публикации YouTube Shorts.*"
    ])
    
    with open(REPORT_MD, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

def git_push_progress(idx, yt_url):
    try:
        subprocess.run(["git", "add", "PUBLISHED_YOUTUBE_MUSIC_SHORTS.md", "youtube_music_shorts_state.json"], cwd=str(BASE_DIR), capture_output=True)
        subprocess.run(["git", "commit", "-m", f"chore(youtube): published short #{idx:02d} - {yt_url}"], cwd=str(BASE_DIR), capture_output=True)
        subprocess.run(["git", "push", "origin", "master"], cwd=str(BASE_DIR), capture_output=True)
        print(f"🚀 Изменения по Shorts #{idx:02d} автоматически запушены в GitHub!", flush=True)
    except Exception as e:
        print(f"⚠️ Ошибка git push: {e}", flush=True)

def collect_all_items():
    all_items = []
    seen_indices = set()
    for meta_path in METADATA_FILES:
        if meta_path.exists():
            with open(meta_path, "r", encoding="utf-8") as f:
                items = json.load(f)
                for it in items:
                    idx = it["index"]
                    if idx not in seen_indices:
                        seen_indices.add(idx)
                        all_items.append(it)
    # Sort from 1 to 90
    all_items.sort(key=lambda x: x["index"])
    return all_items

def run_orchestrator():
    print("=" * 70, flush=True)
    print("🚀 ЗАПУСК YOUTUBE SHORTS ORCHESTRATOR ДЛЯ 90 РОЛИКОВ", flush=True)
    print("🎵 Трек: Smoke Buddah — Paradise (One Take)", flush=True)
    print("📺 Канал: Music for cafe", flush=True)
    print("=" * 70, flush=True)

    items = collect_all_items()
    print(f"📦 Всего видео в очереди: {len(items)} шт.", flush=True)

    state = load_state()
    update_markdown_report(state)

    success_count = len(state["published"])
    print(f"📊 Уже опубликовано: {success_count} / {len(items)}", flush=True)

    for item in items:
        idx = item["index"]
        idx_str = str(idx)

        if idx_str in state["published"]:
            print(f"⏩ Shorts #{idx:02d} уже опубликован ({state['published'][idx_str]['youtube_url']}). Пропускаем.", flush=True)
            continue

        video_path = Path(item["filepath"])
        if not video_path.exists():
            print(f"⚠️ Файл не найден: {video_path}. Пропускаем.", flush=True)
            continue

        hook = item.get("hook", "Smoke Buddah — Paradise (One Take)")
        # Cap title at 90 chars + #shorts
        if len(hook) > 80:
            hook_title = hook[:80].strip() + "..."
        else:
            hook_title = hook.strip()
        title = f"{hook_title} #shorts"

        desc = (
            f"{hook}\n\n"
            f"🎵 Track: Smoke Buddah — Paradise (One Take)\n"
            f"Listen on Spotify, Apple Music & All Streaming Platforms.\n\n"
            f"#shorts #smokebuddah #hiphop #rap #aesthetic #nightdrive #music #vibes"
        )

        print(f"\n🎬 === ПУБЛИКАЦИЯ В YOUTUBE SHORTS #{idx:02d}/{len(items)} ===", flush=True)
        print(f"📹 Файл: {video_path.name}", flush=True)
        print(f"💬 Заголовок: {title}", flush=True)

        upload_success = False
        for attempt in range(1, 4):
            try:
                print(f"🚀 Загрузка #{idx:02d} (попытка {attempt}/3)...", flush=True)
                yt_url = upload_and_publish(video_path, title, desc)
                
                print(f"🎉 SHORTS #{idx:02d} УСПЕШНО ОПУБЛИКОВАН В YOUTUBE!", flush=True)
                print(f"🔗 ССЫЛКА: {yt_url}", flush=True)

                state["published"][idx_str] = {
                    "filename": video_path.name,
                    "hook": hook,
                    "title": title,
                    "youtube_url": yt_url,
                    "timestamp": time.time()
                }
                save_state(state)
                update_markdown_report(state)
                git_push_progress(idx, yt_url)
                upload_success = True
                break
            except Exception as e:
                err_msg = str(e)
                print(f"⚠️ Ошибка загрузки #{idx:02d}: {err_msg}", flush=True)
                if "quotaExceeded" in err_msg or "dailyLimitExceeded" in err_msg:
                    print("⛔ Достигнут лимит квоты YouTube API на сегодня! Останавливаемся.", flush=True)
                    return
                time.sleep(10)

        if not upload_success:
            print(f"❌ Не удалось загрузить #{idx:02d} после 3 попыток.", flush=True)

        print(f"⏳ Пауза {DELAY_BETWEEN_UPLOADS} секунд перед следующим видео...", flush=True)
        time.sleep(DELAY_BETWEEN_UPLOADS)

    print("\n" + "=" * 70, flush=True)
    print(f"🏁 ВЫГРУЗКА ЗАВЕРШЕНА! Опубликовано: {len(state['published'])} / {len(items)}", flush=True)
    print(f"📄 Отчёт: {REPORT_MD}", flush=True)
    print("=" * 70, flush=True)

if __name__ == "__main__":
    run_orchestrator()
