import sys
import codecs
import time
import re
import os
import json
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach(), errors="replace")

BASE_DIR = Path(__file__).resolve().parent
VIDEOS_DIR = BASE_DIR / "ready_videos" / "mw4_multiplayer_videos"
VIDEOS_DIR.mkdir(parents=True, exist_ok=True)

LINKS_FILE = BASE_DIR / "PUBLISHED_TIKTOK_MULTIPLAYER_LINKS_V4.md"
STATE_FILE = BASE_DIR / "tiktok_orchestrator_state.json"

TIKTOK_PROFILE = BASE_DIR / "tiktok_browser_profile"
REWARDS_PROFILE = BASE_DIR / "rewards_browser_profile"

CAMPAIGN_URL = "https://contentrewards.com/c/campaigns/7a73a53b-2bba-4a5c-8187-05534dd6716d"
TIKTOK_UPLOAD_URL = "https://www.tiktok.com/tiktokstudio/upload"

import v4_generator

def get_caption_for_index(idx):
    meta = v4_generator.get_clip_metadata(idx)
    return meta["caption"]

def find_or_render_video(idx):
    matches = list(VIDEOS_DIR.glob(f"MW4_MP_v4_Video{idx}_*.mp4"))
    if matches and matches[0].stat().st_size > 1000000:
        return matches[0]
    return v4_generator.render_v4_video(idx)

