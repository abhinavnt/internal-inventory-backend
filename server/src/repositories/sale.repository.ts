import { BaseRepository } from "../core/abstracts/base.repository";
import { Sale, ISale } from "../models/Sale";
import { ISaleRepository } from "../core/interfaces/repository/ISaleRepository";

export class SaleRepository extends BaseRepository<ISale> implements ISaleRepository {
  constructor() {
    super(Sale);
  }

  findByProduct(productId: string, skip: number, limit: number): Promise<ISale[]> {
    return this.model.find({ productId }).skip(skip).limit(limit).sort({ createdAt: -1 }).exec();
  }

  countByProduct(productId: string): Promise<number> {
    return this.model.countDocuments({ productId }).exec();
  }

  async getTotalRevenue(): Promise<number> {
    const result = await this.model.aggregate([{ $group: { _id: null, total: { $sum: "$sellingAmount" } } }]);
    return result[0]?.total ?? 0;
  }

  async getRevenueByProduct(productId: string): Promise<number> {
    const result = await this.model.aggregate([{ $match: { productId } }, { $group: { _id: null, total: { $sum: "$sellingAmount" } } }]);
    return result[0]?.total ?? 0;
  }
}
