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
exports.DashboardService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
let DashboardService = class DashboardService {
    constructor(eventRepository, bookingRepository, userRepository) {
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }
    getStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const [totalEvents, totalUsers, sales] = yield Promise.all([
                this.eventRepository.countAllEvents({}),
                this.userRepository.countAllUsers({}),
                this.eventRepository.getGlobalSalesSummary(), // aggregate tickets + revenue
            ]);
            return {
                totalEvents,
                totalUsers,
                ticketsSold: sales.totalSold,
                totalRevenue: sales.totalRevenue,
            };
        });
    }
    getRevenue() {
        return __awaiter(this, arguments, void 0, function* (months = 7) {
            var _a;
            // This & previous month windows
            const now = new Date();
            const startThis = new Date(now.getFullYear(), now.getMonth(), 1);
            const startPrev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const endPrev = new Date(now.getFullYear(), now.getMonth(), 1);
            const endThis = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            const [{ revenue: thisMonthRevenue }, { revenue: prevMonthRevenue }] = yield Promise.all([
                this.bookingRepository.getRevenueAndTicketsByDateRange(startThis, endThis),
                this.bookingRepository.getRevenueAndTicketsByDateRange(startPrev, endPrev),
            ]);
            // Monthly series
            const series = yield this.bookingRepository.getMonthlyRevenueSeries(months);
            // Build chartData with month short names; fill missing months with 0
            const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const chartData = [];
            for (let i = months - 1; i >= 0; i--) {
                const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
                const found = series.find((s) => s.yyyymm === key);
                chartData.push({ month: labels[d.getMonth()], revenue: (_a = found === null || found === void 0 ? void 0 : found.revenue) !== null && _a !== void 0 ? _a : 0 });
            }
            const daysSoFar = Math.max(1, Math.min(31, Math.ceil((now.getTime() - startThis.getTime()) / (1000 * 60 * 60 * 24))));
            const averagePerDay = Math.floor(thisMonthRevenue / daysSoFar);
            const growth = thisMonthRevenue - prevMonthRevenue;
            const growthPercentage = prevMonthRevenue > 0 ? Number(((growth / prevMonthRevenue) * 100).toFixed(1)) : 100;
            return {
                thisMonth: thisMonthRevenue,
                previousMonth: prevMonthRevenue,
                averagePerDay,
                growth,
                growthPercentage,
                chartData,
            };
        });
    }
    getRecentActivity() {
        return __awaiter(this, arguments, void 0, function* (limit = 10) {
            // pull small slices then merge/sort in memory
            const [bookings, users, events] = yield Promise.all([
                this.bookingRepository.getRecentBookings(limit),
                this.userRepository.getRecentUsers(limit),
                this.eventRepository.getRecentEvents(limit),
            ]);
            const items = [];
            bookings.forEach((b) => {
                items.push({
                    type: "booking",
                    title: "New Booking",
                    description: `A booking was created (₹${b.totalAmount.toLocaleString()})`,
                    timestamp: b.createdAt,
                });
            });
            users.forEach((u) => {
                var _a;
                items.push({
                    type: "user",
                    title: "New User",
                    description: `${(_a = u.name) !== null && _a !== void 0 ? _a : "User"} ${u.email ? `(${u.email})` : ""} registered`.trim(),
                    timestamp: u.createdAt,
                });
            });
            events.forEach((e) => {
                items.push({
                    type: "event",
                    title: "Event Created",
                    description: e.title,
                    timestamp: e.createdAt,
                });
            });
            items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
            return items.slice(0, limit);
        });
    }
    getSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            const [stats, revenue, activities] = yield Promise.all([this.getStats(), this.getRevenue(7), this.getRecentActivity(10)]);
            return { stats, revenue, activities };
        });
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.EventRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.BookingRepository)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], DashboardService);
