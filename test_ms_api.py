import urllib.request
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*'
}

urls = [
    'https://api.mediasilo.com/v3/quicklinks/6ae109cef2c6470f09434547',
    'https://api.mediasilo.com/v3/quicklinks/6ae109cef2c6470f09434547/assets?_page=1&_pageSize=50&_sortBy=_default&_sort=asc',
    'https://api.mediasilo.com/v3/quicklinks/6ae109cef2c6470f09434547/folders?_page=1&_pageSize=100'
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = resp.read().decode('utf-8')
            print(f'SUCCESS [{resp.status}] {u}')
            print('Preview:', data[:400])
            with open('mediasilo_api_res.json', 'w', encoding='utf-8') as f:
                f.write(data)
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='ignore')
        print(f'HTTPError [{e.code}] {u}: {body[:200]}')
    except Exception as e:
        print(f'Error {u}: {e}')
