import { ISale } from "../../models/Sale";

export class SaleResponseDto {
  id: string;
  quantity: number;
  sellingAmount: number;
  shippingCollected: number;
  couponCode?: string;
  paymentMethod: string;
  createdAt: Date;

  constructor(sale: ISale) {
    this.id = sale._id.toString();
    this.quantity = sale.quantity;
    this.sellingAmount = sale.sellingAmount;
    this.shippingCollected = sale.shippingCollected;
    this.couponCode = sale.couponCode;
    this.paymentMethod = sale.paymentMethod;
    this.createdAt = sale.createdAt;
  }
}
