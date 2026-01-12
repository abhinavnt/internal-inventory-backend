"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const HttpError_1 = require("../utils/HttpError");
const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    let statusCode = 500;
    let message = err.message || "Internal Server Error";
    if (err instanceof HttpError_1.HttpError) {
        statusCode = err.statusCode;
    }
    else if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((e) => e.message)
            .join(", ");
    }
    res.status(statusCode).json({ message });
};
exports.errorHandler = errorHandler;
