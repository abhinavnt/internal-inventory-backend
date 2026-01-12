"use strict";
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
exports.SupportTicketRepository = void 0;
const base_repository_1 = require("../core/abstracts/base.repository");
const SupportTicket_1 = __importDefault(require("../models/SupportTicket"));
class SupportTicketRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(SupportTicket_1.default);
    }
    createSupportTicket(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.create(data);
        });
    }
    getAllSupportTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({});
        });
    }
    getSupportTicketById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findById(id);
        });
    }
    updateSupportTicket(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, data);
        });
    }
    updateSupportTicketStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, { status });
        });
    }
    addReplyToSupportTicket(id, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findByIdAndUpdate(id, { $push: { replies: reply } }, { new: true });
        });
    }
    deleteSupportTicket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(id);
        });
    }
}
exports.SupportTicketRepository = SupportTicketRepository;
