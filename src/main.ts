import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from './common/logger/logger';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { configureSwagger } from './common/config/swagger-config';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: false,
  });
  const config = app.get(ConfigService);
  app.useGlobalInterceptors(new LoggingInterceptor(new Logger()));
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  configureSwagger(app, config);
  await app.listen(8080);
}
bootstrap();
