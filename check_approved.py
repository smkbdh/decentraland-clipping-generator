import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context('rewards_browser_profile', headless=True, viewport={'width': 1280, 'height': 850})
    page = ctx.new_page()
    page.goto('https://contentrewards.com/c/campaigns/7a73a53b-2bba-4a5c-8187-05534dd6716d', wait_until='domcontentloaded', timeout=45000)
    time.sleep(3)
    tab = page.locator('button:has-text("Approved clips"), div[role="tab"]:has-text("Approved clips"), span:has-text("Approved clips")').last
    if tab.is_visible():
        tab.click()
        time.sleep(3)
    page.screenshot(path='campaign_approved_clips.png')
    
    links = page.locator('a[href*="tiktok.com"], a[href*="instagram.com"]').all()
    print('Approved clips count:', len(links))
    for a in links[:10]:
        print(a.get_attribute('href'))
    ctx.close()
