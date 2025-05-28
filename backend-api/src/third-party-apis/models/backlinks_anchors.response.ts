export interface BacklinksAnchorsResponse {
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
  filters: string[];
}

export interface Result {
  target: string;
  total_count: number;
  items_count: number;
  items: Item[];
}

export interface Item {
  type: Type;
  anchor: null | string;
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
  referring_links_tld: { [key: string]: number };
  referring_links_types: ReferringLinksTypes;
  referring_links_attributes: ReferringLinksAttributes | null;
  referring_links_platform_types: ReferringLinksPlatformTypes;
  referring_links_semantic_locations: ReferringLinksSemanticLocations;
  referring_links_countries: { [key: string]: number };
}

export interface ReferringLinksAttributes {
  nofollow?: number;
  noopener?: number;
  external?: number;
  noreferrer?: number;
  sponsored?: number;
  author?: number;
  ugc?: number;
}

export interface ReferringLinksPlatformTypes {
  unknown: number;
  blogs?: number;
  cms?: number;
  news?: number;
  organization?: number;
  ecommerce?: number;
  wikis?: number;
  'message-boards'?: number;
}

export interface ReferringLinksSemanticLocations {
  '': number;
  figure?: number;
  section?: number;
  footer?: number;
  main?: number;
  article?: number;
  aside?: number;
  details?: number;
  header?: number;
  nav?: number;
  figcaption?: number;
}

export interface ReferringLinksTypes {
  image?: number;
  redirect?: number;
  canonical?: number;
  anchor: number;
}

export enum Type {
  BacklinksAnchor = 'backlinks_anchor',
}
