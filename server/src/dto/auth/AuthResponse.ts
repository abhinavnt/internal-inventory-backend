import { IUser } from "../../models/User";

export class AuthUserDto {
  id: string;
  name: string;
  email: string;
  role: string;

  constructor(user: IUser) {
    this.id = user._id.toString();
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
  }
}

export class AuthLoginResponseDto {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDto;

  constructor(accessToken: string, refreshToken: string, user: IUser) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = new AuthUserDto(user);
  }
}

export class AuthRefreshResponseDto {
  accessToken: string;
  user: AuthUserDto;

  constructor(accessToken: string, user: IUser) {
    this.accessToken = accessToken;
    this.user = new AuthUserDto(user);
  }
}
