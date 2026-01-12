import { ISale } from "../../../models/Sale";

export interface ISaleRepository {
  create(data: Partial<ISale>): Promise<ISale>;
  findByProduct(productId: string, skip: number, limit: number): Promise<ISale[]>;
  countByProduct(productId: string): Promise<number>;
}
