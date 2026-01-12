"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.TestimonialService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const testimonialDto_1 = require("../dto/testimonial/testimonialDto");
const HttpError_1 = require("../utils/HttpError");
let TestimonialService = class TestimonialService {
    constructor(testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }
    createTestimonial(dto, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("reached the service");
            const data = {
                name: dto.name,
                text: dto.text,
                isApproved: false,
            };
            if (imageUrl) {
                data.image = imageUrl;
            }
            console.log("reached the service");
            const testimonial = yield this.testimonialRepository.createTestimonial(data);
            return new testimonialDto_1.TestimonialResponseDto(testimonial);
        });
    }
    getAllTestimonials() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            const [testimonials, total, approvedCount, pendingCount] = yield Promise.all([
                this.testimonialRepository.getAllTestimonials(skip, limit),
                this.testimonialRepository.countAll(),
                this.testimonialRepository.countApproved(),
                this.testimonialRepository.countPending(),
            ]);
            const totalPages = Math.ceil(total / limit);
            return new testimonialDto_1.PaginatedTestimonialResponseDto(testimonials, total, approvedCount, pendingCount, totalPages, page);
        });
    }
    updateStatus(id, isApproved) {
        return __awaiter(this, void 0, void 0, function* () {
            const testimonial = yield this.testimonialRepository.updateStatus(id, isApproved);
            if (!testimonial) {
                throw new HttpError_1.HttpError(404, "Testimonial not found");
            }
            return new testimonialDto_1.TestimonialResponseDto(testimonial);
        });
    }
    getApprovedTestimonials() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            const [testimonials, total] = yield Promise.all([
                this.testimonialRepository.getApprovedTestimonials(skip, limit),
                this.testimonialRepository.countApproved(),
            ]);
            const totalPages = Math.ceil(total / limit);
            return new testimonialDto_1.ApprovedTestimonialListResponseDto(testimonials, total, totalPages, page);
        });
    }
};
exports.TestimonialService = TestimonialService;
exports.TestimonialService = TestimonialService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.TestimonialRepository)),
    __metadata("design:paramtypes", [Object])
], TestimonialService);
