import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookmarkDto {
  @ApiProperty({
    example: 'Unlocking the Future of Technology',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example:
      'An article discussing the future of AI and its impact on society.',
    required: false, // since it is optional
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'https://www.example.com/technology',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  link: string;
}
