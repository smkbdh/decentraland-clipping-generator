import sys
import codecs
import time
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

profile_dir = Path("tiktok_browser_profile").resolve()

def get_links():
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            str(profile_dir),
            headless=True,
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.new_page()
        
        print("Navigating to TikTok Studio Content...", flush=True)
        page.goto("https://www.tiktok.com/tiktokstudio/content", wait_until="domcontentloaded", timeout=45000)
        time.sleep(6)
        
        print("Current URL:", page.url, flush=True)
        page.screenshot(path="tiktok_content_page.png")
        
        # Save page text/links to file
        links = page.eval_on_selector_all('a', 'elements => elements.map(e => e.href)')
        print(f"Total links: {len(links)}", flush=True)
        
        # Check table rows / video cards
        # TikTok Studio usually has rows with video item
        cards = page.query_selector_all('div[class*="video-item"], div[class*="table-row"], tr')
        print(f"Rows/cards found: {len(cards)}", flush=True)
        
        # Look for links containing /video/
        video_links = set([l for l in links if "/video/" in l])
        
        # In TikTok Studio, video title or thumbnail is often clickable or has a link
        html = page.content()
        with open("tiktok_studio_page.html", "w", encoding="utf-8") as f:
            f.write(html)
            
        found_ids = set(re.findall(r'/video/(\d+)', html))
        print("Found video IDs in HTML:", found_ids, flush=True)
        
        # Also check user handle
        user_matches = set(re.findall(r'tiktok\.com/@([a-zA-Z0-9_\.]+)', html))
        print("Found usernames:", user_matches, flush=True)
        
        # If user has an @ username, construct links
        valid_users = [u for u in user_matches if u not in ["tiktok", "decentraland_fdn", "decentraland_foundation"]]
        if valid_users and found_ids:
            u = valid_users[0]
            for vid in found_ids:
                video_links.add(f"https://www.tiktok.com/@{u}/video/{vid}")
                
        print(f"\nExtracted video links ({len(video_links)}):", flush=True)
        with open("TIKTOK_PUBLISHED_LINKS.txt", "w", encoding="utf-8") as f:
            for vl in sorted(list(video_links)):
                print(vl, flush=True)
                f.write(vl + "\n")
                
        ctx.close()

if __name__ == "__main__":
    get_links()
