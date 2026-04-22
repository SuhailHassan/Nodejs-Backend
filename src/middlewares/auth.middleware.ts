import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).send('Unauthorized');
  console.log('ENV.JWT_SECRET', ENV.JWT_SECRET);
  const decoded = jwt.verify(token, ENV.JWT_SECRET);
  req.user = decoded;

  next();
};