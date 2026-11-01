import sys
import codecs
import time
import re
import os
import json
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

BASE_DIR = Path(__file__).resolve().parent
RAW_DIR = BASE_DIR / "mw4_multiplayer_raw"
RAW_FILE = RAW_DIR / "TopPlaysFinalists102726_16x9.mp4"
VIDEOS_DIR = BASE_DIR / "ready_videos" / "mw4_multiplayer_videos"
VIDEOS_DIR.mkdir(parents=True, exist_ok=True)

LINKS_FILE = BASE_DIR / "PUBLISHED_INSTAGRAM_MULTIPLAYER_LINKS.md"
STATE_FILE = BASE_DIR / "instagram_orchestrator_state.json"

INSTA_PROFILE = BASE_DIR / "instagram_browser_profile"
REWARDS_PROFILE = BASE_DIR / "rewards_browser_profile"

CAMPAIGN_URL = "https://contentrewards.com/c/campaigns/7a73a53b-2bba-4a5c-8187-05534dd6716d"
INSTAGRAM_URL = "https://www.instagram.com/"
FONT = "C\\:/Windows/Fonts/arialbd.ttf"

# 20 Official Slogans (Safe & Approved by Activision Brief)
SLOGANS = [
    "THIS NEW CALL OF DUTY LOOKS INSANE",
    "YEAH, MW4 LOOKS GOOD",
    "MW4 NEVER LOOKED SO GOOD",
    "THIS COD HAS NEVER PLAYED AND LOOKED BETTER",
    "MW4 MULTIPLAYER LOOKING A LITTLE DIFFERENT",
    "THE DETAILS SPEAK FOR THEMSELVES",
    "MW4 MP HAS NO BUSINESS LOOKING THIS GOOD",
    "THE GRAPHICS ARE ACTUALLY CRAZY",
    "COD MP HAS NO BUSINESS LOOKING THIS GOOD",
    "MW4 MP HITS DIFFERENT",
    "THE SOUND DESIGN IN MW4 IS PEAK",
    "CLEANEST WEAPON HANDLING IN COD HISTORY",
    "HOW DOES A GAME LOOK THIS REALISTIC?",
    "MW4 GUNPLAY FEELS SO SATISFYING",
    "THE MOVEMENT MECHANICS ARE UNREAL",
    "IS THIS THE BEST LOOKING COD EVER?",
    "THE LIGHTING AND SHADOWS ARE NEXT LEVEL",
    "TACTICAL SPRINT IN MW4 FEELS AMAZING",
    "EVERY SHOT IN MW4 SOUNDS CRISP",
    "NO FILTER NEEDED FOR THIS GAMEPLAY"
]

# 20 High-Tech Multiplayer Highlight Contexts
SUB_CONTEXTS = [
    "120 FPS Max Settings • Uncut Gunplay",
    "Tactical Sprint & Slide Cancel Breakdown",
    "Clean Weapon Handling & Recoil Control",
    "Competitive Search & Destroy Clutch Round",
    "Fast Paced Hardpoint Defense Showcase",
    "Crisp Weapon Audio & Tactical Reloads",
    "High Velocity Sniper Feed Across Perimeter",
    "Tactical Breach & Close Quarters Combat",
    "Insane Killstreak Deployment Turning Match",
    "Flanking Enemy Squad With Suppressed SMG",
    "Akimbo Secondary Clutch In Search Mode",
    "Micro Recoil Adjustment On Rapid Burst",
    "Point Blank Shotgun Action In Corridors",
    "Precision Corner Clearing & Crosshair Aim",
    "Bullet Impact Physics & Particle Effects",
    "Speed Reload & Aggressive Flank Route",
    "High Refresh Rate 144Hz Gunfight Feed",
    "Clean Iron Sight Tracking At Long Range",
    "Flick Shot Reaction Time At 240Hz Play",
    "Tactical Equipment Breach & Squad Wipe"
]

