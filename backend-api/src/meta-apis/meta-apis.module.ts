import { Module } from '@nestjs/common';
import { MetaApisService } from './meta-apis.service';
import { MetaApisController } from './meta-apis.controller';

@Module({
  controllers: [MetaApisController],
  providers: [MetaApisService],
})
export class MetaApisModule {}
