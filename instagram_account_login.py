import asyncio
import os
import sys
from pathlib import Path
from playwright.async_api import async_playwright

BASE_DIR = Path(__file__).resolve().parent
PROFILE_DIR = BASE_DIR / "instagram_browser_profile_ai"

async def login(username, password):
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Попытка входа в Instagram для аккаунта: {username} ...")
    
    async with async_playwright() as p:
        ctx = await p.chromium.launch_persistent_context(
            str(PROFILE_DIR),
            headless=True,
            viewport={"width": 1280, "height": 900},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.pages[0] if ctx.pages else await ctx.new_page()
        
        await page.goto("https://www.instagram.com/accounts/login/", timeout=45000, wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        # Check inputs
        u_input = page.locator('input[name="username"]').first
        p_input = page.locator('input[name="password"]').first
        
        if await u_input.count() > 0:
            await u_input.fill(username)
            await asyncio.sleep(1)
            await p_input.fill(password)
            await asyncio.sleep(1)
            
            btn = page.locator('button[type="submit"]').first
            await btn.click()
            print("Форма отправлена, ожидаем ответа Instagram...")
            await asyncio.sleep(6)
            
            # Check if 2FA or verification required
            curr_url = page.url
            content = await page.content()
            
            # Save screenshot to check state
            screenshot_path = BASE_DIR / "instagram_login_state.png"
            await page.screenshot(path=str(screenshot_path))
            print(f"Скриншот состояния сохранен: {screenshot_path}")
            
            if "two_factor" in curr_url or "challenge" in curr_url or "checkpoint" in curr_url:
                print(f"⚠️ Требуется 2FA или код подтверждения (URL: {curr_url})")
            elif "accounts/login" not in curr_url:
                print(f"🟢 УСПЕШНЫЙ ВХОД! Аккаунт авторизован: {curr_url}")
            else:
                print(f"Состояние после входа: {curr_url}")
        else:
            print("Поля логина не найдены (возможно, уже авторизован)")
            
        await ctx.close()

if __name__ == "__main__":
    if len(sys.argv) >= 3:
        asyncio.run(login(sys.argv[1], sys.argv[2]))
    else:
        print("Использование: python instagram_account_login.py <username> <password>")
