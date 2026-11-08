import sys
import io
import json
import random
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

BASE_DIR = Path(r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity")
SCRATCH_DIR = BASE_DIR / "scratch"
FAST_CUTS_DIR = SCRATCH_DIR / "fast_cuts"
STOCK_DIR = SCRATCH_DIR / "stock_downloads"
OUTPUT_DIR = BASE_DIR / "ready_music_videos"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

WIDTH = 1080
HEIGHT = 1920

# 30 Unique Engaging Hooks & Badges for Music Promo
HOOKS_DATA = [
    {"badge": "LATE NIGHT DRIVE • ON REPEAT", "hook": "POV: when this track hits different at 2 AM...", "caption": "POV: 2 AM drive with this track on repeat 🌃🎧 Tap audio to save!"},
    {"badge": "NIGHT VIBES • MAX VOLUME", "hook": "Headphones on, world muted 🎧", "caption": "Put your headphones on and feel this beat ✨ Smoke Buddah - Paradise"},
    {"badge": "MIDNIGHT MEMORIES ✨", "hook": "Driving through the city with no destination...", "caption": "Night drives with no destination in mind 🌙 Track: Smoke Buddah — Paradise"},
    {"badge": "HIGHWAY ENERGY • BASS DROP", "hook": "This sound was made for empty highways 🏎️", "caption": "Empty roads & the right bassline. Tap sound to add to your night playlist 🔥"},
    {"badge": "HIDDEN GEM • SOUND DISCOVERY", "hook": "Underrated track that feels like a movie 🎬", "caption": "Sounds like straight out of a cinematic movie soundtrack 🎧 Smoke Buddah"},
    {"badge": "CHILL VIBES • 3 AM THOUGHTS", "hook": "Tell me you feel this beat... 🌙", "caption": "Late night drive therapy 🖤 Track: Smoke Buddah — Paradise (One Take)"},
    {"badge": "SPEED & LIGHTS • NIGHT RUN", "hook": "When the beat drops at 120 mph...", "caption": "Speeding through city lights to this sound 🏎️💨 Tap audio to use!"},
    {"badge": "ATMOSPHERE • LATE HOURS", "hook": "Night drives heal what words never could 🖤", "caption": "Therapy on wheels 🌃 Smoke Buddah - Paradise (One Take)"},
    {"badge": "URBAN DRIFT • NIGHT CRUISING", "hook": "POV: the city lights in the rearview mirror...", "caption": "City skyline & this song playing on repeat ✨"},
    {"badge": "ESSENTIAL TRACK • NOW PLAYING", "hook": "Put this on your late night drive playlist 🎵", "caption": "Must-have track for midnight cruising 🎧 Smoke Buddah"},
    {"badge": "PURE VIBE • SOUND ON 🔊", "hook": "That one track you never skip...", "caption": "Never skipping this one 🎧 Smoke Buddah - Paradise (One Take)"},
    {"badge": "NEON DREAMS • 2 AM", "hook": "Lost in the city lights with this playing...", "caption": "Neon reflections and heavy 808s 🌃 Save this audio!"},
    {"badge": "MIDNIGHT ESCAPE 🏎️", "hook": "Just me, the road, and this song...", "caption": "Solo midnight drive vibes ✨ Track: Smoke Buddah — Paradise"},
    {"badge": "CHILL BEATS • LATE RUN", "hook": "When music matches the exact vibe of the road...", "caption": "Perfect soundtrack for late hours 🎧 Smoke Buddah"},
    {"badge": "DEEP NIGHT • HEADPHONES ONLY", "hook": "Close your eyes and listen to this flow...", "caption": "Flow is unmatched 🔥 Paradise (One Take) by Smoke Buddah"},
    {"badge": "CAR VIBES • CRUISE MODE", "hook": "Windows down, cold breeze, this track...", "caption": "Cold night breeze & pure music 🌙 Tap audio to listen!"},
    {"badge": "NIGHT CRAWLER 🖤", "hook": "The streets are empty for a reason...", "caption": "Cruising after midnight 🏎️ Track: Smoke Buddah — Paradise"},
    {"badge": "CINEMATIC SOUND • DISCOVER", "hook": "This needs to be in a cyberpunk movie 🌃", "caption": "Cyberpunk city aesthetics & raw beats 🔥 Smoke Buddah"},
    {"badge": "LATE HOURS • SMOOTH FLOW", "hook": "You just found your new favorite sound 🎧", "caption": "Save this audio for your next late night reel 🎵"},
    {"badge": "SPEEDWAY • TUNNEL RUN", "hook": "Entering the tunnel right as the beat drops...", "caption": "Tunnel reverb hits different 🏎️💨 Smoke Buddah - Paradise"},
    {"badge": "TOKYO NIGHTS • NEON GLOW", "hook": "Cruising through Shibuya at midnight...", "caption": "Tokyo midnight drive aesthetic ✨ Track: Smoke Buddah"},
    {"badge": "BASSLINE OBSESSION • REPEAT", "hook": "Can't stop replaying this one take...", "caption": "The one take energy is crazy 🔥 Smoke Buddah — Paradise"},
    {"badge": "AFTER MIDNIGHT • VOLUME UP", "hook": "Driving home after 3 AM with this on...", "caption": "Post-midnight drive anthem 🌙 Tap sound to add!"},
    {"badge": "STREET AESTHETIC • VIBE", "hook": "Wet asphalt, neon reflections, and this sound...", "caption": "Rainy city night drive 🌧️✨ Smoke Buddah - Paradise"},
    {"badge": "SOLO DRIVE • UNWIND", "hook": "Clearing my mind with the volume on 100 🔊", "caption": "Volume all the way up 🎧 Smoke Buddah — Paradise (One Take)"},
    {"badge": "MIDNIGHT DRIFT • 2 AM", "hook": "When the roads are yours and the music hits...", "caption": "Empty city streets at night 🏎️ Smoke Buddah"},
    {"badge": "NEW SOUND • VIRAL AUDIO", "hook": "POV: finding that one song that gives you chills...", "caption": "Chills every single time 🎧 Tap audio to save!"},
    {"badge": "LATE NIGHT CRUISE • REELS", "hook": "Nothing beats night highway drives with this...", "caption": "Highway lights & heavy bass 🌃 Smoke Buddah - Paradise"},
    {"badge": "NIGHT ENERGY • RAW BEAT", "hook": "Put this sound on and thank me later 🔥", "caption": "You're gonna thank me for this sound 🎧 Smoke Buddah"},
    {"badge": "FINAL LAP • 3 AM VIBES", "hook": "The soundtrack to 3 AM drives alone in the city...", "caption": "Late night solitude & pure rhythm 🖤 Smoke Buddah - Paradise"}
]

# Available stock clips pool
CLIP_POOL = [
    FAST_CUTS_DIR / "49.mp4",     # Headlights
    FAST_CUTS_DIR / "74.mp4",     # Red sports car
    FAST_CUTS_DIR / "63.mp4",     # Cockpit / steering wheel
    STOCK_DIR / "42037.mp4",      # Luxury car drift / turn
    FAST_CUTS_DIR / "40746.mp4",  # Tokyo neon skyscrapers
    FAST_CUTS_DIR / "42048.mp4",  # Highway light trails
    STOCK_DIR / "40.mp4",         # POV night bridge drive
    FAST_CUTS_DIR / "64.mp4",     # Accelerating into night
    FAST_CUTS_DIR / "50.mp4",     # POV night highway
    FAST_CUTS_DIR / "40640.mp4",  # Neon city traffic
    FAST_CUTS_DIR / "41161.mp4",  # Sports car rear lights
    FAST_CUTS_DIR / "40747.mp4",  # Downtown reflections
    FAST_CUTS_DIR / "52427.mp4",  # Supercar exterior
    FAST_CUTS_DIR / "42039.mp4",  # Night tunnel speed run
    FAST_CUTS_DIR / "49878.mp4"   # City lights pan
]

# Filter existing files
EXISTING_CLIPS = [p for p in CLIP_POOL if p.exists() and p.stat().st_size > 1000000]

def create_overlay_image(idx, badge_text, hook_text):
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    font_hook = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 46)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 26)
    font_track = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 32)
    
    # 1. TOP SLEEK PILL
    pill_w = 920
    pill_h = 130
    pill_x = (WIDTH - pill_w) // 2
    pill_y = 200
    
    draw.rounded_rectangle(
        [(pill_x, pill_y), (pill_x + pill_w, pill_y + pill_h)],
        radius=24,
        fill=(8, 8, 12, 195),
        outline=(255, 255, 255, 80),
        width=2
    )
    
    dot_x = pill_x + 36
    dot_y = pill_y + 32
    draw.ellipse([(dot_x, dot_y), (dot_x + 12, dot_y + 12)], fill=(46, 213, 115, 255))
    draw.text((dot_x + 24, pill_y + 25), badge_text, font=font_badge, fill=(180, 215, 255, 240))
    draw.text((pill_x + 36, pill_y + 65), hook_text, font=font_hook, fill=(255, 255, 255, 255))
    
    # 2. BOTTOM SOUND BADGE
    badge_w = 780
    badge_h = 75
    badge_x = (WIDTH - badge_w) // 2
    badge_y = 1680
    
    draw.rounded_rectangle(
        [(badge_x, badge_y), (badge_x + badge_w, badge_y + badge_h)],
        radius=38,
        fill=(8, 8, 12, 200),
        outline=(255, 255, 255, 80),
        width=2
    )
    
    tri_x = badge_x + 35
    tri_y = badge_y + 26
    draw.polygon([(tri_x, tri_y), (tri_x, tri_y + 22), (tri_x + 18, tri_y + 11)], fill=(255, 255, 255, 240))
    draw.text((tri_x + 32, badge_y + 20), "Smoke Buddah — Paradise (One Take)", font=font_track, fill=(255, 255, 255, 255))
    
    out_path = SCRATCH_DIR / f"overlay_batch_{idx}.png"
    overlay.save(out_path)
    return out_path

