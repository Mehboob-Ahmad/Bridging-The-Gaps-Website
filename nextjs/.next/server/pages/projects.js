"use strict";
(() => {
var exports = {};
exports.id = 327;
exports.ids = [327,660];
exports.modules = {

/***/ 257:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderpage_2Fprojects_preferredRegion_absolutePagePath_private_next_pages_2Fprojects_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ next_route_loaderpage_2Fprojects_preferredRegion_absolutePagePath_private_next_pages_2Fprojects_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_getServerSideProps),
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

// NAMESPACE OBJECT: ./pages/projects.js
var projects_namespaceObject = {};
__webpack_require__.r(projects_namespaceObject);
__webpack_require__.d(projects_namespaceObject, {
  "default": () => (Projects),
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
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./components/Layout.js
var Layout = __webpack_require__(7345);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./lib/db.js
var db = __webpack_require__(3125);
var db_default = /*#__PURE__*/__webpack_require__.n(db);
;// CONCATENATED MODULE: ./pages/projects.js





const SITE_URL = process.env.SITE_URL || "";
function Projects({ projects = [] }) {
    // Build ItemList JSON-LD for projects
    const base = SITE_URL ? SITE_URL.replace(/\/$/, "") : "";
    const projectsJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Projects — BRIDGING THE GAPS",
        "url": base + "/projects",
        "itemListElement": (projects || []).map((p, i)=>({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                    "@type": "Project",
                    "name": p.name || p.title || `Project ${i + 1}`,
                    "description": p.description || "",
                    "url": base + (p.slug ? `/projects/${p.slug}` : `/projects/${p.project_id || ""}`),
                    "startDate": p.created_at ? new Date(p.created_at).toISOString() : undefined
                }
            }))
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(Layout/* default */.Z, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("title", {
                        children: "Projects — BRIDGING THE GAPS"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("meta", {
                        name: "description",
                        content: "Our ongoing and upcoming community projects."
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify(projectsJsonLd)
                        }
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx("main", {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                    id: "projects",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("h2", {
                            children: "Our Projects"
                        }),
                        projects.length === 0 ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx("h1", {
                                    children: "Projects Coming Soon!"
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("p", {
                                    children: "When we have projects, we will update this page with the latest details."
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("p", {
                                    children: "Thanks for your patience."
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("p", {
                                    children: "If you have any suggestions or ideas for projects, please feel free to contact us."
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "/suggestions",
                                    className: "btn",
                                    children: "Suggestions"
                                })
                            ]
                        }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx("p", {
                                    children: "Here are our current and upcoming community projects:"
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 16,
                                        marginTop: 20
                                    },
                                    children: projects.map((project)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                            style: {
                                                padding: 16,
                                                background: "#f8fafc",
                                                borderRadius: 8,
                                                borderLeft: "3px solid var(--accent)"
                                            },
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("h3", {
                                                    style: {
                                                        color: "#0f1724",
                                                        marginBottom: 8
                                                    },
                                                    children: project.name
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("p", {
                                                    style: {
                                                        color: "#1f2937",
                                                        marginBottom: 8
                                                    },
                                                    children: project.description
                                                }),
                                                project.volunteer_name && /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                                                    style: {
                                                        fontSize: "0.9rem",
                                                        color: "var(--muted)"
                                                    },
                                                    children: [
                                                        "Volunteer: ",
                                                        project.volunteer_name
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                                                    style: {
                                                        fontSize: "0.85rem",
                                                        color: "var(--muted)"
                                                    },
                                                    children: [
                                                        "Started: ",
                                                        new Date(project.created_at).toLocaleDateString()
                                                    ]
                                                })
                                            ]
                                        }, project.project_id))
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
async function getServerSideProps() {
    try {
        const [rows] = await db_default().query(`
      SELECT p.project_id, p.name, p.description, p.created_at, 
             v.name as volunteer_name 
      FROM Projects p 
      LEFT JOIN Volunteer v ON p.volunteer_id = v.volunteer_id 
      ORDER BY p.created_at DESC
    `);
        return {
            props: {
                projects: rows || []
            }
        };
    } catch (err) {
        console.error("Error fetching projects:", err);
        return {
            props: {
                projects: []
            }
        };
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?page=%2Fprojects&preferredRegion=&absolutePagePath=private-next-pages%2Fprojects.js&absoluteAppPath=private-next-pages%2F_app.js&absoluteDocumentPath=next%2Fdist%2Fpages%2F_document&middlewareConfigBase64=e30%3D!

        // Next.js Route Loader
        
        

        // Import the app and document modules.
        
        

        // Import the userland code.
        

        // Re-export the component (should be the default export).
        /* harmony default export */ const next_route_loaderpage_2Fprojects_preferredRegion_absolutePagePath_private_next_pages_2Fprojects_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(projects_namespaceObject, "default"));

        // Re-export methods.
        const getStaticProps = (0,helpers/* hoist */.l)(projects_namespaceObject, "getStaticProps")
        const getStaticPaths = (0,helpers/* hoist */.l)(projects_namespaceObject, "getStaticPaths")
        const next_route_loaderpage_2Fprojects_preferredRegion_absolutePagePath_private_next_pages_2Fprojects_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_getServerSideProps = (0,helpers/* hoist */.l)(projects_namespaceObject, "getServerSideProps")
        const config = (0,helpers/* hoist */.l)(projects_namespaceObject, "config")
        const reportWebVitals = (0,helpers/* hoist */.l)(projects_namespaceObject, "reportWebVitals")
        

        // Re-export legacy methods.
        const unstable_getStaticProps = (0,helpers/* hoist */.l)(projects_namespaceObject, "unstable_getStaticProps")
        const unstable_getStaticPaths = (0,helpers/* hoist */.l)(projects_namespaceObject, "unstable_getStaticPaths")
        const unstable_getStaticParams = (0,helpers/* hoist */.l)(projects_namespaceObject, "unstable_getStaticParams")
        const unstable_getServerProps = (0,helpers/* hoist */.l)(projects_namespaceObject, "unstable_getServerProps")
        const unstable_getServerSideProps = (0,helpers/* hoist */.l)(projects_namespaceObject, "unstable_getServerSideProps")

        // Create and export the route module that will be consumed.
        const options = {"definition":{"kind":"PAGES","page":"/projects","pathname":"/projects","bundlePath":"","filename":""}}
        const routeModule = new (module_default())({
          ...options,
          components: {
            App: _app["default"],
            Document: (_document_default()),
          },
          userland: projects_namespaceObject,
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

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

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

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

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
var __webpack_exports__ = __webpack_require__.X(0, [940,812,664,4,345], () => (__webpack_exec__(257)));
module.exports = __webpack_exports__;

})();