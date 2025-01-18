import {
  Injectable,
  LoggerService,
  LogLevel,
  ConsoleLogger,
} from '@nestjs/common';

@Injectable()
export class Logger extends ConsoleLogger implements LoggerService {
  constructor(context?: string) {
    super();
    this.setLogLevels(['warn', 'error', 'debug']);
    this.setContext(context);
  }

  log(message: string) {
    super.log(message);
  }

  error(message: string) {
    super.error(message);
  }

  warn(message: string) {
    super.warn(message);
  }

  debug(message: string) {
    super.debug(message);
  }

  verbose(message: string) {
    super.verbose(message);
  }
}
