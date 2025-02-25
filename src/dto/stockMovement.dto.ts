export interface StockMovementDto {
  //productId: string;
  quantity: number;
  status: StockMovementType;
}

export enum StockMovementType {
  Supply = 'Supply',
  Reserve = 'Reserve',
  Removal = 'Removal',
}

export interface StockProductDto {
  productId: string;
  quantity: number;
}
