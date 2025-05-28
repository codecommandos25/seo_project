import { HttpException, Injectable } from '@nestjs/common';
import { BacklinksAnchorsDto } from './dto/backlinks_anchors.dto';
import { BacklinksDomainsDto } from './dto/backlinks_domains.dto';
import { CompetitorsDomainDto } from './dto/competitors_domain.dto';
import { CompetitorsDomainTrafficKeywordOverlapDto } from './dto/competitors_domain_traffic_keyword.dto';
import { DomainAnalyticsDto } from './dto/domain_analytics.dto';
import { GetBacklinkAllDomainsDto } from './dto/get_backlink_all_domains.dto';
import { GetBulkReferingDomainDto } from './dto/get_bulk_refering_domain.dto';
import { GetDomainAuthorityScoreDto } from './dto/get_domain_authority_score.dto';
import { PageInsightsDto } from './dto/page_insights.dto';
import { RankedKeywordsDto } from './dto/ranked_keywords.dto';
import { TrafficGraphDto } from './dto/traffic_by_time.dto';
import { CompetitorsDomainTrafficKeywordResponse } from './models/competetors_domain_traffic_keyword_overlap.response';
import { BacklinkAllDomainsResponse } from './models/get_backlink_all_domains.response';
import { BulkReferingDomainResponse } from './models/get_bulk_refering_domain.response';
import { DomainAuthorityScoreResponse } from './models/get_domain_authority_score.response';
import { PageInsightsResponse } from './models/page_insights.response';
import { GetCompetitorsWebsiteDto } from './dto/get_compititors_website.dto';
import { CompititorsWebsiteResponse } from './models/get_compititors_website.response';

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

  async get_all_competetors_domain_traffic_keyword_overlap(
    payload: CompetitorsDomainTrafficKeywordOverlapDto[],
  ): Promise<CompetitorsDomainTrafficKeywordResponse> {
    try {
      const url = `https://sandbox.dataforseo.com/v3/dataforseo_labs/google/competitors_domain/live`;
      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_backlink_all_domains(
    payload: GetBacklinkAllDomainsDto[],
  ): Promise<BacklinkAllDomainsResponse> {
    try {
      const url = `https://sandbox.dataforseo.com/v3/backlinks/bulk_backlinks/live`;
      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_bulk_refering_domain(
    payload: GetBulkReferingDomainDto[],
  ): Promise<BulkReferingDomainResponse> {
    try {
      const url = `https://sandbox.dataforseo.com/v3/backlinks/bulk_referring_domains/live`;
      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_domain_authority_score(
    payload: GetDomainAuthorityScoreDto[],
  ): Promise<DomainAuthorityScoreResponse> {
    try {
      const url = `https://sandbox.dataforseo.com/v3/backlinks/bulk_ranks/live`;
      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_compititors_website(
    payload: GetCompetitorsWebsiteDto,
  ): Promise<CompititorsWebsiteResponse[]> {
    try {
      const all_competetors =
        await this.get_all_competetors_domain_traffic_keyword_overlap([
          {
            target: payload.domain, //'newmouth.com',
            language_name: 'English',
            location_code: 2840,
            limit: 10,
          },
        ]);

      const domains: {
        domain: string;
        intersections: number;
        etv: number;
        backlinks?: number;
        referring_domains?: number;
        domain_authority?: number;
      }[] = [];

      for (const task of all_competetors.tasks) {
        for (const rs of task.result) {
          for (const item of rs.items) {
            domains.push({
              domain: item.domain,
              intersections: item.intersections,
              etv: item.competitor_metrics.organic.etv,
            });
          }
        }
      }

      const backlink_all = await this.get_backlink_all_domains([
        { targets: domains.map((d) => d.domain) },
      ]);

      let i = 0;
      for (const task of backlink_all.tasks) {
        for (const rs of task.result) {
          for (const item of rs.items) {
            const idx = domains.findIndex((d) =>
              item.target.includes(d.domain),
            );
            if (idx >= 0) {
              domains[idx].backlinks = item.backlinks;
            } else {
              domains[i].backlinks = item.backlinks;
            }
            i++;
          }
        }
      }

      const bulk_refering_domain = await this.get_bulk_refering_domain([
        { targets: domains.map((d) => d.domain) },
      ]);

      i = 0;
      for (const task of bulk_refering_domain.tasks) {
        for (const rs of task.result) {
          for (const item of rs.items) {
            const idx = domains.findIndex((d) =>
              item.target.includes(d.domain),
            );
            if (idx >= 0) {
              domains[idx].referring_domains = item.referring_domains;
            } else {
              domains[i].referring_domains = item.referring_domains;
            }
            i++;
          }
        }
      }

      const domain_authority_score = await this.get_domain_authority_score([
        { targets: domains.map((d) => d.domain) },
      ]);

      i = 0;
      for (const task of domain_authority_score.tasks) {
        for (const rs of task.result) {
          for (const item of rs.items) {
            const idx = domains.findIndex((d) =>
              item.target.includes(d.domain),
            );
            if (idx >= 0) {
              domains[idx].domain_authority = item.rank;
            } else {
              domains[i].domain_authority = item.rank;
            }
            i++;
          }
        }
      }

      return domains;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }
}
