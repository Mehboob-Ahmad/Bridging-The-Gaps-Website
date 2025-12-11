import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/#about', label: 'About Us' },
  { href: '/#awareness', label: 'Awareness' },
  { href: '/collaborators', label: 'Collaborators' },
  { href: '/projects', label: 'Our Projects' },
  { href: '/suggestions', label: 'Suggestions' },
  { href: '/#donations', label: 'Donations' },
];

export default function Layout({ children, fixedFooter = false }){
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!mounted) return;
        setUser(data?.user || null);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  async function handleLogout(){
    if (typeof window !== 'undefined' && !confirm('Sign out?')) return;
    try{
      await fetch('/api/auth/logout', { method: 'POST' });
    }catch(err){
      console.error(err);
    }finally{
      setUser(null);
    }
  }

  return (
    <>
      <header className="container">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <img id="logo" src="/images/LOGO.jpg" alt="BRIDGING THE GAPS logo" />
          <h1>BRIDGING THE GAPS</h1>
        </div>
        <nav aria-label="Primary navigation">
          <ul>
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="auth-area">
          {user ? (
            <img
              id="userAvatar"
              className="user-avatar"
              src={user.avatar || '/images/LOGO.jpg'}
              alt={user.name || user.email || 'Account'}
              title="Click to logout"
              onClick={handleLogout}
            />
          ) : (
            <div id="authArea" className="auth-actions">
              <Link href="/login" className="auth-btn">Login</Link>
              <Link href="/signup" className="auth-btn" style={{background:'#0ea5a4'}}>Register</Link>
            </div>
          )}
        </div>
      </header>

      {children}

      <footer className={`site-footer ${fixedFooter ? 'fixed' : ''}`}>
        <div className="container">
          <a href="https://www.instagram.com/bridging.the.gaps/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/images/Insta_logo-removebg-preview.png" alt="Instagram" />
          </a>

          <a href="mailto:unsdg10@gmail.com" className="email-link" aria-label="Email unsdg10">
            Contact: <span style={{marginLeft:6,textDecoration:'underline'}}>unsdg10@gmail.com</span>
          </a>

          <div className="site-credit" style={{textAlign:'right'}}>
            <p>Website designed by <strong>MA Services</strong>.</p>
            <a href="https://www.instagram.com/ma_services_2025/" target="_blank" rel="noopener noreferrer" aria-label="MA Services Instagram">
              <img src="/images/MA Services LOGO.jpg" alt="MA Services Logo" style={{marginTop:6}} />
            </a>
            <p>© {new Date().getFullYear()} BRIDGING THE GAPS. All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
}

