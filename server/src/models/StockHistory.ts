import { Schema, model, Document, Types } from "mongoose";

export interface IStockHistory extends Document {
  productId: Types.ObjectId;
  previousStock: number;
  newStock: number;
  reason: string;
  changedBy: Types.ObjectId;
  createdAt: Date;
}

const StockHistorySchema = new Schema<IStockHistory>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    previousStock: { type: Number, required: true },
    newStock: { type: Number, required: true },
    reason: { type: String, required: true },
    changedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const StockHistory = model<IStockHistory>(
  "StockHistory",
  StockHistorySchema
);
