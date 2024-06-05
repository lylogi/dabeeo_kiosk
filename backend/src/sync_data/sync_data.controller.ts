import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Query,
  Sse,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SyncDataService } from './sync_data.service';
import ErrorMessage from '@config/errors';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Observable, Subject } from 'rxjs';
@ApiTags('sync_data')
@Controller('sync')
export class SyncDataController {
  public eventSubject = new Subject<object>();
  private appName = 'TestWpfApp1.exe';

  constructor(
    private readonly syncDataService: SyncDataService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('reboot')
  resetKiosk() {
    return this.syncDataService.resetKiosk();
  }

  @Get('')
  @ApiOperation({ summary: 'Sync data from server' })
  @ApiResponse({ status: HttpStatus.OK, type: Object })
  @ApiResponse({ status: 405, description: ErrorMessage[400] })
  syncServerData(@Query('isFirst') isFirst: string, @Headers() headers) {
    return this.syncDataService.retrySync(headers, isFirst);
  }

  @Get('setStatus')
  @ApiOperation({ summary: 'Set status data from server' })
  @ApiResponse({ status: HttpStatus.OK, type: Object })
  @ApiResponse({ status: 405, description: ErrorMessage[400] })
  setSystemStatus(
    @Query('status') status: number,
    @Query('message') message: string,
    @Headers() headers,
  ) {
    return this.syncDataService.setSystemStatus(status, message);
  }

  @Get('checkStatus')
  @ApiOperation({ summary: 'Check status from server' })
  @ApiResponse({ status: HttpStatus.OK, type: Object })
  @ApiResponse({ status: 405, description: ErrorMessage[400] })
  checkStatus() {
    this.logger.info('Checking status from server');
    return this.syncDataService.getKioskStatus();
  }

  @Get('resync')
  @ApiOperation({ summary: 'ReSync data from server' })
  @ApiResponse({ status: HttpStatus.OK, type: Object })
  @ApiResponse({ status: 405, description: ErrorMessage[400] })
  resyncData(@Headers() headers) {
    this.logger.info('Starting resync data from server');
    return this.syncDataService.syncServerData(
      headers,
      'true',
      this.eventSubject,
    );
  }

  @Get('sse')
  @Sse() // This decorator enables the server to send SSE events
  streamData(): Observable<object> {
    return this.eventSubject.asObservable();
  }

  @Get('restartApp')
  restartApp() {
    return this.syncDataService.restartAppByProcessName(this.appName);
  }

  @Get('readSytemStatus')
  readSytemStatus() {
    return this.syncDataService.readLogKisokForAdmin();
  }

  @Get('deleteLogSystemStatus')
  deleteLogSystemStatus() {
    return this.syncDataService.deleteLogSystemStatus();
  }
}
