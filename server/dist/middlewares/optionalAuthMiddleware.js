"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const optionalAuthMiddleware = () => {
    return (req, res, next) => {
        var _a;
        try {
            console.log("optional middleware reached");
            const accessToken = req.cookies.accessToken || ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
            console.log("accesstoken from optional", accessToken);
            if (!accessToken)
                return next();
            const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            if (decoded.role === "admin")
                return next();
            req.user = {
                _id: new mongoose_1.default.Types.ObjectId(decoded.userId),
                role: decoded.role,
            };
            next();
        }
        catch (err) {
            next();
        }
    };
};
exports.optionalAuthMiddleware = optionalAuthMiddleware;
