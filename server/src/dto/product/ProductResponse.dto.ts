import { IProduct } from "../../models/Product";

export class ProductResponseDto {
  id: string;
  name: string;
  code: string;
  stock: number;
  purchaseCost: number;
  shippingCost: number;
  notes?: string;

  constructor(product: IProduct) {
    this.id = product._id.toString();
    this.name = product.name;
    this.code = product.code;
    this.stock = product.stock;
    this.purchaseCost = product.purchaseCost;
    this.shippingCost = product.shippingCost;
    this.notes = product.notes;
  }
}
