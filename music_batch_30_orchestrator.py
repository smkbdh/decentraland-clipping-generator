import sys
import io
import time
import json
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright
from instagrapi import Client

# Force UTF-8 stdout
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
INSTA_PROFILE = BASE_DIR / "instagram_browser_profile"
PROXIES = "http://modeler_gZoM0l:01gngx0cg2f1@45.128.156.22:10641"
STATE_FILE = BASE_DIR / "music_batch_30_state.json"
LINKS_FILE = BASE_DIR / "PUBLISHED_SMOKE_BUDDAH_REELS.md"

import music_batch_30_generator

def load_state():
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"published_reels": {}}

def save_state(state):
    try:
        with open(STATE_FILE, "w", encoding="utf-8") as f:
            json.dump(state, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"⚠️ Error saving state: {e}")

def update_markdown(published_map):
    lines = [
        "# 🎧 PUBLISHED REELS: Smoke Buddah — Paradise (One Take)\n\n",
        "**Артист**: Smoke Buddah  \n",
        "**Трек**: *Paradise (One Take)*  \n",
        "**Audio Asset ID**: `1181575584539647`  \n",
        "**Аккаунт**: [@kira.gyal](https://www.instagram.com/kira.gyal/)  \n",
        "**Формат**: 1080x1920 (9:16 Full Screen, 9 смен планов каждые 2 сек, 16-18 Mbps)  \n",
        f"**Опубликовано**: {len(published_map)} / 30 роликов  \n\n",
        "---\n\n",
        "| # | Название / Тематика | Ссылка на Instagram Reel | Статус звука |\n",
        "|---|---|---|---|\n"
    ]
    for idx_str in sorted(published_map.keys(), key=lambda x: int(x)):
        info = published_map[idx_str]
        url = info["url"]
        hook = info.get("hook", f"Reel #{idx_str}")
        lines.append(f"| {idx_str} | {hook} | [{url}]({url}) | 🎵 ОФИЦИАЛЬНЫЙ ЗВУК |\n")
        
    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.writelines(lines)

