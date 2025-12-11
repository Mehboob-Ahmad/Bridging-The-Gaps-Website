// sscript.js — behaviors for suggestions.html
(function(){
	'use strict';

	// Storage key for reviews
	const STORAGE_KEY = 'bridging-the-gaps-reviews';

	// Get reviews from localStorage
	function getReviews(){
		try{
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : [];
		}catch(e){
			return [];
		}
	}

	// Save reviews to localStorage
	function saveReviews(reviews){
		try{
			localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
		}catch(e){
			console.error('Failed to save reviews:', e);
		}
	}

	// Format date for display
	function formatDate(date){
		const d = new Date(date);
		const now = new Date();
		const diffTime = Math.abs(now - d);
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		if(diffDays === 0) return 'Today';
		if(diffDays === 1) return 'Yesterday';
		if(diffDays < 7) return `${diffDays} days ago`;
		if(diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
		return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
	}

	// Create star rating display
	function getStarRating(rating){
		const stars = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
		return stars[rating - 1] || '';
	}

	// Display reviews in the container
	function displayReviews(){
		const container = document.getElementById('reviewsContainer');
		if(!container) return;

		const reviews = getReviews();

		if(reviews.length === 0){
			container.innerHTML = '<li style="color:var(--muted);font-style:italic;">No reviews yet. Be the first to leave a review!</li>';
			return;
		}

		// Sort reviews by date (newest first)
		reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

		container.innerHTML = reviews.map(review => {
			const dateStr = formatDate(review.date);
			return `
				<li>
					<div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:8px;">
						<strong style="color:#0f1724;">${escapeHtml(review.name)}</strong>
						<span style="color:var(--muted);font-size:0.9rem;">${dateStr}</span>
					</div>
					<div style="margin-bottom:8px;font-size:1.1rem;">${getStarRating(review.rating)}</div>
					<p style="color:#1f2937;margin:0;line-height:1.6;">${escapeHtml(review.message)}</p>
				</li>
			`;
		}).join('');
	}

	// Escape HTML to prevent XSS
	function escapeHtml(text){
		const div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	}

	// Handle form submission
	function handleFormSubmit(e){
		e.preventDefault();

		const form = e.target;
		const nameInput = document.getElementById('name');
		const ratingSelect = document.getElementById('rating');
		const messageTextarea = document.getElementById('message');

		if(!nameInput || !ratingSelect || !messageTextarea) return;

		const name = nameInput.value.trim();
		const rating = parseInt(ratingSelect.value, 10);
		const message = messageTextarea.value.trim();

		if(!name || !rating || !message){
			alert('Please fill in all fields.');
			return;
		}

		// Create review object
		const review = {
			name: name,
			rating: rating,
			message: message,
			date: new Date().toISOString()
		};

		// Get existing reviews and add new one
		const reviews = getReviews();
		reviews.push(review);
		saveReviews(reviews);

		// Clear form
		form.reset();

		// Display updated reviews
		displayReviews();

		// Show success message
		const submitBtn = form.querySelector('button[type="submit"]');
		const originalText = submitBtn.textContent;
		submitBtn.textContent = 'Review Submitted!';
		submitBtn.style.background = '#10b981';
		setTimeout(() => {
			submitBtn.textContent = originalText;
			submitBtn.style.background = '';
		}, 2000);

		// Scroll to reviews section
		const reviewsSection = document.getElementById('reviews');
		if(reviewsSection){
			reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	// Initialize on DOMContentLoaded
	function init(){
		// Set up form handler
		const reviewForm = document.getElementById('reviewForm');
		if(reviewForm){
			reviewForm.addEventListener('submit', handleFormSubmit);
		}

		// Display existing reviews
		displayReviews();

		// Set dynamic year in footer if present
		try{
			const footer = document.querySelector('footer .site-credit');
			if(footer){
				const yearEl = footer.querySelector('p:last-of-type');
				const year = new Date().getFullYear();
				if(yearEl){
					yearEl.innerHTML = `&copy; ${year} BRIDGING THE GAPS. All rights reserved`;
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
	}

	// Run when DOM is ready
	if(document.readyState === 'loading'){
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

