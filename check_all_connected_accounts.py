import asyncio
import os
from pathlib import Path
from playwright.async_api import async_playwright

BASE_DIR = Path(__file__).resolve().parent

async def check_tiktok():
    profile = BASE_DIR / "tiktok_browser_profile"
    if not profile.exists():
        return "tiktok_browser_profile отсутствует"
    try:
        async with async_playwright() as p:
            ctx = await p.chromium.launch_persistent_context(
                str(profile),
                headless=True,
                args=["--disable-blink-features=AutomationControlled"]
            )
            page = ctx.pages[0] if ctx.pages else await ctx.new_page()
            await page.goto("https://www.tiktok.com/tiktokstudio/content", timeout=25000, wait_until="domcontentloaded")
            await asyncio.sleep(4)
            url = page.url
            if "login" in url:
                res = "Не авторизован (редирект на login)"
            else:
                # check username
                text = await page.content()
                if "buddah_ai" in text:
                    res = "🟢 АКТИВЕН: @buddah_ai (TikTok Studio открыта)"
                elif "tiktokstudio" in url:
                    res = f"🟢 АКТИВЕН: Вход выполнен ({url})"
                else:
                    res = f"⚠️ Неопределенный статус: {url}"
            await ctx.close()
            return res
    except Exception as e:
        return f"Ошибка проверки TikTok: {e}"

async def check_rewards():
    profile = BASE_DIR / "rewards_browser_profile"
    if not profile.exists():
        return "rewards_browser_profile отсутствует"
    try:
        async with async_playwright() as p:
            ctx = await p.chromium.launch_persistent_context(
                str(profile),
                headless=True,
                args=["--disable-blink-features=AutomationControlled"]
            )
            page = ctx.pages[0] if ctx.pages else await ctx.new_page()
            await page.goto("https://contentrewards.com/c/submissions", timeout=25000, wait_until="domcontentloaded")
            await asyncio.sleep(4)
            url = page.url
            if "login" in url or "auth" in url:
                res = "Не авторизован (редирект на login)"
            else:
                text = await page.content()
                if "digitalbuddah" in text:
                    res = "🟢 АКТИВЕН: digitalbuddah (Content Rewards подключен)"
                elif "submissions" in url:
                    res = f"🟢 АКТИВЕН: Вход выполнен ({url})"
                else:
                    res = f"⚠️ Неопределенный статус: {url}"
            await ctx.close()
            return res
    except Exception as e:
        return f"Ошибка проверки Rewards: {e}"

async def check_instagram():
    profile = BASE_DIR / "instagram_browser_profile"
    profile_kiraa = BASE_DIR / "instagram_browser_profile_kiraa"
    results = []
    for p_dir, label in [(profile, "main"), (profile_kiraa, "kiraa")]:
        if not p_dir.exists():
            results.append(f"{label}: отсутствует")
            continue
        try:
            async with async_playwright() as p:
                ctx = await p.chromium.launch_persistent_context(
                    str(p_dir),
                    headless=True,
                    args=["--disable-blink-features=AutomationControlled"]
                )
                page = ctx.pages[0] if ctx.pages else await ctx.new_page()
                await page.goto("https://www.instagram.com/", timeout=25000, wait_until="domcontentloaded")
                await asyncio.sleep(4)
                url = page.url
                if "accounts/login" in url:
                    results.append(f"{label}: 🔴 Не авторизован (нужен логин)")
                else:
                    content = await page.content()
                    results.append(f"{label}: 🟢 Вход выполнен ({url})")
                await ctx.close()
        except Exception as e:
            results.append(f"{label}: Ошибка {e}")
    return " | ".join(results)

async def main():
    print("Проверяем TikTok...")
    tt = await check_tiktok()
    print("TikTok:", tt)

    print("\nПроверяем Content Rewards...")
    rw = await check_rewards()
    print("Content Rewards:", rw)

    print("\nПроверяем Instagram...")
    ig = await check_instagram()
    print("Instagram:", ig)

if __name__ == "__main__":
    asyncio.run(main())
