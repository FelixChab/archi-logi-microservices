import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ApiResponse, startApp } from './utils';
import { ProductDto } from '@log/ref';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '@log/ref';
import { getModelToken } from '@nestjs/mongoose';
import { createProduct } from './product.spec';

describe('Product (Graphql)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await startApp();
  });

  beforeEach(async () => {
    const productModel = app.get<Model<ProductDocument>>(
      getModelToken(Product.name)
    );
    await productModel.deleteMany({ ean: /[a-zA-Z0-9]+/ }).exec();
  });

  describe('Query', () => {
    it('should return the product ean if product is valid', async () => {
      const id = await createProduct(app);
      expect(id).toBeTruthy();

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: '{products {_id}}',
        });

      expect(response.body.data.products).toHaveLength(1);
      expect(response.body.data.products[0]._id).toBe(id);
    });
  });
});
