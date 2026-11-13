import csv
import random
from datetime import datetime, timedelta

random.seed(42)

# Bengaluru location (sample coordinates)
CENTER_LAT = 12.9716
CENTER_LON = 77.5946

NUM_RECORDS = 10000
NUM_DEVICES = 1000

start_time = datetime(2026, 11, 13, 6, 0, 0)

with open("mobile_gps_pings.csv", "w", newline="") as file:
    writer = csv.writer(file)

    writer.writerow([
        "DeviceID",
        "Latitude",
        "Longitude",
        "Timestamp"
    ])

    for i in range(NUM_RECORDS):
        device_id = f"D{random.randint(1, NUM_DEVICES):04d}"

        latitude = CENTER_LAT + random.uniform(-0.08, 0.08)
        longitude = CENTER_LON + random.uniform(-0.08, 0.08)

        timestamp = start_time + timedelta(
            minutes=random.randint(0, 720)
        )

        writer.writerow([
            device_id,
            round(latitude, 6),
            round(longitude, 6),
            timestamp.strftime("%Y-%m-%d %H:%M:%S")
        ])

print("GPS dataset generated successfully!")
print(f"Total records: {NUM_RECORDS}")
print("File: mobile_gps_pings.csv")
