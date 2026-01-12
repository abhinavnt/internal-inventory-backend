import { BaseRepository } from "../core/abstracts/base.repository";
import { CapitalHistory, ICapitalHistory } from "../models/CapitalHistory";
import { ICapitalHistoryRepository } from "../core/interfaces/repository/ICapitalHistoryRepository";

export class CapitalHistoryRepository extends BaseRepository<ICapitalHistory> implements ICapitalHistoryRepository {
  constructor() {
    super(CapitalHistory);
  }

  findAll(): Promise<ICapitalHistory[]> {
    return this.model.find().populate("changedBy", "name email").sort({ createdAt: -1 }).exec();
  }
}
