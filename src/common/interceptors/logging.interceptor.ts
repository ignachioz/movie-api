import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Logger } from '../logger/logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, body, headers } = request;
    this.logger.log(
      `REQUEST: HEADERS: ${JSON.stringify(headers)} - ${method}: ${url} - BODY: ${JSON.stringify(body)}`,
    );
    return next.handle().pipe(
      tap((data) => {
        const timeResponse = Date.now() - now;
        this.logger.log(
          `RESPONSE: ${response.statusCode} TIME:${timeResponse}ms BODY: ${JSON.stringify(data)}`,
        );
      }),
    );
  }
}
