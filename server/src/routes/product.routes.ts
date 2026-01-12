import express from "express";
import { TYPES } from "../di/types";
import container from "../di/container";
import { IProductController } from "../core/interfaces/controllers/IProductController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { UserRole } from "../core/constants/user.enum";

const router = express.Router();

const controller = container.get<IProductController>(
  TYPES.ProductController
);

router.post("/", authMiddleware([UserRole.ADMIN]), controller.create);
router.put("/:id", authMiddleware([UserRole.ADMIN]), controller.update);
router.get("/", authMiddleware([UserRole.ADMIN]), controller.getAll);
router.get("/:id", authMiddleware([UserRole.ADMIN]), controller.getById);

export default router;
