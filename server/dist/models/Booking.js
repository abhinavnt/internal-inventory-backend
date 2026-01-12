"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Event", required: true },
    tickets: [
        {
            ticketName: { type: String, required: true },
            ticketType: { type: String, required: true },
            ticketTier: { type: String },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
    },
    bookingStatus: {
        type: String,
        enum: ["active", "cancelled"],
        default: "active",
    },
    barcodeData: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });
exports.Booking = (0, mongoose_1.model)("Booking", BookingSchema);
