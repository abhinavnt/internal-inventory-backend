import { ICapitalHistory } from "../../../models/CapitalHistory";

export interface ICapitalHistoryRepository {
  create(data: Partial<ICapitalHistory>): Promise<ICapitalHistory>;
  findAll(): Promise<ICapitalHistory[]>;
}
