import { RequestHandler } from "express";

export interface IAuthController {
  login: RequestHandler;
  refreshToken: RequestHandler;
  logout: RequestHandler;
}
