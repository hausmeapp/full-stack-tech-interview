# HausMe Technical Interview

A simplified HausMe-like application with local JWT authentication, PostgreSQL database, and a basic renovation cost calculator.

---

## 📋 Interview Tasks

### Task 1: Renovation Calculator Form (~30min)

Implement the renovation cost calculator form split across two pages:

**Page 1** (`/calculator`) - Property Details:
| Field | Type | Validation |
|-------|------|------------|
| `surface` | number input | 1-10000 m² |
| `floor` | select | ground / intermediate / top |
| `bathrooms` | number input | 0-20 |

**Page 2** (`/calculator/step2`) - Renovation Options:
| Field | Type | Validation |
|-------|------|------------|
| `renovation_type` | select | full / partial / minimal |
| `quality` | select | high / medium / economy |
| `energy_upgrade` | checkbox | boolean |

**Requirements:**
- Pass data from step 1 to step 2 (localStorage, context, or query params)
- Call `POST /api/calculate/estimate` with all 6 fields
- Include `Authorization: Bearer <token>` header
- Display the cost breakdown returned by the API

---

### Task 2: Time Estimate Extension (~45min)

Extend the calculator to estimate renovation duration.

**Formula documentation:** See `docs/time-estimate.md`

**Backend** (`backend/calculator.py`):
- Add `estimated_days` field to the response
- Formula: `estimated_days = labor_cost / DAILY_TEAM_COST`
- Use `DAILY_TEAM_COST = 800` (€/day for a standard team)

**Frontend** (`frontend/app/calculator/step2/page.tsx`):
- Display the time estimate in the results panel

---

## Quick Start

### Prerequisites
- Docker & Docker Compose

### Run the Application

```bash
# Start all services
docker compose up --build

# In a separate terminal, seed the database
docker compose exec backend python seed.py
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Test Credentials
- Email: `test@hausme.it`
- Password: `password123`

## Architecture

### Services
- **PostgreSQL** (port 5432): Database with `hausme_interview` schema
- **Flask Backend** (port 5000): REST API with JWT authentication
- **Next.js Frontend** (port 3000): React application with NextAuth

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get tokens
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user (protected)

#### Calculator
- `POST /api/calculate/estimate` - Calculate renovation cost (protected)

### Calculator Formula

```
total = (surface × 1430 × type_mult × quality_mult × floor_mult) 
        + (bathrooms × 3500) 
        + (energy_upgrade ? total × 0.15 : 0)
```

**Multipliers:**
- Renovation Type: full=1.0, partial=0.75, minimal=0.5
- Quality: high=1.0, medium=0.8, economy=0.5
- Floor: ground=1.0, intermediate=0.95, top=1.1

## Development

### Local Development (without Docker)

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL=postgresql://hausme:hausme_secret@localhost:5432/hausme_interview
python app.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

**Backend:**
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET_KEY`: Secret key for JWT tokens

**Frontend:**
- `NEXTAUTH_URL`: Application URL
- `NEXTAUTH_SECRET`: NextAuth secret
- `NEXT_PUBLIC_API_URL`: Backend API URL (client-side)
- `API_URL`: Backend API URL (server-side)

## Project Structure

```
full-stack-tech-interview/
├── docker-compose.yaml
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── app.py           # Flask application
│   ├── config.py        # Configuration
│   ├── models.py        # SQLAlchemy models
│   ├── auth.py          # JWT authentication
│   ├── schemas.py       # Pydantic schemas
│   ├── calculator.py    # Cost calculation logic
│   └── seed.py          # Database seed script
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── auth.ts          # NextAuth configuration
    ├── middleware.ts    # Route protection
    └── app/
        ├── layout.tsx
        ├── page.tsx
        ├── auth/
        │   ├── login/page.tsx
        │   └── register/page.tsx
        ├── dashboard/page.tsx
        └── calculator/
            ├── page.tsx      # Step 1: Property details
            └── step2/
                └── page.tsx  # Step 2: Renovation options + results
```
