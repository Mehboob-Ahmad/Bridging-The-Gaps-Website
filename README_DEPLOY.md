BRIDGING THE GAPS — Deploy guide
=================================

This folder includes a helper script to package the project into a single folder for easy deployment and guidance to finalize SEO artifacts.

1) Create a deploy package (PowerShell, Windows)

Open PowerShell in the repository root and run:

```powershell
./create_deploy_package.ps1
```

This will create a directory `deploy_package_<timestamp>` that contains the project sources you can copy to your server or zip and upload.

2) Recommended deployment (Next.js app)

- Set environment variables (see `nextjs/.env.example`) and especially `SITE_URL` to your production canonical domain (e.g. `https://example.org`).
- Deploy the `nextjs` folder to a Node-capable host (Vercel, Render, DigitalOcean App Platform, etc.).
- On the host, run `npm install` and `npm run build` then `npm start` (or let the platform run the build step).

3) SEO finalization

- Ensure `SITE_URL` is set in your production environment. The dynamic sitemap uses this value to build canonical URLs.
- `robots.txt` is already configured to reference `/sitemap.xml`. Keep it in the `public/` folder for static hosting or as-is for dynamic Next.js.
- Consider these additional steps to improve search visibility (note: no change can guarantee top rank):
  - Add descriptive page titles and unique meta descriptions for every page. Use `Head` in each Next.js page.
  - Add Open Graph and Twitter Card meta tags for better link previews.
  - Add JSON-LD structured data for Organization/Website and any Projects or Events.
  - Verify your sitemap in Google Search Console and request indexing for your domain.
  - Ensure pages return proper 200/301 status codes (no soft-404s) and have accessible content.
  - Use HTTPS and a valid TLS certificate.

4) Quick smoke test (locally)

Start the dev server and load the sitemap and robots:

```powershell
cd .\nextjs
npm install
npm run dev
# then open http://localhost:3000/sitemap.xml and http://localhost:3000/robots.txt
```

5) Notes about search ranking

Search ranking depends on many factors outside this repo (content relevance, backlinks, site speed, HTTPS, mobile friendliness, and time). The changes here (sitemap, robots, meta tags) help search engines find and index your site correctly, but cannot guarantee a #1 ranking.
