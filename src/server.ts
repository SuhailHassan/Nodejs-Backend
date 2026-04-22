// src/server.ts
import app from './app';
import { connectDB } from './config/db';
import { ENV } from './config/env';

const startServer = async () => {
  try {
    // Connect DB
    await connectDB();
    console.log('MongoDB Connected');

    // Start Server
    const server = app.listen(Number(ENV.PORT), '0.0.0.0', () => {
      console.log(`Server running on port ${ENV.PORT}`);
    });

    // Graceful Shutdown
    const shutdown = (signal: string) => {
      console.log(`Received ${signal}. Closing server...`);
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();