import { Schema, model, Document, Types } from "mongoose";

export type ExpenseType =
  | "PURCHASE"
  | "SHIPPING"
  | "CUSTOMER_SHIPPING"
  | "PROMOTION"
  | "MARKETING"
  | "OTHER";

export interface IExpenseLog extends Document {
  _id:Types.ObjectId
  productId?: Types.ObjectId;
  type: ExpenseType;
  amount: number;
  description?: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
}

const ExpenseLogSchema = new Schema<IExpenseLog>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    type: {
      type: String,
      enum: ["PURCHASE", "SHIPPING", "MARKETING", "OTHER","PROMOTION"],
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const ExpenseLog = model<IExpenseLog>(
  "ExpenseLog",
  ExpenseLogSchema
);
