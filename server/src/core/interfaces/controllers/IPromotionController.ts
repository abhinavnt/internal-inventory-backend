import { RequestHandler } from "express";

export interface IPromotionController {
  create: RequestHandler;
  getByProduct: RequestHandler;
}
