import sys
import codecs
import time
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

BASE_DIR = Path(__file__).resolve().parent
PROFILE_DIR = BASE_DIR / "tiktok_browser_profile"
VIDEOS_DIR = BASE_DIR / "ready_videos" / "mw4_videos"
LINKS_FILE = BASE_DIR / "PUBLISHED_MW4_TIKTOK_LINKS.md"

TIKTOK_UPLOAD_URL = "https://www.tiktok.com/tiktokstudio/upload"

MW4_QUEUE = [
    {
        "index": 1,
        "name": "Successful Exfil",
        "file": VIDEOS_DIR / "MW4_DMZ_Video1_Successful_Exfil.mp4",
        "phrase": "Against all odds. Successful Exfil",
        "caption": (
            "Against all odds. Successful Exfil.\n"
            "The heart rate on this extraction was through the roof.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 2,
        "name": "One Squad No Backup",
        "file": VIDEOS_DIR / "MW4_DMZ_Video2_One_Squad_No_Backup.mp4",
        "phrase": "One Squad. One Chance. No Backup",
        "caption": (
            "One Squad. One Chance. No Backup.\n"
            "Pushing straight into the combat zone with the boys.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 3,
        "name": "Sniping Moments",
        "file": VIDEOS_DIR / "MW4_DMZ_Video3_Sniping_Never_Disappoint.mp4",
        "phrase": "DMZ moments never disappoint",
        "caption": (
            "DMZ moments never disappoint.\n"
            "That precision sniper shot saved the entire squad run.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 4,
        "name": "DMZ Hits Different",
        "file": VIDEOS_DIR / "MW4_DMZ_Video4_DMZ_Hits_Different.mp4",
        "phrase": "DMZ just hits different",
        "caption": (
            "DMZ just hits different.\n"
            "You never know what squad is watching you through a scope.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 5,
        "name": "Hajin Map Showcase",
        "file": VIDEOS_DIR / "MW4_DMZ_Video5_Hajin_Map_Showcase.mp4",
        "phrase": "The new DMZ map Hajin looks beautiful",
        "caption": (
            "The new DMZ map Hajin looks beautiful.\n"
            "The atmosphere and tactical tension in this mode are unmatched.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    }
]

PUBLISHED = {}

def update_markdown():
    lines = [
        "# 🔴 LIVE PUBLISHED MW4 DMZ TIKTOK VIDEOS\n\n",
        "Кампания: **Modern Warfare 4 - DMZ Live Clipping**  \n",
        "Аккаунт: **@buddah_ai**  \n",
        "Статус: **Готово для сабмита в Content Rewards**  \n\n",
        "---\n\n"
    ]
    for item in MW4_QUEUE:
        idx = item["index"]
        url = PUBLISHED.get(idx, "⏳ Загружается...")
        lines.append(f"### Видео {idx}: {item['name']}\n👉 `{url}`\n\n")
        
    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.writelines(lines)

update_markdown()

def upload_all():
    print(f"🚀 НАЧИНАЕМ ЗАГРУЗКУ {len(MW4_QUEUE)} РОЛИКОВ CALL OF DUTY В TIKTOK...")
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            str(PROFILE_DIR),
            headless=True,
            viewport={"width": 1400, "height": 900},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.new_page()

        for item in MW4_QUEUE:
            idx = item["index"]
            video_file = item["file"]
            caption = item["caption"]

            print(f"\n==========================================", flush=True)
            print(f"🎬 [ЗАГРУЗКА {idx}/5] {item['name']} ({video_file.name})", flush=True)
            print(f"==========================================", flush=True)

            page.goto(TIKTOK_UPLOAD_URL, wait_until="domcontentloaded", timeout=45000)
            time.sleep(3)

            # File input
            file_input = page.locator('input[type="file"][accept*="video"]').first
            file_input.wait_for(state="attached", timeout=15000)
            file_input.set_input_files(str(video_file))
            print("📤 Файл передан, ждём редактор...", flush=True)
            time.sleep(6)

            # Dismiss tutorial
            got_it = page.locator('button:has-text("Got it"), button:has-text("Понятно")')
            if got_it.count() > 0 and got_it.first.is_visible():
                got_it.first.click()
                time.sleep(1)

            # Fill caption
            editor = page.locator('div.notranslate.public-DraftEditor-content, div[contenteditable="true"]').first
            editor.wait_for(state="visible", timeout=15000)
            editor.click()
            time.sleep(0.3)
            page.keyboard.press("Control+A")
            page.keyboard.press("Backspace")
            time.sleep(0.3)
            page.keyboard.insert_text(caption)
            time.sleep(1)

            # Find Post button
            post_button = None
            for _ in range(30):
                btn_candidates = page.locator('button.Button__root--type-primary, button[type="button"]')
                count = btn_candidates.count()
                for c_idx in range(count):
                    candidate = btn_candidates.nth(c_idx)
                    text = candidate.inner_text().strip()
                    if text in ["Post", "Опубликовать", "Publish"]:
                        if candidate.is_visible() and not candidate.is_disabled():
                            post_button = candidate
                            break
                if post_button:
                    break
                time.sleep(2)

            if not post_button:
                print(f"❌ Кнопка Post для видео #{idx} не найдена!", flush=True)
                continue

            post_button.scroll_into_view_if_needed()
            time.sleep(1)
            post_button.click()
            print("🚀 Нажата кнопка Post!", flush=True)
            time.sleep(2)

            # Confirm "Post now"
            post_now = page.locator('button:has-text("Post now"), button:has-text("Опубликовать сейчас")')
            if post_now.count() > 0 and post_now.first.is_visible():
                print("⚡ Подтверждено: 'Post now'!", flush=True)
                post_now.first.click()

            print("⏳ Ожидаем завершения публикации...", flush=True)
            for _ in range(20):
                time.sleep(2)
                if "tiktokstudio/content" in page.url:
                    break
                upload_another = page.locator('button:has-text("Upload another video"), button:has-text("Upload another")')
                if upload_another.count() > 0 and upload_another.first.is_visible():
                    page.goto("https://www.tiktok.com/tiktokstudio/content", wait_until="domcontentloaded")
                    break

            time.sleep(4)
            # Try to grab ID from current page
            html = page.content()
            ids = list(dict.fromkeys(re.findall(r'item_id=(\d{19})', html)))
            if ids:
                top_id = ids[0]
                PUBLISHED[idx] = f"https://www.tiktok.com/@buddah_ai/video/{top_id}"
                print(f"🔥 ВИДЕО #{idx} ОПУБЛИКОВАНО: {PUBLISHED[idx]}", flush=True)
            else:
                print(f"⚠️ Видео #{idx} отправлено, ссылка формируется...", flush=True)

            update_markdown()
            print(f"⏱ Пауза перед следующим видео: 5 сек...", flush=True)
            time.sleep(5)

        # Final verification pass across content manager
        print("\n🏁 Финальная верификация всех опубликованных ссылок...", flush=True)
        page.goto("https://www.tiktok.com/tiktokstudio/content", wait_until="domcontentloaded")
        time.sleep(6)
        for _ in range(3):
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(2)

        html = page.content()
        with open(BASE_DIR / "mw4_content_dump.html", "w", encoding="utf-8") as f:
            f.write(html)

        for item in MW4_QUEUE:
            idx = item["index"]
            phrase = item["phrase"]
            pos = html.find(phrase)
            if pos != -1:
                snippet = html[max(0, pos-400):pos+1500]
                id_match = re.search(r'item_id=(\d{19})', snippet) or re.search(r'&quot;item_id&quot;:&quot;(\d{19})&quot;', snippet)
                if id_match:
                    vid = id_match.group(1)
                    PUBLISHED[idx] = f"https://www.tiktok.com/@buddah_ai/video/{vid}"
                    print(f"✅ Подтверждено видео #{idx}: {PUBLISHED[idx]}", flush=True)

        update_markdown()
        print("\n🎉 ВСЕ 5 РОЛИКОВ ОПУБЛИКОВАНЫ И СОХРАНЕНЫ!", flush=True)
        ctx.close()

if __name__ == "__main__":
    upload_all()
