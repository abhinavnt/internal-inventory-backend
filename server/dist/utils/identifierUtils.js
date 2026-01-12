"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdentifierType = getIdentifierType;
function getIdentifierType(identifier) {
    if (!identifier) {
        throw new Error("Identifier is required");
    }
    const isEmail = identifier.includes("@");
    return {
        type: isEmail ? "email" : "phone",
        value: identifier,
    };
}
