"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testimonial = void 0;
const mongoose_1 = require("mongoose");
const TestimonialSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String },
    text: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
}, { timestamps: true });
exports.Testimonial = (0, mongoose_1.model)("Testimonial", TestimonialSchema);
