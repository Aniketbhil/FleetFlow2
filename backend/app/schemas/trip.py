from pydantic import BaseModel
from typing import Optional

class TripCreate(BaseModel):
    vehicle_id: int
    driver_id: int
    cargo_weight: float

class TripComplete(BaseModel):
    end_odometer: float

class TripResponse(BaseModel):
    id: int
    vehicle_id: int
    driver_id: int
    cargo_weight: float
    start_odometer: float
    end_odometer: Optional[float]
    status: str

    class Config:
        from_attributes = True