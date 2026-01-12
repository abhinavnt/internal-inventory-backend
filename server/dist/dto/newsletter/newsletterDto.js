"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberListResponseDto = exports.SubscriberResponseDto = exports.SendNewsletterRequestDto = exports.CreateSubscriberRequestDto = void 0;
class CreateSubscriberRequestDto {
    constructor(data) {
        this.email = data.email || "";
    }
}
exports.CreateSubscriberRequestDto = CreateSubscriberRequestDto;
class SendNewsletterRequestDto {
    constructor(data) {
        this.subject = data.subject || "";
        this.message = data.message || "";
        this.subscriberIds = data.subscriberIds;
    }
}
exports.SendNewsletterRequestDto = SendNewsletterRequestDto;
class SubscriberResponseDto {
    constructor(subscriber) {
        this.id = subscriber._id.toString();
        this.email = subscriber.email;
        this.subscribedAt = subscriber.subscribedAt;
    }
}
exports.SubscriberResponseDto = SubscriberResponseDto;
class SubscriberListResponseDto {
    constructor(subscribers, total, page, limit) {
        this.subscribers = subscribers.map((s) => new SubscriberResponseDto(s));
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
exports.SubscriberListResponseDto = SubscriberListResponseDto;
