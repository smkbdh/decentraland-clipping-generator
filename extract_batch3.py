import zipfile
import shutil
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
RAW_DIR = BASE_DIR / "raw_clips"
EXTRACT_DIR = BASE_DIR / "batch3_clips"
EXTRACT_DIR.mkdir(exist_ok=True)

TARGETS = [
    ("Desktop-20261023T064542Z-1-001.zip", "Decentraland is Ready for Halloween"),
    ("Desktop-20261023T082002Z-1-001.zip", "Cherry Blossom Party"),
    ("Gameplay-20261023T062401Z-1-002.zip", "Punch Championship"),
    ("Gameplay-20261023T062401Z-1-001.zip", "Fishing"),
]

for zip_name, keyword in TARGETS:
    zpath = RAW_DIR / zip_name
    if not zpath.exists():
        print(f"Not found: {zpath}")
        continue
    
    with zipfile.ZipFile(zpath, "r") as z:
        for name in z.namelist():
            if keyword.lower() in name.lower() and name.endswith((".mp4", ".mov")):
                dest_name = Path(name).name
                dest_path = EXTRACT_DIR / dest_name
                if dest_path.exists() and dest_path.stat().st_size > 1000:
                    print(f"Already exists: {dest_name}")
                    continue
                print(f"Extracting {dest_name} from {zip_name} ...")
                with z.open(name) as src, open(dest_path, "wb") as dst:
                    shutil.copyfileobj(src, dst, 1024 * 1024)
                print(f" -> Extracted {dest_name} ({round(dest_path.stat().st_size / (1024*1024), 1)} MB)")

print("\nBatch 3 Extraction Complete!")
