import { inject, injectable } from "inversify";
import mongoose from "mongoose";

import { TYPES } from "../di/types";
import { IPromotionService } from "../core/interfaces/services/IPromotionService";
import { IPromotionRepository } from "../core/interfaces/repository/IPromotionRepository";
import { IProductRepository } from "../core/interfaces/repository/IProductRepository";
import { IActivityLogService } from "../core/interfaces/services/IActivityLogService";
import { ActivityAction } from "../core/constants/activity.enum";

import { CreatePromotionRequestDto } from "../dto/promotion/PromotionRequest.dto";
import { PromotionResponseDto } from "../dto/promotion/PromotionResponse.dto";
import { HttpError } from "../utils/HttpError";
import { IExpenseRepository } from "../core/interfaces/repository/IExpenseRepository";

@injectable()
export class PromotionService implements IPromotionService {
  constructor(
    @inject(TYPES.PromotionRepository)
    private promotionRepo: IPromotionRepository,

    @inject(TYPES.ProductRepository)
    private productRepo: IProductRepository,

    @inject(TYPES.ActivityLogService)
    private activityLogService: IActivityLogService,

    @inject(TYPES.ExpenseRepository) private expenseRepo: IExpenseRepository
  ) {}

  async createPromotion(productId: string, dto: CreatePromotionRequestDto, adminId: string): Promise<PromotionResponseDto> {
    const product = await this.productRepo.findById(productId);
    if (!product || product.isDeleted) {
      throw new HttpError(404, "Product not found");
    }

    const promotion = await this.promotionRepo.create({
      productId: product._id,
      influencerName: dto.influencerName,
      socialLinks: dto.socialLinks,
      amountPaid: dto.amountPaid,
      campaignDate: dto.campaignDate,
      notes: dto.notes,
      createdBy: new mongoose.Types.ObjectId(adminId),
    });

    await this.activityLogService.logAction(
      ActivityAction.CREATE,
      "PROMOTION",
      `Promotion added for product ${product.name}`,
      adminId,
      promotion._id.toString()
    );

    await this.expenseRepo.create({
      productId: product._id,
      type: "PROMOTION",
      amount: dto.amountPaid,
      description: `Promotion added for product ${product.name}`,
      createdBy: new mongoose.Types.ObjectId(adminId),
    });

    return new PromotionResponseDto(promotion);
  }

  async getPromotionsByProduct(productId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [promotions, total, stats] = await Promise.all([
      this.promotionRepo.findByProduct(productId, skip, limit),
      this.promotionRepo.countByProduct(productId),
      this.promotionRepo.getStatsByProduct(productId),
    ]);

    return {
      data: promotions.map((p) => new PromotionResponseDto(p)),
      total,
      stats,
    };
  }
}
