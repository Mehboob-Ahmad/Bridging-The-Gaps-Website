"use strict";
(() => {
var exports = {};
exports.id = 696;
exports.ids = [696,660];
exports.modules = {

/***/ 8753:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderpage_2Fsuggestions_preferredRegion_absolutePagePath_private_next_pages_2Fsuggestions_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ getServerSideProps),
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

// NAMESPACE OBJECT: ./pages/suggestions.js
var suggestions_namespaceObject = {};
__webpack_require__.r(suggestions_namespaceObject);
__webpack_require__.d(suggestions_namespaceObject, {
  "default": () => (Suggestions)
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
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./components/Layout.js
var Layout = __webpack_require__(7345);
;// CONCATENATED MODULE: ./pages/suggestions.js




const STORAGE_KEY = "bridging-the-gaps-reviews";
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined
    });
}
function stars(rating) {
    return "⭐".repeat(Math.max(1, Math.min(5, rating)));
}
function Suggestions() {
    const [reviews, setReviews] = (0,external_react_.useState)([]);
    (0,external_react_.useEffect)(()=>{
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            setReviews(stored);
        } catch  {
            setReviews([]);
        }
    }, []);
    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const review = {
            name: form.name.value.trim(),
            rating: Number(form.rating.value),
            message: form.message.value.trim(),
            date: new Date().toISOString()
        };
        if (!review.name || !review.rating || !review.message) return;
        const next = [
            review,
            ...reviews
        ];
        setReviews(next);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        form.reset();
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(Layout/* default */.Z, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("title", {
                        children: "Suggestions & Reviews — BRIDGING THE GAPS"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("meta", {
                        name: "description",
                        content: "Share your reviews, suggestions, and complaints with our team."
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("main", {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                        id: "intro",
                        className: "page-intro",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                children: "Your Voice Matters"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("p", {
                                children: "We believe in building a better tomorrow — together. Share your thoughts, ideas, and experiences to help us improve our community projects and outreach programs."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                        id: "reviews",
                        className: "reviews",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                children: "Community Reviews"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("p", {
                                children: "Read what others say about our work, or leave your own review below."
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "review-form",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("h3", {
                                        children: "Leave a Review"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                                        onSubmit: handleSubmit,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx("label", {
                                                htmlFor: "name",
                                                children: "Your Name"
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("input", {
                                                type: "text",
                                                id: "name",
                                                name: "name",
                                                required: true
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("label", {
                                                htmlFor: "rating",
                                                children: "Rating (1–5)"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("select", {
                                                id: "rating",
                                                name: "rating",
                                                required: true,
                                                defaultValue: "",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx("option", {
                                                        value: "",
                                                        disabled: true,
                                                        children: "Select"
                                                    }),
                                                    [
                                                        5,
                                                        4,
                                                        3,
                                                        2,
                                                        1
                                                    ].map((r)=>/*#__PURE__*/ jsx_runtime.jsx("option", {
                                                            value: r,
                                                            children: stars(r)
                                                        }, r))
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("label", {
                                                htmlFor: "message",
                                                children: "Your Feedback"
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("textarea", {
                                                id: "message",
                                                name: "message",
                                                rows: 4,
                                                required: true
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("button", {
                                                type: "submit",
                                                children: "Submit Review"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "review-list",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("h3", {
                                        children: "Recent Reviews"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                                        id: "reviewsContainer",
                                        children: [
                                            reviews.length === 0 && /*#__PURE__*/ jsx_runtime.jsx("li", {
                                                style: {
                                                    color: "var(--muted)",
                                                    fontStyle: "italic"
                                                },
                                                children: "No reviews yet. Be the first to leave a review!"
                                            }),
                                            reviews.map((review, idx)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                            style: {
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "flex-start",
                                                                marginBottom: 8
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime.jsx("strong", {
                                                                    children: review.name
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                                    style: {
                                                                        color: "var(--muted)",
                                                                        fontSize: "0.9rem"
                                                                    },
                                                                    children: formatDate(review.date)
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                                                            style: {
                                                                fontSize: "1.1rem",
                                                                marginBottom: 8
                                                            },
                                                            children: stars(review.rating)
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("p", {
                                                            style: {
                                                                margin: 0,
                                                                lineHeight: 1.6
                                                            },
                                                            children: review.message
                                                        })
                                                    ]
                                                }, `${review.date}-${idx}`))
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                        id: "suggestions-form",
                        className: "google-form",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                children: "Formal Suggestions & Complaints"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("p", {
                                children: "If you have a detailed suggestion or complaint, please use the official form below:"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("a", {
                                href: "https://forms.gle/dY5xSfeyhT1PD4tg9",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: /*#__PURE__*/ jsx_runtime.jsx("button", {
                                    type: "button",
                                    children: "Open Google Form"
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?page=%2Fsuggestions&preferredRegion=&absolutePagePath=private-next-pages%2Fsuggestions.js&absoluteAppPath=private-next-pages%2F_app.js&absoluteDocumentPath=next%2Fdist%2Fpages%2F_document&middlewareConfigBase64=e30%3D!

        // Next.js Route Loader
        
        

        // Import the app and document modules.
        
        

        // Import the userland code.
        

        // Re-export the component (should be the default export).
        /* harmony default export */ const next_route_loaderpage_2Fsuggestions_preferredRegion_absolutePagePath_private_next_pages_2Fsuggestions_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(suggestions_namespaceObject, "default"));

        // Re-export methods.
        const getStaticProps = (0,helpers/* hoist */.l)(suggestions_namespaceObject, "getStaticProps")
        const getStaticPaths = (0,helpers/* hoist */.l)(suggestions_namespaceObject, "getStaticPaths")
        const getServerSideProps = (0,helpers/* hoist */.l)(suggestions_namespaceObject, "getServerSideProps")
        const config = (0,helpers/* hoist */.l)(suggestions_namespaceObject, "config")
        const reportWebVitals = (0,helpers/* hoist */.l)(suggestions_namespaceObject, "reportWebVitals")
        

        // Re-export legacy methods.
        const unstable_getStaticProps = (0,helpers/* hoist */.l)(suggestions_namespaceObject, "unstable_getStaticProps")
        const unstable_getStaticPaths = (0,helpers/* hoist */.l)(suggestions_namespaceObject, "unstable_getStaticPaths")
        const unstable_getStaticParams = (0,helpers/* hoist */.l)(suggestions_namespaceObject, "unstable_getStaticParams")
        const unstable_getServerProps = (0,helpers/* hoist */.l)(suggestions_namespaceObject, "unstable_getServerProps")
        const unstable_getServerSideProps = (0,helpers/* hoist */.l)(suggestions_namespaceObject, "unstable_getServerSideProps")

        // Create and export the route module that will be consumed.
        const options = {"definition":{"kind":"PAGES","page":"/suggestions","pathname":"/suggestions","bundlePath":"","filename":""}}
        const routeModule = new (module_default())({
          ...options,
          components: {
            App: _app["default"],
            Document: (_document_default()),
          },
          userland: suggestions_namespaceObject,
        })
        
        
    

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
var __webpack_exports__ = __webpack_require__.X(0, [940,812,664,4,345], () => (__webpack_exec__(8753)));
module.exports = __webpack_exports__;

})();