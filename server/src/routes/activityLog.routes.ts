import express from "express";
import { TYPES } from "../di/types";
import container from "../di/container";
import { IActivityLogController } from "../core/interfaces/controllers/IActivityLogController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { UserRole } from "../core/constants/user.enum";

const router = express.Router();

const controller = container.get<IActivityLogController>(TYPES.ActivityLogController);

router.get("/", authMiddleware([UserRole.ADMIN]), controller.getAll);

export default router;
