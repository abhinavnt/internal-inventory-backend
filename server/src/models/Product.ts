import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
_id:Types.ObjectId
  name: string;
  code: string;
  stock: number;
  purchaseCost: number;
  shippingCost: number;
  notes?: string;
  isDeleted: boolean;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, min: 0 },
    purchaseCost: { type: Number, required: true, min: 0 },
    shippingCost: { type: Number, required: true, min: 0 },
    notes: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", ProductSchema);
