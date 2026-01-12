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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const userDto_1 = require("../dto/user/userDto");
const HttpError_1 = require("../utils/HttpError");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getAllUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = query;
            const skip = (page - 1) * limit;
            const filter = this.buildFilter(query);
            const [users, total] = yield Promise.all([this.userRepository.getAllUsers(skip, limit, filter), this.userRepository.countAllUsers(filter)]);
            return new userDto_1.UserListResponseDto(users, total, page, limit);
        });
    }
    buildFilter(query) {
        const filter = {};
        if (query.status && query.status !== "all") {
            filter.isBlocked = query.status === "blocked";
        }
        if (query.role && query.role !== "all") {
            filter.role = query.role;
        }
        if (query.search) {
            filter.$or = [{ name: { $regex: query.search, $options: "i" } }, { email: { $regex: query.search, $options: "i" } }];
        }
        return filter;
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByUserId(id);
            if (!user)
                return null;
            return new userDto_1.UserResponseDto(user);
        });
    }
    getUserProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByUserId(userId);
            console.log("get profile", user);
            if (!user)
                throw new HttpError_1.HttpError(400, "User not found");
            return new userDto_1.UserResponseDto(user);
        });
    }
    updateUserProfile(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data, "data");
            const user = yield this.userRepository.updateUser(userId, data);
            if (!user)
                throw new HttpError_1.HttpError(400, "User not found");
            return new userDto_1.UserResponseDto(user);
        });
    }
    updateUserStatus(id, isBlocked) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.updateUserStatus(id, isBlocked);
            if (!user)
                return null;
            return new userDto_1.UserResponseDto(user);
        });
    }
    getUserStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalUsers = yield this.userRepository.countAllUsers({});
            const activeUsers = yield this.userRepository.countAllUsers({ isBlocked: false });
            const blockedUsers = yield this.userRepository.countAllUsers({ isBlocked: true });
            return new userDto_1.UserStatsResponseDto(totalUsers, activeUsers, blockedUsers);
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __metadata("design:paramtypes", [Object])
], UserService);
