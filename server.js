/*
Simple Express backend scaffold for BRIDGING THE GAPS
- POST /api/signup (multipart/form-data): name, email, password, optional avatar file
- POST /api/login (application/json): { email, password }
- GET  /api/me  : returns authenticated user (requires Authorization: Bearer <token>)

Storage: MySQL (configured via environment variables) and uploaded avatars in `uploads/`
Email: uses nodemailer + SMTP credentials from environment variables (see .env.example)
Security: passwords hashed with bcrypt, token issued with JWT (SECRET from env). This is a minimal demo - for production use a real DB and hardened security.
*/

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2/promise');

const DATA_DIR = path.join(__dirname, 'data');
// (MySQL used instead of a local DB file)
const UPLOADS_DIR = path.join(__dirname, 'uploads');

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'unsdg10@gmail.com';

// Ensure folders exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// Create MySQL pool using env vars
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASS || '',
  database: process.env.MYSQL_DB || 'bridging_the_gaps',
  port: Number(process.env.MYSQL_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});

// Initialize schema from db.sql (if present)
try {
  const schemaPath = path.join(__dirname, 'db.sql');
  if (fs.existsSync(schemaPath)) {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    (async () => {
      try {
        await pool.query(schema);
        console.log('Database schema ensured (MySQL).');
      } catch (e) { console.warn('Failed to apply schema:', e.message); }
    })();
  }
} catch (e) { console.warn('Schema initialization error:', e.message); }

async function dbRun(sql, params = []){
  const [res] = await pool.execute(sql, params);
  return res;
}
async function dbGet(sql, params = []){
  const [rows] = await pool.execute(sql, params);
  return rows && rows[0] ? rows[0] : null;
}
async function dbAll(sql, params = []){
  const [rows] = await pool.execute(sql, params);
  return rows;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(UPLOADS_DIR));

// Multer for avatars
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, UPLOADS_DIR); },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '';
    cb(null, Date.now() + '-' + uuidv4() + ext);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// Configure nodemailer transporter from env (if provided)
function makeTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true' || false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
  }
  return null;
}

const transporter = makeTransporter();

async function sendNotificationEmails(user) {
  const subject = `BRIDGING THE GAPS — New account created`;
  const body = `Hello ${user.name || user.email},\n\nYour account was created. If you didn't create it, contact admin at ${ADMIN_EMAIL}.\n\nRegards,\nBRIDGING THE GAPS`;

  // Try sending via nodemailer if configured
  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: `${user.email}, ${ADMIN_EMAIL}`,
        subject,
        text: body
      });
      console.log('Notification emails sent via SMTP');
    } catch (e) {
      console.warn('Failed to send SMTP emails:', e.message);
    }
  } else {
    console.log('SMTP not configured. To enable real emails set SMTP_HOST, SMTP_USER, SMTP_PASS in env.');
  }
}

// POST /api/signup
app.post('/api/signup', upload.single('avatar'), async (req, res) => {
  try {
    const { name = '', email = '', password = '' } = req.body;
    const normalized = (email || '').toLowerCase().trim();
    if (!normalized || !password) return res.status(400).json({ error: 'email and password required' });

    const existing = await dbGet('SELECT id FROM users WHERE email = ?', [normalized]);
    if (existing) return res.status(409).json({ error: 'User exists' });

    const hash = await bcrypt.hash(password, 10);
  const id = uuidv4();
  const createdAt = new Date().toISOString().slice(0,19).replace('T',' ');
    const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;

    await dbRun('INSERT INTO users (id,name,email,password_hash,avatar,created_at) VALUES (?,?,?,?,?,?)', [id, name || null, normalized, hash, avatarPath, createdAt]);

    const user = { id, name: name || null, email: normalized, avatar: avatarPath };

    // Send notification emails (if possible)
    sendNotificationEmails(user).catch(() => {});

    // Issue JWT
    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    // Respond with user-safe object
    res.json({ token, user });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

// POST /api/login
app.post('/api/login', async (req, res) => {
  try {
    const { email = '', password = '' } = req.body;
    const normalized = (email || '').toLowerCase().trim();
    const userRow = await dbGet('SELECT * FROM users WHERE email = ?', [normalized]);
    if (!userRow) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, userRow.password_hash || '');
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ sub: userRow.id, email: userRow.email }, JWT_SECRET, { expiresIn: '7d' });
    const user = { id: userRow.id, name: userRow.name, email: userRow.email, avatar: userRow.avatar };
    res.json({ token, user });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

// GET /api/me
app.get('/api/me', async (req, res) => {
  const auth = req.headers.authorization || '';
  const m = auth.match(/^Bearer\s+(.*)$/i);
  if (!m) return res.status(401).json({ error: 'Missing token' });
  const token = m[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const userRow = await dbGet('SELECT id,name,email,avatar FROM users WHERE id = ?', [payload.sub]);
    if (!userRow) return res.status(404).json({ error: 'Not found' });
    res.json({ user: { id: userRow.id, name: userRow.name, email: userRow.email, avatar: userRow.avatar } });
  } catch (e) { return res.status(401).json({ error: 'Invalid token' }); }
});

// Simple health
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Server listening on port ${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`));
