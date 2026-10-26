import re
import json

with open("full_content_dump.html", "r", encoding="utf-8") as f:
    text = f.read()

# Video definitions to search for
targets = [
    (1, "Hook1 (Горка -> Halloween)", "Wait for the plot twist"),
    (2, "Hook2 (Гольфист -> Slay The Steps)", "That was NOT part of the plan"),
    (3, "Hook3 (Такл -> Jetpack)", "Bro went flying to another dimension"),
    (4, "Hook4 (Кукуруза -> Club Party)", "3 AM energy in this world"),
    (5, "Hook5 (Посуда -> Cherry Blossom)", "Most peaceful place on the internet"),
    (6, "Hook6 (Тапок -> Pumpkin Ball)", "Nobody can dodge this"),
    (7, "Hook7 (Боттл-кик -> Skychaser)", "How did I even make that jump"),
    (8, "Hook8 (Грязное лицо -> Monster Recon)", "Finding hidden boss fights")
]

results = {}

for idx, name, phrase in targets:
    pos = text.find(phrase)
    if pos != -1:
        # Search for item_id in window around pos
        window = text[pos-400:pos+1500]
        id_match = re.search(r'item_id=(\d{19})', window)
        if not id_match:
            id_match = re.search(r'&quot;item_id&quot;:&quot;(\d{19})&quot;', window)
        if not id_match:
            id_match = re.search(r'item_id%3D(\d{19})', window)
        if id_match:
            vid = id_match.group(1)
            results[idx] = (name, f"https://www.tiktok.com/@buddah_ai/video/{vid}")
        else:
            results[idx] = (name, "ID not in window")
    else:
        results[idx] = (name, "Phrase not found in HTML")

print("Matched results:")
out_lines = [
    "# 🔴 LIVE PUBLISHED TIKTOK VIDEOS (Decentraland Campaign)\n",
    "Аккаунт: **@buddah_ai**\n",
    "Статус: **Опубликовано и готово для сабмита в Content Rewards**\n\n",
    "---\n\n"
]

for idx in range(1, 9):
    name, link = results.get(idx, (f"Hook {idx}", "Не найдено"))
    print(f"{idx}. {name}: {link}")
    out_lines.append(f"### Видео {idx}: {name}\n👉 `{link}`\n\n")

with open("PUBLISHED_TIKTOK_LINKS.md", "w", encoding="utf-8") as f:
    f.writelines(out_lines)

print("\nSuccessfully updated PUBLISHED_TIKTOK_LINKS.md!")
