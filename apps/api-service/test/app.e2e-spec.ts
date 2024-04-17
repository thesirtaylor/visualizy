import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DatabaseApiServiceModule } from '../src/database-api-service/database-api-service.module';
import { CreateBankDto } from '../../../libs/shared/src/lib/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const data: CreateBankDto = {
    name: 'Zndianap raven Bank',
    bic: '023019',
    certificationNumber: 'i319amc',
    integrationbaseUrl: 'https://idpk.com/',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseApiServiceModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/DatabaseApiService /POST', () => {
    it('should fail with a 404 when no auth header set', async () => {
      const res = await request(app.getHttpServer()).post('/bank').send(data);

      expect(res.statusCode).toBe(401);
    });

    it('should pass with a 201 if auth header is set', async () => {
      const res = await request(app.getHttpServer())
        .post('/bank')
        .set('id', '3')
        .send(data);

      expect(res.statusCode).toBe(201);
    });

    test('should fail with a 400 if all required fields are missing', async () => {
      const res = await request(app.getHttpServer())
        .post('/bank')
        .set('id', '3')
        .send({});

      expect(res.statusCode).toBe(400);
    });

    test('should fail with a 400 if name is missing', async () => {
      const res = await request(app.getHttpServer())
        .post('/bank')
        .set('id', '3')
        .send({
          bic: '023019',
          certificationNumber: 'i319amc',
          integrationbaseUrl: 'https://idpk.com/',
        });

      expect(res.statusCode).toBe(400);
    });

    test('should fail with a 400 if bic is missing', async () => {
      const res = await request(app.getHttpServer())
        .post('/bank')
        .set('id', '3')
        .send({
          name: 'Zndianap raven Bank',
          certificationNumber: 'i319amc',
          integrationbaseUrl: 'https://idpk.com/',
        });

      expect(res.statusCode).toBe(400);
    });

    test('should fail with a 400 if certificationNumber is missing', async () => {
      const res = await request(app.getHttpServer())
        .post('/bank')
        .set('id', '3')
        .send({
          name: 'Zndianap raven Bank',
          bic: '023019',
          integrationbaseUrl: 'https://idpk.com/',
        });

      expect(res.statusCode).toBe(400);
    });

    test('should fail with a 400 if integrationbaseUrl is missing', async () => {
      const res = await request(app.getHttpServer())
        .post('/bank')
        .set('id', '3')
        .send({
          name: 'Zndianap raven Bank',
          bic: '023019',
          certificationNumber: 'i319amc',
        });

      expect(res.statusCode).toBe(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
