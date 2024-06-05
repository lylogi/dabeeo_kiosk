import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Headers,
} from '@nestjs/common';
import { Menu } from '@entities/menu.entity';
import { Pois } from '@entities/pois.entity';
import { Tag } from '@entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In, getConnection } from 'typeorm';
import { Event } from '@entities/event.entity';
import { Floor } from '@entities/floor.entity';
import { Screens } from '@entities/screen.entity';
import { reboot, computerName, ip } from 'dabeeo-reset-window';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import * as admZip from 'adm-zip';
import axios from 'axios';
import { Files } from '@entities/files.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { SftpService } from '@config/sftp';
// import { createWriteStream } from 'fs';
import * as path from 'path';
import { LogService } from '@src/log/log.service';
import { exec } from 'child_process';

enum RESYNC_STATUS {
  LOADING = 1,
  DONE = 2,
}

@Injectable()
export class SyncDataService {
  private readonly SYNC_API = '/api/sync_datas/getLink';
  private readonly SYNC_STATUS_API = '/api/sync_datas/checkSyncStatus';
  private readonly PATH_JSON_FILE = './public/syncs/';
  private readonly PATH_MAP_FILE = './public/maps/';
  private readonly PATH_MEDIA_FILE = './public/media';
  private readonly PATH_MEDIA_THUMB_FILE = './public/media/thumb';
  private readonly PATH_KIOSK_INFO = './public/kiosk_info.json';
  private readonly PATH_LOG_ERROR = './public/files/log_error.json';
  private readonly TIME_JSON_FILE = process.env.TIME_RETRY_SYNC;

  repositories: object;
  constructor(
    @InjectRepository(Pois)
    PoisRepository: Repository<Pois>,
    @InjectRepository(Tag)
    TagRepository: Repository<Tag>,
    @InjectRepository(Menu)
    MenuRepository: Repository<Menu>,
    @InjectRepository(Event)
    EventRepository: Repository<Event>,
    @InjectRepository(Floor)
    FloorRepository: Repository<Floor>,
    @InjectRepository(Screens)
    ScreenRepository: Repository<Screens>,
    @InjectRepository(Files)
    FilesRepository: Repository<Files>,
    private readonly httpService: HttpService,
    private DataSource: DataSource,
    private logService: LogService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly sftpService: SftpService,
  ) {
    this.repositories = {
      menus: MenuRepository,
      tags: TagRepository,
      floors: FloorRepository,
      events: EventRepository,
      pois: PoisRepository,
      screens: ScreenRepository,
      files: FilesRepository,
    };
    this.createFolderIfNotExist(this.PATH_MEDIA_FILE);
  }

  async retrySync(headers: any, isFirst = 'false', maxRetries = 3) {
    let currentTry = 1;
    while (true) {
      const data = (await this.syncServerData(headers, isFirst)) as any;
      if (data?.dataKiosk) {
        return data;
      }
      if (currentTry < maxRetries) {
        this.logger.info(
          `No data when syncing. We will retry after ${
            +this.TIME_JSON_FILE / 1000
          } seconds ${data.error}`,
        );
        await this.delay(this.TIME_JSON_FILE);
        currentTry++;
      } else {
        this.logger.info(`Opps! No data after ${maxRetries} retry times...`);
        this.getSyncStatusForAdmin(headers, 4);
        return data;
      }
    }
  }

  async setSystemStatus(status: number, message: string) {
    if (+status !== 1) {
      let oldData = await this.readFileJsonInfo(
        this.PATH_LOG_ERROR || './public/files/log_error.json',
      );
      if (!oldData || !oldData.data) {
        oldData = { data: [] };
      }
      const newMessage = {
        status: +status,
        datetime: new Date(),
        message: message,
      };
      oldData?.data?.push(newMessage);
      await this.writeFileJson(oldData, this.PATH_LOG_ERROR);
    }

    const kioskOldData = await this.readFileJsonInfo(
      this.PATH_KIOSK_INFO || './public/kiosk_info.json',
    );
    kioskOldData.statusSystem = +status;
    await this.writeFileJson(kioskOldData, this.PATH_KIOSK_INFO);

    return true;
  }

