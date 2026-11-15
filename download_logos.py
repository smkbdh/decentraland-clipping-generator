import urllib.request
import os

logos = {
    'cursor_logo.png': 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/cursor.png',
    'claude_logo.png': 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/claude-color.png',
    'openai_logo.png': 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/openai.png',
    'replit_logo.png': 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/replit.png',
    'n8n_logo.png': 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/n8n-color.png',
    'telegram_logo.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png',
    'wix_logo.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Wix.com_website_logo.svg/512px-Wix.com_website_logo.svg.png',
    'salesforce_logo.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png'
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
out_dir = r'D:\Buddah\ai_boom_assets'

for filename, url in logos.items():
    dest = os.path.join(out_dir, filename)
    if os.path.exists(dest):
        print(f'Already exists: {filename}')
        continue
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            with open(dest, 'wb') as f:
                f.write(resp.read())
        print(f'[OK] Downloaded: {filename}')
    except Exception as e:
        print(f'[FAIL] {filename}: {e}')
