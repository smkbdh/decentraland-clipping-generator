import time
from pathlib import Path
from playwright.sync_api import sync_playwright

profile_dir = Path("tiktok_browser_profile").resolve()

def show():
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            str(profile_dir),
            headless=False,
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        print("Открываем TikTok Studio в видимом окне...")
        page.goto("https://www.tiktok.com/tiktokstudio/content", wait_until="domcontentloaded")
        
        print("\nБраузер открыт! Посмотрите на список видео.")
        print("Для каждого видео справа есть кнопка 'Поделиться' / иконка со стрелочкой -> 'Скопировать ссылку'.")
        print("Когда закончите, нажмите Enter здесь в терминале.")
        input("Нажмите Enter, чтобы закрыть окно...")
        ctx.close()

if __name__ == "__main__":
    show()
