"use strict";
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
exports.EventRepository = void 0;
const mongoose_1 = require("mongoose");
const base_repository_1 = require("../core/abstracts/base.repository");
const Event_1 = require("../models/Event");
class EventRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(Event_1.Event);
    }
    checkSlugExists(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.model.countDocuments({ slug });
            return count > 0;
        });
    }
    //  Find event by slug for frontend routing
    getEventBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findOne({ slug });
        });
    }
    createEvent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.create(data);
        });
    }
    getAllEvents(skip_1, limit_1) {
        return __awaiter(this, arguments, void 0, function* (skip, limit, filter = {}, sort) {
            return this.find(filter).sort({ startDate: 1 }).skip(skip).limit(limit).exec();
        });
    }
    countAllEvents() {
        return __awaiter(this, arguments, void 0, function* (filter = {}) {
            return this.countDocuments(filter);
        });
    }
    getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findById(id);
        });
    }
    updateEvent(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, data);
        });
    }
    updateEventStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, { status });
        });
    }
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(id);
        });
    }
    updateTicketSoldCount(id, ticketType, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOneAndUpdate({ _id: id, "tickets.ticketType": ticketType }, { $inc: { "tickets.$[elem].sold": quantity, totalSold: quantity } }, {
                arrayFilters: [{ "elem.ticketType": ticketType }],
                new: true,
            });
        });
    }
    aggregate(pipeline) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.aggregate(pipeline).exec();
        });
    }
    toggleWishlist(eventId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.findById(eventId);
            if (!event)
                return null;
            const alreadyWishlisted = event.wishlistedBy.some((id) => id.toString() === userId);
            if (alreadyWishlisted) {
                event.wishlistedBy = event.wishlistedBy.filter((id) => id.toString() !== userId);
            }
            else {
                event.wishlistedBy.push(new mongoose_1.Types.ObjectId(userId));
            }
            yield event.save();
            return event;
        });
    }
    getWishlistEvents(userId, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ wishlistedBy: userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
        });
    }
    countWishlistEvents(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.countDocuments({ wishlistedBy: userId });
        });
    }
    getUsersWishlistedEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.model.findById(eventId).populate("wishlistedBy", "name email").select("wishlistedBy").lean();
            if (!event || !event.wishlistedBy)
                return [];
            return event.wishlistedBy;
        });
    }
    addVisitedUser(eventId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.findByIdAndUpdate(eventId, { $addToSet: { visitedUsers: userId } }, { new: true });
        });
    }
    getUsersVisitedEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.model.findById(eventId).populate("visitedUsers", "name email").select("visitedUsers").lean();
            if (!event || !event.visitedUsers)
                return [];
            return event.visitedUsers;
        });
    }
    //dashboard
    getGlobalSalesSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const res = yield this.model.aggregate([
                { $unwind: "$tickets" },
                {
                    $group: {
                        _id: null,
                        totalSold: { $sum: "$tickets.sold" },
                        totalRevenue: { $sum: { $multiply: ["$tickets.price", "$tickets.sold"] } },
                    },
                },
            ]);
            return { totalSold: (_b = (_a = res[0]) === null || _a === void 0 ? void 0 : _a.totalSold) !== null && _b !== void 0 ? _b : 0, totalRevenue: (_d = (_c = res[0]) === null || _c === void 0 ? void 0 : _c.totalRevenue) !== null && _d !== void 0 ? _d : 0 };
        });
    }
    //Recent events for activity feed.
    getRecentEvents(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.model.aggregate([{ $project: { title: 1, createdAt: 1 } }, { $sort: { createdAt: -1 } }, { $limit: limit }]);
            return res.map((r) => ({ title: r.title, createdAt: r.createdAt }));
        });
    }
}
exports.EventRepository = EventRepository;
