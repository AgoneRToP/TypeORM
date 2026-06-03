import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    required: true,
    maxLength: 128,
    example: 'Tommy Angelo',
  })
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'number',
    required: true,
    minimum: 12,
    example: 25,
  })
  @IsString()
  @IsInt()
  @Min(12)
  age: number;
}
