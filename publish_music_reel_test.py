import sys
import io
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright
from instagrapi import Client

# Force UTF-8 stdout
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
INSTA_PROFILE = BASE_DIR / "instagram_browser_profile"
PROXIES = "http://modeler_gZoM0l:01gngx0cg2f1@45.128.156.22:10641"

SOURCE_VIDEO = BASE_DIR / "clipping" / "test_renders" / "Warzone_S1_Sample1.mp4"
OUTPUT_DIR = BASE_DIR / "scratch" / "music_test"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
RENDERED_REEL = OUTPUT_DIR / "smoke_buddah_reel_test.mp4"

print("=" * 60)
print("🚀 ЗАПУСК ТЕСТОВОЙ ПУБЛИКАЦИИ REEL С ОФИЦИАЛЬНЫМ ТРЕКОМ")
print("🎵 Трек: Smoke Buddah - Paradise (One Take)")
print("👤 Аккаунт: @kira.gyal")
print(f"🌐 Прокси: US {PROXIES.split('@')[-1]}")
print("=" * 60)

# 1. Grab sessionid from browser
print("\n1. Извлекаем сессию браузера...")
sessionid = None
with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context(
        user_data_dir=str(INSTA_PROFILE),
        channel="chrome",
        headless=True
    )
    cookies = ctx.cookies("https://www.instagram.com")
    ctx.close()
    for c in cookies:
        if c["name"] == "sessionid":
            sessionid = c["value"]
            break

if not sessionid:
    raise RuntimeError("Не найден sessionid!")

# 2. Login to instagrapi via US proxy
print("2. Авторизация в мобильном API через US прокси...")
cl = Client(proxy=PROXIES)
cl.delay_range = [2, 5]
cl.login_by_sessionid(sessionid)
account = cl.account_info()
print(f"✅ Успешный вход! Аккаунт: @{account.username}")

# 3. Find track in catalog
print("\n3. Получение метаданных трека из базы Instagram...")
tracks = cl.search_music("smoke buddah paradise")
if not tracks:
    raise RuntimeError("Трек не найден!")

track = tracks[0]
print(f"✅ Трек: {track.title} by {track.display_artist}")
print(f"   Audio Asset ID: {track.id}")
print(f"   Audio Cluster ID: {track.audio_cluster_id}")

# 4. Download audio snippet from Instagram CDN
audio_path = cl.track_download_by_url(track.uri, "smoke_buddah_audio", OUTPUT_DIR)
print(f"✅ Аудиофайл трека скачан из CDN Instagram: {audio_path.name}")

# 5. Mux video with audio using ffmpeg
print("\n4. Сведение видео и аудиодорожки трека через FFmpeg...")
ffmpeg_cmd = [
    "ffmpeg", "-y",
    "-i", str(SOURCE_VIDEO),
    "-i", str(audio_path),
    "-map", "0:v:0",
    "-map", "1:a:0",
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    str(RENDERED_REEL)
]
res = subprocess.run(ffmpeg_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
if res.returncode != 0:
    print(f"⚠️ Ошибка ffmpeg: {res.stderr.decode('utf-8', errors='ignore')}")
    raise RuntimeError("FFmpeg error")

print(f"✅ Финальное видео для публикации готово: {RENDERED_REEL.name} ({RENDERED_REEL.stat().st_size / (1024*1024):.2f} MB)")

# 6. Build official music metadata payload
print("\n5. Формирование метаданных музыкального стикера...")
music_data = cl.clip_music_extra_data(
    track,
    audio_asset_start_time=0,
    overlap_duration=12000,
    original_volume=0.0,
    music_volume=1.0,
    product="story_camera_clips_v2"
)

caption = (
    "Smoke Buddah - Paradise (One Take) 🎧🔥\n\n"
    "Official sound attached directly from Instagram Music catalog!\n\n"
    "#SmokeBuddah #Paradise #OneTake #NewMusic #TrendingAudio #ReelsAudio #HipHop"
)

# 7. Upload Reel
print("\n6. Отправка Reel в Instagram с прикреплением трека...")
media = cl.clip_upload(
    path=RENDERED_REEL,
    caption=caption,
    extra_data=music_data
)

reel_url = f"https://www.instagram.com/reel/{media.code}/"
print("\n" + "=" * 60)
print(f"🎉 REEL УСПЕШНО ОПУБЛИКОВАН С ОФИЦИАЛЬНЫМ ТРЕКОМ!")
print(f"🔗 ССЫЛКА НА REEL: {reel_url}")
print(f"🎵 ОФИЦИАЛЬНЫЙ ЗВУК: {track.title} - {track.display_artist}")
print("=" * 60)
