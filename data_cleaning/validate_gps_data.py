
import pandas as pd
from pathlib import Path

# Input files
GPS_FILE = Path("data/raw/mobile_gps_pings.csv")
STORE_FILE = Path("data/reference/stores.csv")

def validate_gps_data():

    print("GEO PULSE - DATA VALIDATION")
    print("=" * 40)

    # Check file existence
    if not GPS_FILE.exists():
        raise FileNotFoundError(f"GPS file not found: {GPS_FILE}")

    if not STORE_FILE.exists():
        raise FileNotFoundError(f"Store file not found: {STORE_FILE}")

    # Load datasets
    gps = pd.read_csv(GPS_FILE)
    stores = pd.read_csv(STORE_FILE)

    # Required columns
    required_gps = [
        "DeviceID", "Latitude", "Longitude", "Timestamp"
    ]

    required_stores = [
        "StoreID", "StoreName", "Latitude", "Longitude"
    ]

    assert all(col in gps.columns for col in required_gps)
    assert all(col in stores.columns for col in required_stores)

    # Missing values
    missing_values = gps[required_gps].isnull().sum().sum()

    # Duplicate records
    duplicate_records = gps.duplicated().sum()

    # Invalid coordinates
    invalid_latitude = (
        ~gps["Latitude"].between(-90, 90)
    ).sum()

    invalid_longitude = (
        ~gps["Longitude"].between(-180, 180)
    ).sum()

    # Timestamp validation
    gps["Timestamp"] = pd.to_datetime(
        gps["Timestamp"], errors="coerce"
    )

    invalid_timestamps = gps["Timestamp"].isna().sum()

    # Summary
    print(f"Total GPS records       : {len(gps):,}")
    print(f"Unique devices          : {gps['DeviceID'].nunique():,}")
    print(f"Total stores            : {len(stores)}")
    print(f"Missing values          : {missing_values}")
    print(f"Duplicate records       : {duplicate_records}")
    print(f"Invalid latitudes       : {invalid_latitude}")
    print(f"Invalid longitudes      : {invalid_longitude}")
    print(f"Invalid timestamps      : {invalid_timestamps}")

    # Save validation report
    report = pd.DataFrame({
        "Metric": [
            "Total GPS Records",
            "Unique Devices",
            "Total Stores",
            "Missing Values",
            "Duplicate Records",
            "Invalid Latitudes",
            "Invalid Longitudes",
            "Invalid Timestamps"
        ],
        "Value": [
            len(gps),
            gps["DeviceID"].nunique(),
            len(stores),
            missing_values,
            duplicate_records,
            invalid_latitude,
            invalid_longitude,
            invalid_timestamps
        ]
    })

    output = Path("data/output")
    output.mkdir(parents=True, exist_ok=True)

    report.to_csv(
        output / "gps_validation_report.csv",
        index=False
    )

    print("\nValidation report saved successfully!")
    print("Output: data/output/gps_validation_report.csv")


if __name__ == "__main__":
    validate_gps_data()
