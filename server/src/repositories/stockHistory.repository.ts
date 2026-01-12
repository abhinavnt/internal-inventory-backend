import { BaseRepository } from "../core/abstracts/base.repository";
import { StockHistory, IStockHistory } from "../models/StockHistory";
import { IStockHistoryRepository } from "../core/interfaces/repository/IStockHistoryRepository";

export class StockHistoryRepository extends BaseRepository<IStockHistory> implements IStockHistoryRepository {
  constructor() {
    super(StockHistory);
  }

  findByProduct(productId: string): Promise<IStockHistory[]> {
    return this.model.find({ productId }).populate("changedBy", "name email").sort({ createdAt: -1 }).exec();
  }
}
