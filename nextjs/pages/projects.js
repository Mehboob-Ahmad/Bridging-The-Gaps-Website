import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import pool from '../lib/db';

const SITE_URL = process.env.SITE_URL || '';

export default function Projects({ projects = [] }){
  // Build ItemList JSON-LD for projects
  const base = SITE_URL ? SITE_URL.replace(/\/$/, '') : '';
  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Projects — BRIDGING THE GAPS",
    "url": base + "/projects",
    "itemListElement": (projects || []).map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Project",
        "name": p.name || p.title || `Project ${i+1}`,
        "description": p.description || '',
        "url": base + (p.slug ? `/projects/${p.slug}` : `/projects/${p.project_id || ''}`),
        "startDate": p.created_at ? new Date(p.created_at).toISOString() : undefined
      }
    }))
  };

  return (
    <Layout>
      <Head>
        <title>Projects — BRIDGING THE GAPS</title>
        <meta name="description" content="Our ongoing and upcoming community projects." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }} />
      </Head>

      <main>
        <section id="projects">
          <h2>Our Projects</h2>
          {projects.length === 0 ? (
            <>
              <h1>Projects Coming Soon!</h1>
              <p>When we have projects, we will update this page with the latest details.</p>
              <p>Thanks for your patience.</p>
              <p>If you have any suggestions or ideas for projects, please feel free to contact us.</p>
              <Link href="/suggestions" className="btn">Suggestions</Link>
            </>
          ) : (
            <>
              <p>Here are our current and upcoming community projects:</p>
              <div style={{display:'flex',flexDirection:'column',gap:16,marginTop:20}}>
                {projects.map(project => (
                  <div key={project.project_id} style={{padding:16,background:'#f8fafc',borderRadius:8,borderLeft:'3px solid var(--accent)'}}>
                    <h3 style={{color:'#0f1724',marginBottom:8}}>{project.name}</h3>
                    <p style={{color:'#1f2937',marginBottom:8}}>{project.description}</p>
                    {project.volunteer_name && (
                      <p style={{fontSize:'0.9rem',color:'var(--muted)'}}>Volunteer: {project.volunteer_name}</p>
                    )}
                    <p style={{fontSize:'0.85rem',color:'var(--muted)'}}>Started: {new Date(project.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(){
  try{
    const [rows] = await pool.query(`
      SELECT p.project_id, p.name, p.description, p.created_at, 
             v.name as volunteer_name 
      FROM Projects p 
      LEFT JOIN Volunteer v ON p.volunteer_id = v.volunteer_id 
      ORDER BY p.created_at DESC
    `);
    return { props: { projects: rows || [] } };
  }catch(err){
    console.error('Error fetching projects:', err);
    return { props: { projects: [] } };
  }
}
