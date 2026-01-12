"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentResponseDto = exports.InitiatePaymentRequestDto = void 0;
class InitiatePaymentRequestDto {
    constructor(data) {
        this.bookingId = data.bookingId || "";
        this.method = data.method || "";
    }
}
exports.InitiatePaymentRequestDto = InitiatePaymentRequestDto;
class PaymentResponseDto {
    constructor(payment) {
        this.id = payment._id.toString();
        this.bookingId = payment.bookingId.toString();
        this.userId = payment.userId.toString();
        this.eventId = payment.eventId.toString();
        this.amount = payment.amount;
        this.currency = payment.currency;
        this.status = payment.status;
        this.method = payment.method;
        this.transactionId = payment.transactionId;
        this.orderId = payment.orderId;
        this.receipt = payment.receipt;
        this.createdAt = payment.createdAt;
        this.updatedAt = payment.updatedAt;
    }
}
exports.PaymentResponseDto = PaymentResponseDto;
