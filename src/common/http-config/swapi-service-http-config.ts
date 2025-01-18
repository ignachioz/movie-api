import {
  HttpModule,
  HttpModuleOptions,
  HttpModuleOptionsFactory,
} from '@nestjs/axios';
import { DynamicModule, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwapiServiceHttpConfig implements HttpModuleOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createHttpOptions(): Promise<HttpModuleOptions> | HttpModuleOptions {
    const options: HttpModuleOptions = {
      baseURL: this.config.get('API_SWAPI_URL'),
      timeout: this.config.get('API_SWAPI_TIMEOUT'),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    return options;
  }

  public static register(): DynamicModule {
    return HttpModule.registerAsync({
      useClass: SwapiServiceHttpConfig,
    });
  }
}
