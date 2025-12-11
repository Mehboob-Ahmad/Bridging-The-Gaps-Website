import bcrypt from 'bcryptjs';
import pool from '../../../lib/db';
import { setLoginCookie } from '../../../utils/auth';

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const { name, email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try{
    const hash = await bcrypt.hash(password, 10);
    const id = require('crypto').randomBytes(12).toString('hex');
    await pool.query('INSERT INTO users (id, name, email, role, password_hash, created_at) VALUES (?, ?, ?, ?, ?, NOW())', [id, name || '', email, 'user', hash]);
    const [rows] = await pool.query('SELECT id,name,email,role,avatar,created_at FROM users WHERE id = ?', [id]);
    const user = rows[0];
    await setLoginCookie(res, user);
    res.json({ ok: true, user });
  }catch(err){ console.error(err); res.status(500).json({ error: err.message }); }
}