def render_batch_video(idx):
    hook_info = HOOKS_DATA[(idx - 1) % len(HOOKS_DATA)]
    badge = hook_info["badge"]
    hook = hook_info["hook"]
    
    overlay = create_overlay_image(idx, badge, hook)
    audio = SCRATCH_DIR / "music_test" / "smoke_buddah_audio.mp4"
    out_video = OUTPUT_DIR / f"SmokeBuddah_Reel_{idx:02d}.mp4"
    
    # Generate 9 distinct dynamic cuts for this video
    # Pick a unique random subset of 9 clips from our 15 pool using idx as seed
    rng = random.Random(idx * 777 + 42)
    selected_clips = rng.sample(EXISTING_CLIPS, k=min(9, len(EXISTING_CLIPS)))
    
    shots = []
    # Song offset: rotate through different starting points in song
    audio_offsets = [0, 15, 30, 45, 60, 75]
    audio_ss = audio_offsets[(idx - 1) % len(audio_offsets)]
    
    for clip_path in selected_clips:
        ss = rng.uniform(0.5, 5.0)
        dur = rng.uniform(1.8, 2.4)
        shots.append((clip_path, ss, dur))
        
    total_duration = sum(s[2] for s in shots)
    print(f"[{idx}/30] Рендеринг ролика #{idx}: {total_duration:.1f} сек, 9 смен планов (audio offset: {audio_ss}s)...")
    
    cmd = ["ffmpeg", "-y"]
    filter_parts = []
    concat_inputs = []
    
    for shot_idx, (path, ss, duration) in enumerate(shots):
        cmd.extend(["-ss", f"{ss:.2f}", "-t", f"{duration:.2f}", "-i", str(path)])
        filter_parts.append(
            f"[{shot_idx}:v]scale=-2:1920,crop=1080:1920,unsharp=5:5:1.1:5:5:0.0,eq=contrast=1.12:saturation=1.2,fps=30,setsar=1[v{shot_idx}]"
        )
        concat_inputs.append(f"[v{shot_idx}]")
        
    overlay_idx = len(shots)
    cmd.extend(["-i", str(overlay)])
    
    audio_idx = len(shots) + 1
    cmd.extend(["-ss", str(audio_ss), "-t", f"{total_duration:.2f}", "-i", str(audio)])
    
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
        "-b:v", "16M",
        "-maxrate", "20M",
        "-bufsize", "40M",
        "-g", "60",
        "-keyint_min", "60",
        "-x264-params", "scenecut=0:open-gop=0",
        "-c:a", "aac",
        "-b:a", "320k",
        str(out_video)
    ])
    
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode != 0:
        print(f"Ошибка рендера #{idx}:", res.stderr.decode('utf-8', errors='ignore'))
        return None
        
    print(f"✅ Ролик #{idx} отрендерен: {out_video.name} ({out_video.stat().st_size / (1024*1024):.2f} MB)")
    return out_video, total_duration, hook_info["caption"]

if __name__ == "__main__":
    v, d, c = render_batch_video(1)
    print("Test video 1 ready:", v)
