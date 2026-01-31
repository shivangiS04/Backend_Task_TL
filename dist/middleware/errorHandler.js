"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const errors_1 = require("../utils/errors");
const response_1 = require("../utils/response");
function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    if (err instanceof errors_1.AppError) {
        return res.status(err.statusCode).json((0, response_1.errorResponse)(err.errorCode, err.message));
    }
    const internalError = new errors_1.InternalError('An unexpected error occurred');
    res.status(500).json((0, response_1.errorResponse)(internalError.errorCode, internalError.message));
}
//# sourceMappingURL=errorHandler.js.map