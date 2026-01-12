import { RequestHandler } from "express";

export interface IDashboardController {
  getSummary: RequestHandler;
}
