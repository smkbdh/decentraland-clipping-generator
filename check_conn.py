import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context('rewards_browser_profile', headless=True, viewport={'width': 1280, 'height': 850})
    page = ctx.new_page()
    page.goto('https://contentrewards.com/c/settings', wait_until='domcontentloaded', timeout=45000)
    time.sleep(3)
    btn = page.locator('button:has-text("Connected accounts")').last
    btn.click()
    time.sleep(3)
    page.screenshot(path='rewards_connected_accounts.png')
    ctx.close()
