from functools import wraps
from datetime import datetime, timedelta
import jwt
from flask import request, jsonify, current_app


def create_access_token(user_id: int) -> str:
    """Create a new access token."""
    payload = {
        'user_id': user_id,
        'type': 'access',
        'exp': datetime.utcnow() + timedelta(seconds=current_app.config['JWT_ACCESS_TOKEN_EXPIRES']),
        'iat': datetime.utcnow()
    }
    return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')


def create_refresh_token(user_id: int) -> str:
    """Create a new refresh token."""
    payload = {
        'user_id': user_id,
        'type': 'refresh',
        'exp': datetime.utcnow() + timedelta(seconds=current_app.config['JWT_REFRESH_TOKEN_EXPIRES']),
        'iat': datetime.utcnow()
    }
    return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')


def decode_token(token: str) -> dict | None:
    """Decode and validate a JWT token."""
    try:
        payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def jwt_required(f):
    """Decorator to protect routes that require authentication."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return jsonify({'error': 'Missing authorization header'}), 401
        
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return jsonify({'error': 'Invalid authorization header format'}), 401
        
        token = parts[1]
        payload = decode_token(token)
        
        if not payload:
            return jsonify({'error': 'Invalid or expired token'}), 401
        
        if payload.get('type') != 'access':
            return jsonify({'error': 'Invalid token type'}), 401
        
        # Add user_id to request context
        request.user_id = payload['user_id']
        
        return f(*args, **kwargs)
    
    return decorated_function
