import { Module } from '@nestjs/common';
import { ThirdPartyApisService } from './third-party-apis.service';
import { ThirdPartyApisController } from './third-party-apis.controller';

@Module({
  controllers: [ThirdPartyApisController],
  providers: [ThirdPartyApisService],
})
export class ThirdPartyApisModule {}
