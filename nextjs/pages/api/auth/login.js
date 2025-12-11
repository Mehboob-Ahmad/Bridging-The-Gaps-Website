import bcrypt from 'bcryptjs';
import pool from '../../../lib/db';
import { setLoginCookie } from '../../../utils/auth';

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try{
    const [rows] = await pool.query('SELECT id,name,email,role,avatar,password_hash,created_at FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return res.status(400).json({ error: 'invalid' });
    const ok = await bcrypt.compare(password, user.password_hash || '');
    if (!ok) return res.status(400).json({ error: 'invalid' });
    // remove password_hash from response
    delete user.password_hash;
    await setLoginCookie(res, user);
    res.json({ ok: true, user });
  }catch(err){ console.error(err); res.status(500).json({ error: err.message }); }
}
