import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context('rewards_browser_profile', headless=True, viewport={'width': 1280, 'height': 850})
    page = ctx.new_page()
    page.goto('https://contentrewards.com/c/campaigns/7a73a53b-2bba-4a5c-8187-05534dd6716d', wait_until='domcontentloaded', timeout=45000)
    time.sleep(3)
    btn = page.locator('a:has-text("View profile"), button:has-text("View profile")').first
    href = btn.get_attribute('href')
    print('View profile href:', href)
    if href:
        url = 'https://contentrewards.com' + href if href.startswith('/') else href
        page.goto(url, wait_until='domcontentloaded')
        time.sleep(3)
        page.screenshot(path='clipping_culture_profile.png')
        with open('clipping_culture_text.txt', 'w', encoding='utf-8') as f:
            f.write(page.inner_text('body'))
        print("Saved profile text!")
    ctx.close()
