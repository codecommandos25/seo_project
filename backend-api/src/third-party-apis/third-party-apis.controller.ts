import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompetitorsDomainResponse } from './models/competitors_domain.response';
import { DomainAnalyticsResponse } from './models/domain_analytics.response';
import { PageInsightsResponse } from './models/page_insights.response';
import { RankedKeywordsResponse } from './models/ranked_keywords.response';
import { ThirdPartyApisService } from './third-party-apis.service';
import { CompetitorsDomainListDto } from './dto/competitors_domain.dto';
import { RankedKeywordsListDto } from './dto/ranked_keywords.dto';
import { DomainAnalyticsListDto } from './dto/domain_analytics.dto';
import { PageInsightsDto } from './dto/page_insights.dto';

@ApiTags('Third Party Apis')
@Controller('third-party-apis')
export class ThirdPartyApisController {
  constructor(private readonly thirdPartyApisService: ThirdPartyApisService) {}

  @Post('competitors_domain')
  async get_competitors_domain(
    @Body() payload: CompetitorsDomainListDto,
  ): Promise<CompetitorsDomainResponse> {
    return await this.thirdPartyApisService.get_competitors_domain(payload);
  }

  @Post('ranked_keywords')
  async get_ranked_keywords(
    @Body() payload: RankedKeywordsListDto,
  ): Promise<RankedKeywordsResponse> {
    return await this.thirdPartyApisService.get_ranked_keywords(payload);
  }

  @Post('domain_analytics')
  async get_domain_analytics(
    @Body() payload: DomainAnalyticsListDto,
  ): Promise<DomainAnalyticsResponse> {
    return await this.thirdPartyApisService.get_domain_analytics(payload);
  }

  @Get('page_insights')
  async get_page_insights(
    @Query() params: PageInsightsDto,
  ): Promise<PageInsightsResponse> {
    return await this.thirdPartyApisService.get_page_insights(params);
  }
}
