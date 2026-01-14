// ✅ CHANGED – FULL FILE (supports create-if-not-exists)

import { inject, injectable } from "inversify";
import mongoose from "mongoose";

import { TYPES } from "../di/types";
import { ICapitalService } from "../core/interfaces/services/ICapitalService";
import { ICapitalRepository } from "../core/interfaces/repository/ICapitalRepository";
import { ICapitalHistoryRepository } from "../core/interfaces/repository/ICapitalHistoryRepository";

import {
  CreateCapitalRequestDto,
  UpdateCapitalRequestDto,
} from "../dto/capital/CapitalRequest.dto";
import { CapitalResponseDto } from "../dto/capital/CapitalResponse.dto";

@injectable()
export class CapitalService implements ICapitalService {
  constructor(
    @inject(TYPES.CapitalRepository)
    private capitalRepo: ICapitalRepository,

    @inject(TYPES.CapitalHistoryRepository)
    private historyRepo: ICapitalHistoryRepository
  ) {}

  async createInitialCapital(
    dto: CreateCapitalRequestDto,
    adminId: string
  ): Promise<CapitalResponseDto> {
    const existing = await this.capitalRepo.findOne();
    if (existing) {
      return new CapitalResponseDto(existing);
    }

    const capital = await this.capitalRepo.create({
      initialAmount: dto.initialAmount,
      notes: dto.notes,
      createdBy: new mongoose.Types.ObjectId(adminId),
    });

    return new CapitalResponseDto(capital);
  }

  async updateCapital(
    dto: UpdateCapitalRequestDto,
    adminId: string
  ): Promise<CapitalResponseDto> {
    const capital = await this.capitalRepo.findOne();

    // ✅ IF CAPITAL DOES NOT EXIST → CREATE IT
    if (!capital) {
      const created = await this.capitalRepo.create({
        initialAmount: dto.newAmount,
        notes: dto.reason,
        createdBy: new mongoose.Types.ObjectId(adminId),
      });

      return new CapitalResponseDto(created);
    }

    // ✅ STORE HISTORY ONLY FOR UPDATES
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

    return new CapitalResponseDto(updated!);
  }

  async getCapital(): Promise<CapitalResponseDto | null> {
    const capital = await this.capitalRepo.findOne();
    return capital ? new CapitalResponseDto(capital) : null;
  }
}
