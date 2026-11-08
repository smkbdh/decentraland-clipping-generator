import sys
import io
import re
import json
import random
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
if sys.stderr.encoding.lower() != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8')

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
SCRATCH_DIR = BASE_DIR / "scratch"
FAST_CUTS_DIR = SCRATCH_DIR / "fast_cuts"
NATIVE_DIR = SCRATCH_DIR / "native_vertical_pool"
GIRLS_DIR = SCRATCH_DIR / "girls_vertical_pool"
CURATED_DIR = SCRATCH_DIR / "curated_vertical_girls"
OUTPUT_DIR = BASE_DIR / "ready_music_videos"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

AUDIO_FILE = SCRATCH_DIR / "music_test" / "smoke_buddah_audio.mp4"

WIDTH = 1080
HEIGHT = 1920

# 100% Curated, Verified, Native Vertical 1080x1920 Pools:
# ONLY Beautiful Female Models, Supercars, Night City & Smoke Buddah Aesthetic.
# ZERO Christmas/New Year, ZERO Garlands, ZERO Men, ZERO Blurry Bars.
ASSET_POOLS = {
    "girl_laser": [
        CURATED_DIR / "50428.mp4",  # Model seated with cyan laser ring
        CURATED_DIR / "50429.mp4",  # Dancer in green laser column
        CURATED_DIR / "50430.mp4",  # Model silhouette blue laser pillar
        CURATED_DIR / "50431.mp4",  # Model in green laser glow
        CURATED_DIR / "50432.mp4",  # Model in blue laser portal
        CURATED_DIR / "50433.mp4",  # Dancer backbend cyan laser light
        CURATED_DIR / "50434.mp4",  # Close-up face illuminated by cyber laser lines
        CURATED_DIR / "50435.mp4",  # Dancer purple UV laser glow
        CURATED_DIR / "50436.mp4"   # Full body dancer vertical laser stream
    ],
    "girl_neon": [
        CURATED_DIR / "1229.mp4",   # Tattooed brunette girl in neon window
        CURATED_DIR / "1230.mp4",   # Tattooed brunette close-up red neon
        CURATED_DIR / "1231.mp4",   # Brunette girl by red neon sign
        CURATED_DIR / "1232.mp4",   # Red neon glow atmosphere
        CURATED_DIR / "1234.mp4",   # Tattooed brunette girl on stool
        CURATED_DIR / "1227.mp4",   # Brunette girl night amusement park
        CURATED_DIR / "1228.mp4"    # Brunette girl dancing night
    ],
    "girl_car_photoshoot": [
        GIRLS_DIR / "44550.mp4",    # Blonde model sunglasses leather jacket
        GIRLS_DIR / "44551.mp4",    # Reflection in rearview mirror
        GIRLS_DIR / "44552.mp4",    # Inside cockpit sports car neon
        GIRLS_DIR / "44553.mp4",    # Reflection in side mirror
        GIRLS_DIR / "44554.mp4",    # Opening sports car door in fog
        GIRLS_DIR / "44555.mp4",    # Sitting on hood of sports car
        GIRLS_DIR / "44556.mp4",    # Walking past sports car
        GIRLS_DIR / "44558.mp4",    # Close-up sunglasses red lipstick
        GIRLS_DIR / "44559.mp4",    # Driver seat sunglasses
        GIRLS_DIR / "44560.mp4",    # Standing by car neon tube
        GIRLS_DIR / "44561.mp4"     # Headlights and girl silhouette
    ],
    "girl_urban_lifestyle": [
        CURATED_DIR / "1299.mp4",   # Model in black lingerie on leather couch
        CURATED_DIR / "1300.mp4",   # Urban girl portrait green neon
        CURATED_DIR / "1302.mp4",   # Urban girl posing dark glass corridor
        NATIVE_DIR / "51406.mp4"    # Girl with headphones in bed at night
    ],
    "night_city_speed": [
        FAST_CUTS_DIR / "49878.mp4", # Tokyo skyline aerial panorama
        FAST_CUTS_DIR / "40746.mp4", # Tokyo neon skyscrapers
        FAST_CUTS_DIR / "40747.mp4", # Red sports car cruising neon avenue
        NATIVE_DIR / "44691.mp4",    # Highway speed tail lights mist
        FAST_CUTS_DIR / "42048.mp4"  # Aerial highway interchange loop
    ],
    "smoke_atmosphere": [
        CURATED_DIR / "1968.mp4"    # Smoke plumes billowing in dark void (Smoke Buddah vibe)
    ]
}

