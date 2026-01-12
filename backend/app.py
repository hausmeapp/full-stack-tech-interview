from flask import Flask, request, jsonify
from flask_cors import CORS
from pydantic import ValidationError

from config import Config
from models import db, User
from auth import create_access_token, create_refresh_token, decode_token, jwt_required
from schemas import RegisterRequest, LoginRequest, RefreshRequest, EstimateRequest
from calculator import calculate_estimate


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({'status': 'healthy'}), 200

    # Auth routes
    @app.route('/api/auth/register', methods=['POST'])
    def register():
        try:
            data = RegisterRequest(**request.json)
        except ValidationError as e:
            return jsonify({'error': e.errors()[0]['msg']}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data.email).first():
            return jsonify({'error': 'Email already registered'}), 409
        
        # Create new user
        user = User(email=data.email, name=data.name)
        user.set_password(data.password)
        
        db.session.add(user)
        db.session.commit()
        
        # Generate tokens
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        
        return jsonify({
            'user': user.to_dict(),
            'access_token': access_token,
            'refresh_token': refresh_token
        }), 201

    @app.route('/api/auth/login', methods=['POST'])
    def login():
        try:
            data = LoginRequest(**request.json)
        except ValidationError as e:
            return jsonify({'error': e.errors()[0]['msg']}), 400
        
        # Find user
        user = User.query.filter_by(email=data.email).first()
        
        if not user or not user.check_password(data.password):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Generate tokens
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        
        return jsonify({
            'user': user.to_dict(),
            'access_token': access_token,
            'refresh_token': refresh_token
        }), 200

    @app.route('/api/auth/refresh', methods=['POST'])
    def refresh():
        try:
            data = RefreshRequest(**request.json)
        except ValidationError as e:
            return jsonify({'error': e.errors()[0]['msg']}), 400
        
        # Decode refresh token
        payload = decode_token(data.refresh_token)
        
        if not payload:
            return jsonify({'error': 'Invalid or expired refresh token'}), 401
        
        if payload.get('type') != 'refresh':
            return jsonify({'error': 'Invalid token type'}), 401
        
        user_id = payload['user_id']
        
        # Verify user still exists
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Generate new tokens
        access_token = create_access_token(user_id)
        refresh_token = create_refresh_token(user_id)
        
        return jsonify({
            'access_token': access_token,
            'refresh_token': refresh_token
        }), 200

    @app.route('/api/auth/me', methods=['GET'])
    @jwt_required
    def get_current_user():
        user = User.query.get(request.user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify({'user': user.to_dict()}), 200

    # Calculator routes
    @app.route('/api/calculate/estimate', methods=['POST'])
    @jwt_required
    def estimate():
        try:
            data = EstimateRequest(**request.json)
        except ValidationError as e:
            return jsonify({'error': e.errors()[0]['msg']}), 400
        
        result = calculate_estimate(
            surface=data.surface,
            renovation_type=data.renovation_type,
            quality=data.quality,
            bathrooms=data.bathrooms,
            floor=data.floor,
            energy_upgrade=data.energy_upgrade
        )
        
        return jsonify({
            'input': data.model_dump(),
            'breakdown': result
        }), 200

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
