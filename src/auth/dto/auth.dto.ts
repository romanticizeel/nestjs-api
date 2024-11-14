import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'example@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '12345678',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
