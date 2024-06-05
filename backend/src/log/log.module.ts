import { Module, forwardRef } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogRepository } from './log.repository';
import { Log } from '@entities/logs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [LogController],
  providers: [LogService, LogRepository],
  imports: [TypeOrmModule.forFeature([Log]), forwardRef(() => HttpModule)],
})
export class LogModule {}
