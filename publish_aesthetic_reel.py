import sys
import io
from pathlib import Path
from playwright.sync_api import sync_playwright
from instagrapi import Client

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
INSTA_PROFILE = BASE_DIR / "instagram_browser_profile"
PROXIES = "http://modeler_gZoM0l:01gngx0cg2f1@45.128.156.22:10641"

VIDEO_PATH = BASE_DIR / "scratch" / "aesthetic_smoke_buddah_final.mp4"

print("=" * 60)
print("🚀 ПУБЛИКАЦИЯ ЭСТЕТИЧНОГО СТОКОВОГО REEL")
print("🎬 Видео: Ночной город / POV Night Drive")
print("🎵 Трек: Smoke Buddah - Paradise (One Take)")
print("👤 Аккаунт: @kira.gyal")
print("=" * 60)

# 1. Grab sessionid
sessionid = None
with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context(user_data_dir=str(INSTA_PROFILE), channel="chrome", headless=True)
    cookies = ctx.cookies("https://www.instagram.com")
    ctx.close()
    for c in cookies:
        if c["name"] == "sessionid":
            sessionid = c["value"]
            break

# 2. Login
cl = Client(proxy=PROXIES)
cl.delay_range = [2, 5]
cl.login_by_sessionid(sessionid)
print("✅ Авторизован в Instagram через US прокси!")

# 3. Get track
tracks = cl.search_music("smoke buddah paradise")
track = tracks[0]
print(f"✅ Трек из каталога: {track.title} by {track.display_artist}")

# 4. Metadata
music_data = cl.clip_music_extra_data(
    track,
    audio_asset_start_time=0,
    overlap_duration=14000,
    original_volume=0.0,
    music_volume=1.0,
    product="story_camera_clips_v2"
)

caption = (
    "POV: 2 AM night drive with this track on repeat 🌃🎧\n\n"
    "Track: Smoke Buddah — Paradise (One Take)\n"
    "Tap the audio to listen & save to your playlist! 🔥\n\n"
    "#SmokeBuddah #Paradise #NightDrive #AestheticVibes #ChillVibes #LateNightDrive #TrendingAudio #ReelsViral"
)

# 5. Upload
print("🚀 Загрузка Reel в ленту с официальным аудиостикером...")
media = cl.clip_upload(
    path=VIDEO_PATH,
    caption=caption,
    extra_data=music_data
)

reel_url = f"https://www.instagram.com/reel/{media.code}/"
print("\n" + "=" * 60)
print(f"🎉 ЭСТЕТИЧНЫЙ REEL УСПЕШНО ОПУБЛИКОВАН!")
print(f"🔗 ССЫЛКА НА REEL: {reel_url}")
print(f"🎵 ЗВУК: {track.title} - {track.display_artist}")
print("=" * 60)
