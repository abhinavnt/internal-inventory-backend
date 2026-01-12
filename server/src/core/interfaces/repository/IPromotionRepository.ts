import { IPromotion } from "../../../models/Promotion";

export interface IPromotionRepository {
  create(data: Partial<IPromotion>): Promise<IPromotion>;
  findByProduct(
    productId: string,
    skip: number,
    limit: number
  ): Promise<IPromotion[]>;
  countByProduct(productId: string): Promise<number>;
}
