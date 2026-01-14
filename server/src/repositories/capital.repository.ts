import { BaseRepository } from "../core/abstracts/base.repository";
import { Capital, ICapital } from "../models/Capital";
import { ICapitalRepository } from "../core/interfaces/repository/ICapitalRepository";

export class CapitalRepository extends BaseRepository<ICapital> implements ICapitalRepository {
  constructor() {
    super(Capital);
  }

  findOne(): Promise<ICapital | null> {
    return this.model.findOne().exec();
  }
}
