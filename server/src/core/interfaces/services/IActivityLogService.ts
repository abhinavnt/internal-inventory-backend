import { ActivityAction } from "../../constants/activity.enum";
import { IActivityLog } from "../../../models/ActivityLog";
import { ActivityLogListResponseDto } from "../../../dto/activity/ActivityLogListResponse.dto";

export interface IActivityLogService {
  logAction(action: ActivityAction, module: string, description: string, performedBy: string, entityId?: string): Promise<void>;

   getAllLogs(
    page: number,
    limit: number
  ): Promise<{ data: ActivityLogListResponseDto[]; total: number }>;
}
