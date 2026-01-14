import { IProduct } from "../../../models/Product";

export interface IProductRepository {
  create(data: Partial<IProduct>): Promise<IProduct>;
  findById(id: string): Promise<IProduct | null>;
  findByCode(code: string): Promise<IProduct | null>;
  update(id: string, data: Partial<IProduct>): Promise<IProduct | null>;

  findAll(
    filter: Record<string, unknown>,
    skip: number,
    limit: number
  ): Promise<IProduct[]>;

  count(filter: Record<string, unknown>): Promise<number>;
}
