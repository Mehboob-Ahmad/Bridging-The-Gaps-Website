// SCRIPT.js — consolidated site behaviors: PDF preview, donation slip preview, donations widget

(function () {
	// PDF preview / link updater (tolerant to missing elements)
	const uploadInput = document.getElementById('pdfUpload');
	const previewFrame = document.getElementById('pdfPreview');
	const pdfLink = document.getElementById('communityPdfLink');

	if (!pdfLink) return; // nothing to do if there's no link to update

	let currentPdfObjectUrl = null;

	if (uploadInput && previewFrame) {
		uploadInput.addEventListener('change', function (e) {
			const file = e.target.files && e.target.files[0];
			if (!file) return;

			if (file.type !== 'application/pdf') {
				alert('Please select a PDF file.');
				return;
			}

			if (currentPdfObjectUrl) {
				URL.revokeObjectURL(currentPdfObjectUrl);
				currentPdfObjectUrl = null;
			}

			currentPdfObjectUrl = URL.createObjectURL(file);
			previewFrame.src = currentPdfObjectUrl;
			pdfLink.href = currentPdfObjectUrl;
			pdfLink.textContent = 'Open / Download the selected PDF';
		});
	}

	// revoke when leaving page
	window.addEventListener('beforeunload', function () {
		if (currentPdfObjectUrl) try { URL.revokeObjectURL(currentPdfObjectUrl); } catch (e) {}
	});
})();

