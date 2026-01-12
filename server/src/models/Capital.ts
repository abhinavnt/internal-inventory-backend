import { Schema, model, Document, Types } from "mongoose";
import { AuditFields } from "./BaseAudit.model";

export interface ICapital extends Document {
  _id: Types.ObjectId;
  initialAmount: number;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

const CapitalSchema = new Schema<ICapital>(
  {
    initialAmount: { type: Number, required: true },
    ...AuditFields,
  },
  { timestamps: true }
);

export const Capital = model<ICapital>("Capital", CapitalSchema);
