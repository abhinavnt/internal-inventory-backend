import { Schema, model, Document, Types } from "mongoose";

export interface IPromotion extends Document {
_id:Types.ObjectId
  productId: Types.ObjectId;
  influencerName: string;
  socialLinks?: string;
  amountPaid: number;
  campaignDate: Date;
  notes?: string;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PromotionSchema = new Schema<IPromotion>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    influencerName: { type: String, required: true },
    socialLinks: { type: String },
    amountPaid: { type: Number, required: true, min: 0 },
    campaignDate: { type: Date, required: true },
    notes: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Promotion = model<IPromotion>("Promotion", PromotionSchema);
