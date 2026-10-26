import time
from pathlib import Path
from playwright.sync_api import sync_playwright

profile_dir = Path("tiktok_browser_profile").resolve()

def check_profile():
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            str(profile_dir),
            headless=True,
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.new_page()
        page.goto("https://www.tiktok.com/@buddah_ai", wait_until="domcontentloaded", timeout=45000)
        time.sleep(6)
        page.screenshot(path="buddah_profile.png")
        
        # Extract links
        links = page.query_selector_all('a[href*="/video/"]')
        found = []
        for l in links:
            href = l.get_attribute("href")
            if href and href not in found:
                found.append(href)
                
        print(f"Total videos on @buddah_ai: {len(found)}")
        for f in found:
            print("👉", f)
            
        ctx.close()

if __name__ == "__main__":
    check_profile()
