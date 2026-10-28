import sys
import codecs
import time
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

BASE_DIR = Path(__file__).resolve().parent
TIKTOK_PROFILE = BASE_DIR / "tiktok_browser_profile"
REWARDS_PROFILE = BASE_DIR / "rewards_browser_profile"
VIDEOS_DIR = BASE_DIR / "ready_videos" / "mw4_videos"
LINKS_FILE = BASE_DIR / "PUBLISHED_MW4_TIKTOK_LINKS.md"

CAMPAIGN_URL = "https://contentrewards.com/c/campaigns/78bd78e4-0ec3-44d7-9f56-122ff7c374bc"
TIKTOK_UPLOAD_URL = "https://www.tiktok.com/tiktokstudio/upload"

MW4_BATCH7_QUEUE = [
    {
        "index": 31,
        "name": "First Mission Push",
        "file": VIDEOS_DIR / "MW4_DMZ_Video31_First_Mission_Push.mp4",
        "phrase": "One Squad. One Chance. No Backup",
        "caption": (
            "One Squad. One Chance. No Backup.\n"
            "Coordinated squad assault deep behind enemy lines in DMZ.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 32,
        "name": "FOB Perimeter Breach",
        "file": VIDEOS_DIR / "MW4_DMZ_Video32_FOB_Perimeter_Breach.mp4",
        "phrase": "DMZ moments never disappoint",
        "caption": (
            "DMZ moments never disappoint.\n"
            "Securing the forward operating base depot under heavy pressure.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 33,
        "name": "Long Range Recon Sniper",
        "file": VIDEOS_DIR / "MW4_DMZ_Video33_Long_Range_Recon_Sniper.mp4",
        "phrase": "DMZ just hits different",
        "caption": (
            "DMZ just hits different.\n"
            "Long range thermal surveillance and precision elimination.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 34,
        "name": "Armored Convoy Pursuit",
        "file": VIDEOS_DIR / "MW4_DMZ_Video34_Armored_Convoy_Pursuit.mp4",
        "phrase": "The DMZ hype is real",
        "caption": (
            "The DMZ hype is real.\n"
            "High speed extraction through hostile patrol lines.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    },
    {
        "index": 35,
        "name": "Extraction Timer Panic",
        "file": VIDEOS_DIR / "MW4_DMZ_Video35_Extraction_Timer_Panic.mp4",
        "phrase": "Could you have made that Exfil",
        "caption": (
            "Could you have made that Exfil.\n"
            "Final countdown to exfil chopper liftoff with incoming reinforcements.\n\n"
            "@callofduty\n"
            "#Ad\n"
            "#DMZ #CallOfDuty #Gaming"
        )
    }
]

PUBLISHED_BATCH7 = {}
SUBMISSION_STATUS = {}

def update_markdown():
    existing = ""
    if LINKS_FILE.exists():
        with open(LINKS_FILE, "r", encoding="utf-8") as f:
            existing = f.read()

    lines = [
        "\n\n---\n\n## 🚀 ПАРТИЯ #7 (ВИДЕО 31 - 35) + CONTENT REWARDS SUBMISSIONS\n\n"
    ]
    for item in MW4_BATCH7_QUEUE:
        idx = item["index"]
        url = PUBLISHED_BATCH7.get(idx, "⏳ Загружается...")
        sub_stat = SUBMISSION_STATUS.get(idx, "⏳ Ожидает сабмита")
        lines.append(f"### Видео {idx}: {item['name']}\n👉 TikTok: `{url}`\n👉 Content Rewards: **{sub_stat}**\n\n")

    full_text = existing + "".join(lines)
    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.write(full_text)
    print("📝 Файл PUBLISHED_MW4_TIKTOK_LINKS.md обновлен!", flush=True)

def upload_to_tiktok():
    print("=" * 60)
    print("🚀 ЭТАП 1: ЗАГРУЗКА ПАРТИИ #7 В TIKTOK (@buddah_ai)")
    print("=" * 60)

    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(TIKTOK_PROFILE),
            headless=True,
            viewport={"width": 1280, "height": 850},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.new_page()

        for item in MW4_BATCH7_QUEUE:
            idx = item["index"]
            video_path = item["file"]
            caption = item["caption"]

            print(f"\n[{idx}/35] Загрузка видео: {item['name']} ({video_path.name})...", flush=True)
            page.goto(TIKTOK_UPLOAD_URL, wait_until="domcontentloaded", timeout=60000)
            time.sleep(4)

            # File upload
            file_input = page.locator('input[type="file"]').first
            file_input.set_input_files(str(video_path))
            print("⏳ Файл передан загрузчику TikTok...", flush=True)

            editor = page.locator('div[contenteditable="true"]').first
            try:
                editor.wait_for(state="visible", timeout=30000)
            except Exception:
                print("⚠️ Таймаут ожидания редактора!", flush=True)
                continue

            time.sleep(2)
            editor.click()
            page.keyboard.press("Control+A")
            page.keyboard.press("Backspace")
            time.sleep(0.5)

            # Fill caption
            lines = caption.split("\n")
            for line_idx, line in enumerate(lines):
                if line:
                    tokens = line.split(" ")
                    for t_idx, token in enumerate(tokens):
                        if token.startswith("@") or token.startswith("#"):
                            page.keyboard.type(token, delay=30)
                            time.sleep(0.8)
                            page.keyboard.press("Enter")
                            time.sleep(0.5)
                        else:
                            page.keyboard.type(token, delay=20)
                        if t_idx < len(tokens) - 1:
                            page.keyboard.type(" ")
                if line_idx < len(lines) - 1:
                    page.keyboard.press("Shift+Enter")
                    time.sleep(0.2)

            print("📝 Описание успешно введено!", flush=True)
            time.sleep(3)

            # Wait for upload completion (100%)
            for _ in range(60):
                text = page.content()
                if "100%" in text or "Uploaded" in text or "Загружено" in text:
                    break
                time.sleep(1)

            # Find Post button
            post_button = None
            for _ in range(15):
                candidates = page.locator('button:has-text("Post"), button:has-text("Опубликовать")')
                for i in range(candidates.count()):
                    candidate = candidates.nth(i)
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
                PUBLISHED_BATCH7[idx] = f"https://www.tiktok.com/@buddah_ai/video/{ids[0]}"
                print(f"🔥 ВИДЕО #{idx} ОПУБЛИКОВАНО: {PUBLISHED_BATCH7[idx]}", flush=True)
            else:
                print(f"⚠️ Видео #{idx} отправлено, ссылка формируется...", flush=True)

            time.sleep(4)

        # Verification pass on content manager
        print("\n🏁 Финальная верификация ссылок партии #7...", flush=True)
        page.goto("https://www.tiktok.com/tiktokstudio/content", wait_until="domcontentloaded")
        time.sleep(6)
        for _ in range(3):
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(2)

        html = page.content()
        for item in MW4_BATCH7_QUEUE:
            idx = item["index"]
            phrase = item["phrase"]
            pos = html.find(phrase)
            if pos != -1:
                snippet = html[max(0, pos-400):pos+1500]
                id_match = re.search(r'item_id=(\d{19})', snippet) or re.search(r'&quot;item_id&quot;:&quot;(\d{19})&quot;', snippet)
                if id_match:
                    vid = id_match.group(1)
                    PUBLISHED_BATCH7[idx] = f"https://www.tiktok.com/@buddah_ai/video/{vid}"
                    print(f"✅ Подтверждено видео #{idx}: {PUBLISHED_BATCH7[idx]}", flush=True)

        ctx.close()

def submit_to_content_rewards():
    print("\n" + "=" * 60)
    print("🎯 ЭТАП 2: АВТО-САБМИТ В CONTENT REWARDS")
    print("=" * 60)

    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(REWARDS_PROFILE),
            headless=True,
            viewport={"width": 1280, "height": 850},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.new_page()

        for item in MW4_BATCH7_QUEUE:
            idx = item["index"]
            url = PUBLISHED_BATCH7.get(idx)
            if not url or "tiktok.com" not in url:
                print(f"⚠️ Пропуск видео #{idx}: ссылка TikTok не найдена!", flush=True)
                SUBMISSION_STATUS[idx] = "❌ Ошибка: нет ссылки TikTok"
                continue

            print(f"\n🎯 Сабмит видео #{idx} ({url})...", flush=True)
            page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=45000)
            time.sleep(3)

            # Click Submit clip visible button
            try:
                trigger = page.locator('button:has-text("Submit clip"):visible').first
                trigger.wait_for(state="visible", timeout=10000)
                trigger.click()
                time.sleep(2)
            except Exception as e:
                print(f"❌ Ошибка открытия модального окна для #{idx}: {e}", flush=True)
                SUBMISSION_STATUS[idx] = f"❌ Ошибка открытия модалки: {e}"
                continue

            # Fill URL
            try:
                inp = page.locator('input[placeholder*="tiktok.com"]').first
                inp.wait_for(state="visible", timeout=10000)
                inp.click()
                inp.fill("")
                inp.fill(url)
                print(f"✅ Ссылка вставлена! Ждём валидацию API...", flush=True)
            except Exception as e:
                print(f"❌ Ошибка ввода ссылки: {e}", flush=True)
                SUBMISSION_STATUS[idx] = f"❌ Ошибка инпута: {e}"
                continue

            # Wait for checks to finish (3-5s)
            time.sleep(4)

            # Checkbox
            try:
                chk = page.locator('label:has-text("I\'ve read the requirements"), input[type="checkbox"]').first
                if chk.is_visible():
                    chk.click()
                    time.sleep(1)
            except Exception as e:
                print(f"Примечание по чекбоксу: {e}", flush=True)

            modal_btn = page.locator('button:has-text("Submit clip"):visible').last
            if not modal_btn.is_disabled():
                modal_btn.click()
                print(f"🚀 Видео #{idx}: Кнопка Submit clip НАЖАТА!", flush=True)
                time.sleep(5)
                page.screenshot(path=f"submit_batch7_vid{idx}_success.png")
                SUBMISSION_STATUS[idx] = "✅ УСПЕШНО ЗАСАБМИЧЕНО В CONTENT REWARDS"
                print(f"🎉 ВИДЕО #{idx} УСПЕШНО ЗАСАБМИЧЕНО В CONTENT REWARDS!", flush=True)
            else:
                print(f"❌ Видео #{idx}: Кнопка заблокирована (валидация не прошла)!", flush=True)
                page.screenshot(path=f"submit_batch7_vid{idx}_failed.png")
                SUBMISSION_STATUS[idx] = "❌ Валидация не пройдена"
                cancel_btn = page.locator('button:has-text("Cancel"):visible')
                if cancel_btn.count() > 0 and cancel_btn.first.is_visible():
                    cancel_btn.first.click()
                    time.sleep(1)

        ctx.close()

    update_markdown()

if __name__ == "__main__":
    upload_to_tiktok()
    submit_to_content_rewards()
