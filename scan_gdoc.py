with open('gdoc_dump.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
print("All URLs in gdoc_dump:")
for m in set(re.findall(r'https?://[^\s"\'<>]+', text)):
    print(m)
