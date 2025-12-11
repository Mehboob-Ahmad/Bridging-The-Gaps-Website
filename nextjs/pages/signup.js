import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Signup(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  async function submit(e){
    e.preventDefault();
    if (password !== confirm){
      setStatus('Passwords do not match.');
      return;
    }
    setStatus('Creating account...');
    try{
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok){
        setStatus(data.error || 'Signup failed');
        return;
      }
      setStatus('Account created! Redirecting…');
      router.push('/');
    }catch(err){
      console.error(err);
      setStatus('Network error — please try again.');
    }
  }

  return (
    <Layout>
      <Head>
        <title>Sign Up — BRIDGING THE GAPS</title>
      </Head>

      <main>
        <section className="form-card">
          <h2>Create an account</h2>
          <p>Please provide your name, email, and a password.</p>
          <form onSubmit={submit}>
            <label htmlFor="suName">Full name</label>
            <input id="suName" value={name} onChange={e=>setName(e.target.value)} required />

            <label htmlFor="suEmail">Email</label>
            <input id="suEmail" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />

            <label htmlFor="suPassword">Password</label>
            <input id="suPassword" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />

            <label htmlFor="suPassword2">Confirm password</label>
            <input id="suPassword2" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required />

            <div className="form-actions">
              <button type="submit" className="primary">Create account</button>
              <Link href="/login">Have an account? Login</Link>
            </div>
            {status && <div style={{marginTop:8,color: status.startsWith('Account') ? '#16a34a' : '#ef4444'}}>{status}</div>}
          </form>
        </section>
      </main>
    </Layout>
  );
}

