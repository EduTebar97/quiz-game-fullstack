import dotenv from 'dotenv';
import { createApp } from './src/app';
import { logger } from './src/shared/utils/logger';

// Load environment variables
dotenv.config();

const startServer = async (): Promise<void> => {
  try {
    const app = await createApp();
    const port = process.env.PORT || 8080;

    const server = app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });

    // Handle unhandled rejections
    process.on('unhandledRejection', (err) => {
      logger.error('Unhandled rejection:', err);
      server.close(() => process.exit(1));
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();