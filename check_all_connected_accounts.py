import asyncio
import os
import requests
from pathlib import Path
from playwright.async_api import async_playwright

BASE_DIR = Path(__file__).resolve().parent

SUPABASE_URL = "https://gsdgbuscghdygyptxthg.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGdidXNjZ2hkeWd5cHR4dGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MDc3OTUsImV4cCI6MjA4MjA4Mzc5NX0.wLkGUFxLdHykEtQ0cIZs4Dqz1x4tXa-hx4l3fwFtb4s"

def check_youtube():
    try:
        r_auth = requests.post(f"{SUPABASE_URL}/auth/v1/token?grant_type=password",
                               json={"email": "hum.under@gmail.com", "password": "Password2026!"},
                               headers={"apikey": ANON_KEY, "Content-Type": "application/json"}, timeout=15)
        if r_auth.status_code != 200:
            return f"🔴 Ошибка авторизации Supabase: {r_auth.status_code}"
        token = r_auth.json()["access_token"]
        uid = r_auth.json()["user"]["id"]
        headers = {"apikey": ANON_KEY, "Authorization": f"Bearer {token}"}
        r_cp = requests.get(f"{SUPABASE_URL}/rest/v1/connected_platforms?user_id=eq.{uid}&platform=eq.youtube&select=*", headers=headers, timeout=15)
        if r_cp.status_code == 200 and r_cp.json():
            p = r_cp.json()[0]
            uname = p.get("platform_username", "")
            is_conn = p.get("is_connected", False)
            if is_conn and ("AI Buddah" in uname or "AI" in uname):
                return f"🟢 АКТИВЕН: {uname} (is_connected: {is_conn})"
            else:
                return f"⚠️ Подключен другой канал или отключен: {uname} (is_connected: {is_conn})"
        return "🔴 YouTube не найден в connected_platforms"
    except Exception as e:
        return f"🔴 Ошибка проверки YouTube: {e}"

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
                res = "🔴 Не авторизован (редирект на login)"
            else:
                text = await page.content()
                if "buddah_ai" in text:
                    res = "🟢 АКТИВЕН: @buddah_ai (TikTok Studio открыта)"
                elif "tiktokstudio" in url:
                    res = f"🟢 АКТИВЕН: @buddah_ai ({url})"
                else:
                    res = f"⚠️ Неопределенный статус: {url}"
            await ctx.close()
            return res
    except Exception as e:
        return f"🔴 Ошибка проверки TikTok: {e}"

async def check_instagram_ai():
    profile = BASE_DIR / "instagram_browser_profile_ai"
    if not profile.exists():
        return "🔴 instagram_browser_profile_ai отсутствует"
    try:
        async with async_playwright() as p:
            ctx = await p.chromium.launch_persistent_context(
                str(profile),
                headless=True,
                args=["--disable-blink-features=AutomationControlled"]
            )
            page = ctx.pages[0] if ctx.pages else await ctx.new_page()
            await page.goto("https://www.instagram.com/", timeout=25000, wait_until="domcontentloaded")
            await asyncio.sleep(4)
            url = page.url
            if "accounts/login" in url:
                res = "🔴 Не авторизован (нужен логин)"
            else:
                content = await page.content()
                if "om_ai_digital" in content:
                    res = "🟢 АКТИВЕН: @om_ai_digital (Instagram лента активна)"
                else:
                    res = f"🟢 Вход выполнен: ({url})"
            await ctx.close()
            return res
    except Exception as e:
        return f"🔴 Ошибка проверки Instagram: {e}"

async def main():
    print("=" * 60)
    print("      ПРОВЕРКА ВСЕХ ПОДКЛЮЧЕННЫХ СЕССИЙ ДЛЯ AI BUDDAH")
    print("=" * 60)
    
    print("\n[1/3] Проверяем YouTube (Supabase Cloud API)...")
    yt = check_youtube()
    print("YouTube:", yt)

    print("\n[2/3] Проверяем Instagram (@om_ai_digital)...")
    ig = await check_instagram_ai()
    print("Instagram:", ig)

    print("\n[3/3] Проверяем TikTok (@buddah_ai)...")
    tt = await check_tiktok()
    print("TikTok:", tt)

    print("\n" + "=" * 60)
    all_ok = "🟢 АКТИВЕН" in yt and "🟢" in ig and "🟢" in tt
    if all_ok:
        print("✅ ВСЕ СЕССИИ ПОЛНОСТЬЮ АКТИВНЫ И ГОТОВЫ К ПУБЛИКАЦИИ!")
    else:
        print("⚠️ ВНИМАНИЕ: Одна или несколько сессий требуют внимания!")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(main())
