"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
function onError(res, message, err) {
    console.log("Error: " + err);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: err });
}
exports.onError = onError;
