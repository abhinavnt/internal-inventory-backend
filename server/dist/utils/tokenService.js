"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Generates a JWT token with the provided payload, secret, and expiration time.
 */
function generateToken(payload, secret, expiresIn) {
    const options = { expiresIn: expiresIn };
    console.log(payload, "token payeload");
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
