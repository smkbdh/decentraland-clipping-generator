import requests
import re
import os

url = "https://drive.google.com/drive/folders/1tkw6NsM4umGrkx1p-id8WXG-S_zH9Gm6"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

r = requests.get(url, headers=headers)
print("Status:", r.status_code)
# Search for IDs and names in Google Drive folder payload
matches = re.findall(r'\["([a-zA-Z0-9_-]{28,})",\["([^"]+)"', r.text)
print("Found items:", len(matches))
for item in matches[:20]:
    print(item)
