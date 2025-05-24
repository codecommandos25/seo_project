import { HttpException, Injectable } from '@nestjs/common';
import { CompetitorsDomain } from './dto/competitors_domain.dto';
import { DomainAnalytics } from './dto/domain_analytics.dto';
import { RankedKeywords } from './dto/ranked_keywords.dto';

@Injectable()
export class ThirdPartyApisService {
  competitors_domain =
    'https://sandbox.dataforseo.com/v3/dataforseo_labs/google/competitors_domain/live';

  ranked_keywords =
    'https://sandbox.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live';

  domain_analytics =
    'https://sandbox.dataforseo.com/v3/domain_analytics/whois/overview/live';

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

  async get_competitors_domain(payload: CompetitorsDomain[]) {
    try {
      return await this.api_request(this.competitors_domain, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_ranked_keywords(payload: RankedKeywords[]) {
    try {
      return await this.api_request(this.ranked_keywords, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_domain_analytics(payload: DomainAnalytics[]) {
    try {
      return await this.api_request(this.domain_analytics, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_page_insights(url: string) {
    try {
      const params = new URLSearchParams({
        url: url,
        key: process.env.API_KEY,
        category: 'PERFORMANCE',
      });

      const pageInsights = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`;
      return this.api_request(pageInsights, { method: 'GET' });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
