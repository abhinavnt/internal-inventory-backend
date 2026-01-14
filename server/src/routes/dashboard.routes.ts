import express from "express";
import { TYPES } from "../di/types";
import container from "../di/container";
import { IDashboardController } from "../core/interfaces/controllers/IDashboardController";
import { UserRole } from "../core/constants/user.enum";
import { authMiddleware } from "../middlewares/authMiddleWare";

const router = express.Router();

const controller = container.get<IDashboardController>(
  TYPES.DashboardController
);

router.get("/", authMiddleware([UserRole.ADMIN]), controller.getSummary);

export default router;