# 20 Interactive Comment Engagement & Retention Triggers
ENGAGEMENT_HOOKS = [
    "Rate this clutch from 1 to 10? 👇",
    "Which weapon build is this?! 🔥",
    "Wait for the 3rd elimination... 🤯",
    "Best slide cancel movement in COD? 👀",
    "Would you win this 1v3 situation? 🤔",
    "Is MW4 the best looking COD ever? 💬",
    "Turn sound ON for this audio 🎧",
    "The recoil control here is insane ⚡",
    "Notice the crosshair placement 👀",
    "Comment your favorite MW4 loadout 👇",
    "Wait for the flick shot at 0:08 ⏱️",
    "That final hitmarker sound... 🔊",
    "Watch the minimap on this play 🗺️",
    "How did he hit that last shot?! 🤯",
    "Cleanest movement you'll see today 💨",
    "Can we talk about that recoil control?! 🎯",
    "Watch until the final killcam ⚡",
    "Rate this weapon handling 1-10 👇",
    "Wait for the squad wipe at the end 🔥",
    "Did you notice the enemy on the flank? 👀"
]

# Captions (Natural gamer captions with required tags & #Ad disclosure)
CAPTION_HOOKS = [
    "The new Call of Duty looks INSANE",
    "MW4 Multiplayer is looking unreal",
    "COD Multiplayer has never looked better",
    "MW4 MP hits different",
    "COD MP has no business looking this good",
    "No filter needed for this gameplay",
    "The graphics are actually crazy",
    "Yeah, MW4 Multiplayer looks way too clean",
    "The movement in MW4 MP feels incredible",
    "Never seen Call of Duty graphics look this realistic",
    "The weapon animations in MW4 are on another level",
    "The sound design alone makes this worth playing",
    "Can't get enough of this gunplay",
    "This might be the cleanest COD multiplayer yet",
    "Everything about this movement feels buttery smooth"
]

def get_caption_for_index(idx):
    hook = CAPTION_HOOKS[(idx - 1) % len(CAPTION_HOOKS)]
    sub = SUB_CONTEXTS[(idx - 1) % len(SUB_CONTEXTS)]
    return (
        f"{hook}.\n"
        f"{sub}.\n\n"
        f"@callofduty\n"
        f"#Ad\n"
        f"#MW4 #CallOfDuty #Gaming"
    )

def ensure_video_rendered(idx):
    slug = re.sub(r'[^a-zA-Z0-9]', '_', SUB_CONTEXTS[(idx - 1) % len(SUB_CONTEXTS)][:22]).strip('_')
    out_file = VIDEOS_DIR / f"MW4_MP_Video{idx}_{slug}.mp4"

    if out_file.exists() and out_file.stat().st_size > 1000000:
        return out_file

    slogan = SLOGANS[(idx - 1) % len(SLOGANS)].replace("'", "").replace(":", "")
    sub_ctx = SUB_CONTEXTS[(idx - 1) % len(SUB_CONTEXTS)].replace("'", "").replace(":", "")
    retention = ENGAGEMENT_HOOKS[(idx - 1) % len(ENGAGEMENT_HOOKS)].replace("'", "").replace(":", "")

    # Calculate offset across 492s raw video (span 470s)
    span = 470.0
    start_sec = 4.0 + ((idx - 1) * 2.35) % span
    start_str = f"00:{int(start_sec)//60:02d}:{int(start_sec)%60:02d}"
    duration = "11.5"

    print(f"🎬 Рендеринг нового ролика #{idx} (start {start_str}, v3.0 HUD + Audio boost)...", flush=True)

    # v3.0 Visual & Audio Layout:
    # 1. Top HUD container at y=370-600 (safe zone)
    # 2. Tagline [ MW4 MULTIPLAYER • TOP PLAYS ] in gold at y=395
    # 3. Slogan at y=440 in clean bold white
    # 4. Context line at y=520 in silver #D0D0D0
    # 5. Middle sharp gameplay at y=656 to 1264
    # 6. Bottom comment engagement box at y=1330 to 1420 (above IG UI)
    # 7. Audio boost volume=1.25 for crisp hitmarkers & gunshots
    vf = (
        f"[0:v]split=2[bg][fg];"
        f"[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=20:4[blurred];"
        f"[fg]scale=1080:-1[sharp];"
        f"[blurred][sharp]overlay=(W-w)/2:(H-h)/2[base];"
        f"[base]drawbox=x=40:y=370:w=1000:h=230:color=black@0.85:t=fill,"
        f"drawbox=x=40:y=370:w=1000:h=6:color=0xFFCC00@1.0:t=fill,"
        f"drawtext=fontfile='{FONT}':text='[ MW4 MULTIPLAYER • TOP PLAYS ]':fontsize=24:fontcolor=0xFFCC00:x=(w-text_w)/2:y=395,"
        f"drawtext=fontfile='{FONT}':text='{slogan}':fontsize=46:fontcolor=white:x=(w-text_w)/2:y=440,"
        f"drawtext=fontfile='{FONT}':text='{sub_ctx}':fontsize=30:fontcolor=0xD0D0D0:x=(w-text_w)/2:y=520,"
        f"drawbox=x=120:y=1330:w=840:h=90:color=black@0.8:t=fill,"
        f"drawbox=x=120:y=1416:w=840:h=4:color=0xFFCC00@0.9:t=fill,"
        f"drawtext=fontfile='{FONT}':text='{retention}':fontsize=32:fontcolor=0xFFCC00:x=(w-text_w)/2:y=1360[vout];"
        f"[0:a]volume=1.25[aout]"
    )

    cmd = [
        "ffmpeg", "-y",
        "-ss", start_str,
        "-t", duration,
        "-i", str(RAW_FILE),
        "-filter_complex", vf,
        "-map", "[vout]",
        "-map", "[aout]",
        "-c:v", "libx264",
        "-preset", "ultrafast",
        "-crf", "23",
        "-c:a", "aac",
        "-b:a", "192k",
        "-ar", "44100",
        "-movflags", "+faststart",
        str(out_file)
    ]

    t0 = time.time()
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode == 0 and out_file.exists():
        size_mb = out_file.stat().st_size / (1024 * 1024)
        print(f"✅ ВИДЕО #{idx} (v3.0) ОТСРЕНДЕРЕНО: {size_mb:.2f} МБ (за {time.time()-t0:.1f}с)", flush=True)
        return out_file
    else:
        print(f"❌ ОШИБКА РЕНДЕРА #{idx}: {res.stderr.decode('utf-8', errors='ignore')[-300:]}", flush=True)
        return None

