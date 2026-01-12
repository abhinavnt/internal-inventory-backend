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
exports.EventService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const eventDto_1 = require("../dto/events/eventDto");
const HttpError_1 = require("../utils/HttpError");
let EventService = class EventService {
    constructor(eventRepository, bookingRepository) {
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
    }
    createEvent(dto, bannerUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dto.slug)
                throw new HttpError_1.HttpError(400, "Slug is required");
            const slugExists = yield this.eventRepository.checkSlugExists(dto.slug);
            if (slugExists)
                throw new HttpError_1.HttpError(400, "Slug already exists");
            // Prepare data object
            const data = {
                slug: dto.slug,
                title: dto.title,
                description: dto.description,
                category: dto.category,
                startDate: dto.startDate,
                endDate: dto.endDate,
                startTime: dto.startTime,
                endTime: dto.endTime,
                capacity: dto.capacity,
                ageRestriction: dto.ageRestriction,
                genres: dto.genres,
                venue: dto.venue,
                location: dto.location,
                tickets: dto.tickets.map((ticket) => {
                    var _a;
                    return (Object.assign(Object.assign({}, ticket), { sold: (_a = ticket.sold) !== null && _a !== void 0 ? _a : 0 }));
                }),
                organizer: dto.organizer,
                tags: dto.tags,
                bulletPoints: dto.bulletPoints,
                refundPolicy: dto.refundPolicy,
                status: dto.status,
                totalSold: 0,
            };
            // Add banner URL if provided
            if (bannerUrl) {
                data.banner = bannerUrl;
            }
            console.log("data from the service event", data);
            const event = yield this.eventRepository.createEvent(data);
            return new eventDto_1.EventResponseDto(event);
        });
    }
    // check slug for inline validation
    checkSlugAvailability(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.eventRepository.checkSlugExists(slug);
            return { available: !exists };
        });
    }
    // get event by slug
    getEventBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.eventRepository.getEventBySlug(slug);
            if (!event)
                return null;
            return new eventDto_1.EventResponseDto(event);
        });
    }
    getAllEvents(query, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = query;
            const skip = (page - 1) * limit;
            const filterQuery = this.buildFilter(query);
            const sortObj = this.buildSort(query);
            const [events, total] = yield Promise.all([
                this.eventRepository.getAllEvents(skip, limit, filterQuery, sortObj),
                this.eventRepository.countAllEvents(filterQuery),
            ]);
            let finalEvents = events;
            if (userId) {
                const eventsWithWishlist = events.map((e) => (Object.assign(Object.assign({}, e.toObject()), { wishlisted: e.wishlistedBy.some((id) => id.toString() === userId) })));
                finalEvents = eventsWithWishlist;
            }
            return new eventDto_1.EventListResponseDto(finalEvents, total, page, limit);
        });
    }
    buildFilter(query) {
        let filter = {};
        //  Handle computedStatus filter
        if (query.computedStatus && query.computedStatus !== "all") {
            const now = new Date();
            if (query.computedStatus === "draft") {
                filter.status = "draft";
            }
            else if (query.computedStatus === "upcoming") {
                filter.$and = [{ status: "published" }, { startDate: { $gt: now } }];
            }
            else if (query.computedStatus === "ongoing") {
                filter.$and = [{ status: "published" }, { startDate: { $lte: now } }, { $or: [{ endDate: { $gte: now } }, { endDate: null }] }];
            }
            else if (query.computedStatus === "completed") {
                filter.$or = [{ status: "published", endDate: { $lt: now } }, { status: "cancelled" }];
            }
        }
        else {
            // Default to published for public, all for admin/computed all
            filter = {};
        }
        if (query.category) {
            filter.category = { $regex: query.category, $options: "i" };
        }
        if (query.location) {
            filter["location.city"] = query.location;
        }
        if (query.date) {
            const start = new Date(query.date);
            if (isNaN(start.getTime())) {
                throw new HttpError_1.HttpError(400, "Invalid date format");
            }
            const end = new Date(start.getTime() + 86400000);
            filter.startDate = { $gte: start, $lt: end };
        }
        if (query.weekdays) {
            const dayMap = {
                sunday: 0,
                monday: 1,
                tuesday: 2,
                wednesday: 3,
                thursday: 4,
                friday: 5,
                saturday: 6,
            };
            const lowerDay = query.weekdays.toLowerCase();
            const dayNum = dayMap[lowerDay];
            if (dayNum === undefined) {
                throw new HttpError_1.HttpError(400, "Invalid weekday");
            }
            filter.$expr = { $eq: [{ $dayOfWeek: "$startDate" }, dayNum] };
        }
        //  Handle search on title or organizer
        if (query.search) {
            filter.$or = [{ title: { $regex: query.search, $options: "i" } }, { organizer: { $regex: query.search, $options: "i" } }];
        }
        return filter;
    }
    buildSort(query) {
        let sortObj = { createdAt: -1 };
        if (query.sortBy) {
            const order = query.sortOrder === "desc" ? -1 : 1;
            switch (query.sortBy) {
                case "title":
                    sortObj.title = order;
                    break;
                case "date":
                    sortObj.startDate = order;
                    break;
                case "tickets":
                    sortObj.totalSold = order;
                    break;
                default:
                    sortObj.createdAt = -1;
            }
        }
        return sortObj;
    }
    //  Method for admin stats
    getEventStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalEvents = yield this.eventRepository.countAllEvents({});
            const now = new Date();
            const upcomingFilter = {
                status: "published",
                startDate: { $gt: now },
            };
            const upcomingEvents = yield this.eventRepository.countAllEvents(upcomingFilter);
            // Aggregate for totalSold and totalRevenue
            const aggregateResult = yield this.eventRepository.aggregate([
                { $unwind: "$tickets" },
                {
                    $group: {
                        _id: null,
                        totalSold: { $sum: "$tickets.sold" },
                        totalRevenue: { $sum: { $multiply: ["$tickets.price", "$tickets.sold"] } },
                    },
                },
            ]);
            const { totalSold = 0, totalRevenue = 0 } = aggregateResult[0] || {};
            return {
                totalEvents,
                upcomingEvents,
                totalTicketsSold: totalSold,
                totalRevenue,
            };
        });
    }
    getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.eventRepository.getEventById(id);
            if (!event)
                return null;
            return new eventDto_1.EventResponseDto(event);
        });
    }
    updateEvent(id, dto, bannerUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (dto.slug) {
                const exists = yield this.eventRepository.checkSlugExists(dto.slug);
                const existingEvent = yield this.eventRepository.getEventById(id);
                if (exists && (existingEvent === null || existingEvent === void 0 ? void 0 : existingEvent.slug) !== dto.slug)
                    throw new HttpError_1.HttpError(400, "Slug already exists");
            }
            const updateData = {
                slug: dto.slug,
                organizer: dto.organizer,
                title: dto.title,
                category: dto.category,
                description: dto.description,
                startDate: dto.startDate,
                endDate: dto.endDate,
                startTime: dto.startTime,
                endTime: dto.endTime,
                capacity: dto.capacity,
                ageRestriction: dto.ageRestriction,
                genres: dto.genres,
                venue: dto.venue,
                location: dto.location,
                tickets: (_a = dto.tickets) === null || _a === void 0 ? void 0 : _a.map((ticket) => {
                    var _a;
                    return (Object.assign(Object.assign({}, ticket), { sold: (_a = ticket.sold) !== null && _a !== void 0 ? _a : 0 }));
                }),
                tags: dto.tags,
                bulletPoints: dto.bulletPoints,
                refundPolicy: dto.refundPolicy,
                status: dto.status,
                isFeatured: dto.isFeatured,
            };
            if (bannerUrl)
                updateData.banner = bannerUrl;
            if (dto.tickets) {
                updateData.tickets = dto.tickets.map((ticket) => {
                    var _a;
                    return (Object.assign(Object.assign({}, ticket), { sold: (_a = ticket.sold) !== null && _a !== void 0 ? _a : 0 }));
                });
                updateData.totalSold = dto.tickets.reduce((sum, t) => { var _a; return sum + ((_a = t.sold) !== null && _a !== void 0 ? _a : 0); }, 0);
            }
            console.log("data from the update event service", updateData);
            const event = yield this.eventRepository.updateEvent(id, updateData);
            if (!event)
                return null;
            return new eventDto_1.EventResponseDto(event);
        });
    }
    updateEventStatus(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.eventRepository.updateEventStatus(id, dto.status);
            if (!event)
                return null;
            return new eventDto_1.EventResponseDto(event);
        });
    }
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.eventRepository.deleteEvent(id);
            if (!event)
                return null;
            return new eventDto_1.EventResponseDto(event);
        });
    }
    validateTickets(eventId, tickets) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.eventRepository.getEventById(eventId);
            if (!event) {
                throw new HttpError_1.HttpError(400, "Event not found");
            }
            if (event.status !== "published") {
                throw new HttpError_1.HttpError(400, "Event is not available for booking");
            }
            for (const ticket of tickets) {
                const eventTicket = event.tickets.find((t) => t.ticketType === ticket.ticketType && t.ticketName === ticket.ticketName);
                if (!eventTicket) {
                    throw new HttpError_1.HttpError(400, `Ticket ${ticket.ticketName} (${ticket.ticketType}) not found for event`);
                }
                if (eventTicket.price !== ticket.price) {
                    throw new HttpError_1.HttpError(400, `Invalid price for ticket ${ticket.ticketName} (${ticket.ticketType})`);
                }
                const available = eventTicket.quantity - eventTicket.sold;
                if (ticket.quantity > available) {
                    throw new HttpError_1.HttpError(400, `Not enough tickets available for ${ticket.ticketName} (${ticket.ticketType})`);
                }
            }
        });
    }
    updateTicketSoldCount(eventId, tickets) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const ticket of tickets) {
                const updatedEvent = yield this.eventRepository.updateTicketSoldCount(eventId, ticket.ticketType, ticket.quantity);
                if (!updatedEvent) {
                    throw new HttpError_1.HttpError(400, "Event not found or ticket type invalid");
                }
            }
        });
    }
    toggleWishlist(eventId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.eventRepository.toggleWishlist(eventId, userId);
            if (!event)
                throw new HttpError_1.HttpError(404, "Event not found");
            return new eventDto_1.EventResponseDto(event);
        });
    }
    getWishlistEvents(userId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            console.log("reached the getwishlist events");
            const [events, total] = yield Promise.all([
                this.eventRepository.getWishlistEvents(userId, skip, limit),
                this.eventRepository.countWishlistEvents(userId),
            ]);
            const eventsWithFlag = events.map((e) => (Object.assign(Object.assign({}, e.toObject()), { wishlisted: true })));
            return new eventDto_1.EventListResponseDto(eventsWithFlag, total, page, limit);
        });
    }
    getPeopleInterested(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate event exists
            const event = yield this.eventRepository.getEventById(eventId);
            if (!event)
                throw new HttpError_1.HttpError(404, "Event not found");
            // Fetch users who wishlisted this event
            const wishlistedUsers = yield this.eventRepository.getUsersWishlistedEvent(eventId);
            // Fetch users who visited this event
            const visitedUsers = yield this.eventRepository.getUsersVisitedEvent(eventId);
            // Merge wishlisted + visited users, removing duplicates
            const uniqueInterestedUsers = new Map();
            [...wishlistedUsers, ...visitedUsers].forEach((user) => {
                uniqueInterestedUsers.set(user._id.toString(), user);
            });
            // Fetch users who booked this event
            const bookedUsers = yield this.bookingRepository.getUsersBookedEvent(eventId);
            // Map to consistent response
            const interested = Array.from(uniqueInterestedUsers.values()).map((u) => ({
                id: u._id.toString(),
                name: u.name,
                email: u.email,
                type: "interested",
            }));
            const going = bookedUsers.map((u) => ({
                id: u._id.toString(),
                name: u.name,
                email: u.email,
                type: "going",
            }));
            //  Return combined results
            return {
                interested,
                going,
                totalInterested: interested.length,
                totalGoing: going.length,
            };
        });
    }
    addVisitedUser(eventId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("reached add vistired user service");
            const event = yield this.eventRepository.getEventById(eventId);
            if (!event)
                throw new HttpError_1.HttpError(404, "Event not found");
            yield this.eventRepository.addVisitedUser(eventId, userId);
            console.log("finished adding user to vsited list");
        });
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.EventRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.BookingRepository)),
    __metadata("design:paramtypes", [Object, Object])
], EventService);
