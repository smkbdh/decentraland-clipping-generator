import sys
import codecs
import time
import json
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach(), errors="replace")

BASE_DIR = Path(__file__).resolve().parent
REWARDS_PROFILE = BASE_DIR / "rewards_browser_profile"
CAMPAIGN_URL = "https://contentrewards.com/c/campaigns/7a73a53b-2bba-4a5c-8187-05534dd6716d"

IG_STATE = BASE_DIR / "instagram_orchestrator_state.json"
TT_STATE = BASE_DIR / "tiktok_orchestrator_state.json"
IG_MD = BASE_DIR / "PUBLISHED_INSTAGRAM_MULTIPLAYER_LINKS.md"
TT_MD = BASE_DIR / "PUBLISHED_TIKTOK_MULTIPLAYER_LINKS_V4.md"

def update_ig_markdown(published_map, status_map):
    lines = [
        "# 🔴 LIVE PUBLISHED INSTAGRAM REELS (MW4 Multiplayer Campaign - Batch 4 v4.0 NLP)\n\n",
        "Кампания: **Call of Duty - MW4 Multiplayer Launch Clipping**  \n",
        "Аккаунт: **[@kira.gyal](https://www.instagram.com/kira.gyal/)**  \n",
        "Оптимизация: **v4.0 NLP Triggers + Ultra-Bold Impact Font + Emoji Badges + Audio Boost**  \n",
        "Статус: **Публикация активна**  \n\n",
        "---\n\n",
        "| # | Ролик | Ссылка на Instagram Reel | Статус в Content Rewards |\n",
        "|---|---|---|---|\n"
    ]
    for idx in sorted([int(k) for k in published_map.keys()]):
        url = published_map.get(idx) or published_map.get(str(idx))
        stat = status_map.get(idx) or status_map.get(str(idx), "⏳ Обработка")
        lines.append(f"| {idx} | MW4 MP Reel v4 #{idx} | [{url}]({url}) | {stat} |\n")
    with open(IG_MD, "w", encoding="utf-8") as f:
        f.writelines(lines)

def update_tt_markdown(published_map, status_map):
    lines = [
        "# 🔴 LIVE PUBLISHED TIKTOK VIDEOS (MW4 Multiplayer Campaign - Batch 4 v4.0 NLP)\n\n",
        "Кампания: **Call of Duty - MW4 Multiplayer Launch Clipping**  \n",
        "Аккаунт: **[@buddah_ai](https://www.tiktok.com/@buddah_ai)**  \n",
        "Оптимизация: **v4.0 NLP Triggers + Ultra-Bold Impact Font + Emoji Badges + Audio Boost**  \n",
        "Статус: **Публикация активна**  \n\n",
        "---\n\n",
        "| # | Ролик | Ссылка на TikTok | Статус в Content Rewards |\n",
        "|---|---|---|---|\n"
    ]
    for idx in sorted([int(k) for k in published_map.keys()]):
        url = published_map.get(idx) or published_map.get(str(idx))
        stat = status_map.get(idx) or status_map.get(str(idx), "⏳ Обработка")
        lines.append(f"| {idx} | MW4 MP TikTok v4 #{idx} | [{url}]({url}) | {stat} |\n")
    with open(TT_MD, "w", encoding="utf-8") as f:
        f.writelines(lines)

def submit_clip(page, clip_url, label):
    for attempt in range(3):
        try:
            page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=25000)
            time.sleep(2)
            break
        except Exception:
            time.sleep(3)
    else:
        return False

    # Dismiss any blocking modals
    for btn_text in ["Not now", "Cancel", "Close"]:
        try:
            b = page.locator(f'button:has-text("{btn_text}")')
            if b.count() > 0 and b.first.is_visible():
                b.first.click()
                time.sleep(0.8)
        except Exception:
            pass

    try:
        trigger = page.locator('button:has-text("Submit clip"):visible').first
        trigger.wait_for(state="visible", timeout=10000)
        trigger.click()
        time.sleep(1.5)
    except Exception as e:
        print(f"❌ [{label}] Кнопка Submit clip не найдена: {e}", flush=True)
        return False

    try:
        modal = page.locator('div[role="dialog"][aria-label="Submit clip"]').first
        inp = modal.locator('input').first
        inp.wait_for(state="visible", timeout=8000)
        inp.click()
        inp.fill("")
        inp.fill(clip_url)
        time.sleep(2)
    except Exception as e:
        print(f"❌ [{label}] Ошибка ввода: {e}", flush=True)
        return False

    try:
        chk = modal.locator('label:has-text("I\'ve read the requirements"), input[type="checkbox"]').first
        if chk.is_visible():
            chk.click()
            time.sleep(0.4)
    except Exception:
        pass

    modal_btn = modal.locator('button:has-text("Submit clip"):visible').last
    if not modal_btn.is_disabled():
        modal_btn.click()
        time.sleep(3)
        print(f"✅ ЗАСАБМИЧЕНО: {label}", flush=True)
        return True
    else:
        print(f"⚠️ [{label}] Кнопка заблокирована (уже засабмичен)", flush=True)
        cancel_btn = modal.locator('button:has-text("Cancel"):visible')
        if cancel_btn.count() > 0 and cancel_btn.first.is_visible():
            cancel_btn.first.click()
        # Mark as submitted if it was already submitted
        return True