# 30 Distinct, Non-Repeating Opening Shots for the 30 Videos
OPENING_SHOT_EXHAUSTION_QUEUE = [
    CURATED_DIR / "50428.mp4",   # 1: Model seated in laser ring
    GIRLS_DIR / "44550.mp4",     # 2: Blonde model with sports car
    CURATED_DIR / "1229.mp4",    # 3: Tattooed brunette in neon window
    CURATED_DIR / "1968.mp4",    # 4: Smoke Buddah mystical smoke plumes
    FAST_CUTS_DIR / "40747.mp4", # 5: Red sports car night cruise
    CURATED_DIR / "50433.mp4",   # 6: Sensual dancer backbend cyan laser
    GIRLS_DIR / "44555.mp4",     # 7: Blonde model sitting on sports car hood
    CURATED_DIR / "1230.mp4",    # 8: Tattooed brunette close-up red neon
    CURATED_DIR / "1300.mp4",    # 9: Urban girl green neon portrait
    FAST_CUTS_DIR / "49878.mp4", # 10: Tokyo night skyline panorama
    CURATED_DIR / "50434.mp4",   # 11: Cyber laser line face close-up
    GIRLS_DIR / "44558.mp4",     # 12: Blonde model sunglasses close-up
    CURATED_DIR / "1231.mp4",    # 13: Brunette by red neon sign
    NATIVE_DIR / "44691.mp4",    # 14: Highway speed mist
    CURATED_DIR / "1299.mp4",    # 15: Model on leather couch warm ambient
    CURATED_DIR / "50432.mp4",   # 16: Model in blue laser portal
    GIRLS_DIR / "44552.mp4",     # 17: Sports car cockpit neon
    CURATED_DIR / "1234.mp4",    # 18: Tattooed brunette on stool
    CURATED_DIR / "1302.mp4",    # 19: Urban girl dark glass corridor
    FAST_CUTS_DIR / "42048.mp4", # 20: Aerial highway interchange loop
    CURATED_DIR / "50429.mp4",   # 21: Dancer green laser column
    GIRLS_DIR / "44556.mp4",     # 22: Blonde walking past sports car
    CURATED_DIR / "1232.mp4",    # 23: Red neon atmosphere glow
    NATIVE_DIR / "51406.mp4",    # 24: Girl listening headphones night
    FAST_CUTS_DIR / "40746.mp4", # 25: Tokyo neon skyscrapers
    CURATED_DIR / "50435.mp4",   # 26: Dancer purple UV laser glow
    GIRLS_DIR / "44559.mp4",     # 27: Driver seat sunglasses
    CURATED_DIR / "1227.mp4",    # 28: Brunette night amusement park
    CURATED_DIR / "50436.mp4",   # 29: Dancer vertical cyan laser stream
    GIRLS_DIR / "44560.mp4"      # 30: Blonde model standing by car neon tube
]

