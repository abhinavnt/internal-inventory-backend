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
exports.UserController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userDto_1 = require("../dto/user/userDto");
const HttpError_1 = require("../utils/HttpError");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getAllUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const query = new userDto_1.UserListQueryDto(req.query);
            if (query.page < 1 || query.limit < 1)
                throw new HttpError_1.HttpError(400, "Invalid page or limit");
            const users = yield this.userService.getAllUsers(query);
            res.status(200).json(users);
        }));
        this.getUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield this.userService.getUserById(id);
            if (!user)
                throw new HttpError_1.HttpError(404, "User not found");
            res.status(200).json(user);
        }));
        this.updateUserStatus = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { isBlocked } = req.body;
            if (typeof isBlocked !== "boolean")
                throw new HttpError_1.HttpError(400, "isBlocked must be boolean");
            const user = yield this.userService.updateUserStatus(id, isBlocked);
            if (!user)
                throw new HttpError_1.HttpError(404, "User not found");
            res.status(200).json(user);
        }));
        this.getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log("reached get userprofile");
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
            console.log("userId", userId);
            const user = yield this.userService.getUserProfile(userId);
            res.status(200).json(user);
        }));
        this.updateUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
            const dto = new userDto_1.UpdateUserProfileDto(req.body);
            const user = yield this.userService.updateUserProfile(userId, dto);
            res.status(200).json(user);
        }));
        this.getUserStats = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const stats = yield this.userService.getUserStats();
            res.status(200).json(stats);
        }));
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.userService)),
    __metadata("design:paramtypes", [Object])
], UserController);
