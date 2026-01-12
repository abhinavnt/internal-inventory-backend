"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizerResponseDto = exports.UserResponseDto = void 0;
class UserResponseDto {
    constructor(data) {
        this.id = data._id.toString();
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.role = data.role;
        this.dob = data.dob;
        this.city = data.city;
        this.genres = data.genres;
        this.isVerified = data.isVerified;
        this.isBlocked = data.isBlocked;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
exports.UserResponseDto = UserResponseDto;
class OrganizerResponseDto extends UserResponseDto {
    constructor(data) {
        super(data);
        this.role = data.role;
        this.companyName = data.companyName;
        this.country = data.country;
        this.state = data.state;
        this.instagramUrl = data.instagramUrl;
        this.facebookUrl = data.facebookUrl;
        this.companyLogo = data.companyLogo;
    }
}
exports.OrganizerResponseDto = OrganizerResponseDto;
