import bcrypt from 'bcryptjs';

export const hashPassword = (password: string) =>
  bcrypt.hash(password, 10);

export const comparePassword = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const hashToken = (token: string) =>
  bcrypt.hash(token, 10);

export const compareToken = (token: string, hash: string) =>
  bcrypt.compare(token, hash);

export const compareRefreshTokenHash = (refreshToken: string, hash: string) =>
  bcrypt.compare(refreshToken, hash);