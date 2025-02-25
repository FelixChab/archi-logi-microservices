import { HttpException, Inject, Injectable } from '@nestjs/common';
import { SupplyInputDto, SupplySummaryDto } from './dto/supply.dto';
import { Repository } from 'typeorm';
import { SupplyEntity } from './entities/supply.entity';

@Injectable()
export class SupplyService {
  constructor(
    @Inject('SUPPLY_REPOSITORY')
    private supplyRepository: Repository<SupplyEntity>,
  ) {}

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

  stockSupplyEntityToDB(supplyInput: SupplyInputDto): Promise<SupplyEntity> {
    const supplyEntity: SupplyEntity = this.toSupplyEntity(supplyInput);
    return this.supplyRepository.save(supplyEntity);
  }

  async summary(): Promise<SupplySummaryDto> {
    const summaries = await this.supplyRepository.find();
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
