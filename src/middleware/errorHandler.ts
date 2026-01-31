import { Request, Response, NextFunction } from 'express';
import { AppError, InternalError } from '../utils/errors';
import { errorResponse } from '../utils/response';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(
      errorResponse(err.errorCode, err.message)
    );
  }

  const internalError = new InternalError('An unexpected error occurred');
  res.status(500).json(
    errorResponse(internalError.errorCode, internalError.message)
  );
}
