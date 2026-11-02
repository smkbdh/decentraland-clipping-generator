import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})
    page.goto('https://docs.google.com/document/d/1U2UzY4VY4Dkpz9aSQ3f8_jCmVEHpaYikHJdfLVbPHlA/edit', wait_until='networkidle', timeout=60000)
    time.sleep(5)
    page.screenshot(path='gdoc_screenshot.png')
    
    # Check text elements
    text = page.locator('.kix-appview-editor').inner_text() if page.locator('.kix-appview-editor').count() > 0 else ""
    print("Editor text length:", len(text))
    browser.close()
