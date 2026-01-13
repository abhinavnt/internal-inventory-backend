import { ISale } from "../../../models/Sale";

export interface ISaleRepository {
  create(data: Partial<ISale>): Promise<ISale>;
  findByProduct(
    productId: string,
    skip: number,
    limit: number
  ): Promise<ISale[]>;
  countByProduct(productId: string): Promise<number>;

   getStatsByProduct(productId: string): Promise<{
    totalQuantitySold: number;
    totalSalesAmount: number;
    totalShippingCollected: number;
  }>;

  getTotalRevenue(): Promise<number>;
  getRevenueByProduct(productId: string): Promise<number>;
}
