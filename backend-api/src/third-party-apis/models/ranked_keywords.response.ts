export interface RankedKeywordsResponse {
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
  se_type: string;
  target: string;
  language_name: string;
  location_name: string;
  include_serp_info: boolean;
  load_rank_absolute: boolean;
  limit: number;
}

export interface Result {
  se_type: string;
  target: string;
  location_code: number;
  language_code: string;
  total_count: number;
  items_count: number;
  metrics: Metrics;
  metrics_absolute: Metrics;
  items: Item[];
}

export interface Item {
  se_type: string;
  keyword_data: KeywordData;
  ranked_serp_element: RankedSerpElement;
}

export interface KeywordData {
  se_type: string;
  keyword: string;
  location_code: number;
  language_code: string;
  keyword_info: KeywordInfo;
  keyword_info_normalized_with_bing: null;
  keyword_info_normalized_with_clickstream: null;
  clickstream_keyword_info: null;
  keyword_properties: KeywordProperties;
  serp_info: SerpInfo;
  avg_backlinks_info: AvgBacklinksInfo;
  search_intent_info: SearchIntentInfo;
}

export interface AvgBacklinksInfo {
  se_type: string;
  backlinks: number;
  dofollow: number;
  referring_pages: number;
  referring_domains: number;
  referring_main_domains: number;
  rank: number;
  main_domain_rank: number;
  last_updated_time: string;
}

export interface KeywordInfo {
  se_type: string;
  last_updated_time: string;
  competition: null;
  competition_level: string;
  cpc: null;
  search_volume: number;
  low_top_of_page_bid: null;
  high_top_of_page_bid: null;
  categories: number[];
  monthly_searches: MonthlySearch[];
  search_volume_trend: SearchVolumeTrend;
}

export interface MonthlySearch {
  year: number;
  month: number;
  search_volume: number;
}

export interface SearchVolumeTrend {
  monthly: number;
  quarterly: number;
  yearly: number;
}

export interface KeywordProperties {
  se_type: string;
  core_keyword: null;
  synonym_clustering_algorithm: null;
  keyword_difficulty: number;
  detected_language: string;
  is_another_language: boolean;
}

export interface SearchIntentInfo {
  se_type: string;
  main_intent: string;
  foreign_intent: string[];
  last_updated_time: string;
}

export interface SerpInfo {
  se_type: string;
  check_url: string;
  serp_item_types: string[];
  se_results_count: number;
  last_updated_time: string;
  previous_updated_time: string;
}

export interface RankedSerpElement {
  se_type: string;
  serp_item: SerpItem;
  check_url: string;
  serp_item_types: string[];
  se_results_count: number;
  keyword_difficulty: number;
  is_lost: boolean;
  last_updated_time: string;
  previous_updated_time: string;
}

export interface SerpItem {
  se_type: string;
  type: string;
  rank_group: number;
  rank_absolute: number;
  position: string;
  xpath: string;
  domain: string;
  title: string;
  url: string;
  breadcrumb: string;
  website_name: string;
  is_image: boolean;
  is_video: boolean;
  is_featured_snippet: boolean;
  is_malicious: boolean;
  description: string;
  pre_snippet: null;
  extended_snippet: null;
  amp_version: boolean;
  rating: null;
  highlighted: string[];
  links: Link[] | null;
  about_this_result: null;
  main_domain: string;
  relative_url: string;
  etv: number;
  estimated_paid_traffic_cost: null;
  clickstream_etv: null;
  rank_changes: RankChanges;
  backlinks_info: BacklinksInfo | null;
  rank_info: RankInfo;
}

export interface BacklinksInfo {
  referring_domains: number;
  referring_main_domains: number;
  referring_pages: number;
  dofollow: number;
  backlinks: number;
  time_update: string;
}

export interface Link {
  type: string;
  title: string;
  description: null;
  url: string;
}

export interface RankChanges {
  previous_rank_absolute: number;
  is_new: boolean;
  is_up: boolean;
  is_down: boolean;
}

export interface RankInfo {
  page_rank: number;
  main_domain_rank: number;
}

export interface Metrics {
  organic: { [key: string]: number | null };
  paid: { [key: string]: number | null };
  featured_snippet: null;
  local_pack: null;
}
