import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get version' })
  @ApiResponse({
    status: 200,
    description: 'Version',
  })
  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
