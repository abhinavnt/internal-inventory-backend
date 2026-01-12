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
exports.PaymentRepository = void 0;
const base_repository_1 = require("../core/abstracts/base.repository");
const Payment_1 = __importDefault(require("../models/Payment"));
class PaymentRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(Payment_1.default);
    }
    createPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.create(data);
        });
    }
    getPaymentByBookingId(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne({ bookingId });
        });
    }
    updatePaymentStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, { status });
        });
    }
    getPaymentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findById(id);
        });
    }
}
exports.PaymentRepository = PaymentRepository;
