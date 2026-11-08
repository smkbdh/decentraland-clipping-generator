import sys
import io
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
OUTPUT_DIR = BASE_DIR / "ready_music_videos"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

AUDIO_FILE = SCRATCH_DIR / "music_test" / "smoke_buddah_audio.mp4"

WIDTH = 1080
HEIGHT = 1920

# Categorized Approved Pools (100% Native Vertical 1080x1920)
ASSET_POOLS = {
    "city_skyline": [
        FAST_CUTS_DIR / "49878.mp4",
        FAST_CUTS_DIR / "40746.mp4"
    ],
    "girl_portraits": [
        NATIVE_DIR / "1231.mp4",       # Brunette tattooed girl by red neon sign
        GIRLS_DIR / "44558.mp4",       # Blonde model close-up sunglasses & red lips
        GIRLS_DIR / "44556.mp4",       # Blonde model profile walking past sports car
        GIRLS_DIR / "44563.mp4",       # Model portrait in neon
        GIRLS_DIR / "44564.mp4",       # Close up dynamic model
        NATIVE_DIR / "51406.mp4"       # Girl in bed with headphones at night
    ],
    "girl_car_action": [
        GIRLS_DIR / "44551.mp4",       # Girl reflection in car rearview mirror
        GIRLS_DIR / "44552.mp4",       # Girl sitting in sports car cockpit neon
        GIRLS_DIR / "44553.mp4",       # Girl in side mirror
        GIRLS_DIR / "44554.mp4",       # Girl opening sports car door in red studio fog
        GIRLS_DIR / "44555.mp4",       # Girl sitting on hood of sports car vibing
        GIRLS_DIR / "44557.mp4",       # Car door detail and silhouette
        GIRLS_DIR / "44559.mp4",       # Girl stepping out of car
        GIRLS_DIR / "44560.mp4",       # Girl in driver seat smiling
        GIRLS_DIR / "44561.mp4",       # Car lights and girl silhouette
        GIRLS_DIR / "44562.mp4"        # Hood angle of girl
    ],
    "car_motion": [
        FAST_CUTS_DIR / "40747.mp4",   # Red sports car cruising down neon avenue
        NATIVE_DIR / "44691.mp4"       # Highway through night mist with speeding lights
    ],
    "aerial_drone": [
        FAST_CUTS_DIR / "42048.mp4"    # Aerial highway interchange loop with light streaks
    ],
    "bokeh_transitions": [
        NATIVE_DIR / "44678.mp4",      # Red & gold bokeh circles
        NATIVE_DIR / "44665.mp4",      # Cyan & amber bokeh circles
        NATIVE_DIR / "44669.mp4",      # Vertical amber bokeh stream
        NATIVE_DIR / "44694.mp4",      # Cyan & orange bokeh circles
        NATIVE_DIR / "44699.mp4"       # Red neon geometric patterns
    ]
}

# 30 Unique Late-Night Music Hooks
HOOKS_30 = [
    {"hook": "POV: 2 AM, city lights, feeling this vibe...", "caption": "POV: 2 AM drive with this track on repeat 🌃✨ Tap audio to save! Track: Smoke Buddah — Paradise"},
    {"hook": "Headphones on, world completely muted 🎧", "caption": "Put your headphones on and feel this beat 🎧 Smoke Buddah - Paradise (One Take)"},
    {"hook": "Driving through the city with no destination...", "caption": "Night drives with no destination in mind 🌙 Track: Smoke Buddah — Paradise"},
    {"hook": "This sound was made for empty highways 🏎️", "caption": "Empty roads & the right bassline. Tap sound to add to your night playlist 🔥"},
    {"hook": "Underrated track that feels like a movie 🎬", "caption": "Sounds like straight out of a cinematic movie soundtrack 🎧 Smoke Buddah"},
    {"hook": "Tell me you don't feel chills when this drops...", "caption": "Late night drive therapy 🖤 Track: Smoke Buddah — Paradise (One Take)"},
    {"hook": "When the bass hits at 120 mph... 🏎️💨", "caption": "Speeding through city lights to this sound 🏎️💨 Tap audio to use!"},
    {"hook": "Night drives heal what words never could 🖤", "caption": "Therapy on wheels 🌃 Smoke Buddah - Paradise (One Take)"},
    {"hook": "POV: city lights in the rearview mirror...", "caption": "City skyline & this song playing on repeat ✨"},
    {"hook": "Put this on your late night drive playlist 🎵", "caption": "Must-have track for midnight cruising 🎧 Smoke Buddah"},
    {"hook": "That one track you never skip... 🔥", "caption": "Never skipping this one 🎧 Smoke Buddah - Paradise (One Take)"},
    {"hook": "Lost in the city lights with this playing...", "caption": "Neon reflections and heavy 808s 🌃 Save this audio!"},
    {"hook": "Just me, the road, and this song... 🌙", "caption": "Solo midnight drive vibes ✨ Track: Smoke Buddah — Paradise"},
    {"hook": "When music matches the exact vibe of the road...", "caption": "Perfect soundtrack for late hours 🎧 Smoke Buddah"},
    {"hook": "Close your eyes and listen to this flow... 🎧", "caption": "Flow is unmatched 🔥 Paradise (One Take) by Smoke Buddah"},
    {"hook": "Windows down, cold breeze, this track... ✨", "caption": "Cold night breeze & pure music 🌙 Tap audio to listen!"},
    {"hook": "The streets are empty for a reason 🏎️", "caption": "Empty streets & high volume 🖤 Smoke Buddah - Paradise"},
    {"hook": "This needs to be in a cyberpunk movie 🌃", "caption": "Cyberpunk night drive aesthetic ✨ Save this audio!"},
    {"hook": "You just found your new favorite sound 🎧", "caption": "Your new late night obsession 🔥 Smoke Buddah — Paradise"},
    {"hook": "Entering the tunnel right as the beat drops...", "caption": "Tunnel run with this sound 🏎️💨 Smoke Buddah - Paradise"},
    {"hook": "Cruising through the city at midnight... ✨", "caption": "Midnight run through neon streets 🌃 Tap audio to listen!"},
    {"hook": "Can't stop replaying this one take... 🔥", "caption": "Pure lyricism and delivery 🎧 Smoke Buddah — Paradise"},
    {"hook": "Driving home after 3 AM with this on...", "caption": "3 AM thoughts and heavy bassline 🖤 Paradise (One Take)"},
    {"hook": "Wet asphalt, neon reflections, and this sound...", "caption": "Rainy city nights & chill beats 🌧️ Smoke Buddah"},
    {"hook": "Clearing my mind with the volume on 100 🔊", "caption": "Max volume therapy 🎧 Smoke Buddah — Paradise (One Take)"},
    {"hook": "When the roads are yours and the music hits...", "caption": "The feeling of an open road 🏎️ Smoke Buddah"},
    {"hook": "POV: finding that one song that gives you chills...", "caption": "Instant chills when the flow starts 🖤 Tap audio to save!"},
    {"hook": "Nothing beats night highway drives with this... 🏎️", "caption": "Highway speed and pure music 🔥 Smoke Buddah"},
    {"hook": "Put this sound on and thank me later 🔥", "caption": "Trust me and turn this up 🔊 Smoke Buddah — Paradise"},
    {"hook": "Soundtrack to 3 AM drives alone in the city... 🖤", "caption": "Late night solo cruise anthem 🌃 Smoke Buddah - Paradise"}
]

