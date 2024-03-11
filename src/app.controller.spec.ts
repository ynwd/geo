import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule } from './app.module';
import { Geo } from './geo.entity';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;
  let appService: AppService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appService = app.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('getHello - should return "Geo data v1.0.0"', () => {
      expect(appController.getHello()).toBe('Geo data v1.0.0');
    });

    it('uploadFile - should return object', async () => {
      jest
        .spyOn(appService, 'uploadFile')
        .mockImplementation(async () => ({ name: 'test' }) as Geo);

      const data = await appController.uploadFile({ name: 'test' }, []);
      expect(data).toStrictEqual({
        name: 'test',
      });
    });

    it('update - should return object', async () => {
      const res = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };
      jest.spyOn(appService, 'update').mockImplementation(async () => res);

      const data = await appController.update(1, { name: 'test' }, []);
      expect(data).toStrictEqual(res);
    });

    it('delete - should return undefined', async () => {
      jest.spyOn(appService, 'delete').mockImplementation(null);
      const data = await appController.delete(1);
      expect(data).toBeUndefined();
    });

    it('find - should return []', async () => {
      jest
        .spyOn(appService, 'find')
        .mockImplementation(async () => [{ name: 'test' }] as Geo[]);
      const data = await appController.view();
      expect(data).toEqual([{ name: 'test' }]);
    });

    it('find - should return Geo', async () => {
      jest
        .spyOn(appService, 'findOne')
        .mockImplementation(async () => ({ name: 'test' }) as Geo);
      const data = await appController.viewOne(1);
      expect(data).toEqual({ name: 'test' });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
