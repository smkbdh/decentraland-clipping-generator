import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context('rewards_browser_profile', headless=True, viewport={'width': 1280, 'height': 850})
    page = ctx.new_page()
    page.goto('https://contentrewards.com/c/campaigns/7a73a53b-2bba-4a5c-8187-05534dd6716d', wait_until='domcontentloaded', timeout=45000)
    time.sleep(3)
    sm = page.locator('button:has-text("Show more"), span:has-text("Show more")').first
    if sm.is_visible():
        sm.click()
        time.sleep(1)

    page.screenshot(path='campaign_expanded.png')
    all_text = page.inner_text('body')
    with open('campaign_full_text.txt', 'w', encoding='utf-8') as f:
        f.write(all_text)
    print("Full text saved!")
    ctx.close()
