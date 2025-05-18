import { Body, Controller, Post } from '@nestjs/common';
import { CompetitorsDomain } from './dto/competitors_domain.dto';
import { ThirdPartyApisService } from './third-party-apis.service';
import { RankedKeywords } from './dto/ranked_keywords.dto';
import { RankedKeywordsResponse } from './models/ranked_keywords.response';
import { CompetitorsDomainResponse } from './models/competitors_domain.response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Third Party Apis')
@Controller('third-party-apis')
export class ThirdPartyApisController {
  constructor(private readonly thirdPartyApisService: ThirdPartyApisService) {}

  @Post('competitors_domain')
  async get_competitors_domain(
    @Body() payload: CompetitorsDomain[],
  ): Promise<CompetitorsDomainResponse> {
    return await this.thirdPartyApisService.get_competitors_domain(payload);
  }

  @Post('ranked_keywords')
  async get_ranked_keywords(
    @Body() payload: RankedKeywords[],
  ): Promise<RankedKeywordsResponse> {
    return await this.thirdPartyApisService.get_ranked_keywords(payload);
  }
}
