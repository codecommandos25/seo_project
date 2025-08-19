import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThirdPartyApisModule } from './third-party-apis/third-party-apis.module';
import { ConfigModule } from '@nestjs/config';
import { YoutubeApisModule } from './youtube-apis/youtube-apis.module';
import { MetaApisModule } from './meta-apis/meta-apis.module';

@Module({
  imports: [ThirdPartyApisModule, ConfigModule.forRoot(), YoutubeApisModule, MetaApisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
