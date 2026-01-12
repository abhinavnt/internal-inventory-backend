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
exports.ContactService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const contactDto_1 = require("../dto/contact/contactDto");
const HttpError_1 = require("../utils/HttpError");
const emailService_1 = require("../utils/emailService");
let ContactService = class ContactService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    createContactMessage(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                phone: dto.phone,
                subject: dto.subject,
                message: dto.message,
                status: "Pending",
                replyHistory: [],
            };
            const contactMessage = yield this.contactRepository.createContactMessage(data);
            return new contactDto_1.ContactMessageResponseDto(contactMessage);
        });
    }
    getAllContactMessages(page, limit, search, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const { messages, total } = yield this.contactRepository.getAllContactMessages(page, limit, search, status);
            return new contactDto_1.ContactMessagesListResponseDto(messages, total, page, limit);
        });
    }
    getContactMessageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.contactRepository.getContactMessageById(id);
            if (!message) {
                throw new HttpError_1.HttpError(400, "Contact message not found");
            }
            return new contactDto_1.ContactMessageResponseDto(message);
        });
    }
    updateStatus(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.contactRepository.getContactMessageById(id);
            if (!message) {
                throw new HttpError_1.HttpError(400, "Contact message not found");
            }
            const updatedMessage = yield this.contactRepository.updateStatus(id, dto.status);
            if (!updatedMessage) {
                throw new HttpError_1.HttpError(400, "Contact message not found");
            }
            return new contactDto_1.ContactMessageResponseDto(updatedMessage);
        });
    }
    replyToMessage(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.contactRepository.getContactMessageById(id);
            if (!message) {
                throw new HttpError_1.HttpError(404, "Contact message not found");
            }
            yield (0, emailService_1.sendReplyEmail)(message.email, message.subject, dto.message);
            const replyEntry = { message: dto.message, repliedAt: new Date() };
            yield this.contactRepository.addReplyToHistory(id, replyEntry);
        });
    }
    deleteContactMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.contactRepository.getContactMessageById(id);
            if (!message) {
                throw new HttpError_1.HttpError(400, "Contact message not found");
            }
            yield this.contactRepository.deleteContactMessage(id);
        });
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ContactRepository)),
    __metadata("design:paramtypes", [Object])
], ContactService);
