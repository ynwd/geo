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
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

import { GeoService } from './geo.service';
import { Roles } from '../rbac/roles.decorator';
import { Role } from '../rbac/role.enum';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../rbac/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GeoDto } from './geo.dto';
import { GeoDataFileValidator } from '../app.validators';

const MAX_JSON_FILE = 2 * 1024 * 1024;

@Controller()
export class GeoController {
  constructor(private readonly appService: GeoService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'List geo files' })
  @ApiResponse({
    status: 200,
    description: 'List',
  })
  @Get('view')
  async view() {
    return await this.appService.find();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiParam({
    name: 'id',
    description: 'the geo id',
  })
  @ApiOperation({ summary: 'View detail geo file' })
  @ApiResponse({
    status: 200,
    description: 'The found geo',
  })
  @Get('view/:id')
  async viewOne(@Param() params: any) {
    return await this.appService.findOne(params.id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiParam({
    name: 'id',
    description: 'the geo id',
  })
  @ApiOperation({ summary: 'Delete geo file' })
  @Delete(':id')
  async delete(@Param() params: any) {
    return await this.appService.delete(params.id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload geo files' })
  @UseInterceptors(FilesInterceptor('files'))
  @ApiBody({
    description: 'Upload file',
    type: GeoDto,
  })
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
    body.files = data;
    return this.appService.uploadFile(body);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiBody({
    description: 'Update file',
    type: GeoDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update geo files' })
  @ApiParam({
    name: 'id',
    description: 'the geo id',
  })
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
    body.files = data;
    return this.appService.update(params.id, body);
  }
}