HOOKS_30 = [
    {"hook": "POV: 2 AM, city lights, feeling this vibe...", "caption": "POV: 2 AM drive with this track on repeat 🌃✨ Tap audio to save! Track: Smoke Buddah — Paradise"},
    {"hook": "Headphones on, world completely muted", "caption": "Put your headphones on and feel this beat 🎧 Smoke Buddah - Paradise (One Take)"},
    {"hook": "Driving through the city with no destination...", "caption": "Night drives with no destination in mind 🌙 Track: Smoke Buddah — Paradise"},
    {"hook": "This sound was made for empty highways", "caption": "Empty roads & the right bassline. Tap sound to add to your night playlist 🔥"},
    {"hook": "Underrated track that feels like a movie", "caption": "Sounds like straight out of a cinematic movie soundtrack 🎧 Smoke Buddah"},
    {"hook": "Tell me you don't feel chills when this drops...", "caption": "Late night drive therapy 🖤 Track: Smoke Buddah — Paradise (One Take)"},
    {"hook": "When the bass hits at 120 mph...", "caption": "Speeding through city lights to this sound 🏎️💨 Tap audio to use!"},
    {"hook": "Night drives heal what words never could", "caption": "Therapy on wheels 🌃 Smoke Buddah - Paradise (One Take)"},
    {"hook": "POV: city lights in the rearview mirror...", "caption": "City skyline & this song playing on repeat ✨"},
    {"hook": "Put this on your late night drive playlist", "caption": "Must-have track for midnight cruising 🎧 Smoke Buddah"},
    {"hook": "That one track you never skip...", "caption": "Never skipping this one 🎧 Smoke Buddah - Paradise (One Take)"},
    {"hook": "Lost in the city lights with this playing...", "caption": "Neon reflections and heavy 808s 🌃 Save this audio!"},
    {"hook": "Just me, the road, and this song...", "caption": "Solo midnight drive vibes ✨ Track: Smoke Buddah — Paradise"},
    {"hook": "When music matches the exact vibe of the road...", "caption": "Perfect soundtrack for late hours 🎧 Smoke Buddah"},
    {"hook": "Close your eyes and listen to this flow...", "caption": "Flow is unmatched 🔥 Paradise (One Take) by Smoke Buddah"},
    {"hook": "Windows down, cold breeze, this track...", "caption": "Cold night breeze & pure music 🌙 Tap audio to listen!"},
    {"hook": "The streets are empty for a reason", "caption": "Empty streets & high volume 🖤 Smoke Buddah - Paradise"},
    {"hook": "This needs to be in a cyberpunk movie", "caption": "Cyberpunk night drive aesthetic ✨ Save this audio!"},
    {"hook": "You just found your new favorite sound", "caption": "Your new late night obsession 🔥 Smoke Buddah — Paradise"},
    {"hook": "Entering the tunnel right as the beat drops...", "caption": "Tunnel run with this sound 🏎️💨 Smoke Buddah - Paradise"},
    {"hook": "Cruising through the city at midnight...", "caption": "Midnight run through neon streets 🌃 Tap audio to listen!"},
    {"hook": "Can't stop replaying this one take...", "caption": "Pure lyricism and delivery 🎧 Smoke Buddah — Paradise"},
    {"hook": "Driving home after 3 AM with this on...", "caption": "3 AM thoughts and heavy bassline 🖤 Paradise (One Take)"},
    {"hook": "Wet asphalt, neon reflections, and this sound...", "caption": "Rainy city nights & chill beats 🌧️ Smoke Buddah"},
    {"hook": "Clearing my mind with the volume on 100", "caption": "Max volume therapy 🎧 Smoke Buddah — Paradise (One Take)"},
    {"hook": "When the roads are yours and the music hits...", "caption": "The feeling of an open road 🏎️ Smoke Buddah"},
    {"hook": "POV: finding that one song that gives you chills...", "caption": "Instant chills when the flow starts 🖤 Tap audio to save!"},
    {"hook": "Nothing beats night highway drives with this...", "caption": "Highway speed and pure music 🔥 Smoke Buddah"},
    {"hook": "Put this sound on and thank me later", "caption": "Trust me and turn this up 🔊 Smoke Buddah — Paradise"},
    {"hook": "Soundtrack to 3 AM drives alone in the city...", "caption": "Late night solo cruise anthem 🌃 Smoke Buddah - Paradise"}
]

