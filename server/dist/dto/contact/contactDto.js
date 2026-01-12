"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessagesListResponseDto = exports.ContactMessageResponseDto = exports.ReplyRequestDto = exports.UpdateStatusRequestDto = exports.CreateContactRequestDto = void 0;
class CreateContactRequestDto {
    constructor(data) {
        this.firstName = data.firstName || "";
        this.lastName = data.lastName || "";
        this.email = data.email || "";
        this.phone = data.phone || "";
        this.subject = data.subject || "";
        this.message = data.message || "";
    }
}
exports.CreateContactRequestDto = CreateContactRequestDto;
class UpdateStatusRequestDto {
    constructor(data) {
        this.status = data.status || "Pending";
    }
}
exports.UpdateStatusRequestDto = UpdateStatusRequestDto;
class ReplyRequestDto {
    constructor(data) {
        this.message = data.message || "";
    }
}
exports.ReplyRequestDto = ReplyRequestDto;
class ContactMessageResponseDto {
    constructor(message) {
        this.id = message._id.toString();
        this.firstName = message.firstName;
        this.lastName = message.lastName;
        this.email = message.email;
        this.phone = message.phone;
        this.subject = message.subject;
        this.message = message.message;
        this.status = message.status;
        this.replyHistory = message.replyHistory.map((r) => ({
            message: r.message,
            repliedAt: r.repliedAt,
        }));
        this.createdAt = message.createdAt;
        this.updatedAt = message.updatedAt;
    }
}
exports.ContactMessageResponseDto = ContactMessageResponseDto;
class ContactMessagesListResponseDto {
    constructor(messages, total, page, limit) {
        this.messages = messages.map((m) => new ContactMessageResponseDto(m));
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
exports.ContactMessagesListResponseDto = ContactMessagesListResponseDto;
