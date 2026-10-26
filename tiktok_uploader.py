import argparse
import sys
import time
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

BASE_DIR = Path(__file__).resolve().parent
PROFILE_DIR = BASE_DIR / "tiktok_browser_profile"
VIDEOS_DIR = BASE_DIR / "ready_videos" / "hooked_videos"

TIKTOK_UPLOAD_URL = "https://www.tiktok.com/tiktokstudio/upload"

VIDEOS_QUEUE = [
    {
        "index": 1,
        "file": VIDEOS_DIR / "Hook1_BumpySlide_to_Halloween.mp4",
        "caption": (
            "Wait for the plot twist at the end 🎃😭 Exploring spooky season in @decentraland_fdn! "
            "Halloweeks is live through Nov 1. "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gaming #halloweengame #gamestiktok #decentraland #fyp #cozygaming"
        )
    },
    {
        "index": 2,
        "file": VIDEOS_DIR / "Hook2_Golfer_to_SlayTheSteps.mp4",
        "caption": (
            "That was NOT part of the plan 💀 Finding the wildest obstacle in @decentraland_fdn! "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gamingmemes #gaming #gamestiktok #decentraland #fyp #viral"
        )
    },
    {
        "index": 3,
        "file": VIDEOS_DIR / "Hook3_LaunchTackle_to_Jetpack.mp4",
        "caption": (
            "Bro went flying to another dimension 🚀 Exploring with jetpacks in @decentraland_fdn! "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gaming #gamer #gamestiktok #decentraland #funnygaming #fyp"
        )
    },
    {
        "index": 4,
        "file": VIDEOS_DIR / "Hook4_CornThrow_to_ClubParty.mp4",
        "caption": (
            "3 AM energy in this world is insane 🔥 Nightclub party in @decentraland_fdn! "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gaming #clubbing #gamestiktok #decentraland #nightlife #fyp"
        )
    },
    {
        "index": 5,
        "file": VIDEOS_DIR / "Hook5_PlateHead_to_CherryBlossom.mp4",
        "caption": (
            "Most peaceful place on the internet right now 🌸 Dancing under cherry blossoms in @decentraland_fdn! "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#cozygames #aesthetic #gamestiktok #decentraland #fyp #gaming"
        )
    },
    {
        "index": 6,
        "file": VIDEOS_DIR / "Hook6_SandalThrow_to_PumpkinBall.mp4",
        "caption": (
            "Nobody can dodge this 🎃💀 Haunted pumpkin arena is wild in @decentraland_fdn! "
            "Halloweeks is live through Nov 1. "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gaming #halloween #halloweeks #gamestiktok #decentraland #fyp"
        )
    },
    {
        "index": 7,
        "file": VIDEOS_DIR / "Hook7_BottleKick_to_Skychaser.mp4",
        "caption": (
            "How did I even make that jump?! ☁️ Exploring floating islands in @decentraland_fdn! "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gaming #platformer #gamestiktok #decentraland #fyp #gamer"
        )
    },
    {
        "index": 8,
        "file": VIDEOS_DIR / "Hook8_DirtyFace_to_MonsterRecon.mp4",
        "caption": (
            "Finding hidden boss fights with the squad 👾 Exploring @decentraland_fdn! "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gaming #bossfight #gamestiktok #decentraland #fyp #viral"
        )
    }
]


def launch_browser(p):
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)
    context = p.chromium.launch_persistent_context(
        user_data_dir=str(PROFILE_DIR),
        headless=False,
        channel="chrome",  # Uses installed Google Chrome if available, fallback to chromium
        viewport={"width": 1280, "height": 850},
        args=[
            "--disable-blink-features=AutomationControlled",
            "--start-maximized"
        ]
    )
    return context


def check_and_wait_for_login(page):
    print("\n🌐 Переходим на страницу загрузки TikTok Studio...")
    page.goto(TIKTOK_UPLOAD_URL, wait_until="domcontentloaded", timeout=60000)
    time.sleep(3)

    # Check if login is needed
    while True:
        current_url = page.url.lower()
        if "login" in current_url:
            print("\n⚠️ ВНИМАНИЕ: Требуется вход в TikTok!")
            print("👉 Войдите в свой аккаунт TikTok в открытом окне браузера.")
            print("⏳ Ожидание успешного входа (профиль сохранится автоматически)...")
            try:
                page.wait_for_url(lambda u: "login" not in u.lower() and "upload" in u.lower(), timeout=180000)
                print("✅ Успешный вход обнаружен!")
                time.sleep(3)
                break
            except PlaywrightTimeoutError:
                print("⏳ Всё ещё ждём авторизацию в браузере...")
        else:
            # Check if upload dropzone or file input is present
            try:
                page.wait_for_selector('input[type="file"], [data-e2e="upload_video"], div[class*="upload"]', timeout=5000)
                print("✅ Сессия активна, страница загрузки готова!")
                break
            except PlaywrightTimeoutError:
                # Might still be on a redirect
                if "login" in page.url.lower():
                    continue
                print("⏳ Страница загружается...")
                time.sleep(2)
                if "upload" in page.url.lower():
                    break


