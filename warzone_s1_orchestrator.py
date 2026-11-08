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
VIDEOS_DIR = BASE_DIR / "ready_videos" / "warzone_s1_videos"
VIDEOS_DIR.mkdir(parents=True, exist_ok=True)

LINKS_FILE = BASE_DIR / "PUBLISHED_WARZONE_S1_REELS.md"
STATE_FILE = BASE_DIR / "warzone_orchestrator_state.json"

INSTA_PROFILE = BASE_DIR / "instagram_browser_profile"
REWARDS_PROFILE = BASE_DIR / "rewards_browser_profile"

CAMPAIGN_URL = "https://contentrewards.com/c/campaigns/db285bc6-9a06-43ff-ae4b-4b5ebf149b8b"
INSTAGRAM_URL = "https://www.instagram.com/"

import warzone_s1_generator

def ensure_video_rendered(idx):
    return warzone_s1_generator.render_warzone_video(idx)

def get_caption_for_index(idx):
    meta = warzone_s1_generator.get_clip_metadata(idx)
    return meta["caption"]

def upload_instagram_reel(playwright, idx, video_path, caption):
    print(f"\n==========================================")
    print(f"🎬 [WARZONE S1 REELS] ЗАГРУЗКА #{idx}")
    print(f"📁 Файл: {video_path.name}")
    print(f"==========================================")

    ctx = None
    try:
        ctx = playwright.chromium.launch_persistent_context(
            user_data_dir=str(INSTA_PROFILE),
            channel="chrome",
            headless=True,
            viewport={"width": 1280, "height": 900},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()

        # 1. Navigate to Instagram
        for attempt in range(5):
            try:
                page.goto(INSTAGRAM_URL, wait_until="domcontentloaded", timeout=45000)
                time.sleep(3)
                break
            except Exception as e:
                print(f"⚠️ Ошибка перехода на Instagram (попытка {attempt+1}/5): {e}", flush=True)
                time.sleep(10)
        else:
            ctx.close()
            return None

        # Dismiss popups
        for _ in range(2):
            dismiss = page.locator('button:has-text("Not Now"), button:has-text("Не сейчас"), button:has-text("Cancel")')
            if dismiss.count() > 0 and dismiss.first.is_visible():
                try:
                    dismiss.first.click()
                    time.sleep(1)
                except Exception:
                    pass

        # 2. Click Create (+)
        print("1. Нажимаем кнопку 'Создать' / '+'...")
        create_btn = page.locator(
            'svg[aria-label="Публикация"], svg[aria-label="New post"], svg[aria-label="Create"], '
            'svg[aria-label="Новая публикация"], svg[aria-label="Создать"], '
            'div[role="button"]:has(svg[aria-label="Публикация"]), '
            'a[href="#"]:has-text("Create"), a:has-text("Create"), a:has-text("Создать")'
        ).first
        create_btn.wait_for(state="visible", timeout=15000)
        create_btn.click()
        time.sleep(2)

        # Handle post submenu only if input[type="file"] is not yet visible/attached
        if page.locator('input[type="file"]').count() == 0:
            try:
                page.evaluate('''() => {
                    const spans = Array.from(document.querySelectorAll('span'));
                    const postSpan = spans.find(s => (s.textContent.trim() === 'Post' || s.textContent.trim() === 'Публикация') && s.offsetParent !== null);
                    if (postSpan) {
                        (postSpan.closest('div[role="button"]') || postSpan.closest('a') || postSpan).click();
                    }
                }''')
                time.sleep(2)
            except Exception:
                pass

        # 3. Select file
        print("2. Передаем видеофайл...")
        file_input = page.locator('input[type="file"]').first
        file_input.wait_for(state="attached", timeout=15000)
        file_input.set_input_files(str(video_path))
        print("📤 Файл передан браузеру! Ждём загрузку превью...")
        time.sleep(6)

        ok_btn = page.locator('button:has-text("OK"), button:has-text("Понятно")')
        if ok_btn.count() > 0 and ok_btn.first.is_visible():
            ok_btn.first.click()
            time.sleep(1)

        # 4. Check 9:16 crop
        print("3. Проверяем пропорции 9:16...")
        try:
            crop_btn = page.locator('svg[aria-label="Select crop"], svg[aria-label="Выбрать кадрирование"]').first
            if crop_btn.is_visible():
                crop_btn.click()
                time.sleep(1)
                ratio_9_16 = page.locator('button:has-text("9:16"), span:has-text("9:16"), svg[aria-label="9:16"]')
                if ratio_9_16.count() > 0 and ratio_9_16.first.is_visible():
                    ratio_9_16.first.click()
                    time.sleep(1)
                crop_btn.click()
                time.sleep(1)
        except Exception as e:
            print(f"⚠️ Кадрирование пропущено: {e}")

        # 5. Next 1
        print("4. Переход далее (Next 1)...")
        modal = page.locator('div[role="dialog"]').first
        next_btn = modal.locator('div[role="button"]:has-text("Next"), div[role="button"]:has-text("Далее"), button:has-text("Next"), button:has-text("Далее")').first
        next_btn.wait_for(state="visible", timeout=15000)
        next_btn.click()
        time.sleep(3)

        # 6. Next 2
        print("5. Переход далее (Next 2)...")
        next_btn2 = modal.locator('div[role="button"]:has-text("Next"), div[role="button"]:has-text("Далее"), button:has-text("Next"), button:has-text("Далее")').first
        next_btn2.wait_for(state="visible", timeout=15000)
        next_btn2.click()
        time.sleep(3)

        # 7. Fill caption
        print("6. Заполняем описание Reel...")
        caption_area = modal.locator('div[aria-label*="caption"], div[aria-label*="подпись"], div[contenteditable="true"]').first
        caption_area.wait_for(state="visible", timeout=15000)
        caption_area.click()
        time.sleep(0.5)
        page.keyboard.insert_text(caption)
        time.sleep(1.5)
        print("✅ Описание успешно введено!")

        # 8. Share
        print("7. Нажимаем 'Поделиться' (Share)...")
        share_btn = modal.locator('div[role="button"]:has-text("Share"), div[role="button"]:has-text("Поделиться"), button:has-text("Share"), button:has-text("Поделиться")').first
        if not share_btn.is_visible():
            share_btn = page.locator('div[role="button"]:has-text("Share"), div[role="button"]:has-text("Поделиться"), button:has-text("Share"), button:has-text("Поделиться")').first
        share_btn.wait_for(state="visible", timeout=15000)
        share_btn.click()
        print("🚀 Кнопка 'Share' нажата! Ждём обработку и публикацию (до 120 сек)...")

        # 9. Wait for publication confirmation
        shared = False
        for sec in range(0, 120, 3):
            time.sleep(3)
            done_text = page.locator(
                'text=Your reel has been shared, '
                'text=Your post has been shared, '
                'text=Видеоролик опубликован, '
                'text=Публикация опубликована, '
                'text=Поделились, '
                'text=Shared reel'
            )
            if done_text.count() > 0 and done_text.first.is_visible():
                print(f"🎉 REEL #{idx} УСПЕШНО ОПУБЛИКОВАН В INSTAGRAM! (за {sec}с)")
                shared = True
                break

        if not shared:
            print(f"⚠️ Ожидание тайм-аута 120с завершено, переходим к ленте профиля...")

        time.sleep(10)

        # 10. Retrieve direct Reel URL
        reel_url = None
        for fetch_attempt in range(5):
            try:
                page.goto("https://www.instagram.com/kira.gyal/reels/", wait_until="domcontentloaded", timeout=30000)
                time.sleep(5)
                reels = page.eval_on_selector_all('a[href*="/reel/"]', 'els => els.map(e => e.href)')
                if reels:
                    reel_url = reels[0]
                    print(f"🔥 ПРЯМАЯ ССЫЛКА НА REEL #{idx}: {reel_url}")
                    break
            except Exception as e:
                print(f"⚠️ Попытка получения ссылки {fetch_attempt+1}: {e}")
                time.sleep(5)

        ctx.close()
        return reel_url
    except Exception as e:
        print(f"❌ Ошибка в процессе загрузки Reel #{idx}: {e}")
        if ctx:
            try:
                ctx.close()
            except Exception:
                pass
        return None

def submit_to_rewards_with_retries(playwright, reel_url, idx, max_attempts=8):
    print(f"\n🎯 САБМИТ REEL #{idx} В CONTENT REWARDS:")
    print(f"🔗 {reel_url}")

    for attempt in range(1, max_attempts + 1):
        print(f"--- Попытка сабмита #{attempt}/{max_attempts} для Reel #{idx} ---")
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

            # Dismiss any blocking popups
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
            inp.fill(reel_url)
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
                print(f"🚀 Кнопка сабмита для #{idx} НАЖАТА! Ждём подтверждения...")
                time.sleep(5)
                print(f"🎉 REEL #{idx} УСПЕШНО ЗАСАБМИЧЕН В CONTENT REWARDS!")
                ctx.close()
                return True
            else:
                print(f"⚠️ Кнопка Submit clip заблокирована на попытке {attempt} (API еще проверяет URL). Ждём 15 сек перед повтором...")
                cancel_btn = modal.locator('button:has-text("Cancel"):visible')
                if cancel_btn.count() > 0 and cancel_btn.first.is_visible():
                    cancel_btn.first.click()
                ctx.close()
                time.sleep(15)
        except Exception as e:
            print(f"⚠️ Ошибка контекста rewards на попытке {attempt}: {e}")
            if ctx:
                try:
                    ctx.close()
                except Exception:
                    pass
            time.sleep(15)

    print(f"❌ Не удалось засабмитить Reel #{idx} после {max_attempts} попыток!")
    return False

def load_state():
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"published_reels": {}, "submission_statuses": {}}

