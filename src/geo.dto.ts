import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GeoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'house', description: 'The name of files' })
  name: string;
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}
