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
exports.TestimonialRepository = void 0;
const base_repository_1 = require("../core/abstracts/base.repository");
const Testimonial_1 = require("../models/Testimonial");
class TestimonialRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(Testimonial_1.Testimonial);
    }
    createTestimonial(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.create(data);
        });
    }
    getAllTestimonials(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        });
    }
    countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.countDocuments();
        });
    }
    getApprovedTestimonials(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.find({ isApproved: true }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        });
    }
    updateStatus(id, isApproved) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, { isApproved });
        });
    }
    countApproved() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.countDocuments({ isApproved: true });
        });
    }
    countPending() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.countDocuments({ isApproved: false });
        });
    }
}
exports.TestimonialRepository = TestimonialRepository;
