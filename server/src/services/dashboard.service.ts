// ✅ CHANGED – AVAILABLE BALANCE & NET PROFIT FIXED (FULL FILE)

import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";

import { IDashboardService } from "../core/interfaces/services/IDashboardService";
import { ICapitalRepository } from "../core/interfaces/repository/ICapitalRepository";
import { ICapitalHistoryRepository } from "../core/interfaces/repository/ICapitalHistoryRepository";
import { IProductRepository } from "../core/interfaces/repository/IProductRepository";
import { ISaleRepository } from "../core/interfaces/repository/ISaleRepository";
import { IExpenseRepository } from "../core/interfaces/repository/IExpenseRepository";

import { DashboardResponseDto } from "../dto/dashboard/DashboardResponse.dto";
import { ProductProfitDto } from "../dto/dashboard/ProductProfitDto";
import { IProduct } from "../models/Product";
import { CapitalHistoryResponseDto } from "../dto/capital history/CapitalHistoryResponse.dto";

@injectable()
export class DashboardService implements IDashboardService {
  constructor(
    @inject(TYPES.CapitalRepository)
    private capitalRepo: ICapitalRepository,

    @inject(TYPES.CapitalHistoryRepository)
    private capitalHistoryRepo: ICapitalHistoryRepository,

    @inject(TYPES.ProductRepository)
    private productRepo: IProductRepository,

    @inject(TYPES.SaleRepository)
    private saleRepo: ISaleRepository,

    @inject(TYPES.ExpenseRepository)
    private expenseRepo: IExpenseRepository
  ) {}

  async getDashboardSummary(): Promise<DashboardResponseDto> {
    // 1️⃣ INITIAL CAPITAL
    const capital = await this.capitalRepo.findOne();
    const initialCapital = capital?.initialAmount ?? 0;

    // 2️⃣ CASH FLOW (FOR AVAILABLE BALANCE)
    const [totalRevenue, totalCashExpense] = await Promise.all([
      this.saleRepo.getTotalRevenue(),
      this.expenseRepo.getTotalExpense(), // cash outflow
    ]);


    console.log("initialCapital",initialCapital,"  totalRevenue",totalRevenue,"  totalCashExpense",totalCashExpense);
    

    const availableBalance =
      initialCapital + totalRevenue - totalCashExpense;

    // 3️⃣ PRODUCT-WISE PROFIT (REAL PROFIT)
    const products: IProduct[] = await this.productRepo.findAll({}, 0, 1000);

    const productProfits: ProductProfitDto[] = await Promise.all(
      products.map(async (product) => {
        const productId = product._id.toString();

        const [revenue, expense] = await Promise.all([
          this.saleRepo.getRevenueByProduct(productId),
          this.expenseRepo.getTotalExpenseByProduct(productId),
        ]);

        return new ProductProfitDto({
          productId,
          name: product.name,
          stock: product.stock,
          totalRevenue: revenue,
          totalExpense: expense,
          profit: revenue - expense,
        });
      })
    );

    // 4️⃣ NET PROFIT = SUM OF PRODUCT PROFITS
    const netProfit = productProfits.reduce(
      (sum, p) => sum + p.profit,
      0
    );

    // 5️⃣ CAPITAL HISTORY
    const capitalHistory = await this.capitalHistoryRepo.findLatest(5);

    return new DashboardResponseDto({
      initialCapital,
      availableBalance,
      totalRevenue,
      totalExpense: totalCashExpense,
      netProfit,
      lowStockProducts: productProfits
        .filter((p) => p.stock <= 5)
        .sort((a, b) => a.stock - b.stock),

      topSellingProducts: [...productProfits]
        .sort((a, b) => b.totalRevenue - a.totalRevenue)
        .slice(0, 5),

      highestProfitProducts: [...productProfits]
        .sort((a, b) => b.profit - a.profit)
        .slice(0, 5),

      capitalHistory: capitalHistory.map(
        (h) => new CapitalHistoryResponseDto(h)
      ),
    });
  }
}
