import { inject, injectable } from "inversify";
import mongoose from "mongoose";

import { TYPES } from "../di/types";
import { IActivityLogService } from "../core/interfaces/services/IActivityLogService";
import { IActivityLogRepository } from "../core/interfaces/repository/IActivityLogRepository";
import { ActivityAction } from "../core/constants/activity.enum";
import { IActivityLog } from "../models/ActivityLog";

@injectable()
export class ActivityLogService implements IActivityLogService {
  constructor(
    @inject(TYPES.ActivityLogRepository)
    private activityRepo: IActivityLogRepository
  ) {}

  async logAction(action: ActivityAction, module: string, description: string, performedBy: string, entityId?: string): Promise<void> {
    await this.activityRepo.createLog({
      action,
      module,
      description,
      performedBy: new mongoose.Types.ObjectId(performedBy),
      entityId: entityId ? new mongoose.Types.ObjectId(entityId) : undefined,
    });
  }

  async getAllLogs(): Promise<IActivityLog[]> {
    return this.activityRepo.findAll();
  }
}
