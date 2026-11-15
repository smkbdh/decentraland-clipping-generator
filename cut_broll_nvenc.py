import subprocess
import os

out_dir = r"D:\Buddah\ai_boom_assets\broll"
os.makedirs(out_dir, exist_ok=True)

cuts = [
    (r"D:\Buddah\5 vibecoding tools-agents.mp4", 5, 25, "broll_cursor_coding.mp4"),
    (r"D:\Buddah\5 vibecoding tools-agents.mp4", 65, 30, "broll_ai_prompting.mp4"),
    (r"D:\Buddah\5 vibecoding tools-agents.mp4", 210, 30, "broll_agent_executing.mp4"),
    (r"D:\Buddah\AIBase.mp4", 10, 25, "broll_aibase_dashboard.mp4"),
    (r"D:\Buddah\0827.mp4", 0, 25, "broll_desktop_workflow.mp4"),
    (r"D:\Buddah\vibecoding reels bot add propertys.mp4", 0, 25, "broll_bot_building.mp4")
]

for src, start, dur, out_name in cuts:
    dest = os.path.join(out_dir, out_name)
    cmd = [
        "ffmpeg", "-y",
        "-ss", str(start),
        "-i", src,
        "-t", str(dur),
        "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2",
        "-c:v", "h264_nvenc",
        "-preset", "p4",
        "-cq", "24",
        "-an",
        dest
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        print(f"[OK] {out_name} ({os.path.getsize(dest)/(1024*1024):.1f} MB)")
    else:
        # Fallback to copy if nvenc has issue
        cmd_copy = ["ffmpeg", "-y", "-ss", str(start), "-i", src, "-t", str(dur), "-c:v", "copy", "-an", dest]
        subprocess.run(cmd_copy, capture_output=True)
        print(f"[COPY] {out_name} ({os.path.getsize(dest)/(1024*1024):.1f} MB)")
