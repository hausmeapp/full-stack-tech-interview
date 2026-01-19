# HausMe Technical Interview

A simplified HausMe-like application with local JWT authentication, PostgreSQL database, and a basic renovation cost calculator.

---

## 📋 Interview Tasks

### Task 1: Algorithmic Exercise (~15min) — ⚠️ *NO AI Allowed*

Implement a function to format renovation estimate summaries for display.

**Task:** Given an estimate breakdown dictionary, return a formatted summary string with European currency formatting.

**Function signature:**
```python
def format_estimate_summary(estimate: dict) -> str:
```

**Input example:**
```python
{
    "total_cost": 143500,
    "base_cost": 114400,
    "bathroom_cost": 10500,
    "energy_upgrade_cost": 18750,
    "labor_cost": 71750,
    "material_cost": 71750
}
```

**Output example:**
```
"TOTAL: €143.500,00 | Base: €114.400,00 | Bathrooms: €10.500,00 | Energy: €18.750,00"
```

**Rules:**
1. Format numbers in European style (€XX.XXX,XX with dot as thousands separator, comma for decimals)
2. Only include non-zero costs in the output
3. Order: Total first, then other costs alphabetically by key name
4. Key names should be Title Case without "_cost" suffix
5. If energy_upgrade_cost is 0, omit it from the output



---

### Task 2: Web Application (~60min) — *AI Allowed*

#### Part A: Renovation Calculator Form (~30min)

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

#### Part B: Time Estimate Feature (~30min)

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
