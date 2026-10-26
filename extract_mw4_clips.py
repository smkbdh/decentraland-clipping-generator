import sys
import codecs
import zipfile
from pathlib import Path

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

raw_dir = Path("raw_clips")
out_dir = Path("mw4_raw")
out_dir.mkdir(parents=True, exist_ok=True)

TARGETS = [
    ("MW4_DMZ_NormalExtract_Blurred.mp4", "2006-20261026T113701Z-1-007.zip", "mw4_extract.mp4"),
    ("MW4_DMZClipping_Sniping_A_Blurred.mp4", "2006-20261026T113701Z-1-011.zip", "mw4_sniping_a.mp4"),
    ("MW4_DMZClipping_Sniping_B_Blurred.mp4", "2006-20261026T113701Z-1-007.zip", "mw4_sniping_b.mp4"),
    ("MW4_DMZClipping_drivingWithSquad_Blurred.mp4", "2006-20261026T113701Z-1-008.zip", "mw4_driving.mp4"),
    ("mw4 26oct 1.mp4", "2006-20261026T113701Z-1-002.zip", "mw4_oct26.mp4"),
]

for name, zip_name, target_name in TARGETS:
    zf_path = raw_dir / zip_name
    dest_path = out_dir / target_name
    print(f"Extracting {name} from {zip_name} -> {target_name}...")
    try:
        with zipfile.ZipFile(zf_path, "r") as z:
            # Find the file in zip entries
            matched = [item for item in z.infolist() if Path(item.filename).name == name]
            if matched:
                item = matched[0]
                with z.open(item) as src, open(dest_path, "wb") as dst:
                    dst.write(src.read())
                print(f"  OK! Extracted {dest_path.stat().st_size / (1024*1024):.1f} MB")
            else:
                print(f"  File {name} not found in {zip_name}")
    except Exception as e:
        print(f"  Error: {e}")

print("\nExtraction complete! Files in mw4_raw:")
for f in out_dir.glob("*.mp4"):
    print(f"- {f.name}: {f.stat().st_size / (1024*1024):.1f} MB")
