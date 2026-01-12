import { Schema, model, Document, Types } from "mongoose";
import { AuditFields } from "./BaseAudit.model";

export interface IExpenseLog extends Document {
  _id: Types.ObjectId;
  productId?: Types.ObjectId;
  type: "purchase" | "shipping" | "marketing" | "other";
  amount: number;
  note?: string;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

const ExpenseLogSchema = new Schema<IExpenseLog>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    note: String,
    ...AuditFields,
  },
  { timestamps: true }
);

export const ExpenseLog = model<IExpenseLog>(
  "ExpenseLog",
  ExpenseLogSchema
);
