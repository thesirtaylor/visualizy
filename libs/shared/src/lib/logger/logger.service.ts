import { Injectable, Scope, LoggerService, Logger } from '@nestjs/common';
import { sprintf } from 'sprintf-js';

export enum LogLevel {
  DEBUG = 'debug',
  WARN = 'warn',
  LOG = 'log',
  ERROR = 'error',
}

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService implements LoggerService {
  private readonly logger: LoggerService;
  private context!: string;

  constructor() {
    this.logger = new Logger();
  }

  printf<T extends Array<any>>(format: string, ...args: T) {
    this.logger.log(sprintf(format, ...args), this.context);
  }
  log(message: any, context: string = this.context) {
    this.logger.log(message, context);
    return this;
  }
  error(message: any, context: string = this.context) {
    this.logger.error(message, context);
    return this;
  }
  warn(message: any, context: string = this.context) {
    this.logger.warn(message, context);
    return this;
  }
  debug(message: any, ...param: any[]) {
    this.logger.debug?.(message, ...param);
    return this;
  }
  setContext(context: string) {
    this.context = context;
    return this;
  }
}
