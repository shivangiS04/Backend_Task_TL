export interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    error: ErrorResponse | null;
    timestamp: string;
}
export interface ErrorResponse {
    errorCode: string;
    message: string;
    timestamp: string;
}
export declare function successResponse<T>(data: T): ApiResponse<T>;
export declare function errorResponse(errorCode: string, message: string): ApiResponse<null>;
//# sourceMappingURL=response.d.ts.map