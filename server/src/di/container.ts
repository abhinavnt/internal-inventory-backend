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


const container = new Container();

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<IAuthController>(TYPES.AuthController).to(AuthController);

container.bind<ICapitalRepository>(TYPES.CapitalRepository).to(CapitalRepository)
container.bind<IActivityLogRepository>(TYPES.ActivityLogRepository).to(ActivityLogRepository)
container.bind<IActivityLogService>(TYPES.ActivityLogService).to(ActivityLogService)
container.bind<IActivityLogController>(TYPES.ActivityLogController).to(ActivityLogController)

export default container;
