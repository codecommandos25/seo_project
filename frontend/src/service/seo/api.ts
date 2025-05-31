import { DELETE, GET, POST, PUT } from '@/lib/AxiosClient'
import * as ROUTES from '../routes'

type FilterCondition = [string, string, string | number | boolean]

interface PostBody {
  limit: number
  filters: FilterCondition[]
}

// type FilterCondition = [string, "=" | "!=" | ">" | "<" | ">=" | "<=" | "like", string | number | boolean];

interface QueryObject {
  limit: number;
  filters: FilterCondition[];
}

type QueryArray = QueryObject[];

interface SearchQuery {
  target: string;
  language_name: 'English' | 'Spanish' | 'French' | string; // specific values or string
  location_name: string;
  include_serp_info?: boolean; // optional field
  load_rank_absolute?: boolean; // optional field
  limit: number;
}

interface SearchRequest {
  targets: string[];
  location_code: number;
  language_code: string;
  item_types: ("organic" | "paid" | string)[]; // Strictly typed with common values but allows other strings
  date_from: string; // ISO 8601 date format (YYYY-MM-DD)
  date_to: string;   // ISO 8601 date format (YYYY-MM-DD)
}

interface PerformanceIssue {
  id: string;
  title: string;
  description: string;
  displayMode: "metricSavings" | string; // Strict with common value but allows others
  score?: number; // Optional if present in some cases
  numericValue?: number; // Optional metric savings value
  numericUnit?: string; // Optional unit (e.g., "s", "ms", "KiB")
}

export interface PerformanceMetrics {
  performanceScore: number;
  speedIndex: string; // e.g., "0.8 s"
  pageSize: string; // e.g., "Total size was 753 KiB"
  lcp: string; // Largest Contentful Paint (e.g., "1.8 s")
  tti: string; // Time to Interactive (e.g., "1.8 s")
  numberOfRequests: number;
  issues: PerformanceIssue[];
} 

type OrderByClause = `${string},${'asc' | 'desc'}`;

type Filter = [string, string, string]; // e.g. ["anchor", "like", "%news%"]

interface TopAnchorType {
  target: string;
  limit: number;
  order_by: OrderByClause[];
  filters: Filter;
}

interface BacklinkType {
  target: string;
  limit: number;
  order_by?: [`${string},${'asc' | 'desc'}`];
  exclude_internal_backlinks?: boolean;
  backlinks_filters?: any[];
  filters?: any[];
}

export const SEODetails = (data: QueryArray) =>
  POST({
    // url: `${ROUTES.AUTH_URL}/users/update-password`,
    // url: 'https://sandbox.dataforseo.com/v3/domain_analytics/whois/overview/live',
    url: 'http://13.234.181.212:8000/third-party-apis/domain_analytics',
    data,
  })

  export const SEOKeywords = (data: SearchQuery[]) =>
  POST({
    // url: `${ROUTES.AUTH_URL}/users/update-password`,
    // url: 'https://sandbox.dataforseo.com/v3/domain_analytics/whois/overview/live',
    url: 'http://13.234.181.212:8000/third-party-apis/ranked_keywords',
    data,
  })

  export const SEOGraph = (data: SearchRequest[]) =>
  POST({
    // url: `${ROUTES.AUTH_URL}/users/update-password`,
    // url: 'https://sandbox.dataforseo.com/v3/domain_analytics/whois/overview/live',
    url: 'http://13.234.181.212:8000/third-party-apis/traffic_data_graph',
    data,
  })

  export const PageInsights = (data: {url:string}) =>
  GET({
    url: `http://13.234.181.212:8000/third-party-apis/page_insights?url=${data.url}`,
  }).then((res) => res.data);


  export const Topanchor = (data: TopAnchorType[]) =>
  POST({
    // url: `${ROUTES.AUTH_URL}/users/update-password`,
    // url: 'https://sandbox.dataforseo.com/v3/domain_analytics/whois/overview/live',
    url: 'http://13.234.181.212:8000/third-party-apis/get_backlinks_anchors',
    data,
  })

  export const BacklinkDomain = (data: BacklinkType[]) =>
  POST({
    // url: `${ROUTES.AUTH_URL}/users/update-password`,
    // url: 'https://sandbox.dataforseo.com/v3/domain_analytics/whois/overview/live',
    url: 'http://13.234.181.212:8000/third-party-apis/get_backlinks_domains',
    data,
  })