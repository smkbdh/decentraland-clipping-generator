import argparse
import sys
import codecs
import time
import re
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

BASE_DIR = Path(__file__).resolve().parent
PROFILE_DIR = BASE_DIR / "instagram_browser_profile"
VIDEOS_DIR = BASE_DIR / "ready_videos" / "mw4_videos"
LINKS_FILE = BASE_DIR / "PUBLISHED_INSTAGRAM_LINKS.md"

INSTAGRAM_URL = "https://www.instagram.com/"

VIDEOS_QUEUE = [
    {
        "index": 1,
        "name": "Successful Exfil",
        "file": VIDEOS_DIR / "MW4_DMZ_Video1_Successful_Exfil.mp4",
        "caption": (
            "Against all odds. Successful Exfil.\n"
            "The heart rate on this extraction was through the roof.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 2,
        "name": "One Squad No Backup",
        "file": VIDEOS_DIR / "MW4_DMZ_Video2_One_Squad_No_Backup.mp4",
        "caption": (
            "One Squad. One Chance. No Backup.\n"
            "Pushing straight into the combat zone with the boys.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 3,
        "name": "Sniping Moments",
        "file": VIDEOS_DIR / "MW4_DMZ_Video3_Sniping_Never_Disappoint.mp4",
        "caption": (
            "DMZ moments never disappoint.\n"
            "That precision sniper shot saved the entire squad run.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 4,
        "name": "DMZ Hits Different",
        "file": VIDEOS_DIR / "MW4_DMZ_Video4_DMZ_Hits_Different.mp4",
        "caption": (
            "DMZ just hits different.\n"
            "You never know what squad is watching you through a scope.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 5,
        "name": "Hajin Map Showcase",
        "file": VIDEOS_DIR / "MW4_DMZ_Video5_Hajin_Map_Showcase.mp4",
        "caption": (
            "The new DMZ map Hajin looks beautiful.\n"
            "The atmosphere and tactical tension in this mode are unmatched.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 6,
        "name": "The DMZ Hype Is Real",
        "file": VIDEOS_DIR / "MW4_DMZ_Video6_Hype_Is_Real.mp4",
        "caption": (
            "The DMZ hype is real.\n"
            "Tactical breach with zero margin for error.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 7,
        "name": "Crafting 3D Printer",
        "file": VIDEOS_DIR / "MW4_DMZ_Video7_Crafting_3DPrinter.mp4",
        "caption": (
            "DMZ Gameplay just feels right.\n"
            "Crafting custom weapons and tactical gear mid-mission.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 8,
        "name": "FOB Base Experience",
        "file": VIDEOS_DIR / "MW4_DMZ_Video8_FOB_Base_Experience.mp4",
        "caption": (
            "DMZ is a whole different experience.\n"
            "Locking in our squad loadouts before the deployment.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 9,
        "name": "Hajin Looks Amazing",
        "file": VIDEOS_DIR / "MW4_DMZ_Video9_Hajin_Looks_Amazing.mp4",
        "caption": (
            "Hajin looks amazing.\n"
            "The scale and detail on this new map are crazy.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 10,
        "name": "Clutch Sniper Elimination",
        "file": VIDEOS_DIR / "MW4_DMZ_Video10_Clutch_Sniper_Elimination.mp4",
        "caption": (
            "Could you have made that Exfil.\n"
            "Wiped the enemy squad right before the helicopter took off.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    }
]

PUBLISHED_REELS = {}

def update_markdown():
    lines = [
        "# 🔴 LIVE PUBLISHED INSTAGRAM REELS (Call of Duty Campaign)\n\n",
        "Кампания: **Modern Warfare 4 - DMZ Live Clipping**  \n",
        "Статус: **Опубликовано в Instagram Reels**  \n\n",
        "---\n\n"
    ]
    for item in VIDEOS_QUEUE:
        idx = item["index"]
        url = PUBLISHED_REELS.get(idx)
        if url:
            lines.append(f"### Видео #{idx}: {item['name']}\n👉 `{url}`\n\n")

    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.writelines(lines)


def launch_browser(p):
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)
    context = p.chromium.launch_persistent_context(
        user_data_dir=str(PROFILE_DIR),
        headless=False,
        viewport={"width": 1280, "height": 900},
        args=[
            "--disable-blink-features=AutomationControlled",
            "--start-maximized"
        ]
    )
    return context


def check_and_wait_for_login(page, login_only=False):
    print("\n🌐 Открываем Instagram...")
    page.goto(INSTAGRAM_URL, wait_until="domcontentloaded", timeout=60000)
    time.sleep(3)

    # Check if login form is visible (inputs email/pass or username/password)
    has_login_fields = (
        page.locator('input[name="email"], input[name="username"], input[name="pass"], input[name="password"]').count() > 0
    )

    if login_only:
        print("\n" + "=" * 65)
        print("👉 ОКНО БРАУЗЕРА ОТКРЫТО ДЛЯ ВХОДА В INSTAGRAM!")
        print("1. Введите в окне браузера ваш логин/email и пароль.")
        print("2. Пройдите проверку (2FA / код по SMS, если требуется).")
        print("3. Как только откроется лента или профиль — вернитесь сюда.")
        print("=" * 65 + "\n")
        input("Нажмите Enter в этой консоли ПОСЛЕ того, как успешно войдёте в аккаунт...")
        time.sleep(2)
        print("✅ Профиль и сессия сохранены!")
        return True

    if has_login_fields:
        print("\n⚠️ ВНИМАНИЕ: Требуется авторизация в Instagram!")
        print("👉 Пожалуйста, войдите в свой аккаунт в открывшемся окне браузера.")
        input("Нажмите Enter в этой консоли после успешного входа в Instagram...")
        time.sleep(2)
        print("✅ Авторизация принята, продолжаем загрузку!")
        return True

    print("✅ Сессия Instagram активна, аккаунт авторизован!")
    return True


def upload_reel(page, item):
    video_path = item["file"]
    caption = item["caption"]
    index = item["index"]

    if not video_path.exists():
        print(f"❌ Файл не найден: {video_path}")
        return False

    print(f"\n==========================================")
    print(f"🎬 [INSTAGRAM REELS] ЗАГРУЗКА #{index}: {item['name']}")
    print(f"📁 Файл: {video_path.name}")
    print(f"==========================================")

    # Make sure we are on instagram main page
    page.goto(INSTAGRAM_URL, wait_until="domcontentloaded", timeout=45000)
    time.sleep(3)

    # Dismiss any "Turn on Notifications" or "Save your login info" popups
    dismiss_buttons = page.locator('button:has-text("Not Now"), button:has-text("Не сейчас"), button:has-text("Cancel")')
    if dismiss_buttons.count() > 0 and dismiss_buttons.first.is_visible():
        try:
            dismiss_buttons.first.click()
            time.sleep(1)
        except Exception:
            pass

    # 1. Click "Create" button on sidebar
    print("1. Нажимаем кнопку 'Создать' / '+'...")
    create_btn = page.locator(
        'svg[aria-label="New post"], svg[aria-label="Create"], svg[aria-label="Новая публикация"], '
        'a:has-text("Create"), a:has-text("Создать"), span:has-text("Create"), span:has-text("Создать")'
    ).first

    try:
        create_btn.wait_for(state="visible", timeout=15000)
        create_btn.click()
        time.sleep(2)
    except Exception as e:
        print(f"❌ Ошибка поиска кнопки Создать: {e}")
        return False

    # Check if sub-menu appears (Post vs Live)
    post_choice = page.locator('span:has-text("Post"), span:has-text("Публикация")')
    if post_choice.count() > 0 and post_choice.first.is_visible():
        post_choice.first.click()
        time.sleep(2)

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
        return False

    # Dismiss "Video posts are now shared as reels" modal if shown
    ok_btn = page.locator('button:has-text("OK"), button:has-text("Понятно")')
    if ok_btn.count() > 0 and ok_btn.first.is_visible():
        ok_btn.first.click()
        time.sleep(1)

    # 3. Adjust crop to 9:16 if needed
    print("3. Проверяем пропорции 9:16...")
    try:
        crop_btn = page.locator('svg[aria-label="Select crop"], svg[aria-label="Выбрать кадрирование"]').first
        if crop_btn.is_visible():
            crop_btn.click()
            time.sleep(1)
            # Select 9:16 ratio button
            ratio_9_16 = page.locator('button:has-text("9:16"), span:has-text("9:16"), svg[aria-label="9:16"]')
            if ratio_9_16.count() > 0 and ratio_9_16.first.is_visible():
                ratio_9_16.first.click()
                time.sleep(1)
            else:
                # Or select "Original"
                orig = page.locator('button:has-text("Original"), span:has-text("Оригинал")')
                if orig.count() > 0 and orig.first.is_visible():
                    orig.first.click()
                    time.sleep(1)
            # Click crop button again to close popover
            crop_btn.click()
            time.sleep(1)
    except Exception as e:
        print(f"Примечание по кадрированию: {e}")

    # 4. Click "Next" (Далее) to Filter/Trim screen
    print("4. Переход к редактированию (Next)...")
    next_btn = page.locator('div[role="button"]:has-text("Next"), div[role="button"]:has-text("Далее"), button:has-text("Next"), button:has-text("Далее")').first
    try:
        next_btn.wait_for(state="visible", timeout=15000)
        next_btn.click()
        time.sleep(2)
    except Exception as e:
        print(f"❌ Ошибка перехода Next 1: {e}")
        return False

    # 5. Click "Next" again to Caption screen
    print("5. Переход к описанию (Next)...")
    next_btn2 = page.locator('div[role="button"]:has-text("Next"), div[role="button"]:has-text("Далее"), button:has-text("Next"), button:has-text("Далее")').first
    try:
        next_btn2.wait_for(state="visible", timeout=15000)
        next_btn2.click()
        time.sleep(2)
    except Exception as e:
        print(f"❌ Ошибка перехода Next 2: {e}")
        return False

    # 6. Fill caption
    print("6. Заполняем описание Reel...")
    try:
        caption_area = page.locator('div[aria-label*="caption"], div[aria-label*="подпись"], div[contenteditable="true"]').first
        caption_area.wait_for(state="visible", timeout=15000)
        caption_area.click()
        time.sleep(0.5)
        page.keyboard.insert_text(caption)
        time.sleep(1)
        print("✅ Описание успешно введено!")
    except Exception as e:
        print(f"⚠️ Ошибка ввода описания: {e}")

    # 7. Click Share (Поделиться)
    print("7. Нажимаем 'Поделиться' (Share)...")
    share_btn = page.locator('div[role="button"]:has-text("Share"), div[role="button"]:has-text("Поделиться"), button:has-text("Share"), button:has-text("Поделиться")').first
    try:
        share_btn.wait_for(state="visible", timeout=15000)
        share_btn.click()
        print("🚀 Кнопка 'Share' нажата! Ждём публикацию...")
    except Exception as e:
        print(f"❌ Ошибка нажатия Share: {e}")
        return False

    # 8. Wait for completion
    print("⏳ Ожидание подтверждения публикации от Instagram...")
    success = False
    for _ in range(45):
        time.sleep(2)
        done_text = page.locator(
            'text=Your reel has been shared, '
            'text=Your post has been shared, '
            'text=Видеоролик опубликован, '
            'text=Публикация опубликована, '
            'text=Поделились'
        )
        if done_text.count() > 0 and done_text.first.is_visible():
            print(f"🎉 REEL #{index} УСПЕШНО ОПУБЛИКОВАН В INSTAGRAM!")
            success = True
            break

    # 9. Extract link
    time.sleep(3)
    # Check if "View post" or direct link is present
    view_link = page.locator('a[href*="/reel/"], a[href*="/p/"]')
    reel_url = None
    if view_link.count() > 0:
        href = view_link.first.get_attribute("href")
        if href:
            reel_url = "https://www.instagram.com" + href if href.startswith("/") else href

    if not reel_url:
        # Navigate to profile to find top post
        try:
            print("🔍 Открываем профиль для получения прямой ссылки...")
            page.goto("https://www.instagram.com/", wait_until="domcontentloaded")
            time.sleep(4)
            profile_btn = page.locator('svg[aria-label="Profile"], svg[aria-label="Профиль"], a[href*="/direct/"] + a').first
            # Find all links on profile
            # Or get current user profile link
            user_link = page.locator('a[href^="/"]:has(img[alt*="profile"])').first
            if user_link.count() > 0:
                user_href = user_link.get_attribute("href")
                page.goto(f"https://www.instagram.com{user_href}", wait_until="domcontentloaded")
                time.sleep(4)
                first_post = page.locator('a[href*="/reel/"], a[href*="/p/"]').first
                if first_post.count() > 0:
                    phref = first_post.get_attribute("href")
                    reel_url = f"https://www.instagram.com{phref}"
        except Exception:
            pass

    if reel_url:
        PUBLISHED_REELS[index] = reel_url
        print(f"🔥 ПРЯМАЯ ССЫЛКА НА REEL #{index}: {reel_url}")
        update_markdown()
    else:
        print(f"⚠️ Reel #{index} опубликован, ссылка появится в профиле через несколько секунд.")

    return True


def main():
    parser = argparse.ArgumentParser(description="Instagram Reels Automated Uploader")
    parser.add_argument("--login-only", action="store_true", help="Just open browser to log in to Instagram")
    parser.add_argument("--index", type=int, default=1, help="Video index to upload (1-10)")
    parser.add_argument("--all", action="store_true", help="Upload all videos sequentially with safe delay")
    parser.add_argument("--delay-minutes", type=int, default=20, help="Safe delay in minutes between posts (default 20)")
    args = parser.parse_args()

    print("==========================================")
    print("   INSTAGRAM REELS UPLOADER (MW4 DMZ)     ")
    print("==========================================")

    with sync_playwright() as p:
        context = launch_browser(p)
        page = context.pages[0] if context.pages else context.new_page()

        check_and_wait_for_login(page, login_only=args.login_only)

        if args.login_only:
            print("\n🎉 Сессия Instagram успешно сохранена в папку:", PROFILE_DIR)
            print("Теперь можно запускать автозагрузку!")
            context.close()
            return

        if args.all:
            items = VIDEOS_QUEUE
            print(f"\nВсего видео в очереди на публикацию: {len(items)}")
            for i, item in enumerate(items):
                upload_reel(page, item)
                if i < len(items) - 1:
                    print(f"\n⏳ БЕЗОПАСНАЯ ПАУЗА: {args.delay_minutes} мин. перед следующим Reel...")
                    time.sleep(args.delay_minutes * 60)
        else:
            item = next((it for it in VIDEOS_QUEUE if it["index"] == args.index), None)
            if not item:
                print(f"❌ Видео с индексом {args.index} не найдено!")
                context.close()
                return
            upload_reel(page, item)

        print("\n🎉 Готово! Браузер остаётся открытым для просмотра.")
        input("Нажмите Enter в этой консоли, чтобы закрыть окно...")
        context.close()


if __name__ == "__main__":
    main()
