import { Module } from '@nestjs/common';
import { YoutubeApisService } from './youtube-apis.service';
import { YoutubeApisController } from './youtube-apis.controller';

@Module({
  controllers: [YoutubeApisController],
  providers: [YoutubeApisService],
})
export class YoutubeApisModule {}
