import sys, codecs, time, re, json
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

BASE_DIR = Path(__file__).resolve().parent
PROFILE_DIR = BASE_DIR / "tiktok_browser_profile"
VIDEOS_DIR = BASE_DIR / "ready_videos" / "warzone_tiktok_batch"
META_PATH = VIDEOS_DIR / "metadata.json"
LINKS_FILE = BASE_DIR / "PUBLISHED_WARZONE_TIKTOK_LINKS.md"

TIKTOK_UPLOAD_URL = "https://www.tiktok.com/tiktokstudio/upload"

def load_queue():
    with open(META_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    queue = []
    for idx, item in enumerate(data, 1):
        vfile = VIDEOS_DIR / f"{item['id']}.mp4"
        queue.append({
            "index": idx,
            "id": item["id"],
            "title": item["title"],
            "file": vfile,
            "caption": item["caption"]
        })
    return queue

def update_markdown(published):
    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.write("# 🔴 LIVE PUBLISHED TIKTOK VIDEOS (Call of Duty: Warzone Season 1)\n\n")
        f.write("Аккаунт: **@buddah_ai**  \n")
        f.write("Кампания: **Call of Duty - Warzone Season 1 Clipping** ($2.00 / 1K views)\n\n---\n\n")
        for p in published:
            f.write(f"### {p['index']}. {p['title']}\n")
            f.write(f"- 📁 Файл: `{p['file']}`\n")
            f.write(f"- 🔗 Ссылка: `{p['url']}`\n")
            f.write(f"- 📝 Подпись:\n```\n{p['caption']}\n```\n\n")

def publish_batch(start_idx=1, end_idx=10):
    queue = load_queue()
    items = [q for q in queue if start_idx <= q["index"] <= end_idx]
    published = []

    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            str(PROFILE_DIR),
            headless=True,
            viewport={"width": 1400, "height": 900},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.new_page()

        for item in items:
            idx = item["index"]
            video_file = item["file"]
            caption = item["caption"]

            print(f"\n==========================================", flush=True)
            print(f"🎬 [TIKTOK UPLOAD] ВИДЕО #{idx}: {item['title']}", flush=True)
            print(f"==========================================", flush=True)

            page.goto(TIKTOK_UPLOAD_URL, wait_until="domcontentloaded", timeout=45000)
            time.sleep(3)

            # Upload video file
            file_input = page.locator('input[type="file"][accept*="video"]').first
            file_input.wait_for(state="attached", timeout=15000)
            file_input.set_input_files(str(video_file))
            print("📤 Видео передано в форму, ждём редактор...", flush=True)
            time.sleep(6)

            # Dismiss tutorial modal if any
            got_it = page.locator('button:has-text("Got it"), button:has-text("Понятно")')
            if got_it.count() > 0 and got_it.first.is_visible():
                got_it.first.click()
                time.sleep(1)

            # Caption input
            editor = page.locator('div.notranslate.public-DraftEditor-content, div[contenteditable="true"]').first
            editor.wait_for(state="visible", timeout=15000)
            editor.click()
            time.sleep(0.3)
            page.keyboard.press("Control+A")
            page.keyboard.press("Backspace")
            time.sleep(0.3)
            page.keyboard.insert_text(caption)
            print("✍️ Описание и теги заполнены!", flush=True)
            time.sleep(2)

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
                page.screenshot(path=f"scratch/upload_err_{idx}.png")
                continue

            post_button.scroll_into_view_if_needed()
            time.sleep(1)
            post_button.click()
            print("🚀 Кнопка Post нажата!", flush=True)
            time.sleep(2)

            # Confirm "Post now" if dialog appears
            post_now = page.locator('button:has-text("Post now"), button:has-text("Опубликовать сейчас")')
            if post_now.count() > 0 and post_now.first.is_visible():
                print("⚡ Подтверждено: 'Post now'!", flush=True)
                post_now.first.click()

            # Wait for content redirect
            print("⏳ Ожидание публикации и сбор ссылки...", flush=True)
            for _ in range(25):
                time.sleep(2)
                if "tiktokstudio/content" in page.url:
                    break
                upload_another = page.locator('button:has-text("Upload another video"), button:has-text("Upload another")')
                if upload_another.count() > 0 and upload_another.first.is_visible():
                    page.goto("https://www.tiktok.com/tiktokstudio/content", wait_until="domcontentloaded")
                    break

            time.sleep(4)
            if "tiktokstudio/content" not in page.url:
                page.goto("https://www.tiktok.com/tiktokstudio/content", wait_until="domcontentloaded")
                time.sleep(5)

            # Grab latest video link from studio content page
            try:
                # Look for video row links
                content_html = page.content()
                vids = re.findall(r'video/(\d{18,20})', content_html)
                if vids:
                    latest_id = vids[0]
                    live_url = f"https://www.tiktok.com/@buddah_ai/video/{latest_id}"
                    print(f"🎉 Видео #{idx} успешно опубликовано: {live_url}", flush=True)
                    item_pub = dict(item)
                    item_pub["url"] = live_url
                    item_pub["file"] = video_file.name
                    published.append(item_pub)
                    update_markdown(published)
                else:
                    print(f"⚠️ Не удалось извлечь ID видео из страницы content", flush=True)
                    page.screenshot(path=f"scratch/content_page_{idx}.png")
            except Exception as e:
                print(f"⚠️ Ошибка при извлечении ссылки: {e}", flush=True)

            time.sleep(3)

        ctx.close()
    return published

if __name__ == "__main__":
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    end = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    publish_batch(start, end)
