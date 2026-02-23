from sqlalchemy import Column, Integer, String, Float

from app.core.database import Base

class Vehicle(Base):
    __tablename__ = "vehicle"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    plate_number = Column(String, unique=True, index=True)
    max_capacity = Column(Float)
    odometer= Column(Float)
    status = Column(String, default="Available")