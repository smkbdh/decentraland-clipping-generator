from pathlib import Path
import time
from auto_pipeline import upload_and_publish

BASE_DIR = Path(__file__).resolve().parent
HOOK_DIR = BASE_DIR / "ready_videos" / "hooked_videos"

QUEUE = [
    {
        "video": HOOK_DIR / "Hook1_BumpySlide_to_Halloween.mp4",
        "title": "Me in Real Life vs Decentraland 🎃 #shorts",
        "desc": (
            "Halloweeks is live through Nov 1. Jump in if you dare 🎃\n"
            "Decentraland is a free social gaming world for adults, available on desktop and mobile.\n\n"
            "@decentraland_foundation #decentraland #halloweeks #halloween #gaming #shorts"
        )
    },
    {
        "video": HOOK_DIR / "Hook2_Golfer_to_SlayTheSteps.mp4",
        "title": "My Balance in Real Life Be Like 😂 #shorts",
        "desc": (
            "This group lost every round and still had the best time. Come play together 😂\n"
            "Decentraland is a free social gaming world for adults, available on desktop and mobile.\n\n"
            "@decentraland_foundation #decentraland #funnygaming #gaming #adultgaming #shorts"
        )
    },
    {
        "video": HOOK_DIR / "Hook3_LaunchTackle_to_Jetpack.mp4",
        "title": "How Monday Hits You 🚀 #shorts",
        "desc": (
            "Jetpacks and joyrides through the skies. Come hang out 🚀\n"
            "Decentraland is a free social gaming world for adults, available on desktop and mobile.\n\n"
            "@decentraland_foundation #decentraland #virtualworld #gaming #adultgaming #shorts"
        )
    },
    {
        "video": HOOK_DIR / "Hook4_CornThrow_to_ClubParty.mp4",
        "title": "When Life Throws Hands 🪩 #shorts",
        "desc": (
            "Sunday night went crazy at the club. Come hang out 🪩\n"
            "Decentraland is a free social gaming world for adults, available on desktop and mobile.\n\n"
            "@decentraland_foundation #decentraland #nightclub #virtualparty #adultgaming #shorts"
        )
    }
]

published = []
for item in QUEUE:
    print(f"\n==========================================")
    print(f"Publishing Hooked Video: {item['video'].name}")
    print(f"==========================================")
    try:
        url = upload_and_publish(item["video"], item["title"], item["desc"])
        published.append((item["video"].name, url))
        print("Waiting 5s before next upload...")
        time.sleep(5)
    except Exception as e:
        print(f"Failed to publish {item['video'].name}: {e}")

print("\n\n==========================================")
print("ALL HOOKED VIDEOS PUBLISHED SUCCESSFULLY!")
print("==========================================")
for name, url in published:
    print(f" - {name} -> {url}")
