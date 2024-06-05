import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ScreenService } from './screens.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScreenDto } from './dto/screen.dto';
import ErrorMessage from '@config/errors';
import Message from './screens.message';
import { type } from 'os';

@ApiTags('screens')
@Controller('screens')
export class ScreensController {
  constructor(private readonly screenService: ScreenService) {}

  @Get()
  @ApiOperation({ summary: Message.FIND_DETAIL_TYPE })
  @ApiQuery({ name: 'type', type: String })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: ErrorMessage[403] })
  @ApiResponse({ status: HttpStatus.OK, type: [ScreenDto] })
  async findByType(@Query() query: any) {
    return this.screenService.getListScreen(query);
  }
}
