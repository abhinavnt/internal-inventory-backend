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
exports.ContactController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const contactDto_1 = require("../dto/contact/contactDto");
let ContactController = class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
        this.createContactMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const dto = new contactDto_1.CreateContactRequestDto(req.body);
            const message = yield this.contactService.createContactMessage(dto);
            res.status(201).json({ message: "Contact message submitted successfully", data: message });
        }));
        this.getAllContactMessages = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { page = 1, limit = 10, search, status } = req.query;
            const pageNum = parseInt(page, 10);
            const limitNum = parseInt(limit, 10);
            const messages = yield this.contactService.getAllContactMessages(pageNum, limitNum, search, status);
            res.status(200).json(messages);
        }));
        this.getContactMessageById = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const message = yield this.contactService.getContactMessageById(id);
            res.status(200).json(message);
        }));
        this.updateStatus = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const dto = new contactDto_1.UpdateStatusRequestDto(req.body);
            const message = yield this.contactService.updateStatus(id, dto);
            res.status(200).json(message);
        }));
        this.replyToMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const dto = new contactDto_1.ReplyRequestDto(req.body);
            yield this.contactService.replyToMessage(id, dto);
            res.status(200).json({ message: "Reply sent and stored successfully" });
        }));
        this.deleteContactMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield this.contactService.deleteContactMessage(id);
            res.status(204).send();
        }));
    }
};
exports.ContactController = ContactController;
exports.ContactController = ContactController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ContactService)),
    __metadata("design:paramtypes", [Object])
], ContactController);
