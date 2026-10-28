import time
from playwright.sync_api import sync_playwright

CAMPAIGN_URL = "https://contentrewards.com/c/campaigns/78bd78e4-0ec3-44d7-9f56-122ff7c374bc"
TEST_URL = "https://www.tiktok.com/@buddah_ai/video/7701553804075945224"

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context(
        "rewards_browser_profile",
        headless=True,
        viewport={"width": 1280, "height": 850},
        args=["--disable-blink-features=AutomationControlled"]
    )
    page = ctx.new_page()
    page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=45000)
    time.sleep(3)

    # 1. Click visible Submit clip
    submit_btn = page.locator('button:has-text("Submit clip"):visible').first
    submit_btn.click()
    time.sleep(2)

    # 2. Find input and fill
    inp = page.locator('input[placeholder*="tiktok.com"]').first
    inp.click()
    inp.fill(TEST_URL)
    print("Filled URL! Waiting for validation...", flush=True)

    # Wait for checks to update
    for sec in range(10):
        time.sleep(1)
        # Check if green checkmark appears
    page.screenshot(path="rewards_modal_filled.png")

    # 3. Click checkbox
    chk = page.locator('label:has-text("I\'ve read the requirements"), input[type="checkbox"]').first
    if chk.is_visible():
        chk.click()
        time.sleep(1)
    
    page.screenshot(path="rewards_modal_ready_to_submit.png")

    # Check state of final Submit clip button
    modal_btn = page.locator('button:has-text("Submit clip"):visible').last
    print("Final Submit clip button enabled:", not modal_btn.is_disabled())

    # If enabled, let's submit!
    if not modal_btn.is_disabled():
        modal_btn.click()
        print("Clicked final Submit clip! Waiting 5s...", flush=True)
        time.sleep(5)
        page.screenshot(path="rewards_modal_after_submit.png")

    ctx.close()
