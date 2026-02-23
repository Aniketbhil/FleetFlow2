from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserLogin, Token
from app.services.auth_service import register_user, login_user
from app.core.database import SessionLocal

router = APIRouter(prefix="/auth", tags=["Authentication"])


# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    new_user = register_user(db, user.email, user.password, user.role)

    return {
        "id": new_user.id,
        "email": new_user.email,
        "role": new_user.role
    }


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    token = login_user(db, user.email, user.password)

    return {
        "access_token": token,
        "token_type": "bearer"
    }