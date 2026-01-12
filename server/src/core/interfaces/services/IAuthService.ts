import { OrganizerRegistrationRequestDto, UserRegistrationRequestDto } from "../../../dto/auth/AuthRequest";
import { OrganizerResponseDto, UserResponseDto } from "../../../dto/auth/AuthResponse";

export interface IAuthService {
  register(data: OrganizerRegistrationRequestDto | UserRegistrationRequestDto): Promise<void>;
  verifyOtp(
    email: string,
    otp: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserResponseDto | OrganizerResponseDto;
  }>;
  resendOtp(email: string): Promise<void>;
  login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: UserResponseDto | OrganizerResponseDto }>;
  refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; user: UserResponseDto | OrganizerResponseDto }>;
  // resetPassword(token: string, newPassword: string):Promise<void>
}
