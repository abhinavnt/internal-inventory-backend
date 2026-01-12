import express from "express";
import { TYPES } from "../di/types";
import container from "../di/container";
import { IExpenseController } from "../core/interfaces/controllers/IExpenseController";
import { UserRole } from "../core/constants/user.enum";
import { authMiddleware } from "../middlewares/authMiddleWare";

const router = express.Router();

const controller = container.get<IExpenseController>(
  TYPES.ExpenseController
);

router.post("/", authMiddleware([UserRole.ADMIN]), controller.create);
router.get("/product/:productId", authMiddleware([UserRole.ADMIN]), controller.getProductExpense);
router.get("/total", authMiddleware([UserRole.ADMIN]), controller.getTotalExpense);

export default router;
