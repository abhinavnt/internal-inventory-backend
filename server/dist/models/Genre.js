"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
const mongoose_1 = require("mongoose");
const GenreSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.Genre = (0, mongoose_1.model)("Genre", GenreSchema);
