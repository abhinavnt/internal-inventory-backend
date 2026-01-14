import { BaseRepository } from "../core/abstracts/base.repository";
import { ExpenseLog, IExpenseLog } from "../models/ExpenseLog";
import { IExpenseRepository } from "../core/interfaces/repository/IExpenseRepository";

export class ExpenseRepository extends BaseRepository<IExpenseLog> implements IExpenseRepository {
  constructor() {
    super(ExpenseLog);
  }

  findByProduct(productId: string): Promise<IExpenseLog[]> {
    return this.model.find({ productId }).exec();
  }

  async getTotalExpense(): Promise<number> {
    const result = await this.model.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    return result[0]?.total ?? 0;
  }

  async getTotalExpenseByProduct(productId: string): Promise<number> {
    const result = await this.model.aggregate([{ $match: { productId } }, { $group: { _id: null, total: { $sum: "$amount" } } }]);
    return result[0]?.total ?? 0;
  }

  async findAllWithUser(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "createdBy",
              foreignField: "_id",
              as: "user",
            },
          },
          { $unwind: "$user" },
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ])
        .exec(),

      this.model.countDocuments(),
    ]);

    return { data, total };
  }
}
