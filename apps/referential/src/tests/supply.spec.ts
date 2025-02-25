import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ApiResponse, startApp } from './utils';
import { SupplyRequestDto } from '@log/contracts';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { SupplyRequest, SupplyRequestDocument } from '@log/supply';

describe('Supply-requests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await startApp();
  });

  beforeEach(async () => {
    const supplyRequestModel = app.get<Model<SupplyRequestDocument>>(
      getModelToken(SupplyRequest.name)
    );
    await supplyRequestModel.deleteMany({ ean: /[a-zA-Z0-9]+/ }).exec();
  });

  describe('POST', () => {
    it('should enable to create a supply request', async () => {
      await request(app.getHttpServer())
        .post('/api/supply-request')
        .send({
          ean: '123',
        } as SupplyRequestDto)
        .expect(201);

      const { body }: ApiResponse<SupplyRequestDto[]> = await request(
        app.getHttpServer()
      )
        .get('/api/supply-request')
        .expect(200);

      expect(body).toHaveLength(1);
      expect(body[0].ean).toBe('123');
    });
  });
});
