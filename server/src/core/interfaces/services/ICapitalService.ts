import { CreateCapitalRequestDto, UpdateCapitalRequestDto } from "../../../dto/capital/CapitalRequest.dto";
import { CapitalResponseDto } from "../../../dto/capital/CapitalResponse.dto";

export interface ICapitalService {
  createInitialCapital(dto: CreateCapitalRequestDto, adminId: string): Promise<CapitalResponseDto>;

  updateCapital(dto: UpdateCapitalRequestDto, adminId: string): Promise<CapitalResponseDto>;

  getCapital(): Promise<CapitalResponseDto | null>;
}
