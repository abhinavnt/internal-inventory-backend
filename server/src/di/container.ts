import { Container } from "inversify";
import { TYPES } from "./types";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { UserRepository } from "../repositories/user.repository";
import { IAuthService } from "../core/interfaces/services/IAuthService";
import { AuthService } from "../services/auth.service";
import { IAuthController } from "../core/interfaces/controllers/IAuthController";
import { AuthController } from "../controllers/auth.controller";
import { ICapitalRepository } from "../core/interfaces/repository/ICapitalRepository";
import { CapitalRepository } from "../repositories/capital.repository";
import { IActivityLogRepository } from "../core/interfaces/repository/IActivityLogRepository";
import { ActivityLogRepository } from "../repositories/activityLog.repository";
import { IActivityLogService } from "../core/interfaces/services/IActivityLogService";
import { ActivityLogService } from "../services/activityLog.service";
import { IActivityLogController } from "../core/interfaces/controllers/IActivityLogController";
import { ActivityLogController } from "../controllers/activityLog.controller";
import { ICapitalService } from "../core/interfaces/services/ICapitalService";
import { CapitalService } from "../services/capital.service";
import { ICapitalHistoryRepository } from "../core/interfaces/repository/ICapitalHistoryRepository";
import { CapitalHistoryRepository } from "../repositories/capitalHistory.repository";
import { IProductRepository } from "../core/interfaces/repository/IProductRepository";
import { ProductRepository } from "../repositories/product.repository";
import { IStockHistoryRepository } from "../core/interfaces/repository/IStockHistoryRepository";
import { StockHistoryRepository } from "../repositories/stockHistory.repository";
import { IProductService } from "../core/interfaces/services/IProductService";
import { ProductService } from "../services/product.service";
import { IProductController } from "../core/interfaces/controllers/IProductController";
import { ProductController } from "../controllers/product.controller";
import { ISaleRepository } from "../core/interfaces/repository/ISaleRepository";
import { SaleRepository } from "../repositories/sale.repository";
import { ISaleService } from "../core/interfaces/services/ISaleService";
import { SaleService } from "../services/sale.service";
import { ISaleController } from "../core/interfaces/controllers/ISaleController";
import { SaleController } from "../controllers/sale.controller";
import { IPromotionRepository } from "../core/interfaces/repository/IPromotionRepository";
import { PromotionRepository } from "../repositories/promotion.repository";
import { IPromotionService } from "../core/interfaces/services/IPromotionService";
import { PromotionService } from "../services/promotion.service";
import { IPromotionController } from "../core/interfaces/controllers/IPromotionController";
import { PromotionController } from "../controllers/promotion.controller";
import { IExpenseRepository } from "../core/interfaces/repository/IExpenseRepository";
import { ExpenseRepository } from "../repositories/expense.repository";
import { IExpenseService } from "../core/interfaces/services/IExpenseService";
import { IExpenseController } from "../core/interfaces/controllers/IExpenseController";
import { ExpenseService } from "../services/expense.service";
import { ExpenseController } from "../controllers/expense.controller";
import { DashboardService } from "../services/dashboard.service";
import { IDashboardService } from "../core/interfaces/services/IDashboardService";
import { IDashboardController } from "../core/interfaces/controllers/IDashboardController";
import { DashboardController } from "../controllers/dashboard.controller";


const container = new Container();

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<IAuthController>(TYPES.AuthController).to(AuthController);

container.bind<ICapitalRepository>(TYPES.CapitalRepository).to(CapitalRepository)
container.bind<ICapitalService>(TYPES.CapitalService).to(CapitalService)
container.bind<ICapitalHistoryRepository>(TYPES.CapitalHistoryRepository).to(CapitalHistoryRepository)

container.bind<IActivityLogRepository>(TYPES.ActivityLogRepository).to(ActivityLogRepository)
container.bind<IActivityLogService>(TYPES.ActivityLogService).to(ActivityLogService)
container.bind<IActivityLogController>(TYPES.ActivityLogController).to(ActivityLogController)

container.bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository);
container.bind<IStockHistoryRepository>(TYPES.StockHistoryRepository).to(StockHistoryRepository);
container.bind<IProductService>(TYPES.ProductService).to(ProductService);
container.bind<IProductController>(TYPES.ProductController).to(ProductController)

container.bind<ISaleRepository>(TYPES.SaleRepository).to(SaleRepository);
container.bind<ISaleService>(TYPES.SaleService).to(SaleService);
container.bind<ISaleController>(TYPES.SaleController).to(SaleController);

container.bind<IPromotionRepository>(TYPES.PromotionRepository).to(PromotionRepository);
container.bind<IPromotionService>(TYPES.PromotionService).to(PromotionService);
container.bind<IPromotionController>(TYPES.PromotionController).to(PromotionController);

container.bind<IExpenseRepository>(TYPES.ExpenseRepository).to(ExpenseRepository);
container.bind<IExpenseService>(TYPES.ExpenseService).to(ExpenseService);
container.bind<IExpenseController>(TYPES.ExpenseController).to(ExpenseController);

container.bind<IDashboardService>(TYPES.DashboardService).to(DashboardService);
container.bind<IDashboardController>(TYPES.DashboardController).to(DashboardController);


export default container;
