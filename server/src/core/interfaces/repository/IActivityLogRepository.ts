import { IActivityLog } from "../../../models/ActivityLog";

export interface IActivityLogRepository {
  createLog(data: Partial<IActivityLog>): Promise<IActivityLog>;
 findAllWithUser(
    page: number,
    limit: number
  ): Promise<{ data: unknown[]; total: number }>;
}
