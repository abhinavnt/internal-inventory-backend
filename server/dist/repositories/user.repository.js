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
exports.UserRepository = void 0;
const base_repository_1 = require("../core/abstracts/base.repository");
const User_1 = require("../models/User");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(User_1.User);
    }
    create(data) {
        return this.model.create(data);
    }
    findByPhoneOrEmail(field, value) {
        return this.findOne({ [field]: value });
    }
    findByUserId(userId) {
        return this.findById(userId);
    }
    updateUser(userId, data) {
        return this.findByIdAndUpdate(userId, data, { new: true });
    }
    //for admin panel
    getAllUsers(skip, limit, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
        });
    }
    countAllUsers(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.countDocuments(filter);
        });
    }
    updateUserStatus(id, isBlocked) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, { isBlocked });
        });
    }
    //dashboard
    getRecentUsers(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.model.aggregate([{ $project: { name: 1, email: 1, createdAt: 1 } }, { $sort: { createdAt: -1 } }, { $limit: limit }]);
            return res.map((r) => ({ name: r.name, email: r.email, createdAt: r.createdAt }));
        });
    }
}
exports.UserRepository = UserRepository;
