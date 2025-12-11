// pscript.js — small behaviors for projects.html
(function(){
	// set dynamic year in footer if present
	try{
		const footer = document.querySelector('footer .site-credit');
		if(footer){
			const yearEl = footer.querySelector('p:last-of-type');
			const year = new Date().getFullYear();
			if(yearEl){
				// Replace any 4-digit year with current year, or append if not found
				yearEl.innerHTML = `&copy; ${year} BRIDGING THE GAPS. All rights reserved`;
			} else {
				const p = document.createElement('p');
				p.innerHTML = `&copy; ${year} BRIDGING THE GAPS. All rights reserved`;
				footer.appendChild(p);
			}
		}
	}catch(e){/* ignore */}

	// Fix possible typo in email display: ensure displayed text matches mailto href
	try{
		const emailAnchor = document.querySelector('footer .email-link');
		if(emailAnchor){
			const href = emailAnchor.getAttribute('href');
			if(href && href.startsWith('mailto:')){
				const email = href.replace('mailto:','');
				const span = emailAnchor.querySelector('span');
				if(span && span.textContent.trim() !== email){
					span.textContent = email;
				}
			}
		}
	}catch(e){/* ignore */}
})();

