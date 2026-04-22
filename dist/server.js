"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const startServer = async () => {
    try {
        // Connect DB
        await (0, db_1.connectDB)();
        console.log('MongoDB Connected');
        // Start Server
        const server = app_1.default.listen(Number(env_1.ENV.PORT), '0.0.0.0', () => {
            console.log(`Server running on port ${env_1.ENV.PORT}`);
        });
        // Graceful Shutdown
        const shutdown = (signal) => {
            console.log(`Received ${signal}. Closing server...`);
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        };
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map