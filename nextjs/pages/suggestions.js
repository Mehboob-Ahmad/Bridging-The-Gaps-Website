import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import pool from '../lib/db';
import { useRouter } from 'next/router';

function formatDate(dateString){
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
}

function stars(rating){
  return '⭐'.repeat(Math.max(1, Math.min(5, rating)));
}

export default function Suggestions({ serverReviews = [] }){
  const [reviews, setReviews] = useState(serverReviews || []);
  const router = useRouter();

  async function handleSubmit(e){
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const rating = Number(form.rating.value);
    const message = form.message.value.trim();
    if (!name || !rating || !message) return;

    try{
      const res = await fetch('/api/reviews', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name, rating, message }) });
      if (!res.ok) throw new Error('Failed to post');
      const data = await res.json();
      // prepend new review
      setReviews(prev => [data.review, ...prev]);
      form.reset();
      // update URL (optional) to include a query param to prevent stale cache
      router.replace(router.pathname, undefined, { shallow: true });
    }catch(err){
      console.error('Submit review failed', err);
      alert('Failed to submit review');
    }
  }

  // Server-side JSON-LD: aggregate rating + up to 10 reviews
  const SITE_URL = process.env.SITE_URL || '';
  const base = SITE_URL ? SITE_URL.replace(/\/$/, '') : '';
  const agg = reviews.length ? (reviews.reduce((s, r) => s + (Number(r.rating)||0), 0) / reviews.length) : 0;
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Suggestions & Reviews — BRIDGING THE GAPS",
    "url": base + "/suggestions",
    "aggregateRating": reviews.length ? {
      "@type": "AggregateRating",
      "ratingValue": Number(agg.toFixed(1)),
      "ratingCount": reviews.length
    } : undefined,
    "review": reviews.slice(0,10).map(r => ({
      "@type": "Review",
      "author": r.name || 'Anonymous',
      "datePublished": r.created_at || new Date().toISOString(),
      "reviewBody": r.message || '',
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": Number(r.rating) || 0
      }
    }))
  };

  return (
    <Layout>
      <Head>
        <title>Suggestions & Reviews — BRIDGING THE GAPS</title>
        <meta name="description" content="Share your reviews, suggestions, and complaints with our team." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      </Head>

      <main>
        <section id="intro" className="page-intro">
          <h2>Your Voice Matters</h2>
          <p>We believe in building a better tomorrow — together. Share your thoughts, ideas, and experiences to help us improve our community projects and outreach programs.</p>
        </section>

        <section id="reviews" className="reviews">
          <h2>Community Reviews</h2>
          <p>Read what others say about our work, or leave your own review below.</p>

          <div className="review-form">
            <h3>Leave a Review</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="rating">Rating (1–5)</label>
              <select id="rating" name="rating" required defaultValue="">
                <option value="" disabled>Select</option>
                {[5,4,3,2,1].map(r => (
                  <option key={r} value={r}>{stars(r)}</option>
                ))}
              </select>

              <label htmlFor="message">Your Feedback</label>
              <textarea id="message" name="message" rows={4} required />

              <button type="submit">Submit Review</button>
            </form>
          </div>

          <div className="review-list">
            <h3>Recent Reviews</h3>
            <ul id="reviewsContainer">
              {reviews.length === 0 && (
                <li style={{color:'var(--muted)',fontStyle:'italic'}}>No reviews yet. Be the first to leave a review!</li>
              )}
              {reviews.map((review) => (
                <li key={review.id}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                    <strong>{review.name}</strong>
                    <span style={{color:'var(--muted)',fontSize:'0.9rem'}}>{formatDate(review.created_at)}</span>
                  </div>
                  <div style={{fontSize:'1.1rem',marginBottom:8}}>{stars(review.rating)}</div>
                  <p style={{margin:0,lineHeight:1.6}}>{review.message}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="suggestions-form" className="google-form">
          <h2>Formal Suggestions & Complaints</h2>
          <p>If you have a detailed suggestion or complaint, please use the official form below:</p>
          <a href="https://forms.gle/dY5xSfeyhT1PD4tg9" target="_blank" rel="noopener noreferrer">
            <button type="button">Open Google Form</button>
          </a>
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(){
  try{
    const [rows] = await pool.query('SELECT id,name,rating,message,created_at FROM reviews ORDER BY created_at DESC LIMIT 100');
    return { props: { serverReviews: rows || [] } };
  }catch(err){
    console.error('Error fetching reviews:', err);
    return { props: { serverReviews: [] } };
  }
}
