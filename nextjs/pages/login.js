import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  async function submit(e){
    e.preventDefault();
    setStatus('Signing in...');
    try{
      const res = await fetch('/api/auth/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error || 'Invalid credentials');
        return;
      }
      setStatus('Success! Redirecting…');
      router.push('/');
    }catch(err){
      console.error(err);
      setStatus('Network error — please try again.');
    }
  }

  return (
    <Layout>
      <Head>
        <title>Login — BRIDGING THE GAPS</title>
      </Head>

      <main>
        <section className="form-card">
          <h2>Login</h2>
          <form onSubmit={submit}>
            <label htmlFor="liEmail">Email</label>
            <input id="liEmail" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />

            <label htmlFor="liPassword">Password</label>
            <input id="liPassword" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />

            <div className="form-actions">
              <button type="submit" className="primary">Login</button>
              <Link href="/signup">Create account</Link>
            </div>
            {status && <div style={{marginTop:8,color: status.startsWith('Success') ? '#16a34a' : '#ef4444'}}>{status}</div>}
          </form>
        </section>
      </main>
    </Layout>
  );
}
