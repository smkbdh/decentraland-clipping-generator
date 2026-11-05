import sys
import codecs
import time
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach(), errors="replace")

BASE_DIR = Path(__file__).resolve().parent
REWARDS_PROFILE = BASE_DIR / "rewards_browser_profile"
CAMPAIGN_URL = "https://contentrewards.com/c/campaigns/7a73a53b-2bba-4a5c-8187-05534dd6716d"

def submit_url(page, clip_url, label):
    print(f"\n🎯 САБМИТ [{label}]: {clip_url}", flush=True)
    for attempt in range(3):
        try:
            page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=30000)
            time.sleep(2)
            break
        except Exception as e:
            print(f"⚠️ Переход (попытка {attempt+1}/3): {e}", flush=True)
            time.sleep(5)
    else:
        return False

    # Dismiss any blocking modals
    for btn_text in ["Not now", "Cancel", "Close"]:
        try:
            b = page.locator(f'button:has-text("{btn_text}")')
            if b.count() > 0 and b.first.is_visible():
                b.first.click()
                time.sleep(1)
        except Exception:
            pass

    try:
        trigger = page.locator('button:has-text("Submit clip"):visible').first
        trigger.wait_for(state="visible", timeout=10000)
        trigger.click()
        time.sleep(1.5)
    except Exception as e:
        print(f"❌ Ошибка кнопки Submit clip: {e}", flush=True)
        return False

    try:
        modal = page.locator('div[role="dialog"][aria-label="Submit clip"]').first
        inp = modal.locator('input').first
        inp.wait_for(state="visible", timeout=8000)
        inp.click()
        inp.fill("")
        inp.fill(clip_url)
        time.sleep(2)
    except Exception as e:
        print(f"❌ Ошибка ввода ссылки: {e}", flush=True)
        return False

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
        time.sleep(3)
        print(f"✅ УСПЕШНО ЗАСАБМИЧЕНО: {label}", flush=True)
        return True
    else:
        print(f"⚠️ Кнопка Submit заблокирована (возможно, уже засабмичен)!", flush=True)
        cancel_btn = modal.locator('button:has-text("Cancel"):visible')
        if cancel_btn.count() > 0 and cancel_btn.first.is_visible():
            cancel_btn.first.click()
        return "ALREADY_OR_BLOCKED"

if __name__ == "__main__":
    # Test with reel #1 from state
    ig = json.load(open(BASE_DIR / "instagram_orchestrator_state.json", encoding="utf-8"))
    reels = ig.get("published_reels", {})
    test_url = reels.get("1") or reels.get(1)
    print("Тестовый URL:", test_url)
    
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(REWARDS_PROFILE),
            headless=True,
            viewport={"width": 1280, "height": 850}
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        res = submit_url(page, test_url, "Reel #1")
        print("Результат сабмита:", res)
        ctx.close()
