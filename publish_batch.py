from pathlib import Path
import time
from auto_pipeline import upload_and_publish

QUEUE = [
    {
        "video": Path("ready_videos/6_Decentraland_Sunday_Night_Club_Party.mp4"),
        "title": "Sunday Night at the Virtual Club 🪩 #shorts",
        "desc": (
            "Sunday night went crazy at the club. Come hang out 🪩\n"
            "Decentraland is a free social gaming world for adults, available on desktop and mobile.\n\n"
            "@decentraland_foundation #decentraland #nightclub #virtualparty #adultgaming #shorts"
        )
    },
    {
        "video": Path("ready_videos/7_Decentraland_Halloweeks_Monster_Recon.mp4"),
        "title": "Hunting Halloween Monsters! 🎃 #shorts",
        "desc": (
            "Halloweeks is live through Nov 1. Monster Recon got updated for Halloween 🎃\n"
            "Decentraland is a free social gaming world for adults, available on desktop and mobile.\n\n"
            "@decentraland_foundation #decentraland #halloweeks #gaming #adultgaming #shorts"
        )
    },
    {
        "video": Path("ready_videos/8_Decentraland_Jetpack_Joyrides_Sky.mp4"),
        "title": "Flying Over the 3D City with a Jetpack 🚀 #shorts",
        "desc": (
            "Jetpacks and joyrides through the skies. Come play together 🚀\n"
            "Decentraland is a free social gaming world for adults, available on desktop and mobile.\n\n"
            "@decentraland_foundation #decentraland #jetpack #gaming #virtualworld #shorts"
        )
    }
]

published_urls = []
for item in QUEUE:
    print(f"\n==========================================")
    print(f"Publishing: {item['video'].name}")
    print(f"==========================================")
    try:
        url = upload_and_publish(item["video"], item["title"], item["desc"])
        published_urls.append((item["video"].name, url))
        print(f"Waiting 5s before next upload...")
        time.sleep(5)
    except Exception as e:
        print(f"Failed to publish {item['video'].name}: {e}")

print("\n\n==========================================")
print("ALL VIDEOS PUBLISHED SUCCESSFULLY!")
print("==========================================")
for name, url in published_urls:
    print(f" - {name} -> {url}")
