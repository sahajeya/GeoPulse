import pandas as pd
from pathlib import Path

INPUT_FILE = Path("data/raw/mobile_gps_pings.csv")
OUTPUT_FILE = Path("data/processed/spatial_audit_1m.csv")

TARGET_ROWS = 2_000_000

print("Reading base GPS data...")
df = pd.read_csv(INPUT_FILE)

print(f"Base records: {len(df):,}")

repeats = (TARGET_ROWS + len(df) - 1) // len(df)

parts = []

for i in range(repeats):
    chunk = df.copy()
    chunk["DeviceID"] = chunk["DeviceID"].astype(str) + f"_B{i+1:02d}"
    parts.append(chunk)

benchmark = pd.concat(parts, ignore_index=True).head(TARGET_ROWS)

OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
benchmark.to_csv(OUTPUT_FILE, index=False)

print("=" * 60)
print("Spatial benchmark data generated")
print("=" * 60)
print(f"Output records : {len(benchmark):,}")
print(f"Output file    : {OUTPUT_FILE}")
print(f"File size      : {OUTPUT_FILE.stat().st_size / (1024 * 1024):.2f} MB")
