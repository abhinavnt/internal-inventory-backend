import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  //Common fields
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
