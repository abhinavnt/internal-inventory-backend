"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingListResponseDto = exports.BookingResponseDto = exports.CancelBookingRequestDto = exports.CreateBookingRequestDto = void 0;
const HttpError_1 = require("../../utils/HttpError");
class CreateBookingRequestDto {
    constructor(data) {
        console.log("booking data", data);
        if (!data.eventId)
            throw new HttpError_1.HttpError(400, "Missing required field: eventId");
        if (!data.tickets || !Array.isArray(data.tickets) || data.tickets.length === 0)
            throw new HttpError_1.HttpError(400, "Missing required field: tickets");
        if (!data.paymentMethod)
            throw new HttpError_1.HttpError(400, "Missing required field: paymentMethod");
        this.eventId = data.eventId;
        this.tickets = data.tickets.map((t) => (Object.assign(Object.assign({}, t), { quantity: Number(t.quantity), price: Number(t.price) })));
        this.paymentMethod = data.paymentMethod;
    }
}
exports.CreateBookingRequestDto = CreateBookingRequestDto;
class CancelBookingRequestDto {
    constructor(data) {
        this.reason = data.reason;
        this.isAdmin = data.isAdmin;
    }
}
exports.CancelBookingRequestDto = CancelBookingRequestDto;
class BookingResponseDto {
    constructor(booking, barcodeImage) {
        this.id = booking._id.toString();
        this.userId = booking.userId.toString();
        this.userName = booking.userName;
        this.userEmail = booking.userEmail;
        this.eventId = booking.eventId.toString();
        this.eventTitle = booking.eventTitle;
        this.eventBanner = booking.eventBanner;
        this.eventStartDate = booking.eventStartDate;
        this.eventEndDate = booking.eventEndDate;
        this.eventStartTime = booking.eventStartTime;
        this.eventEndTime = booking.eventEndTime;
        this.venue = booking.venue;
        this.tickets = booking.tickets.map((t) => ({
            ticketName: t.ticketName,
            ticketType: t.ticketType,
            ticketTier: t.ticketTier,
            quantity: t.quantity,
            price: t.price,
        }));
        this.totalAmount = booking.totalAmount;
        this.paymentStatus = booking.paymentStatus;
        this.bookingStatus = booking.bookingStatus;
        this.barcodeData = booking.barcodeData;
        this.barcodeImage = barcodeImage;
        this.createdAt = booking.createdAt;
        this.updatedAt = booking.updatedAt;
    }
}
exports.BookingResponseDto = BookingResponseDto;
class BookingListResponseDto {
    constructor(bookings, total, totalRevenue) {
        this.bookings = bookings.map(({ booking, barcodeImage }) => new BookingResponseDto(booking, barcodeImage));
        if (total !== undefined)
            this.total = total;
        if (totalRevenue !== undefined)
            this.totalRevenue = totalRevenue;
    }
}
exports.BookingListResponseDto = BookingListResponseDto;
