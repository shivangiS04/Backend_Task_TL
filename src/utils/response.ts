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

export function successResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    error: null,
    timestamp: new Date().toISOString()
  };
}

export function errorResponse(errorCode: string, message: string): ApiResponse<null> {
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
