import pandas as pd
from pathlib import Path


# -----------------------------
# Store reference data
# -----------------------------
stores = [
    {
        "StoreID": "STORE001",
        "StoreName": "City Center Store",
        "Latitude": 11.0168,
        "Longitude": 76.9558
    },
    {
        "StoreID": "STORE002",
        "StoreName": "North Zone Store",
        "Latitude": 11.0500,
        "Longitude": 76.9700
    },
    {
        "StoreID": "STORE003",
        "StoreName": "East Zone Store",
        "Latitude": 11.0300,
        "Longitude": 77.0200
    },
    {
        "StoreID": "STORE004",
        "StoreName": "South Zone Store",
        "Latitude": 11.0000,
        "Longitude": 76.9800
    },
    {
        "StoreID": "STORE005",
        "StoreName": "West Zone Store",
        "Latitude": 11.0400,
        "Longitude": 76.9300
    }
]


# -----------------------------
# Create DataFrame
# -----------------------------
def generate_store_data():
    store_data = pd.DataFrame(stores)

    output_file = Path("data/reference/stores.csv")

    output_file.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    store_data.to_csv(
        output_file,
        index=False
    )

    print("Store reference dataset generated successfully!")
    print(f"Total stores: {len(store_data)}")
    print(f"Output file : {output_file}")
    print("\nStore data:")
    print(store_data.to_string(index=False))


if __name__ == "__main__":
    generate_store_data()