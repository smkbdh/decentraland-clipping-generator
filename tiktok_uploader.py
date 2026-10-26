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
        viewport={"width": 1400, "height": 900},
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

    while True:
        current_url = page.url.lower()
        if "login" in current_url:
            print("\n⚠️ ВНИМАНИЕ: Требуется вход в TikTok!")
            print("👉 Войдите в свой аккаунт TikTok в открытом окне браузера.")
            print("⏳ Ожидание успешного входа...")
            try:
                page.wait_for_url(lambda u: "login" not in u.lower() and "upload" in u.lower(), timeout=180000)
                print("✅ Успешный вход обнаружен!")
                time.sleep(3)
                break
            except PlaywrightTimeoutError:
                print("⏳ Всё ещё ждём авторизацию в браузере...")
        else:
            try:
                page.wait_for_selector('input[type="file"][accept*="video"], button:has-text("Select video")', timeout=6000)
                print("✅ Сессия активна, страница загрузки готова!")
                break
            except PlaywrightTimeoutError:
                if "login" in page.url.lower():
                    continue
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
    print(f"📝 Описание:\n{caption}")
    print(f"==========================================")

    # Ensure on upload page
    if "tiktokstudio/upload" not in page.url:
        page.goto(TIKTOK_UPLOAD_URL, wait_until="domcontentloaded", timeout=60000)
        time.sleep(4)

    # Find file input
    print("📤 Выбираем видеофайл...")
    file_input = page.locator('input[type="file"][accept*="video"]').first
    try:
        file_input.wait_for(state="attached", timeout=15000)
        file_input.set_input_files(str(video_path))
    except Exception as e:
        print(f"❌ Ошибка выбора файла: {e}")
        return False

    print("⏳ Файл передан, ждём загрузку и появление редактора...")
    time.sleep(6)

    # Dismiss any tutorial / "Got it" tooltips
    try:
        got_it = page.locator('button:has-text("Got it"), button:has-text("Понятно")')
        if got_it.count() > 0 and got_it.first.is_visible():
            print("💡 Закрываем подсказку TikTok ('Got it')...")
            got_it.first.click()
            time.sleep(1)
    except Exception:
        pass

    # Fill caption in DraftEditor
    print("✍️ Заполняем описание ролика...")
    try:
        editor = page.locator('div.notranslate.public-DraftEditor-content, div[contenteditable="true"]').first
        editor.wait_for(state="visible", timeout=15000)
        editor.click()
        time.sleep(0.5)
        page.keyboard.press("Control+A")
        page.keyboard.press("Backspace")
        time.sleep(0.5)
        page.keyboard.insert_text(caption)
        time.sleep(1)
        print("✅ Описание успешно добавлено!")
    except Exception as e:
        print(f"⚠️ Ошибка ввода описания: {e}")

    # Wait for Post button to become enabled and ready
    print("⏳ Ожидание готовности кнопки 'Post' (проверка копирайта и загрузки)...")
    post_button = None
    
    # EXACT selector for the submit button (not sidebar "Posts" button!)
    for _ in range(60):
        # We target the primary action button with exact text 'Post' or 'Опубликовать'
        btn_candidates = page.locator('button.Button__root--type-primary, button[type="button"]')
        count = btn_candidates.count()
        for idx in range(count):
            candidate = btn_candidates.nth(idx)
            text = candidate.inner_text().strip()
            # Must be exactly 'Post' or 'Опубликовать', NOT 'Posts'!
            if text in ["Post", "Опубликовать", "Publish"]:
                if candidate.is_visible() and not candidate.is_disabled():
                    post_button = candidate
                    break
        if post_button:
            break
        time.sleep(2)

    if not post_button:
        print("⚠️ Кнопка 'Post' ещё недоступна.")
        if not auto_publish:
            input("Нажмите кнопку 'Post' вручную в браузере, затем нажмите Enter здесь...")
            return True
        return False

    post_button.scroll_into_view_if_needed()
    time.sleep(1)

    print("🚀 Нажимаем 'Post'...")
    post_button.click()
    print("⏳ Ожидаем подтверждения публикации...")

    # Wait for completion modal or upload another button
    success = False
    for _ in range(15):
        time.sleep(2)
        # Check if "Manage your posts" or "Upload another video" appeared
        upload_another = page.locator('button:has-text("Upload another video"), button:has-text("Upload another"), button:has-text("Загрузить другое видео")')
        if upload_another.count() > 0 and upload_another.first.is_visible():
            print(f"🎉 ВИДЕО #{index} УСПЕШНО ОПУБЛИКОВАНО В TIKTOK!")
            success = True
            upload_another.first.click()
            time.sleep(3)
            break
        
        # Check for success toast or modal
        modal_text = page.locator('div[role="dialog"], div[class*="modal"]')
        if modal_text.count() > 0 and "uploaded" in modal_text.first.inner_text().lower():
            print(f"🎉 ВИДЕО #{index} УСПЕШНО ОПУБЛИКОВАНО В TIKTOK!")
            success = True
            time.sleep(3)
            break

    if not success:
        print(f"✅ Видео #{index}: клик отправлен (проверьте статус в окне браузера).")

    return True


def main():
    parser = argparse.ArgumentParser(description="TikTok Automated Uploader with persistent profile")
    parser.add_argument("--login-only", action="store_true", help="Just open browser to log in to TikTok")
    parser.add_argument("--index", type=int, default=None, help="Upload specific video index (1-8)")
    parser.add_argument("--auto-publish", action="store_true", help="Automatically click Publish without manual prompt")
    parser.add_argument("--delay", type=int, default=15, help="Delay between video uploads in seconds")
    args = parser.parse_args()

    print("==========================================")
    print("   TIKTOK UPLOADER FOR DECENTRALAND CLIPS ")
    print("==========================================")

    with sync_playwright() as p:
        context = launch_browser(p)
        page = context.pages[0] if context.pages else context.new_page()

        check_and_wait_for_login(page)

        if args.login_only:
            print("\n🎉 Сессия сохранена в папку:", PROFILE_DIR)
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

        print("\n🎉 Все 8 видео обработаны!")
        print("👉 Проверьте загруженные посты в открытом окне браузера.")
        input("Нажмите Enter в этой консоли, когда закончите просмотр...")
        context.close()


if __name__ == "__main__":
    main()