def clean_hook(text):
    # Strictly strip emojis and non-standard symbols that cause tofu box glyphs in PIL/Windows fonts
    cleaned = re.sub(r'[^\x00-\x7F\u0400-\u04FF\s\.,!\?:;\'\"—–-]', '', text)
    return re.sub(r'\s+', ' ', cleaned).strip()

def create_overlay_image(idx, hook_text):
    # Ensure text is 100% clean of emoji tofu glyphs
    display_text = clean_hook(hook_text)
    
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Soft bottom dark vignette
    for y in range(450):
        alpha = int(190 * (y / 450.0))
        draw.line([(0, HEIGHT - 450 + y), (WIDTH, HEIGHT - 450 + y)], fill=(0, 0, 0, alpha))
        
    font_bold = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 40)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 26)
    
    bbox1 = draw.textbbox((0, 0), display_text, font=font_bold)
    w1 = bbox1[2] - bbox1[0]
    x1 = (WIDTH - w1) // 2
    y1 = HEIGHT - 330
    
    for ox, oy in [(-2, -2), (2, -2), (-2, 2), (2, 2), (0, 3)]:
        draw.text((x1 + ox, y1 + oy), display_text, font=font_bold, fill=(0, 0, 0, 230))
    draw.text((x1, y1), display_text, font=font_bold, fill=(255, 255, 255, 255))
    
    sound_text = "Smoke Buddah — Paradise (One Take)"
    bbox_s = draw.textbbox((0, 0), sound_text, font=font_badge)
    sw = bbox_s[2] - bbox_s[0]
    
    pill_w = sw + 80
    pill_h = 56
    pill_x = (WIDTH - pill_w) // 2
    pill_y = HEIGHT - 230
    
    draw.rounded_rectangle(
        [(pill_x, pill_y), (pill_x + pill_w, pill_y + pill_h)],
        radius=28,
        fill=(10, 10, 15, 180),
        outline=(255, 255, 255, 80),
        width=1
    )
    draw.polygon([(pill_x + 30, pill_y + 19), (pill_x + 30, pill_y + 37), (pill_x + 44, pill_y + 28)], fill=(255, 255, 255, 240))
    draw.text((pill_x + 54, pill_y + 12), sound_text, font=font_badge, fill=(245, 245, 245, 245))
    
    out_path = SCRATCH_DIR / f"overlay_batch30_{idx}.png"
    img.save(out_path, "PNG")
    return out_path

