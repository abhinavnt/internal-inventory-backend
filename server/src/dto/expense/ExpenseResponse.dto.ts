import { IExpenseLog } from "../../models/ExpenseLog";

export class ExpenseResponseDto {
  id: string;
  type: string;
  amount: number;
  createdAt: Date;

  constructor(expense: IExpenseLog) {
    this.id = expense._id.toString();
    this.type = expense.type;
    this.amount = expense.amount;
    this.createdAt = expense.createdAt;
  }
}
