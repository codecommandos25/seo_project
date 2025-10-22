import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { YoutubeApisService } from './youtube-apis.service';
import {
  YoutubeVideoInsightDto,
  SubscriberGrowthGraphDto,
} from './dto/insight-youtube-api.dto';

@ApiTags('Youtube Apis')
@Controller('youtube-apis')
export class YoutubeApisController {
  constructor(private readonly youtubeApisService: YoutubeApisService) {}
  ///
  //get
  @Get('get-youtube-insights')
  async getYoutubeInsights(
    @Query() params: YoutubeVideoInsightDto,
  ): Promise<any> {
    return await this.youtubeApisService.getYoutubeInsight(params);
  }

  @Get('get-subscriber-growth-data')
  async getSubscriberGrowthData(
    @Query() params: SubscriberGrowthGraphDto,
  ): Promise<any> {
    return await this.youtubeApisService.getSubscriberGrowthGraph(params);
  }

  @Get('get-audience-demograph')
  async getAudienceDemoGraphData(
    @Query() params: SubscriberGrowthGraphDto,
  ): Promise<any> {
    return await this.youtubeApisService.getAudienceDemographics(params);
  }
  @Get('get-top-performing-video')
  async getTopperformingVideoData(
    @Query() params: SubscriberGrowthGraphDto,
  ): Promise<any> {
    return await this.youtubeApisService.getTopPerformingVideos(params);
  }

  @Get('get-view-graph-data')
  async getViewGraphdata(
    @Query() params: SubscriberGrowthGraphDto,
  ): Promise<any> {
    return await this.youtubeApisService.getViewGrowthGraph(params);
  }
  @Get('get-impression-graph-data')
  async gerImpressionCtrGraphData(
    @Query() params: SubscriberGrowthGraphDto,
  ): Promise<any> {
    return await this.youtubeApisService.getImpressionCTRGraphData(params);
  }
  @Get('get-age-gender-graph-data')
  async gerAgeGenderGraphData(
    @Query() params: SubscriberGrowthGraphDto,
  ): Promise<any> {
    return await this.youtubeApisService.getAgeAndGenderGraphdata(params);
  }
  @Get('get-contry-graph-data')
  async getCountryAudienceData(
    @Query() params: SubscriberGrowthGraphDto,
  ): Promise<any> {
    return await this.youtubeApisService.countryWiseViewsGraphData(params);
  }
  @Get('get-audience-aquisition-data')
  async getAudienceAquisitionData(
    @Query() params: SubscriberGrowthGraphDto,
  ): Promise<any> {
    return await this.youtubeApisService.getAudienceAquisition(params);
  }
}
