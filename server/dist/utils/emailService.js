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
exports.sendReplyEmail = exports.sendNewsletterEmail = exports.sendOtpEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.EMAIL, "user email from otp service");
console.log(process.env.PASS, "user pass from otp service");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});
const sendOtpEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp}\n\nThis code will expire in 5 minutes.`,
        };
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error("Error while sending email:", error);
        throw new Error("Failed to send OTP email");
    }
});
exports.sendOtpEmail = sendOtpEmail;
const sendNewsletterEmail = (email, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p>`,
        };
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error("Error while sending newsletter email:", error);
        throw new Error("Failed to send newsletter email");
    }
});
exports.sendNewsletterEmail = sendNewsletterEmail;
const sendReplyEmail = (toEmail, originalSubject, replyMessage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: toEmail,
            subject: `Re: ${originalSubject}`,
            html: `<p>Dear ${toEmail.split("@")[0]},</p><p>${replyMessage}</p><p>Best regards,<br>Event Platform Team</p>`,
        };
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error("Error while sending reply email:", error);
        throw new Error("Failed to send reply email");
    }
});
exports.sendReplyEmail = sendReplyEmail;
