import sys
import codecs
import time
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

BASE_DIR = Path(__file__).resolve().parent
PROFILE_DIR = BASE_DIR / "tiktok_browser_profile"
VIDEOS_DIR = BASE_DIR / "ready_videos" / "hooked_videos"
LINKS_FILE = BASE_DIR / "PUBLISHED_TIKTOK_LINKS.md"

TIKTOK_UPLOAD_URL = "https://www.tiktok.com/tiktokstudio/upload"

VIDEOS_QUEUE = [
    {
        "index": 1,
        "file": VIDEOS_DIR / "Hook1_BumpySlide_to_Halloween.mp4",
        "caption": (
            "Wait for the plot twist at the end 🎃😭 Exploring spooky season in @decentraland_fdn! "
            "Halloweeks is live through Nov 1. "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gaming #halloweengame #gamestiktok #decentraland #fyp #cozygaming"
        )
    },
    {
        "index": 2,
        "file": VIDEOS_DIR / "Hook2_Golfer_to_SlayTheSteps.mp4",
        "caption": (
            "That was NOT part of the plan 💀 Finding the wildest obstacle in @decentraland_fdn! "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gamingmemes #gaming #gamestiktok #decentraland #fyp #viral"
        )
    },
    {
        "index": 3,
        "file": VIDEOS_DIR / "Hook3_LaunchTackle_to_Jetpack.mp4",
        "caption": (
            "Bro went flying to another dimension 🚀 Exploring with jetpacks in @decentraland_fdn! "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gaming #gamer #gamestiktok #decentraland #funnygaming #fyp"
        )
    },
    {
        "index": 4,
        "file": VIDEOS_DIR / "Hook4_CornThrow_to_ClubParty.mp4",
        "caption": (
            "3 AM energy in this world is insane 🔥 Nightclub party in @decentraland_fdn! "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gaming #clubbing #gamestiktok #decentraland #nightlife #fyp"
        )
    },
    {
        "index": 5,
        "file": VIDEOS_DIR / "Hook5_PlateHead_to_CherryBlossom.mp4",
        "caption": (
            "Most peaceful place on the internet right now 🌸 Dancing under cherry blossoms in @decentraland_fdn! "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#cozygames #aesthetic #gamestiktok #decentraland #fyp #gaming"
        )
    },
    {
        "index": 6,
        "file": VIDEOS_DIR / "Hook6_SandalThrow_to_PumpkinBall.mp4",
        "caption": (
            "Nobody can dodge this 🎃💀 Haunted pumpkin arena is wild in @decentraland_fdn! "
            "Halloweeks is live through Nov 1. "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gaming #halloween #halloweeks #gamestiktok #decentraland #fyp"
        )
    },
    {
        "index": 7,
        "file": VIDEOS_DIR / "Hook7_BottleKick_to_Skychaser.mp4",
        "caption": (
            "How did I even make that jump?! ☁️ Exploring floating islands in @decentraland_fdn! "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gaming #platformer #gamestiktok #decentraland #fyp #gamer"
        )
    },
    {
        "index": 8,
        "file": VIDEOS_DIR / "Hook8_DirtyFace_to_MonsterRecon.mp4",
        "caption": (
            "Finding hidden boss fights with the squad 👾 Exploring @decentraland_fdn! "
            "Decentraland is a free social gaming world for adults, available on desktop and mobile. "
            "#gaming #bossfight #gamestiktok #decentraland #fyp #viral"
        )
    }
]

PUBLISHED = {
    1: "https://www.tiktok.com/@buddah_ai/video/7700869744852864274"
}

def update_links_markdown():
    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.write("# 🔴 LIVE PUBLISHED TIKTOK VIDEOS (Decentraland Campaign)\n\n")
        f.write("Аккаунт: **@buddah_ai**\n\n---\n\n")
        for i in range(1, 9):
            url = PUBLISHED.get(i, "⏳ Загружается...")
            f.write(f"### Видео {i} (Хук {i}):\n👉 {url}\n\n")

update_links_markdown()

def upload_all():
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            str(PROFILE_DIR),
            headless=True,
            viewport={"width": 1400, "height": 900},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.new_page()

        items_to_upload = [item for item in VIDEOS_QUEUE if item["index"] >= 2]

        for item in items_to_upload:
            idx = item["index"]
            video_file = item["file"]
            caption = item["caption"]

            print(f"\n==========================================", flush=True)
            print(f"🎬 [ТУРБО-ЗАГРУЗКА] ВИДЕО #{idx}: {video_file.name}", flush=True)
            print(f"==========================================", flush=True)

            page.goto(TIKTOK_UPLOAD_URL, wait_until="domcontentloaded", timeout=45000)
            time.sleep(3)

            # File input
            file_input = page.locator('input[type="file"][accept*="video"]').first
            file_input.wait_for(state="attached", timeout=15000)
            file_input.set_input_files(str(video_file))
            print("📤 Файл передан, ждём редактор...", flush=True)
            time.sleep(6)

            # Dismiss tutorial if any
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

            # Wait for content redirect and grab new video ID
            print("⏳ Ожидаем завершения публикации и получения ссылки...", flush=True)
            new_id = None
            for _ in range(20):
                time.sleep(2)
                if "tiktokstudio/content" in page.url:
                    break
                upload_another = page.locator('button:has-text("Upload another video"), button:has-text("Upload another")')
                if upload_another.count() > 0 and upload_another.first.is_visible():
                    page.goto("https://www.tiktok.com/tiktokstudio/content", wait_until="domcontentloaded")
                    break

            time.sleep(4)
            # Extract top video ID
            html = page.content()
            ids = list(dict.fromkeys(re.findall(r'item_id=(\d{19})', html)))
            for vid in ids:
                if vid not in [v.split("/")[-1] for v in PUBLISHED.values()]:
                    new_id = vid
                    break

            if new_id:
                pub_url = f"https://www.tiktok.com/@buddah_ai/video/{new_id}"
                PUBLISHED[idx] = pub_url
                print(f"🔥 ВИДЕО #{idx} ОПУБЛИКОВАНО: {pub_url}", flush=True)
            else:
                print(f"⚠️ Видео #{idx} отправлено, ссылка формируется в TikTok.", flush=True)

            update_links_markdown()
            print(f"⏱ Пауза перед следующим видео: 5 сек...", flush=True)
            time.sleep(5)

        # Final pass to ensure all URLs are captured
        print("\n🏁 Финальная проверка всех ссылок...", flush=True)
        page.goto("https://www.tiktok.com/tiktokstudio/content", wait_until="domcontentloaded")
        time.sleep(5)
        html = page.content()
        all_ids = list(dict.fromkeys(re.findall(r'item_id=(\d{19})', html)))
        print(f"Все обнаруженные ID видео: {all_ids}", flush=True)
        for i, vid in enumerate(all_ids[:8]):
            slot = i + 1
            if slot not in PUBLISHED or "⏳" in PUBLISHED[slot]:
                PUBLISHED[slot] = f"https://www.tiktok.com/@buddah_ai/video/{vid}"

        update_links_markdown()
        ctx.close()

if __name__ == "__main__":
    upload_all()
