// ✅ CHANGED – added capitalHistory

import { CapitalHistoryResponseDto } from "../capital history/CapitalHistoryResponse.dto";
import { ProductProfitDto } from "./ProductProfitDto";


export class DashboardResponseDto {
  initialCapital: number;
  availableBalance: number;
  totalRevenue: number;
  totalExpense: number;
  netProfit: number;

  lowStockProducts: ProductProfitDto[];
  topSellingProducts: ProductProfitDto[];
  highestProfitProducts: ProductProfitDto[];

  capitalHistory: CapitalHistoryResponseDto[];

  constructor(data: {
    initialCapital: number;
    availableBalance: number;
    totalRevenue: number;
    totalExpense: number;
    netProfit: number;
    lowStockProducts: ProductProfitDto[];
    topSellingProducts: ProductProfitDto[];
    highestProfitProducts: ProductProfitDto[];
    capitalHistory: CapitalHistoryResponseDto[];
  }) {
    this.initialCapital = data.initialCapital;
    this.availableBalance = data.availableBalance;
    this.totalRevenue = data.totalRevenue;
    this.totalExpense = data.totalExpense;
    this.netProfit = data.netProfit;
    this.lowStockProducts = data.lowStockProducts;
    this.topSellingProducts = data.topSellingProducts;
    this.highestProfitProducts = data.highestProfitProducts;
    this.capitalHistory = data.capitalHistory;
  }
}
