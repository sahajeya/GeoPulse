WITH device_store AS (

    SELECT DISTINCT
        DEVICE_ID,
        STORE_ID
    FROM GEOPULSE.RAW.GPS_STORE_CATCHMENTS

),

store_visitors AS (

    SELECT
        STORE_ID,
        COUNT(DISTINCT DEVICE_ID) AS UNIQUE_VISITORS
    FROM device_store
    GROUP BY STORE_ID

),

shared_visitors AS (

    SELECT
        a.STORE_ID AS STORE_A,
        b.STORE_ID AS STORE_B,
        COUNT(DISTINCT a.DEVICE_ID) AS SHARED_VISITORS
    FROM device_store a
    JOIN device_store b
        ON a.DEVICE_ID = b.DEVICE_ID
       AND a.STORE_ID < b.STORE_ID
    GROUP BY
        a.STORE_ID,
        b.STORE_ID

)

SELECT
    s.STORE_A,
    s.STORE_B,
    va.UNIQUE_VISITORS AS STORE_A_VISITORS,
    vb.UNIQUE_VISITORS AS STORE_B_VISITORS,
    s.SHARED_VISITORS,
    ROUND(
        100.0 * s.SHARED_VISITORS /
        (va.UNIQUE_VISITORS + vb.UNIQUE_VISITORS - s.SHARED_VISITORS),
        2
    ) AS CANNIBALIZATION_PERCENT
FROM shared_visitors s
JOIN store_visitors va
    ON s.STORE_A = va.STORE_ID
JOIN store_visitors vb
    ON s.STORE_B = vb.STORE_ID
ORDER BY CANNIBALIZATION_PERCENT DESC;