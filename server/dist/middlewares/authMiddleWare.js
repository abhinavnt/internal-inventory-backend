"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const authMiddleware = (roles) => {
    return (req, res, next) => {
        var _a;
        try {
            const accessToken = req.cookies.accessToken || ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
            if (!accessToken)
                res.status(401).json({ error: "Unauthorized: No token provided" });
            const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            if (roles.length && !roles.includes(decoded.role)) {
                res.status(403).json({ message: "permisson denied" });
                return;
            }
            req.user = { _id: new mongoose_1.default.Types.ObjectId(decoded.userId), role: decoded.role };
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                res.status(401).json({ error: "Token has expired" });
                return;
            }
            res.status(403).json({ error: "Invalid token" });
        }
    };
};
exports.authMiddleware = authMiddleware;
