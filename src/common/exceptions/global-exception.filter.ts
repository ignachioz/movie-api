import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('EXCEPTION: ', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception && exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || 'INTERNAL SERVER ERROR';
    response.status(status).json({
      status,
      message,
    });
  }
}
