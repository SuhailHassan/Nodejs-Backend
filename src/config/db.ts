// src/config/db.ts

import mongoose from 'mongoose';
import { ENV } from './env';

export const connectDB = async () => {
  try {
    console.log("Mongodb uri: ", ENV.MONGO_URI);
    await mongoose.connect(ENV.MONGO_URI, {
      autoIndex: true,
      maxPoolSize: 10
    });

    console.log('MongoDB connected successfully');

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose disconnected');
    });

  } catch (error) {
    console.error('Initial DB connection failed:', error);
    process.exit(1);
  }
};