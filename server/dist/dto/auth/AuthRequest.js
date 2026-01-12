"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizerRegistrationRequestDto = exports.UserRegistrationRequestDto = void 0;
const HttpError_1 = require("../../utils/HttpError");
// Helper – splits the incoming "identifier" into
function splitIdentifier(identifier) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(identifier)) {
        return { email: identifier };
    }
    // Keep only digits, +, ( )
    const phone = identifier.replace(/[^\d+()]/g, "");
    return { phone: phone || undefined };
}
class UserRegistrationRequestDto {
    constructor(data) {
        this.role = "user";
        const { identifier, password } = data, rest = __rest(data, ["identifier", "password"]);
        if (!identifier || !password) {
            throw new HttpError_1.HttpError(400, "Missing required fields: identifier or password");
        }
        const { email, phone } = splitIdentifier(identifier);
        if (!email && !phone) {
            throw new HttpError_1.HttpError(400, "Identifier must be a valid email or phone number");
        }
        this.email = email;
        this.phone = phone;
        this.password = password;
        Object.assign(this, rest);
    }
}
exports.UserRegistrationRequestDto = UserRegistrationRequestDto;
class OrganizerRegistrationRequestDto {
    constructor(data) {
        this.role = "organizer";
        if (!data.email || !data.password) {
            throw new HttpError_1.HttpError(400, "Missing required fields: email or password");
        }
        Object.assign(this, data);
    }
}
exports.OrganizerRegistrationRequestDto = OrganizerRegistrationRequestDto;
