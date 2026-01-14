import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { TYPES } from "../di/types";
import { IDashboardController } from "../core/interfaces/controllers/IDashboardController";
import { IDashboardService } from "../core/interfaces/services/IDashboardService";

@injectable()
export class DashboardController implements IDashboardController {
  constructor(
    @inject(TYPES.DashboardService)
    private dashboardService: IDashboardService
  ) {}

  getSummary = asyncHandler(
    async (_req: Request, res: Response): Promise<void> => {
      const summary = await this.dashboardService.getDashboardSummary();
      res.status(200).json(summary);
    }
  );
}
