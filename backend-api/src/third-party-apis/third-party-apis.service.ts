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
import { RankedKeywordsResponse } from './models/ranked_keywords.response';
import { GetCrawledIdDto } from './dto/get_crawled_id.dto';
import { GetCrawledPageDataDto } from './dto/get_crawled_page_data.dto';
import { GetCrawledIdResponse } from './models/get_crawled_id.response';
import { GetCrawledPageDataResponse } from './models/get_crawled_page_data.response';
import { BacklinkDetailedDto } from './dto/backlink_detailed.dto';
import { BacklinkDetailedResponse } from './models/backlink_detailed.response';
import { WebsiteSpeedResponse } from './models/website_speed.response';
import { WebsiteSpeedDto } from './dto/website_speed.dto';

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

  async get_ranked_keywords_table(payload: RankedKeywordsDto[]) {
    try {
      const url =
        'https://sandbox.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live';

      const response: RankedKeywordsResponse = await this.api_request(url, {
        body: JSON.stringify(payload),
      });

      let data = [];

      response.tasks.map((task) => {
        task.result.map((result) => {
          data = [
            ...data,
            ...result.items.map((v) => ({
              keyword: v.keyword_data.keyword,
              main_intent: v.keyword_data.search_intent_info.main_intent,
              rank_absolute: v.ranked_serp_element.serp_item.rank_absolute,
              search_volume: v.keyword_data.keyword_info.search_volume,
              keyword_difficulty:
                v.keyword_data.keyword_properties.keyword_difficulty,
              etv: v.ranked_serp_element.serp_item.etv,
              cpc: v.keyword_data.keyword_info.cpc,
              url: v.ranked_serp_element.serp_item.url,
              last_updated_time: v.keyword_data.keyword_info.last_updated_time,
            })),
          ];
        });
      });

      return data;
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

  async get_crawled_id(
    payload: GetCrawledIdDto[],
  ): Promise<GetCrawledIdResponse> {
    try {
      const url = `https://sandbox.dataforseo.com/v3/on_page/task_post`;
      // Add a timeout of 6000 ms to the fetch request
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      try {
        return await this.api_request(url, {
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async get_crawled_page_data(
    payload: GetCrawledPageDataDto[],
  ): Promise<GetCrawledPageDataResponse> {
    try {
      const url = `https://sandbox.dataforseo.com/v3/on_page/pages`;
      return await this.api_request(url, {
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async get_crawled_page_data_table(payload: {
    target: string;
    limit: number;
    offset: number;
  }) {
    try {
      // Add a timeout of 10000 ms to the get_crawled_id request
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      let tasks;
      try {
        const result = await this.get_crawled_id([
          {
            max_crawl_pages: 6,
            target: payload.target,
          },
        ]);
        tasks = result.tasks;
      } finally {
        clearTimeout(timeout);
      }

      const crawl_id = tasks.at(0).id;

      const response = await this.get_crawled_page_data([
        {
          id: crawl_id,
          filters: [
            ['resource_type', '=', 'html'],
            'and',
            ['meta.description', 'like', '%OnPage%'],
          ],
          limit: payload.limit || 10,
          offset: payload.offset || 0,
        },
      ]);

      let data = [];

      response.tasks.map((task) => {
        task.result.map((result) => {
          data = [
            ...data,
            ...result.items.map((v) => ({
              url: v.url,
              title: v.meta.title,
              status_code: v.status_code,
              duration_time: v.page_timing.duration_time,
              inbound_links_count: v.meta.inbound_links_count,
              internal_links_count: v.meta.internal_links_count,
              external_links_count: v.meta.external_links_count,
              description: v.meta.description,
              canonical: v.meta.canonical,
              structured_data: null,
              fetch_time: v.fetch_time,
            })),
          ];
        });
      });

      return data;
    } catch (error) {
      console.log(error);

      throw new HttpException(error, 500);
    }
  }

  async backlink_detailed_table(
    payload: BacklinkDetailedDto[],
  ): Promise<BacklinkDetailedResponse['tasks'][0]['result'][0]['items']> {
    try {
      const url = `https://sandbox.dataforseo.com/v3/backlinks/backlinks/live`;
      const response: BacklinkDetailedResponse = await this.api_request(url, {
        body: JSON.stringify(payload),
      });

      let data = [];

      response.tasks.map((task) => {
        task.result.map((result) => {
          data = [
            ...data,
            ...result.items.map((v) => ({
              source_page: v.page_from_title,
              source_url: v.url_from,
              target_url: v.url_to_redirect_target,
              anchor_text: v.anchor,
              linked_type: v.attributes,
              external_links: v.page_from_external_links,
              internal_links: v.page_from_internal_links,
              domain_authority: v.domain_from_rank,
              page_authority: v.page_from_rank,
              status: v.page_from_status_code,
              first_seen: v.first_seen,
              last_seen: v.last_seen,
            })),
          ];
        });
      });

      return data;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async on_page_seo(payload: {
    target: string;
    limit: number;
    offset: number;
  }) {
    try {
      // Add a timeout of 10000 ms to the get_crawled_id request
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      let tasks;
      try {
        const result = await this.get_crawled_id([
          {
            max_crawl_pages: 6,
            target: payload.target,
          },
        ]);
        tasks = result.tasks;
      } finally {
        clearTimeout(timeout);
      }

      const crawl_id = tasks.at(0).id;

      const response = await this.get_crawled_page_data([
        {
          id: crawl_id,
          filters: [
            ['resource_type', '=', 'html'],
            'and',
            ['meta.description', 'like', '%OnPage%'],
          ],
          limit: payload.limit || 10,
          offset: payload.offset || 0,
        },
      ]);

      let data = [];

      response.tasks.map((task) => {
        task.result.map((result) => {
          data = [
            ...data,
            ...result.items.map((v) => ({
              url: v.url,
              title: v.meta.title,
              h1: v.meta.htags.h1,
              description: v.meta.description,
              plain_text_word_count: v.meta.content.plain_text_word_count,
              images: v.meta.images_count,
              internal_links_count: v.meta.internal_links_count,
              external_links_count: v.meta.external_links_count,
              h2: v.meta.htags.h2.length,
              keyword: null,
              canonical: !!v.meta.canonical,
              schema: !!v.checks.has_micromarkup,
            })),
          ];
        });
      });

      return data;
    } catch (error) {
      console.log(error);

      throw new HttpException(error, 500);
    }
  }

  async website_speed(
    payload: WebsiteSpeedDto[],
  ): Promise<WebsiteSpeedResponse['tasks'][0]['result']> {
    try {
      const url = `https://sandbox.dataforseo.com/v3/on_page/lighthouse/live/json`;
      const response: WebsiteSpeedResponse = await this.api_request(url, {
        body: JSON.stringify(payload),
      });

      let data = [];

      response.tasks.map((task) => {
        task.result.map((result) => {
          data = [
            ...data,
            {
              performance_score: result.categories.performance.score * 100,
              load_time: result.audits['server-response-time'].numericValue,
              page_size: result.audits['total-byte-weight'].numericValue,
              request: result.audits['network-requests'].details.items.length,
              full_ttfb: result.audits['server-response-time'].numericValue,
              fcp: result.audits['first-contentful-paint'].numericValue,
              lcp: result.audits['largest-contentful-paint'].numericValue,
              speed_index: result.audits['speed-index'].numericValue,
              tbt: result.audits['total-blocking-time'].numericValue,
              page_weight: result.audits['total-byte-weight'].numericValue,
            },
          ];
        });
      });

      return data;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
