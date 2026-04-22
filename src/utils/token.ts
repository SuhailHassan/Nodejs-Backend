import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export const generateAccessToken = (payload: any) =>
  jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '1d' });

export const generateRefreshToken = (payload: any) =>
  jwt.sign(payload, ENV.REFRESH_SECRET, { expiresIn: '7d' });

export const verifyRefreshToken = ((payload: any) => {
  try {
    const decoded = jwt.verify(payload, ENV.REFRESH_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
});
  