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
exports.NewsletterService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const newsletterDto_1 = require("../dto/newsletter/newsletterDto");
const HttpError_1 = require("../utils/HttpError");
const emailService_1 = require("../utils/emailService");
let NewsletterService = class NewsletterService {
    constructor(newsletterRepository) {
        this.newsletterRepository = newsletterRepository;
    }
    subscribe(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.newsletterRepository.findByEmail(dto.email);
            if (existing) {
                throw new HttpError_1.HttpError(400, "Email already subscribed");
            }
            const subscriber = yield this.newsletterRepository.createSubscriber({ email: dto.email });
            return new newsletterDto_1.SubscriberResponseDto(subscriber);
        });
    }
    unsubscribe(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriber = yield this.newsletterRepository.findByEmail(email);
            if (!subscriber) {
                throw new HttpError_1.HttpError(404, "Subscriber not found");
            }
            yield this.newsletterRepository.deleteSubscriber(subscriber._id.toString());
        });
    }
    getAllSubscribers(page, limit, search) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subscribers, total } = yield this.newsletterRepository.getAllSubscribers(page, limit, search);
            return new newsletterDto_1.SubscriberListResponseDto(subscribers, total, page, limit);
        });
    }
    deleteSubscriber(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriber = yield this.newsletterRepository.getSubscriberById(id);
            if (!subscriber) {
                throw new HttpError_1.HttpError(404, "Subscriber not found");
            }
            yield this.newsletterRepository.deleteSubscriber(id);
        });
    }
    sendNewsletter(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            let subscribers;
            if (dto.subscriberIds && dto.subscriberIds.length > 0) {
                subscribers = yield this.newsletterRepository.getSubscribersByIds(dto.subscriberIds);
            }
            else {
                subscribers = yield this.newsletterRepository.getAllSubscribersEmailsOnly();
            }
            if (subscribers.length === 0) {
                throw new HttpError_1.HttpError(400, "No subscribers to send to");
            }
            const sendPromises = subscribers.map((sub) => (0, emailService_1.sendNewsletterEmail)(sub.email, dto.subject, dto.message));
            yield Promise.all(sendPromises);
        });
    }
};
exports.NewsletterService = NewsletterService;
exports.NewsletterService = NewsletterService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.NewsletterRepository)),
    __metadata("design:paramtypes", [Object])
], NewsletterService);
