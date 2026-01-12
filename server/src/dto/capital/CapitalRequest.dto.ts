export class CapitalCreateDto {
  initialAmount: number;

  constructor(data: CapitalCreateDto) {
    this.initialAmount = data.initialAmount;
  }
}
