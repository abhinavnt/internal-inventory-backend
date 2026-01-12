import { BaseRepository } from "../core/abstracts/base.repository";
import { Promotion, IPromotion } from "../models/Promotion";
import { IPromotionRepository } from "../core/interfaces/repository/IPromotionRepository";

export class PromotionRepository extends BaseRepository<IPromotion> implements IPromotionRepository {
  constructor() {
    super(Promotion);
  }

  findByProduct(productId: string, skip: number, limit: number): Promise<IPromotion[]> {
    return this.model.find({ productId }).populate("createdBy", "name email").skip(skip).limit(limit).sort({ campaignDate: -1 }).exec();
  }

  countByProduct(productId: string): Promise<number> {
    return this.model.countDocuments({ productId }).exec();
  }
}
