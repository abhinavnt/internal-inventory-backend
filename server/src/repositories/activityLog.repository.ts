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

  async findAllWithUser(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "performedBy",
              foreignField: "_id",
              as: "user",
            },
          },
          { $unwind: "$user" },
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ])
        .exec(),

      this.model.countDocuments(),
    ]);

    return { data, total };
  }
}
