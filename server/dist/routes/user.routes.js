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
const router = express_1.default.Router();
const userController = container_1.default.get(types_1.TYPES.userController);
router.get("/", (0, authMiddleWare_1.authMiddleware)([user_enum_1.UserRole.ADMIN]), userController.getAllUsers);
router.get("/stats", (0, authMiddleWare_1.authMiddleware)([user_enum_1.UserRole.ADMIN]), userController.getUserStats);
router.get("/me", (0, authMiddleWare_1.authMiddleware)([user_enum_1.UserRole.USER]), userController.getUserProfile);
router.patch("/me", (0, authMiddleWare_1.authMiddleware)([user_enum_1.UserRole.USER]), userController.updateUserProfile);
router.get("/:id", (0, authMiddleWare_1.authMiddleware)([user_enum_1.UserRole.ADMIN]), userController.getUserById);
router.patch("/:id/status", (0, authMiddleWare_1.authMiddleware)([user_enum_1.UserRole.ADMIN]), userController.updateUserStatus);
exports.default = router;