def create_overlay_image(idx, hook_text):
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Soft bottom dark vignette
    for y in range(450):
        alpha = int(190 * (y / 450.0))
        draw.line([(0, HEIGHT - 450 + y), (WIDTH, HEIGHT - 450 + y)], fill=(0, 0, 0, alpha))
        
    font_bold = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 40)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 26)
    
    bbox1 = draw.textbbox((0, 0), hook_text, font=font_bold)
    w1 = bbox1[2] - bbox1[0]
    x1 = (WIDTH - w1) // 2
    y1 = HEIGHT - 330
    
    for ox, oy in [(-2, -2), (2, -2), (-2, 2), (2, 2), (0, 3)]:
        draw.text((x1 + ox, y1 + oy), hook_text, font=font_bold, fill=(0, 0, 0, 230))
    draw.text((x1, y1), hook_text, font=font_bold, fill=(255, 255, 255, 255))
    
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
    
    rng = random.Random(idx * 777 + 43)
    
    # Director Arc Slots:
    # 1. Skyline / Atmosphere (3.36s / 8 beats)
    # 2. Girl Portrait (1.68s / 4 beats)
    # 3. Girl Car Action / Pose (1.68s / 4 beats)
    # 4. Bokeh / Neon Transition (1.68s / 4 beats)
    # 5. Red Car Cruise (DROP) (1.68s / 4 beats)
    # 6. Girl on Car / Vibing (1.68s / 4 beats)
    # 7. Drone Highway Speed (1.68s / 4 beats)
    # 8. Girl in Cockpit / Interior (1.68s / 4 beats)
    # 9. Outro Bokeh / Skyline (3.36s / 8 beats)
    
    c_skyline = rng.choice(ASSET_POOLS["city_skyline"])
    c_girl1 = rng.choice(ASSET_POOLS["girl_portraits"])
    c_girl_car1 = rng.choice(ASSET_POOLS["girl_car_action"])
    c_bokeh1 = rng.choice(ASSET_POOLS["bokeh_transitions"])
    c_car = rng.choice(ASSET_POOLS["car_motion"])
    c_girl_car2 = rng.choice([c for c in ASSET_POOLS["girl_car_action"] if c != c_girl_car1])
    c_drone = rng.choice(ASSET_POOLS["aerial_drone"])
    c_girl_cockpit = rng.choice([c for c in ASSET_POOLS["girl_car_action"] if c not in (c_girl_car1, c_girl_car2)])
    c_outro = rng.choice(ASSET_POOLS["bokeh_transitions"])
    
    shots = [
        (c_skyline, rng.uniform(0.5, 3.0), 3.36),
        (c_girl1, rng.uniform(1.0, 4.0), 1.68),
        (c_girl_car1, rng.uniform(0.5, 3.0), 1.68),
        (c_bokeh1, rng.uniform(1.0, 4.0), 1.68),
        (c_car, rng.uniform(1.0, 3.0), 1.68),
        (c_girl_car2, rng.uniform(0.5, 3.0), 1.68),
        (c_drone, rng.uniform(1.0, 4.0), 1.68),
        (c_girl_cockpit, rng.uniform(0.5, 3.0), 1.68),
        (c_outro, rng.uniform(1.0, 4.0), 3.36)
    ]
    
    total_dur = sum(s[2] for s in shots)
    
    # Audio offset variation
    audio_offsets = [0, 15, 30, 45, 60, 75]
    audio_ss = audio_offsets[(idx - 1) % len(audio_offsets)]
    
    print(f"[{idx}/30] Рендеринг ролика #{idx}: {total_dur:.2f} сек, 9 планов (audio offset: {audio_ss}s)...")
    
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
    v, d, c, s = generate_reel_video(1)
    print("Test video ready:", v)
