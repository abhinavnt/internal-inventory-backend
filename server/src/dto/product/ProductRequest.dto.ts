export class CreateProductRequestDto {
  name: string;
  code: string;
  stock: number;
  purchaseCost: number;
  shippingCost: number;
  notes?: string;

  constructor(data: CreateProductRequestDto) {
    if (!data.name || !data.code) {
      throw new Error("Product name and code are required");
    }

    this.name = data.name;
    this.code = data.code;
    this.stock = data.stock ?? 0;
    this.purchaseCost = data.purchaseCost ?? 0;
    this.shippingCost = data.shippingCost ?? 0;
    this.notes = data.notes;
  }
}

export class UpdateProductRequestDto {
  name?: string;
  purchaseCost?: number;
  shippingCost?: number;
  notes?: string;

  constructor(data: UpdateProductRequestDto) {
    Object.assign(this, data);
  }
}
