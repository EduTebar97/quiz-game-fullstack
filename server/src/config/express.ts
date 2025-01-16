import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { errorHandler } from '../shared/middlewares/errorHandler';

export const configureExpress = (app: express.Application): void => {
  // Security middleware
  app.use(helmet());
  
  // CORS configuration
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }));
  
  // Body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Compression
  app.use(compression());
  
  // Logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  
  // Error handling
  app.use(errorHandler);
};