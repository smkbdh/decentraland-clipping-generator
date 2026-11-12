import asyncio
import os
import sys
from playwright.async_api import async_playwright

CAMPAIGN_URL = "https://contentrewards.com/c/campaigns/42086467-e927-4418-92e1-b6a5700ccc57"
USER_DATA_DIR = os.path.abspath("rewards_browser_profile")
ARTIFACT_DIR = r"C:\Users\humun\.gemini\antigravity\brain\6c34c86a-df7c-453b-80e4-19ab331d7d1d"

CLIPS = [
    ("Clip 1", "https://www.tiktok.com/@buddah_ai/video/7707129557484080391"),
    ("Clip 2", "https://www.tiktok.com/@buddah_ai/video/7707129787956858120"),
    ("Clip 3", "https://www.tiktok.com/@buddah_ai/video/7707130050566442258"),
]

async def submit_clip(page, label, url):
    print(f"\n--- Submitting {label}: {url} ---")
    await page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=45000)
    await asyncio.sleep(4)

    trigger = page.locator('button:has-text("Submit clip"):visible').first
    if not await trigger.is_visible():
        print("Submit button not found on campaign page!")
        return False
    await trigger.click()
    await asyncio.sleep(3)

    inp = page.locator('input[placeholder*="link"], input[placeholder*="Link"], input[placeholder*="Paste"]').first
    await inp.wait_for(state="visible", timeout=10000)
    await inp.click()
    await inp.fill("")
    await inp.fill(url)
    await asyncio.sleep(3)

    # Check checkbox
    chk = page.locator('label:has-text("I\'ve read the requirements"), input[type="checkbox"]').first
    if await chk.is_visible():
        # Check if already checked
        is_checked = await chk.is_checked() if chk.get_attribute("type") == "checkbox" else False
        if not is_checked:
            await chk.click()
            await asyncio.sleep(1)

    modal_btn = page.locator('button:has-text("Submit clip"):visible').last
    btn_disabled = await modal_btn.is_disabled()
    print(f"Modal submit button disabled: {btn_disabled}")
    
    # Take screenshot before clicking
    await page.screenshot(path=os.path.join(ARTIFACT_DIR, f"submit_{label}_modal.png"))

    if not btn_disabled:
        await modal_btn.click()
        await asyncio.sleep(5)
        print(f"Submitted {label} successfully!")
        return True
    else:
        # Check if there is an error message
        err_elem = page.locator('div[class*="error"], p[class*="error"], span[class*="error"], div[role="alert"]')
        if await err_elem.count() > 0:
            err_text = await err_elem.first.inner_text()
            print(f"Validation error: {err_text}")
        return False

async def main():
    async with async_playwright() as p:
        context = await p.chromium.launch_persistent_context(
            user_data_dir=USER_DATA_DIR,
            headless=True,
            viewport={"width": 1280, "height": 850},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = context.pages[0] if context.pages else await context.new_page()

        for label, url in CLIPS:
            success = await submit_clip(page, label, url)
            print(f"Result for {label}: {success}")
            await asyncio.sleep(3)

        await context.close()

if __name__ == "__main__":
    asyncio.run(main())
