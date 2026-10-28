import argparse
import sys
import codecs
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

BASE_DIR = Path(__file__).resolve().parent
PROFILE_DIR = BASE_DIR / "rewards_browser_profile"
CAMPAIGN_URL = "https://contentrewards.com/c/campaigns/78bd78e4-0ec3-44d7-9f56-122ff7c374bc"

def launch_browser(p, headless=False):
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)
    context = p.chromium.launch_persistent_context(
        user_data_dir=str(PROFILE_DIR),
        headless=headless,
        viewport={"width": 1366, "height": 900},
        args=[
            "--disable-blink-features=AutomationControlled",
            "--start-maximized"
        ]
    )
    return context

def check_login(page):
    # Check if login or sign in button is present or if user profile is visible
    page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=45000)
    time.sleep(3)

def submit_clip(page, clip_url):
    print(f"\n==========================================")
    print(f"🎯 САБМИТ КЛИПА В CONTENT REWARDS:")
    print(f"🔗 {clip_url}")
    print(f"==========================================")

    # 1. Go to campaign page
    if page.url != CAMPAIGN_URL:
        print("1. Открываем страницу кампании...")
        page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=45000)
        time.sleep(3)

    # 2. Click "Submit clip" button on the campaign page
    print("2. Ищем и нажимаем кнопку 'Submit clip' на странице кампании...")
    submit_trigger = page.locator('button:has-text("Submit clip"), a:has-text("Submit clip")').first
    try:
        submit_trigger.wait_for(state="visible", timeout=15000)
        submit_trigger.click()
        time.sleep(2)
    except Exception as e:
        print(f"⚠️ Ошибка клика по триггеру Submit clip: {e}")

    # 3. Enter URL into the modal input
    print("3. Вводим ссылку на клик в поле ввода...")
    try:
        # Input inside the submit modal
        input_box = page.locator('input[placeholder*="http"], input[type="text"], input[type="url"]').first
        input_box.wait_for(state="visible", timeout=15000)
        input_box.click()
        time.sleep(0.3)
        input_box.fill("")
        time.sleep(0.3)
        input_box.fill(clip_url)
        time.sleep(2)
        print("✅ Ссылка вставлена, ожидаем проверку привязанного аккаунта...")
    except Exception as e:
        print(f"❌ Ошибка ввода ссылки: {e}")
        page.screenshot(path="submit_error_input.png")
        return False

    # 4. Wait for checks (e.g. green checkmark on "Posted from one of your linked accounts")
    time.sleep(4)
    page.screenshot(path="submit_step_checks.png")

    # 5. Check the agreement checkbox
    print("4. Ставим галочку согласия с требованиями...")
    try:
        checkbox = page.locator(
            'input[type="checkbox"], '
            'button[role="checkbox"], '
            'div[role="checkbox"], '
            'span:has-text("I\'ve read the requirements"), '
            'label:has-text("I\'ve read the requirements")'
        ).first
        if checkbox.is_visible():
            checkbox.click()
            time.sleep(1)
            print("✅ Чекбокс отмечен!")
    except Exception as e:
        print(f"Примечание по чекбоксу: {e}")

    # 6. Click the orange "Submit clip" button inside modal
    print("5. Нажимаем финальную кнопку 'Submit clip'...")
    try:
        modal_submit = page.locator(
            'div[role="dialog"] button:has-text("Submit clip"), '
            'div[role="dialog"] button:has-text("Submit"), '
            'button.bg-orange-500, '
            'button:has-text("Submit clip")'
        ).last
        modal_submit.wait_for(state="visible", timeout=10000)
        modal_submit.click()
        print("🚀 Кнопка сабмита нажата! Ждём подтверждение...")
        time.sleep(4)
    except Exception as e:
        print(f"❌ Ошибка нажатия финального Submit: {e}")
        page.screenshot(path="submit_error_button.png")
        return False

    page.screenshot(path="submit_step_done.png")
    print("🎉 КЛИП УСПЕШНО ОТПРАВЛЕН В CONTENT REWARDS!")
    return True


def main():
    parser = argparse.ArgumentParser(description="Content Rewards Clip Submitter")
    parser.add_argument("--login-only", action="store_true", help="Open browser to log in to Content Rewards")
    parser.add_argument("--url", type=str, help="Single clip URL to submit")
    parser.add_argument("--headed", action="store_true", help="Run browser in visible mode")
    args = parser.parse_args()

    print("==========================================")
    print("   CONTENT REWARDS AUTOMATED SUBMITTER    ")
    print("==========================================")

    with sync_playwright() as p:
        context = launch_browser(p, headless=not (args.headed or args.login_only))
        page = context.pages[0] if context.pages else context.new_page()

        if args.login_only:
            print("\n🌐 Открываем страницу кампании Content Rewards...")
            page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=60000)
            print("\n" + "=" * 65)
            print("👉 ОКНО БРАУЗЕРА ОТКРЫТО!")
            print("1. Войдите в свой аккаунт Content Rewards в открывшемся окне.")
            print("2. Как только вошли — вернитесь сюда и нажмите Enter.")
            print("=" * 65 + "\n")
            input("Нажмите Enter в этой консоли ПОСЛЕ успешного входа...")
            time.sleep(2)
            page.screenshot(path="rewards_logged_in.png")
            print("\n🎉 Сессия Content Rewards успешно сохранена в:", PROFILE_DIR)
            context.close()
            return

        if args.url:
            submit_clip(page, args.url)
            time.sleep(3)

        context.close()


if __name__ == "__main__":
    main()
