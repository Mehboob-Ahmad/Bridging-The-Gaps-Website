BRIDGING THE GAPS — Backend scaffold

This is a minimal Express backend used for demo authentication and email notifications.

Quick start (local):

1. Copy .env.example to .env and set `SMTP_*` and `JWT_SECRET` if you want real emails.

2. Install dependencies:

   npm install

3. Start the server:

   npm run start

The server exposes:
- POST /api/signup  (multipart/form-data) fields: name, email, password, avatar
- POST /api/login   (application/json) body: { email, password }
- GET  /api/me      (requires Authorization: Bearer <token>)

Uploaded avatars are stored in /uploads and users are persisted in a MySQL database (configured via the environment variables in `.env`).

If you prefer to pre-create the database schema manually, use the provided `db.sql` (MySQL-compatible) to initialize the database. The server will attempt to apply the schema on startup if `db.sql` exists.

Notes:
- This is a demo scaffold. For production, use a managed database, strong secrets, HTTPS, input validation, rate limiting, and hardened email handling.
