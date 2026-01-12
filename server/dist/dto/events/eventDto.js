"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowseEventsQueryDto = exports.EventListResponseDto = exports.EventResponseDto = exports.UpdateEventStatusRequestDto = exports.UpdateEventRequestDto = exports.CreateEventRequestDto = void 0;
const mongoose_1 = require("mongoose");
const HttpError_1 = require("../../utils/HttpError");
class CreateEventRequestDto {
    constructor(data) {
        if (!data.title)
            throw new HttpError_1.HttpError(400, "Missing required field: title");
        if (!data.slug)
            throw new HttpError_1.HttpError(400, "Missing required field: slug");
        if (!data.startDate)
            throw new HttpError_1.HttpError(400, "Missing required field: startDate");
        if (!data.startTime)
            throw new HttpError_1.HttpError(400, "Missing required field: startTime");
        if (!data.endTime)
            throw new HttpError_1.HttpError(400, "Missing required field: endTime");
        if (!data.venue)
            throw new HttpError_1.HttpError(400, "Missing required field: venue");
        if (!data.tickets)
            throw new HttpError_1.HttpError(400, "Missing required field: tickets");
        if (!data.organizer)
            throw new HttpError_1.HttpError(400, "Missing required field: organizer");
        if (!data.location)
            throw new HttpError_1.HttpError(400, "Missing required field: location");
        if (!data.category)
            throw new HttpError_1.HttpError(400, "Missing required field: category");
        const rawSlug = data.slug.trim().toLowerCase().replace(/\s+/g, "-");
        if (!/^[a-z0-9-]+$/.test(rawSlug))
            throw new HttpError_1.HttpError(400, "Slug must be alphanumeric with dashes only");
        this.slug = rawSlug;
        // Parse stringified JSON tickets
        if (typeof data.tickets === "string") {
            try {
                data.tickets = JSON.parse(data.tickets);
            }
            catch (e) {
                throw new HttpError_1.HttpError(400, "Invalid tickets format: must be a valid JSON array");
            }
        }
        // Parse location if JSON string
        if (typeof data.location === "string") {
            try {
                data.location = JSON.parse(data.location);
            }
            catch (e) {
                throw new HttpError_1.HttpError(400, "Invalid location format: must be a valid JSON object");
            }
        }
        // Parse genres if JSON string
        if (data.genres && typeof data.genres === "string") {
            try {
                const parsedGenres = JSON.parse(data.genres);
                if (Array.isArray(parsedGenres)) {
                    data.genres = parsedGenres.map((id) => new mongoose_1.Types.ObjectId(id));
                }
                else {
                    throw new HttpError_1.HttpError(400, "Invalid genres format: must be an array of ObjectIds");
                }
            }
            catch (_a) {
                throw new HttpError_1.HttpError(400, "Invalid genres format: must be a valid JSON array");
            }
        }
        // Parse tags if JSON string
        if (data.tags && typeof data.tags === "string") {
            try {
                data.tags = JSON.parse(data.tags);
            }
            catch (e) {
                throw new HttpError_1.HttpError(400, "Invalid tags format: must be a valid JSON array");
            }
        }
        // Parse bulletPoints if JSON string
        if (data.bulletPoints && typeof data.bulletPoints === "string") {
            try {
                data.bulletPoints = JSON.parse(data.bulletPoints);
            }
            catch (e) {
                throw new HttpError_1.HttpError(400, "Invalid bulletPoints format: must be a valid JSON array");
            }
        }
        if (!Array.isArray(data.tickets) || data.tickets.length === 0) {
            throw new HttpError_1.HttpError(400, "Missing or invalid required field: tickets");
        }
        // Validate location object
        if (!data.location || typeof data.location !== "object") {
            throw new HttpError_1.HttpError(400, "Invalid location: must be an object with venue, city, country, latitude, longitude");
        }
        const loc = data.location;
        if (!loc.venue || !loc.city || !loc.country || !loc.latitude || !loc.longitude) {
            throw new HttpError_1.HttpError(400, "Location missing required fields: venue, city, country, latitude, longitude");
        }
        // Type conversions
        this.title = data.title;
        this.description = data.description;
        this.startDate = new Date(data.startDate);
        if (data.endDate) {
            this.endDate = new Date(data.endDate);
        }
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.capacity = data.capacity ? Number(data.capacity) : undefined;
        this.ageRestriction = data.ageRestriction ? Number(data.ageRestriction) : undefined;
        this.genres = data.genres || [];
        this.venue = data.venue;
        this.location = data.location;
        this.tickets = data.tickets.map((ticket) => {
            var _a;
            return (Object.assign(Object.assign({}, ticket), { price: Number(ticket.price), quantity: Number(ticket.quantity), sold: (_a = ticket.sold) !== null && _a !== void 0 ? _a : 0 }));
        });
        this.organizer = data.organizer;
        this.tags = data.tags || [];
        this.bulletPoints = data.bulletPoints;
        this.refundPolicy = data.refundPolicy || "non-refundable";
        this.status = data.status || "draft";
        this.category = data.category;
    }
}
exports.CreateEventRequestDto = CreateEventRequestDto;
class UpdateEventRequestDto {
    constructor(data) {
        if (typeof data.tickets === "string") {
            try {
                data.tickets = JSON.parse(data.tickets);
            }
            catch (_a) {
                throw new HttpError_1.HttpError(400, "Invalid tickets format: must be a valid JSON array");
            }
        }
        if (data.genres && typeof data.genres === "string") {
            try {
                const parsedGenres = JSON.parse(data.genres);
                if (Array.isArray(parsedGenres)) {
                    data.genres = parsedGenres.map((id) => new mongoose_1.Types.ObjectId(id));
                }
                else {
                    throw new HttpError_1.HttpError(400, "Invalid genres format: must be an array of ObjectIds");
                }
            }
            catch (_b) {
                throw new HttpError_1.HttpError(400, "Invalid genres format: must be a valid JSON array");
            }
        }
        if (data.location && typeof data.location === "string") {
            try {
                data.location = JSON.parse(data.location);
            }
            catch (_c) {
                throw new HttpError_1.HttpError(400, "Invalid location format: must be a valid JSON object");
            }
        }
        if (data.tags && typeof data.tags === "string") {
            try {
                data.tags = JSON.parse(data.tags);
            }
            catch (_d) {
                throw new HttpError_1.HttpError(400, "Invalid tags format: must be a valid JSON array");
            }
        }
        if (data.bulletPoints && typeof data.bulletPoints === "string") {
            try {
                data.bulletPoints = JSON.parse(data.bulletPoints);
            }
            catch (_e) {
                throw new HttpError_1.HttpError(400, "Invalid bulletPoints format: must be a valid JSON array");
            }
        }
        if (data.slug) {
            const rawSlug = data.slug.trim().toLowerCase().replace(/\s+/g, "-");
            if (!/^[a-z0-9-]+$/.test(rawSlug))
                throw new HttpError_1.HttpError(400, "Slug must be alphanumeric with dashes only");
            this.slug = rawSlug;
        }
        this.title = data.title;
        this.category = data.category;
        this.description = data.description;
        this.startDate = data.startDate ? new Date(data.startDate) : undefined;
        this.endDate = data.endDate ? new Date(data.endDate) : undefined;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.capacity = data.capacity ? Number(data.capacity) : undefined;
        this.ageRestriction = data.ageRestriction ? Number(data.ageRestriction) : undefined;
        this.genres = data.genres;
        this.venue = data.venue;
        this.location = data.location;
        this.tickets = data.tickets
            ? data.tickets.map((ticket) => {
                var _a;
                return (Object.assign(Object.assign({}, ticket), { price: Number(ticket.price), quantity: Number(ticket.quantity), sold: (_a = ticket.sold) !== null && _a !== void 0 ? _a : 0 }));
            })
            : undefined;
        this.tags = data.tags;
        this.bulletPoints = data.bulletPoints;
        this.refundPolicy = data.refundPolicy;
        this.isFeatured = data.isFeatured;
        this.status = data.status;
        this.organizer = data.organizer;
    }
}
exports.UpdateEventRequestDto = UpdateEventRequestDto;
class UpdateEventStatusRequestDto {
    constructor(data) {
        if (!data.status)
            throw new HttpError_1.HttpError(400, "Missing required field: status");
        this.status = data.status;
    }
}
exports.UpdateEventStatusRequestDto = UpdateEventStatusRequestDto;
class EventResponseDto {
    constructor(event) {
        var _a;
        this.id = event._id.toString();
        this.slug = event.slug;
        this.title = event.title;
        this.category = event.category || "";
        this.banner = event.banner;
        this.description = event.description;
        this.startDate = event.startDate;
        this.endDate = event.endDate;
        this.startTime = event.startTime;
        this.endTime = event.endTime;
        this.capacity = event.capacity;
        this.ageRestriction = event.ageRestriction;
        this.genres = ((_a = event.genres) === null || _a === void 0 ? void 0 : _a.map((g) => g.toString())) || [];
        this.venue = event.venue;
        this.location = event.location;
        this.tickets = event.tickets;
        this.organizer = event.organizer;
        this.tags = event.tags;
        this.bulletPoints = event.bulletPoints;
        this.refundPolicy = event.refundPolicy || "non-refundable";
        this.isFeatured = event.isFeatured;
        this.favorites = event.favorites;
        this.status = event.status;
        this.createdAt = event.createdAt;
        this.updatedAt = event.updatedAt;
        this.totalSold = event.tickets.reduce((sum, t) => sum + t.sold, 0);
        this.totalTickets = event.tickets.reduce((sum, t) => sum + t.quantity, 0);
        const now = new Date();
        let computedStatus = "draft";
        if (event.status === "published") {
            if (now < event.startDate) {
                computedStatus = "upcoming";
            }
            else if (event.endDate && now > event.endDate) {
                computedStatus = "completed";
            }
            else {
                computedStatus = "ongoing";
            }
        }
        this.computedStatus = computedStatus;
        this.wishlisted = event.wishlisted || false;
    }
}
exports.EventResponseDto = EventResponseDto;
class EventListResponseDto {
    constructor(events, total, page, limit) {
        this.events = events.map((event) => new EventResponseDto(event));
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
exports.EventListResponseDto = EventListResponseDto;
class BrowseEventsQueryDto {
    constructor(data) {
        const getString = (val) => {
            if (typeof val === "string")
                return val;
            if (Array.isArray(val) && val.length > 0 && typeof val[0] === "string")
                return val[0];
            return undefined;
        };
        const pageStr = getString(data.page);
        const limitStr = getString(data.limit);
        const dateStr = getString(data.date);
        const categoryStr = getString(data.category);
        const weekdaysStr = getString(data.weekdays);
        const locationStr = getString(data.location);
        const searchStr = getString(data.search);
        const computedStatusStr = getString(data.computedStatus);
        const sortByStr = getString(data.sortBy);
        const sortOrderStr = getString(data.sortOrder);
        this.page = pageStr ? parseInt(pageStr, 10) : 1;
        this.limit = limitStr ? parseInt(limitStr, 10) : 10;
        this.date = dateStr;
        this.category = categoryStr;
        this.weekdays = weekdaysStr;
        this.location = locationStr;
        this.search = searchStr;
        this.computedStatus = computedStatusStr || undefined;
        this.sortBy = sortByStr || undefined;
        this.sortOrder = sortOrderStr || "asc";
        if (isNaN(this.page) || isNaN(this.limit)) {
            throw new HttpError_1.HttpError(400, "Invalid page or limit");
        }
    }
}
exports.BrowseEventsQueryDto = BrowseEventsQueryDto;
