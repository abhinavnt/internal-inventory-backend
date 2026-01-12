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


export default container;
