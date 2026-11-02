import re

with open('campaign_full_text.txt', 'r', encoding='utf-8') as f:
    text = f.read()

keywords = ['drive', 'dropbox', 'box.com', 'wetransfer', 'mega.nz', 'youtube', 'vimeo', 's3', 'storage', 'download', 'folder', 'footage']
for line in text.split('\n'):
    if any(k in line.lower() for k in keywords):
        print(line)
