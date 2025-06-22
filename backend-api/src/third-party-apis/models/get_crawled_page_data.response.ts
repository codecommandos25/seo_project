export interface GetCrawledPageDataResponse {
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
  filters: Array<string[] | string>;
  limit: number;
}

export interface Result {
  crawl_progress: string;
  crawl_status: CrawlStatus;
  search_after_token: null;
  current_offset: number;
  total_items_count: number;
  items_count: number;
  items: Item[];
}

export interface CrawlStatus {
  max_crawl_pages: number;
  pages_in_queue: number;
  pages_crawled: number;
}

export interface Item {
  resource_type: ResourceType;
  status_code: number;
  location: null;
  url: string;
  meta: Meta;
  page_timing: { [key: string]: number };
  onpage_score: number;
  total_dom_size: number;
  custom_js_response: null;
  custom_js_client_exception: null;
  resource_errors: ResourceErrors;
  broken_resources: boolean;
  broken_links: boolean;
  duplicate_title: boolean;
  duplicate_description: boolean;
  duplicate_content: boolean;
  click_depth: number;
  size: number;
  encoded_size: number;
  total_transfer_size: number;
  fetch_time: string;
  cache_control: CacheControl;
  checks: { [key: string]: boolean };
  content_encoding: ContentEncoding;
  media_type: MediaType;
  server: Server;
  is_resource: boolean;
  url_length: number;
  relative_url_length: number;
  last_modified: LastModified;
}

export interface CacheControl {
  cachable: boolean;
  ttl: number;
}

export enum ContentEncoding {
  Br = 'br',
}

export interface LastModified {
  header: string;
  sitemap: null;
  meta_tag: null | string;
}

export enum MediaType {
  TextHTML = 'text/html',
}

export interface Meta {
  title: string;
  charset: number;
  follow: boolean;
  generator: Generator;
  htags: Htags;
  description: string;
  favicon: string;
  meta_keywords: MetaKeywords;
  canonical: string;
  internal_links_count: number;
  external_links_count: number;
  inbound_links_count: number;
  images_count: number;
  images_size: number;
  scripts_count: number;
  scripts_size: number;
  stylesheets_count: number;
  stylesheets_size: number;
  title_length: number;
  description_length: number;
  render_blocking_scripts_count: number;
  render_blocking_stylesheets_count: number;
  cumulative_layout_shift: number;
  meta_title: null;
  content: { [key: string]: number };
  deprecated_tags: null;
  duplicate_meta_tags: DuplicateMetaTag[];
  spell: null;
  social_media_tags: SocialMediaTags;
}

export enum DuplicateMetaTag {
  Generator = 'generator',
}

export enum Generator {
  WPRocket3183 = 'WP Rocket 3.18.3',
}

export interface Htags {
  h4: string[];
  h1?: string[];
  h2: string[];
  h3: string[];
  h5?: string[];
}

export enum MetaKeywords {
  Eretur = 'eretur',
}

export interface SocialMediaTags {
  'og:locale': OgLocale;
  'og:type': OgType;
  'og:title': string;
  'og:description': string;
  'og:url': string;
  'og:site_name': OgSiteName;
  'og:updated_time': Date;
  'og:image'?: string;
  'og:image:secure_url'?: string;
  'og:image:width'?: string;
  'og:image:height'?: string;
  'og:image:alt'?: string;
  'og:image:type'?: string;
  'article:published_time'?: Date;
  'article:modified_time'?: Date;
  'og:video'?: string;
  'ya:ovs:upload_date'?: string;
  'ya:ovs:allow_embed'?: string;
  'twitter:card': TwitterCard;
  'twitter:title': string;
  'twitter:description': string;
  'twitter:image'?: string;
  'twitter:label1': TwitterLabel;
  'twitter:data1': string;
  'twitter:label2'?: TwitterLabel;
  'twitter:data2'?: string;
}

export enum OgLocale {
  EnUS = 'en_US',
}

export enum OgSiteName {
  DataForSEO = 'DataForSEO',
}

export enum OgType {
  Article = 'article',
  Website = 'website',
}

export enum TwitterCard {
  SummaryLargeImage = 'summary_large_image',
}

export enum TwitterLabel {
  TimeToRead = 'Time to read',
  WrittenBy = 'Written by',
}

export interface ResourceErrors {
  errors: Error[];
  warnings: Error[];
}

export interface Error {
  line: number;
  column: number;
  message: Message;
  status_code: number;
}

export enum Message {
  HTMLDepthMoreThan32Tags = 'HTML depth more than 32 tags.',
  HasMoreThat1500Nodes = 'Has more that 1500 nodes.',
  HasNodeWithMoreThan60Childs = 'Has node with more than 60 childs.',
  NoParagraphHasBeenFoundWithinTheLocalScope = 'No paragraph has been found within the local scope.',
  TheAttributeHasAlreadyBeenAdded = 'The attribute has already been added.',
}

export enum ResourceType {
  HTML = 'html',
}

export enum Server {
  Cloudflare = 'cloudflare',
}
