"""
Seed script to populate the database with initial data.
Run with: docker compose exec backend python seed.py
"""
import sys
from app import create_app
from models import db, User


def seed_database():
    app = create_app()
    
    with app.app_context():
        # Check if test user already exists
        existing_user = User.query.filter_by(email='test@hausme.it').first()
        
        if existing_user:
            print('Test user already exists. Skipping seed.')
            return
        
        # Create test user
        user = User(
            email='test@hausme.it',
            name='Test User'
        )
        user.set_password('password123')
        
        db.session.add(user)
        db.session.commit()
        
        print('✅ Database seeded successfully!')
        print(f'   - Created user: {user.email}')
        print(f'   - Password: password123')


if __name__ == '__main__':
    seed_database()
