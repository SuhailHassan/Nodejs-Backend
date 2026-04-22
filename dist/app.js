"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const product_routes_1 = __importDefault(require("./modules/product/product.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const app = (0, express_1.default)();
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100, // limit per IP
    message: 'Too many requests, try later'
});
app.use((0, helmet_1.default)());
// Global Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(exports.limiter);
// Health Check (important for monitoring)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/products', auth_middleware_1.authMiddleware, product_routes_1.default);
// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});
// Global Error Handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map