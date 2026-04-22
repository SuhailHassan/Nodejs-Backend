"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Storage config
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../concepts-covered/src/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path_1.default.extname(file.originalname);
        cb(null, uniqueName);
    }
});
exports.upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
//# sourceMappingURL=file-upload.middleware.js.map