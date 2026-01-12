import { ICapital } from "../../../models/Capital";

export interface ICapitalRepository {
  findOne(): Promise<ICapital | null>;
  create(data: Partial<ICapital>): Promise<ICapital>;
  update(id: string, data: Partial<ICapital>): Promise<ICapital | null>;
}
