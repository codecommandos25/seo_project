import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompetitorsDomain } from './dto/competitors_domain.dto';
import { DomainAnalytics } from './dto/domain_analytics.dto';
import { RankedKeywords } from './dto/ranked_keywords.dto';
import { CompetitorsDomainResponse } from './models/competitors_domain.response';
import { RankedKeywordsResponse } from './models/ranked_keywords.response';
import { DomainAnalyticsResponse } from './models/domain_analytics.response';
import { ThirdPartyApisService } from './third-party-apis.service';
import { PageInsightsResponse } from './models/page_insights.response';

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

  @Post('domain_analytics')
  async get_domain_analytics(
    @Body() payload: DomainAnalytics[],
  ): Promise<DomainAnalyticsResponse> {
    return await this.thirdPartyApisService.get_domain_analytics(payload);
  }

  @Get('page_insights')
  async get_page_insights(
    @Query() params: { url: string },
  ): Promise<PageInsightsResponse> {
    return await this.thirdPartyApisService.get_page_insights(params.url);
  }
}
