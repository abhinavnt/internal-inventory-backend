export class CreateSaleRequestDto {
  customerName: string;
  address: string;
  phone: string;
  quantity: number;
  sellingAmount: number;
  shippingCollected: number;
  couponCode?: string;
  paymentMethod: "CASH" | "UPI" | "BANK" | "OTHER";

  constructor(data: CreateSaleRequestDto) {
    if (!data.customerName || !data.phone || !data.address) {
      throw new Error("Customer details are required");
    }
    if (!data.quantity || data.quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    this.customerName = data.customerName;
    this.address = data.address;
    this.phone = data.phone;
    this.quantity = data.quantity;
    this.sellingAmount = data.sellingAmount;
    this.shippingCollected = data.shippingCollected;
    this.couponCode = data.couponCode;
    this.paymentMethod = data.paymentMethod;
  }
}
