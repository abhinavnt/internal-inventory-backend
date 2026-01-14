import { RequestHandler } from "express";

export interface IActivityLogController {
  getAll: RequestHandler;
}
