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

export class DashboardResponseDto {
  initialCapital: number;
  availableBalance: number;
  totalRevenue: number;
  totalExpense: number;
  netProfit: number;
  lowStockProducts: ProductProfitDto[];
  topSellingProducts: ProductProfitDto[];
  highestProfitProducts: ProductProfitDto[];

  constructor(data: {
    initialCapital: number;
    availableBalance: number;
    totalRevenue: number;
    totalExpense: number;
    netProfit: number;
    lowStockProducts: ProductProfitDto[];
    topSellingProducts: ProductProfitDto[];
    highestProfitProducts: ProductProfitDto[];
  }) {
    this.initialCapital = data.initialCapital;
    this.availableBalance = data.availableBalance;
    this.totalRevenue = data.totalRevenue;
    this.totalExpense = data.totalExpense;
    this.netProfit = data.netProfit;
    this.lowStockProducts = data.lowStockProducts;
    this.topSellingProducts = data.topSellingProducts;
    this.highestProfitProducts = data.highestProfitProducts;
  }
}
