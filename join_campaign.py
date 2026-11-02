import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context('rewards_browser_profile', headless=True, viewport={'width': 1280, 'height': 850})
    page = ctx.new_page()
    page.goto('https://contentrewards.com/c/campaigns/341ea599-d017-4ba2-be61-a29a2e754aaf', wait_until='domcontentloaded')
    time.sleep(3)
    btn = page.locator('button:has-text("Join Campaign"):visible').first
    btn.click()
    time.sleep(4)
    page.screenshot(path='after_join_click.png')
    
    # Check reference materials links now
    links = page.locator('a').all()
    for l in links:
        h = l.get_attribute('href')
        t = l.inner_text().strip()
        if h and any(k in h for k in ['docs.google', 'drive.google', 'mediasilo', 'dropbox', 'review']):
            print(t, '->', h)
    ctx.close()
