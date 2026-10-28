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

def launch_browser(p, headless=True):
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)
    context = p.chromium.launch_persistent_context(
        user_data_dir=str(PROFILE_DIR),
        headless=headless,
        viewport={"width": 1280, "height": 850},
        args=[
            "--disable-blink-features=AutomationControlled"
        ]
    )
    return context

def submit_single_url(page, clip_url):
    print(f"\n==========================================", flush=True)
    print(f"🎯 САБМИТ КЛИПА В CONTENT REWARDS:", flush=True)
    print(f"🔗 {clip_url}", flush=True)
    print(f"==========================================", flush=True)

    # 1. Ensure on campaign page
    if CAMPAIGN_URL not in page.url:
        print("1. Открываем страницу кампании...", flush=True)
        page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=45000)
        time.sleep(3)

    # 2. Click "Submit clip" button
    print("2. Ищем и нажимаем видимую кнопку 'Submit clip'...", flush=True)
    try:
        trigger = page.locator('button:has-text("Submit clip"):visible').first
        trigger.wait_for(state="visible", timeout=10000)
        trigger.click()
        time.sleep(2)
    except Exception as e:
        print(f"⚠️ Ошибка при открытии модального окна: {e}", flush=True)
        return False

    # 3. Fill URL
    print("3. Вводим ссылку в модальное окно...", flush=True)
    try:
        inp = page.locator('input[placeholder*="tiktok.com"]').first
        inp.wait_for(state="visible", timeout=10000)
        inp.click()
        inp.fill("")
        inp.fill(clip_url)
        print("✅ Ссылка вставлена! Ждём валидацию API...", flush=True)
    except Exception as e:
        print(f"❌ Поле ввода не найдено: {e}", flush=True)
        page.screenshot(path="submit_error_input.png")
        return False

    # 4. Wait for checks
    time.sleep(4)

    # 5. Check the agreement checkbox
    print("4. Проверяем чекбокс...", flush=True)
    try:
        chk = page.locator('label:has-text("I\'ve read the requirements"), input[type="checkbox"]').first
        if chk.is_visible():
            chk.click()
            time.sleep(1)
            print("✅ Чекбокс отмечен!", flush=True)
    except Exception as e:
        print(f"Примечание по чекбоксу: {e}", flush=True)

    page.screenshot(path="submit_ready_check.png")

    # 6. Click final Submit clip button
    modal_btn = page.locator('button:has-text("Submit clip"):visible').last
    is_disabled = modal_btn.is_disabled()
    print(f"Статус кнопки отправки: {'АКТИВНА' if not is_disabled else 'ЗАБЛОКИРОВАНА'}", flush=True)

    if not is_disabled:
        modal_btn.click()
        print("🚀 Нажата кнопка сабмита!", flush=True)
        time.sleep(5)
        page.screenshot(path="submit_success_screen.png")
        print("🎉 САБМИТ УСПЕШНО ЗАВЕРШЁН!", flush=True)
        return True
    else:
        print("❌ Кнопка сабмита не активна (возможно клип не прошёл валидацию или уже был отправлен)!", flush=True)
        page.screenshot(path="submit_failed_screen.png")
        # Close modal if open
        cancel_btn = page.locator('button:has-text("Cancel"):visible')
        if cancel_btn.count() > 0 and cancel_btn.first.is_visible():
            cancel_btn.first.click()
            time.sleep(1)
        return False

def submit_multiple(urls):
    results = {}
    with sync_playwright() as p:
        ctx = launch_browser(p, headless=True)
        page = ctx.new_page()
        page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=45000)
        time.sleep(3)

        for url in urls:
            success = submit_single_url(page, url)
            results[url] = success
            time.sleep(2)

        ctx.close()
    return results

def main():
    parser = argparse.ArgumentParser(description="Content Rewards Submitter")
    parser.add_argument("--url", type=str, help="Single URL to submit")
    parser.add_argument("--list", nargs="+", help="Multiple URLs to submit")
    args = parser.parse_args()

    if args.url:
        submit_multiple([args.url])
    elif args.list:
        submit_multiple(args.list)
    else:
        print("Usage: py content_rewards_submitter.py --url <tiktok_url>")

if __name__ == "__main__":
    main()
