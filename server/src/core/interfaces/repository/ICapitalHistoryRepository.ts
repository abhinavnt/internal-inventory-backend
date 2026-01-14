import { ICapitalHistory } from "../../../models/CapitalHistory";

export interface ICapitalHistoryRepository {
  create(data: Partial<ICapitalHistory>): Promise<ICapitalHistory>;
  findLatest(limit: number): Promise<ICapitalHistory[]>;
}
