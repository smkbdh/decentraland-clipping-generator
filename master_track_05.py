import json
import subprocess
import os

input_mp3 = r"C:\Users\humun\.gemini\antigravity\brain\347c6e35-8b2f-4423-aab7-8e37cef363f8\.user_uploaded\uploaded_media_1793686138443.mp3"
out_dir = r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity\mastered_releases\track_05"
os.makedirs(out_dir, exist_ok=True)

out_stereo_wav = os.path.join(out_dir, "master_offstep_stereo_24bit.wav")
out_direct_wav = os.path.join(out_dir, "master_offstep_direct_24bit.wav")
out_16bit_wav = os.path.join(out_dir, "master_offstep_stereo_16bit.wav")

# Mastering chain for Track 5 ("Караван добра" / Jungle Bass):
# 1. Gentle HPF only below 20 Hz (p=1, preserves all 30-60 Hz deep sub-bass completely)
# 2. Sub-bass boost at 48 Hz (+2.2 dB) for heavy deep jungle bass foundation
# 3. Punch boost at 80 Hz (+1.6 dB) for kick body
# 4. Clean boxiness at 330 Hz (-1.0 dB)
# 5. Vocal presence & articulation at 3200 Hz (+1.2 dB)
# 6. Smooth air at 11.5 kHz (+1.2 dB)
# 7. Natural smooth fade-out at end (st=133.0, d=0.7)
# 8. Two-pass EBU R128 loudness normalization to -10.0 LUFS with -0.8 dBTP True-Peak limit

eq_chain = (
    "highpass=f=20:p=1,"
    "equalizer=f=48:t=q:w=1.0:g=2.2,"
    "equalizer=f=80:t=q:w=1.2:g=1.6,"
    "equalizer=f=330:t=q:w=1.4:g=-1.0,"
    "equalizer=f=3200:t=q:w=1.2:g=1.2,"
    "highshelf=f=11500:g=1.2,"
    "afade=t=out:st=133.0:d=0.7"
)

stereo_filter = (
    f"{eq_chain},"
    "asplit=2[bass][high];"
    "[bass]lowpass=f=160,pan=stereo|c0=0.5*c0+0.5*c1|c1=0.5*c0+0.5*c1[bass_mono];"
    "[high]highpass=f=160,haas=side_gain=0.30:left_delay=1.1:right_delay=1.6:middle_source=mid[high_stereo];"
    "[bass_mono][high_stereo]amix=inputs=2:weights=1 1:normalize=0"
)

direct_filter = eq_chain

def master_variant(name, pre_filter, out_path, bit_depth="pcm_s24le"):
    print(f"\n--- Mastering {name} ---")
    pass1_filter = f"{pre_filter},loudnorm=I=-10.0:TP=-0.8:LRA=6:print_format=json"
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
    print(f"Pass 1 stats for {name}:")
    for k, v in stats.items():
        print(f"  {k}: {v}")
        
    pass2_filter = (
        f"{pre_filter},loudnorm=I=-10.0:TP=-0.8:LRA=6:"
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

if __name__ == "__main__":
    master_variant("Stereo Enhanced Master (24-bit)", stereo_filter, out_stereo_wav, "pcm_s24le")
    master_variant("Direct Mix Master (24-bit)", direct_filter, out_direct_wav, "pcm_s24le")
    master_variant("Stereo Enhanced Master (16-bit)", stereo_filter, out_16bit_wav, "pcm_s16le")
    print("\n=== Track 05 Mastering Complete ===")
