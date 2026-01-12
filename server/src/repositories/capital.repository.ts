import { BaseRepository } from "../core/abstracts/base.repository";
import { ICapitalRepository } from "../core/interfaces/repository/ICapitalRepository";
import { Capital, ICapital } from "../models/Capital";

export class CapitalRepository extends BaseRepository<ICapital> implements ICapitalRepository {
  constructor() {
    super(Capital);
  }

  findLatest(): Promise<ICapital | null> {
    return this.model.findOne().sort({ createdAt: -1 });
  }
}
