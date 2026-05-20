from random import randint
from unittest.mock import patch
from src.models import Site
from src.schemas import SiteResponse


class TestListSites:
    def test_list_sites_successfull(self, client, db, site_factory):
        [site_factory() for _ in range(randint(5, 10))]

        results_len = db.query(Site).count()
        response = client.get("/sites/")

        assert response.status_code == 200
        json_data = response.json()
        assert len(json_data) == results_len
        for site in json_data:
            SiteResponse(**site)

class TestGetSiteData:
    def test_get_site_data_success(self, client, site_factory):
        site = site_factory()

        mock_data = [
            {"time": "2026-01-01T00:00:00+00:00", "field": "air_temperature", "value": 20.5, "position": "in"},
            {"time": "2026-01-01T01:00:00+00:00", "field": "soil_temperature", "value": 15.3, "position": "out"},
        ]

        with patch("src.routers.sites.InfluxQueryService.get_site_data", return_value=mock_data):
            response = client.get(f"/sites/{site.id}/data?start=-24h&end=now()")

        assert response.status_code == 200
        json_data = response.json()
        assert len(json_data) == 2
        assert json_data[0]["field"] == "air_temperature"

    def test_get_site_data_with_date(self, client, site_factory):
        site = site_factory()

        with patch("src.routers.sites.InfluxQueryService.get_site_data", return_value=[]):
            response = client.get(f"/sites/{site.id}/data?start=2026-01-01T00:00:00Z&end=2026-01-31T23:59:59Z")

        assert response.status_code == 200
        assert response.json() == []