import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import { FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { GeoDataFileValidator } from './app.validators';
import { GeoDto } from './geo.dto';
import { AuthGuard } from './auth/auth.guard';

const MAX_JSON_FILE = 2 * 1024 * 1024;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get version' })
  @ApiResponse({
    status: 200,
    description: 'Version',
  })
  @ApiBearerAuth()
  getHello() {
    return this.appService.getHello();
  }

  @Get('view')
  @ApiOperation({ summary: 'List geo files' })
  @ApiResponse({
    status: 200,
    description: 'List',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async view() {
    return await this.appService.find();
  }

  @Get('view/:id')
  @ApiParam({
    name: 'id',
    description: 'the geo id',
  })
  @ApiOperation({ summary: 'View detail geo file' })
  @ApiResponse({
    status: 200,
    description: 'The found geo',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async viewOne(@Param() params: any) {
    return await this.appService.findOne(params.id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'the geo id',
  })
  @ApiOperation({ summary: 'Delete geo file' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async delete(@Param() params: any) {
    return await this.appService.delete(params.id);
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload geo files' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  uploadFile(
    @Body() body: GeoDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'json' }),
          new MaxFileSizeValidator({ maxSize: MAX_JSON_FILE }),
          new GeoDataFileValidator({}),
        ],
      }),
    )
    files?: Array<Express.Multer.File>,
  ) {
    const data = files.map((v) => JSON.parse(v.buffer.toString()));
    return this.appService.uploadFile(body, data);
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update geo files' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  update(
    @Param() params: any,
    @Body() body: GeoDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'json' }),
          new MaxFileSizeValidator({ maxSize: MAX_JSON_FILE }),
          new GeoDataFileValidator({}),
        ],
      }),
    )
    files?: Array<Express.Multer.File>,
  ) {
    const data = files.map((v) => JSON.parse(v.buffer.toString()));
    return this.appService.update(params.id, body, data);
  }
}
