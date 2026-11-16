import asyncio
import os
import sys
from pathlib import Path
from playwright.async_api import async_playwright

BASE_DIR = Path(__file__).resolve().parent
PROFILE_DIR = BASE_DIR / "youtube_browser_profile"

async def main():
    print(f"Запуск браузера для авторизации в YouTube Studio...")
    print(f"Профиль будет сохранен в: {PROFILE_DIR}")
    
    async with async_playwright() as p:
        context = await p.chromium.launch_persistent_context(
            user_data_dir=str(PROFILE_DIR),
            headless=False,
            channel="chrome",  # используем установленный Chrome если доступен, для надежности OAuth
            viewport=None,
            args=[
                "--start-maximized",
                "--disable-blink-features=AutomationControlled"
            ]
        )
        page = context.pages[0] if context.pages else await context.new_page()
        
        print("\nПереходим на https://studio.youtube.com ...")
        await page.goto("https://studio.youtube.com", wait_until="domcontentloaded")
        
        print("\nПожалуйста, выполните вход в свой Google аккаунт и выберите нужный канал (AI-продукты / AI Будда).")
        print("Скрипт ожидает, пока откроется панель управления каналом YouTube Studio...")
        
        # Ожидаем пока в URL появится channel или studio загрузится
        while True:
            await asyncio.sleep(3)
            current_url = page.url
            # Проверяем, зашел ли пользователь в YouTube Studio
            if "studio.youtube.com/channel/" in current_url or "studio.youtube.com/video/" in current_url:
                print(f"\n Авторизация успешна! URL: {current_url}")
                # Дадим еще 5 секунд на сохранение куков и токенов
                await asyncio.sleep(5)
                # Делаем скриншот подтверждения
                screenshot_path = BASE_DIR / "youtube_studio_logged_in.png"
                await page.screenshot(path=str(screenshot_path))
                print(f"Скриншот сохранен: {screenshot_path}")
                break
            
            # Также проверяем наличие аватара или элементов студии
            try:
                avatar = page.locator('#avatar-btn, ytcp-app, ytd-topbar-logo-renderer')
                if await avatar.count() > 0 and "accounts.google.com" not in current_url:
                    print(f"\n Обнаружена панель YouTube Studio! URL: {current_url}")
                    await asyncio.sleep(5)
                    screenshot_path = BASE_DIR / "youtube_studio_logged_in.png"
                    await page.screenshot(path=str(screenshot_path))
                    print(f"Скриншот сохранен: {screenshot_path}")
                    break
            except Exception:
                pass
                
        print("\n Канал успешно подключен! Сессия сохранена в youtube_browser_profile.")
        await context.close()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as e:
        # Fallback без channel='chrome' если хром не найден
        if "chrome" in str(e).lower():
            async def fallback():
                async with async_playwright() as p:
                    context = await p.chromium.launch_persistent_context(
                        user_data_dir=str(PROFILE_DIR),
                        headless=False,
                        viewport=None,
                        args=["--start-maximized", "--disable-blink-features=AutomationControlled"]
                    )
                    page = context.pages[0] if context.pages else await context.new_page()
                    await page.goto("https://studio.youtube.com", wait_until="domcontentloaded")
                    print("Ожидание входа в YouTube Studio...")
                    while True:
                        await asyncio.sleep(3)
                        if "studio.youtube.com" in page.url and "accounts.google.com" not in page.url:
                            print(f"Авторизовано: {page.url}")
                            await asyncio.sleep(5)
                            break
                    await context.close()
            asyncio.run(fallback())
        else:
            raise e
