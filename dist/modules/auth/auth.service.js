"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = require("../user/user.model");
const role_model_1 = require("../role/role.model");
const session_model_1 = require("../../session/session.model");
const hash_1 = require("../../utils/hash");
const token_1 = require("../../utils/token");
exports.AuthService = {
    signup: async (data) => {
        const existing = await user_model_1.User.findOne({ email: data.email });
        if (existing)
            throw new Error('User already exists');
        const role = await role_model_1.Role.findOne({ name: 'USER' });
        const user = await user_model_1.User.create({
            email: data.email,
            password: await (0, hash_1.hashPassword)(data.password),
            roles: [role?._id]
        });
        return user;
    },
    login: async (data) => {
        const user = await user_model_1.User.findOne({ email: data.email });
        if (!user)
            throw new Error('Invalid credentials');
        const isMatch = await (0, hash_1.comparePassword)(data.password, user.password);
        if (!isMatch)
            throw new Error('Invalid credentials');
        const permissions = user.roles.flatMap((r) => r.permissions);
        const accessToken = (0, token_1.generateAccessToken)({
            id: user._id,
            permissions
        });
        const refreshToken = (0, token_1.generateRefreshToken)({ id: user._id });
        const hashedRefreshToken = await (0, hash_1.hashToken)(refreshToken);
        const entryInDb = await session_model_1.Session.findOne({ userId: user._id });
        if (entryInDb) {
            await session_model_1.Session.updateOne({ userId: user._id }, {
                refreshToken: hashedRefreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            });
        }
        else {
            await session_model_1.Session.create({
                userId: user._id,
                refreshToken: await (0, hash_1.hashToken)(refreshToken),
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            });
        }
        return { accessToken, refreshToken };
    },
    generateNewTokens: async (refreshToken) => {
        const decoded = (0, token_1.verifyRefreshToken)(refreshToken);
        const session = await session_model_1.Session.findOne({ userId: decoded.id });
        if (session) {
            const storedHash = session.refreshToken;
            const isValid = await (0, hash_1.compareRefreshTokenHash)(refreshToken, storedHash);
            if (!isValid)
                throw new Error('Invalid refresh token');
            const user = await user_model_1.User.findOne({ _id: decoded.id });
            const permissions = user.roles.flatMap((r) => r.permissions);
            const accessToken = (0, token_1.generateAccessToken)({
                id: user._id,
                permissions
            });
            return { accessToken };
        }
    }
};
//# sourceMappingURL=auth.service.js.map