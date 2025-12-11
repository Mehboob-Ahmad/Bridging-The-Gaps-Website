import pool from '../../../../nextjs/lib/db';
import { v4 as uuidv4 } from 'uuid';

// Simple in-memory rate limiter per IP for POST requests
// Limit: 5 posts per 1 hour window per IP
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;
const ipBuckets = new Map(); // ip -> array of timestamps

function isRateLimited(ip){
  const now = Date.now();
  const bucket = ipBuckets.get(ip) || [];
  // remove old entries
  const pruned = bucket.filter(ts => (now - ts) < RATE_LIMIT_WINDOW_MS);
  pruned.push(now);
  ipBuckets.set(ip, pruned);
  return pruned.length > RATE_LIMIT_MAX;
}

export default async function handler(req, res){
  if (req.method === 'GET'){
    try{
      const [rows] = await pool.query('SELECT id,name,rating,message,created_at FROM reviews ORDER BY created_at DESC LIMIT 100');
      return res.json({ reviews: rows });
    }catch(err){
      console.error('GET /api/reviews error', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  if (req.method === 'POST'){
    try{
      const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0].trim() : req.socket.remoteAddress;
      if (isRateLimited(ip)) return res.status(429).json({ error: 'rate_limited', message: 'Too many reviews submitted from this IP, try again later.' });

      const { name, rating, message } = req.body || {};
      if (!name || !message || !rating) return res.status(400).json({ error: 'Missing fields' });
      const r = Math.max(1, Math.min(5, Number(rating)));
      const id = uuidv4();
      await pool.query('INSERT INTO reviews (id,name,rating,message,created_at) VALUES (?, ?, ?, ?, NOW())', [id, name.slice(0,255), r, message.slice(0,2000)]);
      const [rows] = await pool.query('SELECT id,name,rating,message,created_at FROM reviews WHERE id = ?', [id]);
      return res.status(201).json({ review: rows[0] });
    }catch(err){
      console.error('POST /api/reviews error', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  res.setHeader('Allow', 'GET,POST');
  res.status(405).end('Method Not Allowed');
}
