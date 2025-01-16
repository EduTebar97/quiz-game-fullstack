import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public errors?: any[]
  ) {
    super(message);
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.code,
      errors: err.errors
    });
    return;
  }

  if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 'error',
      message: 'Validation Error',
      errors: Object.values(err).map((e: any) => ({
        field: e.path,
        message: e.message
      }))
    });
    return;
  }

  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
    return;
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};