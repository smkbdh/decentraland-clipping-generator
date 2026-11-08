import sys
import io
from pathlib import Path
from playwright.sync_api import sync_playwright
from instagrapi import Client

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
if sys.stderr.encoding.lower() != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8')

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
INSTA_PROFILE = BASE_DIR / "instagram_browser_profile"
PROXIES = "http://modeler_gZoM0l:01gngx0cg2f1@45.128.156.22:10641"
VIDEO_PATH = BASE_DIR / "scratch" / "smoke_buddah_girls_aesthetic_master.mp4"

print("=" * 60)
print("🚀 ПУБЛИКАЦИЯ ЭТАЛОННОГО 100% ВЕРТИКАЛЬНОГО REEL (GIRLS & CARS)")
print("🎵 Трек: Smoke Buddah — Paradise (One Take)")
print("👤 Аккаунт: @kira.gyal")
print("=" * 60)

sessionid = None
with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context(user_data_dir=str(INSTA_PROFILE), channel="chrome", headless=True)
    cookies = ctx.cookies("https://www.instagram.com")
    ctx.close()
    for c in cookies:
        if c["name"] == "sessionid":
            sessionid = c["value"]
            break

cl = Client(proxy=PROXIES)
cl.delay_range = [2, 5]
cl.login_by_sessionid(sessionid)
print("✅ Успешная авторизация в Instagram!")

tracks = cl.search_music("smoke buddah paradise")
track = tracks[0]
print(f"✅ Трек из каталога: {track.title} by {track.display_artist} (ID: {track.audio_asset_id})")

music_data = cl.clip_music_extra_data(
    track,
    audio_asset_start_time=0,
    overlap_duration=18500,
    original_volume=0.0,
    music_volume=1.0,
    product="story_camera_clips_v2"
)

caption = (
    "POV: 2 AM, city lights, feeling this vibe... 🌃✨\n\n"
    "Track: Smoke Buddah — Paradise (One Take)\n"
    "Tap audio to save to your playlist! 🎧🔥\n\n"
    "#SmokeBuddah #Paradise #Aesthetic #NightVibes #ReelsViral #TrendingSound #TokyoNights #CarsAndGirls"
)

print("🚀 Загрузка Reel в Instagram...")
media = cl.clip_upload(
    path=VIDEO_PATH,
    caption=caption,
    extra_data=music_data
)

reel_url = f"https://www.instagram.com/reel/{media.code}/"
print("\n" + "=" * 60)
print(f"🎉 ЭТАЛОННЫЙ REEL ОПУБЛИКОВАН!")
print(f"🔗 ССЫЛКА НА REEL: {reel_url}")
print(f"🎵 ЗВУК: {track.title} - {track.display_artist}")
print("=" * 60)

with open(BASE_DIR / "PUBLISHED_APPROVED_MASTER.txt", "w", encoding="utf-8") as f:
    f.write(f"Reel URL: {reel_url}\n")
