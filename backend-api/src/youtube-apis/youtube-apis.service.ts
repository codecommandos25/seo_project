import { HttpException, Injectable } from '@nestjs/common';
import {
  YoutubeVideoInsightDto,
  SubscriberGrowthGraphDto,
} from './dto/insight-youtube-api.dto';
import * as moment from 'moment';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable()
export class YoutubeApisService {
  async getYoutubeInsight(payload: YoutubeVideoInsightDto) {
    try {
      const headers = {
        Authorization: `Bearer ${payload.accessToken}`,
      };

      // // 1️⃣ Get Channel ID & Stats (Subscribers + Total Views)
      // const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&mine=true`;
      // const channelResponse = await fetch(channelUrl, {
      //   method: 'GET',
      //   headers,
      // });
      // const channelData = await channelResponse.json();

      // if (!channelData.items || channelData.items.length === 0) {
      //   throw new Error('Token Expired');
      // }

      // const channelId = channelData.items[0].id;
      // const subscribers = parseInt(
      //   channelData.items[0].statistics.subscriberCount,
      //   10,
      // );
      // const totalViews = parseInt(
      //   channelData.items[0].statistics.viewCount,
      //   10,
      // );

      let enddate = moment().format('YYYY-MM-DD');

      let startDate = moment()
        .subtract(parseInt(payload.days), 'days')
        .format('YYYY-MM-DD');

      const analyticsUrl = `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==${payload.channelId}&startDate=${startDate}&endDate=${enddate}&metrics=views,estimatedMinutesWatched,subscribersGained,subscribersLost`;

      const analyticsResponse = await fetch(analyticsUrl, {
        method: 'GET',
        headers,
      });
      const analyticsData = await analyticsResponse.json();
      let estimatedMinutesWatched = 0;
      let subscribersGained = 0;
      let subscribersLost = 0;
      let totalViews = 0;
      if (analyticsData.rows && analyticsData.rows.length > 0) {
        [
          totalViews,
          estimatedMinutesWatched,
          subscribersGained,
          subscribersLost,
        ] = analyticsData.rows[0];
      }
      return {
        subscribersGained,
        totalViews,
        estimatedMinutesWatched,
        subscribersLost,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getSubscriberGrowthGraph(payload: SubscriberGrowthGraphDto) {
    try {
      const headers = {
        Authorization: `Bearer ${payload.accessToken}`,
      };
      let startdate = moment()
        .subtract(parseInt(payload.days), 'days')
        .format('YYYY-MM-DD');
      let enddate = moment().format('YYYY-MM-DD');

      const analyticsUrl =
        `https://youtubeanalytics.googleapis.com/v2/reports` +
        `?ids=channel==${payload.channelId}` +
        `&startDate=${startdate}` +
        `&endDate=${enddate}` +
        `&metrics=subscribersGained` +
        `&dimensions=day` +
        `&sort=day`;

      const response = await fetch(analyticsUrl, { headers, method: 'GET' });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching YouTube daily subscriber gains:', error);
      throw new HttpException(error.message, 500);
    }
  }
  async getAudienceDemographics(payload: SubscriberGrowthGraphDto) {
    try {
      const headers = {
        Authorization: `Bearer ${payload.accessToken}`,
      };
      let startdate = moment()
        .subtract(parseInt(payload.days), 'days')
        .format('YYYY-MM-DD');
      let enddate = moment().format('YYYY-MM-DD');

      const analyticsUrl =
        `https://youtubeanalytics.googleapis.com/v2/reports` +
        `?ids=channel==${payload.channelId}` +
        `&startDate=${startdate}` +
        `&endDate=${enddate}` +
        `&metrics=viewerPercentage&dimensions=ageGroup&sort=-viewerPercentage`;

      const response = await fetch(analyticsUrl, { headers, method: 'GET' });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getTopPerformingVideos(payload: SubscriberGrowthGraphDto) {
    try {
      const headers = { Authorization: `Bearer ${payload.accessToken}` };

      const startdate = moment()
        .subtract(parseInt(payload.days), 'days')
        .format('YYYY-MM-DD');
      const enddate = moment().format('YYYY-MM-DD');

      // Step 1: Fetch top videos from YouTube Analytics
      const analyticsUrl =
        `https://youtubeanalytics.googleapis.com/v2/reports` +
        `?ids=channel==${payload.channelId}` +
        `&startDate=${startdate}` +
        `&endDate=${enddate}` +
        `&dimensions=video` +
        `&metrics=views,estimatedMinutesWatched` +
        `&maxResults=10` +
        `&sort=-views`;

      const analyticsRes = await fetch(analyticsUrl, { headers });
      const analyticsData = await analyticsRes.json();

      if (!analyticsData.rows || analyticsData.rows.length === 0) {
        throw new HttpException('No data found', 500);
      }

      // Step 2: Take top 5 video IDs
      const topVideos = analyticsData.rows.slice(0, 5);
      const topVideoIds = topVideos.map((row: any[]) => row[0]);

      // Step 3: Fetch video details in parallel
      const detailsUrl =
        `https://www.googleapis.com/youtube/v3/videos` +
        `?part=snippet,statistics` +
        `&id=${topVideoIds.join(',')}`;

      const [detailsData] = await Promise.all([
        fetch(detailsUrl, { headers }).then((res) => res.json()),
      ]);

      // Step 4: Map results directly
      return topVideos.map(([videoId, views]) => {
        const detail =
          detailsData.items.find((v: any) => v.id === videoId) || {};
        return {
          title: detail?.snippet?.title || '',
          views: views || 0,
          thumbnail: detail?.snippet?.thumbnails?.high?.url || '',
          publishedAt: detail?.snippet?.publishedAt || '',
        };
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getViewGrowthGraph(payload: SubscriberGrowthGraphDto) {
    try {
      const headers = { Authorization: `Bearer ${payload.accessToken}` };

      const startdate = moment()
        .subtract(parseInt(payload.days), 'days')
        .format('YYYY-MM-DD');
      const enddate = moment().format('YYYY-MM-DD');

      // Step 1: Fetch top videos from YouTube Analytics
      const url =
        `https://youtubeanalytics.googleapis.com/v2/reports` +
        `?ids=channel==${payload.channelId}` +
        `&startDate=${startdate}` +
        `&endDate=${enddate}` +
        `&dimensions=video` +
        `&metrics=views&dimensions=day&sort=day`;

      const analyticsRes = await fetch(url, { headers });
      const viewdata = await analyticsRes.json();

      if (!viewdata.rows || viewdata.rows.length === 0) {
        throw new HttpException('No data found', 500);
      }
      return viewdata;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getImpressionCTRGraphData(payload: SubscriberGrowthGraphDto) {
    try {
      const headers = { Authorization: `Bearer ${payload.accessToken}` };

      const startdate = moment()
        .subtract(parseInt(payload.days), 'days')
        .format('YYYY-MM-DD');
      const enddate = moment().format('YYYY-MM-DD');

      // Step 1: Fetch top videos from YouTube Analytics
      const url =
        `https://youtubeanalytics.googleapis.com/v2/reports` +
        `?ids=channel==${payload.channelId}` +
        `&startDate=${startdate}` +
        `&endDate=${enddate}` +
        `&dimensions=video` +
        `&metrics=annotationClickThroughRate,annotationImpressions,&dimensions=day&sort=day`;

      const analyticsRes = await fetch(url, { headers });
      const data = await analyticsRes.json();

      if (!data.rows || data.rows.length === 0) {
        throw new HttpException('No data found', 500);
      }
      const url2 =
        `https://youtubeanalytics.googleapis.com/v2/reports` +
        `?ids=channel==${payload.channelId}` +
        `&startDate=${startdate}` +
        `&endDate=${enddate}` +
        `&metrics=averageViewDuration,subscribersGained,subscribersLost`;
      const responseData = await fetch(url2, { headers });
      let averageViewduration = await responseData.json();

      return {
        success: true,
        average: averageViewduration?.rows || [],
        graphData: data,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getAgeAndGenderGraphdata(payload: SubscriberGrowthGraphDto) {
    try {
      const headers = { Authorization: `Bearer ${payload.accessToken}` };

      const startdate = moment()
        .subtract(parseInt(payload.days), 'days')
        .format('YYYY-MM-DD');
      const enddate = moment().format('YYYY-MM-DD');

      // Step 1: Fetch top videos from YouTube Analytics
      const url =
        `https://youtubeanalytics.googleapis.com/v2/reports` +
        `?ids=channel==${payload.channelId}` +
        `&startDate=${startdate}` +
        `&endDate=${enddate}` +
        `&metrics=viewerPercentage&dimensions=ageGroup,gender`;

      const analyticsRes = await fetch(url, { headers });
      const data = await analyticsRes.json();

      return {
        success: true,
        graphData: data,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async countryWiseViewsGraphData(payload: SubscriberGrowthGraphDto) {
    try {
      const headers = { Authorization: `Bearer ${payload.accessToken}` };

      const startdate = moment()
        .subtract(parseInt(payload.days), 'days')
        .format('YYYY-MM-DD');
      const enddate = moment().format('YYYY-MM-DD');

      // Step 1: Fetch views by country
      const url =
        `https://youtubeanalytics.googleapis.com/v2/reports` +
        `?ids=channel==${payload.channelId}` +
        `&startDate=${startdate}` +
        `&endDate=${enddate}` +
        `&metrics=views&dimensions=country&sort=views`;

      const analyticsRes = await fetch(url, { headers });
      const data = await analyticsRes.json();

      // if (!data.rows || data.rows.length === 0) {
      //   throw new HttpException('No data found', 404);
      // }

      // Step 2: Calculate total views
      const totalViews = data.rows.reduce(
        (sum: number, row: any[]) => sum + row[1],
        0,
      );

      // Step 3: Map country stats with percentage
      let countryStats = data.rows.map(
        ([country, views]: [string, number]) => ({
          country,
          views,
          percentage: parseFloat(((views / totalViews) * 100).toFixed(2)),
        }),
      );

      // Step 4: Sort descending by views
      countryStats = countryStats.sort((a, b) => b.views - a.views);

      return {
        success: true,
        totalViews,
        countries: countryStats,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getAudienceAquisition(payload: SubscriberGrowthGraphDto) {
    try {
      const headers = { Authorization: `Bearer ${payload.accessToken}` };

      const startdate = moment()
        .subtract(parseInt(payload.days), 'days')
        .format('YYYY-MM-DD');
      const enddate = moment().format('YYYY-MM-DD');

      const url =
        `https://youtubeanalytics.googleapis.com/v2/reports` +
        `?ids=channel==${payload.channelId}` +
        `&startDate=${startdate}` +
        `&endDate=${enddate}` +
        `&metrics=views&dimensions=insightTrafficSourceType&sort=-views`;

      const res = await fetch(url, { headers });
      const data = await res.json();
      // if (!data.rows || data.rows.length === 0) {
      //   throw new HttpException('No data found', 404);
      // }
      return {
        success: true,
        data: data,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
