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
exports.BookingService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const bookingDto_1 = require("../dto/bookings/bookingDto");
const mongoose_1 = __importDefault(require("mongoose"));
const HttpError_1 = require("../utils/HttpError");
let BookingService = class BookingService {
    constructor(bookingRepository, paymentService, barcodeService, eventService) {
        this.bookingRepository = bookingRepository;
        this.paymentService = paymentService;
        this.barcodeService = barcodeService;
        this.eventService = eventService;
    }
    createBooking(userId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate ticket price and availability
            yield this.eventService.validateTickets(dto.eventId, dto.tickets);
            // Calculate total amount
            const totalAmount = dto.tickets.reduce((sum, ticket) => sum + ticket.quantity * ticket.price, 0);
            // Generate unique barcode data
            const barcodeData = yield this.barcodeService.generateBarcodeData();
            // Create booking
            const bookingData = {
                userId: new mongoose_1.default.Types.ObjectId(userId),
                eventId: new mongoose_1.default.Types.ObjectId(dto.eventId),
                tickets: dto.tickets,
                totalAmount,
                barcodeData,
            };
            const booking = yield this.bookingRepository.createBooking(bookingData);
            // Update ticket sold count in event
            yield this.eventService.updateTicketSoldCount(dto.eventId, dto.tickets);
            // Create pending payment using PaymentService
            yield this.paymentService.createPayment({
                bookingId: booking._id,
                userId: new mongoose_1.default.Types.ObjectId(userId),
                eventId: new mongoose_1.default.Types.ObjectId(dto.eventId),
                amount: totalAmount,
                method: dto.paymentMethod,
                transactionId: `temp_${Date.now()}`,
            });
            // Initiate payment
            yield this.paymentService.initiatePayment({ bookingId: booking._id.toString(), method: dto.paymentMethod });
            // Generate QR code image as base64
            const barcodeImage = yield this.barcodeService.generateBarcodeImage(barcodeData);
            return new bookingDto_1.BookingResponseDto(booking, barcodeImage);
        });
    }
    getBookingById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield this.bookingRepository.getBookingWithEventById(id);
            if (!booking) {
                throw new HttpError_1.HttpError(404, "Booking not found");
            }
            const barcodeImage = yield this.barcodeService.generateBarcodeImage(booking.barcodeData);
            return new bookingDto_1.BookingResponseDto(booking, barcodeImage);
        });
    }
    getBookingsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get bookings with event info
            const bookings = yield this.bookingRepository.getBookingsByUser(userId);
            // Calculate total revenue
            const totalRevenue = 100;
            const formattedBookings = bookings.map((booking) => ({
                booking,
                barcodeImage: "",
            }));
            return new bookingDto_1.BookingListResponseDto(formattedBookings, bookings.length, totalRevenue);
        });
    }
    getBookingsByEvent(eventId_1) {
        return __awaiter(this, arguments, void 0, function* (eventId, page = 1, limit = 10) {
            const { bookings, total, totalRevenue } = yield this.bookingRepository.getBookingsByEvent(eventId, page, limit);
            const bookingsWithBarcode = yield Promise.all(bookings.map((booking) => __awaiter(this, void 0, void 0, function* () {
                return ({
                    booking,
                    barcodeImage: yield this.barcodeService.generateBarcodeImage(booking.barcodeData),
                });
            })));
            const responseBookings = bookingsWithBarcode.map(({ booking, barcodeImage }) => new bookingDto_1.BookingResponseDto(booking, barcodeImage));
            return { bookings: responseBookings, total, totalRevenue };
        });
    }
    getAllBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            const bookings = yield this.bookingRepository.getAllBookings();
            const bookingsWithBarcode = yield Promise.all(bookings.map((booking) => __awaiter(this, void 0, void 0, function* () {
                return ({
                    booking,
                    barcodeImage: yield this.barcodeService.generateBarcodeImage(booking.barcodeData),
                });
            })));
            // UPDATED: Compute totalRevenue for all bookings
            const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
            return new bookingDto_1.BookingListResponseDto(bookingsWithBarcode, bookings.length, totalRevenue);
        });
    }
    cancelBooking(id, userId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield this.bookingRepository.getBookingById(id);
            if (!booking) {
                throw new HttpError_1.HttpError(404, "Booking not found");
            }
            if (booking.userId.toString() !== userId && !dto.isAdmin) {
                throw new HttpError_1.HttpError(403, "Unauthorized to cancel this booking");
            }
            if (booking.bookingStatus === "cancelled") {
                throw new HttpError_1.HttpError(400, "Booking already cancelled");
            }
            // Update booking status
            const updatedBooking = yield this.bookingRepository.cancelBooking(id);
            if (!updatedBooking) {
                throw new HttpError_1.HttpError(404, "Booking not found");
            }
            // Handle payment refund
            yield this.paymentService.refundPayment(id);
            const barcodeImage = yield this.barcodeService.generateBarcodeImage(updatedBooking.barcodeData);
            return new bookingDto_1.BookingResponseDto(updatedBooking, barcodeImage);
        });
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.BookingRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.PaymentService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.BarCodeService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.EventService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], BookingService);
