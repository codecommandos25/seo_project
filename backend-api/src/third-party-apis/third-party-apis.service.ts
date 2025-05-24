import { HttpException, Injectable } from '@nestjs/common';
import { DomainAnalyticsDto } from './dto/domain_analytics.dto';
import { PageInsightsDto } from './dto/page_insights.dto';
import { RankedKeywordsDto } from './dto/ranked_keywords.dto';
import { LighthouseScoreDto } from './dto/lighthouse_score.dto';

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
      const competitors_domain =
        'https://sandbox.dataforseo.com/v3/dataforseo_labs/google/competitors_domain/live';

      return await this.api_request(competitors_domain, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_ranked_keywords(payload: RankedKeywordsDto[]) {
    try {
      const ranked_keywords =
        'https://sandbox.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live';

      return await this.api_request(ranked_keywords, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_domain_analytics(payload: DomainAnalyticsDto[]) {
    try {
      const domain_analytics =
        'https://sandbox.dataforseo.com/v3/domain_analytics/whois/overview/live';

      return await this.api_request(domain_analytics, {
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

      const pageInsights = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`;
      return this.api_request(pageInsights, { method: 'GET' });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_lighthouse_score(payload: LighthouseScoreDto[]) {
    try {
      console.log(payload);

      const lighthouse_score = `https://sandbox.dataforseo.com/v3/on_page/lighthouse/live/json`;
      return await this.api_request(lighthouse_score, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
