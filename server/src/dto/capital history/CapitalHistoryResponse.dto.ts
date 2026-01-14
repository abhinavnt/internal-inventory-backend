import { ICapitalHistory } from "../../models/CapitalHistory";

export class CapitalHistoryResponseDto {
  previousAmount: number;
  newAmount: number;
  reason?: string;
  createdAt: Date;

  constructor(history: ICapitalHistory) {
    this.previousAmount = history.previousAmount;
    this.newAmount = history.newAmount;
    this.reason = history.reason;
    this.createdAt = history.createdAt;
  }
}
