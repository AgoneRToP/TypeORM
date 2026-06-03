import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    type: 'string',
    required: true,
    maxLength: 256,
    example: 'lOREM',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'lorem ipsum ....',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: 'number',
    minimum: 1,
    example: 1,
    required: true,
  })
  @IsInt()
  @IsPositive()
  authorId: number;
}
