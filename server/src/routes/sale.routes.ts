import express from "express";
import { TYPES } from "../di/types";
import container from "../di/container";
import { ISaleController } from "../core/interfaces/controllers/ISaleController";
import { UserRole } from "../core/constants/user.enum";
import { authMiddleware } from "../middlewares/authMiddleWare";

const router = express.Router();

const controller = container.get<ISaleController>(TYPES.SaleController);

router.post("/:productId", authMiddleware([UserRole.ADMIN]), controller.create);
router.get("/:productId", authMiddleware([UserRole.ADMIN]), controller.getByProduct);

export default router;
