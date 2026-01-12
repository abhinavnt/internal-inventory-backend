import { inject, injectable } from "inversify";
import mongoose from "mongoose";

import { TYPES } from "../di/types";
import { ICapitalService } from "../core/interfaces/services/ICapitalService";
import { ICapitalRepository } from "../core/interfaces/repository/ICapitalRepository";
import { ICapitalHistoryRepository } from "../core/interfaces/repository/ICapitalHistoryRepository";
import { CreateCapitalRequestDto, UpdateCapitalRequestDto } from "../dto/capital/CapitalRequest.dto";
import { CapitalResponseDto } from "../dto/capital/CapitalResponse.dto";
import { HttpError } from "../utils/HttpError";

@injectable()
export class CapitalService implements ICapitalService {
  constructor(
    @inject(TYPES.CapitalRepository)
    private capitalRepo: ICapitalRepository,
    @inject(TYPES.CapitalHistoryRepository)
    private historyRepo: ICapitalHistoryRepository
  ) {}

  async createInitialCapital(dto: CreateCapitalRequestDto, adminId: string): Promise<CapitalResponseDto> {
    const existing = await this.capitalRepo.findOne();
    if (existing) {
      throw new HttpError(400, "Initial capital already exists");
    }

    const capital = await this.capitalRepo.create({
      initialAmount: dto.initialAmount,
      notes: dto.notes,
      createdBy: new mongoose.Types.ObjectId(adminId),
    });

    return new CapitalResponseDto(capital);
  }

  async updateCapital(dto: UpdateCapitalRequestDto, adminId: string): Promise<CapitalResponseDto> {
    const capital = await this.capitalRepo.findOne();
    if (!capital) {
      throw new HttpError(404, "Capital not initialized");
    }

    await this.historyRepo.create({
      previousAmount: capital.initialAmount,
      newAmount: dto.newAmount,
      reason: dto.reason,
      changedBy: new mongoose.Types.ObjectId(adminId),
    });

    const updated = await this.capitalRepo.update(capital._id.toString(), {
      initialAmount: dto.newAmount,
      updatedBy: new mongoose.Types.ObjectId(adminId),
    });

    if (!updated) {
      throw new HttpError(500, "Failed to update capital");
    }

    return new CapitalResponseDto(updated);
  }

  async getCapital(): Promise<CapitalResponseDto | null> {
    const capital = await this.capitalRepo.findOne();
    return capital ? new CapitalResponseDto(capital) : null;
  }
}
