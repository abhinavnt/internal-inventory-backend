import { RequestHandler } from "express";

export interface IProductController {
  create: RequestHandler;
  update: RequestHandler;
  getAll: RequestHandler;
  getById: RequestHandler;
}
