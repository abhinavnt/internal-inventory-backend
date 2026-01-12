import { BaseRepository } from "../core/abstracts/base.repository";
import { ExpenseLog, IExpenseLog } from "../models/ExpenseLog";
import { IExpenseRepository } from "../core/interfaces/repository/IExpenseRepository";

export class ExpenseRepository
  extends BaseRepository<IExpenseLog>
  implements IExpenseRepository
{
  constructor() {
    super(ExpenseLog);
  }

  findByProduct(productId: string): Promise<IExpenseLog[]> {
    return this.model.find({ productId }).exec();
  }

  async getTotalExpense(): Promise<number> {
    const result = await this.model.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    return result[0]?.total ?? 0;
  }

  async getTotalExpenseByProduct(productId: string): Promise<number> {
    const result = await this.model.aggregate([
      { $match: { productId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    return result[0]?.total ?? 0;
  }
}
