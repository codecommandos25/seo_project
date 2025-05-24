import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CompetitorsDomainDto } from './dto/competitors_domain.dto';
import { DomainAnalyticsDto } from './dto/domain_analytics.dto';
import { LighthouseScoreDto } from './dto/lighthouse_score.dto';
import { PageInsightsDto } from './dto/page_insights.dto';
import { RankedKeywordsDto } from './dto/ranked_keywords.dto';
import { TrafficGraphDto } from './dto/traffic_by_time.dto';
import { TrafficByTimeDto } from './dto/traffic_data_graph.dto';
import { CompetitorsDomainResponse } from './models/competitors_domain.response';
import { DomainAnalyticsResponse } from './models/domain_analytics.response';
import { LighthouseScoreResponse } from './models/lighthouse_score.response';
import { PageInsightsCustomResponse } from './models/page_insights.response';
import { RankedKeywordsResponse } from './models/ranked_keywords.response';
import { TrafficByTimeResponse } from './models/traffic_by_time.response';
import { TrafficGraphResponse } from './models/traffic_by_time.response copy';
import { ThirdPartyApisService } from './third-party-apis.service';

@ApiTags('Third Party Apis')
@Controller('third-party-apis')
export class ThirdPartyApisController {
  constructor(private readonly thirdPartyApisService: ThirdPartyApisService) {}

  @Post('competitors_domain')
  @ApiBody({ type: [CompetitorsDomainDto] })
  async get_competitors_domain(
    @Body() payload: CompetitorsDomainDto[],
  ): Promise<CompetitorsDomainResponse> {
    return await this.thirdPartyApisService.get_competitors_domain(payload);
  }

  @Post('ranked_keywords')
  @ApiBody({ type: [RankedKeywordsDto] })
  async get_ranked_keywords(
    @Body() payload: RankedKeywordsDto[],
  ): Promise<RankedKeywordsResponse> {
    return await this.thirdPartyApisService.get_ranked_keywords(payload);
  }

  @Post('domain_analytics')
  @ApiBody({ type: [DomainAnalyticsDto] })
  async get_domain_analytics(
    @Body() payload: DomainAnalyticsDto[],
  ): Promise<DomainAnalyticsResponse> {
    return await this.thirdPartyApisService.get_domain_analytics(payload);
  }

  @Get('page_insights')
  async get_page_insights(
    @Query() params: PageInsightsDto,
  ): Promise<PageInsightsCustomResponse> {
    return await this.thirdPartyApisService.get_page_insights(params);
  }

  @Post('lighthouse_score')
  @ApiBody({ type: [LighthouseScoreDto] })
  async get_lighthouse_score(
    @Body() payload: LighthouseScoreDto[],
  ): Promise<LighthouseScoreResponse> {
    return await this.thirdPartyApisService.get_lighthouse_score(payload);
  }

  @Post('traffic_by_time')
  @ApiBody({ type: [TrafficByTimeDto] })
  async get_traffic_by_time(
    @Body() payload: TrafficByTimeDto[],
  ): Promise<TrafficByTimeResponse> {
    return await this.thirdPartyApisService.get_traffic_by_time(payload);
  }

  @Post('traffic_data_graph')
  @ApiBody({ type: [TrafficGraphDto] })
  async get_traffic_data_graph(
    @Body() payload: TrafficGraphDto[],
  ): Promise<TrafficGraphResponse> {
    return await this.thirdPartyApisService.get_traffic_data_graph(payload);
  }
}
