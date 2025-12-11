"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405,660];
exports.modules = {

/***/ 2142:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderpage_2F_preferredRegion_absolutePagePath_private_next_pages_2Findex_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_),
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

// NAMESPACE OBJECT: ./pages/index.js
var pages_namespaceObject = {};
__webpack_require__.r(pages_namespaceObject);
__webpack_require__.d(pages_namespaceObject, {
  "default": () => (Home)
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
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./components/DonationWidget.js


const STORAGE_KEY = "btg_donation_total";
const DEFAULT_TOTAL = 5699;
function DonationWidget() {
    const [total, setTotal] = (0,external_react_.useState)(()=>DEFAULT_TOTAL);
    (0,external_react_.useEffect)(()=>{
        if (true) return;
        try {
            const saved = Number(localStorage.getItem(STORAGE_KEY));
            if (!Number.isNaN(saved) && saved > 0) {
                setTotal(saved);
            } else {
                localStorage.setItem(STORAGE_KEY, String(DEFAULT_TOTAL));
            }
        } catch  {
        /* ignore */ }
    }, []);
    (0,external_react_.useEffect)(()=>{
        if (true) return;
        try {
            localStorage.setItem(STORAGE_KEY, String(total));
        } catch  {
        /* ignore */ }
    }, [
        total
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "donation-total-box",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "donation-total-label",
                children: "Total raised"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "donation-amount",
                children: [
                    "RS ",
                    total.toLocaleString()
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/DonationSlipUpload.js


function DonationSlipUpload() {
    const [previewUrl, setPreviewUrl] = (0,external_react_.useState)("");
    const [info, setInfo] = (0,external_react_.useState)("");
    const inputRef = (0,external_react_.useRef)(null);
    (0,external_react_.useEffect)(()=>{
        return ()=>{
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [
        previewUrl
    ]);
    function handleFileChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file (jpg, png, etc.).");
            e.target.value = "";
            return;
        }
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setInfo(`Selected: ${file.name} — ${(file.size / 1024).toFixed(1)} KB`);
    }
    function clearSelection() {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl("");
        setInfo("");
        if (inputRef.current) inputRef.current.value = "";
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "donation-slip-upload",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("label", {
                htmlFor: "donationSlipUpload",
                children: "Choose slip image (JPG/PNG):"
            }),
            /*#__PURE__*/ jsx_runtime.jsx("input", {
                id: "donationSlipUpload",
                ref: inputRef,
                type: "file",
                accept: "image/*",
                onChange: handleFileChange
            }),
            previewUrl && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                style: {
                    marginTop: 12
                },
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("img", {
                        src: previewUrl,
                        alt: "Donation slip preview",
                        style: {
                            maxWidth: "100%",
                            maxHeight: 360,
                            border: "1px solid #ccc",
                            borderRadius: 6
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                        style: {
                            fontSize: "0.9rem",
                            color: "#333",
                            marginTop: 8
                        },
                        children: info
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("button", {
                        type: "button",
                        onClick: clearSelection,
                        children: "Clear Slip"
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./pages/index.js





const AWARENESS_IMAGES = Array.from({
    length: 15
}, (_, idx)=>`/images/${idx + 1}.png`);
function Home() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(Layout/* default */.Z, {
        fixedFooter: true,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("title", {
                        children: "BRIDGING THE GAPS"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("meta", {
                        name: "description",
                        content: "Community donations, volunteering and local projects — Bridging the Gaps"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("link", {
                        rel: "icon",
                        href: "/images/LOGO-removebg-preview.png"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("main", {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                        id: "about",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                children: "About Us"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("p", {
                                children: "Discrimination and inequality have long existed in Pakistan across various sectors; however, we, as a team, believe that for a tree to grow and be stable enough to provide shade and fruit, it is essential to first plant a seed in fertile soil. We, as a team, hope that our platform, Bridging the Gap, becomes the fertile soil that is required for meaningful change to take root."
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                className: "pdf-section",
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("strong", {
                                            children: "Community Purpose (PDF):"
                                        }),
                                        " ",
                                        /*#__PURE__*/ jsx_runtime.jsx("a", {
                                            id: "communityPdfLink",
                                            href: "/documents/COMMUNITY PURPOSE.pdf",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            children: "Open / Download the PDF"
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                        id: "awareness",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                children: "Awareness"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                className: "awareness-images",
                                children: AWARENESS_IMAGES.map((src)=>/*#__PURE__*/ jsx_runtime.jsx("img", {
                                        src: src,
                                        alt: "Awareness"
                                    }, src))
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                        id: "donations",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("h1", {
                                children: "Donations"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("p", {
                                children: "Your support helps us continue our mission. We accept donations in the following forms:"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("li", {
                                        children: "Monetary Donations: You can donate in the SADAPAY account given."
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("li", {
                                        children: "In-Kind Donations: We accept bags, stationery, or food items for the needy."
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("li", {
                                        children: "Volunteer Time: Your time and skills are valuable to us."
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                children: "Total Donations Raised"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(DonationWidget, {}),
                            /*#__PURE__*/ jsx_runtime.jsx("h3", {
                                children: "SADAPAY ACCOUNT"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("h4", {
                                children: "MEHBOOB AHMAD SADIQ"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("p", {
                                children: "Account no.: 03276035376"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("p", {
                                children: "IBAN: PK79SADA0000003276035376"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("h5", {
                                children: "Kindly upload the receipt after donations (image):"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(DonationSlipUpload, {}),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                                id: "volunteer",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                        children: "Volunteer"
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                                        children: "We are always looking for volunteers to help us with our projects. If you are interested in volunteering, please feel free to contact us."
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("a", {
                                        href: "https://forms.gle/W1Fm5rssrx7JE7AS6",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        children: /*#__PURE__*/ jsx_runtime.jsx("button", {
                                            type: "button",
                                            children: "Volunteer Form"
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?page=%2F&preferredRegion=&absolutePagePath=private-next-pages%2Findex.js&absoluteAppPath=private-next-pages%2F_app.js&absoluteDocumentPath=next%2Fdist%2Fpages%2F_document&middlewareConfigBase64=e30%3D!

        // Next.js Route Loader
        
        

        // Import the app and document modules.
        
        

        // Import the userland code.
        

        // Re-export the component (should be the default export).
        /* harmony default export */ const next_route_loaderpage_2F_preferredRegion_absolutePagePath_private_next_pages_2Findex_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(pages_namespaceObject, "default"));

        // Re-export methods.
        const getStaticProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "getStaticProps")
        const getStaticPaths = (0,helpers/* hoist */.l)(pages_namespaceObject, "getStaticPaths")
        const getServerSideProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "getServerSideProps")
        const config = (0,helpers/* hoist */.l)(pages_namespaceObject, "config")
        const reportWebVitals = (0,helpers/* hoist */.l)(pages_namespaceObject, "reportWebVitals")
        

        // Re-export legacy methods.
        const unstable_getStaticProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getStaticProps")
        const unstable_getStaticPaths = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getStaticPaths")
        const unstable_getStaticParams = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getStaticParams")
        const unstable_getServerProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getServerProps")
        const unstable_getServerSideProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getServerSideProps")

        // Create and export the route module that will be consumed.
        const options = {"definition":{"kind":"PAGES","page":"/index","pathname":"/","bundlePath":"","filename":""}}
        const routeModule = new (module_default())({
          ...options,
          components: {
            App: _app["default"],
            Document: (_document_default()),
          },
          userland: pages_namespaceObject,
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
var __webpack_exports__ = __webpack_require__.X(0, [940,812,664,4,345], () => (__webpack_exec__(2142)));
module.exports = __webpack_exports__;

})();