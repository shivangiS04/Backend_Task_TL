"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
function successResponse(data) {
    return {
        success: true,
        data,
        error: null,
        timestamp: new Date().toISOString()
    };
}
function errorResponse(errorCode, message) {
    return {
        success: false,
        data: null,
        error: {
            errorCode,
            message,
            timestamp: new Date().toISOString()
        },
        timestamp: new Date().toISOString()
    };
}
//# sourceMappingURL=response.js.map