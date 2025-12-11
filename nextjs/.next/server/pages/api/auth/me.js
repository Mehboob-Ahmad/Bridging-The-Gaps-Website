"use strict";
(() => {
var exports = {};
exports.id = 661;
exports.ids = [661];
exports.modules = {

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

/***/ 7777:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4802);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6291);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_db__WEBPACK_IMPORTED_MODULE_1__);


async function handler(req, res) {
    const cookies = (0,cookie__WEBPACK_IMPORTED_MODULE_0__.parse)(req.headers.cookie || "");
    const token = cookies["btg_token"];
    if (!token) return res.json({
        user: null
    });
    try {
        const jwt = __webpack_require__(9344);
        const data = jwt.verify(token, process.env.JWT_SECRET || "dev-secret-change-me");
        const [rows] = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("SELECT id,name,email,role,avatar,created_at FROM users WHERE id = ?", [
            data.id
        ]);
        res.json({
            user: rows[0] || null
        });
    } catch (err) {
        res.json({
            user: null
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7777));
module.exports = __webpack_exports__;

})();