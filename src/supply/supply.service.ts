/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SupplyInputDto, SupplyProductDto } from './supply.dto';
import { StockMovementDto, StockMovementType } from '../dto/stockMovement.dto';
import { ProductDto } from '../dto/product.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SupplyService {

  constructor(private readonly httpService: HttpService) { }
  
  // Ping Pong
  public ping(): string {
    return 'pong';
  }
  
  // Issue #1 & #2 - Vérifie si un produit existe dans le catalogue
  private async isProductInCatalog(productId: string): Promise<boolean> {
    const catalog = await firstValueFrom(this.httpService.get<ProductDto[]>(`/api/products`));
    return catalog.data.some(product => product.ean === productId);
  }

  // Issue #2 - Création d'un produit dans le catalogue
  private async createProduct(product: SupplyProductDto): Promise<void> {
    const newProduct: ProductDto = {
      ean: product.ean,
      name: product.name,
      description: product.description,
      categories: [],
      price: product.purchasePricePerUnit,
    };
    await firstValueFrom(this.httpService.post(`/api/products`, newProduct));
  }

  // Issue #1 - Gestion approvisionnement
  async handleSupply(input: SupplyInputDto): Promise<void> {
    for (const product of input.products) {
      const productExists = await this.isProductInCatalog(product.ean)
      // On vérifie si le produit existe dans le catalogue
      if (!productExists) {
        await this.createProduct(product);
      }
      const stockMovement: StockMovementDto = {
        status: StockMovementType.Supply,
        productId: product.ean,
        quantity: product.quantity,
      };
      // Envoi l'incrément de stock
      await this.httpService.post(`/api/stock/${input.supplyId}/movement`, stockMovement);
      // Confirme la bonne réception de la commande
      await this.httpService.post(`http://donoma.ddns.net/api/supply-request`, stockMovement);
    }
  }
}
