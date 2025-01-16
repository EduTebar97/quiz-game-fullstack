// src/shared/types/error.ts
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
  
  // src/shared/middlewares/errorHandler.ts
  import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
  import { ApiError } from '@/shared/types/error';
  import { logger } from '@/shared/utils/logger';
  
  export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.error(err);
  
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
        code: err.code,
        errors: err.errors
      });
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation Error',
        errors: Object.values(err).map((e: any) => ({
          field: e.path,
          message: e.message
        }))
      });
    }
  
    // JWT error
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token'
      });
    }
  
    // Default error
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  };