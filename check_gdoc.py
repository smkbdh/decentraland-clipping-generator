import urllib.request
import re

url = 'https://docs.google.com/document/d/1U2UzY4VY4Dkpz9aSQ3f8_jCmVEHpaYikHJdfLVbPHlA/export?format=html'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
        with open('gdoc_dump.html', 'w', encoding='utf-8') as f:
            f.write(html)
        urls = re.findall(r'href=[\'"](https?://[^\'">]+)', html)
        print('Links found in GDoc HTML:')
        for u in set(urls):
            print(u)
except Exception as e:
    print('Error:', e)
