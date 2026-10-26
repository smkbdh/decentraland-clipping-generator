import sys
import codecs
import zipfile
from pathlib import Path

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

raw_dir = Path("raw_clips")
out_dir = Path("mw4_raw")
out_dir.mkdir(parents=True, exist_ok=True)

zip_files = sorted(list(raw_dir.glob("*.zip")))
print(f"Total zip archives: {len(zip_files)}")

found_files = {}

for zf in zip_files:
    try:
        with zipfile.ZipFile(zf, "r") as z:
            for item in z.infolist():
                if item.filename.lower().endswith((".mp4", ".mov", ".mkv")):
                    base = Path(item.filename).name
                    # Ignore Romanian / localized duplicates if main exists
                    if base not in found_files:
                        found_files[base] = (zf, item)
    except Exception as e:
        print(f"Error reading {zf.name}: {e}")

print(f"\nUnique video files found across archives: {len(found_files)}")
for name, (zf, item) in sorted(found_files.items()):
    size_mb = item.file_size / (1024 * 1024)
    print(f"- {name} ({size_mb:.1f} MB) in {zf.name}")
