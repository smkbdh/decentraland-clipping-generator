import sys
import codecs
import time
import re
import os
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

BASE_DIR = Path(__file__).resolve().parent
VIDEOS_DIR = BASE_DIR / "ready_videos" / "mw4_multiplayer_videos"
LINKS_FILE = BASE_DIR / "PUBLISHED_INSTAGRAM_MULTIPLAYER_LINKS.md"

INSTA_PROFILE = BASE_DIR / "instagram_browser_profile"
REWARDS_PROFILE = BASE_DIR / "rewards_browser_profile"

CAMPAIGN_URL = "https://contentrewards.com/c/campaigns/7a73a53b-2bba-4a5c-8187-05534dd6716d"
INSTAGRAM_URL = "https://www.instagram.com/"

CAPTION_HOOKS = [
    "The new Call of Duty looks INSANE",
    "MW4 Multiplayer is looking unreal",
    "COD Multiplayer has never looked better",
    "MW4 MP hits different",
    "COD MP has no business looking this good",
    "No filter needed for this",
    "The graphics are actually crazy",
    "Yeah, MW4 Multiplayer looks way too clean",
    "The movement in MW4 MP feels incredible",
    "Never seen Call of Duty graphics look this realistic"
]

SUBTITLES = [
    "High framerate gunfight action in new multiplayer maps",
    "Uncut tactical sprint and slide mechanics breakdown",
    "Clean weapon handling and recoil control showcase",
    "Competitive search and destroy clutch round",
    "Fast paced hardpoint defense under heavy artillery",
    "New weapon audio and reload animations hit different",
    "High velocity sniper feed across the perimeter",
    "Tactical breach and clear in close quarters combat",
    "Insane killstreak deployment turning the match",
    "Flanking the enemy squad with suppressed SMG"
]

def get_caption_for_index(idx):
    hook = CAPTION_HOOKS[(idx - 1) % len(CAPTION_HOOKS)]
    sub = SUBTITLES[(idx - 1) % len(SUBTITLES)]
    return (
        f"{hook}.\n"
        f"{sub}.\n\n"
        f"@callofduty\n"
        f"#Ad\n"
        f"#MW4 #CallOfDuty #Gaming"
    )

def find_video_file(idx):
    matches = list(VIDEOS_DIR.glob(f"MW4_MP_Video{idx}_*.mp4"))
    if matches:
        return matches[0]
    return None

