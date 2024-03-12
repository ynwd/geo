import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'john', description: 'user' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'changeme', description: 'password' })
  password: string;
}
