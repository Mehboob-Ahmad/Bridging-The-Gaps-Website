import Head from 'next/head';
import pool from '../lib/db';
import { verifyToken, createCsrfToken } from '../utils/auth';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Admin({ users: initialUsers = [], donations: initialDonations = [], volunteers: initialVolunteers = [], projects: initialProjects = [], reviews: initialReviews = [], page = 1, limit = 20, csrf = '' }){
  const [users, setUsers] = useState(initialUsers);
  const [donations, setDonations] = useState(initialDonations);
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [projects, setProjects] = useState(initialProjects);
  const [reviews, setReviews] = useState(initialReviews || []);

  async function postAction(action, payload){
    const csrf = typeof window !== 'undefined' ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') : '';
    const res = await fetch('/api/admin?action=' + encodeURIComponent(action), { method: 'POST', headers: {'Content-Type':'application/json', 'x-csrf-token': csrf || ''}, body: JSON.stringify(payload) });
    return res.json();
  }

  async function promote(id){ await postAction('promote_user',{id}); const updated = users.map(u=> u.id===id? {...u, role:'admin'}:u); setUsers(updated); }
  async function demote(id){ await postAction('demote_user',{id}); const updated = users.map(u=> u.id===id? {...u, role:'user'}:u); setUsers(updated); }
  async function delUser(id){ if(!confirm('Delete user?')) return; await postAction('delete_user',{id}); setUsers(users.filter(u=>u.id!==id)); }
  async function delDonation(id){ if(!confirm('Delete donation?')) return; await postAction('delete_donation',{id}); setDonations(donations.filter(d=>d.id!==id)); }
  async function delReview(id){ if(!confirm('Delete review?')) return; await postAction('delete_review',{id}); setReviews(reviews.filter(r=>r.id!==id)); }

  return (
    <Layout>
      <Head>
        <title>Admin — BRIDGING THE GAPS</title>
        <meta name="csrf-token" content={csrf || ''} />
      </Head>
      <main>
        <section>
          <h1>Admin Dashboard</h1>
          <p className="muted">Manage registered users and review recorded donations.</p>
        </section>

        <section>
          <h2>Reviews</h2>
          <div style={{marginBottom:10}}>
            <a className="btn" href={'/api/admin?action=export_reviews'}>Export Reviews CSV</a>
          </div>
          <table style={{width:'100%'}}>
            <thead><tr><th>Name</th><th>Rating</th><th>Message</th><th>Created</th><th>Actions</th></tr></thead>
            <tbody>
              {reviews.length === 0 ? (
                <tr><td colSpan={5} className="muted">No reviews</td></tr>
              ) : reviews.map(r=> (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.rating}</td>
                  <td>{r.message.length > 80 ? r.message.substring(0,80) + '...' : r.message}</td>
                  <td>{r.created_at}</td>
                  <td><button onClick={()=>delReview(r.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2>Users</h2>
          <div style={{marginBottom:10}}>
            <a className="btn" href={'/api/admin?action=export_users'}>Export Users CSV</a>
            <a className="btn" style={{marginLeft:8}} href={'/api/admin?action=export_donations'}>Export Donations CSV</a>
          </div>
          <table style={{width:'100%'}}>
            <thead><tr><th>Email</th><th>Name</th><th>Role</th><th>Created</th><th>Actions</th></tr></thead>
            <tbody>
              {users.map(u=> (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{u.name}</td>
                  <td>{u.role}</td>
                  <td>{u.created_at}</td>
                  <td>
                    {u.role !== 'admin' ? <button onClick={()=>promote(u.id)}>Promote</button> : <button onClick={()=>demote(u.id)}>Demote</button>}
                    <button onClick={()=>delUser(u.id)} style={{marginLeft:8}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Donations</h2>
          <table style={{width:'100%'}}>
            <thead><tr><th>Amount</th><th>User</th><th>Volunteer</th><th>Slip</th><th>Created</th><th>Actions</th></tr></thead>
            <tbody>
              {donations.map(d=> (
                <tr key={d.id}>
                  <td>RS {d.amount}</td>
                  <td>{d.user_email || '-'}</td>
                  <td>{d.volunteer_name || '-'}</td>
                  <td>{d.slip_path? <a href={d.slip_path}>view</a> : '-'}</td>
                  <td>{d.created_at}</td>
                  <td><button onClick={()=>delDonation(d.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Volunteers</h2>
          <table style={{width:'100%'}}>
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Projects Completed</th><th>Created</th></tr></thead>
            <tbody>
              {volunteers.map(v=> (
                <tr key={v.volunteer_id}>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.phone || '-'}</td>
                  <td>{v.Projects_completed}</td>
                  <td>{v.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Projects</h2>
          <table style={{width:'100%'}}>
            <thead><tr><th>Name</th><th>Description</th><th>Volunteer</th><th>Created</th></tr></thead>
            <tbody>
              {projects.map(p=> (
                <tr key={p.project_id}>
                  <td>{p.name}</td>
                  <td>{p.description ? (p.description.length > 50 ? p.description.substring(0,50) + '...' : p.description) : '-'}</td>
                  <td>{p.volunteer_name || '-'}</td>
                  <td>{p.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, query }){
  // check cookie token
  const cookies = require('cookie').parse(req.headers.cookie || '');
  const token = cookies['btg_token'];
  if (!token) return { redirect: { destination: '/login', permanent: false } };
  const data = verifyToken(token);
  if (!data || data.role !== 'admin') return { redirect: { destination: '/login', permanent: false } };

  const page = Math.max(1, parseInt(query.page || '1'));
  const limit = Math.min(100, parseInt(query.limit || '20'));
  const offset = (page-1)*limit;
  const [[users], [donations], [volunteers], [projects], [reviews]] = await Promise.all([
    pool.query('SELECT id,name,email,avatar,role,created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset]),
    pool.query('SELECT d.id,d.user_id,d.volunteer_id,d.amount,d.slip_path,d.created_at,u.email as user_email,v.name as volunteer_name FROM donations d LEFT JOIN users u ON d.user_id = u.id LEFT JOIN Volunteer v ON d.volunteer_id = v.volunteer_id ORDER BY d.created_at DESC LIMIT ? OFFSET ?', [limit, offset]),
    pool.query('SELECT volunteer_id,name,email,phone,Projects_completed,created_at FROM Volunteer ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset]),
    pool.query('SELECT p.project_id,p.name,p.description,p.created_at,v.name as volunteer_name FROM Projects p LEFT JOIN Volunteer v ON p.volunteer_id = v.volunteer_id ORDER BY p.created_at DESC LIMIT ? OFFSET ?', [limit, offset]),
    pool.query('SELECT id,name,rating,message,created_at FROM reviews ORDER BY created_at DESC LIMIT ?', [limit])
  ]);

  const csrf = createCsrfToken();
  return { props: { users, donations, volunteers, projects, reviews, page, limit, csrf } };
}
