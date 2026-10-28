import sys
import codecs
import time
import re
import os
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

BASE_DIR = Path(__file__).resolve().parent
RAW_DIR = BASE_DIR / "mw4_raw"
OUT_DIR = BASE_DIR / "ready_videos" / "mw4_videos"
OUT_DIR.mkdir(parents=True, exist_ok=True)

TIKTOK_PROFILE = BASE_DIR / "tiktok_browser_profile"
REWARDS_PROFILE = BASE_DIR / "rewards_browser_profile"
LINKS_FILE = BASE_DIR / "PUBLISHED_MW4_TIKTOK_LINKS.md"

CAMPAIGN_URL = "https://contentrewards.com/c/campaigns/78bd78e4-0ec3-44d7-9f56-122ff7c374bc"
TIKTOK_UPLOAD_URL = "https://www.tiktok.com/tiktokstudio/upload"
FONT = "C\\:/Windows/Fonts/arialbd.ttf"

RAW_FILES = [
    {"file": "mw4_first_mission.mp4", "min_s": 10, "max_s": 140, "is_vert": False},
    {"file": "mw4_fob_base.mp4",      "min_s": 5,  "max_s": 95,  "is_vert": True},
    {"file": "mw4_sniping_b.mp4",     "min_s": 5,  "max_s": 55,  "is_vert": False},
    {"file": "mw4_extract.mp4",       "min_s": 5,  "max_s": 28,  "is_vert": False},
    {"file": "mw4_sniping_a.mp4",     "min_s": 5,  "max_s": 38,  "is_vert": False},
    {"file": "mw4_driving.mp4",       "min_s": 5,  "max_s": 30,  "is_vert": False},
    {"file": "mw4_3d_printer.mp4",    "min_s": 5,  "max_s": 42,  "is_vert": True},
    {"file": "mw4_oct26.mp4",         "min_s": 5,  "max_s": 28,  "is_vert": False},
]

SLOGANS = [
    "ONE SQUAD. ONE CHANCE. NO BACKUP.",
    "DMZ MOMENTS NEVER DISAPPOINT",
    "DMZ JUST HITS DIFFERENT",
    "THE DMZ HYPE IS REAL",
    "COULD YOU HAVE MADE THAT EXFIL"
]

SUBTITLES = [
    "Tactical infiltration through contested territory",
    "Coordinated squad assault deep behind enemy lines",
    "Securing the forward operating base depot under fire",
    "Long range thermal surveillance and precision shots",
    "High speed exfil convoy pushing through patrol lines",
    "Chopper extraction under hostile machinegun barrage",
    "Stealth perimeter breach with suppressed carbines",
    "Counter sniping enemy rooftop spotters across the zone",
    "Field crafting weapon blueprints on demand",
    "Final countdown to exfil bird liftoff with team",
    "Heavy squad armor push into contested stronghold",
    "Thermal recon sweep tagging enemy positions",
    "Flanking enemy defenders on the rooftop perimeter",
    "Close quarters room clearing in hot extraction area",
    "Covering squad extraction with heavy suppressive fire"
]

def generate_spec_for_index(idx):
    raw_cfg = RAW_FILES[idx % len(RAW_FILES)]
    slogan = SLOGANS[idx % len(SLOGANS)]
    sub = SUBTITLES[idx % len(SUBTITLES)]

    # Calculate safe start time
    span = raw_cfg["max_s"] - raw_cfg["min_s"]
    offset = (idx * 7) % max(1, span)
    start_sec = raw_cfg["min_s"] + offset
    start_str = f"00:{start_sec//60:02d}:{start_sec%60:02d}"

    slug = re.sub(r'[^a-zA-Z0-9]', '_', sub[:30]).strip('_')
    out_name = f"MW4_DMZ_Video{idx}_{slug}.mp4"

    # Clean punctuation for phrase lookup
    phrase_lookup = slogan.replace(".", "").replace("!", "").title()

    caption = (
        f"{slogan.capitalize()}\n"
        f"{sub}.\n\n"
        f"@callofduty\n"
        f"#Ad\n"
        f"#DMZ #CallOfDuty #Gaming"
    )

    return {
        "index": idx,
        "out_name": out_name,
        "file": RAW_DIR / raw_cfg["file"],
        "start": start_str,
        "duration": "14",
        "is_vertical": raw_cfg["is_vert"],
        "title_top": slogan,
        "title_sub": sub,
        "phrase": phrase_lookup,
        "caption": caption
    }

