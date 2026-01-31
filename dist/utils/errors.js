"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = exports.NotFoundError = exports.ValidationError = exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, errorCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.name = 'AppError';
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(message) {
        super(400, 'VALIDATION_ERROR', message);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends AppError {
    constructor(message) {
        super(404, 'NOT_FOUND', message);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class InternalError extends AppError {
    constructor(message) {
        super(500, 'INTERNAL_ERROR', message);
        this.name = 'InternalError';
    }
}
exports.InternalError = InternalError;
//# sourceMappingURL=errors.js.map