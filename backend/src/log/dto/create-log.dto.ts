import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';

export class CreateLogDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  type = '';

  @IsNotEmpty()
  @IsNotEmptyObject()
  @ApiProperty({ type: Object })
  data = {};
}
