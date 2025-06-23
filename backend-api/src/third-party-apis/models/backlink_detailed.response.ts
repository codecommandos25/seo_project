export interface BacklinkDetailedResponse {
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
  mode: string;
  filters: Array<boolean | string>;
  limit: number;
}

export interface Result {
  target: Target;
  mode: string;
  custom_mode: null;
  total_count: number;
  items_count: number;
  items: Item[];
  search_after_token: string;
}

export interface Item {
  type: Type;
  domain_from: string;
  url_from: string;
  url_from_https: boolean;
  domain_to: Target;
  url_to: string;
  url_to_https: boolean;
  tld_from: TLDFrom;
  is_new: boolean;
  is_lost: boolean;
  backlink_spam_score: number;
  rank: number;
  page_from_rank: number;
  domain_from_rank: number;
  domain_from_platform_type: string[];
  domain_from_is_ip: boolean;
  domain_from_ip: string;
  domain_from_country: null | string;
  page_from_external_links: number;
  page_from_internal_links: number;
  page_from_size: number;
  page_from_encoding: PageFromEncoding;
  page_from_language: null | string;
  page_from_title: string;
  page_from_status_code: number;
  first_seen: string;
  prev_seen: string;
  last_seen: string;
  item_type: ItemType;
  attributes: string[] | null;
  dofollow: boolean;
  original: boolean;
  alt: null;
  image_url: null | string;
  anchor: null | string;
  text_pre: null | string;
  text_post: null | string;
  semantic_location: null | string;
  links_count: number;
  group_count: number;
  is_broken: boolean;
  url_to_status_code: number;
  url_to_spam_score: number;
  url_to_redirect_target: null | string;
  ranked_keywords_info: RankedKeywordsInfo;
  is_indirect_link: boolean;
  indirect_link_path: IndirectLinkPath[] | null;
}

export enum Target {
  DataforseoCOM = 'dataforseo.com',
  WWWDataforseoCOM = 'www.dataforseo.com',
}

export interface IndirectLinkPath {
  type: string;
  status_code: number;
  url: string;
}

export enum ItemType {
  Anchor = 'anchor',
  Image = 'image',
}

export enum PageFromEncoding {
  ISO88591 = 'iso-8859-1',
  UTF8 = 'utf-8',
}

export interface RankedKeywordsInfo {
  page_from_keywords_count_top_3: number;
  page_from_keywords_count_top_10: number;
  page_from_keywords_count_top_100: number;
}

export enum TLDFrom {
  COM = 'com',
  De = 'de',
  Net = 'net',
}

export enum Type {
  Backlink = 'backlink',
}
