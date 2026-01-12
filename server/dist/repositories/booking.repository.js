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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const base_repository_1 = require("../core/abstracts/base.repository");
const Booking_1 = require("../models/Booking");
class BookingRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(Booking_1.Booking);
    }
    createBooking(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.create(data);
        });
    }
    getBookingById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findById(id);
        });
    }
    getBookingsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongoose_1.default.Types.ObjectId(userId);
            const bookings = yield Booking_1.Booking.aggregate([
                { $match: { userId: objectId } },
                {
                    $lookup: {
                        from: "events",
                        localField: "eventId",
                        foreignField: "_id",
                        as: "event",
                    },
                },
                { $unwind: "$event" },
                {
                    $project: {
                        _id: 1,
                        userId: 1,
                        eventId: 1,
                        eventTitle: "$event.title",
                        eventStartDate: "$event.startDate",
                        venue: "$event.venue",
                        tickets: 1,
                        totalAmount: 1,
                        paymentStatus: 1,
                        bookingStatus: 1,
                        barcodeData: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
                { $sort: { createdAt: -1 } },
            ]);
            return bookings;
        });
    }
    getBookingsByEvent(eventId_1) {
        return __awaiter(this, arguments, void 0, function* (eventId, page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            const total = yield this.countDocuments({ eventId });
            const totalRevenue = yield this.aggregate([{ $match: { eventId } }, { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }]).then((res) => { var _a; return ((_a = res[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0; });
            const bookings = yield this.find({ eventId }).populate("userId", "name email").sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
            return { bookings, total, totalRevenue };
        });
    }
    getAllBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({});
        });
    }
    updateBooking(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, data);
        });
    }
    cancelBooking(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, { bookingStatus: "cancelled" });
        });
    }
    findBookingByBarcode(barcodeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne({ barcodeData });
        });
    }
    getUsersByEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookings = yield this.model.find({ eventId }).populate("userId", "name companyLogo email").exec();
            const users = bookings.map((b) => b.userId);
            const uniqueUsers = users.filter((u, i, self) => u && self.findIndex((x) => x._id.toString() === u._id.toString()) === i);
            return uniqueUsers;
        });
    }
    getUsersBookedEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookings = yield this.model.find({ eventId }).populate("userId", "name email").select("userId").lean();
            const uniqueUsers = new Map();
            bookings.forEach((b) => {
                const user = b.userId;
                if (user && !uniqueUsers.has(user._id.toString())) {
                    uniqueUsers.set(user._id.toString(), user);
                }
            });
            return Array.from(uniqueUsers.values());
        });
    }
    getBookingWithEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongoose_1.default.Types.ObjectId(id);
            const result = yield Booking_1.Booking.aggregate([
                { $match: { _id: objectId } },
                {
                    $lookup: {
                        from: "events",
                        localField: "eventId",
                        foreignField: "_id",
                        as: "event",
                    },
                },
                { $unwind: "$event" },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                { $unwind: "$user" },
                {
                    $project: {
                        _id: 1,
                        userId: "$user._id",
                        userName: "$user.name",
                        userEmail: "$user.email",
                        eventId: "$event._id",
                        eventTitle: "$event.title",
                        eventBanner: "$event.banner",
                        eventStartDate: "$event.startDate",
                        eventEndDate: "$event.endDate",
                        eventStartTime: "$event.startTime",
                        eventEndTime: "$event.endTime",
                        venue: "$event.venue",
                        tickets: 1,
                        totalAmount: 1,
                        paymentStatus: 1,
                        bookingStatus: 1,
                        barcodeData: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
            ]);
            return result[0] || null;
        });
    }
    //dashboard
    //Paid revenue and ticket count in a date range (by createdAt)
    getRevenueAndTicketsByDateRange(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const res = yield this.model.aggregate([
                {
                    $match: {
                        createdAt: { $gte: start, $lt: end },
                        paymentStatus: "paid",
                    },
                },
                { $unwind: "$tickets" },
                {
                    $group: {
                        _id: null,
                        revenue: { $sum: "$totalAmount" },
                        tickets: { $sum: "$tickets.quantity" },
                    },
                },
            ]);
            return { revenue: (_b = (_a = res[0]) === null || _a === void 0 ? void 0 : _a.revenue) !== null && _b !== void 0 ? _b : 0, tickets: (_d = (_c = res[0]) === null || _c === void 0 ? void 0 : _c.tickets) !== null && _d !== void 0 ? _d : 0 };
        });
    }
    //Monthly revenue series for last `months` (including current month).Returns array sorted by ascending month index.
    getMonthlyRevenueSeries(months) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
            const res = yield this.model.aggregate([
                {
                    $match: {
                        createdAt: { $gte: start, $lt: new Date(now.getFullYear(), now.getMonth() + 1, 1) },
                        paymentStatus: "paid",
                    },
                },
                {
                    $group: {
                        _id: { y: { $year: "$createdAt" }, m: { $month: "$createdAt" } },
                        revenue: { $sum: "$totalAmount" },
                    },
                },
                { $project: { _id: 0, yyyymm: { $concat: [{ $toString: "$_id.y" }, "-", { $toString: "$_id.m" }] }, revenue: 1 } },
                { $sort: { yyyymm: 1 } },
            ]);
            return res;
        });
    }
    // Recent bookings for activity feed.
    getRecentBookings(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.model.aggregate([
                { $project: { eventId: 1, totalAmount: 1, createdAt: 1 } },
                { $sort: { createdAt: -1 } },
                { $limit: limit },
            ]);
            return res.map((r) => ({
                eventId: String(r.eventId),
                totalAmount: r.totalAmount,
                createdAt: r.createdAt,
            }));
        });
    }
}
exports.BookingRepository = BookingRepository;
