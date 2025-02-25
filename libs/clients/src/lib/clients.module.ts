import { Module } from '@nestjs/common';
import { ClientOrdersController } from './clients/client-orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './clients/entities/order';

@Module({
  controllers: [ClientOrdersController],
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [],
  exports: [],
})
export class ClientsModule {}
