import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Role } from '../rbac/role.enum';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find - should get an object', async () => {
    const data = await service.findOne('john');
    expect(data).toEqual({
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: [Role.User, Role.Admin],
    });
  });
});
