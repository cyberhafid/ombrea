from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src import models
from src.database import get_db
from src.schemas import SiteResponse
from src.schemas import SiteResponse, SiteDataResponse
from src.services import InfluxQueryService

router = APIRouter(prefix="/sites", tags=["sites"])


@router.get("/", response_model=List[SiteResponse])
def list_sites(db: Session = Depends(get_db)):
    sites = db.query(models.Site).all()
    return [
        SiteResponse(id=site.id, name=site.name, farmer=str(site.farmer))
        for site in sites
    ]

""" @router.get("/{site_id}/data", response_model=List[SiteDataResponse])
def get_site_data(site_id: int):
    return InfluxQueryService.get_site_data(site_id) """

@router.get("/{site_id}/data", response_model=List[SiteDataResponse])
def get_site_data(site_id: int, start: str = "-24h", end: str = "now()"):
    return InfluxQueryService.get_site_data(site_id, start=start, end=end)