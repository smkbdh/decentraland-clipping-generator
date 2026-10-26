import urllib.request
import re
import sys
import codecs

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

url = "https://drive.google.com/drive/folders/1SmFBrU_a1b4f1L4koy2LvOAfTtgzMbVs?usp=sharing"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8", errors="ignore")
        
    # Search for video file names
    video_files = list(dict.fromkeys(re.findall(r'\["([^"]+\.(?:mp4|mov|mkv|zip|avi))"', html, re.IGNORECASE)))
    print(f"Total video files found: {len(video_files)}")
    for i, vf in enumerate(video_files, 1):
        print(f"{i}. {vf}")

    # Check for drive item structures with IDs
    # In Google Drive initial data, each item has [id, name, mimeType, ...]
    matches = re.findall(r'\["([a-zA-Z0-9_-]{25,40})",\["([^"]+\.(?:mp4|mov|mkv|zip|avi))"', html)
    print(f"\nFiles with IDs ({len(matches)}):")
    for file_id, name in matches:
        print(f"- {name} (ID: {file_id})")

except Exception as e:
    print(f"Error: {e}")
