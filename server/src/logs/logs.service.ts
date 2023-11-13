import { Injectable } from '@nestjs/common';
import { Log } from './interfaces/log.interface';

@Injectable()
export class LogsService {
  private logs: Log[] = [];

  findAll() {
    return this.logs;
  }

  create(log: Log) {
    this.logs.unshift(log);
    return log;
  }
}
