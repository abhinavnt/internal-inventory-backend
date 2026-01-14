import { BaseRepository } from "../core/abstracts/base.repository";
import { Product, IProduct } from "../models/Product";
import { IProductRepository } from "../core/interfaces/repository/IProductRepository";

export class ProductRepository extends BaseRepository<IProduct> implements IProductRepository {
  constructor() {
    super(Product);
  }

  findByCode(code: string): Promise<IProduct | null> {
    return this.findOne({ code, isDeleted: false });
  }

  findAllsProducts(filter: Record<string, unknown>, skip: number, limit: number): Promise<IProduct[]> {
    return this.model
      .find({ ...filter, isDeleted: false })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();
  }

  count(filter: Record<string, unknown>): Promise<number> {
    return this.model.countDocuments({ ...filter, isDeleted: false }).exec();
  }
}
