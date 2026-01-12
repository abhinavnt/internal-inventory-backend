import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.EMAIL, "user email from otp service");
console.log(process.env.PASS, "user pass from otp service");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpEmail = async (email: string, otp: string): Promise<void> => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}\n\nThis code will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error while sending email:", error);
    throw new Error("Failed to send OTP email");
  }
};
