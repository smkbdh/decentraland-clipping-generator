import json
import subprocess
import os

input_mp3 = r"C:\Users\humun\.gemini\antigravity\brain\347c6e35-8b2f-4423-aab7-8e37cef363f8\.user_uploaded\uploaded_media_1793417703725.mp3"
out_dir = r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity\mastered_releases\track_02"
os.makedirs(out_dir, exist_ok=True)

out_24bit_wav = os.path.join(out_dir, "master_offstep_24bit.wav")
out_16bit_wav = os.path.join(out_dir, "master_offstep_16bit.wav")

# Mastering chain for Track 2:
# 1. Highpass at 28Hz to clean subsonic rumble
# 2. EQ: punch at 60Hz, clean mud at 340Hz, vocal presence at 3.5kHz, air at 12kHz
# 3. Bass mono maker under 95Hz (sub-frequencies summed to mono, preserving full stereo image on mids/highs)
# 4. Two-pass EBU R128 loudness normalization & True-Peak limiting at -1.0 dBFS

pre_filter = (
    "highpass=f=28:p=2,"
    "equalizer=f=60:t=q:w=1.2:g=1.0,"
    "equalizer=f=340:t=q:w=1.5:g=-1.2,"
    "equalizer=f=3500:t=q:w=1.2:g=1.2,"
    "highshelf=f=12000:g=1.2,"
    "asplit=2[bass][midhigh];"
    "[bass]lowpass=f=95,pan=stereo|c0=0.5*c0+0.5*c1|c1=0.5*c0+0.5*c1[bass_mono];"
    "[midhigh]highpass=f=95[midhigh_stereo];"
    "[bass_mono][midhigh_stereo]amix=inputs=2:weights=1 1:normalize=0"
)

def run_mastering():
    print("--- Starting Pass 1 (Analysis) ---")
    pass1_filter = f"{pre_filter},loudnorm=I=-9.8:TP=-1.0:LRA=4:print_format=json"
    p1 = subprocess.run(
        ["ffmpeg", "-i", input_mp3, "-filter_complex", pass1_filter, "-f", "null", "-"],
        capture_output=True, text=True, encoding="utf-8", errors="ignore"
    )
    
    stderr = p1.stderr
    start_idx = stderr.rfind("{")
    end_idx = stderr.rfind("}")
    if start_idx == -1 or end_idx == -1:
        raise ValueError(f"Could not find JSON in stderr: {stderr[-500:]}")
    stats = json.loads(stderr[start_idx:end_idx+1])
    print("Pass 1 stats:")
    for k, v in stats.items():
        print(f"  {k}: {v}")
        
    pass2_filter = (
        f"{pre_filter},loudnorm=I=-9.8:TP=-1.0:LRA=4:"
        f"measured_I={stats['input_i']}:measured_TP={stats['input_tp']}:"
        f"measured_LRA={stats['input_lra']}:measured_thresh={stats['input_thresh']}:"
        f"offset={stats['target_offset']}:linear=true"
    )
    
    print("\n--- Rendering 24-bit 44.1kHz Master for Offstep ---")
    p2_24 = subprocess.run(
        ["ffmpeg", "-y", "-i", input_mp3, "-filter_complex", pass2_filter, "-c:a", "pcm_s24le", "-ar", "44100", out_24bit_wav],
        capture_output=True, text=True, encoding="utf-8", errors="ignore"
    )
    if p2_24.returncode != 0:
        raise RuntimeError(f"FFmpeg 24-bit render failed: {p2_24.stderr}")
    print(f"Generated 24-bit: {out_24bit_wav} ({os.path.getsize(out_24bit_wav)} bytes)")

    print("\n--- Rendering 16-bit 44.1kHz Master for Offstep ---")
    p2_16 = subprocess.run(
        ["ffmpeg", "-y", "-i", input_mp3, "-filter_complex", pass2_filter, "-c:a", "pcm_s16le", "-ar", "44100", out_16bit_wav],
        capture_output=True, text=True, encoding="utf-8", errors="ignore"
    )
    if p2_16.returncode != 0:
        raise RuntimeError(f"FFmpeg 16-bit render failed: {p2_16.stderr}")
    print(f"Generated 16-bit: {out_16bit_wav} ({os.path.getsize(out_16bit_wav)} bytes)")

if __name__ == "__main__":
    run_mastering()
    print("\n=== Track 02 Mastering Complete ===")
