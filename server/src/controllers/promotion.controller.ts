import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { TYPES } from "../di/types";
import { IPromotionController } from "../core/interfaces/controllers/IPromotionController";
import { IPromotionService } from "../core/interfaces/services/IPromotionService";
import { CreatePromotionRequestDto } from "../dto/promotion/PromotionRequest.dto";
import { HttpError } from "../utils/HttpError";
import { AuthRequest } from "../types/auth-request";

@injectable()
export class PromotionController implements IPromotionController {
  constructor(
    @inject(TYPES.PromotionService)
    private promotionService: IPromotionService
  ) {}

  private getAdminId(req: AuthRequest): string {
    if (!req.user || !req.user._id) {
      throw new HttpError(401, "Unauthorized");
    }
    return req.user._id.toString();
  }

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const dto = new CreatePromotionRequestDto(req.body);
    const adminId = this.getAdminId(req);

    const promotion = await this.promotionService.createPromotion(req.params.productId, dto, adminId);

    res.status(201).json(promotion);
  });

  getByProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await this.promotionService.getPromotionsByProduct(req.params.productId, page, limit);

    res.status(200).json(result);
  });
}
