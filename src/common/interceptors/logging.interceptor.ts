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
      `Request: headers: ${headers} ${method} - ${url} - body: ${body}`,
    );
    return next.handle().pipe(
      tap((data) => {
        const timeResponse = Date.now() - now;
        this.logger.log(
          `Response: ${response.statusCode} time:${timeResponse}ms body: ${data}`,
        );
      }),
    );
  }
}
