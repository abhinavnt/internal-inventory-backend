import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { TYPES } from "../di/types";
import { IProductController } from "../core/interfaces/controllers/IProductController";
import { IProductService } from "../core/interfaces/services/IProductService";
import { CreateProductRequestDto, UpdateProductRequestDto } from "../dto/product/ProductRequest.dto";
import { HttpError } from "../utils/HttpError";

@injectable()
export class ProductController implements IProductController {
  constructor(
    @inject(TYPES.ProductService)
    private productService: IProductService
  ) {}

  private getAdminId(req: Request): string {
    if (!req.user || !req.user._id) {
      throw new HttpError(401, "Unauthorized");
    }
    return req.user._id.toString();
  }

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const dto = new CreateProductRequestDto(req.body);
    const adminId = this.getAdminId(req);

    const product = await this.productService.createProduct(dto, adminId);
    res.status(201).json(product);
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const dto = new UpdateProductRequestDto(req.body);
    const adminId = this.getAdminId(req);

    const product = await this.productService.updateProduct(req.params.id, dto, adminId);

    res.status(200).json(product);
  });

  getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search?.toString();

    const result = await this.productService.getProducts(page, limit, search);

    res.status(200).json(result);
  });

  getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const product = await this.productService.getProductById(req.params.id);
    res.status(200).json(product);
  });
}
