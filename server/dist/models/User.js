"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String, sparse: true, unique: true },
    phone: { type: String, sparse: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "organizer", "admin"], required: true },
    dob: { type: Date },
    city: { type: String },
    genres: [{ type: String }],
    companyName: { type: String },
    country: { type: String },
    state: { type: String },
    instagramUrl: { type: String },
    facebookUrl: { type: String },
    companyLogo: { type: String },
    otp: { type: String },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", UserSchema);
