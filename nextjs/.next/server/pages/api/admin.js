"use strict";
(() => {
var exports = {};
exports.id = 367;
exports.ids = [367];
exports.modules = {

/***/ 8432:
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ 4802:
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 2418:
/***/ ((module) => {

module.exports = require("mysql2/promise");

/***/ }),

/***/ 8142:
/***/ ((module) => {

module.exports = import("csv-stringify/sync");;

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 7909:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4802);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6291);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_db__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9344);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5618);
/* harmony import */ var csv_stringify_sync__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8142);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([csv_stringify_sync__WEBPACK_IMPORTED_MODULE_4__]);
csv_stringify_sync__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





function requireAdmin(req, res) {
    const cookies = (0,cookie__WEBPACK_IMPORTED_MODULE_0__.parse)(req.headers.cookie || "");
    const token = cookies[_utils_auth__WEBPACK_IMPORTED_MODULE_3__/* .TOKEN_NAME */ .Ag] || cookies["btg_token"];
    if (!token) return null;
    try {
        const data = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET || "dev-secret-change-me");
        return data;
    } catch (e) {
        return null;
    }
}
async function handler(req, res) {
    const user = requireAdmin(req, res);
    if (!user || user.role !== "admin") return res.status(403).json({
        error: "forbidden"
    });
    const action = req.query.action || req.body.action || "list_users";
    try {
        if (req.method === "GET" && action === "list_users") {
            const page = Math.max(1, parseInt(req.query.page || "1"));
            const limit = Math.min(100, parseInt(req.query.limit || "20"));
            const offset = (page - 1) * limit;
            const [[countRows]] = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("SELECT COUNT(*) as total FROM users");
            const total = countRows.total || 0;
            const [rows] = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("SELECT id,name,email,avatar,role,created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?", [
                limit,
                offset
            ]);
            return res.json({
                users: rows,
                page,
                limit,
                total
            });
        }
        if (req.method === "GET" && action === "list_donations") {
            const page = Math.max(1, parseInt(req.query.page || "1"));
            const limit = Math.min(100, parseInt(req.query.limit || "20"));
            const offset = (page - 1) * limit;
            const [[countRows]] = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("SELECT COUNT(*) as total FROM donations");
            const total = countRows.total || 0;
            const [rows] = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("SELECT d.id,d.user_id,d.volunteer_id,d.amount,d.slip_path,d.created_at,u.email as user_email,v.name as volunteer_name FROM donations d LEFT JOIN users u ON d.user_id = u.id LEFT JOIN Volunteer v ON d.volunteer_id = v.volunteer_id ORDER BY d.created_at DESC LIMIT ? OFFSET ?", [
                limit,
                offset
            ]);
            return res.json({
                donations: rows,
                page,
                limit,
                total
            });
        }
        if (req.method === "GET" && action === "list_volunteers") {
            const page = Math.max(1, parseInt(req.query.page || "1"));
            const limit = Math.min(100, parseInt(req.query.limit || "20"));
            const offset = (page - 1) * limit;
            const [[countRows]] = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("SELECT COUNT(*) as total FROM Volunteer");
            const total = countRows.total || 0;
            const [rows] = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("SELECT volunteer_id,name,email,phone,Projects_completed,created_at FROM Volunteer ORDER BY created_at DESC LIMIT ? OFFSET ?", [
                limit,
                offset
            ]);
            return res.json({
                volunteers: rows,
                page,
                limit,
                total
            });
        }
        if (req.method === "GET" && action === "list_projects") {
            const page = Math.max(1, parseInt(req.query.page || "1"));
            const limit = Math.min(100, parseInt(req.query.limit || "20"));
            const offset = (page - 1) * limit;
            const [[countRows]] = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("SELECT COUNT(*) as total FROM Projects");
            const total = countRows.total || 0;
            const [rows] = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("SELECT p.project_id,p.name,p.description,p.created_at,v.name as volunteer_name FROM Projects p LEFT JOIN Volunteer v ON p.volunteer_id = v.volunteer_id ORDER BY p.created_at DESC LIMIT ? OFFSET ?", [
                limit,
                offset
            ]);
            return res.json({
                projects: rows,
                page,
                limit,
                total
            });
        }
        // export users as CSV
        if (req.method === "GET" && action === "export_users") {
            const [rows] = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("SELECT id,name,email,role,avatar,created_at FROM users ORDER BY created_at DESC");
            const csv = (0,csv_stringify_sync__WEBPACK_IMPORTED_MODULE_4__.stringify)(rows, {
                header: true
            });
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", 'attachment; filename="users.csv"');
            return res.send(csv);
        }
        // export donations as CSV
        if (req.method === "GET" && action === "export_donations") {
            const [rows] = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("SELECT id,user_id,amount,slip_path,created_at FROM donations ORDER BY created_at DESC");
            const csv = (0,csv_stringify_sync__WEBPACK_IMPORTED_MODULE_4__.stringify)(rows, {
                header: true
            });
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", 'attachment; filename="donations.csv"');
            return res.send(csv);
        }
        if (req.method === "POST" && action === "delete_user") {
            const csrf = req.headers["x-csrf-token"] || req.body.csrf || "";
            if (!(0,_utils_auth__WEBPACK_IMPORTED_MODULE_3__/* .verifyCsrfToken */ .jU)(csrf)) return res.status(403).json({
                error: "invalid_csrf"
            });
            const id = req.body.id;
            if (!id) return res.status(400).json({
                error: "id required"
            });
            await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("DELETE FROM users WHERE id = ?", [
                id
            ]);
            return res.json({
                ok: true
            });
        }
        if (req.method === "POST" && action === "promote_user") {
            const csrf = req.headers["x-csrf-token"] || req.body.csrf || "";
            if (!(0,_utils_auth__WEBPACK_IMPORTED_MODULE_3__/* .verifyCsrfToken */ .jU)(csrf)) return res.status(403).json({
                error: "invalid_csrf"
            });
            const id = req.body.id;
            if (!id) return res.status(400).json({
                error: "id required"
            });
            await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("UPDATE users SET role = ? WHERE id = ?", [
                "admin",
                id
            ]);
            return res.json({
                ok: true
            });
        }
        if (req.method === "POST" && action === "demote_user") {
            const csrf = req.headers["x-csrf-token"] || req.body.csrf || "";
            if (!(0,_utils_auth__WEBPACK_IMPORTED_MODULE_3__/* .verifyCsrfToken */ .jU)(csrf)) return res.status(403).json({
                error: "invalid_csrf"
            });
            const id = req.body.id;
            if (!id) return res.status(400).json({
                error: "id required"
            });
            await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("UPDATE users SET role = ? WHERE id = ?", [
                "user",
                id
            ]);
            return res.json({
                ok: true
            });
        }
        if (req.method === "POST" && action === "delete_donation") {
            const csrf = req.headers["x-csrf-token"] || req.body.csrf || "";
            if (!(0,_utils_auth__WEBPACK_IMPORTED_MODULE_3__/* .verifyCsrfToken */ .jU)(csrf)) return res.status(403).json({
                error: "invalid_csrf"
            });
            const id = req.body.id;
            if (!id) return res.status(400).json({
                error: "id required"
            });
            // remove slip file path if exists
            const [rows] = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("SELECT slip_path FROM donations WHERE id = ?", [
                id
            ]);
            if (rows[0] && rows[0].slip_path) {
                const path = rows[0].slip_path.replace(/^\//, "");
                try {
                    (__webpack_require__(7147).unlinkSync)((__webpack_require__(1017).join)(process.cwd(), "public", path));
                } catch (e) {}
            }
            await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("DELETE FROM donations WHERE id = ?", [
                id
            ]);
            return res.json({
                ok: true
            });
        }
        return res.status(400).json({
            error: "unknown action"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [618], () => (__webpack_exec__(7909)));
module.exports = __webpack_exports__;

})();