import json
import subprocess
import os

input_wav = r"C:\Users\humun\.gemini\antigravity\brain\347c6e35-8b2f-4423-aab7-8e37cef363f8\.user_uploaded\uploaded_media_1793419997722.wav"
out_dir = r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity\mastered_releases\track_03"
os.makedirs(out_dir, exist_ok=True)

out_24bit_wav = os.path.join(out_dir, "master_offstep_24bit.wav")
out_16bit_wav = os.path.join(out_dir, "master_offstep_16bit.wav")

# Mastering chain for Track 3 (Trimmed last ~7s of silence):
# - Cut off empty tail: atrim=0:60.0 with smooth fade-out at st=59.3, d=0.7
# - Gentle HPF only below 20 Hz (p=1, preserves all 30-60 Hz sub-bass completely)
# - Sub-bass boost at 48 Hz (+2.2 dB) for massive deep foundation
# - Punch boost at 80 Hz (+1.8 dB) for heavy kick body
# - Clean boxiness at 320 Hz (-1.0 dB)
# - Vocal & Snare presence at 3400 Hz (+1.2 dB)
# - Smooth air at 12 kHz (+1.2 dB)
# - Two-pass EBU R128 loudness normalization to -10.0 LUFS with -1.0 dBTP True-Peak limit

pre_filter = (
    "atrim=0:60.0,afade=t=out:st=59.3:d=0.7,"
    "highpass=f=20:p=1,"
    "equalizer=f=48:t=q:w=1.0:g=2.2,"
    "equalizer=f=80:t=q:w=1.2:g=1.8,"
    "equalizer=f=320:t=q:w=1.4:g=-1.0,"
    "equalizer=f=3400:t=q:w=1.2:g=1.2,"
    "highshelf=f=12000:g=1.2"
)

def run_mastering():
    print("--- Starting Pass 1 (Analysis for Trimmed Track 03) ---")
    pass1_filter = f"{pre_filter},loudnorm=I=-10.0:TP=-1.0:LRA=4:print_format=json"
    p1 = subprocess.run(
        ["ffmpeg", "-i", input_wav, "-filter_complex", pass1_filter, "-f", "null", "-"],
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
        f"{pre_filter},loudnorm=I=-10.0:TP=-1.0:LRA=4:"
        f"measured_I={stats['input_i']}:measured_TP={stats['input_tp']}:"
        f"measured_LRA={stats['input_lra']}:measured_thresh={stats['input_thresh']}:"
        f"offset={stats['target_offset']}:linear=true"
    )
    
    print("\n--- Rendering Trimmed 24-bit 44.1kHz Master for Offstep ---")
    p2_24 = subprocess.run(
        ["ffmpeg", "-y", "-i", input_wav, "-filter_complex", pass2_filter, "-c:a", "pcm_s24le", "-ar", "44100", out_24bit_wav],
        capture_output=True, text=True, encoding="utf-8", errors="ignore"
    )
    if p2_24.returncode != 0:
        raise RuntimeError(f"FFmpeg 24-bit render failed: {p2_24.stderr}")
    print(f"Generated 24-bit: {out_24bit_wav} ({os.path.getsize(out_24bit_wav)} bytes)")

    print("\n--- Rendering Trimmed 16-bit 44.1kHz Master for Offstep ---")
    p2_16 = subprocess.run(
        ["ffmpeg", "-y", "-i", input_wav, "-filter_complex", pass2_filter, "-c:a", "pcm_s16le", "-ar", "44100", out_16bit_wav],
        capture_output=True, text=True, encoding="utf-8", errors="ignore"
    )
    if p2_16.returncode != 0:
        raise RuntimeError(f"FFmpeg 16-bit render failed: {p2_16.stderr}")
    print(f"Generated 16-bit: {out_16bit_wav} ({os.path.getsize(out_16bit_wav)} bytes)")

if __name__ == "__main__":
    run_mastering()
    print("\n=== Track 03 (Trimmed & Remastered) Complete ===")