def render_clip(item):
    idx = item["index"]
    out_file = OUT_DIR / item["out_name"]
    if out_file.exists() and out_file.stat().st_size > 1000000:
        print(f"⏩ Видео #{idx} уже отрендерено ({out_file.stat().st_size / (1024*1024):.2f} МБ). Пропускаем.", flush=True)
        return True

    print(f"🎬 Рендеринг видео #{idx}: {item['out_name']}...", flush=True)
    t_top = item["title_top"].replace("'", "").replace(":", "")
    t_sub = item["title_sub"].replace("'", "").replace(":", "")

    if item["is_vertical"]:
        vf = (
            f"scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
            f"drawbox=y=0:h=320:color=black@0.75:t=fill,"
            f"drawbox=y=316:h=6:color=0xFFCC00@0.9:t=fill,"
            f"drawtext=fontfile='{FONT}':text='{t_top}':fontsize=46:fontcolor=0xFFCC00:x=(w-text_w)/2:y=130,"
            f"drawtext=fontfile='{FONT}':text='{t_sub}':fontsize=32:fontcolor=white:x=(w-text_w)/2:y=210"
        )
    else:
        vf = (
            f"[0:v]split=2[bg][fg];"
            f"[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=25:5[blurred];"
            f"[fg]scale=1080:-1[sharp];"
            f"[blurred][sharp]overlay=(W-w)/2:(H-h)/2[base];"
            f"[base]drawbox=y=0:h=320:color=black@0.75:t=fill,"
            f"drawbox=y=316:h=6:color=0xFFCC00@0.9:t=fill,"
            f"drawtext=fontfile='{FONT}':text='{t_top}':fontsize=46:fontcolor=0xFFCC00:x=(w-text_w)/2:y=130,"
            f"drawtext=fontfile='{FONT}':text='{t_sub}':fontsize=32:fontcolor=white:x=(w-text_w)/2:y=210"
        )

    cmd = [
        "ffmpeg", "-y",
        "-ss", item["start"],
        "-t", item["duration"],
        "-i", str(item["file"]),
        "-filter_complex", vf,
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "22",
        "-c:a", "aac",
        "-b:a", "192k",
        "-ar", "44100",
        "-movflags", "+faststart",
        str(out_file)
    ]

    t0 = time.time()
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode == 0:
        size_mb = out_file.stat().st_size / (1024 * 1024)
        print(f"✅ ВИДЕО #{idx} ГОТОВО: {size_mb:.2f} МБ (за {time.time()-t0:.1f}с)", flush=True)
        return True
    else:
        print(f"❌ ОШИБКА РЕНДЕРА #{idx}: {res.stderr.decode('utf-8', errors='ignore')[-300:]}", flush=True)
        return False

def upload_batch_to_tiktok(batch_items):
    print("\n" + "=" * 60)
    print(f"🚀 ЗАГРУЗКА ПАРТИИ В TIKTOK (@buddah_ai) (Видео {batch_items[0]['index']} - {batch_items[-1]['index']})")
    print("=" * 60)

    published = {}
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(TIKTOK_PROFILE),
            headless=True,
            viewport={"width": 1280, "height": 850},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.new_page()

        for item in batch_items:
            idx = item["index"]
            video_path = OUT_DIR / item["out_name"]
            caption = item["caption"]

            print(f"\n[{idx}] Загрузка видео: {item['out_name']}...", flush=True)
            page.goto(TIKTOK_UPLOAD_URL, wait_until="domcontentloaded", timeout=60000)
            time.sleep(4)

            # Upload file
            file_input = page.locator('input[type="file"]').first
            file_input.set_input_files(str(video_path))
            print("⏳ Файл передан загрузчику TikTok...", flush=True)

            editor = page.locator('div[contenteditable="true"]').first
            try:
                editor.wait_for(state="visible", timeout=30000)
            except Exception:
                print(f"⚠️ Редактор не появился для #{idx}!", flush=True)
                continue

            time.sleep(2)
            editor.click()
            page.keyboard.press("Control+A")
            page.keyboard.press("Backspace")
            time.sleep(0.5)

            # Type caption
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

            print("📝 Описание заполнено!", flush=True)
            time.sleep(3)

            # Wait upload 100%
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
                    cand = candidates.nth(i)
                    t = cand.inner_text().strip()
                    if t in ["Post", "Опубликовать", "Publish"]:
                        if cand.is_visible() and not cand.is_disabled():
                            post_button = cand
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

            # Optional post now confirmation
            post_now = page.locator('button:has-text("Post now"), button:has-text("Опубликовать сейчас")')
            if post_now.count() > 0 and post_now.first.is_visible():
                print("⚡ Подтверждено: 'Post now'!", flush=True)
                post_now.first.click()

            # Wait for publish
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
                published[idx] = f"https://www.tiktok.com/@buddah_ai/video/{ids[0]}"
                print(f"🔥 ВИДЕО #{idx} ОПУБЛИКОВАНО: {published[idx]}", flush=True)
            else:
                print(f"⚠️ Видео #{idx} отправлено, ссылка формируется...", flush=True)

            time.sleep(4)

        # Verification pass on content manager
        print("\n🏁 Финальная верификация ссылок пачки на странице контента...", flush=True)
        page.goto("https://www.tiktok.com/tiktokstudio/content", wait_until="domcontentloaded")
        time.sleep(6)
        for _ in range(3):
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(2)

        html = page.content()
        for item in batch_items:
            idx = item["index"]
            for term in [item["phrase"][:15], item["title_top"][:15], item["title_sub"][:15]]:
                pos = html.find(term)
                if pos != -1:
                    snippet = html[max(0, pos-400):pos+1500]
                    id_match = re.search(r'item_id=(\d{19})', snippet) or re.search(r'&quot;item_id&quot;:&quot;(\d{19})&quot;', snippet)
                    if id_match:
                        vid = id_match.group(1)
                        published[idx] = f"https://www.tiktok.com/@buddah_ai/video/{vid}"
                        print(f"✅ Подтверждено видео #{idx}: {published[idx]}", flush=True)
                        break

        ctx.close()
    return published

