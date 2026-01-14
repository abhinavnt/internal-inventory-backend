export class CreateExpenseRequestDto {
  productId?: string;
  type: "PURCHASE" | "SHIPPING" | "MARKETING" | "OTHER";
  amount: number;
  description?: string;

  constructor(data: CreateExpenseRequestDto) {
    if (!data.type) {
      throw new Error("Expense type is required");
    }
    if (data.amount === undefined || data.amount < 0) {
      throw new Error("Valid expense amount required");
    }

    this.productId = data.productId;
    this.type = data.type;
    this.amount = data.amount;
    this.description = data.description;
  }
}
