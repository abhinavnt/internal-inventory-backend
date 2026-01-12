import { CreateExpenseRequestDto } from "../../../dto/expense/ExpenseRequest.dto";
import { ExpenseResponseDto } from "../../../dto/expense/ExpenseResponse.dto";

export interface IExpenseService {
  createExpense(
    dto: CreateExpenseRequestDto,
    adminId: string
  ): Promise<ExpenseResponseDto>;

  getProductExpense(productId: string): Promise<number>;
  getTotalExpense(): Promise<number>;
}
