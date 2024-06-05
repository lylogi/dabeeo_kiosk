import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';
import ErrorMessage from '@config/errors';
import eventMessage from './event.message';
@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOperation({ summary: 'Find all event' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  @ApiResponse({ status: HttpStatus.OK })
  async findAll() {
    return await this.eventService.getListEvents();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find event by ID' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessage[400],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: eventMessage.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: ErrorMessage[403] })
  @ApiResponse({ status: HttpStatus.OK, type: EventDto })
  async findOne(@Param('id') id: number) {
    return this.eventService.getEventById(id);
  }
}
