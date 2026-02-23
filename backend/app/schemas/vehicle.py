from pydantic import BaseModel

class VehicleCreate(BaseModel): # VehicleCreate → what frontend sends
    name: str
    plate_number: str
    max_capacity: float
    odometer: float

class VehicleResponse(BaseModel): # VehicleResponse → what backend returns
    id: int
    name: str
    plate_number: str
    max_capacity: float
    odometer: float
    status: str

    class Config:   # Never expose internal DB structure blindly.
        from_attributes = True  