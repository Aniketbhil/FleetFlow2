from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.vehicle import VehicleCreate, VehicleResponse
from app.services.vehicle_service import create_vehicle, get_all_vehicle
from app.core.database import SessionLocal
from typing import List

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()

@router.post("/", response_model= VehicleResponse)
def add_vehicle(vehicle: VehicleCreate, db: Session = Depends(get_db)):
    return create_vehicle(db, vehicle)

@router.get("/", response_model = List[VehicleResponse])
def list_vehicles(db: Session = Depends(get_db)):
    return get_all_vehicle(db)