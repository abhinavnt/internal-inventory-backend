// ✅ CHANGED – FULL FILE (includes all frontend-required fields)

import { ISale } from "../../models/Sale";

export class SaleResponseDto {
  _id: string;
  customerName: string;
  address: string;
  phone: string;
  quantity: number;
  sellingAmount: number;
  shippingCollected: number;
  couponCode?: string;
  paymentMethod: string;
  createdAt: Date;
  createdBy: {
    _id: string;
    name: string;
  };

  constructor(sale: any) {
    this._id = sale._id.toString();
    this.customerName = sale.customerName;
    this.address = sale.address;
    this.phone = sale.phone;
    this.quantity = sale.quantity;
    this.sellingAmount = sale.sellingAmount;
    this.shippingCollected = sale.shippingCollected;
    this.couponCode = sale.couponCode;
    this.paymentMethod = sale.paymentMethod;
    this.createdAt = sale.createdAt;
    this.createdBy = sale.createdBy;
  }
}
