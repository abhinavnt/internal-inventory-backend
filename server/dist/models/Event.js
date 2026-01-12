"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, trim: true },
    banner: { type: String },
    description: { type: String },
    category: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    capacity: { type: Number },
    ageRestriction: { type: Number },
    genres: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Genre" }],
    venue: { type: String, required: true },
    location: {
        venue: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
    },
    tickets: [
        {
            ticketName: { type: String, required: true },
            ticketType: { type: String, required: true },
            ticketTier: { type: String },
            ticketStatus: {
                type: String,
                enum: ["available", "sold-out", "upcoming"],
                default: "available",
            },
            description: { type: String },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            sold: { type: Number, default: 0 },
        },
    ],
    organizer: { type: String, required: true },
    tags: [{ type: String }],
    bulletPoints: [{ type: String }],
    refundPolicy: {
        type: String,
        enum: ["non-refundable", "partial", "full"],
        default: "non-refundable",
    },
    isFeatured: { type: Boolean, default: false },
    favorites: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["draft", "published", "cancelled"],
        default: "draft",
    },
    totalSold: { type: Number, default: 0 },
    wishlistedBy: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    visitedUsers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });
exports.Event = (0, mongoose_1.model)("Event", EventSchema);