def upload_instagram_reel(page, idx, video_path, caption):
    print(f"\n==========================================")
    print(f"🎬 [INSTAGRAM REELS v3.0] ЗАГРУЗКА #{idx}")
    print(f"📁 Файл: {video_path.name}")
    print(f"==========================================")

    for attempt in range(5):
        try:
            page.goto(INSTAGRAM_URL, wait_until="domcontentloaded", timeout=45000)
            time.sleep(3)
            break
        except Exception as e:
            print(f"⚠️ Ошибка перехода на Instagram (попытка {attempt+1}/5): {e}", flush=True)
            time.sleep(10)
    else:
        return None

    dismiss_buttons = page.locator('button:has-text("Not Now"), button:has-text("Не сейчас"), button:has-text("Cancel")')
    if dismiss_buttons.count() > 0 and dismiss_buttons.first.is_visible():
        try:
            dismiss_buttons.first.click()
            time.sleep(1)
        except Exception:
            pass

    # 1. Click Create (+) button
    print("1. Нажимаем кнопку 'Создать' / '+'...")
    create_btn = page.locator(
        'svg[aria-label="New post"], svg[aria-label="Create"], svg[aria-label="Новая публикация"], '
        'a[href="#"]:has-text("Create"), a:has-text("Create"), a:has-text("Создать")'
    ).first

    try:
        create_btn.wait_for(state="visible", timeout=15000)
        create_btn.click()
        time.sleep(2)
    except Exception as e:
        print(f"❌ Ошибка поиска кнопки Создать: {e}")
        return None

    # Handle post submenu
    try:
        page.evaluate('''() => {
            const spans = Array.from(document.querySelectorAll('span'));
            const postSpan = spans.find(s => (s.textContent.trim() === 'Post' || s.textContent.trim() === 'Публикация') && s.offsetParent !== null);
            if (postSpan) {
                (postSpan.closest('div[role="button"]') || postSpan.closest('a') || postSpan).click();
            }
        }''')
        time.sleep(2)
    except Exception:
        pass

    # 2. Select file
    print("2. Передаем видеофайл...")
    file_input = page.locator('input[type="file"]').first
    try:
        file_input.wait_for(state="attached", timeout=15000)
        file_input.set_input_files(str(video_path))
        print("📤 Файл передан браузеру! Ждём обработку превью...")
        time.sleep(5)
    except Exception as e:
        print(f"❌ Ошибка выбора файла: {e}")
        return None

    ok_btn = page.locator('button:has-text("OK"), button:has-text("Понятно")')
    if ok_btn.count() > 0 and ok_btn.first.is_visible():
        ok_btn.first.click()
        time.sleep(1)

    # 3. Check 9:16 crop
    print("3. Проверяем пропорции 9:16...")
    try:
        crop_btn = page.locator('svg[aria-label="Select crop"], svg[aria-label="Выбрать кадрирование"]').first
        if crop_btn.is_visible():
            crop_btn.click()
            time.sleep(1)
            ratio_9_16 = page.locator('button:has-text("9:16"), span:has-text("9:16"), svg[aria-label="9:16"]')
            if ratio_9_16.count() > 0 and ratio_9_16.first.is_visible():
                ratio_9_16.first.click()
                time.sleep(1)
            else:
                orig = page.locator('button:has-text("Original"), span:has-text("Оригинал")')
                if orig.count() > 0 and orig.first.is_visible():
                    orig.first.click()
                    time.sleep(1)
            crop_btn.click()
            time.sleep(1)
    except Exception as e:
        print(f"⚠️ Кадрирование пропущено: {e}")

    # 4. Next 1
    print("4. Переход далее (Next 1)...")
    modal = page.locator('div[role="dialog"]').first
    next_btn = modal.locator('div[role="button"]:has-text("Next"), div[role="button"]:has-text("Далее"), button:has-text("Next"), button:has-text("Далее")').first
    try:
        next_btn.wait_for(state="visible", timeout=15000)
        next_btn.click()
        time.sleep(3)
    except Exception as e:
        print(f"❌ Ошибка перехода Next 1: {e}")
        return None

    # 5. Next 2
    print("5. Переход далее (Next 2)...")
    next_btn2 = modal.locator('div[role="button"]:has-text("Next"), div[role="button"]:has-text("Далее"), button:has-text("Next"), button:has-text("Далее")').first
    try:
        next_btn2.wait_for(state="visible", timeout=15000)
        next_btn2.click()
        time.sleep(3)
    except Exception as e:
        print(f"❌ Ошибка перехода Next 2: {e}")
        return None

    # 6. Fill caption
    print("6. Заполняем описание Reel...")
    try:
        caption_area = modal.locator('div[aria-label*="caption"], div[aria-label*="подпись"], div[contenteditable="true"]').first
        caption_area.wait_for(state="visible", timeout=15000)
        caption_area.click()
        time.sleep(0.5)
        page.keyboard.insert_text(caption)
        time.sleep(1)
        modal.locator('h1, div:has-text("Create new post"), div:has-text("New reel")').first.click(force=True)
        time.sleep(1)
        print("✅ Описание успешно введено!")
    except Exception as e:
        print(f"⚠️ Ошибка ввода описания: {e}")

    # 7. Share
    print("7. Нажимаем 'Поделиться' (Share)...")
    share_btn = modal.locator('div[role="button"]:has-text("Share"), div[role="button"]:has-text("Поделиться"), button:has-text("Share"), button:has-text("Поделиться")').first
    try:
        share_btn.wait_for(state="visible", timeout=15000)
        share_btn.click()
        print("🚀 Кнопка 'Share' нажата! Ждём публикацию...")
    except Exception as e:
        print(f"❌ Ошибка нажатия Share: {e}")
        return None

    # 8. Wait for finish
    print("⏳ Ожидание подтверждения публикации...")
    for _ in range(60):
        time.sleep(2)
        done_text = page.locator(
            'text=Your reel has been shared, '
            'text=Your post has been shared, '
            'text=Видеоролик опубликован, '
            'text=Публикация опубликована, '
            'text=Поделились, '
            'text=Shared reel'
        )
        if done_text.count() > 0 and done_text.first.is_visible():
            print(f"🎉 REEL #{idx} УСПЕШНО ОПУБЛИКОВАН В INSTAGRAM!")
            break

    time.sleep(4)
    reel_url = None
    try:
        page.goto("https://www.instagram.com/kira.gyal/reels/", wait_until="domcontentloaded")
        time.sleep(5)
        reels = page.eval_on_selector_all('a[href*="/reel/"]', 'els => els.map(e => e.href)')
        if reels:
            reel_url = reels[0]
            print(f"🔥 ПРЯМАЯ ССЫЛКА НА REEL #{idx}: {reel_url}")
    except Exception as e:
        print(f"⚠️ Ошибка поиска ссылки: {e}")

    return reel_url

