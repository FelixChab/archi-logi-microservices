import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductGDto } from './dtos/product.graphql.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product';
import { Model } from 'mongoose';

@Resolver((of) => ProductGDto)
export class ProductResolver {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  @Query((returns) => ProductGDto)
  async product(@Args('id') id: string) {
    return this.productModel.findById(id).exec();
  }

  @Query((returns) => [ProductGDto])
  async products() {
    return this.productModel.find().exec();
  }
}
