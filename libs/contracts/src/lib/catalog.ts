export interface ProductDto {
  _id?: string;
  ean: string;
  name: string;
  description: string;
  categories: string[];
  price: number;
}