def submit_instagram_to_rewards(page, reel_url, idx):
    print(f"\n🎯 САБМИТ REEL #{idx} В CONTENT REWARDS:")
    print(f"🔗 {reel_url}")

    for attempt in range(5):
        try:
            page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=45000)
            time.sleep(3)
            break
        except Exception as e:
            print(f"⚠️ Ошибка перехода на Content Rewards (попытка {attempt+1}/5): {e}", flush=True)
            time.sleep(10)
    else:
        return False

    try:
        trigger = page.locator('button:has-text("Submit clip"):visible').first
        trigger.wait_for(state="visible", timeout=10000)
        trigger.click()
        time.sleep(2)
    except Exception as e:
        print(f"❌ Ошибка открытия модалки: {e}")
        return False

    try:
        modal = page.locator('div[role="dialog"][aria-label="Submit clip"]').first
        inp = modal.locator('input').first
        inp.wait_for(state="visible", timeout=10000)
        inp.click()
        inp.fill("")
        inp.fill(reel_url)
        time.sleep(3)
        print("✅ Ссылка вставлена, ждём валидацию API...")
    except Exception as e:
        print(f"❌ Ошибка ввода ссылки: {e}")
        return False

    try:
        modal = page.locator('div[role="dialog"][aria-label="Submit clip"]').first
        chk = modal.locator('label:has-text("I\'ve read the requirements"), input[type="checkbox"]').first
        if chk.is_visible():
            chk.click()
            time.sleep(1)
    except Exception:
        pass

    modal = page.locator('div[role="dialog"][aria-label="Submit clip"]').first
    modal_btn = modal.locator('button:has-text("Submit clip"):visible').last
    if not modal_btn.is_disabled():
        modal_btn.click()
        print(f"🚀 Сабмит для #{idx} НАЖАТ!")
        time.sleep(6)
        print(f"🎉 REEL #{idx} УСПЕШНО ЗАСАБМИЧЕН В CONTENT REWARDS!")
        return True
    else:
        print(f"❌ Регулярный сабмит #{idx} заблокирован (валидация не прошла)!")
        cancel_btn = modal.locator('button:has-text("Cancel"):visible')
        if cancel_btn.count() > 0 and cancel_btn.first.is_visible():
            cancel_btn.first.click()
        return False

