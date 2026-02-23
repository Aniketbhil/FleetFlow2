from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import date
import asyncio

from app.websocket.manager import manager
from app.models.trip import Trip
from app.models.vehicle import Vehicle
from app.models.driver import Driver


def create_trip(db: Session, data):
    vehicle = db.query(Vehicle).filter(Vehicle.id == data.vehicle_id).first()
    driver = db.query(Driver).filter(Driver.id == data.driver_id).first()

    if not vehicle or not driver:
        raise HTTPException(status_code=404, detail="Vehicle or Driver not found")

    # Validation 1: Vehicle status
    if vehicle.status != "Available":
        raise HTTPException(status_code=400, detail="Vehicle not available")

    # Validation 2: Driver status
    if driver.status != "On Duty":
        raise HTTPException(status_code=400, detail="Driver not available")

    # Validation 3: License expiry
    if driver.license_expiry < date.today():
        raise HTTPException(status_code=400, detail="Driver license expired")

    # Validation 4: Capacity
    if data.cargo_weight > vehicle.max_capacity:
        raise HTTPException(status_code=400, detail="Cargo exceeds capacity")

    trip = Trip(
        vehicle_id=vehicle.id,
        driver_id=driver.id,
        cargo_weight=data.cargo_weight,
        start_odometer=vehicle.odometer,
        status="Dispatched"
    )

    # Update statuses
    vehicle.status = "On Trip"
    driver.status = "On Trip"

    db.add(trip)
    db.commit()
    asyncio.create_task(
        manager.broadcast({
            "event": "trip_dispatched",
            "trip_id": trip.id
        })
    )
    db.refresh(trip)

    return trip


def complete_trip(db: Session, trip_id: int, end_odometer: float):
    trip = db.query(Trip).filter(Trip.id == trip_id).first()

    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")

    if trip.status != "Dispatched":
        raise HTTPException(status_code=400, detail="Trip not active")

    vehicle = db.query(Vehicle).filter(Vehicle.id == trip.vehicle_id).first()
    driver = db.query(Driver).filter(Driver.id == trip.driver_id).first()

    trip.end_odometer = end_odometer
    trip.status = "Completed"

    vehicle.odometer = end_odometer
    vehicle.status = "Available"

    driver.status = "On Duty"

    db.commit()
    asyncio.create_task(
        manager.broadcast({
            "event": "trip_completed",
            "trip_id": trip.id
        })
    )
    db.refresh(trip)

    return trip