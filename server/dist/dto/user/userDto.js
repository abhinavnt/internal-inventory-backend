"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatsResponseDto = exports.UserListResponseDto = exports.UserResponseDto = exports.UpdateUserProfileDto = exports.UserListQueryDto = void 0;
const HttpError_1 = require("../../utils/HttpError");
class UserListQueryDto {
    constructor(data) {
        const getString = (val) => {
            if (typeof val === "string")
                return val;
            if (Array.isArray(val) && val.length > 0 && typeof val[0] === "string")
                return val[0];
            return undefined;
        };
        this.page = parseInt(getString(data.page) || "1", 10);
        this.limit = parseInt(getString(data.limit) || "10", 10);
        this.search = getString(data.search);
        this.status = getString(data.status);
        this.role = getString(data.role);
        this.sortBy = getString(data.sortBy);
        this.sortOrder = getString(data.sortOrder) || "asc";
        if (isNaN(this.page) || isNaN(this.limit)) {
            throw new HttpError_1.HttpError(400, "Invalid page or limit");
        }
    }
}
exports.UserListQueryDto = UserListQueryDto;
class UpdateUserProfileDto {
    constructor(data) {
        this.name = data.name;
        this.phone = data.phone;
        if (data.dob)
            this.dob = new Date(data.dob);
        this.city = data.city;
        this.genres = data.genres;
        this.companyName = data.companyName;
        this.country = data.country;
        this.state = data.state;
        this.instagramUrl = data.instagramUrl;
        this.facebookUrl = data.facebookUrl;
        this.companyLogo = data.companyLogo;
    }
}
exports.UpdateUserProfileDto = UpdateUserProfileDto;
class UserResponseDto {
    constructor(user) {
        this.id = user._id.toString();
        this.name = user.name || "";
        this.email = user.email || "";
        this.phone = user.phone;
        this.role = user.role;
        this.status = user.isBlocked ? "blocked" : "active";
        this.joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" });
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.dob = user.dob;
        this.city = user.city;
    }
}
exports.UserResponseDto = UserResponseDto;
class UserListResponseDto {
    constructor(users, total, page, limit) {
        this.users = users.map((user) => new UserResponseDto(user));
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
exports.UserListResponseDto = UserListResponseDto;
class UserStatsResponseDto {
    constructor(totalUsers, activeUsers, blockedUsers) {
        this.totalUsers = totalUsers;
        this.activeUsers = activeUsers;
        this.blockedUsers = blockedUsers;
    }
}
exports.UserStatsResponseDto = UserStatsResponseDto;
