import { ICapital } from "../../models/Capital";

export class CapitalResponseDto {
  id: string;
  initialAmount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(capital: ICapital) {
    this.id = capital._id.toString();
    this.initialAmount = capital.initialAmount;
    this.notes = capital.notes;
    this.createdAt = capital.createdAt;
    this.updatedAt = capital.updatedAt;
  }
}
