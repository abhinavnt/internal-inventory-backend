import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { TYPES } from "../di/types";
import { IActivityLogController } from "../core/interfaces/controllers/IActivityLogController";
import { IActivityLogService } from "../core/interfaces/services/IActivityLogService";

@injectable()
export class ActivityLogController implements IActivityLogController {
  constructor(
    @inject(TYPES.ActivityLogService)
    private activityLogService: IActivityLogService
  ) {}

  getAll = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const logs = await this.activityLogService.getAllLogs();
    res.status(200).json(logs);
  });
}
