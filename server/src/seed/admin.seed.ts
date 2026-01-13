import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/User";

dotenv.config();

let name ="Abhinav"
let email = "abhinav@gmail.com"
let password = "Abhi@123"

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI!);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    role: "admin",
    isActive: true,
  });

  console.log("Admin user created");
  process.exit(0);
}

seedAdmin();
