import { Module } from '@nestjs/common';
import { UserModule } from './users/infrastructure/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/exceptions/global-exception.filter';
import { MovieModule } from './movies/movie.module';
import { JwtModule } from '@nestjs/jwt';
import { BadRequestExceptionFilter } from './common/exceptions/bad-request-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { Logger } from './common/logger/logger';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('BD_HOST')}:${configService.get('BD_PORT')}/${configService.get('BD_NAME')}`,
      }),
      inject: [ConfigService],
    }),
    JwtModule,
    UserModule,
    MovieModule,
  ],
  controllers: [],
  providers: [
    Logger,
    LoggingInterceptor,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
  ],
})
export class AppModule {}
