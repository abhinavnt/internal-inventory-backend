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
exports.SupportTicketService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const user_enum_1 = require("../core/constants/user.enum");
const supportTicketDto_1 = require("../dto/support-ticket/supportTicketDto");
const mongoose_1 = __importDefault(require("mongoose"));
const HttpError_1 = require("../utils/HttpError");
let SupportTicketService = class SupportTicketService {
    constructor(supportTicketRepository) {
        this.supportTicketRepository = supportTicketRepository;
    }
    createSupportTicket(dto, userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketData = {
                userId: new mongoose_1.default.Types.ObjectId(userId),
                role,
                subject: dto.subject,
                description: dto.description,
                priority: dto.priority || "medium",
                relatedTo: dto.relatedTo || "general",
                relatedEvent: dto.relatedEvent ? new mongoose_1.default.Types.ObjectId(dto.relatedEvent) : undefined,
                bookingId: dto.bookingId ? new mongoose_1.default.Types.ObjectId(dto.bookingId) : undefined,
                replies: [],
            };
            const ticket = yield this.supportTicketRepository.createSupportTicket(ticketData);
            return new supportTicketDto_1.SupportTicketResponseDto(ticket);
        });
    }
    getAllSupportTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            const tickets = yield this.supportTicketRepository.getAllSupportTickets();
            return new supportTicketDto_1.SupportTicketListResponseDto(tickets);
        });
    }
    getSupportTicketById(id, currentUserId, currentRole) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const ticket = yield this.supportTicketRepository.getSupportTicketById(id);
            if (!ticket) {
                throw new HttpError_1.HttpError(404, "Support ticket not found");
            }
            if (currentRole !== user_enum_1.UserRole.ADMIN && ((_a = ticket.userId) === null || _a === void 0 ? void 0 : _a.toString()) !== currentUserId) {
                throw new HttpError_1.HttpError(403, "You do not have permission to access this ticket");
            }
            return new supportTicketDto_1.SupportTicketResponseDto(ticket);
        });
    }
    updateSupportTicket(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = {
                subject: dto.subject,
                description: dto.description,
                status: dto.status,
                priority: dto.priority,
                assignedTo: dto.assignedTo ? new mongoose_1.default.Types.ObjectId(dto.assignedTo) : undefined,
                relatedTo: dto.relatedTo,
                relatedEvent: dto.relatedEvent ? new mongoose_1.default.Types.ObjectId(dto.relatedEvent) : undefined,
                bookingId: dto.bookingId ? new mongoose_1.default.Types.ObjectId(dto.bookingId) : undefined,
            };
            const ticket = yield this.supportTicketRepository.updateSupportTicket(id, updateData);
            if (!ticket) {
                throw new HttpError_1.HttpError(404, "Support ticket not found");
            }
            return new supportTicketDto_1.SupportTicketResponseDto(ticket);
        });
    }
    updateSupportTicketStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield this.supportTicketRepository.updateSupportTicketStatus(id, status);
            if (!ticket) {
                throw new HttpError_1.HttpError(404, "Support ticket not found");
            }
            return new supportTicketDto_1.SupportTicketResponseDto(ticket);
        });
    }
    addReply(id, dto, currentUserId, currentRole) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const ticket = yield this.supportTicketRepository.getSupportTicketById(id);
            if (!ticket) {
                throw new HttpError_1.HttpError(404, "Support ticket not found");
            }
            if (currentRole !== user_enum_1.UserRole.ADMIN && ((_a = ticket.userId) === null || _a === void 0 ? void 0 : _a.toString()) !== currentUserId) {
                throw new HttpError_1.HttpError(403, "You do not have permission to reply to this ticket");
            }
            const reply = {
                senderId: new mongoose_1.default.Types.ObjectId(currentUserId),
                senderRole: currentRole,
                message: dto.message,
                createdAt: new Date(),
            };
            const updatedTicket = yield this.supportTicketRepository.addReplyToSupportTicket(id, reply);
            if (!updatedTicket) {
                throw new HttpError_1.HttpError(404, "Support ticket not found");
            }
            return new supportTicketDto_1.SupportTicketResponseDto(updatedTicket);
        });
    }
    deleteSupportTicket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield this.supportTicketRepository.deleteSupportTicket(id);
            if (!ticket) {
                throw new HttpError_1.HttpError(404, "Support ticket not found");
            }
        });
    }
};
exports.SupportTicketService = SupportTicketService;
exports.SupportTicketService = SupportTicketService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.SupportTicketRepository)),
    __metadata("design:paramtypes", [Object])
], SupportTicketService);
