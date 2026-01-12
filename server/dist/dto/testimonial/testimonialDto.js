"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestimonialRequestDto = exports.ApprovedTestimonialListResponseDto = exports.PaginatedTestimonialResponseDto = exports.TestimonialListResponseDto = exports.TestimonialResponseDto = void 0;
class TestimonialResponseDto {
    constructor(testimonial) {
        this.id = testimonial._id.toString();
        this.name = testimonial.name;
        this.image = testimonial.image;
        this.text = testimonial.text;
        this.isApproved = testimonial.isApproved;
        this.createdAt = testimonial.createdAt;
        this.updatedAt = testimonial.updatedAt;
    }
}
exports.TestimonialResponseDto = TestimonialResponseDto;
class TestimonialListResponseDto {
    constructor(testimonials) {
        this.testimonials = testimonials.map((t) => new TestimonialResponseDto(t));
    }
}
exports.TestimonialListResponseDto = TestimonialListResponseDto;
class PaginatedTestimonialResponseDto {
    constructor(testimonials, total, approvedCount, pendingCount, totalPages, currentPage) {
        this.testimonials = testimonials.map((t) => new TestimonialResponseDto(t));
        this.total = total;
        this.approvedCount = approvedCount;
        this.pendingCount = pendingCount;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }
}
exports.PaginatedTestimonialResponseDto = PaginatedTestimonialResponseDto;
class ApprovedTestimonialListResponseDto {
    constructor(testimonials, total, totalPages, currentPage) {
        this.testimonials = testimonials.map((t) => new TestimonialResponseDto(t));
        this.total = total;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }
}
exports.ApprovedTestimonialListResponseDto = ApprovedTestimonialListResponseDto;
class CreateTestimonialRequestDto {
    constructor(data) {
        this.name = data.name;
        this.text = data.text;
    }
}
exports.CreateTestimonialRequestDto = CreateTestimonialRequestDto;
