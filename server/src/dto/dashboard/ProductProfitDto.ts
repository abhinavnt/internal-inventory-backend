// 🆕 NEW – FULL FILE (strictly typed, no any)

export class ProductProfitDto {
  productId: string;
  name: string;
  stock: number;
  totalRevenue: number;
  totalExpense: number;
  profit: number;

  constructor(data: {
    productId: string;
    name: string;
    stock: number;
    totalRevenue: number;
    totalExpense: number;
    profit: number;
  }) {
    this.productId = data.productId;
    this.name = data.name;
    this.stock = data.stock;
    this.totalRevenue = data.totalRevenue;
    this.totalExpense = data.totalExpense;
    this.profit = data.profit;
  }
}
