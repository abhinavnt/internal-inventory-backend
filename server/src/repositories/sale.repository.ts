import { BaseRepository } from "../core/abstracts/base.repository";
import { Sale, ISale } from "../models/Sale";
import { ISaleRepository } from "../core/interfaces/repository/ISaleRepository";

export class SaleRepository extends BaseRepository<ISale> implements ISaleRepository {
  constructor() {
    super(Sale);
  }

  findByProduct(productId: string, skip: number, limit: number): Promise<ISale[]> {
    return this.model.find({ productId }).populate("createdBy", "name email").skip(skip).limit(limit).sort({ createdAt: -1 }).exec();
  }

  countByProduct(productId: string): Promise<number> {
    return this.model.countDocuments({ productId }).exec();
  }
}
