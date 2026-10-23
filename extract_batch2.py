import zipfile
import shutil
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
RAW_DIR = BASE_DIR / "raw_clips"
EXTRACT_DIR = BASE_DIR / "batch2_clips"
EXTRACT_DIR.mkdir(exist_ok=True)

TARGETS = [
    ("Desktop-20261023T064542Z-1-005.zip", "Monster Recon"),
    ("Desktop-20261023T064542Z-1-004.zip", "Sunday Night Went CRAZY"),
    ("Desktop-20261023T064542Z-1-008.zip", "Jetpacks and Joyrides"),
    ("Desktop-20261023T064542Z-1-011.zip", "Halloweeks in Decentraland"),
]

for zip_name, keyword in TARGETS:
    zpath = RAW_DIR / zip_name
    if not zpath.exists():
        print(f"Not found: {zip_name}")
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

print("\nExtraction of Batch 2 sources complete!")
