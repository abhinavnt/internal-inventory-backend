import { IActivityLog } from "../../../models/ActivityLog";

export interface IActivityLogRepository {
  createLog(data: Partial<IActivityLog>): Promise<IActivityLog>;
  findAll(): Promise<IActivityLog[]>;
}
