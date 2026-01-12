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
exports.DashboardController = void 0;
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const types_1 = require("../di/types");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
        this.getSummary = (0, express_async_handler_1.default)((_req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.dashboardService.getSummary();
            res.status(200).json(data);
        }));
        this.getStats = (0, express_async_handler_1.default)((_req, res) => __awaiter(this, void 0, void 0, function* () {
            const stats = yield this.dashboardService.getStats();
            res.status(200).json(stats);
        }));
        this.getRevenue = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const monthsParam = req.query.months;
            const months = monthsParam ? Math.max(1, Math.min(12, parseInt(monthsParam, 10))) : 7;
            const revenue = yield this.dashboardService.getRevenue(months);
            res.status(200).json(revenue);
        }));
        this.getActivity = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const limitParam = req.query.limit;
            const limit = limitParam ? Math.max(1, Math.min(50, parseInt(limitParam, 10))) : 10;
            const items = yield this.dashboardService.getRecentActivity(limit);
            res.status(200).json(items);
        }));
    }
};
exports.DashboardController = DashboardController;
exports.DashboardController = DashboardController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.dashboardService)),
    __metadata("design:paramtypes", [Object])
], DashboardController);
