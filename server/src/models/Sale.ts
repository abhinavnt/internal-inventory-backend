import { Schema, model, Document, Types } from "mongoose";

export type PaymentMethod = "CASH" | "UPI" | "BANK" | "OTHER";

export interface ISale extends Document {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  customerName: string;
  address: string;
  phone: string;
  quantity: number;
  sellingAmount: number;
  shippingCollected: number;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SaleSchema = new Schema<ISale>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    sellingAmount: { type: Number, required: true, min: 0 },
    shippingCollected: { type: Number, required: true, min: 0 },
    couponCode: { type: String },
    paymentMethod: {
      type: String,
      enum: ["CASH", "UPI", "BANK", "OTHER"],
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Sale = model<ISale>("Sale", SaleSchema);
