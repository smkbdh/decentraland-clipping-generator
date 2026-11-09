import sys
import io
import time
import json
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright
from instagrapi import Client

from music_batch_30_girls_engine import generate_reel_video, HOOKS_30

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
if sys.stderr.encoding.lower() != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8')

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
INSTA_PROFILE = BASE_DIR / "instagram_browser_profile"
PROXIES = "http://modeler_gZoM0l:01gngx0cg2f1@45.128.156.22:10641"
STATE_FILE = BASE_DIR / "music_batch_30_girls_state.json"
REPORT_MD = BASE_DIR / "PUBLISHED_GIRLS_REELS.md"

TOTAL_REELS = 30
DELAY_BETWEEN_UPLOADS = 180  # 3 minutes for account safety

def load_state():
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except:
            pass
    return {"published": {}}

def save_state(state):
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)

def update_markdown_report(state):
    lines = [
        "# 🎧 PUBLISHED GIRLS & CARS REELS: Smoke Buddah — Paradise (One Take)",
        "",
        "**Артист**: Smoke Buddah  ",
        "**Трек**: *Paradise (One Take)*  ",
        "**Audio Asset ID**: `1181575584539647`  ",
        "**Аккаунт**: [@kira.gyal](https://www.instagram.com/kira.gyal/)  ",
        "**Формат**: 1080x1920 (100% Native Vertical, Beautiful Models, Luxury Cars, Night City, Beat-Synced 142.9 BPM)  ",
        f"**Опубликовано**: {len(state['published'])} / {TOTAL_REELS} роликов  ",
        "",
        "---",
        "",
        "| # | Хук / Тематика | Ссылка на Instagram Reel | Статус звука |",
        "|---|---|---|---|"
    ]
    for idx_str in sorted(state["published"].keys(), key=lambda x: int(x)):
        info = state["published"][idx_str]
        idx = int(idx_str)
        url = info.get("reel_url", "")
        hook = info.get("hook", "")
        lines.append(f"| {idx} | {hook} | [{url}]({url}) | 🎵 ОФИЦИАЛЬНЫЙ ЗВУК |")
        
    with open(REPORT_MD, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

def git_push_progress(idx, reel_url):
    try:
        subprocess.run(["git", "add", "PUBLISHED_GIRLS_REELS.md", "music_batch_30_girls_state.json"], cwd=str(BASE_DIR), capture_output=True)
        subprocess.run(["git", "commit", "-m", f"chore(reels): published viral reel #{idx} - {reel_url}"], cwd=str(BASE_DIR), capture_output=True)
        subprocess.run(["git", "-c", f"http.proxy={PROXIES}", "push", "origin", "master"], cwd=str(BASE_DIR), capture_output=True)
        print(f"🚀 Изменения по Reel #{idx} запушены в GitHub!", flush=True)
    except Exception as e:
        print(f"⚠️ Ошибка git push: {e}", flush=True)

def get_sessionid():
    f = BASE_DIR / "scratch" / "active_sessionid.txt"
    if f.exists():
        sid = f.read_text(encoding="utf-8").strip()
        if sid:
            return sid
    sessionid = None
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(user_data_dir=str(INSTA_PROFILE), channel="chrome", headless=True)
        cookies = ctx.cookies("https://www.instagram.com")
        ctx.close()
        for c in cookies:
            if c["name"] == "sessionid":
                sessionid = c["value"]
                break
    return sessionid

def run_batch_pipeline():
    state = load_state()
    published_count = len(state["published"])
    print("=" * 65)
    print(f"🚀 ЗАПУСК БАТЧА 30 REELS (AESTHETIC GIRLS & CARS): {published_count}/{TOTAL_REELS} готово")
    print("🎵 Официальный трек: Smoke Buddah — Paradise (One Take)")
    print("👤 Целевой аккаунт: @kira.gyal (через US Residential Proxy)")
    print("=" * 65)
    
    sessionid = get_sessionid()
    if not sessionid:
        print("❌ Ошибка: sessionid не найден в профиле Chrome")
        return
        
    cl = Client(proxy=PROXIES)
    cl.delay_range = [2, 5]
    cl.login_by_sessionid(sessionid)
    print("✅ Успешная авторизация в Instagram API через US прокси!")
    
    tracks = cl.search_music("smoke buddah paradise")
    track = tracks[0]
    print(f"✅ Официальный трек найден: {track.title} by {track.display_artist} (Asset ID: {track.audio_asset_id})")
    
    for idx in range(1, TOTAL_REELS + 1):
        idx_str = str(idx)
        if idx_str in state["published"]:
            print(f"⏩ Ролик #{idx} уже опубликован ({state['published'][idx_str]['reel_url']}), пропускаем...")
            continue
            
        print(f"\n🎬 === ОБРАБОТКА РОЛИКА #{idx}/{TOTAL_REELS} ===")
        
        # 1. Generate & Render unique video
        res = generate_reel_video(idx)
        if not res:
            print(f"❌ Ошибка рендера ролика #{idx}, переход к следующему...")
            continue
        video_path, dur, caption, audio_ss = res
        
        # 2. Attach official catalog music sticker
        overlap_ms = int(dur * 1000)
        music_data = cl.clip_music_extra_data(
            track,
            audio_asset_start_time=audio_ss * 1000,
            overlap_duration=overlap_ms,
            original_volume=0.0,
            music_volume=1.0,
            product="story_camera_clips_v2"
        )
        
        # 3. Upload to Instagram
        print(f"🚀 Загрузка ролика #{idx} в Instagram (@kira.gyal)...")
        upload_success = False
        for attempt in range(1, 4):
            try:
                media = cl.clip_upload(
                    path=video_path,
                    caption=caption,
                    extra_data=music_data
                )
                reel_url = f"https://www.instagram.com/reel/{media.code}/"
                print(f"🎉 РОЛИК #{idx} УСПЕШНО ОПУБЛИКОВАН!")
                print(f"🔗 ССЫЛКА: {reel_url}")
                
                state["published"][idx_str] = {
                    "reel_url": reel_url,
                    "code": media.code,
                    "media_id": str(media.id),
                    "hook": HOOKS_30[(idx - 1) % len(HOOKS_30)]["hook"],
                    "audio_ss": audio_ss,
                    "duration": dur,
                    "timestamp": time.time()
                }
                save_state(state)
                update_markdown_report(state)
                git_push_progress(idx, reel_url)
                upload_success = True
                break
            except Exception as e:
                print(f"⚠️ Ошибка загрузки #{idx} (попытка {attempt}/3): {e}")
                time.sleep(30)
                
        if not upload_success:
            print(f"❌ Не удалось загрузить ролик #{idx} после 3 попыток.")
            continue
            
        # 4. Remove local video to save disk space
        try:
            video_path.unlink(missing_ok=True)
            print(f"🧹 Локальный видеофайл #{idx} удален для экономии диска.")
        except:
            pass
            
        # 5. Safe delay before next upload
        if idx < TOTAL_REELS:
            print(f"⏳ Безопасная пауза {DELAY_BETWEEN_UPLOADS} секунд (~3 мин) для защиты аккаунта...")
            time.sleep(DELAY_BETWEEN_UPLOADS)
            
    print("\n" + "=" * 65)
    print("🏁 ВСЕ 30 РЕЖИССЁРСКИХ РОЛИКОВ УСПЕШНО ОПУБЛИКОВАНЫ В INSTAGRAM!")
    print(f"📄 Итоговый отчёт: {REPORT_MD}")
    print("=" * 65)

if __name__ == "__main__":
    run_batch_pipeline()
