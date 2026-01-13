import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { TYPES } from "../di/types";
import { ISaleController } from "../core/interfaces/controllers/ISaleController";
import { ISaleService } from "../core/interfaces/services/ISaleService";
import { CreateSaleRequestDto } from "../dto/sales/SaleRequest.dto";
import { HttpError } from "../utils/HttpError";
import { AuthRequest } from "../types/auth-request";

@injectable()
export class SaleController implements ISaleController {
  constructor(
    @inject(TYPES.SaleService)
    private saleService: ISaleService
  ) {}

  private getAdminId(req: AuthRequest): string {
    if (!req.user || !req.user._id) {
      throw new HttpError(401, "Unauthorized");
    }
    return req.user._id.toString();
  }

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const dto = new CreateSaleRequestDto(req.body);
    const adminId = this.getAdminId(req);

    const sale = await this.saleService.createSale(
      req.params.productId,
      dto,
      adminId
    );

    res.status(201).json(sale);
  });

  getByProduct = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await this.saleService.getSalesByProduct(
        req.params.productId,
        page,
        limit
      );

      res.status(200).json(result);
    }
  );
}