def git_commit_and_push(batch_count):
    try:
        subprocess.run(["git", "add", "PUBLISHED_SMOKE_BUDDAH_REELS.md", "music_batch_30_state.json", "music_batch_30_orchestrator.py", "music_batch_30_generator.py"], check=False)
        subprocess.run(["git", "commit", "-m", f"feat: published {batch_count}/30 dynamic Smoke Buddah music reels to Instagram"], check=False)
        res = subprocess.run(["git", "push", "origin", "master"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode == 0:
            print("🚀 Push в GitHub origin master успешен!", flush=True)
        else:
            print(f"⚠️ Git push warning: {res.stderr.decode('utf-8', errors='ignore')}", flush=True)
    except Exception as e:
        print(f"⚠️ Git error: {e}", flush=True)

def get_sessionid():
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(user_data_dir=str(INSTA_PROFILE), channel="chrome", headless=True)
        cookies = ctx.cookies("https://www.instagram.com")
        ctx.close()
        for c in cookies:
            if c["name"] == "sessionid":
                return c["value"]
    return None

def main():
    target_total = 30
    safe_delay = 180  # 3 minutes between uploads to protect account from action blocks
    
    print("=" * 65)
    print(f"   SMOKE BUDDAH MUSIC PROMO: ПАЧКА ИЗ {target_total} УНИКАЛЬНЫХ REELS   ")
    print("   ТРЕК: Paradise (One Take) | АККАУНТ: @kira.gyal | US PROXY   ")
    print("=" * 65)
    
    state = load_state()
    published = state.get("published_reels", {})
    
    sessionid = get_sessionid()
    if not sessionid:
        print("❌ Ошибка: не найден sessionid в браузере!")
        return
        
    cl = Client(proxy=PROXIES)
    cl.delay_range = [2, 5]
    cl.login_by_sessionid(sessionid)
    print("✅ Успешная авторизация в Instagram Mobile API через US прокси!")
    
    tracks = cl.search_music("smoke buddah paradise")
    if not tracks:
        print("❌ Ошибка: трек не найден в каталоге Instagram!")
        return
    track = tracks[0]
    print(f"🎵 Официальный звук подключен: {track.title} - {track.display_artist} (ID: {track.id})")
    
    for idx in range(1, target_total + 1):
        idx_str = str(idx)
        if idx_str in published:
            print(f"⏩ Ролик #{idx} уже опубликован ({published[idx_str]['url']}), пропускаем.", flush=True)
            continue
            
        print(f"\n==================================================")
        print(f"🎬 [SMOKE BUDDAH REEL] ПОДГОТОВКА И ПУБЛИКАЦИЯ #{idx}/{target_total}")
        print(f"==================================================")
        
        # 1. Render Video with unique 9-shot sequence and hook
        hook_info = music_batch_30_generator.HOOKS_DATA[(idx - 1) % len(music_batch_30_generator.HOOKS_DATA)]
        render_res = music_batch_30_generator.render_batch_video(idx)
        if not render_res:
            print(f"❌ Ошибка рендеринга ролика #{idx}, повтор через 10 сек...", flush=True)
            time.sleep(10)
            render_res = music_batch_30_generator.render_batch_video(idx)
            
        video_file, duration, caption = render_res
        
        # 2. Build music metadata payload
        music_data = cl.clip_music_extra_data(
            track,
            audio_asset_start_time=0,
            overlap_duration=int(duration * 1000),
            original_volume=0.0,
            music_volume=1.0,
            product="story_camera_clips_v2"
        )
        
        full_caption = (
            f"{caption}\n\n"
            f"🎵 Track: Smoke Buddah — Paradise (One Take)\n"
            f"Tap the audio at the bottom to listen & save to playlist! 🔥\n\n"
            f"#SmokeBuddah #Paradise #OneTake #NightDrive #AestheticVibes #CarEdits #NightVibes #LateNightDrive #TrendingAudio"
        )
        
        # 3. Upload Reel to Instagram
        reel_url = None
        for attempt in range(1, 4):
            try:
                print(f"🚀 Загрузка ролика #{idx} в Instagram (попытка {attempt}/3)...", flush=True)
                media = cl.clip_upload(
                    path=video_file,
                    caption=full_caption,
                    extra_data=music_data
                )
                reel_url = f"https://www.instagram.com/reel/{media.code}/"
                print(f"🎉 РОЛИК #{idx} УСПЕШНО ОПУБЛИКОВАН В INSTAGRAM!", flush=True)
                print(f"🔗 ССЫЛКА: {reel_url}", flush=True)
                break
            except Exception as e:
                print(f"⚠️ Ошибка загрузки #{idx} на попытке {attempt}: {e}", flush=True)
                time.sleep(20)
                
        if not reel_url:
            print(f"❌ Не удалось опубликовать ролик #{idx} после 3 попыток, пропускаем.", flush=True)
            continue
            
        # 4. Save state & report
        published[idx_str] = {
            "url": reel_url,
            "hook": hook_info["hook"],
            "badge": hook_info["badge"],
            "duration": f"{duration:.1f}s",
            "published_at": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        state["published_reels"] = published
        save_state(state)
        update_markdown(published)
        
        # Git commit every 3 reels
        if idx % 3 == 0 or idx == target_total:
            git_commit_and_push(idx)
            
        # 5. Safe pause between uploads
        if idx < target_total:
            print(f"\n⏱ [БЕЗОПАСНАЯ ПАУЗА] Ожидание {safe_delay}с (3 мин) перед следующим Reel...", flush=True)
            # Pre-render next video during pause to save time!
            next_idx = idx + 1
            print(f"⚡ Предварительный рендеринг ролика #{next_idx} во время паузы...", flush=True)
            try:
                music_batch_30_generator.render_batch_video(next_idx)
            except Exception as e:
                print(f"⚠️ Предварительный рендеринг: {e}", flush=True)
                
            for rem in range(safe_delay - 30, 0, -30):
                print(f"⏳ До публикации ролика #{next_idx} осталось {rem}с...", flush=True)
                time.sleep(30)
                
    git_commit_and_push(target_total)
    print("\n🏁 ВСЯ ПАЧКА ИЗ 30 УНИКАЛЬНЫХ РОЛИКОВ SMOKE BUDDAH ОПУБЛИКОВАНА!")

if __name__ == "__main__":
    main()
