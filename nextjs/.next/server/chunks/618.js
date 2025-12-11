"use strict";
exports.id = 618;
exports.ids = [618];
exports.modules = {

/***/ 6291:
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

/***/ 5618:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ag: () => (/* binding */ TOKEN_NAME),
/* harmony export */   ID: () => (/* binding */ setLoginCookie),
/* harmony export */   jU: () => (/* binding */ verifyCsrfToken)
/* harmony export */ });
/* unused harmony exports JWT_SECRET, signToken, verifyToken, getUserFromToken, createCsrfToken */
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9344);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8432);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6291);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_db__WEBPACK_IMPORTED_MODULE_2__);



const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const TOKEN_NAME = "btg_token";
function signToken(payload) {
    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, JWT_SECRET, {
        expiresIn: "7d"
    });
}
function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
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
    return jwt.sign({
        purpose: "csrf"
    }, JWT_SECRET, {
        expiresIn: "1h"
    });
}
function verifyCsrfToken(token) {
    try {
        const d = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, JWT_SECRET);
        return d && d.purpose === "csrf";
    } catch (e) {
        return false;
    }
}


/***/ })

};
;