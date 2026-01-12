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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const HttpError_1 = require("../utils/HttpError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const emailService_1 = require("../utils/emailService");
const AuthResponse_1 = require("../dto/auth/AuthResponse");
const tokenService_1 = require("../utils/tokenService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const identifierUtils_1 = require("../utils/identifierUtils");
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const identifier = data.email || data.phone;
            if (!identifier) {
                throw new HttpError_1.HttpError(400, "Email or Phone is required");
            }
            const { type: identifierType, value: identifierValue } = (0, identifierUtils_1.getIdentifierType)(identifier);
            const existingUser = yield this.userRepository.findByPhoneOrEmail(identifierType, identifierValue);
            if (existingUser && existingUser.isVerified) {
                throw new HttpError_1.HttpError(400, "User already exists with this email/phone");
            }
            // Generate OTP
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            // Hash password
            const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
            if (existingUser && !existingUser.isVerified) {
                // Update existing unverified user with new OTP and password
                const updateData = Object.assign({}, data, {
                    otp,
                    password: hashedPassword,
                });
                yield this.userRepository.updateUser(existingUser._id.toString(), updateData);
            }
            else {
                // Create new user
                const userData = Object.assign(Object.assign({}, data), { password: hashedPassword, otp });
                yield this.userRepository.create(userData);
            }
            if (identifierType === "email") {
                yield (0, emailService_1.sendOtpEmail)(identifierValue, otp);
            }
            else if (identifierType === "phone") {
                console.log("OTP for phone:", otp); // In production integrate SMS service
            }
        });
    }
    verifyOtp(identifier, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type: identifierType, value: identifierValue } = (0, identifierUtils_1.getIdentifierType)(identifier);
            const user = yield this.userRepository.findByPhoneOrEmail(identifierType, identifierValue);
            if (!user) {
                throw new HttpError_1.HttpError(404, "User not found");
            }
            // Check OTP expiry
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            if (user.createdAt < fiveMinutesAgo && (!user.updatedAt || user.updatedAt < fiveMinutesAgo)) {
                throw new HttpError_1.HttpError(400, "OTP has expired");
            }
            if (user.otp !== otp) {
                throw new HttpError_1.HttpError(400, "Invalid OTP");
            }
            yield this.userRepository.updateUser(user._id.toString(), { isVerified: true, otp: undefined });
            const accessToken = (0, tokenService_1.generateToken)({ userId: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET || "secret", "60m");
            const refreshToken = (0, tokenService_1.generateToken)({ userId: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET || "refresh_secret", "7d");
            const responseUser = user.role === "organizer" ? new AuthResponse_1.OrganizerResponseDto(user) : new AuthResponse_1.UserResponseDto(user);
            return { accessToken, refreshToken, user: responseUser };
        });
    }
    resendOtp(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type: identifierType, value: identifierValue } = (0, identifierUtils_1.getIdentifierType)(identifier);
            const existingUser = yield this.userRepository.findByPhoneOrEmail(identifierType, identifierValue);
            if (!existingUser) {
                throw new HttpError_1.HttpError(404, "User not found");
            }
            if (existingUser.isVerified) {
                throw new HttpError_1.HttpError(404, "User alredy verifed");
            }
            // Generate new OTP
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            // Update user with new OTP
            yield this.userRepository.updateUser(existingUser._id.toString(), { otp });
            if (identifierType === "email") {
                yield (0, emailService_1.sendOtpEmail)(identifierValue, otp);
            }
            else if (identifierType === "phone") {
                console.log("OTP for phone (resend):", otp); // In production integrate SMS service
            }
        });
    }
    login(identifier, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type: identifierType, value: identifierValue } = (0, identifierUtils_1.getIdentifierType)(identifier);
            const user = yield this.userRepository.findByPhoneOrEmail(identifierType, identifierValue);
            if (!user) {
                throw new HttpError_1.HttpError(404, "User not found");
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new HttpError_1.HttpError(401, "Invalid password");
            }
            if (!user.isVerified) {
                throw new HttpError_1.HttpError(400, "User not verified");
            }
            const accessToken = (0, tokenService_1.generateToken)({ userId: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET || "secret", "60m");
            const refreshToken = (0, tokenService_1.generateToken)({ userId: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET || "refresh_secret", "7d");
            const responseUser = user.role === "organizer" ? new AuthResponse_1.OrganizerResponseDto(user) : new AuthResponse_1.UserResponseDto(user);
            return { accessToken, refreshToken, user: responseUser };
        });
    }
    refreshAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "refresh_secret");
                const user = yield this.userRepository.findByUserId(decoded.userId);
                if (!user) {
                    throw new HttpError_1.HttpError(404, "User not found");
                }
                if (!user.isVerified) {
                    throw new HttpError_1.HttpError(400, "User not verified");
                }
                const accessToken = (0, tokenService_1.generateToken)({ userId: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET || "secret", "60m");
                const responseUser = user.role === "organizer" ? new AuthResponse_1.OrganizerResponseDto(user) : new AuthResponse_1.UserResponseDto(user);
                return { accessToken, user: responseUser };
            }
            catch (error) {
                throw new HttpError_1.HttpError(401, "Invalid refresh token");
            }
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __metadata("design:paramtypes", [Object])
], AuthService);
