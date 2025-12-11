"use strict";
(() => {
var exports = {};
exports.id = 911;
exports.ids = [911];
exports.modules = {

/***/ 1841:
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

/***/ }),

/***/ 195:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: external "@aws-sdk/client-s3"
var client_s3_ = __webpack_require__(1841);
;// CONCATENATED MODULE: external "@aws-sdk/s3-request-presigner"
const s3_request_presigner_namespaceObject = require("@aws-sdk/s3-request-presigner");
;// CONCATENATED MODULE: ./pages/api/uploads/presign.js


async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({
        error: "method"
    });
    const { name = "", contentType = "application/octet-stream" } = req.body || {};
    const bucket = process.env.S3_BUCKET;
    if (!bucket) return res.status(400).json({
        error: "s3_not_configured"
    });
    try {
        const region = process.env.S3_REGION || "us-east-1";
        const client = new client_s3_.S3Client({
            region,
            credentials: process.env.AWS_ACCESS_KEY_ID ? {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            } : undefined
        });
        const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${name}`;
        const command = new client_s3_.PutObjectCommand({
            Bucket: bucket,
            Key: key,
            ContentType: contentType
        });
        const url = await (0,s3_request_presigner_namespaceObject.getSignedUrl)(client, command, {
            expiresIn: 3600
        });
        return res.json({
            ok: true,
            url,
            key,
            publicUrl: `https://${bucket}.s3.${region}.amazonaws.com/${key}`
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
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
var __webpack_exports__ = (__webpack_exec__(195));
module.exports = __webpack_exports__;

})();