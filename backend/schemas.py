from pydantic import BaseModel, EmailStr, field_validator
from typing import Literal


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        if '@' not in v or '.' not in v:
            raise ValueError('Invalid email format')
        return v.lower().strip()

    @field_validator('password')
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters')
        return v

    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        if len(v.strip()) < 2:
            raise ValueError('Name must be at least 2 characters')
        return v.strip()


class LoginRequest(BaseModel):
    email: str
    password: str

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        return v.lower().strip()


class RefreshRequest(BaseModel):
    refresh_token: str


class EstimateRequest(BaseModel):
    surface: float
    renovation_type: Literal['full', 'partial', 'minimal']
    quality: Literal['high', 'medium', 'economy']
    bathrooms: int
    floor: Literal['ground', 'intermediate', 'top']
    energy_upgrade: bool

    @field_validator('surface')
    @classmethod
    def validate_surface(cls, v: float) -> float:
        if v <= 0:
            raise ValueError('Surface must be greater than 0')
        if v > 10000:
            raise ValueError('Surface seems too large')
        return v

    @field_validator('bathrooms')
    @classmethod
    def validate_bathrooms(cls, v: int) -> int:
        if v < 0:
            raise ValueError('Bathrooms cannot be negative')
        if v > 20:
            raise ValueError('Too many bathrooms')
        return v
