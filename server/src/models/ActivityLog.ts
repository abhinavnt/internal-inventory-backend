import { Schema, model, Document, Types } from "mongoose";
import { ActivityAction } from "../core/constants/activity.enum";

export interface IActivityLog extends Document {
  action: ActivityAction;
  module: string;
  entityId?: Types.ObjectId;
  description: string;
  performedBy: Types.ObjectId;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    action: { type: String, enum: Object.values(ActivityAction), required: true },
    module: { type: String, required: true },
    entityId: { type: Schema.Types.ObjectId },
    description: { type: String, required: true },
    performedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const ActivityLog = model<IActivityLog>("ActivityLog", ActivityLogSchema);
