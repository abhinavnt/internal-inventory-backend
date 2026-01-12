import express from "express";
import { TYPES } from "../di/types";
import container from "../di/container";
import { ICapitalController } from "../core/interfaces/controllers/ICapitalController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { UserRole } from "../core/constants/user.enum";

const router = express.Router();

const controller = container.get<ICapitalController>(
  TYPES.CapitalController
);

router.post("/", authMiddleware([UserRole.ADMIN]), controller.create);
router.put("/", authMiddleware([UserRole.ADMIN]), controller.update);
router.get("/", authMiddleware([UserRole.ADMIN]), controller.get);

export default router;
