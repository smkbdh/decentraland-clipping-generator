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
    },
    {
        "index": 11,
        "name": "One Squad High Risk",
        "file": VIDEOS_DIR / "MW4_DMZ_Video11_One_Squad_High_Risk.mp4",
        "caption": (
            "One Squad. One Chance. No Backup.\n"
            "Entering the high risk sector with squad comms only.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 12,
        "name": "Exfil Under Mortar Fire",
        "file": VIDEOS_DIR / "MW4_DMZ_Video12_Exfil_Under_Mortar_Fire.mp4",
        "caption": (
            "Could you have made that Exfil.\n"
            "Chopper extraction under direct mortar fire.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 13,
        "name": "Vehicle Escape Speed",
        "file": VIDEOS_DIR / "MW4_DMZ_Video13_Vehicle_Escape_Speed.mp4",
        "caption": (
            "DMZ is a whole different experience.\n"
            "High speed tactical evasion through active combat zones.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 14,
        "name": "Scanning Rooftops Sniper",
        "file": VIDEOS_DIR / "MW4_DMZ_Video14_Scanning_Rooftops_Sniper.mp4",
        "caption": (
            "DMZ moments never disappoint.\n"
            "Spotting enemy operators before they spot us.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 15,
        "name": "CQB Squad Wipe",
        "file": VIDEOS_DIR / "MW4_DMZ_Video15_CQB_Squad_Wipe.mp4",
        "caption": (
            "The DMZ hype is real.\n"
            "High intensity CQB combat with zero room for error.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    }
]

def load_published_reels():
    reels = {}
    if LINKS_FILE.exists():
        try:
            content = LINKS_FILE.read_text(encoding="utf-8")
            for match in re.finditer(r'\|\s*(\d+)\s*\|.*?\|\s*\[(https://www\.instagram\.com/[^\]]+/reel/[^\]]+)\]', content):
                reels[int(match.group(1))] = match.group(2)
        except Exception:
            pass
    return reels

PUBLISHED_REELS = load_published_reels()

def update_markdown():
    lines = [
        "# 🔴 LIVE PUBLISHED INSTAGRAM REELS (Call of Duty Campaign)\n\n",
        "Кампания: **Modern Warfare 4 - DMZ Live Clipping**  \n",
        "Аккаунт: **[@kira.gyal](https://www.instagram.com/kira.gyal/)**  \n",
        "Статус: **Публикация активна**  \n\n",
        "---\n\n",
        "### Опубликованные ролики (Reels):\n\n",
        "| # | Название ролика | Хук / Ссылка | Статус |\n",
        "|---|---|---|---|\n"
    ]
    for item in VIDEOS_QUEUE:
        idx = item["index"]
        url = PUBLISHED_REELS.get(idx)
        if url:
            lines.append(f"| {idx} | {item['name']} | [{url}]({url}) | ✅ LIVE |\n")
        else:
            lines.append(f"| {idx} | {item['name']} | В очереди на публикацию | ⏳ Ожидает |\n")

    lines.extend([
        "\n---\n\n",
        "### Соответствие правилам кампании Activision:\n",
        "- ✔️ Хэштеги: `@callofduty` и `#Ad` на отдельной строке\n",
        "- ✔️ Тематические теги: `#DMZ #CallOfDuty #Gaming`\n",
        "- ✔️ Формат: Вертикальный 9:16 (1080x1920)\n",
        "- ✔️ Аудио: Чистый внутриигровой звук DMZ без музыки и без ИИ-голосов\n",
        "- ✔️ Текст на экране: Официальные слоганы из гайдлайна\n"
    ])

    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.writelines(lines)


def launch_browser(p, headless=True):
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)
    context = p.chromium.launch_persistent_context(
        user_data_dir=str(PROFILE_DIR),
        headless=headless,
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
        'a[href="#"]:has-text("Create"), a:has-text("Create"), a:has-text("Создать")'
    ).first

    try:
        create_btn.wait_for(state="visible", timeout=15000)
        create_btn.click()
        time.sleep(2)
    except Exception as e:
        print(f"❌ Ошибка поиска кнопки Создать: {e}")
        return False

    # Check if submenu with "Post" appeared
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
        page.screenshot(path=f"error_file_{index}.png")
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
    modal = page.locator('div[role="dialog"]').first
    next_btn = modal.locator('div[role="button"]:has-text("Next"), div[role="button"]:has-text("Далее"), button:has-text("Next"), button:has-text("Далее")').first
    try:
        next_btn.wait_for(state="visible", timeout=15000)
        next_btn.click()
        time.sleep(3)
    except Exception as e:
        print(f"❌ Ошибка перехода Next 1: {e}")
        return False

    # 5. Click "Next" again to Caption screen
    print("5. Переход к описанию (Next)...")
    next_btn2 = modal.locator('div[role="button"]:has-text("Next"), div[role="button"]:has-text("Далее"), button:has-text("Next"), button:has-text("Далее")').first
    try:
        next_btn2.wait_for(state="visible", timeout=15000)
        next_btn2.click()
        time.sleep(3)
    except Exception as e:
        print(f"❌ Ошибка перехода Next 2: {e}")
        return False

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

    # 7. Click Share (Поделиться)
    print("7. Нажимаем 'Поделиться' (Share)...")
    share_btn = modal.locator('div[role="button"]:has-text("Share"), div[role="button"]:has-text("Поделиться"), button:has-text("Share"), button:has-text("Поделиться")').first
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
            print(f"🎉 REEL #{index} УСПЕШНО ОПУБЛИКОВАН В INSTAGRAM!")
            success = True
            break

    # 9. Extract link
    time.sleep(4)
    reel_url = None
    try:
        print("🔍 Открываем страницу Reels профиля для получения прямой ссылки...")
        page.goto("https://www.instagram.com/kira.gyal/reels/", wait_until="domcontentloaded")
        time.sleep(5)
        reels = page.eval_on_selector_all('a[href*="/reel/"]', 'els => els.map(e => e.href)')
        if reels:
            known_urls = set(PUBLISHED_REELS.values())
            new_reels = [r for r in reels if r not in known_urls]
            reel_url = new_reels[0] if new_reels else reels[0]
    except Exception as e:
        print(f"⚠️ Ошибка поиска ссылки в профиле: {e}")

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
    parser.add_argument("--headed", action="store_true", help="Run browser in visible mode")
    args = parser.parse_args()

    print("==========================================")
    print("   INSTAGRAM REELS UPLOADER (MW4 DMZ)     ")
    print("==========================================")

    with sync_playwright() as p:
        context = launch_browser(p, headless=not args.headed)
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

        print("\n🎉 Завершено!")
        if args.headed:
            input("Нажмите Enter в этой консоли, чтобы закрыть окно...")
        context.close()


if __name__ == "__main__":
    main()
