import express from "express";
import dotenv from "dotenv";
import { TYPES } from "../di/types";
import container from "../di/container";
import { IAuthController } from "../core/interfaces/controllers/IAuthController";

dotenv.config();
const router = express.Router();

const authController = container.get<IAuthController>(TYPES.AuthController);

router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

export default router;
