"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const types_1 = require("../di/types");
const container_1 = __importDefault(require("../di/container"));
const authMiddleWare_1 = require("../middlewares/authMiddleWare");
const user_enum_1 = require("../core/constants/user.enum");
const multer_1 = require("../config/multer");
const router = express_1.default.Router();
const testimonialController = container_1.default.get(types_1.TYPES.TestimonialController);
router.post("/", multer_1.uploadTestimonialImage, testimonialController.createTestimonial);
router.get("/", (0, authMiddleWare_1.authMiddleware)([user_enum_1.UserRole.ADMIN]), testimonialController.getAllTestimonials);
router.patch("/:id/status", (0, authMiddleWare_1.authMiddleware)([user_enum_1.UserRole.ADMIN]), testimonialController.updateStatus);
router.get("/approved", testimonialController.getApprovedTestimonials);
exports.default = router;
