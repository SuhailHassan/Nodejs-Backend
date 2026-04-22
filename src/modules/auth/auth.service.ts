import { User } from '../user/user.model';
import { Role } from '../role/role.model';
import { Session } from '../../session/session.model';
import { hashPassword, comparePassword, hashToken, compareRefreshTokenHash } from '../../utils/hash';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/token';
import jwt from 'jsonwebtoken';

export const AuthService = {
  signup: async (data: any) => {
    const existing = await User.findOne({ email: data.email });
    if (existing) throw new Error('User already exists');

    const role: any = await Role.findOne({ name: 'USER' });

    const user = await User.create({
      email: data.email,
      password: await hashPassword(data.password),
      roles: [role?._id]
    });

    return user;
  },

  login: async (data: any) => {
    const user: any = await User.findOne({ email: data.email });

    if (!user) throw new Error('Invalid credentials');

    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const permissions = user.roles.flatMap((r: any) => r.permissions);

    const accessToken = generateAccessToken({
      id: user._id,
      permissions
    });

    const refreshToken = generateRefreshToken({ id: user._id });
    const hashedRefreshToken = await hashToken(refreshToken);
    const entryInDb = await Session.findOne({ userId: user._id });
    if (entryInDb) {
      await Session.updateOne({ userId: user._id }, {
        refreshToken: hashedRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
    } else {
      await Session.create({
        userId: user._id,
        refreshToken: await hashToken(refreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
    }

    return { accessToken, refreshToken };
  },

  generateNewTokens: async (refreshToken: any) => {
    const decoded: any = verifyRefreshToken(refreshToken);
    const session = await Session.findOne({ userId: decoded.id });
    if (session) {
      const storedHash = session.refreshToken as string;
      const isValid = await compareRefreshTokenHash(refreshToken, storedHash);
      if (!isValid) throw new Error('Invalid refresh token');
      const user: any = await User.findOne({ _id: decoded.id });
      const permissions = user.roles.flatMap((r: any) => r.permissions);
      const accessToken = generateAccessToken({
        id: user._id,
        permissions
      });
      return { accessToken };
    }
  }
};