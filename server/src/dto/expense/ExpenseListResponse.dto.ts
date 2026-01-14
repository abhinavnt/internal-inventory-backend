// 🆕 NEW – FULL FILE

export interface ExpenseUserDto {
  id: string;
  name: string;
}

export interface ExpenseProductDto {
  id: string;
  name: string;
}

export class ExpenseListResponseDto {
  id: string;
  type: string;
  amount: number;
  description?: string;
  createdAt: Date;
  createdBy: ExpenseUserDto;
  product?: ExpenseProductDto;

  constructor(data: {
    _id: string;
    type: string;
    amount: number;
    description?: string;
    createdAt: Date;
    user: { _id: string; name: string };
    product?: { _id: string; name: string };
  }) {
    this.id = data._id;
    this.type = data.type;
    this.amount = data.amount;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.createdBy = {
      id: data.user._id,
      name: data.user.name,
    };

    if (data.product) {
      this.product = {
        id: data.product._id,
        name: data.product.name,
      };
    }
  }
}
