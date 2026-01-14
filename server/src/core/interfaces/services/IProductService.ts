import { CreateProductRequestDto, UpdateProductRequestDto } from "../../../dto/product/ProductRequest.dto";
import { ProductResponseDto } from "../../../dto/product/ProductResponse.dto";

export interface IProductService {
  createProduct(dto: CreateProductRequestDto, adminId: string): Promise<ProductResponseDto>;

  updateProduct(productId: string, dto: UpdateProductRequestDto, adminId: string): Promise<ProductResponseDto>;

  getProducts(
    page: number,
    limit: number,
    search?: string
  ): Promise<{
    data: ProductResponseDto[];
    total: number;
  }>;

  getProductById(productId: string): Promise<ProductResponseDto>;
}
