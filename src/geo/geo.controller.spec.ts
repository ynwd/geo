import { Test, TestingModule } from '@nestjs/testing';
import { GeoService } from './geo.service';
import { GeoController } from './geo.controller';
import { Geo } from './geo.entity';
import { AppModule } from '../app.module';

describe('GeoController', () => {
  let app: TestingModule;
  let service: GeoService;
  let controller: GeoController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = app.get<GeoService>(GeoService);
    controller = app.get<GeoController>(GeoController);
  });

  describe('Geo CRUD', () => {
    it('uploadFile - should return object', async () => {
      jest
        .spyOn(service, 'uploadFile')
        .mockImplementation(async () => ({ name: 'test' }) as Geo);

      const data = await controller.uploadFile({ name: 'test', files: [] }, []);
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
      jest.spyOn(service, 'update').mockImplementation(async () => res);

      const data = await controller.update(1, { name: 'test', files: [] }, []);
      expect(data).toStrictEqual(res);
    });

    it('delete - should return undefined', async () => {
      jest.spyOn(service, 'delete').mockImplementation(null);
      const data = await controller.delete(1);
      expect(data).toBeUndefined();
    });

    it('find - should return []', async () => {
      jest
        .spyOn(service, 'find')
        .mockImplementation(async () => [{ id: 1, name: 'test', data: [] }]);
      const data = await controller.view();
      expect(data).toEqual([{ id: 1, name: 'test', data: [] }]);
    });

    it('findOne - should return Geo', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(
          async () => ({ id: 1, name: 'test', data: [] }) as Geo,
        );
      const data = await controller.viewOne(1);
      expect(data).toEqual({ id: 1, name: 'test', data: [] });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
