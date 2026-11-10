import pandas as pd
import numpy as np
from pathlib import Path


# -----------------------------
# Configuration
# -----------------------------
NUM_DEVICES = 1000
PINGS_PER_DEVICE = 100

START_DATE = "2026-01-01 00:00:00"
END_DATE = "2026-01-07 23:59:59"

# Example city-area boundaries
MIN_LAT = 11.00
MAX_LAT = 11.10
MIN_LON = 76.90
MAX_LON = 77.10

OUTPUT_FILE = Path("data/raw/mobile_gps_pings.csv")


# -----------------------------
# Generate GPS data
# -----------------------------
def generate_gps_data():
    np.random.seed(42)

    total_records = NUM_DEVICES * PINGS_PER_DEVICE

    device_ids = np.repeat(
        [f"DEV{i:05d}" for i in range(1, NUM_DEVICES + 1)],
        PINGS_PER_DEVICE
    )

    timestamps = pd.date_range(
        start=START_DATE,
        end=END_DATE,
        periods=total_records
    )

    latitudes = np.random.uniform(
        MIN_LAT,
        MAX_LAT,
        total_records
    )

    longitudes = np.random.uniform(
        MIN_LON,
        MAX_LON,
        total_records
    )

    gps_data = pd.DataFrame({
        "DeviceID": device_ids,
        "Latitude": np.round(latitudes, 6),
        "Longitude": np.round(longitudes, 6),
        "Timestamp": timestamps
    })

    # Shuffle records to mimic real-world mobile pings
    gps_data = gps_data.sample(
        frac=1,
        random_state=42
    ).reset_index(drop=True)

    # Create output directory if it does not exist
    OUTPUT_FILE.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    # Save CSV
    gps_data.to_csv(
        OUTPUT_FILE,
        index=False
    )

    print("GPS dataset generated successfully!")
    print(f"Total records : {len(gps_data):,}")
    print(f"Unique devices: {gps_data['DeviceID'].nunique():,}")
    print(f"Output file   : {OUTPUT_FILE}")
    print("\nFirst 5 records:")
    print(gps_data.head().to_string(index=False))


if __name__ == "__main__":
    generate_gps_data()