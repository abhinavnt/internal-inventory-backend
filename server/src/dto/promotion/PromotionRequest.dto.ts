export class CreatePromotionRequestDto {
  influencerName: string;
  socialLinks?: string;
  amountPaid: number;
  campaignDate: Date;
  notes?: string;

  constructor(data: CreatePromotionRequestDto) {
    if (!data.influencerName) {
      throw new Error("Influencer name is required");
    }
    if (data.amountPaid === undefined || data.amountPaid < 0) {
      throw new Error("Valid amountPaid is required");
    }
    if (!data.campaignDate) {
      throw new Error("Campaign date is required");
    }

    this.influencerName = data.influencerName;
    this.socialLinks = data.socialLinks;
    this.amountPaid = data.amountPaid;
    this.campaignDate = new Date(data.campaignDate);
    this.notes = data.notes;
  }
}
