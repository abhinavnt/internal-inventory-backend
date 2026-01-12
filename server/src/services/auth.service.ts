import { inject, injectable } from "inversify";
import { IAuthService } from "../core/interfaces/services/IAuthService";
import { TYPES } from "../di/types";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { OrganizerRegistrationRequestDto, UserRegistrationRequestDto } from "../dto/auth/AuthRequest";
import { HttpError } from "../utils/HttpError";
import bcrypt, { hash } from "bcryptjs";
import { sendOtpEmail } from "../utils/OTPService";
import { IUser } from "../models/User";
import { UserResponseDto, OrganizerResponseDto } from "../dto/auth/AuthResponse";
import { generateToken } from "../utils/tokenService";
import jwt from "jsonwebtoken";

@injectable()
export class AuthService implements IAuthService {
  constructor(@inject(TYPES.UserRepository) private userRepository: IUserRepository) {}

  async register(data: OrganizerRegistrationRequestDto | UserRegistrationRequestDto): Promise<void> {
    const existingUser = await this.userRepository.findByPhoneOrEmail("email", data.email);

    if (existingUser && existingUser.isVerified) {
      throw new HttpError(400, "Email already exists");
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    if (existingUser && !existingUser.isVerified) {
      // Update existing unverified user with new OTP and password
      const updateData = Object.assign({}, data, {
        otp,
        password: hashedPassword,
      });
      await this.userRepository.updateUser(existingUser._id.toString(), updateData);
      await sendOtpEmail(data.email, otp);
    } else {
      // Create new user
      const userData: Partial<IUser> = {
        ...data,
        password: hashedPassword,
        otp,
      };

      await this.userRepository.create(userData);
      await sendOtpEmail(data.email, otp);
    }
  }

  async verifyOtp(email: string, otp: string): Promise<{ accessToken: string; refreshToken: string; user: UserResponseDto | OrganizerResponseDto }> {
    const user = await this.userRepository.findByPhoneOrEmail("email", email);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    if (user.createdAt < fiveMinutesAgo && (!user.updatedAt || user.updatedAt < fiveMinutesAgo)) {
      throw new HttpError(400, "OTP has expired");
    }

    if (user.otp !== otp) {
      throw new HttpError(400, "Invalid OTP");
    }

    await this.userRepository.updateUser(user._id.toString(), { isVerified: true, otp: undefined });

    const accessToken = generateToken({ userId: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET || "secret", "60m");
    const refreshToken = generateToken({ userId: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET || "refresh_secret", "7d");

    const responseUser = user.role === "organizer" ? new OrganizerResponseDto(user) : new UserResponseDto(user);

    return { accessToken, refreshToken, user: responseUser };
  }

  async resendOtp(email: string): Promise<void> {
    const existingUser = await this.userRepository.findByPhoneOrEmail("email", email);

    if (!existingUser) {
      throw new HttpError(404, "User not found");
    }

    if (existingUser.isVerified) {
      throw new HttpError(404, "User alredy verifed");
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Update user with new OTP
    await this.userRepository.updateUser(existingUser._id.toString(), { otp });

    // Send OTP email
    await sendOtpEmail(email, otp);
  }

  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: UserResponseDto | OrganizerResponseDto }> {
    const user = await this.userRepository.findByPhoneOrEmail("email", email);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpError(401, "Invalid password");
    }

    if (!user.isVerified) {
      throw new HttpError(400, "User not verified");
    }

    const accessToken = generateToken({ userId: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET || "secret", "60m");
    const refreshToken = generateToken({ userId: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET || "refresh_secret", "7d");

    const responseUser = user.role === "organizer" ? new OrganizerResponseDto(user) : new UserResponseDto(user);

    return { accessToken, refreshToken, user: responseUser };
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; user: UserResponseDto | OrganizerResponseDto }> {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "refresh_secret") as {
        userId: string;
        role: "user" | "organizer" | "admin";
      };
      const user = await this.userRepository.findByUserId(decoded.userId);

      if (!user) {
        throw new HttpError(404, "User not found");
      }

      if (!user.isVerified) {
        throw new HttpError(400, "User not verified");
      }

      const accessToken = generateToken({ userId: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET || "secret", "60m");

      const responseUser = user.role === "organizer" ? new OrganizerResponseDto(user) : new UserResponseDto(user);

      return { accessToken, user: responseUser };
    } catch (error) {
      throw new HttpError(401, "Invalid refresh token");
    }
  }
}