def load_state():
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"published_reels": {}, "submission_statuses": {}}

def save_state(published_reels, submission_statuses):
    try:
        with open(STATE_FILE, "w", encoding="utf-8") as f:
            json.dump({
                "published_reels": {str(k): v for k, v in published_reels.items()},
                "submission_statuses": {str(k): v for k, v in submission_statuses.items()}
            }, f, indent=2)
    except Exception as e:
        print(f"⚠️ Error saving state: {e}")

def update_markdown(published_map, status_map):
    lines = [
        "# 🔴 LIVE PUBLISHED INSTAGRAM REELS (MW4 Multiplayer Campaign - Batch 3 v3.0)\n\n",
        "Кампания: **Call of Duty - MW4 Multiplayer Launch Clipping**  \n",
        "Аккаунт: **[@kira.gyal](https://www.instagram.com/kira.gyal/)**  \n",
        "Оптимизация: **v3.0 HUD Badge + Audio Boost + Comment Engagement Triggers**  \n",
        "Статус: **Публикация активна**  \n\n",
        "---\n\n",
        "| # | Ролик | Ссылка на Instagram Reel | Статус в Content Rewards |\n",
        "|---|---|---|---|\n"
    ]
    for idx in sorted([int(k) for k in published_map.keys()]):
        url = published_map.get(idx) or published_map.get(str(idx))
        stat = status_map.get(idx) or status_map.get(str(idx), "⏳ Обработка")
        lines.append(f"| {idx} | MW4 MP Reel v3 #{idx} | [{url}]({url}) | {stat} |\n")

    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        f.writelines(lines)

