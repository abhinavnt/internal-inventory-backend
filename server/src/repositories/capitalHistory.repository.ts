// ✅ CHANGED – FULL FILE

import { BaseRepository } from "../core/abstracts/base.repository";
import { CapitalHistory, ICapitalHistory } from "../models/CapitalHistory";
import { ICapitalHistoryRepository } from "../core/interfaces/repository/ICapitalHistoryRepository";

export class CapitalHistoryRepository
  extends BaseRepository<ICapitalHistory>
  implements ICapitalHistoryRepository
{
  constructor() {
    super(CapitalHistory);
  }

  findLatest(limit: number): Promise<ICapitalHistory[]> {
    return this.model
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }
}
