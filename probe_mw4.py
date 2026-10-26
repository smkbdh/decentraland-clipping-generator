import subprocess
import json
from pathlib import Path

raw_dir = Path("mw4_raw")
for f in sorted(raw_dir.glob("*.mp4")):
    cmd = ["ffprobe", "-v", "error", "-show_entries", "stream=width,height,duration,codec_type", "-of", "json", str(f)]
    res = subprocess.run(cmd, capture_output=True, text=True)
    data = json.loads(res.stdout)
    streams = data.get("streams", [])
    v_stream = next((s for s in streams if s.get("codec_type") == "video"), {})
    a_stream = next((s for s in streams if s.get("codec_type") == "audio"), {})
    w = v_stream.get("width")
    h = v_stream.get("height")
    dur = float(v_stream.get("duration", 0))
    print(f"- {f.name}: {w}x{h}, duration={dur:.1f}s, has_audio={bool(a_stream)}")
