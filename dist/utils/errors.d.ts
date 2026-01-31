export declare class AppError extends Error {
    statusCode: number;
    errorCode: string;
    constructor(statusCode: number, errorCode: string, message: string);
}
export declare class ValidationError extends AppError {
    constructor(message: string);
}
export declare class NotFoundError extends AppError {
    constructor(message: string);
}
export declare class InternalError extends AppError {
    constructor(message: string);
}
//# sourceMappingURL=errors.d.ts.map