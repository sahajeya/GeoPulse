# GeoPulse

## Hyper-Local Retail Mobility Analytics

GeoPulse is a geospatial retail analytics platform designed to analyze mobile device movement, store footfall, catchment areas, and store-to-store visitor overlap for data-driven retail and real-estate decisions.

## Project Objective

The project uses anonymized mobile GPS mobility data to identify store catchments, measure hourly footfall, analyze visitor overlap between stores, and provide interactive geospatial insights.

## Technology Stack

- Python
- Snowflake
- SQL
- dbt
- Apache Airflow
- H3
- React
- Kepler.gl
- MapLibre GL

## Week 1 - Data Synthesis and Snowflake Loading

- Generated 100,000 synthetic mobile GPS records.
- Each record contains Device ID, Latitude, Longitude, and Timestamp.
- Created 5 retail store locations for analysis.
- Loaded GPS data into Snowflake.
- Used Snowflake GEOGRAPHY data type for spatial coordinates.
- Created 500-meter store catchment areas using Snowflake spatial functions.

### Week 1 Outcome

The geospatial data foundation was successfully established in Snowflake with GPS points, store locations, and store catchment areas ready for spatial analysis.

## Week 2 - Spatial Analysis and Data Modeling

- Performed spatial matching between GPS points and 500-meter store catchments.
- Identified 1,501 GPS points within store catchments.
- Identified 772 unique devices across the store catchments.
- Generated hourly store footfall analytics.
- Created 668 hourly footfall records.
- Compared morning and evening traffic patterns.
- Implemented dbt staging and store-level aggregation models.
- Added dbt data quality tests for the staging model.

### Week 2 Outcome

Raw GPS mobility data was transformed into structured store-level and hourly footfall analytics, providing the foundation for further cannibalization analysis and geospatial visualization.

## Current Analytics

The project currently supports:

- Store catchment analysis
- Hourly footfall analysis
- Unique visitor analysis
- Store-to-store visitor overlap
- Cannibalization percentage analysis
- H3-based footfall aggregation
- Interactive geospatial visualization
- Automated Airflow pipeline orchestration

## Project Structure

```text
GeoPulse/
|-- airflow/
|-- data/
|-- geopulse_dbt/
|-- frontend/
|-- scripts/
|-- README.md
``` 

## Project Status

Core geospatial data loading, spatial catchment analysis, footfall modeling, cannibalization analysis, H3 aggregation, React/Kepler.gl visualization, PySpark/Apache Sedona spatial validation, and Airflow orchestration have been implemented.

The pipeline has been validated with a 2,000,000-record spatial benchmark using Apache Sedona, completing successfully in 19.95 seconds without an out-of-memory failure. The Airflow workflow is validated end-to-end as PySpark spatial audit → H3 footfall generation → dbt/Snowflake transformation. The React/Kepler.gl frontend also passes the production build.