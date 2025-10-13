# GYCcom – Personal Site (Next.js + Spring Boot)

A monorepo housing a Next.js 15 frontend and a Spring Boot backend. The site showcases portfolio content, a responsive homepage with a bouncing CTA, a WeChat QR modal, and a simple articles API.

- Repository root: `/Users/gyc/Desktop/study/GYCcom`
- MVP deployed: 2025-10-11

## Table of Contents
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Production Build](#production-build)
- [Deployment](#deployment)
- [Key Paths](#key-paths)
- [APIs and Documentation](#apis-and-documentation)
- [Common Commands](#common-commands)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Project Structure
```text
GYCcom/
├─ backend/                     # Spring Boot backend
│  ├─ src/main/java/com/...     # Java sources
│  ├─ src/main/resources/       # application-*.yml, templates, static
│  ├─ run-dev.sh                # Local dev runner (PostgreSQL)
│  ├─ run-prod.sh               # Prod runner (Supabase)
│  ├─ env.example               # Example .env for prod
│  ├─ SUPABASE_DEPLOYMENT.md    # Backend deployment notes
│  └─ LIKE_FEATURE_README.md    # Like feature design
├─ frontend/                    # Next.js 15 frontend
│  ├─ public/                   # Static assets (incl. wechatqrcode.jpg)
│  ├─ src/app/page.tsx          # Homepage (CTA bounce, WeChat modal)
│  ├─ src/app/history/page.tsx  # History page (single milestone)
│  ├─ src/hooks/useResponsiveLayout.ts
│  ├─ src/utils/axios.ts        # Axios instance (reads NEXT_PUBLIC_API_URL)
│  └─ FRONTEND_LIKE_FEATURE_README.md
├─ docs/
│  └─ Article API.md            # Articles API documentation
└─ README.md
```

## Tech Stack
- Frontend: Next.js 15, React 19, Tailwind CSS 4, TypeScript
- Backend: Spring Boot (Java 17+), Maven, PostgreSQL/Supabase
- Infra: Vercel (frontend), Render/Any JVM host (backend)

## Environment Variables

### Frontend
- `NEXT_PUBLIC_API_URL` (default: `http://localhost:8080`)

### Backend
Copy `backend/env.example` to `backend/.env` for production and set:
- `SUPABASE_DB_URL`
- `SUPABASE_DB_USERNAME`
- `SUPABASE_DB_PASSWORD`

Local dev uses `application-dev.yml` (can override with `LOCAL_DB_*` variables).

## Local Development

### Prerequisites
- Node 18+ (20+ recommended), npm 9+
- Java 17+, Maven 3.9+
- PostgreSQL 14+ (local dev)

### Start Backend (dev profile)
```bash
cd backend
bash run-dev.sh
# API: http://localhost:8080
```

### Start Frontend
```bash
cd frontend
npm ci
# If backend runs on a non-default URL/port:
export NEXT_PUBLIC_API_URL="http://localhost:8080"
npm run dev
# App: http://localhost:3000
```

## Production Build

### Frontend (local prod)
```bash
cd frontend
npm ci
npm run build
npm run start
```

### Backend (prod profile with Supabase)
```bash
cd backend
# 1) create .env from env.example and fill SUPABASE_* values
bash run-prod.sh
```

## Deployment

### Frontend → Vercel
```bash
cd frontend
# (optional) set API base URL for frontend
vercel env add NEXT_PUBLIC_API_URL
vercel
# verify preview
vercel --prod
```

### Backend → Render (or any JVM host)
- Build & run locally with `run-prod.sh` to validate `.env`.
- On Render Web Service, set env vars:
  - `SUPABASE_DB_URL`, `SUPABASE_DB_USERNAME`, `SUPABASE_DB_PASSWORD`
  - `SPRING_PROFILES_ACTIVE=prod`, `SERVER_PORT=8080`
- Or use `backend/Dockerfile` on your platform.

## Key Paths
- Homepage CTA + WeChat modal: `frontend/src/app/page.tsx`
- History milestone (MVP on 2025-10-11): `frontend/src/app/history/page.tsx`
- Responsive layout hook: `frontend/src/hooks/useResponsiveLayout.ts`
- API base URL (frontend): `frontend/src/utils/axios.ts`
- Backend env template: `backend/env.example`
- Backend scripts: `backend/run-dev.sh`, `backend/run-prod.sh`
- WeChat QR image: `frontend/public/wechatqrcode.jpg`

## APIs and Documentation
- Articles API reference: `docs/Article API.md`
- IMPORTANT: If you change any API (input schema, response schema, URL, or method), update the corresponding docs under `docs/` (module-named `API.md`) to keep mock/testing documentation in sync.

## Common Commands

### Frontend
```bash
cd frontend
npm run lint
npm run build
npm run start
```

### Backend
```bash
cd backend
mvn clean package -DskipTests
java -jar target/backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

## Troubleshooting
- Frontend cannot reach backend: ensure `NEXT_PUBLIC_API_URL` points to a reachable backend (CORS/network).
- DB connection errors in prod: verify all `SUPABASE_*` variables on the server.
- TypeScript ref type errors: prefer `React.MutableRefObject<HTMLElement | null>` for `useRef`.

## License
Personal project. All rights reserved.
