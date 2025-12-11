import Head from 'next/head';
import Layout from '../components/Layout';

export default function Collaborators(){
  const SITE_URL = process.env.SITE_URL || '';
  const base = SITE_URL ? SITE_URL.replace(/\/$/, '') : '';

  // Graph with page + collaborator organizations
  const COLLAB_GRAPH = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Collaborators — BRIDGING THE GAPS",
        "description": "Meet the organisations partnering with Bridging the Gaps.",
        "url": base + "/collaborators"
      },
      {
        "@type": "Organization",
        "name": "RAH-E-UMEED NGO",
        "url": "https://www.instagram.com/raheumeed_ngo/",
        "sameAs": ["https://www.instagram.com/raheumeed_ngo/"]
      },
      {
        "@type": "Organization",
        "name": "MA Services",
        "url": "https://www.instagram.com/ma_services_2025/",
        "sameAs": ["https://www.instagram.com/ma_services_2025/"]
      }
    ]
  };
  return (
    <Layout>
      <Head>
        <title>Collaborators — BRIDGING THE GAPS</title>
        <meta name="description" content="Meet the organisations partnering with Bridging the Gaps." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLAB_GRAPH) }} />
      </Head>

      <main>
        <section id="collaborators">
          <h2>Our Collaborators</h2>
          <p>We are proud to collaborate with <strong>RAH-E-UMEED NGO</strong>, a student-led organisation for the sake of wellness in the society.</p>
          <img src="/images/NGO LOGO.jpg" alt="RAH-E-UMEED NGO Logo" />
          <p>RAH-E-UMEED NGO works tirelessly to uplift underprivileged communities through initiatives focused on education, healthcare, and social welfare. Their dedication aligns perfectly with our mission at BRIDGING THE GAPS.</p>
          <p>Together, we aim to create a more inclusive and equitable society by addressing the gaps that exist in various sectors.</p>
          <h3>For donations at RAH-E-UMEED NGO:</h3>
          <p>SADAPAY ACCOUNT:</p>
          <h4>ZAID FARRUKH</h4>
          <p>Account no.: 03336197734</p>
          <p>JAZZCASH ACCOUNT:</p>
          <h4>MUHAMMAD MURTAZA</h4>
          <p>Account no.: 03424596918</p>
          <a href="https://www.instagram.com/raheumeed_ngo/" target="_blank" rel="noopener noreferrer">
            <button type="button">RAH-E-UMEED NGO</button>
          </a>

          <p style={{marginTop:24}}>Our 2nd Collaborator is <strong>MA Services</strong>, your premium & reliable services provider.</p>
          <img src="/images/MA Services LOGO.jpg" alt="MA Services" />
          <p>MA Services is dedicated to providing top-notch services in various domains, ensuring customer satisfaction and reliability.</p>
          <p>Together, we strive to bridge gaps in service accessibility and quality.</p>
          <a href="https://www.instagram.com/ma_services_2025/?hl=en" target="_blank" rel="noopener noreferrer">
            <button type="button">MA SERVICES</button>
          </a>
        </section>
      </main>
    </Layout>
  );
}
