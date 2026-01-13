import { BaseRepository } from "../core/abstracts/base.repository";
import { Promotion, IPromotion } from "../models/Promotion";
import { IPromotionRepository } from "../core/interfaces/repository/IPromotionRepository";
import mongoose from "mongoose";

export class PromotionRepository extends BaseRepository<IPromotion> implements IPromotionRepository {
  constructor() {
    super(Promotion);
  }

  findByProduct(productId: string, skip: number, limit: number) {
    return this.model.aggregate([
      { $match: { productId: new mongoose.Types.ObjectId(productId) } },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "admin",
        },
      },
      { $unwind: "$admin" },
      {
        $project: {
          influencerName: 1,
          socialLinks: 1,
          amountPaid: 1,
          campaignDate: 1,
          notes: 1,
          createdAt: 1,
          createdBy: {
            _id: "$admin._id",
            name: "$admin.name",
          },
        },
      },
      { $sort: { campaignDate: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);
  }

  countByProduct(productId: string): Promise<number> {
    return this.model.countDocuments({ productId }).exec();
  }

  async getStatsByProduct(productId: string) {
    const [result] = await this.model.aggregate([
      { $match: { productId: new mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: null,
          totalPromotionSpend: { $sum: "$amountPaid" },
        },
      },
    ]);

    return result || { totalPromotionSpend: 0 };
  }
}
