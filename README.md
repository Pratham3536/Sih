# NHAA 14566 AI Assessment Platform

An AI-powered trauma evaluation & social vulnerability assessment system featuring an MVC Express backend gateway and a high-performance React + Vite frontend.

---

## 📁 Project Structure

```
sih/
├── backend/                      # Express.js + Mongoose MVC Backend Gateway
│   ├── config/                   # MongoDB & DB Connection setup
│   ├── controllers/              # MVC Route Controllers (Auth, Cases, Analytics, System)
│   ├── middlewares/              # JWT Auth, Logger, Error Handler
│   ├── models/                   # Mongoose Schemas (User, Case, Assessment)
│   ├── routes/                   # API Routers (/api/v1/...)
│   ├── utils/                    # Seed scripts & helpers
│   ├── server.js                 # Backend Server Entry point
│   ├── package.json              # Backend Dependencies
│   └── .env                      # Backend Environment Config
│
├── frontend/                     # React 19 + Vite + TailwindCSS 4 Application
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/           # UI Components (Gauges, Cards, Navbar)
│   │   ├── context/              # CaseContext & App State
│   │   ├── data/                 # Mock & Fallback Datasets
│   │   ├── pages/                # Views (Dashboard, Intake, Cases, Analytics)
│   │   ├── services/             # API Client, NLP & Speech engines
│   │   ├── App.jsx               # Main React Application
│   │   └── main.jsx              # React DOM Entry point
│   ├── index.html                # HTML entry point
│   ├── vite.config.js            # Vite configuration
│   ├── package.json              # Frontend Dependencies
│   └── .env                      # Frontend Environment Config (VITE_API_URL)
│
├── package.json                  # Root Monorepo Orchestration Scripts
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies
Run from the project root:
```bash
npm run install:all
```
*(Or install inside `frontend/` and `backend/` independently using `npm install`)*

---

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/nhaa_db
JWT_SECRET=sih2026_nhaa_trauma_secure_jwt_token_88492019
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

---

### 3. Run Development Servers

- **Run Both Frontend & Backend Concurrently:**
  ```bash
  npm run dev
  ```

- **Run Frontend Only:**
  ```bash
  npm run dev:frontend
  # Or: cd frontend && npm run dev
  ```
  App opens at `http://localhost:5173`

- **Run Backend Only:**
  ```bash
  npm run dev:backend
  # Or: cd backend && npm run dev
  ```
  API Gateway runs at `http://localhost:5000/api`

---

### 4. Build Frontend for Production
```bash
npm run build:frontend
```
