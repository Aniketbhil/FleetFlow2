from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas.driver import DriverCreate, DriverResponse
from app.services.driver_service import create_driver, get_all_drivers, update_driver_status, is_license_valid
from app.core.database import SessionLocal

router = APIRouter(prefix="/drivers", tags=["Drivers"])

def get_db():
    db = SessionLocal()
    try:
        yield db 
    finally:
        db.close()

@router.post("/", response_model=DriverResponse)
def add_driver(driver: DriverCreate, db: Session = Depends(get_db)):
    return create_driver(db, driver)

@router.get("/", response_model=List[DriverResponse])
def list_drivers(db: Session = Depends(get_db)):
    return get_all_drivers(db)

@router.patch("/{driver_id}/status", response_model=DriverResponse)
def change_status(driver_id: int, status: str, db: Session = Depends(get_db)):
    return update_driver_status(db, driver_id, status)

