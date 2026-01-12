import { Schema, model, Document, Types } from "mongoose";

export interface ICapitalHistory extends Document {
  previousAmount: number;
  newAmount: number;
  reason?: string;
  changedBy: Types.ObjectId;
  createdAt: Date;
}

const CapitalHistorySchema = new Schema<ICapitalHistory>(
  {
    previousAmount: { type: Number, required: true },
    newAmount: { type: Number, required: true },
    reason: { type: String },
    changedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const CapitalHistory = model<ICapitalHistory>("CapitalHistory", CapitalHistorySchema);
