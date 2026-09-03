# SIH — NHAA Trauma Assessment System

A full-stack web application split into separate **frontend** and **backend** packages.

## Project Structure

```
SIH/
├── frontend/      ← React 19 + Vite + Tailwind CSS
└── backend/       ← Express 5 + MongoDB + MySQL + JWT
```

---

## Getting Started

### 1. Setup Backend

```bash
cd backend
npm install
# Copy .env.example to .env and fill in your credentials
cp .env.example .env
npm start          # production
# or
npm run dev        # development (auto-restart on file change)
```

The backend runs on **http://localhost:5000**

### 2. Setup Frontend

```bash
cd frontend
npm install
# Copy .env.example to .env
cp .env.example .env
npm run dev        # development server
npm run build      # production build
```

The frontend dev server runs on **http://localhost:5173**

---

## Environment Variables

### `backend/.env`
| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `PORT` | Server port (default: 5000) |
| `JWT_SECRET` | Secret key for JWT tokens |
| `MYSQL_HOST` | MySQL host (optional) |
| `MYSQL_USER` | MySQL user (optional) |
| `MYSQL_PASSWORD` | MySQL password (optional) |
| `MYSQL_DATABASE` | MySQL database name (optional) |

### `frontend/.env`
| Variable | Description |
|---|---|
| `VITE_API_URL` | URL of the backend API (default: http://localhost:5000/api) |
