import { Schema, model, Document, Types } from "mongoose";
import { AuditFields } from "./BaseAudit.model";

export interface ISale extends Document {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  amount: number;
  shippingCollected: number;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

const SaleSchema = new Schema<ISale>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    amount: { type: Number, required: true },
    shippingCollected: { type: Number, default: 0 },
    ...AuditFields,
  },
  { timestamps: true }
);

export const Sale = model<ISale>("Sale", SaleSchema);