def generate_reel_video(idx):
    hook_info = HOOKS_30[(idx - 1) % len(HOOKS_30)]
    hook_text = hook_info["hook"]
    caption = hook_info["caption"]
    
    overlay = create_overlay_image(idx, hook_text)
    out_video = OUTPUT_DIR / f"SmokeBuddah_GirlsReel_{idx:02d}.mp4"
    
    rng = random.Random(idx * 777 + 2026)
    
    # 1. Guaranteed UNIQUE Opening Shot from exhaustion queue (Reels 1..30 each have a different opening)
    opening_shot = OPENING_SHOT_EXHAUSTION_QUEUE[(idx - 1) % len(OPENING_SHOT_EXHAUSTION_QUEUE)]
    
    # 2. Pick shots from 5 distinct aesthetic categories without repetitions in the same video:
    c_laser1 = rng.choice(ASSET_POOLS["girl_laser"])
    c_neon1 = rng.choice(ASSET_POOLS["girl_neon"])
    c_car1 = rng.choice(ASSET_POOLS["girl_car_photoshoot"])
    c_urban1 = rng.choice(ASSET_POOLS["girl_urban_lifestyle"])
    c_speed = rng.choice(ASSET_POOLS["night_city_speed"])
    
    # Pick secondary non-overlapping shots:
    c_laser2 = rng.choice([c for c in ASSET_POOLS["girl_laser"] if c != c_laser1])
    c_car2 = rng.choice([c for c in ASSET_POOLS["girl_car_photoshoot"] if c != c_car1])
    c_smoke = ASSET_POOLS["smoke_atmosphere"][0]
    
    # 9-Shot Dynamic Director Cut:
    # Shot 0 (Opening): 3.36s (Hook display)
    # Shots 1-7 (Rhythm cuts): 1.68s each (Beat sync @ 142.9 BPM)
    # Shot 8 (Outro climax): 3.36s
    shots = [
        (opening_shot, rng.uniform(0.5, 2.5), 3.36),
        (c_laser1, rng.uniform(0.5, 3.0), 1.68),
        (c_car1, rng.uniform(0.5, 3.0), 1.68),
        (c_neon1, rng.uniform(0.5, 3.0), 1.68),
        (c_speed, rng.uniform(0.5, 3.0), 1.68),
        (c_urban1, rng.uniform(0.5, 3.0), 1.68),
        (c_laser2, rng.uniform(0.5, 3.0), 1.68),
        (c_car2, rng.uniform(0.5, 3.0), 1.68),
        (c_smoke, rng.uniform(0.5, 3.0), 3.36)
    ]
    
    total_dur = sum(s[2] for s in shots)
    
    # Audio offset variation across 6 points
    audio_offsets = [0, 15, 30, 45, 60, 75]
    audio_ss = audio_offsets[(idx - 1) % len(audio_offsets)]
    
    print(f"[{idx}/30] Рендеринг ролика #{idx}: {total_dur:.2f} сек, 9 планов (audio offset: {audio_ss}s)...")
    print(f"      Начальный план: {opening_shot.name}")
    
    cmd = ["ffmpeg", "-y"]
    filter_parts = []
    concat_inputs = []
    
    for shot_idx, (path, ss, dur) in enumerate(shots):
        cmd.extend(["-ss", f"{ss:.2f}", "-t", f"{dur:.2f}", "-i", str(path)])
        filter_parts.append(
            f"[{shot_idx}:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,unsharp=5:5:1.0:5:5:0.0,eq=contrast=1.12:saturation=1.18,fps=30,setsar=1[v{shot_idx}]"
        )
        concat_inputs.append(f"[v{shot_idx}]")
        
    overlay_idx = len(shots)
    cmd.extend(["-i", str(overlay)])
    
    audio_idx = len(shots) + 1
    cmd.extend(["-ss", str(audio_ss), "-t", f"{total_dur:.2f}", "-i", str(AUDIO_FILE)])
    
    concat_str = "".join(concat_inputs) + f"concat=n={len(shots)}:v=1:a=0[vcat]"
    overlay_str = f"[vcat][{overlay_idx}:v]overlay=0:0[vout]"
    full_filter = ";".join(filter_parts) + ";" + concat_str + ";" + overlay_str
    
    cmd.extend([
        "-filter_complex", full_filter,
        "-map", "[vout]",
        "-map", f"{audio_idx}:a:0",
        "-c:v", "libx264",
        "-preset", "medium",
        "-profile:v", "high",
        "-level", "4.2",
        "-pix_fmt", "yuv420p",
        "-crf", "16",
        "-b:v", "18M",
        "-maxrate", "22M",
        "-bufsize", "45M",
        "-g", "60",
        "-keyint_min", "60",
        "-x264-params", "scenecut=0:open-gop=0",
        "-c:a", "aac",
        "-b:a", "320k",
        str(out_video)
    ])
    
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode != 0:
        print(f"Ошибка FFmpeg #{idx}:", res.stderr.decode('utf-8', errors='ignore'))
        return None
        
    print(f"✅ Ролик #{idx} отрендерен: {out_video.name} ({out_video.stat().st_size / (1024*1024):.2f} MB)")
    return out_video, total_dur, caption, audio_ss

if __name__ == "__main__":
    test_idx = 1
    res = generate_reel_video(test_idx)
    if res:
        print(f"Test reel #{test_idx} generated successfully!")
