import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  //Common fields
  _id: Types.ObjectId;
  email: string;
  phone?: string;
  password: string;
  role: "user" | "organizer" | "admin";
  city?: string;
  isVerified: boolean;
  isBlocked: boolean;

  //User-specific fields
  name?: string;
  dob?: Date;
  genres?: string[];

  // Organizer-specific fields
  companyName?: string;
  country?: string;
  state?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  companyLogo?: string;
  createdAt: Date;
  updatedAt: Date;
  otp?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "organizer", "admin"], required: true },
    dob: { type: Date },
    city: { type: String },
    genres: [{ type: String }],
    companyName: { type: String },
    country: { type: String },
    state: { type: String },
    instagramUrl: { type: String },
    facebookUrl: { type: String },
    companyLogo: { type: String },
    otp: { type: String },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
