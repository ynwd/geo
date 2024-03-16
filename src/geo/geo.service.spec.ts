import { Test, TestingModule } from '@nestjs/testing';
import { GeoService } from './geo.service';
import { Geo } from './geo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const mockRepository = {};

describe('UsersService', () => {
  let service: GeoService;
  let repository: Repository<Geo>;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        GeoService,
        {
          provide: getRepositoryToken(Geo),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GeoService>(GeoService);
    repository = module.get<Repository<Geo>>(getRepositoryToken(Geo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('uploadFile - should return object', async () => {
    repository.save = jest.fn().mockResolvedValue({ name: 'test' });
    const geo = await service.uploadFile({ name: 'test', files: [] });
    expect(repository.save).toHaveBeenCalled();
    expect(geo).toEqual({ name: 'test' });
  });

  it('find - should get an array', async () => {
    repository.find = jest.fn().mockResolvedValue([]);
    const geo = await service.find();
    expect(repository.find).toHaveBeenCalled();
    expect(geo).toEqual([]);
  });

  it('findOne - should get a single geo', async () => {
    repository.findOne = jest.fn().mockResolvedValue({ name: 'test' });
    const geo = await service.findOne(1);
    expect(repository.findOne).toHaveBeenCalled();
    expect(geo).toEqual({ name: 'test' });
  });

  it('update - should return object', async () => {
    const res = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };
    repository.update = jest.fn().mockResolvedValue(res);
    const geo = await service.update(1, { name: 'new', files: [] });
    expect(repository.update).toHaveBeenCalled();
    expect(geo).toEqual(res);
  });

  it('delete - should delete a task', async () => {
    repository.delete = jest.fn().mockResolvedValue(null);
    await repository.delete(1);
    expect(repository.delete).toHaveBeenCalled();
  });

  afterAll(async () => {
    await module.close();
  });
});