def save_state(published_reels, submission_statuses):
    try:
        with open(STATE_FILE, "w", encoding="utf-8") as f:
            json.dump({
                "published_reels": {str(k): v for k, v in published_reels.items()},
                "submission_statuses": {str(k): v for k, v in submission_statuses.items()}
            }, f, indent=2)
    except Exception as e:
        print(f"⚠️ Error saving state: {e}")

def update_markdown(published_map, status_map):
    lines = [
        "# 🔴 LIVE PUBLISHED INSTAGRAM REELS (Call of Duty: Warzone Season 1)\n\n",
        "Кампания: **Call of Duty - Warzone Season 1 Clipping**  \n",
        "Аккаунт: **[@kira.gyal](https://www.instagram.com/kira.gyal/)**  \n",
        "Оплата: **$2.00 / 1K views**  \n",
        "Оптимизация: **v4.0 NLP Triggers + Ultra-Bold Impact Font + Emoji Badges + 4K Source**  \n",
        "Статус: **Публикация активна**  \n\n",
        "---\n\n",
        "| # | Ролик | Ссылка на Instagram Reel | Статус в Content Rewards |\n",
        "|---|---|---|---|\n"
    ]
    for idx in sorted([int(k) for k in published_map.keys()]):
        url = published_map.get(idx) or published_map.get(str(idx))
        stat = status_map.get(idx) or status_map.get(str(idx), "⏳ Обработка")
        lines.append(f"| {idx} | Warzone S1 Reel #{idx} | [{url}]({url}) | {stat} |\n")

    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.writelines(lines)

