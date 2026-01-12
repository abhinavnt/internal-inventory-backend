"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportTicketListResponseDto = exports.SupportTicketResponseDto = exports.AddReplyRequestDto = exports.UpdateSupportTicketRequestDto = exports.CreateSupportTicketRequestDto = void 0;
class CreateSupportTicketRequestDto {
    constructor(body) {
        this.subject = body.subject;
        this.description = body.description;
        this.priority = body.priority;
        this.relatedTo = body.relatedTo;
        this.relatedEvent = body.relatedEvent;
        this.bookingId = body.bookingId;
    }
}
exports.CreateSupportTicketRequestDto = CreateSupportTicketRequestDto;
class UpdateSupportTicketRequestDto {
    constructor(body) {
        this.subject = body.subject;
        this.description = body.description;
        this.status = body.status;
        this.priority = body.priority;
        this.assignedTo = body.assignedTo;
        this.relatedTo = body.relatedTo;
        this.relatedEvent = body.relatedEvent;
        this.bookingId = body.bookingId;
    }
}
exports.UpdateSupportTicketRequestDto = UpdateSupportTicketRequestDto;
class AddReplyRequestDto {
    constructor(body) {
        this.message = body.message;
    }
}
exports.AddReplyRequestDto = AddReplyRequestDto;
class SupportTicketResponseDto {
    constructor(ticket) {
        var _a, _b, _c, _d;
        this.id = ticket._id.toString();
        this.userId = (_a = ticket.userId) === null || _a === void 0 ? void 0 : _a.toString();
        this.role = ticket.role;
        this.subject = ticket.subject;
        this.description = ticket.description;
        this.status = ticket.status;
        this.priority = ticket.priority;
        this.assignedTo = (_b = ticket.assignedTo) === null || _b === void 0 ? void 0 : _b.toString();
        this.relatedEvent = (_c = ticket.relatedEvent) === null || _c === void 0 ? void 0 : _c.toString();
        this.bookingId = (_d = ticket.bookingId) === null || _d === void 0 ? void 0 : _d.toString();
        // Use type assertion to ensure correct type
        this.relatedTo = ticket.relatedTo || "general"; // Default to "general" if undefined
        this.replies = ticket.replies.map((reply) => {
            var _a;
            return ({
                senderId: (_a = reply.senderId) === null || _a === void 0 ? void 0 : _a.toString(),
                senderRole: reply.senderRole,
                message: reply.message,
                createdAt: reply.createdAt,
            });
        });
        this.createdAt = ticket.createdAt;
        this.updatedAt = ticket.updatedAt;
    }
}
exports.SupportTicketResponseDto = SupportTicketResponseDto;
class SupportTicketListResponseDto {
    constructor(tickets) {
        this.tickets = tickets.map((ticket) => new SupportTicketResponseDto(ticket));
    }
}
exports.SupportTicketListResponseDto = SupportTicketListResponseDto;
