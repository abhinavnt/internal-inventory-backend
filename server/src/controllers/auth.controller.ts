import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { TYPES } from "../di/types";
import { IAuthController } from "../core/interfaces/controllers/IAuthController";
import { IAuthService } from "../core/interfaces/services/IAuthService";
import { LoginRequestDto } from "../dto/auth/AuthRequest";

@injectable()
export class AuthController implements IAuthController {
  constructor(@inject(TYPES.AuthService) private authService: IAuthService) {}

  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log("reached the login",req.body);
    
    const dto = new LoginRequestDto(req.body);
    const { refreshToken, ...response } = await this.authService.login(dto);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,          
      sameSite: "none",      
      path: "/", 
    });

    res.status(200).json(response);
  });

  refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.status(403).json({ message: "Refresh token required" });
      return;
    }

    const response = await this.authService.refreshAccessToken(token);
    res.status(200).json(response);
  });

  logout = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,        
      sameSite: "none",     
      path: "/", 
    });

    res.status(200).json({ message: "Logged out successfully" });
  });
}
