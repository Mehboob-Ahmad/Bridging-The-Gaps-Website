import { parse } from 'cookie';
import pool from '../../lib/db';
import jwt from 'jsonwebtoken';
import { TOKEN_NAME, verifyCsrfToken } from '../../utils/auth';
import { stringify } from 'csv-stringify/sync';

function requireAdmin(req, res){
  const cookies = parse(req.headers.cookie || '');
  const token = cookies[TOKEN_NAME] || cookies['btg_token'];
  if (!token) return null;
  try{ const data = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-me'); return data; }catch(e){ return null; }
}

export default async function handler(req, res){
  const user = requireAdmin(req, res);
  if (!user || user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });

  const action = req.query.action || req.body.action || 'list_users';
  try{
    if (req.method === 'GET' && action === 'list_users'){
      const page = Math.max(1, parseInt(req.query.page || '1'));
      const limit = Math.min(100, parseInt(req.query.limit || '20'));
      const offset = (page-1)*limit;
      const [[countRows]] = await pool.query('SELECT COUNT(*) as total FROM users');
      const total = countRows.total || 0;
      const [rows] = await pool.query('SELECT id,name,email,avatar,role,created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
      return res.json({ users: rows, page, limit, total });
    }

    if (req.method === 'GET' && action === 'list_donations'){
      const page = Math.max(1, parseInt(req.query.page || '1'));
      const limit = Math.min(100, parseInt(req.query.limit || '20'));
      const offset = (page-1)*limit;
      const [[countRows]] = await pool.query('SELECT COUNT(*) as total FROM donations');
      const total = countRows.total || 0;
      const [rows] = await pool.query('SELECT d.id,d.user_id,d.volunteer_id,d.amount,d.slip_path,d.created_at,u.email as user_email,v.name as volunteer_name FROM donations d LEFT JOIN users u ON d.user_id = u.id LEFT JOIN Volunteer v ON d.volunteer_id = v.volunteer_id ORDER BY d.created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
      return res.json({ donations: rows, page, limit, total });
    }

    // list reviews
    if (req.method === 'GET' && action === 'list_reviews'){
      const page = Math.max(1, parseInt(req.query.page || '1'));
      const limit = Math.min(200, parseInt(req.query.limit || '50'));
      const offset = (page-1)*limit;
      const [[countRows]] = await pool.query('SELECT COUNT(*) as total FROM reviews');
      const total = countRows.total || 0;
      const [rows] = await pool.query('SELECT id,name,rating,message,created_at FROM reviews ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
      return res.json({ reviews: rows, page, limit, total });
    }

    if (req.method === 'GET' && action === 'list_volunteers'){
      const page = Math.max(1, parseInt(req.query.page || '1'));
      const limit = Math.min(100, parseInt(req.query.limit || '20'));
      const offset = (page-1)*limit;
      const [[countRows]] = await pool.query('SELECT COUNT(*) as total FROM Volunteer');
      const total = countRows.total || 0;
      const [rows] = await pool.query('SELECT volunteer_id,name,email,phone,Projects_completed,created_at FROM Volunteer ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
      return res.json({ volunteers: rows, page, limit, total });
    }

    if (req.method === 'GET' && action === 'list_projects'){
      const page = Math.max(1, parseInt(req.query.page || '1'));
      const limit = Math.min(100, parseInt(req.query.limit || '20'));
      const offset = (page-1)*limit;
      const [[countRows]] = await pool.query('SELECT COUNT(*) as total FROM Projects');
      const total = countRows.total || 0;
      const [rows] = await pool.query('SELECT p.project_id,p.name,p.description,p.created_at,v.name as volunteer_name FROM Projects p LEFT JOIN Volunteer v ON p.volunteer_id = v.volunteer_id ORDER BY p.created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
      return res.json({ projects: rows, page, limit, total });
    }

    // export users as CSV
    if (req.method === 'GET' && action === 'export_users'){
      const [rows] = await pool.query('SELECT id,name,email,role,avatar,created_at FROM users ORDER BY created_at DESC');
      const csv = stringify(rows, { header: true });
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="users.csv"');
      return res.send(csv);
    }

    // export donations as CSV
    if (req.method === 'GET' && action === 'export_donations'){
      const [rows] = await pool.query('SELECT id,user_id,amount,slip_path,created_at FROM donations ORDER BY created_at DESC');
      const csv = stringify(rows, { header: true });
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="donations.csv"');
      return res.send(csv);
    }

    // export reviews as CSV
    if (req.method === 'GET' && action === 'export_reviews'){
      const [rows] = await pool.query('SELECT id,name,rating,message,created_at FROM reviews ORDER BY created_at DESC');
      const csv = stringify(rows, { header: true });
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="reviews.csv"');
      return res.send(csv);
    }

    if (req.method === 'POST' && action === 'delete_user'){
      const csrf = req.headers['x-csrf-token'] || req.body.csrf || '';
      if (!verifyCsrfToken(csrf)) return res.status(403).json({ error: 'invalid_csrf' });
      const id = req.body.id;
      if (!id) return res.status(400).json({ error: 'id required' });
      await pool.query('DELETE FROM users WHERE id = ?', [id]);
      return res.json({ ok: true });
    }

    if (req.method === 'POST' && action === 'promote_user'){
      const csrf = req.headers['x-csrf-token'] || req.body.csrf || '';
      if (!verifyCsrfToken(csrf)) return res.status(403).json({ error: 'invalid_csrf' });
      const id = req.body.id;
      if (!id) return res.status(400).json({ error: 'id required' });
      await pool.query('UPDATE users SET role = ? WHERE id = ?', ['admin', id]);
      return res.json({ ok: true });
    }

    if (req.method === 'POST' && action === 'demote_user'){
      const csrf = req.headers['x-csrf-token'] || req.body.csrf || '';
      if (!verifyCsrfToken(csrf)) return res.status(403).json({ error: 'invalid_csrf' });
      const id = req.body.id;
      if (!id) return res.status(400).json({ error: 'id required' });
      await pool.query('UPDATE users SET role = ? WHERE id = ?', ['user', id]);
      return res.json({ ok: true });
    }

    if (req.method === 'POST' && action === 'delete_donation'){
      const csrf = req.headers['x-csrf-token'] || req.body.csrf || '';
      if (!verifyCsrfToken(csrf)) return res.status(403).json({ error: 'invalid_csrf' });
      const id = req.body.id;
      if (!id) return res.status(400).json({ error: 'id required' });
      // remove slip file path if exists
      const [rows] = await pool.query('SELECT slip_path FROM donations WHERE id = ?', [id]);
      if (rows[0] && rows[0].slip_path){
        const path = rows[0].slip_path.replace(/^\//,'');
        try{ require('fs').unlinkSync(require('path').join(process.cwd(), 'public', path)); }catch(e){}
      }
      await pool.query('DELETE FROM donations WHERE id = ?', [id]);
      return res.json({ ok: true });
    }

    if (req.method === 'POST' && action === 'delete_review'){
      const csrf = req.headers['x-csrf-token'] || req.body.csrf || '';
      if (!verifyCsrfToken(csrf)) return res.status(403).json({ error: 'invalid_csrf' });
      const id = req.body.id;
      if (!id) return res.status(400).json({ error: 'id required' });
      await pool.query('DELETE FROM reviews WHERE id = ?', [id]);
      return res.json({ ok: true });
    }

    return res.status(400).json({ error: 'unknown action' });
  }catch(err){ console.error(err); return res.status(500).json({ error: err.message }); }
}