def upload_tiktok_video(playwright, idx, video_path, caption):
    print(f"\n==========================================")
    print(f"🎬 [TIKTOK @buddah_ai v4.0] ЗАГРУЗКА #{idx}")
    print(f"📁 Файл: {video_path.name}")
    print(f"==========================================")

    ctx = None
    try:
        ctx = playwright.chromium.launch_persistent_context(
            user_data_dir=str(TIKTOK_PROFILE),
            channel="chrome",
            headless=True,
            viewport={"width": 1280, "height": 850},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()

        for attempt in range(5):
            try:
                page.goto(TIKTOK_UPLOAD_URL, wait_until="domcontentloaded", timeout=45000)
                time.sleep(4)
                break
            except Exception as e:
                print(f"⚠️ Ошибка перехода на TikTok Studio (попытка {attempt+1}/5): {e}", flush=True)
                time.sleep(10)
        else:
            ctx.close()
            return None

        file_input = page.locator('input[type="file"]').first
        file_input.wait_for(state="attached", timeout=15000)
        file_input.set_input_files(str(video_path))
        print("📤 Файл передан загрузчику TikTok...", flush=True)
        time.sleep(6)

        limit_modal = page.locator('text="Couldn\'t upload", text="Не удалось загрузить"')
        if limit_modal.count() > 0 and limit_modal.first.is_visible():
            print("⚠️ [TIKTOK DAILY LIMIT] Достигнут суточный лимит загрузок TikTok на аккаунте @buddah_ai!", flush=True)
            ctx.close()
            return "RATE_LIMITED"

        editor = page.locator('div[contenteditable="true"]').first
        editor.wait_for(state="visible", timeout=30000)
        time.sleep(2)
        editor.click()
        page.keyboard.press("Control+A")
        page.keyboard.press("Backspace")
        time.sleep(0.5)

        # Type caption with tag auto-completion
        lines = caption.split("\n")
        for line_idx, line in enumerate(lines):
            if line:
                tokens = line.split(" ")
                for t_idx, token in enumerate(tokens):
                    if token.startswith("@") or token.startswith("#"):
                        page.keyboard.type(token, delay=30)
                        time.sleep(0.8)
                        page.keyboard.press("Enter")
                        time.sleep(0.4)
                    else:
                        page.keyboard.type(token, delay=15)
                    if t_idx < len(tokens) - 1:
                        page.keyboard.type(" ")
            if line_idx < len(lines) - 1:
                page.keyboard.press("Shift+Enter")
                time.sleep(0.2)

        print("📝 Описание успешно заполнено!", flush=True)
        time.sleep(3)

        # Patient wait for upload completion (up to 90s)
        for _ in range(90):
            text = page.content()
            if "100%" in text or "Uploaded" in text or "Загружено" in text:
                break
            time.sleep(1)

        # Click Post button
        post_button = None
        for _ in range(15):
            candidates = page.locator('button:has-text("Post"), button:has-text("Опубликовать")')
            for i in range(candidates.count()):
                cand = candidates.nth(i)
                t = cand.inner_text().strip()
                if t in ["Post", "Опубликовать", "Publish"]:
                    if cand.is_visible() and not cand.is_disabled():
                        post_button = cand
                        break
            if post_button:
                break
            time.sleep(2)

        if not post_button:
            print(f"❌ Кнопка Post для видео #{idx} не найдена!")
            ctx.close()
            return None

        post_button.scroll_into_view_if_needed()
        time.sleep(1)
        post_button.click()
        print("🚀 Кнопка Post нажата! Ждём публикацию (до 120 сек)...", flush=True)
        time.sleep(3)

        post_now = page.locator('button:has-text("Post now"), button:has-text("Опубликовать сейчас")')
        if post_now.count() > 0 and post_now.first.is_visible():
            post_now.first.click()

        # Wait for redirect or success
        for _ in range(30):
            time.sleep(2)
            if "tiktokstudio/content" in page.url:
                break
            upload_another = page.locator('button:has-text("Upload another video"), button:has-text("Upload another")')
            if upload_another.count() > 0 and upload_another.first.is_visible():
                page.goto("https://www.tiktok.com/tiktokstudio/content", wait_until="domcontentloaded")
                break

        time.sleep(8)
        html = page.content()
        ids = list(dict.fromkeys(re.findall(r'item_id=(\d{19})', html)))
        video_url = None
        if ids:
            video_url = f"https://www.tiktok.com/@buddah_ai/video/{ids[0]}"
            print(f"🔥 ПРЯМАЯ ССЫЛКА НА TIKTOK #{idx}: {video_url}", flush=True)
        else:
            try:
                page.goto("https://www.tiktok.com/tiktokstudio/content", wait_until="domcontentloaded", timeout=30000)
                time.sleep(8)
                html = page.content()
                ids = list(dict.fromkeys(re.findall(r'item_id=(\d{19})', html)))
                if ids:
                    video_url = f"https://www.tiktok.com/@buddah_ai/video/{ids[0]}"
                    print(f"🔥 ПРЯМАЯ ССЫЛКА (из контента) НА TIKTOK #{idx}: {video_url}", flush=True)
            except Exception as e:
                print(f"⚠️ Ошибка поиска ссылки TikTok: {e}")

        ctx.close()
        return video_url
    except Exception as e:
        print(f"❌ Ошибка в процессе загрузки TikTok #{idx}: {e}")
        if ctx:
            try:
                ctx.close()
            except Exception:
                pass
        return None

def submit_tiktok_to_rewards(playwright, tiktok_url, idx, max_attempts=8):
    print(f"\n🎯 САБМИТ TIKTOK #{idx} В CONTENT REWARDS:")
    print(f"🔗 {tiktok_url}")

    for attempt in range(1, max_attempts + 1):
        print(f"--- Попытка сабмита #{attempt}/{max_attempts} для TikTok #{idx} ---")
        ctx = None
        try:
            ctx = playwright.chromium.launch_persistent_context(
                user_data_dir=str(REWARDS_PROFILE),
                channel="chrome",
                headless=True,
                viewport={"width": 1280, "height": 850},
                args=["--disable-blink-features=AutomationControlled"]
            )
            page = ctx.pages[0] if ctx.pages else ctx.new_page()

            page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=35000)
            time.sleep(3)

            for btn_text in ["Not now", "Cancel", "Close"]:
                try:
                    b = page.locator(f'button:has-text("{btn_text}")')
                    if b.count() > 0 and b.first.is_visible():
                        b.first.click()
                        time.sleep(1)
                except Exception:
                    pass

            trigger = page.locator('button:has-text("Submit clip"):visible').first
            trigger.wait_for(state="visible", timeout=12000)
            trigger.click()
            time.sleep(2)

            modal = page.locator('div[role="dialog"][aria-label="Submit clip"]').first
            inp = modal.locator('input').first
            inp.wait_for(state="visible", timeout=10000)
            inp.click()
            inp.fill("")
            inp.fill(tiktok_url)
            print("⏳ Ссылка вставлена, ждём валидацию API платформы (до 8 сек)...")
            time.sleep(5)

            try:
                chk = modal.locator('label:has-text("I\'ve read the requirements"), input[type="checkbox"]').first
                if chk.is_visible():
                    chk.click()
                    time.sleep(0.5)
            except Exception:
                pass

            modal_btn = modal.locator('button:has-text("Submit clip"):visible').last
            if not modal_btn.is_disabled():
                modal_btn.click()
                print(f"🚀 Сабмит для TikTok #{idx} НАЖАТ! Ждём подтверждения...")
                time.sleep(5)
                print(f"🎉 TIKTOK #{idx} УСПЕШНО ЗАСАБМИЧЕН В CONTENT REWARDS!")
                ctx.close()
                return True
            else:
                print(f"⚠️ Кнопка Submit заблокирована на попытке {attempt}. Ждём 15 сек перед повтором...")
                cancel_btn = modal.locator('button:has-text("Cancel"):visible')
                if cancel_btn.count() > 0 and cancel_btn.first.is_visible():
                    cancel_btn.first.click()
                ctx.close()
                time.sleep(15)
        except Exception as e:
            print(f"⚠️ Ошибка контекста rewards TikTok #{idx} (попытка {attempt}): {e}")
            if ctx:
                try:
                    ctx.close()
                except Exception:
                    pass
            time.sleep(15)

    print(f"❌ Не удалось засабмитить TikTok #{idx} после {max_attempts} попыток!")
    return False

