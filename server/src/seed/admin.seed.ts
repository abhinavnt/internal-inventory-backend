import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/User";

dotenv.config();

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI!);

  const existing = await User.findOne({ email: "admin@company.com" });
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await User.create({
    name: "Super Admin",
    email: "admin@company.com",
    password: hashedPassword,
    role: "admin",
    isActive: true,
  });

  console.log("Admin user created");
  process.exit(0);
}

seedAdmin();
