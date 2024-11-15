import {
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditArticleDto {
  @ApiProperty({
    example:
      'Updated unlocking the Future of Technology',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example:
      'Updated An in-depth look into the latest practices and tools in web development, covering frameworks, performance optimization, and responsive design.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example:
      'https://www.example.com/updated-technology',
    required: false,
  })
  @IsString()
  @IsOptional()
  link?: string;
}
