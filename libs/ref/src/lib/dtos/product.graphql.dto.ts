import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductGDto {
  @Field()
  _id: string;

  @Field()
  ean: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => [String], { nullable: true })
  categories?: string[];

  @Field((type) => Float)
  price: number;
}
