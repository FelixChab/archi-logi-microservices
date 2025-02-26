/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { StockMovementDto, StockMovementType } from '../dto/stockMovement.dto';
import { ProductDto } from '../dto/product.dto';
import { RequiredSupplyDto, SupplyInputDto, SupplyProductDto, SupplyRequestDto, SupplySummaryDto } from './dto/supply.dto';
import { SupplyEntity } from './entities/supply.entity';

@Injectable()
export class SupplyService {
  suppliesStock: SupplyEntity[] = [];

  // Ping Pong
  ping(): string {
    return 'pong';
  }

  // Issue #1 & #2 - Vérifie si un produit existe dans le catalogue
  private async isProductInCatalog(productEan: string): Promise<boolean> {
    const catalog: ProductDto[]= await this.getAllProducts();
    return catalog.some((product: ProductDto): boolean => product.ean === productEan);
  }

  private async getAllProducts(): Promise<ProductDto[]> {
    const response: Response = await fetch(
      'http://microservices.tp.rjqu8633.odns.fr/api/products',
    );
    return response.json();
  }

  private async getProductId(product: SupplyProductDto): Promise<string> {
    const products: ProductDto[] = await this.getAllProducts();
    return products.find((p: ProductDto): boolean => p.ean === product.ean)._id;
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
    await fetch('http://microservices.tp.rjqu8633.odns.fr/api/products', {
      method: 'POST',
      body: JSON.stringify(newProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Issue #1 - Gestion approvisionnement
  async handleSupply(input: SupplyInputDto): Promise<void> {
    for (const product of input.products) {
      const productExists = await this.isProductInCatalog(product.ean);
      if (!productExists) {
        await this.createProduct(product);
      }
      const stockMovement: StockMovementDto = {
        status: StockMovementType.Supply,
        quantity: product.quantity,
      };
      const productId = await this.getProductId(product);
      // Envoi l'incrément de stock
      await fetch(`http://donoma.ddns.net/api/stock/${productId}/movement`, {
        method: 'POST',
        body: JSON.stringify(stockMovement),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    this.stockSupplyEntityToDB(input);
  }

  toSupplyEntity(supplyInput: SupplyInputDto): SupplyEntity {
    const supplyEntity = new SupplyEntity();
    supplyEntity.id = supplyInput.supplyId;
    supplyEntity.products = JSON.stringify(supplyInput.products);
    supplyEntity.totalPrice = supplyInput.products.reduce(
      (acc, product) => acc + product.purchasePricePerUnit * product.quantity,
      0,
    );
    return supplyEntity;
  }

  stockSupplyEntityToDB(supplyInput: SupplyInputDto): SupplyEntity {
    const supplyEntity: SupplyEntity = this.toSupplyEntity(supplyInput);
    this.suppliesStock.push(supplyEntity);
    return supplyEntity;
  }

  async summary(): Promise<SupplySummaryDto> {
    const summaries = this.suppliesStock;
    if (summaries) {
      const summariesResume: SupplySummaryDto = {
        nbSupplies: summaries.length,
        totalNbProducts: summaries.reduce(
          (acc, summary) => acc + JSON.parse(summary.products).length,
          0,
        ),
        totalPurchasePrice: summaries.reduce(
          (acc, summary) => acc + summary.totalPrice,
          0,
        ),
      };
      return summariesResume;
    } else {
      throw new HttpException('No supplies found', 404);
    }
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
