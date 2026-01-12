export class LoginRequestDto {
  email: string;
  password: string;

  constructor(data: LoginRequestDto) {
    if (!data.email || !data.password) {
      throw new Error("Email and password are required");
    }

    this.email = data.email;
    this.password = data.password;
  }
}
