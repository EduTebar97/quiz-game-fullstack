import type { Application } from 'express-serve-static-core';
import express from 'express';
import { configureExpress } from './config/express';

export const createApp = async (): Promise<Application> => {
  const app = express();
  configureExpress(app);

  // Basic health check route
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  return app;
};

export default createApp;