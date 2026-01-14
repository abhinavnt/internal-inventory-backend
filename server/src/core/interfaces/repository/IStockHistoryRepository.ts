import { IStockHistory } from "../../../models/StockHistory";

export interface IStockHistoryRepository {
  create(data: Partial<IStockHistory>): Promise<IStockHistory>;
  findByProduct(productId: string): Promise<IStockHistory[]>;
}
