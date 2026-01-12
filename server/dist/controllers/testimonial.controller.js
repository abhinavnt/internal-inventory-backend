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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const testimonialDto_1 = require("../dto/testimonial/testimonialDto");
const cloudinary_1 = require("../config/cloudinary");
const fs = __importStar(require("fs/promises"));
const HttpError_1 = require("../utils/HttpError");
let TestimonialController = class TestimonialController {
    constructor(testimonialService) {
        this.testimonialService = testimonialService;
        this.createTestimonial = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const dto = new testimonialDto_1.CreateTestimonialRequestDto(req.body);
            let imageUrl;
            if (req.file) {
                imageUrl = yield (0, cloudinary_1.uploadToCloudinary)(req.file.path);
                yield fs.unlink(req.file.path); // Delete temp file
            }
            const testimonial = yield this.testimonialService.createTestimonial(dto, imageUrl);
            res.status(201).json(testimonial);
        }));
        this.getAllTestimonials = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = yield this.testimonialService.getAllTestimonials(page, limit);
            res.status(200).json(result);
        }));
        this.updateStatus = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { isApproved } = req.body;
            if (typeof isApproved !== "boolean") {
                throw new HttpError_1.HttpError(400, "Invalid isApproved value");
            }
            const testimonial = yield this.testimonialService.updateStatus(id, isApproved);
            if (!testimonial) {
                throw new HttpError_1.HttpError(400, "Testimonial not found");
            }
            res.status(200).json(testimonial);
        }));
        this.getApprovedTestimonials = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 6;
            console.log("reached aprroved testimonial");
            const result = yield this.testimonialService.getApprovedTestimonials(page, limit);
            res.status(200).json(result);
        }));
    }
};
exports.TestimonialController = TestimonialController;
exports.TestimonialController = TestimonialController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.TestimonialService)),
    __metadata("design:paramtypes", [Object])
], TestimonialController);