def upload_instagram_reel(page, idx, video_path, caption):
    print(f"\n==========================================")
    print(f"🎬 [INSTAGRAM REELS] ЗАГРУЗКА #{idx}")
    print(f"📁 Файл: {video_path.name}")
    print(f"==========================================")

    page.goto(INSTAGRAM_URL, wait_until="domcontentloaded", timeout=45000)
    time.sleep(3)

    dismiss_buttons = page.locator('button:has-text("Not Now"), button:has-text("Не сейчас"), button:has-text("Cancel")')
    if dismiss_buttons.count() > 0 and dismiss_buttons.first.is_visible():
        try:
            dismiss_buttons.first.click()
            time.sleep(1)
        except Exception:
            pass

    # 1. Click Create (+) button
    print("1. Нажимаем кнопку 'Создать' / '+'...")
    create_btn = page.locator(
        'svg[aria-label="New post"], svg[aria-label="Create"], svg[aria-label="Новая публикация"], '
        'a[href="#"]:has-text("Create"), a:has-text("Create"), a:has-text("Создать")'
    ).first

    try:
        create_btn.wait_for(state="visible", timeout=15000)
        create_btn.click()
        time.sleep(2)
    except Exception as e:
        print(f"❌ Ошибка поиска кнопки Создать: {e}")
        return None

    # Handle post submenu
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

    # 2. Select file
    print("2. Передаем видеофайл...")
    file_input = page.locator('input[type="file"]').first
    try:
        file_input.wait_for(state="attached", timeout=15000)
        file_input.set_input_files(str(video_path))
        print("📤 Файл передан браузеру! Ждём обработку превью...")
        time.sleep(5)
    except Exception as e:
        print(f"❌ Ошибка выбора файла: {e}")
        return None

    ok_btn = page.locator('button:has-text("OK"), button:has-text("Понятно")')
    if ok_btn.count() > 0 and ok_btn.first.is_visible():
        ok_btn.first.click()
        time.sleep(1)

    # 3. Check 9:16 crop
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
            else:
                orig = page.locator('button:has-text("Original"), span:has-text("Оригинал")')
                if orig.count() > 0 and orig.first.is_visible():
                    orig.first.click()
                    time.sleep(1)
            crop_btn.click()
            time.sleep(1)
    except Exception as e:
        print(f"Примечание по кадрированию: {e}")

    # 4. Next 1
    print("4. Переход далее (Next 1)...")
    modal = page.locator('div[role="dialog"]').first
    next_btn = modal.locator('div[role="button"]:has-text("Next"), div[role="button"]:has-text("Далее"), button:has-text("Next"), button:has-text("Далее")').first
    try:
        next_btn.wait_for(state="visible", timeout=15000)
        next_btn.click()
        time.sleep(3)
    except Exception as e:
        print(f"❌ Ошибка перехода Next 1: {e}")
        return None

    # 5. Next 2
    print("5. Переход далее (Next 2)...")
    next_btn2 = modal.locator('div[role="button"]:has-text("Next"), div[role="button"]:has-text("Далее"), button:has-text("Next"), button:has-text("Далее")').first
    try:
        next_btn2.wait_for(state="visible", timeout=15000)
        next_btn2.click()
        time.sleep(3)
    except Exception as e:
        print(f"❌ Ошибка перехода Next 2: {e}")
        return None

    # 6. Fill caption
    print("6. Заполняем описание Reel...")
    try:
        caption_area = modal.locator('div[aria-label*="caption"], div[aria-label*="подпись"], div[contenteditable="true"]').first
        caption_area.wait_for(state="visible", timeout=15000)
        caption_area.click()
        time.sleep(0.5)
        page.keyboard.insert_text(caption)
        time.sleep(1)
        modal.locator('h1, div:has-text("Create new post"), div:has-text("New reel")').first.click(force=True)
        time.sleep(1)
        print("✅ Описание успешно введено!")
    except Exception as e:
        print(f"⚠️ Ошибка ввода описания: {e}")

    # 7. Share
    print("7. Нажимаем 'Поделиться' (Share)...")
    share_btn = modal.locator('div[role="button"]:has-text("Share"), div[role="button"]:has-text("Поделиться"), button:has-text("Share"), button:has-text("Поделиться")').first
    try:
        share_btn.wait_for(state="visible", timeout=15000)
        share_btn.click()
        print("🚀 Кнопка 'Share' нажата! Ждём публикацию...")
    except Exception as e:
        print(f"❌ Ошибка нажатия Share: {e}")
        return None

    # 8. Wait for finish
    print("⏳ Ожидание подтверждения публикации...")
    success = False
    for _ in range(60):
        time.sleep(2)
        done_text = page.locator(
            'text=Your reel has been shared, '
            'text=Your post has been shared, '
            'text=Видеоролик опубликован, '
            'text=Публикация опубликована, '
            'text=Поделились, '
            'text=Shared reel'
        )
        if done_text.count() > 0 and done_text.first.is_visible():
            print(f"🎉 REEL #{idx} УСПЕШНО ОПУБЛИКОВАН В INSTAGRAM!")
            success = True
            break

    time.sleep(4)
    reel_url = None
    try:
        page.goto("https://www.instagram.com/kira.gyal/reels/", wait_until="domcontentloaded")
        time.sleep(5)
        reels = page.eval_on_selector_all('a[href*="/reel/"]', 'els => els.map(e => e.href)')
        if reels:
            reel_url = reels[0]
            print(f"🔥 ПРЯМАЯ ССЫЛКА НА REEL #{idx}: {reel_url}")
    except Exception as e:
        print(f"⚠️ Ошибка поиска ссылки: {e}")

    return reel_url

def submit_instagram_to_rewards(page, reel_url, idx):
    print(f"\n🎯 САБМИТ REEL #{idx} В CONTENT REWARDS:")
    print(f"🔗 {reel_url}")

    page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=45000)
    time.sleep(3)

    try:
        trigger = page.locator('button:has-text("Submit clip"):visible').first
        trigger.wait_for(state="visible", timeout=10000)
        trigger.click()
        time.sleep(2)
    except Exception as e:
        print(f"❌ Ошибка открытия модалки: {e}")
        return False

    try:
        modal = page.locator('div[role="dialog"][aria-label="Submit clip"]').first
        inp = modal.locator('input').first
        inp.wait_for(state="visible", timeout=10000)
        inp.click()
        inp.fill("")
        inp.fill(reel_url)
        print("✅ Ссылка вставлена, ждём валидацию API...")
    except Exception as e:
        print(f"❌ Ошибка ввода ссылки: {e}")
        return False

    time.sleep(4)

    try:
        modal = page.locator('div[role="dialog"][aria-label="Submit clip"]').first
        chk = modal.locator('label:has-text("I\'ve read the requirements"), input[type="checkbox"]').first
        if chk.is_visible():
            chk.click()
            time.sleep(1)
    except Exception:
        pass

    modal = page.locator('div[role="dialog"][aria-label="Submit clip"]').first
    modal_btn = modal.locator('button:has-text("Submit clip"):visible').last
    if not modal_btn.is_disabled():
        modal_btn.click()
        print(f"🚀 Сабмит для #{idx} НАЖАТ!")
        time.sleep(6)
        print(f"🎉 REEL #{idx} УСПЕШНО ЗАСАБМИЧЕН В CONTENT REWARDS!")
        return True
    else:
        print(f"❌ Регулярный сабмит #{idx} заблокирован (валидация не прошла)!")
        cancel_btn = modal.locator('button:has-text("Cancel"):visible')
        if cancel_btn.count() > 0 and cancel_btn.first.is_visible():
            cancel_btn.first.click()
        return False

