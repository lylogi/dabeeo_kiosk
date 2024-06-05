/* eslint-disable prettier/prettier */
import {  Inject, Injectable } from '@nestjs/common';
import { LogRepository } from './log.repository';
import { BaseService } from '@base/base.service';
import { Log } from '@entities/logs.entity';
import { LogDto } from './dto/log.dto';
import { CreateLogDto } from './dto/create-log.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TIME_SEND_LOGS } from '@config/constant';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { computerName } from 'dabeeo-reset-window';
import { HttpService } from '@nestjs/axios';
import { CronJob } from 'cron';
import * as fs from 'fs';
import { DataSource } from "typeorm";
@Injectable()
export class LogService extends BaseService<Log, LogRepository> {
  private readonly PATH_JSON_FILE = './public/syncs/';
  private readonly LOGS_API = '/api/logs';

  constructor(
    repository: LogRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
    private dataSource: DataSource,
  ) {
    super(repository);
  }
  async createLogs(createLogDto: CreateLogDto): Promise<any> {
    try {
      return await this.repository.save(plainToClass(Log, createLogDto));
    } catch (error) {
      console.log(error.message);
    }
  }

  async addCronJob(floorId) {
      this.logger.info('starting add cron job', floorId);
      const keys = Object.keys(TIME_SEND_LOGS);
      if (!keys.includes(floorId)) {
        this.logger.error('Cannot add cron job, please check again floorId. We will use default floorId: FL-7dV6I4tjO3219');
      }
      const job = new CronJob(`${TIME_SEND_LOGS[floorId] || '20/30  9-23 * * *'}`, async () => {
        await this.sendLogData()
      });
      if(this.schedulerRegistry.doesExist('cron',floorId)) {
        this.schedulerRegistry.deleteCronJob(floorId);
      }
      this.schedulerRegistry.addCronJob(floorId, job);
      job.start();
  }

  async getListLogs() {
    const logs = await this.repository.find({
      where: {
        status: false,
      },
    });
    return plainToInstance(LogDto, logs);
  }
  async readJsonFile(filePath: string) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async sendLogData() {
    this.logger.info('Send log data to admin server...');
    const _kioskId = await computerName();
    const kioskInfo = JSON.parse(
      <any>await this.readJsonFile('./public/kiosk_info.json'),
    );
    if (!kioskInfo) return;
    const dataLog: any = await this.getListLogs();
    if (dataLog?.length === 0) {
      return;
    }
    let response;
    try {
      response = await this.httpService.axiosRef({
        url: process.env.SYNC_URL + this.LOGS_API,
        method: 'POST',
        data: {
          kiosk_serial: _kioskId,
          site_id: kioskInfo?.siteId,
          logs: dataLog,
        },
      });
    } catch (error) {
      this.logger.info('Call API send log error');
      return
    }
    
    if (response.data.statusCode == 200) {
      this.logger.info('Send log data to admin server suscess');
       const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
      try{
        await this.repository.delete(dataLog);
        await queryRunner.commitTransaction();
        this.logger.info('-----> Delete log kiosk suscess <-----');
      }catch (error){
        this.logger.info('Delete log kiosk error ==>', error);
        await queryRunner.rollbackTransaction();
        return ;
      }finally {
        await queryRunner.release();
    }
    } else {
      this.logger.info('Send log data to admin server error');
    }
  }
}
