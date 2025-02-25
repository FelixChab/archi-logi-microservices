import { Injectable } from '@nestjs/common';
import { RequiredSupplyDto, SupplyRequestDto } from './supply.dto';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class SupplyService {
  ping(): string {
    return 'pong';
  }

  async notifySuppliers(requiredSupplyDto: RequiredSupplyDto): Promise<void> {
    const productToSupply: ProductDto = await this.getProduct(
      requiredSupplyDto.productId,
    );
    const supplyRequest: SupplyRequestDto = {
      ean: productToSupply.ean,
    };
    await fetch('http://microservices.tp.rjqu8633.odns.fr/api/supply-request', {
      method: 'POST',
      body: JSON.stringify(supplyRequest),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getProduct(productId: string): Promise<ProductDto> {
    const response = await fetch(
      `http://microservices.tp.rjqu8633.odns.fr/api/products/${productId}`,
    );
    return await response.json();
  }
}
