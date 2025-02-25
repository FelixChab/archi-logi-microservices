import { Module } from '@nestjs/common';
import { SupplyRequestController } from './supply-request/supply-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SupplyRequest,
  SupplyRequestSchema,
} from './supply-request/entities/supply-request';

@Module({
  controllers: [SupplyRequestController],
  imports: [
    MongooseModule.forFeature([
      { name: SupplyRequest.name, schema: SupplyRequestSchema },
    ]),
  ],
  providers: [],
  exports: [],
})
export class SupplyModule {}
