import { ActivityAction } from "../../constants/activity.enum";
import { IActivityLog } from "../../../models/ActivityLog";

export interface IActivityLogService {
  logAction(action: ActivityAction, module: string, description: string, performedBy: string, entityId?: string): Promise<void>;

  getAllLogs(): Promise<IActivityLog[]>;
}
