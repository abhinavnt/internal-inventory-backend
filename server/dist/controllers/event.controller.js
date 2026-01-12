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
exports.EventController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const eventDto_1 = require("../dto/events/eventDto");
const cloudinary_1 = require("../config/cloudinary");
const promises_1 = __importDefault(require("fs/promises"));
const HttpError_1 = require("../utils/HttpError");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
        this.createEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body, "this is the body");
            const dto = new eventDto_1.CreateEventRequestDto(req.body);
            let bannerUrl;
            if (req.file) {
                bannerUrl = yield (0, cloudinary_1.uploadToCloudinary)(req.file.path);
                yield promises_1.default.unlink(req.file.path); // Delete temp file
            }
            const event = yield this.eventService.createEvent(dto, bannerUrl);
            res.status(201).json(event);
        }));
        // Inline slug availability check
        this.checkSlugAvailability = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.query;
            if (!slug || typeof slug !== "string")
                throw new HttpError_1.HttpError(400, "Slug required");
            const result = yield this.eventService.checkSlugAvailability(slug);
            res.status(200).json(result);
        }));
        // Get by slug
        this.getEventBySlug = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const slug = req.params.slug;
            const event = yield this.eventService.getEventBySlug(slug);
            if (!event)
                throw new HttpError_1.HttpError(404, "Event not found");
            res.status(200).json(event);
        }));
        this.getAllEvents = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = new eventDto_1.BrowseEventsQueryDto(req.query);
            if (query.page < 1 || query.limit < 1)
                throw new HttpError_1.HttpError(400, "Invalid page or limit");
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
            const events = yield this.eventService.getAllEvents(query, userId);
            res.status(200).json(events);
        }));
        this.getEventById = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const event = yield this.eventService.getEventById(id);
            if (!event)
                throw new HttpError_1.HttpError(404, "Event not found");
            res.status(200).json(event);
        }));
        this.updateEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const dto = new eventDto_1.UpdateEventRequestDto(req.body);
            let bannerUrl;
            if (req.file) {
                bannerUrl = yield (0, cloudinary_1.uploadToCloudinary)(req.file.path);
                yield promises_1.default.unlink(req.file.path); // Delete temp file
            }
            const event = yield this.eventService.updateEvent(id, dto, bannerUrl);
            if (!event)
                throw new HttpError_1.HttpError(404, "Event not found");
            res.status(200).json(event);
        }));
        this.updateEventStatus = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const dto = new eventDto_1.UpdateEventStatusRequestDto(req.body);
            const event = yield this.eventService.updateEventStatus(id, dto);
            if (!event)
                throw new HttpError_1.HttpError(404, "Event not found");
            res.status(200).json(event);
        }));
        this.getEventStats = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const stats = yield this.eventService.getEventStats();
            res.status(200).json(stats);
        }));
        this.deleteEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const event = yield this.eventService.deleteEvent(id);
            if (!event)
                throw new HttpError_1.HttpError(404, "Event not found");
            res.status(204).send();
        }));
        this.toggleWishlist = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
            const eventId = req.params.id;
            if (!userId)
                throw new HttpError_1.HttpError(401, "Unauthorized");
            const updated = yield this.eventService.toggleWishlist(eventId, userId);
            res.status(200).json(updated);
        }));
        this.getWishlistEvents = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
            if (!userId)
                throw new HttpError_1.HttpError(401, "Unauthorized");
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const wishlistEvents = yield this.eventService.getWishlistEvents(userId, page, limit);
            res.status(200).json(wishlistEvents);
        }));
        this.getPeopleInterested = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const eventId = req.params.id;
            const data = yield this.eventService.getPeopleInterested(eventId);
            res.status(200).json(data);
        }));
        this.addVisitedUser = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const eventId = req.params.id;
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
            if (!userId)
                throw new HttpError_1.HttpError(401, "Unauthorized");
            yield this.eventService.addVisitedUser(eventId, userId);
            res.status(200).json({ message: "User visit recorded" });
        }));
    }
};
exports.EventController = EventController;
exports.EventController = EventController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.EventService)),
    __metadata("design:paramtypes", [Object])
], EventController);
