# -*- coding: utf-8 -*-
"""Пакетная публикация 10 мини-документалок BuddahAI в YouTube Shorts и TikTok (без Instagram)
с интервалом 10 минут и установкой обложек.
"""
import argparse
import json
import re
import sys
import time
from pathlib import Path
import requests

sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = Path(__file__).resolve().parent
SRC_DIR = Path(r"C:\Users\humun\Downloads\BuddahAI_10_MiniDocs_2min")
REPORT = SRC_DIR / "publish_report.md"

HASHTAGS = "#BuddahAI #ИИагенты #Нейросети #ИскусственныйИнтеллект #Автоматизация #AIVideo"
YT_TAGS = ["BuddahAI", "ИИагенты", "Нейросети", "ИскусственныйИнтеллект", "Автоматизация", "AIVideo", "shorts"]

ITEMS = [
    {
        "index": 1,
        "title": "NVIDIA — незаменимый человек",
        "body": "Один человек ушёл — и технологический рынок пошатнулся. Что на самом деле стоит за возвращением Дженсена Хуанга?\n\nХочешь научиться создавать такие ролики с помощью ИИ-агентов? Пиши «АГЕНТ» в комментариях.",
    },
    {
        "index": 2,
        "title": "Запрет ИИ-музыки",
        "body": "27 миллионов треков под угрозой удаления. Началась борьба за ценность человеческого творчества. Кто победит?\n\nХочешь создавать такие ролики с помощью ИИ-агентов? Пиши «АГЕНТ».",
    },
    {
        "index": 3,
        "title": "Пузырь искусственного интеллекта",
        "body": "Технологическая революция или крупнейший финансовый пузырь в истории? Инвесторы уже сделали свои ставки.\n\nХочешь научиться создавать такие ролики? Пиши «АГЕНТ».",
    },
    {
        "index": 4,
        "title": "ИИ покидает Землю",
        "body": "Миллион спутников для вычислений в космосе. Зачем искусственному интеллекту выходить за пределы нашей планеты?\n\nХочешь создавать такой контент с помощью ИИ? Пиши «АГЕНТ».",
    },
    {
        "index": 5,
        "title": "Хакер против Rockstar",
        "body": "Один подросток нарушил планы многомиллиардной игровой корпорации. Чем закончилась его история?\n\nХочешь научиться создавать такие ролики? Пиши «АГЕНТ».",
    },
    {
        "index": 6,
        "title": "Чёрная пятница",
        "body": "Ты действительно экономишь или тебя просто убедили потратить деньги? Разбираем психологию скидок.\n\nХочешь создавать такие видео с помощью ИИ-агентов? Пиши «АГЕНТ».",
    },
    {
        "index": 7,
        "title": "Ормузский пролив",
        "body": "Один морской пролив способен повлиять на стоимость твоей жизни. Даже если ты находишься за тысячи километров от него.\n\nХочешь научиться создавать такие ролики? Пиши «АГЕНТ».",
    },
    {
        "index": 8,
        "title": "Мир без облака",
        "body": "Что произойдёт, если цифровая инфраструктура, от которой мы зависим каждый день, внезапно перестанет работать?\n\nХочешь автоматизировать создание таких видео? Пиши «АГЕНТ».",
    },
    {
        "index": 9,
        "title": "Война за интеллект",
        "body": "США и Китай сражаются за технологическое превосходство. Кто будет контролировать интеллект будущего?\n\nХочешь создавать такой контент с помощью ИИ-агентов? Пиши «АГЕНТ».",
    },
    {
        "index": 10,
        "title": "Система против человека",
        "body": "Он просто хотел попасть на похороны отца. Но что происходит, когда правила системы оказываются важнее человека?\n\nХочешь научиться создавать такие ролики с помощью ИИ? Пиши «АГЕНТ».",
    },
]


def log_report(idx: int, platform: str, url: str, err: str = "", cover_note: str = ""):
    if not REPORT.exists():
        REPORT.write_text("| № | Площадка | Ссылка | Обложка | Ошибка | Время |\n|---|---|---|---|---|---|\n", encoding="utf8")
    with open(REPORT, "a", encoding="utf8") as f:
        f.write(f"| {idx:02d} | {platform} | {url or '—'} | {cover_note or '—'} | {err or '—'} | {time.strftime('%Y-%m-%d %H:%M')} |\n")


def done_set():
    out = set()
    if REPORT.exists():
        for line in REPORT.read_text(encoding="utf8").splitlines():
            c = [x.strip() for x in line.strip("|").split("|")]
            if len(c) >= 5 and c[0].isdigit() and c[4] == "—":
                out.add((int(c[0]), c[1]))
    return out


