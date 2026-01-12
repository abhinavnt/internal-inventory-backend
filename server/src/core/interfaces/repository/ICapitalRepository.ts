import { ICapital } from "../../../models/Capital";

export interface ICapitalRepository {
  create(data: Partial<ICapital>): Promise<ICapital>;
  findLatest(): Promise<ICapital | null>;
  findById(id: string): Promise<ICapital | null>;
}
