import urllib.request
import re
import os
import json

urls = [
    ('base44_latka', 'https://getlatka.com/blog/base44-revenue-acquired-wix'),
    ('base44_promptway', 'https://promptway.com/blog/maor-shlomo-base44-wix-exit'),
    ('vibe_failures_finalround', 'https://www.finalroundai.com/blog/vibe-coding-failures-that-prove-ai-cant-replace-developers-yet'),
    ('taskade_vibe_state', 'https://www.taskade.com/blog/state-of-vibe-coding'),
    ('apps_over_10k', 'https://stealwhatworks.com/blogs/news/vibecoded-apps-over-10k'),
    ('prodmoh_10m_mistake', 'https://prodmoh.com/blog/the-10m-mistake'),
    ('replit_incident', 'https://www.kpath.ai/learn/incidents/replit-production-database-deletion'),
    ('klarna_perspective', 'https://getperspective.ai/blog/klarna-ai-customer-service-replacing-700-agents-conversational-ai-case-study'),
    ('attio_salesforce', 'https://www.coffee.ai/articles/attio-vs-salesforce-2026'),
    ('geojournal', 'https://www.searchenginejournal.com/ai-visibility-isnt-a-sham-most-ways-of-measuring-it-are/594405/')
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

out_dir = r'D:\Buddah\ai_boom_assets'
os.makedirs(out_dir, exist_ok=True)

for key, url in urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            title_m = re.search(r'<title>(.*?)</title>', html, re.I | re.S)
            title = title_m.group(1).strip() if title_m else key
            
            og_img = re.search(r'<meta\s+property=["\']og:image["\']\s+content=["\'](.*?)["\']', html, re.I)
            img_url = og_img.group(1) if og_img else None
            
            text = re.sub(r'<[^>]+>', ' ', html)
            text = re.sub(r'\s+', ' ', text).strip()
            
            with open(os.path.join(out_dir, f'{key}.txt'), 'w', encoding='utf-8') as f:
                f.write(f'URL: {url}\nTitle: {title}\nImage: {img_url}\n\n{text[:4000]}')
            
            print(f'[OK] {key}: {title[:50]} | Img: {img_url is not None}')
            
            if img_url:
                try:
                    ext = os.path.splitext(img_url.split('?')[0])[-1] or '.png'
                    if len(ext) > 5 or len(ext) < 2:
                        ext = '.png'
                    img_req = urllib.request.Request(img_url, headers=headers)
                    with urllib.request.urlopen(img_req, timeout=12) as img_resp:
                        with open(os.path.join(out_dir, f'{key}{ext}'), 'wb') as img_f:
                            img_f.write(img_resp.read())
                    print(f'     Saved image: {key}{ext}')
                except Exception as ie:
                    print(f'     Failed img: {ie}')
    except Exception as e:
        print(f'[FAIL] {key}: {e}')
