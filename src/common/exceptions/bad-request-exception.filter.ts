import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const bodyErrorReponse = exception.getResponse();
    if (
      bodyErrorReponse &&
      typeof bodyErrorReponse === 'object' &&
      'message' in bodyErrorReponse
    ) {
      const message = Array.isArray(bodyErrorReponse.message)
        ? bodyErrorReponse.message
        : [bodyErrorReponse.message];
      response.status(status).json({
        status,
        message,
      });
    } else {
      response.status(status).json({
        status,
        message: bodyErrorReponse,
      });
    }
  }
}
