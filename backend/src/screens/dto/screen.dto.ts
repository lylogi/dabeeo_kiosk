import { ApiProperty } from '@nestjs/swagger';

export class ScreenDto {
  @ApiProperty({ type: String })
  title = '';

  @ApiProperty({ type: String })
  originalname = '';

  @ApiProperty({ type: String })
  type = '';

  @ApiProperty({ type: String })
  mime_type = '';

  @ApiProperty({ type: String })
  url = '';

  @ApiProperty({ type: Number })
  duration = 5000;
}
