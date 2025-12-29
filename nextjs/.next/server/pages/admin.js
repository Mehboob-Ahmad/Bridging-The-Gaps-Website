"use strict";
(() => {
var exports = {};
exports.id = 964;
exports.ids = [964,660];
exports.modules = {

/***/ 8996:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderpage_2Fadmin_preferredRegion_absolutePagePath_private_next_pages_2Fadmin_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ next_route_loaderpage_2Fadmin_preferredRegion_absolutePagePath_private_next_pages_2Fadmin_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_getServerSideProps),
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

// NAMESPACE OBJECT: ./pages/admin.js
var admin_namespaceObject = {};
__webpack_require__.r(admin_namespaceObject);
__webpack_require__.d(admin_namespaceObject, {
  "default": () => (Admin),
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
// EXTERNAL MODULE: ./lib/db.js
var db = __webpack_require__(3125);
var db_default = /*#__PURE__*/__webpack_require__.n(db);
;// CONCATENATED MODULE: external "jsonwebtoken"
const external_jsonwebtoken_namespaceObject = require("jsonwebtoken");
var external_jsonwebtoken_default = /*#__PURE__*/__webpack_require__.n(external_jsonwebtoken_namespaceObject);
;// CONCATENATED MODULE: external "bcryptjs"
const external_bcryptjs_namespaceObject = require("bcryptjs");
;// CONCATENATED MODULE: ./utils/auth.js



const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const TOKEN_NAME = "btg_token";
function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d"
    });
}
function verifyToken(token) {
    try {
        return external_jsonwebtoken_default().verify(token, JWT_SECRET);
    } catch (e) {
        return null;
    }
}
async function setLoginCookie(res, user) {
    const token = signToken({
        id: user.id,
        email: user.email,
        role: user.role
    });
    // set httpOnly cookie
    res.setHeader("Set-Cookie", `${TOKEN_NAME}=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`);
}
async function getUserFromToken(token) {
    const data = verifyToken(token);
    if (!data) return null;
    const [rows] = await pool.query("SELECT id,name,email,role,avatar,created_at FROM users WHERE id = ?", [
        data.id
    ]);
    return rows[0] || null;
}
function createCsrfToken() {
    // short-lived CSRF token signed with the same secret
    return external_jsonwebtoken_default().sign({
        purpose: "csrf"
    }, JWT_SECRET, {
        expiresIn: "1h"
    });
}
function verifyCsrfToken(token) {
    try {
        const d = jwt.verify(token, JWT_SECRET);
        return d && d.purpose === "csrf";
    } catch (e) {
        return false;
    }
}

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./components/Layout.js
var Layout = __webpack_require__(7345);
;// CONCATENATED MODULE: ./pages/admin.js






function Admin({ users: initialUsers = [], donations: initialDonations = [], volunteers: initialVolunteers = [], projects: initialProjects = [], reviews: initialReviews = [], page = 1, limit = 20, csrf = "" }) {
    const [users, setUsers] = (0,external_react_.useState)(initialUsers);
    const [donations, setDonations] = (0,external_react_.useState)(initialDonations);
    const [volunteers, setVolunteers] = (0,external_react_.useState)(initialVolunteers);
    const [projects, setProjects] = (0,external_react_.useState)(initialProjects);
    const [reviews, setReviews] = (0,external_react_.useState)(initialReviews || []);
    async function postAction(action, payload) {
        const csrf =  false ? 0 : "";
        const res = await fetch("/api/admin?action=" + encodeURIComponent(action), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrf || ""
            },
            body: JSON.stringify(payload)
        });
        return res.json();
    }
    async function promote(id) {
        await postAction("promote_user", {
            id
        });
        const updated = users.map((u)=>u.id === id ? {
                ...u,
                role: "admin"
            } : u);
        setUsers(updated);
    }
    async function demote(id) {
        await postAction("demote_user", {
            id
        });
        const updated = users.map((u)=>u.id === id ? {
                ...u,
                role: "user"
            } : u);
        setUsers(updated);
    }
    async function delUser(id) {
        if (!confirm("Delete user?")) return;
        await postAction("delete_user", {
            id
        });
        setUsers(users.filter((u)=>u.id !== id));
    }
    async function delDonation(id) {
        if (!confirm("Delete donation?")) return;
        await postAction("delete_donation", {
            id
        });
        setDonations(donations.filter((d)=>d.id !== id));
    }
    async function delReview(id) {
        if (!confirm("Delete review?")) return;
        await postAction("delete_review", {
            id
        });
        setReviews(reviews.filter((r)=>r.id !== id));
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(Layout/* default */.Z, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("title", {
                        children: "Admin — BRIDGING THE GAPS"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("meta", {
                        name: "csrf-token",
                        content: csrf || ""
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("main", {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("h1", {
                                children: "Admin Dashboard"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("p", {
                                className: "muted",
                                children: "Manage registered users and review recorded donations."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                children: "Reviews"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                style: {
                                    marginBottom: 10
                                },
                                children: /*#__PURE__*/ jsx_runtime.jsx("a", {
                                    className: "btn",
                                    href: "/api/admin?action=export_reviews",
                                    children: "Export Reviews CSV"
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("table", {
                                style: {
                                    width: "100%"
                                },
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("thead", {
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("tr", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Name"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Rating"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Message"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Created"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Actions"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("tbody", {
                                        children: reviews.length === 0 ? /*#__PURE__*/ jsx_runtime.jsx("tr", {
                                            children: /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                colSpan: 5,
                                                className: "muted",
                                                children: "No reviews"
                                            })
                                        }) : reviews.map((r)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("tr", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: r.name
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: r.rating
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: r.message.length > 80 ? r.message.substring(0, 80) + "..." : r.message
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: r.created_at
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: /*#__PURE__*/ jsx_runtime.jsx("button", {
                                                            onClick: ()=>delReview(r.id),
                                                            children: "Delete"
                                                        })
                                                    })
                                                ]
                                            }, r.id))
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                children: "Users"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                style: {
                                    marginBottom: 10
                                },
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("a", {
                                        className: "btn",
                                        href: "/api/admin?action=export_users",
                                        children: "Export Users CSV"
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("a", {
                                        className: "btn",
                                        style: {
                                            marginLeft: 8
                                        },
                                        href: "/api/admin?action=export_donations",
                                        children: "Export Donations CSV"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("table", {
                                style: {
                                    width: "100%"
                                },
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("thead", {
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("tr", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Email"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Name"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Role"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Created"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Actions"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("tbody", {
                                        children: users.map((u)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("tr", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: u.email
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: u.name
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: u.role
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: u.created_at
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("td", {
                                                        children: [
                                                            u.role !== "admin" ? /*#__PURE__*/ jsx_runtime.jsx("button", {
                                                                onClick: ()=>promote(u.id),
                                                                children: "Promote"
                                                            }) : /*#__PURE__*/ jsx_runtime.jsx("button", {
                                                                onClick: ()=>demote(u.id),
                                                                children: "Demote"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("button", {
                                                                onClick: ()=>delUser(u.id),
                                                                style: {
                                                                    marginLeft: 8
                                                                },
                                                                children: "Delete"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }, u.id))
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                children: "Donations"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("table", {
                                style: {
                                    width: "100%"
                                },
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("thead", {
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("tr", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Amount"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "User"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Volunteer"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Slip"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Created"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Actions"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("tbody", {
                                        children: donations.map((d)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("td", {
                                                        children: [
                                                            "RS ",
                                                            d.amount
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: d.user_email || "-"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: d.volunteer_name || "-"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: d.slip_path ? /*#__PURE__*/ jsx_runtime.jsx("a", {
                                                            href: d.slip_path,
                                                            children: "view"
                                                        }) : "-"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: d.created_at
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: /*#__PURE__*/ jsx_runtime.jsx("button", {
                                                            onClick: ()=>delDonation(d.id),
                                                            children: "Delete"
                                                        })
                                                    })
                                                ]
                                            }, d.id))
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                children: "Volunteers"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("table", {
                                style: {
                                    width: "100%"
                                },
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("thead", {
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("tr", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Name"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Email"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Phone"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Projects Completed"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Created"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("tbody", {
                                        children: volunteers.map((v)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("tr", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: v.name
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: v.email
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: v.phone || "-"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: v.Projects_completed
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: v.created_at
                                                    })
                                                ]
                                            }, v.volunteer_id))
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                children: "Projects"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("table", {
                                style: {
                                    width: "100%"
                                },
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("thead", {
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("tr", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Name"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Description"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Volunteer"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("th", {
                                                    children: "Created"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("tbody", {
                                        children: projects.map((p)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("tr", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: p.name
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: p.description ? p.description.length > 50 ? p.description.substring(0, 50) + "..." : p.description : "-"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: p.volunteer_name || "-"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("td", {
                                                        children: p.created_at
                                                    })
                                                ]
                                            }, p.project_id))
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
async function getServerSideProps({ req, res, query }) {
    // check cookie token
    const cookies = (__webpack_require__(4802).parse)(req.headers.cookie || "");
    const token = cookies["btg_token"];
    if (!token) return {
        redirect: {
            destination: "/login",
            permanent: false
        }
    };
    const data = verifyToken(token);
    if (!data || data.role !== "admin") return {
        redirect: {
            destination: "/login",
            permanent: false
        }
    };
    const page = Math.max(1, parseInt(query.page || "1"));
    const limit = Math.min(100, parseInt(query.limit || "20"));
    const offset = (page - 1) * limit;
    const [[users], [donations], [volunteers], [projects], [reviews]] = await Promise.all([
        db_default().query("SELECT id,name,email,avatar,role,created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?", [
            limit,
            offset
        ]),
        db_default().query("SELECT d.id,d.user_id,d.volunteer_id,d.amount,d.slip_path,d.created_at,u.email as user_email,v.name as volunteer_name FROM donations d LEFT JOIN users u ON d.user_id = u.id LEFT JOIN Volunteer v ON d.volunteer_id = v.volunteer_id ORDER BY d.created_at DESC LIMIT ? OFFSET ?", [
            limit,
            offset
        ]),
        db_default().query("SELECT volunteer_id,name,email,phone,Projects_completed,created_at FROM Volunteer ORDER BY created_at DESC LIMIT ? OFFSET ?", [
            limit,
            offset
        ]),
        db_default().query("SELECT p.project_id,p.name,p.description,p.created_at,v.name as volunteer_name FROM Projects p LEFT JOIN Volunteer v ON p.volunteer_id = v.volunteer_id ORDER BY p.created_at DESC LIMIT ? OFFSET ?", [
            limit,
            offset
        ]),
        db_default().query("SELECT id,name,rating,message,created_at FROM reviews ORDER BY created_at DESC LIMIT ?", [
            limit
        ])
    ]);
    const csrf = createCsrfToken();
    return {
        props: {
            users,
            donations,
            volunteers,
            projects,
            reviews,
            page,
            limit,
            csrf
        }
    };
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?page=%2Fadmin&preferredRegion=&absolutePagePath=private-next-pages%2Fadmin.js&absoluteAppPath=private-next-pages%2F_app.js&absoluteDocumentPath=next%2Fdist%2Fpages%2F_document&middlewareConfigBase64=e30%3D!

        // Next.js Route Loader
        
        

        // Import the app and document modules.
        
        

        // Import the userland code.
        

        // Re-export the component (should be the default export).
        /* harmony default export */ const next_route_loaderpage_2Fadmin_preferredRegion_absolutePagePath_private_next_pages_2Fadmin_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(admin_namespaceObject, "default"));

        // Re-export methods.
        const getStaticProps = (0,helpers/* hoist */.l)(admin_namespaceObject, "getStaticProps")
        const getStaticPaths = (0,helpers/* hoist */.l)(admin_namespaceObject, "getStaticPaths")
        const next_route_loaderpage_2Fadmin_preferredRegion_absolutePagePath_private_next_pages_2Fadmin_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_next_2Fdist_2Fpages_2F_document_middlewareConfigBase64_e30_3D_getServerSideProps = (0,helpers/* hoist */.l)(admin_namespaceObject, "getServerSideProps")
        const config = (0,helpers/* hoist */.l)(admin_namespaceObject, "config")
        const reportWebVitals = (0,helpers/* hoist */.l)(admin_namespaceObject, "reportWebVitals")
        

        // Re-export legacy methods.
        const unstable_getStaticProps = (0,helpers/* hoist */.l)(admin_namespaceObject, "unstable_getStaticProps")
        const unstable_getStaticPaths = (0,helpers/* hoist */.l)(admin_namespaceObject, "unstable_getStaticPaths")
        const unstable_getStaticParams = (0,helpers/* hoist */.l)(admin_namespaceObject, "unstable_getStaticParams")
        const unstable_getServerProps = (0,helpers/* hoist */.l)(admin_namespaceObject, "unstable_getServerProps")
        const unstable_getServerSideProps = (0,helpers/* hoist */.l)(admin_namespaceObject, "unstable_getServerSideProps")

        // Create and export the route module that will be consumed.
        const options = {"definition":{"kind":"PAGES","page":"/admin","pathname":"/admin","bundlePath":"","filename":""}}
        const routeModule = new (module_default())({
          ...options,
          components: {
            App: _app["default"],
            Document: (_document_default()),
          },
          userland: admin_namespaceObject,
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

/***/ 4802:
/***/ ((module) => {

module.exports = require("cookie");

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
var __webpack_exports__ = __webpack_require__.X(0, [940,812,664,4,345], () => (__webpack_exec__(8996)));
module.exports = __webpack_exports__;

})();