(function(){
	// Simple client-side auth demo. Stores users in localStorage (insecure for production).
	const USERS_KEY = 'btg_users';
	const CUR_KEY = 'btg_current_user';
	const ADMIN_EMAIL = 'unsdg10@gmail.com';

	function loadUsers(){ try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch(e){ return []; } }
	function saveUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
	function getCurrent(){ try { return JSON.parse(localStorage.getItem(CUR_KEY) || 'null'); } catch(e){ return null; } }
	function setCurrent(u){ localStorage.setItem(CUR_KEY, JSON.stringify(u)); }
	function clearCurrent(){ localStorage.removeItem(CUR_KEY); }

	// Update header auth area: show avatar if logged in, else show buttons
	function updateHeaderAuth(){
		const authArea = document.getElementById('authArea');
		const userAvatar = document.getElementById('userAvatar');
		if(!authArea || !userAvatar) return;
		const user = getCurrent();
		if(user){
			authArea.style.display = 'none';
			userAvatar.src = user.profilePic || 'images/LOGO.jpg';
			userAvatar.style.display = 'inline-block';
			userAvatar.title = user.name || user.email || 'Account';
		} else {
			authArea.style.display = '';
			userAvatar.style.display = 'none';
			userAvatar.src = '';
		}
	}

	// Clicking avatar logs out (simple UX)
	document.addEventListener('click', function(e){
		const ua = document.getElementById('userAvatar');
		if(!ua) return;
		if(e.target === ua){
			if(confirm('Sign out?')){
				clearCurrent();
				updateHeaderAuth();
				// reload to refresh UI
				location.reload();
			}
		}
	});

	// Signup form handling
	const signupForm = document.getElementById('signupForm');
	if(signupForm){
		signupForm.addEventListener('submit', function(e){
			e.preventDefault();
			const name = (signupForm.querySelector('#suName')||{}).value || '';
			const email = ((signupForm.querySelector('#suEmail')||{}).value || '').trim().toLowerCase();
			const pw = (signupForm.querySelector('#suPassword')||{}).value || '';
			const pw2 = (signupForm.querySelector('#suPassword2')||{}).value || '';
			if(!email || !pw){ alert('Please fill required fields.'); return; }
			if(pw !== pw2){ alert('Passwords do not match.'); return; }
			const users = loadUsers();
			if(users.find(u=>u.email === email)){ alert('An account with this email already exists. Please login.'); return; }
			const fileInput = signupForm.querySelector('#suAvatar');
			function finalizeCreate(profileDataUrl){
				const user = { id: Date.now(), name: name || null, email: email, password: pw, profilePic: profileDataUrl || null };
				users.push(user);
				saveUsers(users);
				setCurrent(user);
				// Prepare mailto to notify user and admin via their email client
				const subject = encodeURIComponent('BRIDGING THE GAPS — account created');
				const body = encodeURIComponent(`Hello ${user.name || user.email},\n\nYour account has been created.\n\nIf you did not sign up, contact us at ${ADMIN_EMAIL}.\n\nRegards,\nBRIDGING THE GAPS`);
				const mailto = `mailto:${email},${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
				// Open draft in user's email client (fallback - depends on client)
				try{ window.open(mailto); } catch(e){}
				alert('Account created. An email draft should open in your email client — please send it to notify admin.');
				location.href = 'index.html';
			}
			if(fileInput && fileInput.files && fileInput.files[0]){
				const f = fileInput.files[0];
				const reader = new FileReader();
				reader.onload = function(){ finalizeCreate(reader.result); };
				reader.readAsDataURL(f);
			} else {
				finalizeCreate(null);
			}
		});
	}

	// Login form handling
	const loginForm = document.getElementById('loginForm');
	if(loginForm){
		loginForm.addEventListener('submit', function(e){
			e.preventDefault();
			const email = ((loginForm.querySelector('#liEmail')||{}).value || '').trim().toLowerCase();
			const pw = (loginForm.querySelector('#liPassword')||{}).value || '';
			const users = loadUsers();
			const user = users.find(u=>u.email === email && u.password === pw);
			if(!user){ alert('Invalid email or password.'); return; }
			setCurrent(user);
			alert('Logged in successfully.');
			location.href = 'index.html';
		});
	}

	// On load update header: prefer server session (PHP) if available
	(function(){
		// try PHP session endpoint first
		fetch('/php/me.php', { credentials: 'same-origin' }).then(function(res){
			return res.json();
		}).then(function(data){
			if (data && data.user) {
				// populate session-derived user
				try { localStorage.setItem('btg_current_user', JSON.stringify(data.user)); } catch(e){}
			}
		}).catch(function(){ /* ignore network errors */ }).finally(function(){
			try{ updateHeaderAuth(); } catch(e){}
		});
	})();

})();

(function () {
	// Donation-slip preview (main upload area)
	const slipInput = document.getElementById('donationSlipUpload');
	const slipPreview = document.getElementById('slipPreview');
	const slipPreviewInfo = document.getElementById('slipPreviewInfo');
	const clearBtn = document.getElementById('clearSlipBtn');

	if (!slipInput || !slipPreview) return;

	let currentSlipUrl = null;

	slipInput.addEventListener('change', function (e) {
		const file = e.target.files && e.target.files[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			alert('Please select an image file (jpg, png, etc.).');
			slipInput.value = '';
			return;
		}

		if (currentSlipUrl) {
			URL.revokeObjectURL(currentSlipUrl);
			currentSlipUrl = null;
		}

		currentSlipUrl = URL.createObjectURL(file);
		slipPreview.src = currentSlipUrl;
		slipPreview.style.display = 'block';
		slipPreviewInfo.style.display = 'block';

		// Fetch current total from localStorage (if present) and show it alongside the slip info.
		const storedTotal = localStorage.getItem('btg_donation_total');
		const displayTotal = storedTotal ? Math.round(Number(storedTotal)) : null;
		let infoText = `Selected: ${file.name} — ${(file.size / 1024).toFixed(1)} KB`;
		if (displayTotal !== null) {
			infoText += ` \u2022 Total donations so far: RS ${displayTotal}`; // bullet separator
		}
		slipPreviewInfo.textContent = infoText;
		clearBtn.style.display = 'inline-block';
	});

	clearBtn.addEventListener('click', function () {
		slipInput.value = '';
		if (currentSlipUrl) {
			URL.revokeObjectURL(currentSlipUrl);
			currentSlipUrl = null;
		}
		slipPreview.src = '';
		slipPreview.style.display = 'none';
		slipPreviewInfo.style.display = 'none';
		slipPreviewInfo.textContent = '';
		clearBtn.style.display = 'none';
	});

	window.addEventListener('beforeunload', function () {
		if (currentSlipUrl) try { URL.revokeObjectURL(currentSlipUrl); } catch (e) {}
	});
})();

(function () {
	// Donations widget: manage total, entries, persistent storage (localStorage), and in-session slip preview
	const totalEl = document.getElementById('donationTotalAmount');
	const addBtn = document.getElementById('addDonationBtn');
	const amountInput = document.getElementById('donationAmount');
	const nameInput = document.getElementById('donorName');
	const slipInputNew = document.getElementById('donationSlipForEntry');
	const listEl = document.getElementById('donationList');
	const messageEl = document.getElementById('donationMessage');

	if (!totalEl || !addBtn || !amountInput || !listEl) return;

	// Storage keys
	const KEY_TOTAL = 'btg_donation_total';
	const KEY_ENTRIES = 'btg_donation_entries';

	// Load saved state
	let total = Number(localStorage.getItem(KEY_TOTAL) || totalEl.textContent.replace(/[^0-9.]/g, '') || 0);
	totalEl.textContent = Math.round(total);

	let entries = [];
	try { entries = JSON.parse(localStorage.getItem(KEY_ENTRIES) || '[]'); } catch (e) { entries = []; }

	// Keep transient object URLs to revoke on unload
	const transientUrls = new Set();

	function saveState() {
		localStorage.setItem(KEY_TOTAL, String(total));
		localStorage.setItem(KEY_ENTRIES, JSON.stringify(entries));
	}

	function escapeHtml(str){ return String(str).replace(/[&<>\"]/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m];}); }

	function renderEntries() {
		listEl.innerHTML = '';
		if (!entries.length) {
			listEl.innerHTML = '<li class="muted">No donations recorded yet.</li>';
			return;
		}

		entries.forEach(function (ent) {
			const li = document.createElement('li');
			li.style.padding = '10px 12px';
			li.style.border = '1px solid rgba(0,0,0,0.06)';
			li.style.borderRadius = '8px';
			li.style.marginBottom = '8px';
			li.style.display = 'flex';
			li.style.alignItems = 'center';
			li.style.gap = '12px';

			const meta = document.createElement('div');
			meta.innerHTML = `<strong>RS ${Math.round(ent.amount)}</strong> ${ent.name ? ' — ' + escapeHtml(ent.name) : ''} <div style="font-size:0.85rem; color:var(--muted);">${new Date(ent.date).toLocaleString()}</div>`;

			li.appendChild(meta);

			if (ent.slipName) {
				const slipInfo = document.createElement('div');
				slipInfo.style.fontSize = '0.9rem';
				slipInfo.style.color = 'var(--muted)';
				slipInfo.textContent = 'Slip: ' + ent.slipName;
				li.appendChild(slipInfo);
			}

			if (ent._objectUrl) {
				const img = document.createElement('img');
				img.src = ent._objectUrl;
				img.alt = 'Slip';
				img.style.height = '56px';
				img.style.objectFit = 'cover';
				img.style.borderRadius = '6px';
				li.appendChild(img);
			}

			listEl.appendChild(li);
		});
	}

	// Render initial entries; transient URLs are not persistent across reloads
	renderEntries();

	addBtn.addEventListener('click', function () {
		const amt = parseFloat(amountInput.value);
		if (!amt || isNaN(amt) || amt <= 0) {
			if (messageEl) messageEl.textContent = 'Please enter a valid donation amount.';
			return;
		}

		const name = nameInput ? nameInput.value.trim() : '';
		const file = slipInputNew && slipInputNew.files && slipInputNew.files[0];

		const entry = {
			id: Date.now(),
			name: name || null,
			amount: Math.round(amt),
			date: new Date().toISOString(),
			slipName: file ? file.name : null
		};

		if (file) {
			try {
				const url = URL.createObjectURL(file);
				entry._objectUrl = url;
				transientUrls.add(url);
			} catch (e) {}
		}

		entries.unshift(entry);
		total = Math.round(Number(total) + entry.amount);
		totalEl.textContent = total;
		saveState();

		renderEntries();
		if (messageEl) messageEl.textContent = 'Donation added.';

		amountInput.value = '';
		if (nameInput) nameInput.value = '';
		if (slipInputNew) slipInputNew.value = '';
	});

	window.addEventListener('beforeunload', function () {
		transientUrls.forEach(function (u) { try { URL.revokeObjectURL(u); } catch (e) {} });
	});
})();



