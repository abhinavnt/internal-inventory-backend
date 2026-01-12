import { RequestHandler } from "express";

export interface ISaleController {
  create: RequestHandler;
  getByProduct: RequestHandler;
}
