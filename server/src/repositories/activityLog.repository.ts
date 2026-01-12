import { BaseRepository } from "../core/abstracts/base.repository";
import { ActivityLog, IActivityLog } from "../models/ActivityLog";
import { IActivityLogRepository } from "../core/interfaces/repository/IActivityLogRepository";

export class ActivityLogRepository extends BaseRepository<IActivityLog> implements IActivityLogRepository {
  constructor() {
    super(ActivityLog);
  }

  createLog(data: Partial<IActivityLog>): Promise<IActivityLog> {
    return this.create(data);
  }

  findAll(): Promise<IActivityLog[]> {
    return this.model.find().populate("performedBy", "name email").sort({ createdAt: -1 }).exec();
  }
}
