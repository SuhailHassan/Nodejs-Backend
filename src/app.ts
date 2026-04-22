// src/app.ts
import express from 'express';
import cors, { CorsOptions } from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import authRoutes from './modules/auth/auth.routes';
import productRoutes from './modules/product/product.routes';

import { errorHandler } from './middlewares/error.middleware';
import { authMiddleware } from './middlewares/auth.middleware';


const app = express();

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit per IP
  message: 'Too many requests, try later'
});

app.use(helmet());

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Health Check (important for monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', authMiddleware, productRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// Global Error Handler
app.use(errorHandler);


export default app;