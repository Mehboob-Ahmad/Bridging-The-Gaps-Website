// login.js - posts JSON to /api/login
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('loginForm');
  if(!form) return;
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const email = (form.querySelector('#liEmail')||{}).value || '';
    const password = (form.querySelector('#liPassword')||{}).value || '';
    try{
      const resp = await fetch((window.__API_BASE__ || '') + '/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
      const data = await resp.json();
      if(!resp.ok){ alert(data.error || 'Login failed'); return; }
      if(data.token) localStorage.setItem('btg_token', data.token);
      if(data.user) localStorage.setItem('btg_current_user', JSON.stringify(data.user));
      alert('Logged in');
      window.location.href = 'index.html';
    }catch(err){ console.error(err); alert('Network or server error'); }
  });
});
