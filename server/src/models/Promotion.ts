import { Schema, model, Document, Types } from "mongoose";
import { AuditFields } from "./BaseAudit.model";

export interface IPromotion extends Document {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  influencerName: string;
  socialLink?: string;
  amountPaid: number;
  campaignDate: Date;
  notes?: string;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

const PromotionSchema = new Schema<IPromotion>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    influencerName: { type: String, required: true },
    socialLink: String,
    amountPaid: { type: Number, required: true },
    campaignDate: { type: Date, required: true },
    notes: String,
    ...AuditFields,
  },
  { timestamps: true }
);

export const Promotion = model<IPromotion>("Promotion", PromotionSchema);
