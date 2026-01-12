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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const newsletterDto_1 = require("../dto/newsletter/newsletterDto");
const HttpError_1 = require("../utils/HttpError");
let NewsletterController = class NewsletterController {
    constructor(newsletterService) {
        this.newsletterService = newsletterService;
        this.subscribe = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const dto = new newsletterDto_1.CreateSubscriberRequestDto(req.body);
            const subscriber = yield this.newsletterService.subscribe(dto);
            res.status(201).json(subscriber);
        }));
        this.unsubscribe = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            if (!email) {
                throw new HttpError_1.HttpError(400, "Email is required");
            }
            yield this.newsletterService.unsubscribe(email);
            res.status(200).json({ message: "Unsubscribed successfully" });
        }));
        this.getAllSubscribers = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { page = 1, limit = 10, search } = req.query;
            const pageNum = parseInt(page, 10);
            const limitNum = parseInt(limit, 10);
            const subscribers = yield this.newsletterService.getAllSubscribers(pageNum, limitNum, search);
            res.status(200).json(subscribers);
        }));
        this.deleteSubscriber = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield this.newsletterService.deleteSubscriber(id);
            res.status(204).send();
        }));
        this.sendNewsletter = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const dto = new newsletterDto_1.SendNewsletterRequestDto(req.body);
            yield this.newsletterService.sendNewsletter(dto);
            res.status(200).json({ message: "Newsletter sent successfully" });
        }));
    }
};
exports.NewsletterController = NewsletterController;
exports.NewsletterController = NewsletterController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.newsletterService)),
    __metadata("design:paramtypes", [Object])
], NewsletterController);
