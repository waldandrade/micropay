import logger from "@/configs/logger";
import { Readable } from "stream";

export default class MockSFTPClient {
  config: any;

  async connect(config: any): Promise<void> {
    this.config = config;
    logger.info('SFTP connected');
  }

  async put(src: Readable, remoteLocation: string): Promise<void> {
    if (!this.config) {
      logger.error(`Cannot deliver data`, new Error('Cannot deliver data'));
      return;
    }
    logger.info(`Data was devlivered to ${remoteLocation}`);
  }
  
  async get(remoteSource: string): Promise<string> {
    if (!this.config) {
      logger.error(`Cannot receive data`, new Error('Cannot receive data'));
      return;
    }
    logger.info(`Data was received from ${remoteSource}`);
    return "DATA";
  }

  async end(): Promise<void> {
    this.config = undefined;
  }

}