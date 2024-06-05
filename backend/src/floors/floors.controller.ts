import { Controller, Get, Param, HttpStatus } from '@nestjs/common';
import { FloorService } from './floors.service';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { FloorDto } from './dto/floor.dto';
import ErrorMessage from '@config/errors';
import Message from './floors.message'
@ApiTags('floors')
@Controller('floors')
export class FloorsController {
  constructor(private readonly floorsService: FloorService) {}
  @Get()
  @ApiOperation({ summary: Message.FIND_ALL })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: ErrorMessage[403] })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [FloorDto],
  })
  findAll() {
    return this.floorsService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: FloorDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessage[400],
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: Message.NOT_FOUND })
  findByFloorId(@Param('id') id: string) {
    return this.floorsService.getDetail(id);
  }
}
