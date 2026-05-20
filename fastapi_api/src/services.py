from typing import List

from src.config import settings
from influxdb_client import InfluxDBClient

client = InfluxDBClient(
    url=settings.influxdb_url,
    token=settings.influxdb_token,
    org=settings.influxdb_org,
    timeout=settings.influxdb_timeout,
    verify_ssl=settings.influxdb_verify_ssl,
    enable_gzip=True,
    debug=False,
)
query_api = client.query_api()


class InfluxQueryService:
    @staticmethod
    def get_site_data(
        site_id: int,
        start: str = "-24h",
        end: str = "now()",
        measurement: str = "temperature",
        fields: List[str] = ["air_temperature", "soil_temperature"],
        positions: List[str] = ["in", "out"],
    ):
        """
        Parameters
        ----------
        site_id: int
        measurement : str
        fields: List[str] - Could be "air_temperature" and/or "soil_temperature"
        positions: List[str] - "in" and/or "out"

        Returns
        -------
        list
            A list of dicts with keys: time, field, value, position
        """
        field_condition = " or ".join([f'r["_field"] == "{field}"' for field in fields])
        field_filter = f"|> filter(fn: (r) => {field_condition})"

        position_condition = " or ".join(
            [f'r["position"] == "{position}"' for position in positions]
        )
        position_filter = f"|> filter(fn: (r) => {position_condition})"

        flux_query = f"""\
from(bucket: "sensors")
|> range(start: {start}, stop: {end})
|> filter(fn: (r) => r["_measurement"] == "{measurement}")
{field_filter}
|> filter(fn: (r) => r["site_id"] == "{site_id}")
{position_filter}
|> aggregateWindow(every: 1h, fn: mean, createEmpty: false)
|> yield(name: "mean")
"""

        tables = query_api.query(flux_query)
        values_list = tables.to_values(
            columns=["_time", "_field", "_value", "position"]
        )

        device_data = [
            {
                "time": time.isoformat(),
                "field": field,
                "value": value,
                "position": position,
            }
            for time, field, value, position in values_list
        ]

        return device_data
