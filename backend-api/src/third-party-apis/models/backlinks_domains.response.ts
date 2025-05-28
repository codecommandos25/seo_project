export interface BacklinksDomainResponse {
  version: string;
  status_code: number;
  status_message: string;
  time: string;
  cost: number;
  tasks_count: number;
  tasks_error: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  status_code: number;
  status_message: string;
  time: string;
  cost: number;
  result_count: number;
  path: string[];
  data: Data;
  result: Result[];
}

export interface Data {
  api: string;
  function: string;
  target: string;
  limit: number;
  order_by: string[];
  exclude_internal_backlinks: boolean;
  backlinks_filters: Array<boolean | string>;
  filters: Array<number | string>;
}

export interface Result {
  target: string;
  total_count: number;
  items_count: number;
  items: Item[];
}

export interface Item {
  type: Type;
  domain: string;
  rank: number;
  backlinks: number;
  first_seen: string;
  lost_date: null;
  backlinks_spam_score: number;
  broken_backlinks: number;
  broken_pages: number;
  referring_domains: number;
  referring_domains_nofollow: number;
  referring_main_domains: number;
  referring_main_domains_nofollow: number;
  referring_ips: number;
  referring_subnets: number;
  referring_pages: number;
  referring_pages_nofollow: number;
  referring_links_tld: ReferringLinksTLD;
  referring_links_types: ReferringLinksTypes;
  referring_links_attributes: ReferringLinksAttributes | null;
  referring_links_platform_types: ReferringLinksPlatformTypes;
  referring_links_semantic_locations: ReferringLinksSemanticLocations;
  referring_links_countries: ReferringLinksCountries;
}

export interface ReferringLinksAttributes {
  sponsored?: number;
  noopener?: number;
  noreferrer?: number;
  tag?: number;
  nofollow?: number;
}

export interface ReferringLinksCountries {
  DE?: number;
  ''?: number;
  YT?: number;
  US?: number;
}

export interface ReferringLinksPlatformTypes {
  organization?: number;
  unknown?: number;
  blogs?: number;
  cms?: number;
}

export interface ReferringLinksSemanticLocations {
  ''?: number;
  aside?: number;
  article?: number;
  footer?: number;
}

export interface ReferringLinksTLD {
  de?: number;
  jetzt?: number;
  com?: number;
  'dreamhosters.com'?: number;
}

export interface ReferringLinksTypes {
  anchor: number;
  redirect?: number;
  image?: number;
  canonical?: number;
}

export enum Type {
  BacklinksReferringDomain = 'backlinks_referring_domain',
}
