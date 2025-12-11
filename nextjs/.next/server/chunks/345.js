"use strict";
exports.id = 345;
exports.ids = [345];
exports.modules = {

/***/ 7345:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);



const NAV_LINKS = [
    {
        href: "/#about",
        label: "About Us"
    },
    {
        href: "/#awareness",
        label: "Awareness"
    },
    {
        href: "/collaborators",
        label: "Collaborators"
    },
    {
        href: "/projects",
        label: "Our Projects"
    },
    {
        href: "/suggestions",
        label: "Suggestions"
    },
    {
        href: "/#donations",
        label: "Donations"
    }
];
function Layout({ children, fixedFooter = false }) {
    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let mounted = true;
        fetch("/api/auth/me").then((res)=>res.json()).then((data)=>{
            if (!mounted) return;
            setUser(data?.user || null);
        }).catch(()=>{});
        return ()=>{
            mounted = false;
        };
    }, []);
    async function handleLogout() {
        if (false) {}
        try {
            await fetch("/api/auth/logout", {
                method: "POST"
            });
        } catch (err) {
            console.error(err);
        } finally{
            setUser(null);
        }
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
                className: "container",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                id: "logo",
                                src: "/images/LOGO.jpg",
                                alt: "BRIDGING THE GAPS logo"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                children: "BRIDGING THE GAPS"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("nav", {
                        "aria-label": "Primary navigation",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                            children: NAV_LINKS.map((link)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                        href: link.href,
                                        children: link.label
                                    })
                                }, link.href))
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "auth-area",
                        children: user ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            id: "userAvatar",
                            className: "user-avatar",
                            src: user.avatar || "/images/LOGO.jpg",
                            alt: user.name || user.email || "Account",
                            title: "Click to logout",
                            onClick: handleLogout
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            id: "authArea",
                            className: "auth-actions",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                    href: "/login",
                                    className: "auth-btn",
                                    children: "Login"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                    href: "/signup",
                                    className: "auth-btn",
                                    style: {
                                        background: "#0ea5a4"
                                    },
                                    children: "Register"
                                })
                            ]
                        })
                    })
                ]
            }),
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("footer", {
                className: `site-footer ${fixedFooter ? "fixed" : ""}`,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "container",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "https://www.instagram.com/bridging.the.gaps/?hl=en",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            "aria-label": "Instagram",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                src: "/images/Insta_logo-removebg-preview.png",
                                alt: "Instagram"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                            href: "mailto:unsdg10@gmail.com",
                            className: "email-link",
                            "aria-label": "Email unsdg10",
                            children: [
                                "Contact: ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    style: {
                                        marginLeft: 6,
                                        textDecoration: "underline"
                                    },
                                    children: "unsdg10@gmail.com"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "site-credit",
                            style: {
                                textAlign: "right"
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    children: [
                                        "Website designed by ",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                            children: "MA Services"
                                        }),
                                        "."
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "https://www.instagram.com/ma_services_2025/",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    "aria-label": "MA Services Instagram",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "/images/MA Services LOGO.jpg",
                                        alt: "MA Services Logo",
                                        style: {
                                            marginTop: 6
                                        }
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    children: [
                                        "\xa9 ",
                                        new Date().getFullYear(),
                                        " BRIDGING THE GAPS. All rights reserved"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/***/ })

};
;