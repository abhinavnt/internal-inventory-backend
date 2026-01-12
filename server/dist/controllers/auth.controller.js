"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AuthRequest_1 = require("../dto/auth/AuthRequest");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.register = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { role } = req.query;
            let dto;
            console.log(req.body, "body from the controller");
            if (role === "organizer") {
                dto = new AuthRequest_1.OrganizerRegistrationRequestDto(req.body);
            }
            else if (role === "user") {
                dto = new AuthRequest_1.UserRegistrationRequestDto(req.body);
            }
            else {
                throw new Error("Invalid role specified");
            }
            yield this.authService.register(dto);
            res.status(200).json({ message: "Registration initiated, OTP sent" });
        }));
        this.verifyOtp = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { identifier, otp } = req.body;
            console.log(req.body, "otp reqbody");
            // Validate required fields
            if (!identifier || !otp) {
                throw new Error("Email/Phone and OTP are required");
            }
            const response = yield this.authService.verifyOtp(identifier, otp);
            const { refreshToken } = response, newUser = __rest(response, ["refreshToken"]);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
            });
            res.status(200).json(newUser);
        }));
        this.resendOtp = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { identifier } = req.body;
            // Validate required fields
            if (!identifier) {
                throw new Error("Identifier is required");
            }
            yield this.authService.resendOtp(identifier);
            const message = identifier.includes("@") ? "OTP resent to your email" : "OTP resent to your phone";
            res.status(200).json({ message });
        }));
        this.login = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { identifier, password } = req.body;
            if (!identifier || !password) {
                throw new Error("Identifier and password are required");
            }
            const _b = yield this.authService.login(identifier, password), { refreshToken } = _b, user = __rest(_b, ["refreshToken"]);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "none",
                domain: (_a = process.env.COOKIEE_DOMAIN) !== null && _a !== void 0 ? _a : ".cosmoexch.com",
                path: "/",
            });
            res.status(200).json(user);
        }));
        this.refreshToken = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            console.log("refresh token", refreshToken);
            if (!refreshToken)
                res.status(403).json({ error: "Refresh tokekn required" });
            const { accessToken, user } = yield this.authService.refreshAccessToken(refreshToken);
            res.status(200).json({ accessToken, user });
        }));
        this.logout = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
            });
            res.status(200).json({ message: "Logged out successfully" });
        }));
        this.verifyCookie = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                res.status(401).json({ valid: false });
                return; // Early exit
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "refresh_secret");
                res.status(200).json({ valid: true, role: decoded.role });
            }
            catch (error) {
                res.clearCookie("refreshToken", { httpOnly: true, secure: false, sameSite: "lax" }); // Invalidate invalid token
                res.status(401).json({ valid: false });
            }
        }));
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.AuthService)),
    __metadata("design:paramtypes", [Object])
], AuthController);
