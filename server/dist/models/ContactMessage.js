"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessage = void 0;
const mongoose_1 = require("mongoose");
const ReplyHistorySchema = new mongoose_1.Schema({
    message: { type: String, required: true },
    repliedAt: { type: Date, required: true },
});
const ContactMessageSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Replied", "Resolved"], default: "Pending" },
    replyHistory: [ReplyHistorySchema],
}, { timestamps: true });
exports.ContactMessage = (0, mongoose_1.model)("ContactMessage", ContactMessageSchema);
