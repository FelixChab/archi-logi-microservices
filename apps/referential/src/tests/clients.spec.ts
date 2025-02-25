import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ApiResponse, startApp } from './utils';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Order, OrderDocument } from '@log/clients';

describe('Clients', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await startApp();
  });

  beforeEach(async () => {
    const orderModel = app.get<Model<OrderDocument>>(getModelToken(Order.name));
    await orderModel.deleteMany({ ean: /[a-zA-Z0-9]+/ }).exec();
  });

  describe('POST', () => {
    it('should register an order as delivered', async () => {
      await request(app.getHttpServer())
        .post('/api/client-orders/1a2')
        .expect(201);

      const { body }: ApiResponse<{ reference: string }[]> = await request(
        app.getHttpServer()
      )
        .get('/api/client-orders')
        .expect(200);

      expect(body).toHaveLength(1);
      expect(body[0].reference).toBe('1a2');
    });
  });
});
