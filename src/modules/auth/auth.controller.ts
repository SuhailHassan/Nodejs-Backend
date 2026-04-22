import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export const signup = async (req: Request, res: Response) => {
  const user = await AuthService.signup(req.body);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const tokens = await AuthService.login(req.body);
  res.json(tokens);
};

export const generateRefreshToken = async (req: Request, res: Response) => {
  if(req.body && req.body.refreshToken) {
    const tokens = await AuthService.generateNewTokens(req.body.refreshToken);
    res.json(tokens);
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
};