def set_youtube_thumbnail(token: str, uid: str, video_id: str, cover_path: Path) -> str:
    import auto_pipeline as ap
    if not cover_path.exists():
        return "файл обложки не найден"
    headers = {"apikey": ap.ANON_KEY, "Authorization": f"Bearer {token}"}
    r_cp = requests.get(
        f"{ap.SUPABASE_URL}/rest/v1/connected_platforms?user_id=eq.{uid}&platform=eq.youtube&select=access_token",
        headers=headers, timeout=15,
    )
    if r_cp.status_code != 200 or not r_cp.json():
        return "не найден access_token"
    yt_token = r_cp.json()[0].get("access_token")
    if not yt_token:
        return "пустой access_token"
    r_thumb = requests.post(
        f"https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId={video_id}&uploadType=media",
        headers={"Authorization": f"Bearer {yt_token}", "Content-Type": "image/png"},
        data=cover_path.read_bytes(),
        timeout=60,
    )
    if r_thumb.status_code in (200, 201):
        return "установлена"
    return f"API {r_thumb.status_code}"


def publish_youtube(item: dict) -> tuple[str, str]:
    import auto_pipeline as ap
    idx = item["index"]
    video_path = SRC_DIR / f"{idx:02d}_BuddahAI_2min.mp4"
    cover_path = SRC_DIR / f"{idx:02d}_cover.png"
    title = item["title"]
    description = f"{item['body']}\n\n{HASHTAGS}"

    token, uid = ap.get_valid_session()
    h = {"apikey": ap.ANON_KEY, "Authorization": f"Bearer {token}"}
    storage_path = f"{uid}/{int(time.time())}_{video_path.name}"
    with open(video_path, "rb") as f:
        res = requests.post(
            f"{ap.SUPABASE_URL}/storage/v1/object/videos/{storage_path}",
            headers={**h, "Content-Type": "video/mp4"},
            data=f.read(),
            timeout=180,
        )
    if res.status_code not in (200, 201):
        raise RuntimeError(f"storage {res.status_code}: {res.text[:200]}")

    jh = {**h, "Content-Type": "application/json", "Prefer": "return=representation"}
    vr = requests.post(
        f"{ap.SUPABASE_URL}/rest/v1/videos",
        headers=jh,
        json={"user_id": uid, "file_name": video_path.name, "file_path": storage_path, "file_size": video_path.stat().st_size, "status": "uploaded"},
        timeout=30,
    )
    post_id = None
    if vr.status_code in (200, 201) and vr.json():
        pr = requests.post(
            f"{ap.SUPABASE_URL}/rest/v1/posts",
            headers=jh,
            json={"user_id": uid, "video_id": vr.json()[0]["id"], "title": title, "description": description, "status": "pending"},
            timeout=30,
        )
        if pr.status_code in (200, 201) and pr.json():
            post_id = pr.json()[0]["id"]

    er = requests.post(
        f"{ap.SUPABASE_URL}/functions/v1/youtube-upload",
        headers=jh,
        timeout=300,
        json={
            "user_id": uid,
            "video_path": storage_path,
            "title": title,
            "description": description,
            "tags": YT_TAGS,
            "is_shorts": True,
            "privacy_status": "public",
            "post_id": post_id,
        },
    )
    if er.status_code != 200:
        raise RuntimeError(f"youtube-upload {er.status_code}: {er.text[:200]}")

    yt_url = er.json().get("url", "")
    vid_match = re.search(r"(?:shorts/|v=)([A-Za-z0-9_-]{11})", yt_url)
    cover_note = "пропущена"
    if vid_match:
        cover_note = set_youtube_thumbnail(token, uid, vid_match.group(1), cover_path)
    return yt_url, cover_note


def try_tiktok_cover(page, cover_path: Path) -> str:
    if not cover_path.exists():
        return "файл не найден"
    try:
        edit_btn = page.locator('button:has-text("Edit cover"), div[role="button"]:has-text("Edit cover"), span:has-text("Edit cover"), button:has-text("Изменить обложку")').first
        if edit_btn.count() == 0 or not edit_btn.is_visible():
            return "кнопка Edit cover не найдена"
        edit_btn.click()
        time.sleep(2)
        upload_tab = page.locator('text=Upload cover, text=Загрузить обложку').first
        if upload_tab.count() > 0 and upload_tab.is_visible():
            upload_tab.click()
            time.sleep(1)
        img_input = page.locator('input[type="file"][accept*="image"]').last
        if img_input.count() > 0:
            img_input.set_input_files(str(cover_path))
            time.sleep(2)
            confirm_btn = page.locator('button:has-text("Confirm"), button:has-text("Save"), button:has-text("Подтвердить"), button:has-text("Сохранить")').last
            if confirm_btn.count() > 0 and confirm_btn.is_visible():
                confirm_btn.click()
                time.sleep(2)
                return "установлена"
        # Close modal if not confirmed
        close_btn = page.locator('button[aria-label="Close"], svg[class*="close"]').first
        if close_btn.count() > 0 and close_btn.is_visible():
            close_btn.click()
            time.sleep(1)
        return "не удалось подтвердить"
    except Exception as e:
        return f"ошибка: {str(e)[:40]}"


