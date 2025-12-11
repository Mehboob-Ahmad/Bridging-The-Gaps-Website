// admin.js - interacts with php/admin_api.php
async function api(action, params = {}){
  const url = '/php/admin_api.php?action=' + encodeURIComponent(action);
  const opts = { method: 'GET', credentials: 'same-origin' };
  if (params && Object.keys(params).length) {
    // for delete requests use POST
    // include CSRF token automatically when present in the page
    const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const bodyParams = Object.assign({}, params);
    if (csrf && !bodyParams.csrf) bodyParams.csrf = csrf;
    const fd = new URLSearchParams(bodyParams);
    opts.method = 'POST';
    opts.body = fd;
    opts.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  }
  const res = await fetch(url, opts);
  return res.json();
}

function el(tag, props, children){ const e = document.createElement(tag); if(props) Object.assign(e, props); if(children) children.forEach(c=>e.appendChild(c)); return e; }

async function loadUsers(){
  const out = document.getElementById('usersArea'); out.innerHTML = 'Loading…';
  try{
    const data = await api('list_users');
    if (data.users){
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      thead.innerHTML = '<tr><th>Email</th><th>Name</th><th>Avatar</th><th>Created</th><th>Actions</th></tr>';
      table.appendChild(thead);
      const tbody = document.createElement('tbody');
      data.users.forEach(u=>{
        const tr = document.createElement('tr');
        const avatarTd = document.createElement('td');
        if(u.avatar) { const img = document.createElement('img'); img.src = u.avatar; img.className='thumb'; avatarTd.appendChild(img);} else avatarTd.textContent = '-';
        const delBtn = document.createElement('a'); delBtn.href='#'; delBtn.className='btn'; delBtn.textContent='Delete'; delBtn.addEventListener('click', async (e)=>{ e.preventDefault(); if(!confirm('Delete user?')) return; await api('delete_user',{id:u.id}); loadUsers(); });
        tr.innerHTML = `<td>${u.email}</td><td>${u.name||''}</td>`;
        tr.appendChild(avatarTd);
        tr.innerHTML += `<td>${u.created_at}</td>`;
        const actionsTd = document.createElement('td'); actionsTd.appendChild(delBtn);
        tr.appendChild(actionsTd);
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      out.innerHTML = ''; out.appendChild(table);
    } else { out.innerHTML = '<div class="small">No users</div>'; }
  }catch(err){ out.innerHTML = '<div class="small">Error loading users</div>'; console.error(err); }
}

async function loadDonations(){
  const out = document.getElementById('donationsArea'); out.innerHTML = 'Loading…';
  try{
    const data = await api('list_donations');
    if (data.donations){
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      thead.innerHTML = '<tr><th>Amount</th><th>User</th><th>Slip</th><th>Created</th><th>Actions</th></tr>';
      table.appendChild(thead);
      const tbody = document.createElement('tbody');
      data.donations.forEach(d=>{
        const tr = document.createElement('tr');
        const slipTd = document.createElement('td');
        if(d.slip_path){ const img = document.createElement('img'); img.src = d.slip_path; img.className='thumb'; slipTd.appendChild(img); } else slipTd.textContent='-';
        tr.innerHTML = `<td>RS ${d.amount}</td><td>${d.user_email||''}</td>`;
        tr.appendChild(slipTd);
        tr.innerHTML += `<td>${d.created_at}</td>`;
        const actionsTd = document.createElement('td');
        const delBtn = document.createElement('a'); delBtn.href='#'; delBtn.className='btn'; delBtn.textContent='Delete'; delBtn.addEventListener('click', async (e)=>{ e.preventDefault(); if(!confirm('Delete donation?')) return; await api('delete_donation',{id:d.id}); loadDonations(); });
        actionsTd.appendChild(delBtn);
        tr.appendChild(actionsTd);
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      out.innerHTML = ''; out.appendChild(table);
    } else { out.innerHTML = '<div class="small">No donations</div>'; }
  }catch(err){ out.innerHTML = '<div class="small">Error loading donations</div>'; console.error(err); }
}

async function loadUploads(){
  const out = document.getElementById('uploadsArea'); out.innerHTML = 'Loading…';
  try{
    const data = await api('list_uploads');
    if (data.uploads && data.uploads.length){
      const wrap = document.createElement('div'); wrap.style.display='flex'; wrap.style.flexWrap='wrap'; wrap.style.gap='10px';
      data.uploads.forEach(f => {
        const a = document.createElement('a'); a.href = f.url; a.target='_blank';
        const img = document.createElement('img'); img.src = f.url; img.className = 'thumb'; img.style.width='120px'; img.style.height='90px';
        a.appendChild(img);
        wrap.appendChild(a);
      });
      out.innerHTML=''; out.appendChild(wrap);
    } else out.innerHTML = '<div class="small">No uploads</div>';
  }catch(err){ out.innerHTML = '<div class="small">Error loading uploads</div>'; console.error(err); }
}

window.addEventListener('DOMContentLoaded', function(){ loadUsers(); loadDonations(); loadUploads(); });
