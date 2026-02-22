from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate, UserLogin, Token
from app.services.auth_service import register_user, login_user
from app.core.database import SessionLocal

router = APIRouter(prefix="/auth")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, user.email, user.password, user.role)

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    token = login_user(db, user.email, user.password)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": token, "token_type": "bearer"}