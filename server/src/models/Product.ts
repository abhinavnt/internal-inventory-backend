import { Schema, model, Document, Types } from "mongoose";
import { AuditFields } from "./BaseAudit.model";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  code: string;
  stock: number;
  purchaseCost: number;
  shippingCost: number;
  notes?: string;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    purchaseCost: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    notes: String,
    ...AuditFields,
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", ProductSchema);
