import { Schema, Types } from "mongoose";

export const AuditFields = {
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
};
