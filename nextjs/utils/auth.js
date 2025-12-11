import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../lib/db';

export const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
export const TOKEN_NAME = 'btg_token';

export function signToken(payload){
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token){
  try{ return jwt.verify(token, JWT_SECRET); }catch(e){ return null; }
}

export async function setLoginCookie(res, user){
  const token = signToken({ id: user.id, email: user.email, role: user.role });
  // set httpOnly cookie
  res.setHeader('Set-Cookie', `${TOKEN_NAME}=${token}; HttpOnly; Path=/; Max-Age=${60*60*24*7}; SameSite=Lax`);
}

export async function getUserFromToken(token){
  const data = verifyToken(token);
  if (!data) return null;
  const [rows] = await pool.query('SELECT id,name,email,role,avatar,created_at FROM users WHERE id = ?', [data.id]);
  return rows[0] || null;
}

export function createCsrfToken(){
  // short-lived CSRF token signed with the same secret
  return jwt.sign({ purpose: 'csrf' }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyCsrfToken(token){
  try{
    const d = jwt.verify(token, JWT_SECRET);
    return d && d.purpose === 'csrf';
  }catch(e){ return false; }
}
