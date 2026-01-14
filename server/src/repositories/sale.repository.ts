import { BaseRepository } from "../core/abstracts/base.repository";
import { Sale, ISale } from "../models/Sale";
import { ISaleRepository } from "../core/interfaces/repository/ISaleRepository";
import mongoose from "mongoose";

export class SaleRepository extends BaseRepository<ISale> implements ISaleRepository {
  constructor() {
    super(Sale);
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
          customerName: 1,
          address: 1,
          phone: 1,
          quantity: 1,
          sellingAmount: 1,
          shippingCollected: 1,
          couponCode: 1,
          paymentMethod: 1,
          createdAt: 1,
          createdBy: {
            _id: "$admin._id",
            name: "$admin.name",
          },
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);
  }

  countByProduct(productId: string): Promise<number> {
    return this.model.countDocuments({ productId }).exec();
  }

  async getTotalRevenue(): Promise<number> {
    const result = await this.model.aggregate([{ $group: { _id: null, total: { $sum: "$sellingAmount" } } }]);
    return result[0]?.total ?? 0;
  }

  async getRevenueByProduct(productId: string): Promise<number> {
    const result = await this.model.aggregate([{ $match: { productId } }, { $group: { _id: null, total: { $sum: "$sellingAmount" } } }]);
    return result[0]?.total ?? 0;
  }


  async getStatsByProduct(productId: string) {
    const [result] = await this.model.aggregate([
      { $match: { productId: new mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: null,
          totalQuantitySold: { $sum: "$quantity" },
          totalSalesAmount: { $sum: "$sellingAmount" },
          totalShippingCollected: { $sum: "$shippingCollected" },
        },
      },
    ]);

    return (
      result || {
        totalQuantitySold: 0,
        totalSalesAmount: 0,
        totalShippingCollected: 0,
      }
    );
  }

}

