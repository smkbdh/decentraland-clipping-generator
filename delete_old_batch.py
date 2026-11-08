import sys
sys.stdout.reconfigure(encoding='utf-8')
import json
import time
from pathlib import Path
from playwright.sync_api import sync_playwright
from instagrapi import Client

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
INSTA_PROFILE = BASE_DIR / "instagram_browser_profile"
PROXIES = "http://modeler_gZoM0l:01gngx0cg2f1@45.128.156.22:10641"
STATE_FILE = BASE_DIR / "music_batch_30_girls_state.json"

def get_sessionid():
    sessionid = None
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(user_data_dir=str(INSTA_PROFILE), channel="chrome", headless=True)
        cookies = ctx.cookies("https://www.instagram.com")
        ctx.close()
        for c in cookies:
            if c["name"] == "sessionid":
                sessionid = c["value"]
                break
    return sessionid

def delete_all_previous_reels():
    if not STATE_FILE.exists():
        print("Файл состояния не найден.")
        return

    with open(STATE_FILE, "r", encoding="utf-8") as f:
        state = json.load(f)

    published = state.get("published", {})
    if not published:
        print("Нет опубликованных роликов для удаления.")
        return

    sessionid = get_sessionid()
    if not sessionid:
        print("❌ Ошибка: sessionid не найден. Требуется авторизация.")
        return False

    cl = Client(proxy=PROXIES)
    cl.delay_range = [1, 3]
    cl.login_by_sessionid(sessionid)
    print(f"✅ Авторизован в Instagram API! Найдено {len(published)} роликов для удаления.")

    deleted_count = 0
    for idx_str, item in list(published.items()):
        media_id = item.get("media_id")
        code = item.get("code")
        url = item.get("reel_url")
        print(f"🗑️ Удаление Reel #{idx_str} ({code})...", end=" ", flush=True)
        try:
            res = cl.media_delete(media_id)
            if res:
                print("✅ Удалено!", flush=True)
                deleted_count += 1
            else:
                print("⚠️ Ответ false", flush=True)
        except Exception as e:
            print(f"❌ Ошибка удаления: {e}", flush=True)
        time.sleep(1.5)

    print(f"\n🎉 Всего удалено {deleted_count}/{len(published)} рилсов.")
    # Reset state
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump({"published": {}}, f, indent=2)
    print("✅ Файл состояния music_batch_30_girls_state.json сброшен.")
    return True

if __name__ == "__main__":
    delete_all_previous_reels()
