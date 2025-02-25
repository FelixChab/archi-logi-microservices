import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ApiResponse, startApp } from './utils';
import { ProductDto } from '@log/ref';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '@log/ref';
import { getModelToken } from '@nestjs/mongoose';

export async function createProduct(app: INestApplication) {
  const { body } = await request(app.getHttpServer())
    .post('/api/products')
    .send({
      ean: '12346',
      name: 'Boomerang',
      description: 'Coming straight from Australia',
      categories: ['game'],
    } as ProductDto)
    .expect(201);
  return body.id;
}

describe('Product', () => {
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

  describe('POST', () => {
    it('should return 201 if product is valid', async () => {
      const id = await createProduct(app);

      expect(id).toBeTruthy();
    });

    it('should be able to retrieve the product if product is created', async () => {
      const id = await createProduct(app);

      const { body }: ApiResponse<ProductDto> = await request(
        app.getHttpServer()
      )
        .get(`/api/products/${id}`)
        .expect(200);
      expect(body.ean).toBe('12346');
    });
  });

  describe('GET', () => {
    it('should be able to retrieve all the added products', async () => {
      const id1 = await createProduct(app);
      const id2 = await createProduct(app);

      const { body }: ApiResponse<ProductDto[]> = await request(
        app.getHttpServer()
      )
        .get(`/api/products`)
        .expect(200);
      expect(body).toHaveLength(2);
      expect(body.find((p) => p._id === id1)).toBeTruthy();
      expect(body.find((p) => p._id === id2)).toBeTruthy();
    });
  });
});
