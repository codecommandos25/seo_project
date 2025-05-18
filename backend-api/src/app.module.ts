import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThirdPartyApisModule } from './third-party-apis/third-party-apis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ThirdPartyApisModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
