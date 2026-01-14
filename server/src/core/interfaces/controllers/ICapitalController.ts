import { RequestHandler } from "express";

export interface ICapitalController {
  create: RequestHandler;
  update: RequestHandler;
  get: RequestHandler;
}
