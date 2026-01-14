import { CreatePromotionRequestDto } from "../../../dto/promotion/PromotionRequest.dto";
import { PromotionResponseDto } from "../../../dto/promotion/PromotionResponse.dto";

export interface IPromotionService {
  createPromotion(productId: string, dto: CreatePromotionRequestDto, adminId: string): Promise<PromotionResponseDto>;

  getPromotionsByProduct(productId: string, page: number, limit: number): Promise<{ data: PromotionResponseDto[]; total: number }>;
}
