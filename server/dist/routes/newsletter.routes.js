"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/newsletter.ts
const express_1 = __importDefault(require("express"));
const types_1 = require("../di/types");
const container_1 = __importDefault(require("../di/container"));
const authMiddleWare_1 = require("../middlewares/authMiddleWare");
const user_enum_1 = require("../core/constants/user.enum");
const router = express_1.default.Router();
const newsletterController = container_1.default.get(types_1.TYPES.newsletterController);
router.post("/", newsletterController.subscribe);
router.post("/unsubscribe", newsletterController.unsubscribe);
router.get("/", (0, authMiddleWare_1.authMiddleware)([user_enum_1.UserRole.ADMIN]), newsletterController.getAllSubscribers);
router.delete("/:id", (0, authMiddleWare_1.authMiddleware)([user_enum_1.UserRole.ADMIN]), newsletterController.deleteSubscriber);
router.post("/send", (0, authMiddleWare_1.authMiddleware)([user_enum_1.UserRole.ADMIN]), newsletterController.sendNewsletter);
exports.default = router;
