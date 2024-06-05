import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { join } from 'path';
import { Logger } from 'winston';
const sftpClient = require('ssh2-sftp-client');

export class SftpService {
  private readonly sftpClient;
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this.sftpClient = new sftpClient();
  }

  async download(remotePath: string, localPathFile: string) {
    try {
      await this.sftpClient.connect({
        host: process.env.SFTP_HOST,
        port: process.env.SFTP_PORT,
        username: process.env.SFTP_USERNAME,
        password: process.env.SFTP_PASSWORD,
      });
    } catch (error: any) {
      this.logger.error('Error connect sftp ==' + error?.message);
    }

    try {
      const sftpRemotePath = process.env.SFTP_REMOTE_PATH || '';
      if (remotePath && localPathFile) {
        return await this.sftpClient.get(
          sftpRemotePath + remotePath,
          join(process.cwd(), localPathFile),
        );
      } else {
        this.logger.error(
          'Please check the sftp setting again: remotePath, localPathFile',
        );
      }
    } catch (error) {
      this.logger.error('Downloading failed:' + error?.message);
    } finally {
      await this.sftpClient.end(); // don't forget to close connection
    }
  }
}
