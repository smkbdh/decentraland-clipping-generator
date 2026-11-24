import asyncio
import os
from pathlib import Path
from playwright.async_api import async_playwright

BASE_DIR = Path(__file__).resolve().parent
PROFILE_DIR = BASE_DIR / "instagram_browser_profile_ai"

async def check():
    print("Проверяем сохраненную сессию Instagram в instagram_browser_profile_ai...")
    async with async_playwright() as p:
        ctx = await p.chromium.launch_persistent_context(
            str(PROFILE_DIR),
            headless=True,
            viewport={"width": 1280, "height": 900},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.pages[0] if ctx.pages else await ctx.new_page()
        
        await page.goto("https://www.instagram.com/", timeout=45000, wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        current_url = page.url
        print(f"Текущий URL: {current_url}")
        
        # Take screenshot
        screenshot_path = BASE_DIR / "instagram_ai_verified.png"
        await page.screenshot(path=str(screenshot_path))
        print(f"Скриншот сохранен: {screenshot_path}")
        
        # Check profile link
        try:
            profile_link = await page.evaluate('''() => {
                // Find profile link in sidebar / navigation
                const links = Array.from(document.querySelectorAll('a[href*="/"]'));
                for (const a of links) {
                    const href = a.getAttribute('href');
                    const text = a.innerText || '';
                    if (href && href.startsWith('/') && href.length > 2 && !['/', '/explore/', '/reels/', '/direct/inbox/', '/your_activity/'].includes(href)) {
                        if (text.includes('Профиль') || text.includes('Profile') || a.querySelector('img')) {
                            return href.replace(/\\//g, '');
                        }
                    }
                }
                return null;
            }''')
            print(f"Обнаружен аккаунт: @{profile_link}")
        except Exception as e:
            print(f"Ошибка извлечения username: {e}")
            profile_link = None
            
        await ctx.close()
        return current_url, profile_link

if __name__ == "__main__":
    asyncio.run(check())
