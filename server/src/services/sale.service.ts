import { inject, injectable } from "inversify";
import mongoose from "mongoose";

import { TYPES } from "../di/types";
import { ISaleService } from "../core/interfaces/services/ISaleService";
import { ISaleRepository } from "../core/interfaces/repository/ISaleRepository";
import { IProductRepository } from "../core/interfaces/repository/IProductRepository";
import { IStockHistoryRepository } from "../core/interfaces/repository/IStockHistoryRepository";
import { IActivityLogService } from "../core/interfaces/services/IActivityLogService";
import { ActivityAction } from "../core/constants/activity.enum";

import { CreateSaleRequestDto } from "../dto/sales/SaleRequest.dto";
import { SaleResponseDto } from "../dto/sales/SaleResponse.dto";
import { HttpError } from "../utils/HttpError";

@injectable()
export class SaleService implements ISaleService {
  constructor(
    @inject(TYPES.SaleRepository)
    private saleRepo: ISaleRepository,

    @inject(TYPES.ProductRepository)
    private productRepo: IProductRepository,

    @inject(TYPES.StockHistoryRepository)
    private stockHistoryRepo: IStockHistoryRepository,

    @inject(TYPES.ActivityLogService)
    private activityLogService: IActivityLogService
  ) {}

  async createSale(productId: string, dto: CreateSaleRequestDto, adminId: string): Promise<SaleResponseDto> {
    const product = await this.productRepo.findById(productId);
    if (!product || product.isDeleted) {
      throw new HttpError(404, "Product not found");
    }

    if (product.stock < dto.quantity) {
      throw new HttpError(400, "Insufficient stock");
    }

    const sale = await this.saleRepo.create({
      productId: product._id,
      customerName: dto.customerName,
      address: dto.address,
      phone: dto.phone,
      quantity: dto.quantity,
      sellingAmount: dto.sellingAmount,
      shippingCollected: dto.shippingCollected,
      couponCode: dto.couponCode,
      paymentMethod: dto.paymentMethod,
      createdBy: new mongoose.Types.ObjectId(adminId),
    });

    const newStock = product.stock - dto.quantity;

    await this.productRepo.update(productId, {
      stock: newStock,
      updatedBy: new mongoose.Types.ObjectId(adminId),
    });

    await this.stockHistoryRepo.create({
      productId: product._id,
      previousStock: product.stock,
      newStock,
      reason: "Sale",
      changedBy: new mongoose.Types.ObjectId(adminId),
    });

    await this.activityLogService.logAction(ActivityAction.CREATE, "SALE", `Sale added for product ${product.name}`, adminId, sale._id.toString());

    return new SaleResponseDto(sale);
  }

  async getSalesByProduct(productId: string, page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [sales, total, stats] = await Promise.all([
    this.saleRepo.findByProduct(productId, skip, limit),
    this.saleRepo.countByProduct(productId),
    this.saleRepo.getStatsByProduct(productId),
  ]);

  return {
    data: sales.map((s) => new SaleResponseDto(s)),
    total,
    stats,
  };
}
}
