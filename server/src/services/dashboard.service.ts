import { inject, injectable } from "inversify";

import { TYPES } from "../di/types";
import { IDashboardService } from "../core/interfaces/services/IDashboardService";
import { ICapitalRepository } from "../core/interfaces/repository/ICapitalRepository";
import { IProductRepository } from "../core/interfaces/repository/IProductRepository";
import { ISaleRepository } from "../core/interfaces/repository/ISaleRepository";
import { IExpenseRepository } from "../core/interfaces/repository/IExpenseRepository";

import {
  DashboardResponseDto,
  ProductProfitDto,
} from "../dto/dashboard/DashboardResponse.dto";

@injectable()
export class DashboardService implements IDashboardService {
  constructor(
    @inject(TYPES.CapitalRepository)
    private capitalRepo: ICapitalRepository,

    @inject(TYPES.ProductRepository)
    private productRepo: IProductRepository,

    @inject(TYPES.SaleRepository)
    private saleRepo: ISaleRepository,

    @inject(TYPES.ExpenseRepository)
    private expenseRepo: IExpenseRepository
  ) {}

  async getDashboardSummary(): Promise<DashboardResponseDto> {
    const capital = await this.capitalRepo.findOne();
    const initialCapital = capital?.initialAmount ?? 0;

    const totalRevenue = await this.saleRepo.getTotalRevenue();
    const totalExpense = await this.expenseRepo.getTotalExpense();

    const availableBalance =
      initialCapital + totalRevenue - totalExpense;

    const netProfit = totalRevenue - totalExpense;

    const products = await this.productRepo.findAll({}, 0, 1000);
    const productProfits: ProductProfitDto[] = [];

    for (const product of products) {
      const revenue = await this.saleRepo.getRevenueByProduct(
        product._id.toString()
      );
      const expense =
        await this.expenseRepo.getTotalExpenseByProduct(
          product._id.toString()
        );

      productProfits.push(
        new ProductProfitDto({
          productId: product._id.toString(),
          name: product.name,
          stock: product.stock,
          totalRevenue: revenue,
          totalExpense: expense,
          profit: revenue - expense,
        })
      );
    }

    return new DashboardResponseDto({
      initialCapital,
      availableBalance,
      totalRevenue,
      totalExpense,
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
    });
  }
}
