from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.schemas.trip import TripCreate, TripResponse, TripComplete
from app.services.trip_service import create_trip, complete_trip
from app.core.database import SessionLocal
from app.models.trip import Trip

router = APIRouter(prefix="/trips", tags=["Trips"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=TripResponse)
def dispatch_trip(data: TripCreate, db: Session = Depends(get_db)):
    return create_trip(db, data)


@router.patch("/{trip_id}/complete", response_model=TripResponse)
def finish_trip(trip_id: int, data: TripComplete, db: Session = Depends(get_db)):
    return complete_trip(db, trip_id, data.end_odometer)


@router.get("/", response_model=List[TripResponse])
def list_trips(db: Session = Depends(get_db)):
    return db.query(Trip).all()