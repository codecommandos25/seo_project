import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { MetaApisService } from './meta-apis.service';
import { MetaAccessTokenDto } from './dto/meta-facebook-accessToken.dto';
import { MetaFacebookPageDto } from './dto/meta-facebook-overview.dto';
import { MetaFacebookPagePostsDto } from './dto/facebook-page-posts.dto';
import { MetaFacebookInsightsDto } from './dto/facebook-page-insights.dto';
import { MetaFacebookCountryDistributionDto } from './dto/facebook-country-distribution.dto';

@ApiTags('Meta Apis')
@Controller('meta-apis')
export class MetaApisController {
  constructor(private readonly metaApisService: MetaApisService) {}

  @Get('get-page-access-token')
  async getFacebookPageAccessToken(
    @Query() params: MetaAccessTokenDto,
  ): Promise<any> {
    return await this.metaApisService.getPageAccessToken(params);
  }
  @Get('get-facebook-page-overview')
  async getPageOverView(@Query() params: MetaFacebookPageDto): Promise<any> {
    return await this.metaApisService.getFaceBookPageOverview(params);
  }

  @Get('get-facebook-page-posts')
  async getFacebookPageAllPosts(
    @Query() params: MetaFacebookPagePostsDto,
  ): Promise<any> {
    return await this.metaApisService.getFaceBookPagePosts(params);
  }
  @Get('get-facebook-page-insights')
  async getFacebookPageInsights(
    @Query() params: MetaFacebookInsightsDto,
  ): Promise<any> {
    return await this.metaApisService.getFacebookPageInsights(params);
  }

  @Get('get-country-distrubution-graph-data')
  async countryDistributionGraph(
    @Query() params: MetaFacebookCountryDistributionDto,
  ): Promise<any> {
    return await this.metaApisService.countryDistributionGraph(params);
  }
  @Get('get-top-posts')
  async getTopPosts(
    @Query() params: MetaFacebookCountryDistributionDto,
  ): Promise<any> {
    return await this.metaApisService.getTopPosts(params);
  }
}
