import json
import subprocess
import os

input_mp3 = r"C:\Users\humun\.gemini\antigravity\brain\347c6e35-8b2f-4423-aab7-8e37cef363f8\.user_uploaded\uploaded_media_1793423614305.mp3"
out_dir = r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity\mastered_releases\track_04"
os.makedirs(out_dir, exist_ok=True)

out_24bit_wav = os.path.join(out_dir, "master_offstep_24bit.wav")
out_16bit_wav = os.path.join(out_dir, "master_offstep_16bit.wav")

# Mastering chain for Track 4 ("Сахалинская сказка" / Восток):
# - Gentle HPF only below 20 Hz (p=1, preserves all 30-60 Hz sub-bass completely)
# - Sub-bass boost at 48 Hz (+2.0 dB) for deep heavy bottom
# - Punch boost at 80 Hz (+1.6 dB) for kick body
# - Clean mud at 330 Hz (-1.0 dB)
# - Vocal & Snare presence at 3500 Hz (+1.0 dB)
# - Smooth air at 12 kHz (+1.2 dB)
# - Clean 400ms fade-out at end (st=146.8, d=0.4) to guarantee zero click
# - Two-pass EBU R128 loudness normalization to -9.8 LUFS with -0.8 dBTP True-Peak limit

pre_filter = (
    "highpass=f=20:p=1,"
    "equalizer=f=48:t=q:w=1.0:g=2.0,"
    "equalizer=f=80:t=q:w=1.2:g=1.6,"
    "equalizer=f=330:t=q:w=1.4:g=-1.0,"
    "equalizer=f=3500:t=q:w=1.2:g=1.0,"
    "highshelf=f=12000:g=1.2,"
    "afade=t=out:st=146.8:d=0.4"
)

def run_mastering():
    print("--- Starting Pass 1 (Analysis for Track 04) ---")
    pass1_filter = f"{pre_filter},loudnorm=I=-9.8:TP=-0.8:LRA=6:print_format=json"
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
        f"{pre_filter},loudnorm=I=-9.8:TP=-0.8:LRA=6:"
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
    print("\n=== Track 04 Mastering Complete ===")