def upload_single_video(page, item, auto_publish=False):
    video_path = item["file"]
    caption = item["caption"]
    index = item["index"]

    if not video_path.exists():
        print(f"❌ Файл не найден: {video_path}")
        return False

    print(f"\n==========================================")
    print(f"🎬 ЗАГРУЗКА ВИДЕО #{index}: {video_path.name}")
    print(f"📝 Описание ({len(caption)} символов):\n{caption}")
    print(f"==========================================")

    # Go to upload page if not already there
    if "tiktokstudio/upload" not in page.url and "creator-center/upload" not in page.url:
        page.goto(TIKTOK_UPLOAD_URL, wait_until="domcontentloaded", timeout=60000)
        time.sleep(3)

    # Find file input (might be inside an iframe or in main DOM)
    print("📤 Выбираем видеофайл...")
    file_input = None
    
    # Try finding input in main page or any iframe
    for frame in [page] + page.frames:
        try:
            inp = frame.locator('input[type="file"]')
            if inp.count() > 0:
                file_input = inp.first
                break
        except Exception:
            pass

    if not file_input:
        # Fallback wait
        try:
            file_input = page.wait_for_selector('input[type="file"]', timeout=15000)
        except Exception:
            print("❌ Не удалось найти поле загрузки файла (input[type='file']).")
            return False

    file_input.set_input_files(str(video_path))
    print("⏳ Файл передан браузеру, ожидаем загрузку и обработку в TikTok...")

    # Wait for upload completion (usually caption input appears or progress reaches 100%)
    time.sleep(5)

    # Locate caption / title input
    print("✍️ Заполняем заголовок и описание...")
    caption_element = None
    selectors = [
        'div[contenteditable="true"]',
        'div[data-placeholder]',
        'div.notranslate[contenteditable="true"]',
        'div[class*="editor"] [contenteditable="true"]',
        'textarea'
    ]

    for sel in selectors:
        try:
            for frame in [page] + page.frames:
                el = frame.locator(sel)
                if el.count() > 0 and el.first.is_visible():
                    caption_element = el.first
                    break
            if caption_element:
                break
        except Exception:
            pass

    if caption_element:
        try:
            caption_element.click()
            time.sleep(0.5)
            # Select all and delete default text (like filename)
            page.keyboard.press("Control+A")
            page.keyboard.press("Backspace")
            time.sleep(0.5)
            # Insert caption
            page.keyboard.insert_text(caption)
            time.sleep(1)
            print("✅ Описание успешно вставлено!")
        except Exception as e:
            print(f"⚠️ Ошибка при вводе текста описания: {e}")
    else:
        print("⚠️ Поле ввода описания не найдено автоматически. Пожалуйста, вставьте вручную при необходимости.")

    # Wait for video upload to finish and Post button to be active
    print("⏳ Ожидание завершения обработки видео перед публикацией...")
    post_button = None
    post_selectors = [
        'button[data-e2e="post_video_button"]',
        'button:has-text("Post")',
        'button:has-text("Опубликовать")',
        'button:has-text("Publish")'
    ]

    for _ in range(60):  # wait up to ~2 minutes
        for sel in post_selectors:
            try:
                for frame in [page] + page.frames:
                    btn = frame.locator(sel)
                    if btn.count() > 0 and btn.first.is_visible():
                        if not btn.first.is_disabled():
                            post_button = btn.first
                            break
                if post_button:
                    break
            except Exception:
                pass
        if post_button:
            break
        time.sleep(2)

    if not post_button:
        print("⚠️ Кнопка 'Опубликовать' ещё не активна или обрабатывается превью.")
        print("👉 Проверьте окно браузера и нажмите 'Post' / 'Опубликовать'.")
        if not auto_publish:
            input("Нажмите Enter в этой консоли, когда проверите/опубликуете в браузере...")
            return True
        return False

    print("🚀 Кнопка 'Опубликовать' доступна!")
    if auto_publish:
        print("Нажимаем 'Опубликовать'...")
        post_button.click()
        time.sleep(5)
        print(f"✅ Видео #{index} отправлено на публикацию!")
        return True
    else:
        print("👀 Режим предпросмотра: видео загружено, описание заполнено.")
        print("👉 Нажмите кнопку 'Post'/'Опубликовать' в браузере или нажмите Enter в консоли для автоклика.")
        ans = input("Нажать 'Опубликовать' автоматически? (y/n): ").strip().lower()
        if ans == 'y' or ans == '':
            post_button.click()
            time.sleep(5)
            print(f"✅ Видео #{index} опубликовано!")
        return True


def main():
    parser = argparse.ArgumentParser(description="TikTok Automated Uploader with persistent profile")
    parser.add_argument("--login-only", action="store_true", help="Just open browser to log in to TikTok")
    parser.add_argument("--index", type=int, default=None, help="Upload specific video index (1-8)")
    parser.add_argument("--auto-publish", action="store_true", help="Automatically click Publish without manual prompt")
    parser.add_argument("--delay", type=int, default=30, help="Delay between video uploads in seconds")
    args = parser.parse_args()

    print("==========================================")
    print("   TIKTOK UPLOADER FOR DECENTRALAND CLIPS ")
    print("==========================================")

    with sync_playwright() as p:
        context = launch_browser(p)
        page = context.new_page()

        check_and_wait_for_login(page)

        if args.login_only:
            print("\n🎉 Сессия сохранена в папку:", PROFILE_DIR)
            print("Браузер готов. Закрываем...")
            context.close()
            return

        if args.index:
            items = [item for item in VIDEOS_QUEUE if item["index"] == args.index]
            if not items:
                print(f"❌ Видео с индексом {args.index} не найдено!")
                context.close()
                return
        else:
            items = VIDEOS_QUEUE

        print(f"\nВсего видео в очереди на загрузку: {len(items)}")

        for i, item in enumerate(items):
            success = upload_single_video(page, item, auto_publish=args.auto_publish)
            if success and i < len(items) - 1:
                print(f"\n⏳ Пауза перед следующим видео: {args.delay} сек...")
                time.sleep(args.delay)

        print("\n🎉 Все задачи завершены! Окно браузера остаётся открытым для финальной проверки.")
        input("Нажмите Enter для закрытия браузера...")
        context.close()


if __name__ == "__main__":
    main()
