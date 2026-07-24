# Atra

Cognitive laboratory website for system dynamics, strategic foresight, and structural redesign.

**Stack:** TypeScript (React + Vite) frontend · Go (Chi) API

## Quick start

### 1. API (Go)

```bash
cd server
go run ./cmd/atra
```

API listens on `http://localhost:8080`.

### 2. Frontend (TypeScript)

```bash
cd web
npm install
npm run dev
```

App runs on `http://localhost:5174` and proxies `/api` to the Go server.

### Production

```bash
cd web && npm run build
cd ../server && ATRA_STATIC=../web/dist go run ./cmd/atra
```

Then open `http://localhost:8080`.

## API

| Endpoint | Description |
|---|---|
| `GET /api/health` | Health check |
| `GET /api/meta` | Brand, pillars, manifesto |
| `GET /api/pages/philosophy` | Philosophy & identity |
| `GET /api/pages/methodology` | Research framework |
| `GET /api/pages/whitepaper` | Architecture of Reality whitepaper |

## Languages

English and Persian (فارسی), with RTL support.

- Switcher: `EN | فا` in the header (preference saved in `localStorage`)
- API: `GET /api/meta?lang=fa` · `GET /api/pages/philosophy?lang=fa`

- `/` — Hero, ecosystem, manifesto
- `/philosophy` — Who we are & core philosophy
- `/methodology` — Structural research framework
- `/whitepaper` — Methodology whitepaper

@atra_futures
