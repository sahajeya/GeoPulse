import time
from pyspark.sql import SparkSession
from sedona.spark import SedonaContext
from pyspark.sql.functions import col, expr, count, countDistinct


GPS_FILE = "data/processed/spatial_audit_1m.csv"
STORES_FILE = "data/reference/stores.csv"


def main():
    start_time = time.perf_counter()
    config = (
        SedonaContext.builder()
        .config(
            "spark.jars.packages",
            "org.apache.sedona:sedona-spark-shaded-3.5_2.12:1.9.1",
        )
        .config(
            "spark.sql.extensions",
            "org.apache.sedona.sql.SedonaSqlExtensions",
        )
        .config("spark.driver.memory", "4g")
        .config("spark.executor.memory", "4g")
        .getOrCreate()
    )

    spark = SedonaContext.create(config)
    spark.sparkContext.setLogLevel("WARN")

    print("=" * 60)
    print("GeoPulse PySpark + Apache Sedona Spatial Audit")
    print("=" * 60)

    gps = (
        spark.read
        .option("header", True)
        .option("inferSchema", True)
        .csv(GPS_FILE)
    )

    stores = (
        spark.read
        .option("header", True)
        .option("inferSchema", True)
        .csv(STORES_FILE)
    )

    print(f"GPS records loaded : {gps.count():,}")
    print(f"Stores loaded       : {stores.count():,}")

    gps = gps.withColumn(
        "geometry",
        expr("ST_Point(CAST(Longitude AS DOUBLE), CAST(Latitude AS DOUBLE))")
    )

    stores = stores.withColumn(
        "geometry",
        expr("ST_Point(CAST(Longitude AS DOUBLE), CAST(Latitude AS DOUBLE))")
    )

    stores = stores.withColumn(
        "catchment",
        expr("ST_Buffer(ST_Transform(geometry, 'epsg:4326', 'epsg:32643'), 500)")
    )

    gps_projected = gps.withColumn(
        "geometry_utm",
        expr("ST_Transform(geometry, 'epsg:4326', 'epsg:32643')")
    )

    matched = (
        gps_projected
        .join(
            stores.select("StoreID", "StoreName", "catchment"),
            expr("ST_Contains(catchment, geometry_utm)"),
            "inner",
        )
    )

    matched_count = matched.count()
    unique_devices = matched.select("DeviceID").distinct().count()
    stores_with_traffic = matched.select("StoreID").distinct().count()

    print("-" * 60)
    print(f"Matched GPS points : {matched_count:,}")
    print(f"Unique devices     : {unique_devices:,}")
    print(f"Stores with traffic: {stores_with_traffic}")
    print("-" * 60)

    elapsed_time = time.perf_counter() - start_time
    print(f"Execution time    : {elapsed_time:.2f} seconds")
    print("Spatial audit completed successfully.")
    print("=" * 60)

    spark.stop()


if __name__ == "__main__":
    main()
