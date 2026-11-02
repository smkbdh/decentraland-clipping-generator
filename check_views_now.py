import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context('tiktok_browser_profile', headless=True, viewport={'width': 1280, 'height': 850})
    page = ctx.new_page()
    page.goto('https://www.tiktok.com/tiktokstudio/content', wait_until='domcontentloaded', timeout=45000)
    time.sleep(6)
    page.screenshot(path='tiktok_studio_today_stats.png')
    
    rows = page.locator('tr').all_inner_texts()
    print(f"Detected {len(rows)} table rows:")
    for r in rows[:8]:
        print(" | ".join([part.strip() for part in r.split("\n") if part.strip()]))
    ctx.close()
