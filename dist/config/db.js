"use strict";
// src/config/db.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const connectDB = async () => {
    try {
        console.log("Mongodb uri: ", env_1.ENV.MONGO_URI);
        await mongoose_1.default.connect(env_1.ENV.MONGO_URI, {
            autoIndex: true,
            maxPoolSize: 10
        });
        console.log('MongoDB connected successfully');
        mongoose_1.default.connection.on('connected', () => {
            console.log('Mongoose connected to DB');
        });
        mongoose_1.default.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.warn('Mongoose disconnected');
        });
    }
    catch (error) {
        console.error('Initial DB connection failed:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map