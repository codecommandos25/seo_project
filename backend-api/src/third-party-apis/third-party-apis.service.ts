import { HttpException, Injectable } from '@nestjs/common';
import { BacklinksAnchorsDto } from './dto/backlinks_anchors.dto';
import { BacklinksDomainsDto } from './dto/backlinks_domains.dto';
import { CompetitorsDomainDto } from './dto/competitors_domain.dto';
import { DomainAnalyticsDto } from './dto/domain_analytics.dto';
import { PageInsightsDto } from './dto/page_insights.dto';
import { RankedKeywordsDto } from './dto/ranked_keywords.dto';
import { TrafficGraphDto } from './dto/traffic_by_time.dto';
import { PageInsightsResponse } from './models/page_insights.response';

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

  async get_competitors_domain(payload: CompetitorsDomainDto[]) {
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
      const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(payload.url)}&key=${process.env.API_KEY}&category=PERFORMANCE&category=SEO`;
      const response: PageInsightsResponse = await this.api_request(url, {
        method: 'GET',
      });

      const { categories, audits } = response.lighthouseResult;

      const performanceScore = categories.performance.score * 100;
      const seoScore = categories.seo.score * 100;
      const speedIndex = audits['speed-index'].displayValue;
      const pageSize = audits['total-byte-weight'].displayValue;
      const lcp = audits['largest-contentful-paint'].displayValue;
      const tti = audits['interactive'].displayValue;
      const numberOfRequests = audits['network-requests'].details.items.length;
      const issues = [];

      for (const [key, audit] of Object.entries(audits)) {
        if (audit.score === 0) {
          issues.push({
            id: key,
            title: audit.title,
            description: audit.description,
            displayMode: audit.scoreDisplayMode,
          });
        }
      }

      return {
        performanceScore,
        speedIndex,
        pageSize,
        lcp,
        tti,
        numberOfRequests,
        issues,
        seoScore,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async get_traffic_data_graph(payload: TrafficGraphDto[]) {
    try {
      const url = `https://sandbox.dataforseo.com/v3/dataforseo_labs/google/historical_bulk_traffic_estimation/live`;
      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_backlinks_domains(payload: BacklinksDomainsDto[]) {
    try {
      const url = `https://sandbox.dataforseo.com/v3/backlinks/referring_domains/live`;
      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_backlinks_anchors(payload: BacklinksAnchorsDto[]) {
    try {
      const url = `https://sandbox.dataforseo.com/v3/backlinks/anchors/live`;
      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
