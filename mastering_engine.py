import json
import subprocess
import os

input_mp3 = r"C:\Users\humun\.gemini\antigravity\brain\347c6e35-8b2f-4423-aab7-8e37cef363f8\.user_uploaded\uploaded_media_1793376282579.mp3"
out_dir = r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity\mastered_releases\track_01"
os.makedirs(out_dir, exist_ok=True)

out_stereo_wav = os.path.join(out_dir, "master_offstep_stereo_24bit.wav")
out_pure_wav = os.path.join(out_dir, "master_offstep_direct_24bit.wav")
out_16bit_wav = os.path.join(out_dir, "master_offstep_stereo_16bit.wav")

def master_variant(name, pre_filter, out_path, bit_depth="pcm_s24le"):
    print(f"\n--- Mastering {name} ---")
    pass1_filter = f"{pre_filter},loudnorm=I=-10.0:TP=-1.0:LRA=6:print_format=json"
    p1 = subprocess.run(
        ["ffmpeg", "-i", input_mp3, "-filter_complex", pass1_filter, "-f", "null", "-"],
        capture_output=True, text=True, encoding="utf-8", errors="ignore"
    )
    
    # parse json from stderr
    stderr = p1.stderr
    start_idx = stderr.rfind("{")
    end_idx = stderr.rfind("}")
    if start_idx == -1 or end_idx == -1:
        raise ValueError(f"Could not find JSON in stderr: {stderr[-500:]}")
    stats_json = stderr[start_idx:end_idx+1]
    stats = json.loads(stats_json)
    print(f"Pass 1 stats for {name}:")
    for k, v in stats.items():
        print(f"  {k}: {v}")
        
    pass2_filter = (
        f"{pre_filter},loudnorm=I=-10.0:TP=-1.0:LRA=6:"
        f"measured_I={stats['input_i']}:measured_TP={stats['input_tp']}:"
        f"measured_LRA={stats['input_lra']}:measured_thresh={stats['input_thresh']}:"
        f"offset={stats['target_offset']}:linear=true"
    )
    
    p2 = subprocess.run(
        ["ffmpeg", "-y", "-i", input_mp3, "-filter_complex", pass2_filter, "-c:a", bit_depth, "-ar", "44100", out_path],
        capture_output=True, text=True, encoding="utf-8", errors="ignore"
    )
    if p2.returncode != 0:
        raise RuntimeError(f"FFmpeg render failed: {p2.stderr}")
    print(f"Rendered: {out_path} ({os.path.getsize(out_path)} bytes)")

# 1. Stereo-Enhanced Master (cleans low end, punch EQ, wide highs/mids, centered mono sub, true peak -1.0 dBTP)
stereo_pre = (
    "highpass=f=28:p=2,"
    "equalizer=f=62:t=q:w=1.2:g=1.2,"
    "equalizer=f=330:t=q:w=1.4:g=-1.2,"
    "equalizer=f=3600:t=q:w=1.3:g=1.4,"
    "highshelf=f=11500:g=1.3,"
    "asplit=2[bass][high];"
    "[bass]lowpass=f=120,pan=stereo|c0=0.5*c0+0.5*c1|c1=0.5*c0+0.5*c1[bass_mono];"
    "[high]highpass=f=120,haas=side_gain=0.28:left_delay=1.1:right_delay=1.6:middle_source=mid[high_stereo];"
    "[bass_mono][high_stereo]amix=inputs=2:weights=1 1:normalize=0"
)

# 2. Direct Pure Mix Master (exact original stereo/mono staging preserved, with analog punch EQ, sub clean, and true peak -1.0 dBTP)
direct_pre = (
    "highpass=f=28:p=2,"
    "equalizer=f=62:t=q:w=1.2:g=1.2,"
    "equalizer=f=330:t=q:w=1.4:g=-1.2,"
    "equalizer=f=3600:t=q:w=1.3:g=1.4,"
    "highshelf=f=11500:g=1.3"
)

master_variant("Stereo Enhanced Master (24-bit)", stereo_pre, out_stereo_wav, "pcm_s24le")
master_variant("Direct Mix Master (24-bit)", direct_pre, out_pure_wav, "pcm_s24le")
master_variant("Stereo Enhanced Master (16-bit)", stereo_pre, out_16bit_wav, "pcm_s16le")

print("\n=== ALL MASTERS GENERATED SUCCESSFULLY ===")
