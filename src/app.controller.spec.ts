import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('getHello - should return "Geo data v1.0.0"', () => {
    expect(appController.getHello()).toBe('Geo data v1.0.0');
  });

  afterAll(async () => {
    await app.close();
  });
});
