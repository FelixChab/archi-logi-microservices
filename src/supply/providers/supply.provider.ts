import { DataSource } from 'typeorm';
import { SupplyEntity } from '../entities/supply.entity';

export const supplyProviders = [
  {
    provide: 'SUPPLY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SupplyEntity),
    inject: ['DATA_SOURCE'],
  },
];
