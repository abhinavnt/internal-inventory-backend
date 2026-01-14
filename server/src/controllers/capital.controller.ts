// ✅ CHANGED – FULL FILE (typed Request)

import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { TYPES } from "../di/types";
import { ICapitalController } from "../core/interfaces/controllers/ICapitalController";
import { ICapitalService } from "../core/interfaces/services/ICapitalService";
import {
  CreateCapitalRequestDto,
  UpdateCapitalRequestDto,
} from "../dto/capital/CapitalRequest.dto";
import { HttpError } from "../utils/HttpError";
import { AuthRequest } from "../types/auth-request";

@injectable()
export class CapitalController implements ICapitalController {
  constructor(
    @inject(TYPES.CapitalService)
    private capitalService: ICapitalService
  ) {}

  private getAdminId(req: AuthRequest): string {
    if (!req.user || !req.user._id) {
      throw new HttpError(401, "Unauthorized");
    }
    return req.user._id.toString();
  }

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const dto = new CreateCapitalRequestDto(req.body);
    const adminId = this.getAdminId(req as AuthRequest);

    const result = await this.capitalService.createInitialCapital(dto, adminId);
    res.status(201).json(result);
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const dto = new UpdateCapitalRequestDto(req.body);
    const adminId = this.getAdminId(req as AuthRequest);

    const result = await this.capitalService.updateCapital(dto, adminId);
    res.status(200).json(result);
  });

  get = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const capital = await this.capitalService.getCapital();
    res.status(200).json(capital);
  });
}
