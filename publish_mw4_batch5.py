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

MW4_BATCH5_QUEUE = [
    {
        "index": 21,
        "name": "Fortified Command Breach",
        "file": VIDEOS_DIR / "MW4_DMZ_Video21_Fortified_Command_Breach.mp4",
        "phrase": "The DMZ hype is real",
        "caption": (
            "The DMZ hype is real.\n"
            "Breaching fortified command posts with zero room for error.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 22,
        "name": "High Ground Sniper Kill",
        "file": VIDEOS_DIR / "MW4_DMZ_Video22_High_Ground_Sniper_Kill.mp4",
        "phrase": "DMZ moments never disappoint",
        "caption": (
            "DMZ moments never disappoint.\n"
            "Long distance sniper elimination from high ground.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 23,
        "name": "Green Smoke Exfil",
        "file": VIDEOS_DIR / "MW4_DMZ_Video23_Green_Smoke_Exfil.mp4",
        "phrase": "Against all odds. Successful Exfil",
        "caption": (
            "Against all odds. Successful Exfil.\n"
            "Green smoke popped for extraction under intense combat pressure.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 24,
        "name": "FOB Firing Range Test",
        "file": VIDEOS_DIR / "MW4_DMZ_Video24_FOB_Firing_Range_Test.mp4",
        "phrase": "DMZ Gameplay just feels right",
        "caption": (
            "DMZ Gameplay just feels right.\n"
            "Testing recoil control and attachments at the FOB firing range.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 25,
        "name": "Armored Breach Sector",
        "file": VIDEOS_DIR / "MW4_DMZ_Video25_Armored_Breach_Sector.mp4",
        "phrase": "One Squad. One Chance. No Backup",
        "caption": (
            "One Squad. One Chance. No Backup.\n"
            "Armored vehicle breach directly into the hostile sector.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    }
]

PUBLISHED_BATCH5 = {}

def update_markdown():
    existing = ""
    if LINKS_FILE.exists():
        with open(LINKS_FILE, "r", encoding="utf-8") as f:
            existing = f.read()

    lines = [
        "\n\n---\n\n## 🚀 ПАРТИЯ #5 (ВИДЕО 21 - 25)\n\n"
    ]
    for item in MW4_BATCH5_QUEUE:
        idx = item["index"]
        url = PUBLISHED_BATCH5.get(idx, "⏳ Загружается...")
        lines.append(f"### Видео {idx}: {item['name']}\n👉 `{url}`\n\n")

    if "ПАРТИЯ #5" in existing:
        base_part = existing.split("## 🚀 ПАРТИЯ #5")[0].strip()
        full_text = base_part + "".join(lines)
    else:
        full_text = existing + "".join(lines)

    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.write(full_text)

def upload_batch5():
    print(f"🚀 НАЧИНАЕМ ЗАГРУЗКУ ПАРТИИ #5 ({len(MW4_BATCH5_QUEUE)} РОЛИКОВ) В TIKTOK...")
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            str(PROFILE_DIR),
            headless=True,
            viewport={"width": 1400, "height": 900},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.new_page()

        for item in MW4_BATCH5_QUEUE:
            idx = item["index"]
            video_file = item["file"]
            caption = item["caption"]

            print(f"\n==========================================", flush=True)
            print(f"🎬 [ЗАГРУЗКА {idx}/25] {item['name']} ({video_file.name})", flush=True)
            print(f"==========================================", flush=True)

            page.goto(TIKTOK_UPLOAD_URL, wait_until="domcontentloaded", timeout=45000)
            time.sleep(3)

            file_input = page.locator('input[type="file"][accept*="video"]').first
            file_input.wait_for(state="attached", timeout=15000)
            file_input.set_input_files(str(video_file))
            print("📤 Файл передан, ждём редактор...", flush=True)
            time.sleep(6)

            got_it = page.locator('button:has-text("Got it"), button:has-text("Понятно")')
            if got_it.count() > 0 and got_it.first.is_visible():
                got_it.first.click()
                time.sleep(1)

            editor = page.locator('div.notranslate.public-DraftEditor-content, div[contenteditable="true"]').first
            editor.wait_for(state="visible", timeout=15000)
            editor.click()
            time.sleep(0.3)
            page.keyboard.press("Control+A")
            page.keyboard.press("Backspace")
            time.sleep(0.3)
            page.keyboard.insert_text(caption)
            time.sleep(1)

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
            html = page.content()
            ids = list(dict.fromkeys(re.findall(r'item_id=(\d{19})', html)))
            if ids:
                PUBLISHED_BATCH5[idx] = f"https://www.tiktok.com/@buddah_ai/video/{ids[0]}"
                print(f"🔥 ВИДЕО #{idx} ОПУБЛИКОВАНО: {PUBLISHED_BATCH5[idx]}", flush=True)
            else:
                print(f"⚠️ Видео #{idx} отправлено, ссылка формируется...", flush=True)

            update_markdown()
            print(f"⏱ Пауза перед следующим видео: 5 сек...", flush=True)
            time.sleep(5)

        # Final verification
        print("\n🏁 Финальная верификация ссылок партии #5...", flush=True)
        page.goto("https://www.tiktok.com/tiktokstudio/content", wait_until="domcontentloaded")
        time.sleep(6)
        for _ in range(3):
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(2)

        html = page.content()
        for item in MW4_BATCH5_QUEUE:
            idx = item["index"]
            phrase = item["phrase"]
            pos = html.find(phrase)
            if pos != -1:
                snippet = html[max(0, pos-400):pos+1500]
                id_match = re.search(r'item_id=(\d{19})', snippet) or re.search(r'&quot;item_id&quot;:&quot;(\d{19})&quot;', snippet)
                if id_match:
                    vid = id_match.group(1)
                    PUBLISHED_BATCH5[idx] = f"https://www.tiktok.com/@buddah_ai/video/{vid}"
                    print(f"✅ Подтверждено видео #{idx}: {PUBLISHED_BATCH5[idx]}", flush=True)

        update_markdown()
        print("\n🎉 ВСЕ 5 РОЛИКОВ ПАРТИИ #5 ОПУБЛИКОВАНЫ И СОХРАНЕНЫ!", flush=True)
        ctx.close()

if __name__ == "__main__":
    upload_batch5()
