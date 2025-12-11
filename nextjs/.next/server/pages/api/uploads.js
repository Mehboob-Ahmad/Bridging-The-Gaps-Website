"use strict";
(() => {
var exports = {};
exports.id = 746;
exports.ids = [746];
exports.modules = {

/***/ 1841:
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

/***/ }),

/***/ 6705:
/***/ ((module) => {

module.exports = import("formidable");;

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 9538:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6705);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([formidable__WEBPACK_IMPORTED_MODULE_0__]);
formidable__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const config = {
    api: {
        bodyParser: false
    }
};
async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({
        error: "method"
    });
    const form = (0,formidable__WEBPACK_IMPORTED_MODULE_0__["default"])({
        multiples: false
    });
    form.parse(req, async (err, fields, files)=>{
        if (err) return res.status(500).json({
            error: err.message
        });
        const file = files.file || files.upload;
        if (!file) return res.status(400).json({
            error: "no file"
        });
        const buffer = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(file.filepath || file.path);
        const ext = path__WEBPACK_IMPORTED_MODULE_2___default().extname(file.originalFilename || file.name || "");
        const name = Date.now() + "-" + Math.random().toString(36).slice(2, 8) + ext;
        // If S3 is configured, upload there. Otherwise save locally to public/uploads
        const S3_BUCKET = process.env.S3_BUCKET;
        if (S3_BUCKET) {
            try {
                const { S3Client, PutObjectCommand } = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 1841, 23));
                const region = process.env.S3_REGION || "us-east-1";
                const client = new S3Client({
                    region,
                    credentials: process.env.AWS_ACCESS_KEY_ID ? {
                        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
                    } : undefined
                });
                const key = name;
                await client.send(new PutObjectCommand({
                    Bucket: S3_BUCKET,
                    Key: key,
                    Body: buffer,
                    ContentType: file.mimetype
                }));
                const url = `https://${S3_BUCKET}.s3.${region}.amazonaws.com/${key}`;
                return res.json({
                    ok: true,
                    url
                });
            } catch (e) {
                console.error("S3 upload failed", e);
                return res.status(500).json({
                    error: "s3 upload failed"
                });
            }
        }
        const outPath = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), "public", "uploads", name);
        try {
            fs__WEBPACK_IMPORTED_MODULE_1___default().writeFileSync(outPath, buffer);
            return res.json({
                ok: true,
                url: "/uploads/" + name
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                error: "write failed"
            });
        }
    });
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
var __webpack_exports__ = (__webpack_exec__(9538));
module.exports = __webpack_exports__;

})();