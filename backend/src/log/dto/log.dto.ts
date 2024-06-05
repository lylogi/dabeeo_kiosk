import { ApiProperty } from '@nestjs/swagger';

export class LogDto {
  @ApiProperty({ type: Number })
  type = '';

  @ApiProperty({ type: String })
  data = '';

  @ApiProperty({ type: Date })
  createdAt = '';

  @ApiProperty({ type: Boolean })
  status = '';
}
