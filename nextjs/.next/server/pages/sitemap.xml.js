"use strict";
(() => {
var exports = {};
exports.id = 164;
exports.ids = [164,660];
exports.modules = {

/***/ 4736:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderpage_2Fsitemap_xml_preferredRegion_absolutePagePath_private_next_pages_2Fsitemap_xml_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ next_route_loaderpage_2Fsitemap_xml_preferredRegion_absolutePagePath_private_next_pages_2Fsitemap_xml_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_getServerSideProps),
  getStaticPaths: () => (/* binding */ getStaticPaths),
  getStaticProps: () => (/* binding */ getStaticProps),
  reportWebVitals: () => (/* binding */ reportWebVitals),
  routeModule: () => (/* binding */ routeModule),
  unstable_getServerProps: () => (/* binding */ unstable_getServerProps),
  unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),
  unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),
  unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),
  unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)
});

// NAMESPACE OBJECT: ./pages/sitemap.xml.js
var sitemap_xml_namespaceObject = {};
__webpack_require__.r(sitemap_xml_namespaceObject);
__webpack_require__.d(sitemap_xml_namespaceObject, {
  "default": () => (Sitemap),
  getServerSideProps: () => (getServerSideProps)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages/module.js
var pages_module = __webpack_require__(3185);
var module_default = /*#__PURE__*/__webpack_require__.n(pages_module);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7182);
// EXTERNAL MODULE: ./node_modules/next/dist/pages/_document.js
var _document = __webpack_require__(2940);
var _document_default = /*#__PURE__*/__webpack_require__.n(_document);
// EXTERNAL MODULE: ./pages/_app.js
var _app = __webpack_require__(6004);
;// CONCATENATED MODULE: ./pages/sitemap.xml.js
// Dynamic sitemap generator — responds at /sitemap.xml
function escapeXml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function Sitemap() {
    return null;
}
async function getServerSideProps({ req, res }) {
    const proto = req.headers["x-forwarded-proto"] || (req.connection && req.connection.encrypted ? "https" : "http");
    const host = req.headers.host;
    const SITE_URL = process.env.SITE_URL && process.env.SITE_URL.trim() !== "" ? process.env.SITE_URL.replace(/\/$/, "") : `${proto}://${host}`;
    const staticUrls = [
        {
            loc: "/",
            changefreq: "weekly",
            priority: 0.8
        },
        {
            loc: "/projects",
            changefreq: "monthly",
            priority: 0.6
        },
        {
            loc: "/collaborators",
            changefreq: "monthly",
            priority: 0.6
        },
        {
            loc: "/suggestions",
            changefreq: "monthly",
            priority: 0.5
        },
        {
            loc: "/login",
            changefreq: "yearly",
            priority: 0.2
        },
        {
            loc: "/signup",
            changefreq: "yearly",
            priority: 0.2
        }
    ];
    // Collect dynamic pages (if a projects table exists with slugs)
    const urls = [
        ...staticUrls
    ];
    try {
        const pool = __webpack_require__(3125);
        const [[tableInfo]] = await pool.query("SHOW TABLES LIKE 'projects'");
        if (tableInfo) {
            const [projects] = await pool.query("SELECT slug, updated_at FROM projects WHERE slug IS NOT NULL LIMIT 100");
            projects.forEach((p)=>urls.push({
                    loc: `/projects/${p.slug}`,
                    lastmod: p.updated_at || p.created_at ? new Date(p.updated_at || p.created_at).toISOString() : undefined,
                    changefreq: "monthly",
                    priority: 0.5
                }));
        }
    } catch (err) {
    // ignore — projects table may not exist in this schema
    }
    const now = new Date().toISOString();
    const xmlParts = [];
    xmlParts.push('<?xml version="1.0" encoding="UTF-8"?>');
    xmlParts.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    urls.forEach((u)=>{
        xmlParts.push("  <url>");
        xmlParts.push(`    <loc>${escapeXml(SITE_URL + u.loc)}</loc>`);
        xmlParts.push(`    <lastmod>${escapeXml(u.lastmod || now)}</lastmod>`);
        if (u.changefreq) xmlParts.push(`    <changefreq>${escapeXml(u.changefreq)}</changefreq>`);
        if (u.priority !== undefined) xmlParts.push(`    <priority>${u.priority}</priority>`);
        xmlParts.push("  </url>");
    });
    xmlParts.push("</urlset>");
    const xml = xmlParts.join("\n");
    // Cache for 1 hour at edge/CDN, allow stale while revalidate
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.write(xml);
    res.end();
    return {
        props: {}
    };
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?page=%2Fsitemap.xml&preferredRegion=&absolutePagePath=private-next-pages%2Fsitemap.xml.js&absoluteAppPath=private-next-pages%2F_app.js&absoluteDocumentPath=next%2Fdist%2Fpages%2F_document&middlewareConfigBase64=e30%3D!

        // Next.js Route Loader
        
        

        // Import the app and document modules.
        
        

        // Import the userland code.
        

        // Re-export the component (should be the default export).
        /* harmony default export */ const next_route_loaderpage_2Fsitemap_xml_preferredRegion_absolutePagePath_private_next_pages_2Fsitemap_xml_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(sitemap_xml_namespaceObject, "default"));

        // Re-export methods.
        const getStaticProps = (0,helpers/* hoist */.l)(sitemap_xml_namespaceObject, "getStaticProps")
        const getStaticPaths = (0,helpers/* hoist */.l)(sitemap_xml_namespaceObject, "getStaticPaths")
        const next_route_loaderpage_2Fsitemap_xml_preferredRegion_absolutePagePath_private_next_pages_2Fsitemap_xml_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_getServerSideProps = (0,helpers/* hoist */.l)(sitemap_xml_namespaceObject, "getServerSideProps")
        const config = (0,helpers/* hoist */.l)(sitemap_xml_namespaceObject, "config")
        const reportWebVitals = (0,helpers/* hoist */.l)(sitemap_xml_namespaceObject, "reportWebVitals")
        

        // Re-export legacy methods.
        const unstable_getStaticProps = (0,helpers/* hoist */.l)(sitemap_xml_namespaceObject, "unstable_getStaticProps")
        const unstable_getStaticPaths = (0,helpers/* hoist */.l)(sitemap_xml_namespaceObject, "unstable_getStaticPaths")
        const unstable_getStaticParams = (0,helpers/* hoist */.l)(sitemap_xml_namespaceObject, "unstable_getStaticParams")
        const unstable_getServerProps = (0,helpers/* hoist */.l)(sitemap_xml_namespaceObject, "unstable_getServerProps")
        const unstable_getServerSideProps = (0,helpers/* hoist */.l)(sitemap_xml_namespaceObject, "unstable_getServerSideProps")

        // Create and export the route module that will be consumed.
        const options = {"definition":{"kind":"PAGES","page":"/sitemap.xml","pathname":"/sitemap.xml","bundlePath":"","filename":""}}
        const routeModule = new (module_default())({
          ...options,
          components: {
            App: _app["default"],
            Document: (_document_default()),
          },
          userland: sitemap_xml_namespaceObject,
        })
        
        
    

/***/ }),

/***/ 3125:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const mysql = __webpack_require__(2418);
const { MYSQL_HOST = "127.0.0.1", MYSQL_PORT = "3306", MYSQL_DB = "bridging_the_gaps", MYSQL_USER = "root", MYSQL_PASS = "" } = process.env;
const pool = mysql.createPool({
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT),
    database: MYSQL_DB,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    decimalNumbers: true
});
module.exports = pool;


/***/ }),

/***/ 2418:
/***/ ((module) => {

module.exports = require("mysql2/promise");

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 4140:
/***/ ((module) => {

module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ 9716:
/***/ ((module) => {

module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ 3100:
/***/ ((module) => {

module.exports = require("next/dist/server/render.js");

/***/ }),

/***/ 6368:
/***/ ((module) => {

module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ 6724:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ 8743:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/html-context.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [940,812,4], () => (__webpack_exec__(4736)));
module.exports = __webpack_exports__;

})();