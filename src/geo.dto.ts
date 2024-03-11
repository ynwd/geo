import { IsString, IsNotEmpty } from 'class-validator';

export class GeoDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
