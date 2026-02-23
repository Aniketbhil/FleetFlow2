from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship

from app.core.database import Base

class Trip(Base):
    __tablename__ = "trips"

    id= Column(Integer, primary_key=True, index=True)

    vehicle_id= Column(Integer, ForeignKey("vehicle.id"))
    driver_id= Column(Integer, ForeignKey("drivers.id"))

    cargo_weight= Column(Float)
    start_odometer= Column(Float)
    end_odometer= Column(Float)
    
    status= Column(String, default="Draft")

    vehicle= relationship("Vehicle")
    drivers= relationship("Driver")