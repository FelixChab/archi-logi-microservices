import { HttpException, Injectable } from '@nestjs/common';
import { SupplyInputDto, SupplySummaryDto } from './dto/supply.dto';
import { SupplyEntity } from './entities/supply.entity';

@Injectable()
export class SupplyService {
  suppliesStock: SupplyEntity[] = [];

  ping(): string {
    return 'pong';
  }

  toSupplyEntity(supplyInput: SupplyInputDto): SupplyEntity {
    const supplyEntity = new SupplyEntity();
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
}
