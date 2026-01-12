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
exports.BookingController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const HttpError_1 = require("../utils/HttpError");
const bookingDto_1 = require("../dto/bookings/bookingDto");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
        this.createBooking = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
            console.log(req.user, "user here ");
            if (!userId) {
                throw new HttpError_1.HttpError(401, "Unauthorized");
            }
            const dto = new bookingDto_1.CreateBookingRequestDto(req.body);
            const booking = yield this.bookingService.createBooking(userId, dto);
            res.status(201).json(booking);
        }));
        this.getBookingById = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const booking = yield this.bookingService.getBookingById(id);
            res.status(200).json(booking);
        }));
        this.getMyBookings = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
            if (!userId) {
                throw new HttpError_1.HttpError(401, "Unauthorized");
            }
            const bookings = yield this.bookingService.getBookingsByUser(userId);
            res.status(200).json(bookings);
        }));
        this.getBookingsByEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const eventId = req.params.eventId;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const data = yield this.bookingService.getBookingsByEvent(eventId, page, limit);
            res.status(200).json(data);
        }));
        this.getAllBookings = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const bookings = yield this.bookingService.getAllBookings();
            res.status(200).json(bookings);
        }));
        this.cancelBooking = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                throw new HttpError_1.HttpError(401, "Unauthorized");
            }
            const id = req.params.id;
            const isAdmin = ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin";
            const dto = new bookingDto_1.CancelBookingRequestDto(Object.assign(Object.assign({}, req.body), { isAdmin }));
            const booking = yield this.bookingService.cancelBooking(id, userId, dto);
            res.status(200).json(booking);
        }));
    }
};
exports.BookingController = BookingController;
exports.BookingController = BookingController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.BookingService)),
    __metadata("design:paramtypes", [Object])
], BookingController);