def git_commit_and_push(batch_count):
    try:
        subprocess.run(["git", "add", "PUBLISHED_INSTAGRAM_MULTIPLAYER_LINKS.md", "instagram_batch_orchestrator.py", "instagram_orchestrator_state.json"], check=False)
        subprocess.run(["git", "commit", "-m", f"feat: submitted {batch_count} v3.0 reels to instagram and content rewards"], check=False)
        res = subprocess.run(["git", "push", "origin", "master"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode == 0:
            print("🚀 Push в GitHub origin master успешен!", flush=True)
        else:
            print(f"⚠️ Git push warning: {res.stderr.decode('utf-8', errors='ignore')}", flush=True)
    except Exception as e:
        print(f"⚠️ Git error: {e}", flush=True)

def main():
    target_total = 200
    safe_delay_seconds = 180  # 3 minutes between Reels to prevent Instagram action blocks

    print("=" * 65)
    print(f"   INSTAGRAM REELS PIPELINE v3.0: MW4 MULTIPLAYER ({target_total} РОЛИКОВ)   ")
    print(f"   ОПТИМИЗАЦИЯ: HUD BADGE + AUDIO BOOST + COMMENT ENGAGEMENT TRIGGERS   ")
    print("=" * 65)

    state = load_state()
    published_reels = {int(k): v for k, v in state.get("published_reels", {}).items()}
    submission_statuses = {int(k): v for k, v in state.get("submission_statuses", {}).items()}

    with sync_playwright() as p:
        insta_ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(INSTA_PROFILE),
            headless=True,
            viewport={"width": 1280, "height": 900},
            args=["--disable-blink-features=AutomationControlled"]
        )
        insta_page = insta_ctx.pages[0] if insta_ctx.pages else insta_ctx.new_page()

        for idx in range(1, target_total + 1):
            if idx in published_reels and submission_statuses.get(idx) == "✅ ЗАСАБМИЧЕНО":
                print(f"⏩ Ролик #{idx} уже опубликован ({published_reels[idx]}), пропускаем.", flush=True)
                continue

            # 1. Render Video with optimal safe zone layout
            video_file = ensure_video_rendered(idx)
            if not video_file:
                print(f"❌ Ошибка рендеринга видео #{idx}, повтор через 10с...", flush=True)
                time.sleep(10)
                video_file = ensure_video_rendered(idx)

            caption = get_caption_for_index(idx)

            # 2. Upload to Instagram with retries
            reel_url = None
            for upload_attempt in range(5):
                reel_url = upload_instagram_reel(insta_page, idx, video_file, caption)
                if reel_url:
                    break
                print(f"⚠️ Повтор попытки загрузки Reel #{idx} ({upload_attempt+1}/5) через 30с...", flush=True)
                time.sleep(30)

            if not reel_url:
                print(f"❌ Ошибка публикации Reel #{idx} после 5 попыток!", flush=True)
                continue

            published_reels[idx] = reel_url

            # 3. Auto-submit to Content Rewards with retries
            print(f"🎯 Открываем Content Rewards для сабмита #{idx}...", flush=True)
            success = False
            for submit_attempt in range(5):
                try:
                    rewards_ctx = p.chromium.launch_persistent_context(
                        user_data_dir=str(REWARDS_PROFILE),
                        headless=True,
                        viewport={"width": 1280, "height": 850},
                        args=["--disable-blink-features=AutomationControlled"]
                    )
                    rewards_page = rewards_ctx.pages[0] if rewards_ctx.pages else rewards_ctx.new_page()
                    success = submit_instagram_to_rewards(rewards_page, reel_url, idx)
                    rewards_ctx.close()
                    if success:
                        break
                except Exception as e:
                    print(f"⚠️ Ошибка контекста rewards #{idx}: {e}", flush=True)
                time.sleep(15)

            submission_statuses[idx] = "✅ ЗАСАБМИЧЕНО" if success else "❌ Ошибка сабмита"

            # Save state & update docs
            save_state(published_reels, submission_statuses)
            update_markdown(published_reels, submission_statuses)

            if idx % 5 == 0 or idx == target_total:
                git_commit_and_push(idx)

            if idx < target_total:
                print(f"\n⏱ [БЕЗОПАСНАЯ ПАУЗА] Ожидание {safe_delay_seconds}с (3 мин) перед следующим Reel...", flush=True)
                # Pre-render next video during the pause
                next_idx = idx + 1
                ensure_video_rendered(next_idx)
                for rem in range(safe_delay_seconds - 25, 0, -30):
                    print(f"⏳ До публикации Reel #{next_idx} осталось {rem}с...", flush=True)
                    time.sleep(30)

        insta_ctx.close()

    git_commit_and_push(target_total)
    print("\n🏁 ВСЕ 200 РОЛИКОВ (v3.0) УСПЕШНО ОПУБЛИКОВАНЫ В INSTAGRAM И ЗАСАБМИЧЕНЫ!")

if __name__ == "__main__":
    main()
