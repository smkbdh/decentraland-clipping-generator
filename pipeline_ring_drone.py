import sys, codecs, time, re, json
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

BASE_DIR = Path(__file__).resolve().parent
TIKTOK_PROFILE = BASE_DIR / "tiktok_browser_profile"
REWARDS_PROFILE = BASE_DIR / "rewards_browser_profile"
VIDEOS_DIR = BASE_DIR / "ready_videos" / "ring_drone_batch"
META_PATH = VIDEOS_DIR / "metadata.json"
LINKS_FILE = BASE_DIR / "PUBLISHED_RING_DRONE_LINKS.md"

TIKTOK_UPLOAD_URL = "https://www.tiktok.com/tiktokstudio/upload"
CAMPAIGN_URL = "https://contentrewards.com/c/campaigns/42086467-e927-4418-92e1-b6a5700ccc57"

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

def load_existing():
    published = []
    if LINKS_FILE.exists():
        text = LINKS_FILE.read_text(encoding="utf-8")
        matches = re.findall(r'### (\d+)\. ([^\n]+)\n- 📁 Файл: `([^`]+)`\n- 🔗 Ссылка: `([^`]+)`', text)
        for m in matches:
            published.append({
                "index": int(m[0]),
                "title": m[1],
                "file": m[2],
                "url": m[3]
            })
    return published

def update_markdown(published):
    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.write("# 🔴 LIVE PUBLISHED TIKTOK VIDEOS (Ring - Drone Cam Launch Clipping)\n\n")
        f.write("Аккаунт: **@buddah_ai**  \n")
        f.write("Кампания: **Ring - Drone Cam Launch Clipping** ($2.00 / 1K views, порог всего 1K views)\n")
        f.write(f"Всего опубликовано и отправлено в Content Rewards: **{len(published)}** видео\n\n---\n\n")
        for p in published:
            f.write(f"### {p['index']}. {p['title']}\n")
            f.write(f"- 📁 Файл: `{p['file']}`\n")
            f.write(f"- 🔗 Ссылка: `{p['url']}`\n")
            f.write(f"- 📝 Подпись: `{p.get('caption', '')}`\n")
            f.write(f"- ✅ Статус в Content Rewards: **Submitted & Pending**\n\n")

def submit_to_content_rewards(p, clip_url):
    print(f"🎯 Сабмит в Content Rewards (Ring Drone): {clip_url}", flush=True)
    ctx = p.chromium.launch_persistent_context(
        str(REWARDS_PROFILE),
        headless=True,
        viewport={"width": 1280, "height": 850},
        args=["--disable-blink-features=AutomationControlled"]
    )
    page = ctx.new_page()
    page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=45000)
    time.sleep(3)

    try:
        trigger = page.locator('button:has-text("Submit clip"):visible').first
        trigger.wait_for(state="visible", timeout=10000)
        trigger.click()
        time.sleep(3)

        # Enter URL
        inp = page.locator('input[placeholder*="link"], input[placeholder*="Link"], input[placeholder*="Paste"]').first
        inp.wait_for(state="visible", timeout=10000)
        inp.click()
        inp.fill("")
        inp.fill(clip_url)
        time.sleep(4)

        # Check agreement checkbox
        chk = page.locator('label:has-text("I\'ve read the requirements"), input[type="checkbox"]').first
        if chk.is_visible():
            chk.click()
            time.sleep(1)

        modal_btn = page.locator('button:has-text("Submit clip"):visible').last
        if not modal_btn.is_disabled():
            modal_btn.click()
            time.sleep(5)
            print("🎉 Успешно отправлен в Content Rewards!", flush=True)
            ctx.close()
            return True
        else:
            print("⚠️ Кнопка сабмита не активна", flush=True)
            page.screenshot(path="scratch/ring_submit_disabled.png")
            ctx.close()
            return False
    except Exception as e:
        print(f"❌ Ошибка сабмита: {e}", flush=True)
        ctx.close()
        return False

def run_pipeline(start_idx=1, end_idx=6):
    queue = load_queue()
    items = [q for q in queue if start_idx <= q["index"] <= end_idx]
    published = load_existing()

    with sync_playwright() as p:
        tiktok_ctx = p.chromium.launch_persistent_context(
            str(TIKTOK_PROFILE),
            headless=True,
            viewport={"width": 1400, "height": 900},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = tiktok_ctx.new_page()

        for item in items:
            idx = item["index"]
            video_file = item["file"]
            caption = item["caption"]

            print(f"\n==========================================", flush=True)
            print(f"🎬 [RING DRONE UPLOAD] ВИДЕО #{idx}: {item['title']}", flush=True)
            print(f"==========================================", flush=True)

            page.goto(TIKTOK_UPLOAD_URL, wait_until="domcontentloaded", timeout=45000)
            time.sleep(3)

            # Upload video file
            file_input = page.locator('input[type="file"][accept*="video"]').first
            file_input.wait_for(state="attached", timeout=15000)
            file_input.set_input_files(str(video_file))
            print("📤 Видео загружено, ждём форму...", flush=True)
            time.sleep(6)

            # Dismiss tutorial
            got_it = page.locator('button:has-text("Got it"), button:has-text("Понятно")')
            if got_it.count() > 0 and got_it.first.is_visible():
                got_it.first.click()
                time.sleep(1)

            # Caption
            editor = page.locator('div.notranslate.public-DraftEditor-content, div[contenteditable="true"]').first
            editor.wait_for(state="visible", timeout=15000)
            editor.click()
            time.sleep(0.3)
            page.keyboard.press("Control+A")
            page.keyboard.press("Backspace")
            time.sleep(0.3)
            page.keyboard.insert_text(caption)
            print(f"✍️ Подпись введена: '{caption}'", flush=True)
            time.sleep(2)

            # Post button
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
            print("🚀 Кнопка Post нажата!", flush=True)
            time.sleep(2)

            post_now = page.locator('button:has-text("Post now"), button:has-text("Опубликовать сейчас")')
            if post_now.count() > 0 and post_now.first.is_visible():
                print("⚡ 'Post now' подтверждено!", flush=True)
                post_now.first.click()

            print("⏳ Ожидание публикации...", flush=True)
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

            try:
                content_html = page.content()
                vids = re.findall(r'video/(\d{18,20})', content_html)
                if vids:
                    latest_id = vids[0]
                    live_url = f"https://www.tiktok.com/@buddah_ai/video/{latest_id}"
                    print(f"🎉 Видео #{idx} опубликовано в TikTok: {live_url}", flush=True)
                    
                    item_pub = {
                        "index": idx,
                        "title": item["title"],
                        "file": video_file.name,
                        "url": live_url,
                        "caption": caption
                    }
                    published.append(item_pub)
                    update_markdown(published)

                    # Submit to Content Rewards
                    time.sleep(3)
                    submit_to_content_rewards(p, live_url)
                else:
                    print(f"⚠️ Не найден ID видео на странице content", flush=True)
            except Exception as e:
                print(f"⚠️ Ошибка получения ссылки: {e}", flush=True)

            time.sleep(5)

        tiktok_ctx.close()

if __name__ == "__main__":
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    end = int(sys.argv[2]) if len(sys.argv) > 2 else 6
    run_pipeline(start, end)
