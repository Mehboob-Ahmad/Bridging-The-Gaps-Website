// signup.js - sends form as multipart/form-data to /api/signup
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('signupForm');
  if(!form) return;
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const fd = new FormData(form);
    try{
      const resp = await fetch((window.__API_BASE__ || '') + '/api/signup', { method:'POST', body: fd });
      const data = await resp.json();
      if(!resp.ok){ alert(data.error || 'Signup failed'); return; }
      // Save token and user to localStorage for client-side UI
      if(data.token) localStorage.setItem('btg_token', data.token);
      if(data.user) localStorage.setItem('btg_current_user', JSON.stringify(data.user));
      alert('Account created successfully');
      window.location.href = 'index.html';
    }catch(err){ console.error(err); alert('Network or server error'); }
  });
});
