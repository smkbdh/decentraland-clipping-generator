import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context(
        'tiktok_browser_profile',
        headless=True,
        viewport={'width': 1280, 'height': 850}
    )
    page = ctx.new_page()
    page.goto('https://www.tiktok.com/tiktokstudio/content', wait_until='domcontentloaded', timeout=45000)
    time.sleep(6)
    page.screenshot(path='tiktok_content_status_check.png')
    
    # Check page text snippet
    content = page.content()
    print("Page title:", page.title())
    print("Page URL:", page.url)
    
    # Find any warning or restriction banners
    banners = page.locator('div[role="alert"], div:has-text("Community Guidelines"), div:has-text("Review"), div:has-text("Only you")').all_inner_texts()
    if banners:
        print("Banners found:", banners[:3])
    else:
        print("No restriction banners found.")
        
    ctx.close()
