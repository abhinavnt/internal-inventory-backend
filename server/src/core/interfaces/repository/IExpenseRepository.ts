import { IExpenseLog } from "../../../models/ExpenseLog";

export interface IExpenseRepository {
  create(data: Partial<IExpenseLog>): Promise<IExpenseLog>;
  findByProduct(productId: string): Promise<IExpenseLog[]>;
  getTotalExpense(): Promise<number>;
  getTotalExpenseByProduct(productId: string): Promise<number>;
}