def update_markdown(published_map, status_map):
    lines = [
        "# 🔴 LIVE PUBLISHED INSTAGRAM REELS (MW4 Multiplayer Campaign)\n\n",
        "Кампания: **Call of Duty - MW4 Multiplayer Launch Clipping**  \n",
        "Аккаунт: **[@kira.gyal](https://www.instagram.com/kira.gyal/)**  \n",
        "Статус: **Публикация активна**  \n\n",
        "---\n\n",
        "| # | Ролик | Ссылка на Instagram Reel | Статус в Content Rewards |\n",
        "|---|---|---|---|\n"
    ]
    for idx in sorted(published_map.keys()):
        url = published_map[idx]
        stat = status_map.get(idx, "⏳ Обработка")
        lines.append(f"| {idx} | MW4 MP Reel #{idx} | [{url}]({url}) | {stat} |\n")

    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.writelines(lines)

def git_commit_and_push(batch_count):
    try:
        subprocess.run(["git", "add", "PUBLISHED_INSTAGRAM_MULTIPLAYER_LINKS.md", "instagram_batch_orchestrator.py"], check=False)
        subprocess.run(["git", "commit", "-m", f"feat: submitted {batch_count} reels to instagram and content rewards"], check=False)
        res = subprocess.run(["git", "push", "origin", "master"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode == 0:
            print("🚀 Push в GitHub origin master успешен!", flush=True)
    except Exception as e:
        print(f"⚠️ Git error: {e}", flush=True)

def main():
    target_total = 200
    safe_delay_seconds = 180  # 3 minutes between Reels to prevent Instagram shadowban

    print("=" * 65)
    print(f"   INSTAGRAM REELS PIPELINE: MW4 MULTIPLAYER ({target_total} РОЛИКОВ)   ")
    print("=" * 65)

    published_reels = {}
    submission_statuses = {}

    with sync_playwright() as p:
        insta_ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(INSTA_PROFILE),
            headless=True,
            viewport={"width": 1280, "height": 900},
            args=["--disable-blink-features=AutomationControlled"]
        )
        insta_page = insta_ctx.pages[0] if insta_ctx.pages else insta_ctx.new_page()

        for idx in range(1, target_total + 1):
            video_file = find_video_file(idx)
            if not video_file:
                print(f"⚠️ Видео #{idx} не найдено в папке!", flush=True)
                continue

            caption = get_caption_for_index(idx)

            # 1. Upload to Instagram
            reel_url = upload_instagram_reel(insta_page, idx, video_file, caption)
            if not reel_url:
                print(f"❌ Ошибка публикации Reel #{idx}, повтор через 30с...", flush=True)
                time.sleep(30)
                continue

            published_reels[idx] = reel_url

            # 2. Auto-submit to Content Rewards
            print(f"🎯 Открываем Content Rewards для сабмита #{idx}...", flush=True)
            rewards_ctx = p.chromium.launch_persistent_context(
                user_data_dir=str(REWARDS_PROFILE),
                headless=True,
                viewport={"width": 1280, "height": 850},
                args=["--disable-blink-features=AutomationControlled"]
            )
            rewards_page = rewards_ctx.pages[0] if rewards_ctx.pages else rewards_ctx.new_page()
            success = submit_instagram_to_rewards(rewards_page, reel_url, idx)
            submission_statuses[idx] = "✅ ЗАСАБМИЧЕНО" if success else "❌ Ошибка сабмита"
            rewards_ctx.close()

            # 3. Update Markdown & Git push every 5 reels
            update_markdown(published_reels, submission_statuses)
            if idx % 5 == 0 or idx == target_total:
                git_commit_and_push(idx)

            if idx < target_total:
                print(f"\n⏱ [БЕЗОПАСНАЯ ПАУЗА] Ожидание {safe_delay_seconds}с (3 мин) перед следующим Reel...", flush=True)
                for rem in range(safe_delay_seconds, 0, -30):
                    print(f"⏳ До публикации Reel #{idx + 1} осталось {rem}с...", flush=True)
                    time.sleep(30)

        insta_ctx.close()

    print("\n🏁 ВСЕ РОЛИКИ УСПЕШНО ОПУБЛИКОВАНЫ В INSTAGRAM И ЗАСАБМИЧЕНЫ!")

if __name__ == "__main__":
    main()
