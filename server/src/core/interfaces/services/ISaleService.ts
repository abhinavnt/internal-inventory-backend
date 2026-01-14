import { CreateSaleRequestDto } from "../../../dto/sales/SaleRequest.dto";
import { SaleResponseDto } from "../../../dto/sales/SaleResponse.dto";

export interface ISaleService {
  createSale(productId: string, dto: CreateSaleRequestDto, adminId: string): Promise<SaleResponseDto>;

  getSalesByProduct(productId: string, page: number, limit: number): Promise<{ data: SaleResponseDto[]; total: number }>;
}
