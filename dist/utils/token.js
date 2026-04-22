"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const generateAccessToken = (payload) => jsonwebtoken_1.default.sign(payload, env_1.ENV.JWT_SECRET, { expiresIn: '1d' });
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => jsonwebtoken_1.default.sign(payload, env_1.ENV.REFRESH_SECRET, { expiresIn: '7d' });
exports.generateRefreshToken = generateRefreshToken;
exports.verifyRefreshToken = ((payload) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(payload, env_1.ENV.REFRESH_SECRET);
        return decoded;
    }
    catch (error) {
        throw new Error('Invalid refresh token');
    }
});
//# sourceMappingURL=token.js.map