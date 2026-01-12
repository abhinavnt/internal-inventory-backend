import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${(error as Error).message}`);
  }
};
