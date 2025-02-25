import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupplyRequestDocument = SupplyRequest & Document;

@Schema()
export class SupplyRequest {
  @Prop()
  ean: string;
}

export const SupplyRequestSchema = SchemaFactory.createForClass(SupplyRequest);
