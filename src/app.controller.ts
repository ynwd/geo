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
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { GeoDataFileValidator } from './app.validators';
import { GeoDto } from './geo.dto';

const MAX_JSON_FILE = 2 * 1024 * 1024;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('view')
  async view() {
    return await this.appService.find();
  }

  @Get('view/:id')
  async viewOne(@Param() params: any) {
    return await this.appService.findOne(params.id);
  }

  @Delete(':id')
  async delete(@Param() params: any) {
    return await this.appService.delete(params.id);
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Post()
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