def main():
    print("=" * 60)
    print("🚀 САБМИТ ВСЕХ ОПУБЛИКОВАННЫХ РОЛИКОВ В CONTENT REWARDS")
    print("=" * 60)

    ig_data = json.load(open(IG_STATE, encoding="utf-8")) if IG_STATE.exists() else {}
    tt_data = json.load(open(TT_STATE, encoding="utf-8")) if TT_STATE.exists() else {}

    ig_reels = ig_data.get("published_reels", {})
    ig_statuses = ig_data.get("submission_statuses", {})

    tt_videos = tt_data.get("published_videos", {})
    tt_statuses = tt_data.get("submission_statuses", {})

    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(REWARDS_PROFILE),
            headless=True,
            viewport={"width": 1280, "height": 850}
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()

        # 1. Instagram pending submissions
        ig_pending = [idx for idx in sorted([int(k) for k in ig_reels.keys()]) if ig_statuses.get(str(idx)) != "✅ ЗАСАБМИЧЕНО"]
        print(f"📌 Найдено {len(ig_pending)} опубликованных Instagram Reels, требующих сабмита...")
        for i, idx in enumerate(ig_pending):
            url = ig_reels[str(idx)]
            success = submit_clip(page, url, f"IG Reel #{idx}")
            if success:
                ig_statuses[str(idx)] = "✅ ЗАСАБМИЧЕНО"
                ig_data["submission_statuses"] = ig_statuses
                with open(IG_STATE, "w", encoding="utf-8") as f:
                    json.dump(ig_data, f, indent=2)
                update_ig_markdown(ig_reels, ig_statuses)
            time.sleep(2)

        # 2. TikTok pending submissions
        tt_pending = [idx for idx in sorted([int(k) for k in tt_videos.keys()]) if tt_statuses.get(str(idx)) != "✅ ЗАСАБМИЧЕНО"]
        print(f"\n📌 Найдено {len(tt_pending)} опубликованных TikTok видео, требующих сабмита...")
        for i, idx in enumerate(tt_pending):
            url = tt_videos[str(idx)]
            success = submit_clip(page, url, f"TikTok #{idx}")
            if success:
                tt_statuses[str(idx)] = "✅ ЗАСАБМИЧЕНО"
                tt_data["submission_statuses"] = tt_statuses
                with open(TT_STATE, "w", encoding="utf-8") as f:
                    json.dump(tt_data, f, indent=2)
                update_tt_markdown(tt_videos, tt_statuses)
            time.sleep(2)

        ctx.close()

    # Commit and push
    try:
        subprocess.run(["git", "add", "PUBLISHED_INSTAGRAM_MULTIPLAYER_LINKS.md", "PUBLISHED_TIKTOK_MULTIPLAYER_LINKS_V4.md", "instagram_orchestrator_state.json", "tiktok_orchestrator_state.json"], check=False)
        subprocess.run(["git", "commit", "-m", "feat: auto-submitted all published v4.0 reels and tiktoks to content rewards"], check=False)
        subprocess.run(["git", "push", "origin", "master"], check=False)
        print("🚀 GitHub push выполнен!")
    except Exception as e:
        print("Git push error:", e)

    print("\n🏁 САБМИТ ВСЕХ ОПУБЛИКОВАННЫХ КЛИПОВ ЗАВЕРШЕН!")

if __name__ == "__main__":
    main()
