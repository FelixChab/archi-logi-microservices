export interface OrderToCreateDto {
  products: PurchasedProductDto[];
}

export interface OrderCreatedDto {
  id: string;
}

interface PurchasedProductDto {
  productId: string;
  quantity: number;
}

export interface OrderDetailsDto {
  id: string;
  status: OrderStatusDto;
  products: PurchasedProductDto[];
}

enum OrderStatusDto {
  Pending = 'Pending',
  Delivered = 'Delivered',
}

export interface UpdateOrderDto {
  status: OrderStatusDto;
}
