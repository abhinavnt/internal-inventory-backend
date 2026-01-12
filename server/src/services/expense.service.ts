import { inject, injectable } from "inversify";
import mongoose from "mongoose";

import { TYPES } from "../di/types";
import { IExpenseService } from "../core/interfaces/services/IExpenseService";
import { IExpenseRepository } from "../core/interfaces/repository/IExpenseRepository";
import { IProductRepository } from "../core/interfaces/repository/IProductRepository";
import { IActivityLogService } from "../core/interfaces/services/IActivityLogService";
import { ActivityAction } from "../core/constants/activity.enum";

import { CreateExpenseRequestDto } from "../dto/expense/ExpenseRequest.dto";
import { ExpenseResponseDto } from "../dto/expense/ExpenseResponse.dto";
import { HttpError } from "../utils/HttpError";

@injectable()
export class ExpenseService implements IExpenseService {
  constructor(
    @inject(TYPES.ExpenseRepository)
    private expenseRepo: IExpenseRepository,

    @inject(TYPES.ProductRepository)
    private productRepo: IProductRepository,

    @inject(TYPES.ActivityLogService)
    private activityLogService: IActivityLogService
  ) {}

  async createExpense(
    dto: CreateExpenseRequestDto,
    adminId: string
  ): Promise<ExpenseResponseDto> {
    if (dto.productId) {
      const product = await this.productRepo.findById(dto.productId);
      if (!product || product.isDeleted) {
        throw new HttpError(404, "Product not found");
      }
    }

    const expense = await this.expenseRepo.create({
      productId: dto.productId
        ? new mongoose.Types.ObjectId(dto.productId)
        : undefined,
      type: dto.type,
      amount: dto.amount,
      description: dto.description,
      createdBy: new mongoose.Types.ObjectId(adminId),
    });

    await this.activityLogService.logAction(
      ActivityAction.CREATE,
      "EXPENSE",
      `Expense logged: ${dto.type}`,
      adminId,
      expense._id.toString()
    );

    return new ExpenseResponseDto(expense);
  }

  async getProductExpense(productId: string): Promise<number> {
    return this.expenseRepo.getTotalExpenseByProduct(productId);
  }

  async getTotalExpense(): Promise<number> {
    return this.expenseRepo.getTotalExpense();
  }
}
