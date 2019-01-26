"use strict";
exports.__esModule = true;
function errorHandlerApi(err, req, res, next) {
    console.error("API error handler foi executado: " + err);
    res.status(500).json({
        errorCode: 'ERR-001',
        message: 'Erro interno do servidor'
    });
}
exports.errorHandlerApi = errorHandlerApi;
