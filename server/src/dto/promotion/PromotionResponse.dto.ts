// ✅ CHANGED – FULL FILE (admin name + social link supported)

import { IPromotion } from "../../models/Promotion";

export class PromotionResponseDto {
  _id: string;
  influencerName: string;
  socialLinks?: string;
  amountPaid: number;
  campaignDate: Date;
  createdAt: Date;
  createdBy: {
    _id: string;
    name: string;
  };

  constructor(promotion: any) {
    this._id = promotion._id.toString();
    this.influencerName = promotion.influencerName;
    this.socialLinks = promotion.socialLinks;
    this.amountPaid = promotion.amountPaid;
    this.campaignDate = promotion.campaignDate;
    this.createdAt = promotion.createdAt;
    this.createdBy = promotion.createdBy;
  }
}
