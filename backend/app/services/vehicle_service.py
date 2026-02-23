from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.vehicle import Vehicle

def create_vehicle(db: Session, data):
    existing = db.query(Vehicle).filter(Vehicle.plate_number == data.plate_number).first()
    if existing:
        raise HTTPException(status_code=400, detail="Plate number already exists")
    
    vehicle = Vehicle(
        name= data.name,
        plate_number= data.plate_number,
        max_capacity=data.max_capacity,
        odometer=data.odometer,
        status="Available"
    )

    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)

    return vehicle

def get_all_vehicle(db: Session):
    return db.query(Vehicle).all()