  getInsearchData = (keyData: any) => {
    const insertData = keyData.reduce((result, data) => {
      if (data.action === 'create' || data.action === 'update') {
        delete data.action;
        result = [...result, data];
      }
      return result;
    }, []);

    const deleteData = keyData.reduce((result, data) => {
      if (data.action === 'delete') {
        result.push(data?.id);
      }
      return result;
    }, []);

    return [insertData, deleteData];
  };

  async clearDatabase() {
    const queryRunner = this.DataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query('DELETE FROM poi_tags');
      await queryRunner.query('DELETE FROM menu_categories');
      await queryRunner.query('DELETE FROM event_poi');
      await queryRunner.query('DELETE FROM tags');
      await queryRunner.query('DELETE FROM menus');
      await queryRunner.query('DELETE FROM pois');
      await queryRunner.query('DELETE FROM event');
      await queryRunner.query('DELETE FROM floors');
      await queryRunner.query('DELETE FROM screens');
      await queryRunner.query('DELETE FROM floors');
      await queryRunner.query('DELETE FROM categories');
      await queryRunner.query('DELETE FROM files');
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async readDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(files);
      });
    });
  }

  async checkKioskDataForRun() {
    const menus = await this.repositories['menus'].find();
    //get media files
    const mediaFiles: any = await this.readDirectory(this.PATH_MEDIA_FILE);
    const mapFiles: any = await this.readDirectory(this.PATH_MAP_FILE);
    const mapJsonFiles = mapFiles.filter(
      (file) => path.extname(file) === '.json',
    );
    return (
      menus.length === 0 ||
      mediaFiles?.length === 0 ||
      mapJsonFiles?.length === 0
    );
  }

  async readFileJsonInfo(path: string) {
    if (await fs.existsSync(path)) {
      try {
        return JSON.parse(<any>await this.readJsonFile(path));
      } catch (err) {
        this.logger.error('Error when parse error json. Error: ' + err.message);
        const positionError = err.message?.split(' ').pop();
        if (!isNaN(positionError)) {
          const dataFile = <string>await this.readJsonFile(path);
          const newDataFile = dataFile.slice(0, positionError);
          return JSON.parse(newDataFile);
        } else {
          return {};
        }
      }
    }
  }

  async writeFileJson(dataKiosk: any, path: string) {
    if (dataKiosk) {
      fs.writeFile(path, JSON.stringify(dataKiosk), (err) => {
        if (err) {
          this.logger.error(
            'Error when writing file kiosk info, error: ' + err.code,
          );
        }
      });
    }
  }

  async getKioskStatus() {
    const data = await this.readFileJsonInfo(
      this.PATH_KIOSK_INFO || './public/kiosk_info.json',
    );
    return {
      statusSystem: data?.statusSystem || 1,
      syncStatus: data?.syncStatus || 4,
    };
  }

  async syncServerData(headers: any, isFirst = 'false', eventSubject?: any) {
    //test sftp download
    // this.sftpService.download(
    //   '/home/qrhere/public/images/2D3D.png',
    //   'public/test/abc2222.png',
    // );

    this.getSyncStatusForAdmin(headers, 2);
    this.logger.info('syncServerData kiosk...' + isFirst);
    const queryRunner = this.DataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (eventSubject) {
        eventSubject.next({
          message: 'Received data from other server',
          status: RESYNC_STATUS.LOADING,
        });
      }

      if (isFirst === 'true') {
        await this.clearDatabase();
      }
      await this.createFolderIfNotExist(this.PATH_JSON_FILE);
      //const _kioskId = await computerName();
      const _kioskId = 'vina_office';
      const { url, floorId, coordinateX, coordinateY } =
        await this.getDataFromAdmin(headers, _kioskId, isFirst);
      const kioskInfo = await this.readFileJsonInfo(
        this.PATH_KIOSK_INFO || './public/kiosk_info.json',
      );
      const kioskFloorId = floorId || kioskInfo?.floorId;
      await this.logService.addCronJob(kioskFloorId);
      const fileName = url.replace(/^.*[\\\/]/, '');
      await this.downloadJsonFileFromLink(url, fileName, this.PATH_JSON_FILE);
      // const response = dataResponse;
      const pathFile = this.PATH_JSON_FILE + fileName;
      const dataJson = <any>await this.readJsonFile(pathFile);
      const response = JSON.parse(dataJson);
      // Parse and transform the data as needed
      const data = response?.data?.dbdata;
      const dataKiosk = response?.data?.kiosk;
      const dataBranch = response?.data?.branches;
      const contentFile = response?.content_files;
      const contentFilesUrl = response?.content_files_url;
      const contentThumbUrl = response?.thumb_files_url;
      // fs.writeFileSync('./data.json', JSON.stringify(obj) , 'utf-8');
      await this.writeFileJson(dataKiosk, this.PATH_KIOSK_INFO);

      if (data.pois) {
        const keyData = data.pois;
        const [insertData, deleteData] = this.getInsearchData(keyData);
        if (insertData.length > 0) {
          await this.repositories['pois'].save(insertData);
        }
        if (deleteData.length > 0) {
          const deletePois = await this.repositories['pois'].find({
            where: { id: In(deleteData) },
          });
          if (deletePois?.length) {
            await this.repositories['pois'].remove(deletePois);
          }
        }
      }

      if (data.menus) {
        const keyData = data.menus;
        const [insertData, deleteData] = this.getInsearchData(keyData);

        if (insertData.length > 0) {
          await this.repositories['menus'].save(insertData);
        }
        if (deleteData.length > 0) {
          const deleteMenus = await this.repositories['menus'].find({
            where: { id: In(deleteData) },
          });
          if (deleteMenus?.length > 0) {
            await this.repositories['menus'].remove(deleteMenus);
          }
        }
      }

      if (data.events) {
        const keyData = data.events;
        const [insertData, deleteData] = this.getInsearchData(keyData);
        if (insertData.length > 0) {
          const insertEvents = insertData.map((item) => {
            return {
              ...item,
              startDate: new Date(item.startDate),
              endDate: new Date(item.endDate),
              displayStartDate: new Date(item.displayStartDate),
              displayEndDate: new Date(item.displayEndDate),
            };
          });
          await this.repositories['events'].save(insertEvents);
        }
        if (deleteData.length > 0) {
          const deleteEvents = await this.repositories['events'].find({
            where: { id: In(deleteData) },
          });
          if (deleteEvents?.length) {
            await this.repositories['events'].remove(deleteEvents);
          }
        }
      }

      if (data.screens) {
        const keyData = data.screens;
        const insertData = keyData.reduce((result, data) => {
          if (
            (!data.floorId || data.floorId === floorId) &&
            (data.action === 'create' || data.action === 'update')
          ) {
            delete data.action;
            const action = {
              ...data,
              startDate: new Date(data.startDate),
              endDate: new Date(data.endDate),
            };
            result = [...result, action];
          }
          return result;
        }, []);

        const deleteData = keyData.reduce((result, data) => {
          if (
            (!data.floorId || data.floorId === floorId) &&
            data.action === 'delete'
          ) {
            delete data.action;
            result = [...result, data.id];
          }
          return result;
        }, []);

        if (insertData.length > 0) {
          await this.repositories['screens'].save(insertData);
        }
        if (deleteData.length > 0) {
          const deleteScreen = await this.repositories['screens'].find({
            where: { id: In(deleteData) },
          });
          if (deleteScreen?.length)
            await this.repositories['screens'].remove(deleteScreen);
        }
      }

      if (data.floors) {
        const keyData = data.floors;
        const [insertData, deleteData] = this.getInsearchData(keyData);
        if (insertData.length > 0) {
          await this.repositories['floors'].save(insertData);
        }
        if (deleteData.length > 0) {
          const deleteFloors = await this.repositories['floors'].find({
            where: { id: In(deleteData) },
          });
          if (deleteFloors?.length) {
            await this.repositories['floors'].remove(deleteFloors);
          }
        }
      }

      if (contentFile && contentFile.length > 0) {
        const insertData = contentFile.reduce((result, data) => {
          if (data.action === 'create' || data.action === 'update') {
            const a = {
              id: data?.id,
              type: data?.mime_type,
              name: data?.name,
              seqCode: data?.seqCode,
            };
            result = [...result, a];
          }
          return result;
        }, []);

        if (insertData?.length) {
          await this.repositories['files'].save(insertData);
        }

        const deleteData = contentFile.reduce((result, data) => {
          if (data.action === 'delete') {
            result.push(data?.seqCode);
          }
          return result;
        }, []);

        if (deleteData?.length) {
          const deleteScreen = await this.repositories['files'].find({
            where: { seqCode: In(deleteData) },
          });
          if (deleteScreen?.length) {
            await this.repositories['files'].remove(deleteScreen);

            deleteScreen.map((file) => {
              fs.unlinkSync(this.PATH_MEDIA_FILE + '/' + file?.name);
              if (
                fs.existsSync(this.PATH_MEDIA_THUMB_FILE + '/' + file?.name)
              ) {
                fs.unlinkSync(this.PATH_MEDIA_THUMB_FILE + '/' + file?.name);
              }
            });
          }
        }
      }

      if (dataKiosk?.mapUrl) {
        await this.unzipAndSave(
          process.env.SYNC_URL + '/' + dataKiosk?.mapUrl,
          './public/maps',
        );
      }

      if (contentFilesUrl) {
        await this.unzipAndSave(
          process.env.SYNC_URL + '/' + contentFilesUrl,
          this.PATH_MEDIA_FILE,
        );
      }

      if (contentThumbUrl) {
        await this.createFolderIfNotExist(this.PATH_MEDIA_THUMB_FILE);
        await this.unzipAndSave(
          process.env.SYNC_URL + '/' + contentThumbUrl,
          this.PATH_MEDIA_THUMB_FILE,
        );
      }

      await queryRunner.commitTransaction();

      const errorKioskData = await this.checkKioskDataForRun();
      this.getSyncStatusForAdmin(headers, 1);
      this.logger.info('Sync data successfully');
      if (eventSubject) {
        eventSubject.next({
          message: 'Received data from other server',
          status: RESYNC_STATUS.DONE,
          data: {
            dataKiosk: { ...dataKiosk, coordinateX, coordinateY, floorId },
            dataBranch: dataBranch,
          },
        });
      }
      return {
        dataKiosk: { ...dataKiosk, coordinateX, coordinateY, floorId },
        dataBranch: dataBranch,
        errorKioskData: errorKioskData,
      };
    } catch (error) {
      if (eventSubject) {
        eventSubject.next({
          message: 'Received data from other server',
          status: RESYNC_STATUS.DONE,
        });
      }
      const kioskInfo = await this.readFileJsonInfo(
        this.PATH_KIOSK_INFO || './public/kiosk_info.json',
      );
      const kioskFloorId = kioskInfo?.floorId || 'FL-7dV6I4tjO3219';
      await this.logService.addCronJob(kioskFloorId);
      await queryRunner.rollbackTransaction();
      this.getSyncStatusForAdmin(headers, 4);
      const errorKioskData = await this.checkKioskDataForRun();

      return {
        errorKioskData: errorKioskData,
        error: new HttpException(
          `Error when sync data, error: ${error}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      };
    }
  }

  async readLogKisokForAdmin() {
    if (await !fs.existsSync(this.PATH_LOG_ERROR)) {
      return new HttpException('File does not exist', HttpStatus.NOT_FOUND);
    }
    return await this.readJsonFile(this.PATH_LOG_ERROR);
  }

  async deleteLogSystemStatus() {
    if (await !fs.existsSync(this.PATH_LOG_ERROR)) {
      return new HttpException('File does not exist', HttpStatus.NOT_FOUND);
    }
    await fs.unlinkSync(this.PATH_LOG_ERROR);
    return 'Success';
  }

  // get status sync for Kiosk: 1 - normal, 2 - processing, 3 - use old data, 4 - failed
  async getSyncStatusForAdmin(headers: any, status: number) {
    const ipAddress = ip();
    const urlAdmin =
      process.env.SYNC_URL +
      this.SYNC_STATUS_API +
      '?ip=' +
      ipAddress +
      '&status=' +
      status;
    // send status sycn for admin and update sync status to file
    const dataKisok = await this.readFileJsonInfo(
      this.PATH_KIOSK_INFO || './public/kiosk_info.json',
    );
    if (dataKisok) {
      dataKisok.syncStatus = status;
    }
    await this.writeFileJson(dataKisok, this.PATH_KIOSK_INFO);
    try {
      const response = await this.httpService.axiosRef({
        url: urlAdmin,
        method: 'GET',
        headers,
      });
      return response.data;
    } catch (err) {
      this.logger.error(
        'Error when get sync status for Admin, err: ',
        err?.message,
      );
    }
  }

  async getDataFromAdmin(headers: any, kisokId: string, isFirst = 'false') {
    const ipAddress = ip();
    if (!kisokId) return;
    const urlAdmin =
      process.env.SYNC_URL +
      this.SYNC_API +
      '?kioskId=' +
      kisokId +
      '&isFirst=' +
      isFirst +
      '&ip=' +
      ipAddress;
    try {
      const response = await this.httpService.axiosRef({
        url: urlAdmin,
        method: 'GET',
        headers,
      });
      console.log('response.data', response.data);
      if (response) return response.data;
    } catch (err) {
      this.logger.error('Error when get data from Admin. Err: ', err.message);
    }
  }

  async downloadJsonFileFromLink(
    url: string,
    fileName: string,
    filePath: string,
  ) {
    if (!url) return;
    const urlAdmin = process.env.SYNC_URL + '/' + url;
    const jsonFile = await fs.createWriteStream(filePath + '/' + fileName);
    const response = await this.httpService.axiosRef({
      url: urlAdmin,
      method: 'GET',
      responseType: 'stream',
    });
    response.data.pipe(jsonFile);

    return await new Promise((resolve, reject) => {
      jsonFile.on('finish', resolve);
      jsonFile.on('error', reject);
    });
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

  async createFolderIfNotExist(path: string) {
    if (!fs.existsSync(path)) {
      await fs.mkdirSync(path);
    }
  }

  async unzipAndSave(
    zipFilePath: string,
    destinationFolder: string,
  ): Promise<void> {
    // Create the destination folder if it doesn't exist
    const body = await axios.get(zipFilePath, {
      responseType: 'arraybuffer',
    });

    const zip = new admZip(body.data);
    const zipEntries = await zip.getEntries();
    // and to extract it into current working directory
    zip.extractAllTo(destinationFolder, true);

    const extractedFiles = zip.getEntries().map((entry) => entry.entryName);
    return extractedFiles;
  }

  resetKiosk() {
    this.logger.info('Rebooting kiosk');
    reboot();
  }

  syncLogDataToServer(logSyncDto: any) {
    return `This action returns a # sync`;
  }

  syncDataCallFromServer() {
    return `This action returns a # sync`;
  }

  async delay(t) {
    return new Promise((resolve) => {
      setTimeout(resolve, t);
    });
  }

  startApp(processName) {
    exec(processName, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error while starting the process: ${error.message}`);
        return;
      }

      console.log(`Process "${processName}" started successfully.`);
    });
  }

  restartAppByProcessName = (processName) => {
    exec(`taskkill /F /IM ${processName}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error while terminating the process: ${error.message}`);
        return;
      }

      console.log(`Process "${processName}" terminated successfully.`);
      this.startApp(processName);
    });
  };
}
