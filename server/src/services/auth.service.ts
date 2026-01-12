import { inject, injectable } from "inversify";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { TYPES } from "../di/types";
import { IAuthService } from "../core/interfaces/services/IAuthService";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";

import { HttpError } from "../utils/HttpError";
import { generateToken } from "../utils/tokenService";
import { LoginRequestDto } from "../dto/auth/AuthRequest";
import { AuthLoginResponseDto, AuthRefreshResponseDto } from "../dto/auth/AuthResponse";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async login(dto: LoginRequestDto): Promise<AuthLoginResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user || !user.isActive) {
      throw new HttpError(401, "Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new HttpError(401, "Invalid credentials");
    }

    if (user.role !== "admin") {
      throw new HttpError(403, "Access denied");
    }

    const accessToken = generateToken({ userId: user._id.toString(), role: user.role }, process.env.ACCESS_TOKEN_SECRET!, "15m");

    const refreshToken = generateToken({ userId: user._id.toString(), role: user.role }, process.env.REFRESH_TOKEN_SECRET!, "7d");

    return new AuthLoginResponseDto(accessToken, refreshToken, user);
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthRefreshResponseDto> {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { userId: string; role: string };

      const user = await this.userRepository.findById(decoded.userId);

      if (!user || !user.isActive) {
        throw new HttpError(401, "Invalid refresh token");
      }

      const accessToken = generateToken({ userId: user._id.toString(), role: user.role }, process.env.ACCESS_TOKEN_SECRET!, "15m");

      return new AuthRefreshResponseDto(accessToken, user);
    } catch {
      throw new HttpError(401, "Invalid refresh token");
    }
  }
}
