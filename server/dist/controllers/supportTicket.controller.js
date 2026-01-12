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
exports.SupportTicketController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const supportTicketDto_1 = require("../dto/support-ticket/supportTicketDto");
const HttpError_1 = require("../utils/HttpError");
let SupportTicketController = class SupportTicketController {
    constructor(supportTicketService) {
        this.supportTicketService = supportTicketService;
        this.createSupportTicket = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            console.log((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, "id from controller");
            console.log((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, "_id from controller");
            console.log((_c = req.user) === null || _c === void 0 ? void 0 : _c.role, "role from controller");
            if (!((_d = req.user) === null || _d === void 0 ? void 0 : _d._id) || !req.user.role) {
                throw new HttpError_1.HttpError(400, "unauthorised");
            }
            const dto = new supportTicketDto_1.CreateSupportTicketRequestDto(req.body);
            const ticket = yield this.supportTicketService.createSupportTicket(dto, req.user._id.toString(), req.user.role);
            res.status(201).json(ticket);
        }));
        this.getAllSupportTickets = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const tickets = yield this.supportTicketService.getAllSupportTickets();
            res.status(200).json(tickets);
        }));
        this.getSupportTicketById = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || !req.user.role) {
                throw new HttpError_1.HttpError(400, "unauthorised");
            }
            const id = req.params.id;
            const ticket = yield this.supportTicketService.getSupportTicketById(id, req.user._id.toString(), req.user.role);
            res.status(200).json(ticket);
        }));
        this.updateSupportTicket = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const dto = new supportTicketDto_1.UpdateSupportTicketRequestDto(req.body);
            const ticket = yield this.supportTicketService.updateSupportTicket(id, dto);
            res.status(200).json(ticket);
        }));
        this.updateSupportTicketStatus = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { status } = req.body;
            if (!["open", "in_progress", "resolved", "closed"].includes(status)) {
                throw new HttpError_1.HttpError(400, "Invalid status value");
            }
            const ticket = yield this.supportTicketService.updateSupportTicketStatus(id, status);
            res.status(200).json(ticket);
        }));
        this.addReply = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || !req.user.role) {
                throw new HttpError_1.HttpError(400, "unauthorised");
            }
            const id = req.params.id;
            const dto = new supportTicketDto_1.AddReplyRequestDto(req.body);
            const ticket = yield this.supportTicketService.addReply(id, dto, req.user._id.toString(), req.user.role);
            res.status(200).json(ticket);
        }));
        this.deleteSupportTicket = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield this.supportTicketService.deleteSupportTicket(id);
            res.status(204).send();
        }));
    }
};
exports.SupportTicketController = SupportTicketController;
exports.SupportTicketController = SupportTicketController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.SupportTicketService)),
    __metadata("design:paramtypes", [Object])
], SupportTicketController);
