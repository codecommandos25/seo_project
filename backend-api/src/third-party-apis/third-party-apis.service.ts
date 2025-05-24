import { HttpException, Injectable } from '@nestjs/common';
import { DomainAnalyticsDto } from './dto/domain_analytics.dto';
import { LighthouseScoreDto } from './dto/lighthouse_score.dto';
import { PageInsightsDto } from './dto/page_insights.dto';
import { RankedKeywordsDto } from './dto/ranked_keywords.dto';
import { TrafficGraphDto } from './dto/traffic_by_time.dto';
import { TrafficByTimeDto } from './dto/traffic_data_graph.dto';

@Injectable()
export class ThirdPartyApisService {
  private async api_request(url: string, options?: RequestInit) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.USERNAME}:${process.env.PASSWORD}`,
          ).toString('base64'),
      },
      ...options,
    });
    return await response.json();
  }

  async get_competitors_domain(payload: DomainAnalyticsDto[]) {
    try {
      const url =
        'https://sandbox.dataforseo.com/v3/dataforseo_labs/google/competitors_domain/live';

      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_ranked_keywords(payload: RankedKeywordsDto[]) {
    try {
      const url =
        'https://sandbox.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live';

      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_domain_analytics(payload: DomainAnalyticsDto[]) {
    try {
      const url =
        'https://sandbox.dataforseo.com/v3/domain_analytics/whois/overview/live';

      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_page_insights(payload: PageInsightsDto) {
    try {
      const params = new URLSearchParams({
        url: payload.url,
        key: process.env.API_KEY,
        category: 'PERFORMANCE',
      });

      const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`;
      return this.api_request(url, { method: 'GET' });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_lighthouse_score(payload: LighthouseScoreDto[]) {
    try {
      const url = `https://sandbox.dataforseo.com/v3/on_page/lighthouse/live/json`;
      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_traffic_by_time(payload: TrafficByTimeDto[]) {
    try {
      const url = `https://sandbox.dataforseo.com/v3/traffic_analytics/overview/live`;
      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_traffic_data_graph(payload: TrafficGraphDto[]) {
    try {
      console.log(payload);

      const url = `https://api.dataforseo.com/v3/dataforseo_labs/google/historical_bulk_traffic_estimation/live`;
      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
