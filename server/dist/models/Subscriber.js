"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
const mongoose_1 = require("mongoose");
const SubscriberSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
}, { timestamps: { createdAt: "subscribedAt" } });
exports.Subscriber = (0, mongoose_1.model)("Subscriber", SubscriberSchema);
