"use strict";
(() => {
var exports = {};
exports.id = 908;
exports.ids = [908];
exports.modules = {

/***/ 8432:
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 2418:
/***/ ((module) => {

module.exports = require("mysql2/promise");

/***/ }),

/***/ 1449:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8432);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6291);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_db__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5618);



async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({
        error: "method"
    });
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({
        error: "email and password required"
    });
    try {
        const [rows] = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query("SELECT id,name,email,role,avatar,password_hash,created_at FROM users WHERE email = ?", [
            email
        ]);
        const user = rows[0];
        if (!user) return res.status(400).json({
            error: "invalid"
        });
        const ok = await bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().compare(password, user.password_hash || "");
        if (!ok) return res.status(400).json({
            error: "invalid"
        });
        // remove password_hash from response
        delete user.password_hash;
        await (0,_utils_auth__WEBPACK_IMPORTED_MODULE_2__/* .setLoginCookie */ .ID)(res, user);
        res.json({
            ok: true,
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
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
var __webpack_exports__ = __webpack_require__.X(0, [618], () => (__webpack_exec__(1449)));
module.exports = __webpack_exports__;

})();