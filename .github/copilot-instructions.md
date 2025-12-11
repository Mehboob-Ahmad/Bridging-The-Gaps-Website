<!-- Copilot / AI agent guidance for the Bridging-The-Gaps codebase -->
# Quick Agent Instructions

This repository contains a small Express backend scaffold, a Next.js frontend snapshot, static HTML fallbacks, and PHP copies used for different deploy targets. The goal of these instructions is to help an AI coding agent become productive quickly and avoid guessing project intent.

- **Backend:** `server.js` — lightweight Express API (endpoints: `POST /api/signup`, `POST /api/login`, `GET /api/me`, `GET /health`). Uses MySQL (`mysql2`) and file uploads in `uploads/` (Multer, field name `avatar`). Schema is in `db.sql` and is applied at startup if present.
- **Frontend (modern):** `nextjs/` — Next.js app (dev port `3001` by default). Use `nextjs/package.json` scripts to run/build. There are older/static frontends (root `INDEX.html`, `login.html`, etc.) — prefer `nextjs/` for active development.
- **Alternate stack:** `php/` contains PHP pages and APIs which mirror some endpoints; these are snapshots for hosting environments that do not support Node.

Environment and runtime hints
- Environment variables commonly used:
  - `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASS`, `MYSQL_DB`, `MYSQL_PORT`
  - `JWT_SECRET` (default `dev-secret-change-me` in code) — used to sign tokens
  - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_FROM` — optional nodemailer config
  - `PORT` — Express server port (default `3000`)
- The Express app will create `data/` and `uploads/` if missing. Uploaded avatars are served from `/uploads` static route.

Patterns & conventions to follow
- Authentication: JWT bearer tokens returned on signup/login with 7-day expiry. Look for token handling in `server.js` (verify with `jwt.verify`).
- Database access: helper functions `dbRun`, `dbGet`, `dbAll` wrap `mysql2/promise` queries in `server.js` — follow the same simple parameterized-query style.
- File uploads: Multer stores files to `uploads/` and route expects `avatar` in multipart form. New filenames are timestamp + UUID.
- Email: `sendNotificationEmails` in `server.js` is a best-effort path; avoid assuming mail will be sent on every run (SMTP optional).

Developer workflows (how to run and test locally)
- Run backend (Express) in PowerShell:
  ```powershell
  $env:JWT_SECRET = 'dev-secret'; $env:MYSQL_DB='bridging_the_gaps'; node server.js
  ```
- Run Next.js frontend (from `nextjs/`) in PowerShell:
  ```powershell
  cd nextjs; npm install; npm run dev
  ```
- If you change DB schema, edit `db.sql` at repo root; `server.js` attempts to apply it at startup.

Examples to reference when making changes
- Creating users: see `server.js` POST `/api/signup` — it normalizes email, hashes with `bcrypt`, inserts fields `(id,name,email,password_hash,avatar,created_at)`.
- Authentication: see POST `/api/login` and GET `/api/me` for expected token header format: `Authorization: Bearer <token>`.

What to avoid or verify
- Do not remove or rename `uploads/` or the `/uploads` static route without updating any code that references `avatar` URLs.
- There are multiple implementations (static HTML, Next.js, PHP). When adding features, prefer updating `nextjs/` and coordinating API changes in `server.js`; keep legacy static/PHP copies only for historical/deploy snapshots unless the user asks otherwise.

Where to look first (file pointers)
- `server.js` — primary backend logic and the most important single-file reference for APIs, env vars, DB patterns.
- `db.sql` — canonical schema used by the Node app at startup.
- `nextjs/` — modern frontend; `nextjs/package.json` scripts control dev/build/start.
- `php/` — alternative server-side implementation; useful for compatibility checks.

If something is unclear
- Ask: "Do you want changes applied to the Next.js frontend (`nextjs/`) or to the legacy static/PHP variants?" — this repo contains multiple copies and altering the wrong one causes confusion.

Feedback request: Please tell me which area you want me to prioritize (API, Next.js UI, or PHP/static pages) and I will adapt these instructions further.
