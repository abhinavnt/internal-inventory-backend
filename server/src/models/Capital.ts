import { Schema, model, Document, Types } from "mongoose";

export interface ICapital extends Document {
_id:Types.ObjectId
  initialAmount: number;
  notes?: string;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CapitalSchema = new Schema<ICapital>(
  {
    initialAmount: { type: Number, required: true, min: 0 },
    notes: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Capital = model<ICapital>("Capital", CapitalSchema);