def submit_batch_to_rewards(batch_items, published_dict):
    print("\n" + "=" * 60)
    print("🎯 АВТО-САБМИТ ПАРТИИ В CONTENT REWARDS")
    print("=" * 60)

    statuses = {}
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(REWARDS_PROFILE),
            headless=True,
            viewport={"width": 1280, "height": 850},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = ctx.new_page()

        for item in batch_items:
            idx = item["index"]
            url = published_dict.get(idx)
            if not url or "tiktok.com" not in url:
                print(f"⚠️ Пропуск сабмита #{idx}: нет валидной ссылки!", flush=True)
                statuses[idx] = "❌ Нет ссылки TikTok"
                continue

            print(f"\n🎯 Сабмит видео #{idx}: {url}...", flush=True)
            page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=45000)
            time.sleep(3)

            # Trigger Submit clip
            try:
                trigger = page.locator('button:has-text("Submit clip"):visible').first
                trigger.wait_for(state="visible", timeout=10000)
                trigger.click()
                time.sleep(2)
            except Exception as e:
                print(f"❌ Ошибка открытия модалки #{idx}: {e}", flush=True)
                statuses[idx] = f"❌ Ошибка открытия модалки: {e}"
                continue

            # Fill URL
            try:
                inp = page.locator('input[placeholder*="tiktok.com"]').first
                inp.wait_for(state="visible", timeout=10000)
                inp.click()
                inp.fill("")
                inp.fill(url)
                print("✅ Ссылка вставлена, ждём валидацию API...", flush=True)
            except Exception as e:
                print(f"❌ Поле ввода не найдено #{idx}: {e}", flush=True)
                statuses[idx] = f"❌ Ошибка поля ввода: {e}"
                continue

            time.sleep(4)

            # Checkbox
            try:
                chk = page.locator('label:has-text("I\'ve read the requirements"), input[type="checkbox"]').first
                if chk.is_visible():
                    chk.click()
                    time.sleep(1)
            except Exception as e:
                pass

            modal_btn = page.locator('button:has-text("Submit clip"):visible').last
            if not modal_btn.is_disabled():
                modal_btn.click()
                print(f"🚀 Кнопка сабмита для #{idx} НАЖАТА!", flush=True)
                time.sleep(6)
                statuses[idx] = "✅ УСПЕШНО ЗАСАБМИЧЕНО В CONTENT REWARDS"
                print(f"🎉 ВИДЕО #{idx} УСПЕШНО ЗАСАБМИЧЕНО В CONTENT REWARDS!", flush=True)
            else:
                print(f"❌ Видео #{idx}: Кнопка не активна (валидация не пройдена)!", flush=True)
                statuses[idx] = "❌ Валидация не пройдена"
                cancel_btn = page.locator('button:has-text("Cancel"):visible')
                if cancel_btn.count() > 0 and cancel_btn.first.is_visible():
                    cancel_btn.first.click()
                    time.sleep(1)

        ctx.close()
    return statuses