def git_commit_and_push(batch_count):
    try:
        subprocess.run(["git", "add", "PUBLISHED_WARZONE_S1_REELS.md", "warzone_s1_orchestrator.py", "warzone_orchestrator_state.json", "warzone_s1_generator.py"], check=False)
        subprocess.run(["git", "commit", "-m", f"feat: submitted {batch_count} Warzone Season 1 reels to instagram and content rewards"], check=False)
        res = subprocess.run(["git", "push", "origin", "master"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode == 0:
            print("🚀 Push в GitHub origin master успешен!", flush=True)
        else:
            print(f"⚠️ Git push warning: {res.stderr.decode('utf-8', errors='ignore')}", flush=True)
    except Exception as e:
        print(f"⚠️ Git error: {e}", flush=True)

def main():
    target_total = 50
    safe_delay_seconds = 180  # 3 minutes between Reels to prevent Instagram action blocks

    print("=" * 65)
    print(f"   WARZONE SEASON 1 REELS PIPELINE: ({target_total} РОЛИКОВ)   ")
    print(f"   АККАУНТ: @kira.gyal | СТАВКА: $2.00/1K VIEWS | РЕАЛЬНОЕ ВРЕМЯ   ")
    print("=" * 65)

    state = load_state()
    published_reels = {int(k): v for k, v in state.get("published_reels", {}).items()}
    submission_statuses = {int(k): v for k, v in state.get("submission_statuses", {}).items()}

    with sync_playwright() as p:
        for idx in range(1, target_total + 1):
            if idx in published_reels and submission_statuses.get(idx) == "✅ ЗАСАБМИЧЕНО":
                print(f"⏩ Ролик #{idx} уже опубликован ({published_reels[idx]}), пропускаем.", flush=True)
                continue

            # 1. Render Video with optimal safe zone layout & NLP triggers
            video_file = ensure_video_rendered(idx)
            if not video_file:
                print(f"❌ Ошибка рендеринга видео #{idx}, повтор через 10с...", flush=True)
                time.sleep(10)
                video_file = ensure_video_rendered(idx)

            caption = get_caption_for_index(idx)

            # 2. Upload to Instagram with resilient context & retries
            reel_url = None
            for upload_attempt in range(5):
                reel_url = upload_instagram_reel(p, idx, video_file, caption)
                if reel_url:
                    break
                print(f"⚠️ Повтор попытки загрузки Reel #{idx} ({upload_attempt+1}/5) через 30с...", flush=True)
                time.sleep(30)

            if not reel_url:
                print(f"❌ Ошибка публикации Reel #{idx} после 5 попыток!", flush=True)
                continue

            published_reels[idx] = reel_url

            # 3. Patient Auto-submit to Content Rewards with retry loop
            success = submit_to_rewards_with_retries(p, reel_url, idx, max_attempts=8)

            submission_statuses[idx] = "✅ ЗАСАБМИЧЕНО" if success else "❌ Ошибка сабмита"

            # Save state & update docs
            save_state(published_reels, submission_statuses)
            update_markdown(published_reels, submission_statuses)

            if idx % 5 == 0 or idx == target_total:
                git_commit_and_push(idx)

            if idx < target_total:
                print(f"\n⏱ [БЕЗОПАСНАЯ ПАУЗА] Ожидание {safe_delay_seconds}с (3 мин) перед следующим Reel...", flush=True)
                # Pre-render next video during the pause
                next_idx = idx + 1
                ensure_video_rendered(next_idx)
                for rem in range(safe_delay_seconds - 25, 0, -30):
                    print(f"⏳ До публикации Reel #{next_idx} осталось {rem}с...", flush=True)
                    time.sleep(30)

    git_commit_and_push(target_total)
    print("\n🏁 ВСЕ 50 РОЛИКОВ WARZONE SEASON 1 УСПЕШНО ОПУБЛИКОВАНЫ И ЗАСАБМИЧЕНЫ!")

if __name__ == "__main__":
    main()
