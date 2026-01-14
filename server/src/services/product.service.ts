import { inject, injectable } from "inversify";
import mongoose from "mongoose";

import { TYPES } from "../di/types";
import { IProductService } from "../core/interfaces/services/IProductService";
import { IProductRepository } from "../core/interfaces/repository/IProductRepository";
import { IStockHistoryRepository } from "../core/interfaces/repository/IStockHistoryRepository";
import { IActivityLogService } from "../core/interfaces/services/IActivityLogService";
import { ActivityAction } from "../core/constants/activity.enum";

import { CreateProductRequestDto, UpdateProductRequestDto } from "../dto/product/ProductRequest.dto";
import { ProductResponseDto } from "../dto/product/ProductResponse.dto";
import { HttpError } from "../utils/HttpError";
import { IProduct } from "../models/Product";
import { IExpenseRepository } from "../core/interfaces/repository/IExpenseRepository";

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.ProductRepository)
    private productRepo: IProductRepository,

    @inject(TYPES.StockHistoryRepository)
    private stockHistoryRepo: IStockHistoryRepository,

    @inject(TYPES.ActivityLogService)
    private activityLogService: IActivityLogService,

    @inject(TYPES.ExpenseRepository) private expenseRepo: IExpenseRepository
  ) {}

  async createProduct(dto: CreateProductRequestDto, adminId: string): Promise<ProductResponseDto> {
    const existing = await this.productRepo.findByCode(dto.code);
    if (existing) {
      throw new HttpError(400, "Product code already exists");
    }

    const product = await this.productRepo.create({
      name: dto.name,
      code: dto.code,
      stock: dto.stock,
      purchaseCost: dto.purchaseCost,
      shippingCost: dto.shippingCost,
      notes: dto.notes,
      createdBy: new mongoose.Types.ObjectId(adminId),
    });

    // ✅ STOCK HISTORY
    await this.stockHistoryRepo.create({
      productId: product._id,
      previousStock: 0,
      newStock: dto.stock,
      reason: "Initial stock",
      changedBy: new mongoose.Types.ObjectId(adminId),
    });

    // ✅ PURCHASE EXPENSE (purchaseCost * stock)
    await this.expenseRepo.create({
      productId: product._id,
      type: "PURCHASE",
      amount: dto.purchaseCost,
      description: "Initial product purchase",
      createdBy: new mongoose.Types.ObjectId(adminId),
    });

    // ✅ SHIPPING EXPENSE (shippingCost * stock)
    await this.expenseRepo.create({
      productId: product._id,
      type: "SHIPPING",
      amount: dto.shippingCost ,
      description: "Initial product shipping",
      createdBy: new mongoose.Types.ObjectId(adminId),
    });

    await this.activityLogService.logAction(ActivityAction.CREATE, "PRODUCT", `Product created: ${product.name}`, adminId, product._id.toString());

    return new ProductResponseDto(product);
  }

  async updateProduct(productId: string, dto: UpdateProductRequestDto, adminId: string): Promise<ProductResponseDto> {
    const product = await this.productRepo.findById(productId);
    if (!product || product.isDeleted) {
      throw new HttpError(404, "Product not found");
    }

    const updated = await this.productRepo.update(productId, {
      ...dto,
      updatedBy: new mongoose.Types.ObjectId(adminId),
    });

    if (!updated) {
      throw new HttpError(500, "Failed to update product");
    }

    await this.activityLogService.logAction(ActivityAction.UPDATE, "PRODUCT", `Product updated: ${updated.name}`, adminId, updated._id.toString());

    return new ProductResponseDto(updated);
  }

  async getProducts(page: number, limit: number, search?: string): Promise<{ data: ProductResponseDto[]; total: number }> {
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (search) {
      filter["$or"] = [{ name: { $regex: search, $options: "i" } }, { code: { $regex: search, $options: "i" } }];
    }

    const [products, total]: [IProduct[], number] = await Promise.all([
      this.productRepo.findAll(filter, skip, limit),
      this.productRepo.count(filter),
    ]);

    return {
      data: products.map((product: IProduct) => new ProductResponseDto(product)),
      total,
    };
  }

  async getProductById(productId: string): Promise<ProductResponseDto> {
    const product = await this.productRepo.findById(productId);
    if (!product || product.isDeleted) {
      throw new HttpError(404, "Product not found");
    }

    return new ProductResponseDto(product);
  }
}
