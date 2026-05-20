from pydantic import BaseModel


class SiteResponse(BaseModel):
    id: int
    name: str
    farmer: str

    model_config = {"from_attributes": True}


class SiteDataResponse(BaseModel):
    time: str
    field: str
    value: float
    position: str