import json
import re

with open("tiktok_studio_page.html", "r", encoding="utf-8") as f:
    text = f.read()

# Search for SIGI_STATE or __UNIVERSAL_DATA_FOR_REHYDRATION__
scripts = re.findall(r'<script[^>]*>(.*?)</script>', text, re.DOTALL)
print(f"Total script tags: {len(scripts)}")

# Search for user handle
handles = re.findall(r'unique_id&quot;:&quot;([^&]+)&quot;', text)
if not handles:
    handles = re.findall(r'uniqueId&quot;:&quot;([^&]+)&quot;', text)
if not handles:
    handles = re.findall(r'"unique_id":"([^"]+)"', text)
if not handles:
    handles = re.findall(r'"uniqueId":"([^"]+)"', text)
print("Handles found:", set(handles))

# Search for titles / captions
captions = re.findall(r'&quot;desc&quot;:&quot;([^&]+)&quot;', text)
if not captions:
    captions = re.findall(r'"desc":"([^"]+)"', text)
print(f"Captions found ({len(captions)}):")
for c in captions[:10]:
    print(" - ", c[:60])

# Search for video IDs associated with items
video_ids = re.findall(r'&quot;item_id&quot;:&quot;(\d+)&quot;', text)
if not video_ids:
    video_ids = re.findall(r'"item_id":"(\d+)"', text)
if not video_ids:
    video_ids = re.findall(r'/video/(\d+)', text)
print("Video IDs:", set(video_ids))
