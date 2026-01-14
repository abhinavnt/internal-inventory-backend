import { DashboardResponseDto } from "../../../dto/dashboard/DashboardResponse.dto";

export interface IDashboardService {
  getDashboardSummary(): Promise<DashboardResponseDto>;
}
