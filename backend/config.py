import os


class Config:
    SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'dev-secret-key')
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DB_URL',
        'postgresql://hausme:hausme_secret@localhost:5432/hausme_interview'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour
    JWT_REFRESH_TOKEN_EXPIRES = 86400 * 7  # 7 days
