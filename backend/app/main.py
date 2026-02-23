from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth
from app.core.database import engine, Base
from app.core.config import settings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGIN,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)