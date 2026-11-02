import urllib.request
import re

url = 'https://whop.com/clippingculture/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
        links = re.findall(r'https?://[^\s"\'<>]+', html)
        print("Total links on Whop:", len(links))
        for l in set(links):
            if any(k in l.lower() for k in ['drive', 'discord', 'mediasilo', 'dropbox', 'review']):
                print(l)
except Exception as e:
    print('Error:', e)