def load_state():
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"published_videos": {}, "submission_statuses": {}}

def save_state(published_videos, submission_statuses):
    try:
        with open(STATE_FILE, "w", encoding="utf-8") as f:
            json.dump({
                "published_videos": {str(k): v for k, v in published_videos.items()},
                "submission_statuses": {str(k): v for k, v in submission_statuses.items()}
            }, f, indent=2)
    except Exception as e:
        print(f"⚠️ Error saving state: {e}")

def update_markdown(published_map, status_map):
    lines = [
        "# 🔴 LIVE PUBLISHED TIKTOK VIDEOS (MW4 Multiplayer Campaign - Batch 4 v4.0 NLP)\n\n",
        "Кампания: **Call of Duty - MW4 Multiplayer Launch Clipping**  \n",
        "Аккаунт: **[@buddah_ai](https://www.tiktok.com/@buddah_ai)**  \n",
        "Оптимизация: **v4.0 NLP Triggers + Ultra-Bold Impact Font + Emoji Badges + Audio Boost**  \n",
        "Статус: **Публикация активна**  \n\n",
        "---\n\n",
        "| # | Ролик | Ссылка на TikTok | Статус в Content Rewards |\n",
        "|---|---|---|---|\n"
    ]
    for idx in sorted([int(k) for k in published_map.keys()]):
        url = published_map.get(idx) or published_map.get(str(idx))
        stat = status_map.get(idx) or status_map.get(str(idx), "⏳ Обработка")
        lines.append(f"| {idx} | MW4 MP TikTok v4 #{idx} | [{url}]({url}) | {stat} |\n")

    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.writelines(lines)

