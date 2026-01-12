"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const user_enum_1 = require("../core/constants/user.enum");
const SupportTicketSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    role: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ["open", "in_progress", "resolved", "closed"],
        default: "open",
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: "medium",
    },
    assignedTo: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    relatedEvent: { type: mongoose_1.Schema.Types.ObjectId, ref: "Event" },
    bookingId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Booking" },
    relatedTo: {
        type: String,
        enum: ["general", "event", "booking", "payment", "other"],
        default: "general",
    },
    replies: [
        {
            senderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            senderRole: { type: String, enum: [user_enum_1.UserRole.USER, user_enum_1.UserRole.ORGANIZER, user_enum_1.UserRole.ADMIN], required: true },
            message: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("SupportTicket", SupportTicketSchema);
