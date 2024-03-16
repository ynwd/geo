import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let module: TestingModule;
  let service: AuthService;
  let controller: AuthController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findOne - should return Geo', async () => {
    jest.spyOn(service, 'signIn').mockImplementation(async () => ({
      access_token: 'token',
    }));
    const data = await controller.signIn({
      username: 'john',
      password: 'changeme',
    });
    expect(data).toEqual({ access_token: 'token' });
  });

  afterAll(async () => {
    await module.close();
  });
});
