export class CreateCapitalRequestDto {
  initialAmount: number;
  notes?: string;

  constructor(data: CreateCapitalRequestDto) {
    if (data.initialAmount === undefined || data.initialAmount < 0) {
      throw new Error("Initial capital amount is required");
    }

    this.initialAmount = data.initialAmount;
    this.notes = data.notes;
  }
}

export class UpdateCapitalRequestDto {
  newAmount: number;
  reason?: string;

  constructor(data: UpdateCapitalRequestDto) {
    if (data.newAmount === undefined || data.newAmount < 0) {
      throw new Error("New capital amount is required");
    }

    this.newAmount = data.newAmount;
    this.reason = data.reason;
  }
}
