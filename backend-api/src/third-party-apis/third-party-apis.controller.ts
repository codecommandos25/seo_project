import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BacklinksAnchorsDto } from './dto/backlinks_anchors.dto';
import { BacklinksDomainsDto } from './dto/backlinks_domains.dto';
import { CompetitorsDomainDto } from './dto/competitors_domain.dto';
import { CompetitorsDomainTrafficKeywordOverlapDto } from './dto/competitors_domain_traffic_keyword.dto';
import { DomainAnalyticsDto } from './dto/domain_analytics.dto';
import { GetBacklinkAllDomainsDto } from './dto/get_backlink_all_domains.dto';
import { GetBulkReferingDomainDto } from './dto/get_bulk_refering_domain.dto';
import { GetCompetitorsWebsiteDto } from './dto/get_compititors_website.dto';
import { GetDomainAuthorityScoreDto } from './dto/get_domain_authority_score.dto';
import { PageInsightsDto } from './dto/page_insights.dto';
import { RankedKeywordsDto } from './dto/ranked_keywords.dto';
import { TrafficGraphDto } from './dto/traffic_by_time.dto';
import { BacklinksAnchorsResponse } from './models/backlinks_anchors.response';
import { CompetitorsDomainTrafficKeywordResponse } from './models/competetors_domain_traffic_keyword_overlap.response';
import { CompetitorsDomainResponse } from './models/competitors_domain.response';
import { DomainAnalyticsResponse } from './models/domain_analytics.response';
import { BacklinkAllDomainsResponse } from './models/get_backlink_all_domains.response';
import { BulkReferingDomainResponse } from './models/get_bulk_refering_domain.response';
import { CompititorsWebsiteResponse } from './models/get_compititors_website.response';
import { DomainAuthorityScoreResponse } from './models/get_domain_authority_score.response';
import { PageInsightsCustomResponse } from './models/page_insights.response';
import { RankedKeywordsResponse } from './models/ranked_keywords.response';
import { TrafficGraphResponse } from './models/traffic_by_time.response';
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

  @Post('traffic_data_graph')
  @ApiBody({ type: [TrafficGraphDto] })
  async get_traffic_data_graph(
    @Body() payload: TrafficGraphDto[],
  ): Promise<TrafficGraphResponse> {
    return await this.thirdPartyApisService.get_traffic_data_graph(payload);
  }

  @Post('get_backlinks_domains')
  @ApiBody({ type: [BacklinksDomainsDto] })
  async get_backlinks_domains(
    @Body() payload: BacklinksDomainsDto[],
  ): Promise<BacklinksDomainsDto> {
    return await this.thirdPartyApisService.get_backlinks_domains(payload);
  }

  @Post('get_backlinks_anchors')
  @ApiBody({ type: [BacklinksAnchorsDto] })
  async get_backlinks_anchors(
    @Body() payload: BacklinksAnchorsDto[],
  ): Promise<BacklinksAnchorsResponse> {
    return await this.thirdPartyApisService.get_backlinks_anchors(payload);
  }

  @Post('get_all_competetors_domain_traffic_keyword_overlap')
  @ApiBody({ type: [CompetitorsDomainTrafficKeywordOverlapDto] })
  async get_all_competetors_domain_traffic_keyword_overlap(
    @Body() payload: CompetitorsDomainTrafficKeywordOverlapDto[],
  ): Promise<CompetitorsDomainTrafficKeywordResponse> {
    return await this.thirdPartyApisService.get_all_competetors_domain_traffic_keyword_overlap(
      payload,
    );
  }

  @Post('get_backlink_all_domains')
  @ApiBody({ type: [GetBacklinkAllDomainsDto] })
  async get_backlink_all_domains(
    @Body() payload: GetBacklinkAllDomainsDto[],
  ): Promise<BacklinkAllDomainsResponse> {
    return await this.thirdPartyApisService.get_backlink_all_domains(payload);
  }

  @Post('get_bulk_refering_domain')
  @ApiBody({ type: [GetBulkReferingDomainDto] })
  async get_bulk_refering_domain(
    @Body() payload: GetBulkReferingDomainDto[],
  ): Promise<BulkReferingDomainResponse> {
    return await this.thirdPartyApisService.get_bulk_refering_domain(payload);
  }

  @Post('get_domain_authority_score')
  @ApiBody({ type: [GetDomainAuthorityScoreDto] })
  async get_domain_authority_score(
    @Body() payload: GetDomainAuthorityScoreDto[],
  ): Promise<DomainAuthorityScoreResponse> {
    return await this.thirdPartyApisService.get_domain_authority_score(payload);
  }

  @Post('get_compititors_website')
  async get_compititors_website(
    @Body() payload: GetCompetitorsWebsiteDto,
  ): Promise<CompititorsWebsiteResponse[]> {
    return await this.thirdPartyApisService.get_compititors_website(payload);
  }
}
