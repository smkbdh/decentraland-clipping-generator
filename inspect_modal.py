import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context('rewards_browser_profile', headless=True, viewport={'width': 1280, 'height': 850})
    page = ctx.new_page()
    page.goto('https://contentrewards.com/c/campaigns/7a73a53b-2bba-4a5c-8187-05534dd6716d', wait_until='domcontentloaded', timeout=45000)
    time.sleep(3)
    page.locator('button:has-text("Submit clip"):visible').first.click()
    time.sleep(2)
    page.screenshot(path='rewards_submit_modal_inspect.png')
    text = page.locator('div[role="dialog"]').inner_text()
    with open('modal_text.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Modal inspected successfully!")
    ctx.close()
