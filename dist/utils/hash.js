"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareRefreshTokenHash = exports.compareToken = exports.hashToken = exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = (password) => bcryptjs_1.default.hash(password, 10);
exports.hashPassword = hashPassword;
const comparePassword = (password, hash) => bcryptjs_1.default.compare(password, hash);
exports.comparePassword = comparePassword;
const hashToken = (token) => bcryptjs_1.default.hash(token, 10);
exports.hashToken = hashToken;
const compareToken = (token, hash) => bcryptjs_1.default.compare(token, hash);
exports.compareToken = compareToken;
const compareRefreshTokenHash = (refreshToken, hash) => bcryptjs_1.default.compare(refreshToken, hash);
exports.compareRefreshTokenHash = compareRefreshTokenHash;
//# sourceMappingURL=hash.js.map