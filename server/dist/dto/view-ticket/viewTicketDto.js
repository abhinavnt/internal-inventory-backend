"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewTicketResponseDto = void 0;
class ViewTicketResponseDto {
    constructor(booking, barcodeImage) {
        this.id = booking._id.toString();
        this.userId = booking.userId.toString();
        this.eventId = booking.eventId.toString();
        this.tickets = booking.tickets;
        this.totalAmount = booking.totalAmount;
        this.paymentStatus = booking.paymentStatus;
        this.bookingStatus = booking.bookingStatus;
        this.barcodeData = booking.barcodeData;
        this.barcodeImage = barcodeImage;
        this.createdAt = booking.createdAt;
        this.updatedAt = booking.updatedAt;
    }
}
exports.ViewTicketResponseDto = ViewTicketResponseDto;
