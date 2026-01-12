import { RequestHandler } from "express";

export interface IExpenseController {
  create: RequestHandler;
  getProductExpense: RequestHandler;
  getTotalExpense: RequestHandler;
}