def publish_tiktok(item: dict) -> tuple[str, str]:
    from playwright.sync_api import sync_playwright
    import tiktok_uploader as tt

    idx = item["index"]
    video_path = SRC_DIR / f"{idx:02d}_BuddahAI_2min.mp4"
    cover_path = SRC_DIR / f"{idx:02d}_cover.png"
    caption = f"{item['title']}\n\n{item['body']}\n\n{HASHTAGS}"

    cover_note = "по умолчанию"
    with sync_playwright() as p:
        ctx = tt.launch_browser(p, headless=True)
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        tt.check_and_wait_for_login(page)

        if not video_path.exists():
            ctx.close()
            raise RuntimeError(f"Файл не найден: {video_path}")

        if "tiktokstudio/upload" not in page.url:
            page.goto(tt.TIKTOK_UPLOAD_URL, wait_until="domcontentloaded", timeout=60000)
            time.sleep(4)

        file_input = page.locator('input[type="file"][accept*="video"]').first
        file_input.wait_for(state="attached", timeout=15000)
        file_input.set_input_files(str(video_path))
        time.sleep(8)

        try:
            got_it = page.locator('button:has-text("Got it"), button:has-text("Понятно")')
            if got_it.count() > 0 and got_it.first.is_visible():
                got_it.first.click()
                time.sleep(1)
        except Exception:
            pass

        editor = page.locator('div.notranslate.public-DraftEditor-content, div[contenteditable="true"]').first
        editor.wait_for(state="visible", timeout=20000)
        editor.click()
        time.sleep(0.5)
        page.keyboard.press("Control+A")
        page.keyboard.press("Backspace")
        time.sleep(0.5)
        page.keyboard.insert_text(caption)
        time.sleep(1)

        cover_note = try_tiktok_cover(page, cover_path)

        post_button = None
        for _ in range(45):
            btn_candidates = page.locator('button.Button__root--type-primary, button[type="button"]')
            for i in range(btn_candidates.count()):
                cand = btn_candidates.nth(i)
                txt = cand.inner_text().strip()
                if txt in ("Post", "Опубликовать", "Publish") and cand.is_visible() and not cand.is_disabled():
                    post_button = cand
                    break
            if post_button:
                break
            time.sleep(2)

        if not post_button:
            ctx.close()
            raise RuntimeError("Кнопка Post не стала активной за 90 сек")

        post_button.scroll_into_view_if_needed()
        time.sleep(1)
        post_button.click()
        time.sleep(2)

        post_now = page.locator('button:has-text("Post now"), button:has-text("Опубликовать сейчас")')
        try:
            if post_now.count() > 0 and post_now.first.is_visible():
                post_now.first.click()
                time.sleep(3)
        except Exception:
            pass

        for _ in range(20):
            time.sleep(2)
            if "tiktokstudio/content" in page.url:
                break
            up_another = page.locator('button:has-text("Upload another video"), button:has-text("Upload another")')
            if up_another.count() > 0 and up_another.first.is_visible():
                break

        time.sleep(3)
        ctx.close()

    return "опубликовано (@buddah_ai)", cover_note


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--interval-minutes", type=float, default=10.0)
    ap.add_argument("--start", type=int, default=1)
    ap.add_argument("--end", type=int, default=10)
    args = ap.parse_args()

    todo = [it for it in ITEMS if args.start <= it["index"] <= args.end]
    print(f"План публикации: ролики {[it['index'] for it in todo]}, интервал {args.interval_minutes} мин., площадки: YouTube + TikTok", flush=True)

    for i, item in enumerate(todo):
        idx = item["index"]
        t0 = time.time()
        done = done_set()

        if (idx, "YouTube Shorts") not in done:
            for attempt in (1, 2):
                print(f"\n[{time.strftime('%H:%M')}] Ролик {idx:02d} ({item['title']}) -> YouTube (попытка {attempt})", flush=True)
                try:
                    url, cnote = publish_youtube(item)
                    print(f"ГОТОВО YT: {url} | Обложка: {cnote}", flush=True)
                    log_report(idx, "YouTube Shorts", url, cover_note=cnote)
                    break
                except Exception as e:
                    print(f"ОШИБКА YT: {e}", flush=True)
                    if attempt == 2:
                        log_report(idx, "YouTube Shorts", "", err=str(e).replace("|", "/")[:200])
                    else:
                        time.sleep(30)

        if (idx, "TikTok") not in done:
            for attempt in (1, 2):
                print(f"\n[{time.strftime('%H:%M')}] Ролик {idx:02d} ({item['title']}) -> TikTok (попытка {attempt})", flush=True)
                try:
                    url, cnote = publish_tiktok(item)
                    print(f"ГОТОВО TT: {url} | Обложка: {cnote}", flush=True)
                    log_report(idx, "TikTok", url, cover_note=cnote)
                    break
                except Exception as e:
                    print(f"ОШИБКА TT: {e}", flush=True)
                    if attempt == 2:
                        log_report(idx, "TikTok", "", err=str(e).replace("|", "/")[:200])
                    else:
                        time.sleep(30)

        if i < len(todo) - 1:
            wait = max(0.0, args.interval_minutes * 60.0 - (time.time() - t0))
            if wait > 0:
                print(f"\nСледующий ролик в {time.strftime('%H:%M:%S', time.localtime(time.time() + wait))} (ждём {int(wait)} сек.)", flush=True)
                time.sleep(wait)

    print("\nВсе 10 роликов обработаны! Отчёт:", REPORT, flush=True)


if __name__ == "__main__":
    main()
