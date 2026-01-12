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
exports.PaymentService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const paymentDto_1 = require("../dto/payment/paymentDto");
const HttpError_1 = require("../utils/HttpError");
let PaymentService = class PaymentService {
    constructor(paymentRepository, bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }
    createPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.paymentRepository.createPayment(data);
        });
    }
    initiatePayment(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield this.paymentRepository.getPaymentByBookingId(dto.bookingId);
            if (!payment) {
                throw new HttpError_1.HttpError(404, "Payment not found for booking");
            }
            // Placeholder for payment gateway initiation
            // In real integration, call Razorpay/Stripe API to create order and get payment URL
            const orderId = `order_${Date.now()}`;
            const paymentUrl = `https://mock-payment-gateway.com/pay?orderId=${orderId}`;
            yield this.paymentRepository.update(payment._id, { orderId });
            return { paymentUrl, orderId };
        });
    }
    confirmPayment(bookingId, transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield this.paymentRepository.getPaymentByBookingId(bookingId);
            if (!payment) {
                throw new HttpError_1.HttpError(404, "Payment not found");
            }
            // Placeholder for verification
            // In real, verify signature from webhook
            const updatedPayment = yield this.paymentRepository.updatePaymentStatus(payment._id.toString(), "success");
            if (!updatedPayment) {
                throw new HttpError_1.HttpError(404, "Payment not found");
            }
            // Update booking payment status
            yield this.bookingRepository.updateBooking(bookingId, { paymentStatus: "paid" });
            return new paymentDto_1.PaymentResponseDto(updatedPayment);
        });
    }
    refundPayment(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield this.paymentRepository.getPaymentByBookingId(bookingId);
            if (!payment) {
                throw new HttpError_1.HttpError(404, "Payment not found");
            }
            // Placeholder for refund
            // In real, call gateway refund API
            const updatedPayment = yield this.paymentRepository.updatePaymentStatus(payment._id.toString(), "refunded");
            if (!updatedPayment) {
                throw new HttpError_1.HttpError(404, "Payment not found");
            }
            // Update booking payment status
            yield this.bookingRepository.updateBooking(bookingId, { paymentStatus: "refunded" });
            return new paymentDto_1.PaymentResponseDto(updatedPayment);
        });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.PaymentRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.BookingRepository)),
    __metadata("design:paramtypes", [Object, Object])
], PaymentService);
