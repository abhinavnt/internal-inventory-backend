import { IPromotion } from "../../models/Promotion";

export class PromotionResponseDto {
  id: string;
  influencerName: string;
  amountPaid: number;
  campaignDate: Date;
  createdAt: Date;

  constructor(promotion: IPromotion) {
    this.id = promotion._id.toString();
    this.influencerName = promotion.influencerName;
    this.amountPaid = promotion.amountPaid;
    this.campaignDate = promotion.campaignDate;
    this.createdAt = promotion.createdAt;
  }
}
