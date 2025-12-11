import Head from 'next/head';
import Layout from '../components/Layout';
import DonationWidget from '../components/DonationWidget';
import DonationSlipUpload from '../components/DonationSlipUpload';

const AWARENESS_IMAGES = Array.from({ length: 15 }, (_, idx) => `/images/${idx + 1}.png`);

export default function Home(){
  // JSON-LD for Organization and WebSite
  const SITE_URL = process.env.SITE_URL || '';
  const ORG_JSONLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BRIDGING THE GAPS",
    "url": SITE_URL || "",
    "logo": (SITE_URL ? SITE_URL.replace(/\/$/, '') : '') + "/images/LOGO.jpg",
    "sameAs": []
  };
  const WEBSITE_JSONLD = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BRIDGING THE GAPS",
    "url": SITE_URL || "",
    "potentialAction": {
      "@type": "SearchAction",
      "target": (SITE_URL ? SITE_URL.replace(/\/$/, '') : "") + "/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  return (
    <Layout fixedFooter>
      <Head>
        <title>BRIDGING THE GAPS</title>
        <meta name="description" content="Community donations, volunteering and local projects — Bridging the Gaps" />
        <link rel="icon" href="/images/LOGO-removebg-preview.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }} />
      </Head>

      <main>
        <section id="about">
          <h2>About Us</h2>
          <p>
            Discrimination and inequality have long existed in Pakistan across various sectors; however, we, as a team, believe that for a tree to grow and be stable enough to provide shade and fruit, it is essential to first plant a seed in fertile soil. We, as a team, hope that our platform, Bridging the Gap, becomes the fertile soil that is required for meaningful change to take root.
          </p>
          <div className="pdf-section">
            <p>
              <strong>Community Purpose (PDF):</strong>{' '}
              <a id="communityPdfLink" href="/documents/COMMUNITY PURPOSE.pdf" target="_blank" rel="noopener noreferrer">
                Open / Download the PDF
              </a>
            </p>
          </div>
        </section>

        <section id="awareness">
          <h2>Awareness</h2>
          <div className="awareness-images">
            {AWARENESS_IMAGES.map(src => (
              <img key={src} src={src} alt="Awareness" />
            ))}
          </div>
        </section>

        <section id="donations">
          <h1>Donations</h1>
          <p>Your support helps us continue our mission. We accept donations in the following forms:</p>
          <ul>
            <li>Monetary Donations: You can donate in the SADAPAY account given.</li>
            <li>In-Kind Donations: We accept bags, stationery, or food items for the needy.</li>
            <li>Volunteer Time: Your time and skills are valuable to us.</li>
          </ul>

          <h2>Total Donations Raised</h2>
          <DonationWidget />

          <h3>SADAPAY ACCOUNT</h3>
          <h4>MEHBOOB AHMAD SADIQ</h4>
          <p>Account no.: 03276035376</p>
          <p>IBAN: PK79SADA0000003276035376</p>

          <h5>Kindly upload the receipt after donations (image):</h5>
          <DonationSlipUpload />

          <section id="volunteer">
            <h2>Volunteer</h2>
            <p>We are always looking for volunteers to help us with our projects. If you are interested in volunteering, please feel free to contact us.</p>
            <a href="https://forms.gle/W1Fm5rssrx7JE7AS6" target="_blank" rel="noopener noreferrer">
              <button type="button">Volunteer Form</button>
            </a>
          </section>
        </section>
      </main>
    </Layout>
  );
}
