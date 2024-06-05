import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PoisService } from './pois.service';
import { PoisDto } from './dto/pois.dto';
import { PoiDto } from './dto/poi.dto';
import ErrorMessage from '@config/errors';
import Message from './pois.message';

@ApiTags('pois')
@Controller('pois')
export class PoisController {
  constructor(private readonly poisService: PoisService) {}

  @Get()
  @ApiOperation({ summary: Message.FIND_ALL })
  @ApiQuery({ name: 'menu_id', required: false, type: String })
  @ApiQuery({ name: 'lang', required: false, type: String })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: ErrorMessage[403] })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [PoisDto],
  })
  async findAll(@Query() query: any) {
    return this.poisService.getAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: ErrorMessage[403] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: Message.NOT_FOUND })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  @ApiOperation({ summary: Message.FIND_DETAIL_ID })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PoiDto,
  })
  async findOne(@Param('id') id: number) {
    return this.poisService.getDetail(+id);
  }

  @Get('/idmap/:map_poi_id')
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: ErrorMessage[403] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: Message.NOT_FOUND })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessage[500],
  })
  @ApiOperation({ summary: Message.FIND_DETAIL_ID })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PoiDto,
  })
  async find(@Param('map_poi_id') map_poi_id: string) {
    return this.poisService.getDetailByIdMap(map_poi_id);
  }
}
