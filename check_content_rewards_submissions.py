import asyncio
import os
from playwright.async_api import async_playwright

USER_DATA_DIR = os.path.abspath("rewards_browser_profile")
ARTIFACT_DIR = r"C:\Users\humun\.gemini\antigravity\brain\6c34c86a-df7c-453b-80e4-19ab331d7d1d"

async def main():
    async with async_playwright() as p:
        context = await p.chromium.launch_persistent_context(
            user_data_dir=USER_DATA_DIR,
            headless=True,
            viewport={"width": 1400, "height": 1000}
        )
        page = context.pages[0] if context.pages else await context.new_page()
        await page.goto("https://contentrewards.com/c/submissions", wait_until="networkidle", timeout=60000)
        await asyncio.sleep(4)
        
        # Click on "All campaigns" filter dropdown if available
        try:
            campaign_filter = page.locator('button:has-text("All campaigns")')
            if await campaign_filter.is_visible():
                await campaign_filter.click()
                await asyncio.sleep(1)
                # Click Ring Drone
                ring_option = page.locator('div[role="option"]:has-text("Ring"), span:has-text("Ring"), [role="menuitem"]:has-text("Ring")')
                if await ring_option.count() > 0:
                    await ring_option.first.click()
                    await asyncio.sleep(3)
        except Exception as e:
            print(f"Filter error: {e}")

        screenshot_path = os.path.join(ARTIFACT_DIR, "ring_drone_submissions_filtered.png")
        await page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        # Extract all titles / subtitles visible
        cards = await page.evaluate('''() => {
            const elements = document.querySelectorAll('div');
            const texts = [];
            document.querySelectorAll('a, button, p, span, h3, h4').forEach(el => {
                const t = el.innerText ? el.innerText.trim() : '';
                if (t.includes('Ring - Drone') || t.includes('flies around') || t.includes('robotics') || t.includes('Autonomous') || t.includes('First look') || t.includes('security forever') || t.includes('talking about')) {
                    texts.push(t);
                }
            });
            return Array.from(new Set(texts));
        }''')
        print("Detected cards/texts:")
        for t in cards:
            print(" -", t)

        await context.close()

if __name__ == "__main__":
    asyncio.run(main())