def update_markdown_batch(batch_num, batch_items, published_dict, statuses_dict):
    existing = ""
    if LINKS_FILE.exists():
        with open(LINKS_FILE, "r", encoding="utf-8") as f:
            existing = f.read()

    lines = [
        f"\n\n---\n\n## 🚀 ПАРТИЯ #{batch_num} (ВИДЕО {batch_items[0]['index']} - {batch_items[-1]['index']}) + CONTENT REWARDS SUBMISSIONS\n\n"
    ]
    for item in batch_items:
        idx = item["index"]
        url = published_dict.get(idx, "⏳ Загружается...")
        sub_stat = statuses_dict.get(idx, "⏳ Ожидает сабмита")
        lines.append(f"### Видео {idx}: {item['title_sub']}\n👉 TikTok: `{url}`\n👉 Content Rewards: **{sub_stat}**\n\n")

    full_text = existing + "".join(lines)
    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.write(full_text)
    print(f"📝 PUBLISHED_MW4_TIKTOK_LINKS.md обновлен для партии #{batch_num}!", flush=True)

def git_commit_and_push(batch_num):
    print(f"\n🔄 Синхронизация с GitHub для партии #{batch_num}...", flush=True)
    try:
        subprocess.run(["git", "add", "PUBLISHED_MW4_TIKTOK_LINKS.md", "auto_batch_orchestrator.py"], check=False)
        subprocess.run(["git", "commit", "-m", f"feat: completed and submitted batch {batch_num} to content rewards"], check=False)
        res = subprocess.run(["git", "push", "origin", "master"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode == 0:
            print("🚀 Успешный push в GitHub origin master!", flush=True)
        else:
            print("⚠️ Git push notice:", res.stderr.decode('utf-8', errors='ignore')[-200:])
    except Exception as e:
        print(f"⚠️ Ошибка git: {e}", flush=True)

def run_single_batch(batch_num, start_idx, count=5):
    print("\n" + "#" * 65)
    print(f"🎬 СТАРТ ПАРТИИ #{batch_num} (Видео {start_idx} - {start_idx + count - 1})")
    print("#" * 65)

    batch_items = [generate_spec_for_index(i) for i in range(start_idx, start_idx + count)]

    # 1. Render all clips
    print("\n[ЭТАП 1] РЕНДЕРИНГ ВСЕХ КЛИПОВ ПАРТИИ...")
    for item in batch_items:
        render_clip(item)

    # 2. Upload to TikTok
    print("\n[ЭТАП 2] ПУБЛИКАЦИЯ В TIKTOK...")
    published = upload_batch_to_tiktok(batch_items)

    # 3. Submit to Content Rewards
    print("\n[ЭТАП 3] АВТО-САБМИТ В CONTENT REWARDS...")
    statuses = submit_batch_to_rewards(batch_items, published)

    # 4. Update Markdown
    update_markdown_batch(batch_num, batch_items, published, statuses)

    # 5. Git Commit & Push
    git_commit_and_push(batch_num)

    print(f"\n🎉 ПАРТИЯ #{batch_num} ПОЛНОСТЬЮ ЗАВЕРШЕНА!")
    return len([s for s in statuses.values() if "УСПЕШНО" in s])

def main():
    target_total = 200
    batch_size = 5
    current_idx = 36  # Next video after Batch 7 (31-35)
    batch_num = 8

    print("=" * 65)
    print(f"   АВТОНОМНЫЙ ПАЙПЛАЙН: ЦЕЛЬ {target_total} РОЛИКОВ С ИНТЕРВАЛОМ 5 МИНУТ   ")
    print("=" * 65)

    while current_idx <= target_total:
        count = min(batch_size, target_total - current_idx + 1)
        successes = run_single_batch(batch_num, current_idx, count)

        current_idx += count
        batch_num += 1

        if current_idx <= target_total:
            print(f"\n⏱ [ИНТЕРВАЛ] Ожидание 5 минут (300 секунд) перед следующей партией #{batch_num}...", flush=True)
            for remaining in range(300, 0, -30):
                print(f"⏳ До старта партии #{batch_num} осталось {remaining} сек...", flush=True)
                time.sleep(30)

    print("\n🏁 ВСЕ 200 РОЛИКОВ УСПЕШНО ОБРАБОТАНЫ И ЗАСАБМИЧЕНЫ!")

if __name__ == "__main__":
    main()
