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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepository = void 0;
const base_repository_1 = require("../core/abstracts/base.repository");
const ContactMessage_1 = require("../models/ContactMessage");
class ContactRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(ContactMessage_1.ContactMessage);
    }
    createContactMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.create(data);
        });
    }
    getAllContactMessages(page, limit, search, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (status) {
                query.status = status;
            }
            if (search) {
                query.$or = [{ subject: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }];
            }
            const total = yield this.countDocuments(query);
            const messages = yield this.find(query)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate("replyHistory");
            return { messages, total };
        });
    }
    getContactMessageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findById(id);
        });
    }
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, { status });
        });
    }
    addReplyToHistory(id, replyEntry) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, { $push: { replyHistory: replyEntry } });
        });
    }
    deleteContactMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(id);
        });
    }
}
exports.ContactRepository = ContactRepository;
