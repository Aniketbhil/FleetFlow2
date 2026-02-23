from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import date

from app.models.driver import Driver

def create_driver(db: Session, data):
    driver = Driver(
        name=data.name,
        license_expiry=data.license_expiry,
        status="On Duty",
        safety_score=100.0,
    )

    db.add(driver)
    db.commit()
    db.refresh(driver)

    return driver

def get_all_drivers(db: Session, ):
    return db.query(Driver).all()

def update_driver_status(db: Session, driver_id: int, new_status: str):
    driver = db.query(Driver).filter(Driver.id == driver_id).first()

    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    
    driver.status = new_status
    db.commit()
    db.refresh(driver)

    return driver

def is_license_valid(driver: Driver):
    return driver.license_expiry >= date.today()