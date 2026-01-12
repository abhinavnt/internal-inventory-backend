"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardSummaryResponseDto = exports.RecentActivityItemDto = exports.RevenueChartResponseDto = exports.DashboardStatsResponseDto = void 0;
class DashboardStatsResponseDto {
    constructor(data) {
        this.totalEvents = data.totalEvents;
        this.totalUsers = data.totalUsers;
        this.ticketsSold = data.ticketsSold;
        this.totalRevenue = data.totalRevenue;
    }
}
exports.DashboardStatsResponseDto = DashboardStatsResponseDto;
class RevenueChartResponseDto {
    constructor(data) {
        this.thisMonth = data.thisMonth;
        this.previousMonth = data.previousMonth;
        this.averagePerDay = data.averagePerDay;
        this.growth = data.growth;
        this.growthPercentage = data.growthPercentage;
        this.chartData = data.chartData;
    }
}
exports.RevenueChartResponseDto = RevenueChartResponseDto;
class RecentActivityItemDto {
    constructor(item) {
        this.type = item.type;
        this.title = item.title;
        this.description = item.description;
        this.timestamp = new Date(item.timestamp);
    }
}
exports.RecentActivityItemDto = RecentActivityItemDto;
class DashboardSummaryResponseDto {
    constructor(stats, revenue, activities) {
        this.stats = new DashboardStatsResponseDto(stats);
        this.revenue = new RevenueChartResponseDto(revenue);
        this.activities = activities.map((a) => new RecentActivityItemDto(a));
    }
}
exports.DashboardSummaryResponseDto = DashboardSummaryResponseDto;
