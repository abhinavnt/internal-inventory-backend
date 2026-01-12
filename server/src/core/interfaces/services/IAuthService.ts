import { LoginRequestDto } from "../../../dto/auth/AuthRequest";
import { AuthLoginResponseDto, AuthRefreshResponseDto } from "../../../dto/auth/AuthResponse";

export interface IAuthService {
  login(dto: LoginRequestDto): Promise<AuthLoginResponseDto>;
  refreshAccessToken(refreshToken: string): Promise<AuthRefreshResponseDto>;
}
