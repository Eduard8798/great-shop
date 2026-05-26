# Great Shop — Frontend

Next.js 16 (App Router, React 19) frontend for the Great Shop project.
Talks to a separate Django REST backend via a thin BFF (Backend-for-Frontend) proxy
under `/api/auth/*`. JWT tokens never reach the browser JS — they are stored as
`httpOnly` cookies set by Next route handlers.

---

## Stack

- Next.js 16.1 (Turbopack, App Router)
- React 19
- TypeScript, SCSS Modules, Tailwind 4
- Auth: JWT (SimpleJWT) via httpOnly cookies, hybrid auto-refresh

---

## Prerequisites

| Tool | Required | Tested with | Notes |
| --- | --- | --- | --- |
| **Node.js** | `>=20.9.0` (Next 16) | `v24.15.0` | A `.nvmrc` is committed — run `nvm use` in the repo root. |
| **npm** | bundled with Node | `11.12.1` | `pnpm` / `yarn` should work too but aren't tested. |
| **Docker** | for the backend | Docker `29.5.2`, Compose `5.1.4` | See Colima setup below for macOS. |

### Node via nvm

```bash
nvm install 24.15.0   # or: nvm install --lts
nvm use               # picks up .nvmrc
node --version        # → v24.15.0 (or whatever .nvmrc says)
```

If `node --version` shows v16/v18, the dev server will refuse to start with
`For Next.js, Node.js version ">=20.9.0" is required.`

### Docker via Colima (macOS, free, no GUI)

```bash
brew install colima docker docker-compose
mkdir -p ~/.docker
echo '{"cliPluginsExtraDirs":["/opt/homebrew/lib/docker/cli-plugins"]}' > ~/.docker/config.json
colima start --cpu 2 --memory 4 --disk 30
```

Alternatives: Docker Desktop, OrbStack, Rancher Desktop — any one that gives you
a working `docker` CLI + `docker compose` plugin will do.

---

## Repository layout

The frontend and backend live in **separate repositories**. Expected directory layout
on your machine:

```
~/your-workspace/
├── great-shop/          ← this repo (frontend)
└── api_shop-dev/        ← backend repo, cloned separately, NOT committed here
```

The frontend default expects the backend on `http://localhost:8080/api` — that's the
port the backend's `docker-compose.yml` exposes.

---

## First-time setup

### 1. Clone the backend repo next to this one

```bash
cd ..
git clone <backend-repo-url> api_shop-dev
cd api_shop-dev
```

Create `api_shop-dev/.env` (the backend repo's README has the full list; minimum needed):

```env
SECRET=django-insecure-CHANGE-ME
ALGORITHM=HS256

SUPER_LOGIN=a@a.net
SUPER_PASSWORD=a

DB_ENGINE=django.db.backends.postgresql
DB_NAME=shop
DB_USER=shop_user
DB_PASSWORD=shop_pass
DB_HOST=db
DB_PORT=5432

MAX_PASSWORD_RESET_ATTEMPTS=3
MAX_REFRESH_ATTEMPTS=5
PASSWORD_RESET_TIMEOUT_HR=24
REFRESH_TOKEN_TIMEOUT=24

EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=mailpit
EMAIL_PORT=1025
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
EMAIL_USE_TLS=False
EMAIL_USE_SSL=False
DEFAULT_FROM_EMAIL=no-reply@kinoshort.local
```

### 2. Frontend env

In this (`great-shop`) repo, create `.env.local`:

```env
DJANGO_API_URL=http://localhost:8080/api
```

### 3. Install frontend deps

```bash
npm install
```

---

## Running the project (everyday)

Open two terminals.

**Terminal 1 — backend:**
```bash
cd ../api_shop-dev
docker compose up        # first time: add --build
```
Wait for `Starting development server at http://0.0.0.0:8000/`.

**Terminal 2 — frontend:**
```bash
cd great-shop
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Default test credentials

| Field | Value |
| --- | --- |
| Email | `a@a.net` |
| Password | `a` |

---

## Useful URLs

| Service | URL |
| --- | --- |
| Frontend | http://localhost:3000 |
| Login page | http://localhost:3000/login |
| Backend API | http://localhost:8080/api |
| Swagger UI | http://localhost:8080/api/schema/swagger-ui/ |
| Django admin | http://localhost:8080/admin/ |
| Mailpit (dev mail) | http://localhost:8025 |

---

## How auth works

1. User submits the login form → `POST /api/auth/login` (Next route handler).
2. The route proxies to the backend's `POST /api/login/`, then stores `access` and
   `refresh` JWTs in **`httpOnly` cookies** (`gs_access`, `gs_refresh`).
3. Client-side state lives in `AuthProvider` ([src/shared/auth/AuthProvider.tsx](src/shared/auth/AuthProvider.tsx))
   — it only tracks `user` and `status`, never the raw tokens.
4. Auto-refresh is **hybrid**:
   - **Proactive**: a `setTimeout` fires ~2 min before access expiry, but only if the tab is visible.
   - **Reactive**: any `apiFetch()` call that returns `401` triggers a single refresh, then retries.
   - A 5-minute floor between refreshes avoids hitting the backend's `MAX_REFRESH_ATTEMPTS=5` per refresh-token lifetime.
5. The backend rotates refresh tokens on every refresh (old one is blacklisted).
   The Next refresh route re-stores the new pair.
6. [src/proxy.ts](src/proxy.ts) (Next 16 proxy / middleware) guards `/profile/*` —
   no auth cookie → redirect to `/login?next=…`.

---

## Project structure (auth-related)

```
src/
├── app/
│   ├── api/auth/
│   │   ├── login/route.ts      ← POST → backend /api/login/
│   │   ├── refresh/route.ts    ← POST → backend /api/token/refresh/
│   │   ├── logout/route.ts     ← clears cookies
│   │   └── me/route.ts         ← GET  → backend /api/users/current-user/
│   └── layout.tsx              ← wraps app in <AuthProvider>
├── features/auth/ui/LoginForm/ ← form, calls useAuth().login()
├── shared/
│   ├── api/
│   │   ├── server.ts           ← server-only djangoFetch + UpstreamUnreachableError
│   │   └── fetcher.ts          ← client-side apiFetch with 401-retry + dedupe
│   └── auth/
│       ├── AuthProvider.tsx    ← React context, hybrid refresh timer
│       ├── tokens.ts           ← server-only cookie helpers
│       └── types.ts
└── proxy.ts                    ← route protection (Next 16 proxy)
```

---

## Troubleshooting

- **`fetch failed` / `ECONNREFUSED` on login** → backend not running. Start `docker compose up` in `../api_shop-dev`.
- **Login returns 503 "Authentication service is unavailable"** → same as above (handled gracefully now).
- **`Too many refresh attempts`** → you hit the `MAX_REFRESH_ATTEMPTS` cap on the backend. Restart the backend (`docker compose restart web`) to clear the in-memory cache, or wait 24h.
- **Node version error** → use Node ≥ 20.9. With nvm: `nvm install --lts && nvm use --lts`.
- **`middleware` deprecation warning** — Next 16 renamed `middleware.ts` to `proxy.ts`. We already use the new name.

---

## Scripts

```bash
npm run dev       # Next dev server (Turbopack)
npm run build     # production build
npm run start     # serve production build
npm run lint      # ESLint
```
