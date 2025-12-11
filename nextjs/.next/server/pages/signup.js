"use strict";
(() => {
var exports = {};
exports.id = 616;
exports.ids = [616,660];
exports.modules = {

/***/ 8353:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderpage_2Fsignup_preferredRegion_absolutePagePath_private_next_pages_2Fsignup_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_),
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

// NAMESPACE OBJECT: ./pages/signup.js
var signup_namespaceObject = {};
__webpack_require__.r(signup_namespaceObject);
__webpack_require__.d(signup_namespaceObject, {
  "default": () => (Signup)
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
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./components/Layout.js
var Layout = __webpack_require__(7345);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./pages/signup.js






function Signup() {
    const [name, setName] = (0,external_react_.useState)("");
    const [email, setEmail] = (0,external_react_.useState)("");
    const [password, setPassword] = (0,external_react_.useState)("");
    const [confirm, setConfirm] = (0,external_react_.useState)("");
    const [status, setStatus] = (0,external_react_.useState)("");
    const router = (0,router_.useRouter)();
    async function submit(e) {
        e.preventDefault();
        if (password !== confirm) {
            setStatus("Passwords do not match.");
            return;
        }
        setStatus("Creating account...");
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            const data = await res.json();
            if (!res.ok) {
                setStatus(data.error || "Signup failed");
                return;
            }
            setStatus("Account created! Redirecting…");
            router.push("/");
        } catch (err) {
            console.error(err);
            setStatus("Network error — please try again.");
        }
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(Layout/* default */.Z, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx((head_default()), {
                children: /*#__PURE__*/ jsx_runtime.jsx("title", {
                    children: "Sign Up — BRIDGING THE GAPS"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx("main", {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                    className: "form-card",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("h2", {
                            children: "Create an account"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("p", {
                            children: "Please provide your name, email, and a password."
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                            onSubmit: submit,
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx("label", {
                                    htmlFor: "suName",
                                    children: "Full name"
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("input", {
                                    id: "suName",
                                    value: name,
                                    onChange: (e)=>setName(e.target.value),
                                    required: true
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("label", {
                                    htmlFor: "suEmail",
                                    children: "Email"
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("input", {
                                    id: "suEmail",
                                    type: "email",
                                    value: email,
                                    onChange: (e)=>setEmail(e.target.value),
                                    required: true
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("label", {
                                    htmlFor: "suPassword",
                                    children: "Password"
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("input", {
                                    id: "suPassword",
                                    type: "password",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    required: true
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("label", {
                                    htmlFor: "suPassword2",
                                    children: "Confirm password"
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("input", {
                                    id: "suPassword2",
                                    type: "password",
                                    value: confirm,
                                    onChange: (e)=>setConfirm(e.target.value),
                                    required: true
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: "form-actions",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("button", {
                                            type: "submit",
                                            className: "primary",
                                            children: "Create account"
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                            href: "/login",
                                            children: "Have an account? Login"
                                        })
                                    ]
                                }),
                                status && /*#__PURE__*/ jsx_runtime.jsx("div", {
                                    style: {
                                        marginTop: 8,
                                        color: status.startsWith("Account") ? "#16a34a" : "#ef4444"
                                    },
                                    children: status
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?page=%2Fsignup&preferredRegion=&absolutePagePath=private-next-pages%2Fsignup.js&absoluteAppPath=private-next-pages%2F_app.js&absoluteDocumentPath=next%2Fdist%2Fpages%2F_document&middlewareConfigBase64=e30%3D!

        // Next.js Route Loader
        
        

        // Import the app and document modules.
        
        

        // Import the userland code.
        

        // Re-export the component (should be the default export).
        /* harmony default export */ const next_route_loaderpage_2Fsignup_preferredRegion_absolutePagePath_private_next_pages_2Fsignup_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(signup_namespaceObject, "default"));

        // Re-export methods.
        const getStaticProps = (0,helpers/* hoist */.l)(signup_namespaceObject, "getStaticProps")
        const getStaticPaths = (0,helpers/* hoist */.l)(signup_namespaceObject, "getStaticPaths")
        const getServerSideProps = (0,helpers/* hoist */.l)(signup_namespaceObject, "getServerSideProps")
        const config = (0,helpers/* hoist */.l)(signup_namespaceObject, "config")
        const reportWebVitals = (0,helpers/* hoist */.l)(signup_namespaceObject, "reportWebVitals")
        

        // Re-export legacy methods.
        const unstable_getStaticProps = (0,helpers/* hoist */.l)(signup_namespaceObject, "unstable_getStaticProps")
        const unstable_getStaticPaths = (0,helpers/* hoist */.l)(signup_namespaceObject, "unstable_getStaticPaths")
        const unstable_getStaticParams = (0,helpers/* hoist */.l)(signup_namespaceObject, "unstable_getStaticParams")
        const unstable_getServerProps = (0,helpers/* hoist */.l)(signup_namespaceObject, "unstable_getServerProps")
        const unstable_getServerSideProps = (0,helpers/* hoist */.l)(signup_namespaceObject, "unstable_getServerSideProps")

        // Create and export the route module that will be consumed.
        const options = {"definition":{"kind":"PAGES","page":"/signup","pathname":"/signup","bundlePath":"","filename":""}}
        const routeModule = new (module_default())({
          ...options,
          components: {
            App: _app["default"],
            Document: (_document_default()),
          },
          userland: signup_namespaceObject,
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

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

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
var __webpack_exports__ = __webpack_require__.X(0, [940,812,664,4,345], () => (__webpack_exec__(8353)));
module.exports = __webpack_exports__;

})();