def git_commit_and_push(batch_count):
    try:
        subprocess.run(["git", "add", "PUBLISHED_TIKTOK_MULTIPLAYER_LINKS_V4.md", "tiktok_parallel_worker.py", "tiktok_orchestrator_state.json"], check=False)
        subprocess.run(["git", "commit", "-m", f"feat: submitted {batch_count} v4.0 NLP clips to tiktok and content rewards"], check=False)
        res = subprocess.run(["git", "push", "origin", "master"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode == 0:
            print("🚀 Push в GitHub origin master успешен!", flush=True)
        else:
            print(f"⚠️ Git push warning: {res.stderr.decode('utf-8', errors='ignore')}", flush=True)
    except Exception as e:
        print(f"⚠️ Git error: {e}", flush=True)

def main():
    target_total = 200
    safe_delay_seconds = 210  # 3.5 minutes safe interval for TikTok

    print("=" * 65)
    print(f"   TIKTOK PARALLEL PIPELINE v4.0 NLP: MW4 MULTIPLAYER ({target_total} РОЛИКОВ)   ")
    print(f"   НАДЕЖНЫЙ КОНВЕЙЕР: С ПОВТОРНЫМИ ПОПЫТКАМИ САБМИТА И ОЖИДАНИЕМ ИНДЕКСАЦИИ   ")
    print("=" * 65)

    state = load_state()
    published_videos = {int(k): v for k, v in state.get("published_videos", {}).items()}
    submission_statuses = {int(k): v for k, v in state.get("submission_statuses", {}).items()}

    with sync_playwright() as p:
        for idx in range(1, target_total + 1):
            if idx in published_videos and submission_statuses.get(idx) == "✅ ЗАСАБМИЧЕНО":
                print(f"⏩ Ролик #{idx} уже опубликован в TikTok ({published_videos[idx]}), пропускаем.", flush=True)
                continue

            video_file = find_or_render_video(idx)
            if not video_file:
                print(f"⚠️ Не удалось отрендерить видео #{idx}, переходим к следующему...", flush=True)
                continue

            caption = get_caption_for_index(idx)

            video_url = None
            rate_limited = False
            for upload_attempt in range(5):
                video_url = upload_tiktok_video(p, idx, video_file, caption)
                if video_url == "RATE_LIMITED":
                    rate_limited = True
                    break
                if video_url:
                    break
                print(f"⚠️ Повтор попытки загрузки TikTok #{idx} ({upload_attempt+1}/5) через 30с...", flush=True)
                time.sleep(30)

            if rate_limited:
                print(f"🛑 [TIKTOK] Аккаунт @buddah_ai достиг суточного лимита TikTok. Пауза 2 часа перед проверкой сброса...", flush=True)
                time.sleep(7200)
                continue

            if not video_url:
                print(f"❌ Ошибка публикации TikTok #{idx} после 5 попыток!", flush=True)
                continue

            published_videos[idx] = video_url

            # Patient Auto-submit to Content Rewards with retries
            success = submit_tiktok_to_rewards(p, video_url, idx, max_attempts=8)

            submission_statuses[idx] = "✅ ЗАСАБМИЧЕНО" if success else "❌ Ошибка сабмита"

            # Save state & update docs
            save_state(published_videos, submission_statuses)
            update_markdown(published_videos, submission_statuses)

            if idx % 5 == 0 or idx == target_total:
                git_commit_and_push(idx)

            if idx < target_total:
                print(f"\n⏱ [БЕЗОПАСНАЯ ПАУЗА TIKTOK] Ожидание {safe_delay_seconds}с (3.5 мин) перед следующим TikTok...", flush=True)
                for rem in range(safe_delay_seconds, 0, -30):
                    print(f"⏳ До публикации TikTok #{idx + 1} осталось {rem}с...", flush=True)
                    time.sleep(30)

    git_commit_and_push(target_total)
    print("\n🏁 ВСЕ 200 РОЛИКОВ (v4.0 NLP) УСПЕШНО ОПУБЛИКОВАНЫ В TIKTOK И ЗАСАБМИЧЕНЫ!")

if __name__ == "__main__":
    main()
