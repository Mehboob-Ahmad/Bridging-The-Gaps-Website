// Dynamic sitemap generator — responds at /sitemap.xml
function escapeXml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
}

export default function Sitemap(){
  return null;
}

export async function getServerSideProps({ req, res }){
  const proto = req.headers['x-forwarded-proto'] || (req.connection && req.connection.encrypted ? 'https' : 'http');
  const host = req.headers.host;
  const SITE_URL = process.env.SITE_URL && process.env.SITE_URL.trim() !== '' ? process.env.SITE_URL.replace(/\/$/, '') : `${proto}://${host}`;

  const staticUrls = [
    { loc: '/', changefreq: 'weekly', priority: 0.8 },
    { loc: '/projects', changefreq: 'monthly', priority: 0.6 },
    { loc: '/collaborators', changefreq: 'monthly', priority: 0.6 },
    { loc: '/suggestions', changefreq: 'monthly', priority: 0.5 },
    { loc: '/login', changefreq: 'yearly', priority: 0.2 },
    { loc: '/signup', changefreq: 'yearly', priority: 0.2 }
  ];

  // Collect dynamic pages (if a projects table exists with slugs)
  const urls = [...staticUrls];
  try{
    const pool = require('../lib/db');
    const [[tableInfo]] = await pool.query("SHOW TABLES LIKE 'projects'");
    if (tableInfo) {
      const [projects] = await pool.query('SELECT slug, updated_at FROM projects WHERE slug IS NOT NULL LIMIT 100');
      projects.forEach(p => urls.push({ loc: `/projects/${p.slug}`, lastmod: (p.updated_at || p.created_at) ? new Date(p.updated_at || p.created_at).toISOString() : undefined, changefreq: 'monthly', priority: 0.5 }));
    }
  }catch(err){
    // ignore — projects table may not exist in this schema
  }

  const now = new Date().toISOString();
  const xmlParts = [];
  xmlParts.push('<?xml version="1.0" encoding="UTF-8"?>');
  xmlParts.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  urls.forEach(u => {
    xmlParts.push('  <url>');
    xmlParts.push(`    <loc>${escapeXml(SITE_URL + u.loc)}</loc>`);
    xmlParts.push(`    <lastmod>${escapeXml(u.lastmod || now)}</lastmod>`);
    if (u.changefreq) xmlParts.push(`    <changefreq>${escapeXml(u.changefreq)}</changefreq>`);
    if (u.priority !== undefined) xmlParts.push(`    <priority>${u.priority}</priority>`);
    xmlParts.push('  </url>');
  });

  xmlParts.push('</urlset>');
  const xml = xmlParts.join('\n');

  // Cache for 1 hour at edge/CDN, allow stale while revalidate
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(xml);
  res.end();

  return { props: {} };
}
