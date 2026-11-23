from datetime import datetime

from airflow.sdk import DAG
from airflow.providers.standard.operators.bash import BashOperator


with DAG(
    dag_id="geopulse_pipeline",
    start_date=datetime(2026, 1, 1),
    schedule="@daily",
    catchup=False,
    tags=["GeoPulse", "geospatial", "analytics"],
) as dag:

    generate_h3_footfall = BashOperator(
        task_id="generate_h3_footfall",
        bash_command=(
            "cd /mnt/c/Users/Sahana/OneDrive/Desktop/GeoPulse && "
            "python scripts/generate_h3_footfall.py"
        ),
    )

    run_dbt = BashOperator(
        task_id="run_dbt",
        bash_command=(
            "cd /mnt/c/Users/Sahana/OneDrive/Desktop/GeoPulse/geopulse_dbt && "
            "dbt run"
        ),
    )

    generate_h3_footfall >> run_dbt
