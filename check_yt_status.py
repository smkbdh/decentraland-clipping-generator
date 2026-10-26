import requests
import re
import sys

# Force utf-8 output
sys.stdout.reconfigure(encoding='utf-8')

urls = [
    'https://www.youtube.com/shorts/r2gZwfCLebc',
    'https://www.youtube.com/shorts/HPLGs6CBCSU',
    'https://www.youtube.com/shorts/PBrSLWKv8N8'
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
}

for u in urls:
    r = requests.get(u, headers=headers, timeout=10)
    print(f"URL: {u}")
    print(f"Status: {r.status_code}")
    
    # Title
    t = re.search(r'<title>([^<]+)</title>', r.text)
    if t:
        print(f"Title: {t.group(1)}")
        
    # Playability
    m = re.search(r'"playabilityStatus":\{"status":"([^"]+)"', r.text)
    if m:
        print(f"Playability: {m.group(1)}")
        
    is_private = '"isPrivate":true' in r.text
    print(f"Is Private: {is_private}")
    print("-" * 50)
