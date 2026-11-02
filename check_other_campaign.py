import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context('rewards_browser_profile', headless=True, viewport={'width': 1280, 'height': 850})
    page = ctx.new_page()
    page.goto('https://contentrewards.com/clipping-culture', wait_until='domcontentloaded')
    time.sleep(3)
    links = page.locator('a[href*="/campaigns/"]').all()
    for l in links:
        print(l.inner_text().replace('\n', ' | '), '->', l.get_attribute('href'))
    ctx.close()
