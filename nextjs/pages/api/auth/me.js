import { parse } from 'cookie';
import pool from '../../../lib/db';

export default async function handler(req, res){
  const cookies = parse(req.headers.cookie || '');
  const token = cookies['btg_token'];
  if (!token) return res.json({ user: null });
  try{
    const jwt = require('jsonwebtoken');
    const data = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-me');
    const [rows] = await pool.query('SELECT id,name,email,role,avatar,created_at FROM users WHERE id = ?', [data.id]);
    res.json({ user: rows[0] || null });
  }catch(err){ res.json({ user: null }); }
}
