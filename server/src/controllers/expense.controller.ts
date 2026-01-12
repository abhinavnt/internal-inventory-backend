import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { TYPES } from "../di/types";
import { IExpenseController } from "../core/interfaces/controllers/IExpenseController";
import { IExpenseService } from "../core/interfaces/services/IExpenseService";
import { CreateExpenseRequestDto } from "../dto/expense/ExpenseRequest.dto";
import { HttpError } from "../utils/HttpError";

@injectable()
export class ExpenseController implements IExpenseController {
  constructor(
    @inject(TYPES.ExpenseService)
    private expenseService: IExpenseService
  ) {}

  private getAdminId(req: Request): string {
    if (!req.user || !req.user._id) {
      throw new HttpError(401, "Unauthorized");
    }
    return req.user._id.toString();
  }

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const dto = new CreateExpenseRequestDto(req.body);
    const adminId = this.getAdminId(req);

    const expense = await this.expenseService.createExpense(dto, adminId);
    res.status(201).json(expense);
  });

  getProductExpense = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const total = await this.expenseService.getProductExpense(
        req.params.productId
      );
      res.status(200).json({ totalExpense: total });
    }
  );

  getTotalExpense = asyncHandler(
    async (_req: Request, res: Response): Promise<void> => {
      const total = await this.expenseService.getTotalExpense();
      res.status(200).json({ totalExpense: total });
    }
  );
}
