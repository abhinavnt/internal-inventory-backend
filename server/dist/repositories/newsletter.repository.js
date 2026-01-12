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
exports.NewsletterRepository = void 0;
const base_repository_1 = require("../core/abstracts/base.repository");
const Subscriber_1 = require("../models/Subscriber");
class NewsletterRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(Subscriber_1.Subscriber);
    }
    createSubscriber(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.create(data);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne({ email });
        });
    }
    getSubscriberById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findById(id);
        });
    }
    getAllSubscribers(page, limit, search) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (search) {
                query.email = { $regex: search, $options: "i" };
            }
            const total = yield this.countDocuments(query);
            const subscribers = yield this.find(query)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ subscribedAt: -1 });
            return { subscribers, total };
        });
    }
    getAllSubscribersEmailsOnly() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({}).select("email");
        });
    }
    getSubscribersByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ _id: { $in: ids } }).select("email");
        });
    }
    deleteSubscriber(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(id);
        });
    }
}
exports.NewsletterRepository = NewsletterRepository;
