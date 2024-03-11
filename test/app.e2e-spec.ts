import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { readFileSync } from 'fs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1', {
      exclude: [{ path: '/', method: RequestMethod.GET }],
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Geo data v1.0.0');
  });

  it('/api/v1 (POST) should allow for file uploads', async () => {
    const data = JSON.parse(readFileSync('./geo.json').toString());
    const data1 = JSON.parse(readFileSync('./geo1.json').toString());
    const data2 = JSON.parse(readFileSync('./geo2.json').toString());
    return request(app.getHttpServer())
      .post('/api/v1')
      .attach('files', './geo.json')
      .attach('files', './geo1.json')
      .attach('files', './geo2.json')
      .field('name', 'test')
      .expect(201)
      .expect({
        name: 'test',
        data: [data, data1, data2],
      });
  });

  it('/api/v1 (POST) name should not be empty', async () => {
    return request(app.getHttpServer())
      .post('/api/v1')
      .attach('files', './geo.json')
      .expect(400)
      .expect({
        message: ['name should not be empty', 'name must be a string'],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
