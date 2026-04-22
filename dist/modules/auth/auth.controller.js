"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.login = exports.signup = void 0;
const auth_service_1 = require("./auth.service");
const signup = async (req, res) => {
    const user = await auth_service_1.AuthService.signup(req.body);
    res.status(201).json(user);
};
exports.signup = signup;
const login = async (req, res) => {
    const tokens = await auth_service_1.AuthService.login(req.body);
    res.json(tokens);
};
exports.login = login;
const generateRefreshToken = async (req, res) => {
    if (req.body && req.body.refreshToken) {
        const tokens = await auth_service_1.AuthService.generateNewTokens(req.body.refreshToken);
        res.json(tokens);
    }
    else {
        res.status(400).json({ error: 'Invalid request' });
    }
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=auth.controller.js.map