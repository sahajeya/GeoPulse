import pandas as pd
import h3
from pathlib import Path


INPUT_FILE = Path("data/raw/mobile_gps_pings.csv")
OUTPUT_FILE = Path("data/processed/h3_footfall.csv")

H3_RESOLUTION = 8


def main():
    print("Reading GPS data...")

    df = pd.read_csv(INPUT_FILE)

    df["Timestamp"] = pd.to_datetime(df["Timestamp"])

    print(f"GPS records loaded: {len(df)}")

    print("Generating H3 hexagons...")

    df["H3_INDEX"] = df.apply(
        lambda row: h3.latlng_to_cell(
            row["Latitude"],
            row["Longitude"],
            H3_RESOLUTION,
        ),
        axis=1,
    )

    df["HOUR"] = df["Timestamp"].dt.hour

    h3_footfall = (
        df.groupby(["H3_INDEX", "HOUR"])
        .agg(
            LATITUDE=("Latitude", "mean"),
            LONGITUDE=("Longitude", "mean"),
            FOOTFALL=("DeviceID", "nunique"),
            TOTAL_PINGS=("DeviceID", "count"),
        )
        .reset_index()
    )

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    h3_footfall.to_csv(OUTPUT_FILE, index=False)

    print("H3 footfall generation completed.")
    print(f"H3 cells: {h3_footfall['H3_INDEX'].nunique()}")
    print(f"Output rows: {len(h3_footfall)}")
    print(f"Output file: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()