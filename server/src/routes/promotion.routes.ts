import express from "express";
import { TYPES } from "../di/types";
import container from "../di/container";
import { IPromotionController } from "../core/interfaces/controllers/IPromotionController";
import { UserRole } from "../core/constants/user.enum";
import { authMiddleware } from "../middlewares/authMiddleWare";

const router = express.Router();

const controller = container.get<IPromotionController>(
  TYPES.PromotionController
);

router.post("/:productId", authMiddleware([UserRole.ADMIN]), controller.create);
router.get("/:productId", authMiddleware([UserRole.ADMIN]), controller.getByProduct);

export default router;
