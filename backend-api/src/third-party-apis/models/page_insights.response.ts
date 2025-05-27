export interface PageInsightsCustomResponse {
  performanceScore: number;
  speedIndex: string;
  pageSize: string;
  lcp: string;
  tti: string;
  numberOfRequests: number;
  issues: any[];
}

export interface PageInsightsResponse {
  captchaResult: string;
  kind: string;
  id: string;
  loadingExperience: LoadingExperience;
  originLoadingExperience: LoadingExperience;
  lighthouseResult: LighthouseResult;
  analysisUTCTimestamp: Date;
}

export interface LighthouseResult {
  requestedUrl: string;
  finalUrl: string;
  mainDocumentUrl: string;
  finalDisplayedUrl: string;
  lighthouseVersion: string;
  userAgent: string;
  fetchTime: Date;
  environment: Environment;
  runWarnings: string[];
  configSettings: ConfigSettings;
  audits: Audits;
  categories: Categories;
  categoryGroups: CategoryGroups;
  timing: Timing;
  i18n: I18N;
  entities: Entity[];
  fullPageScreenshot: FullPageScreenshot;
}

export interface Audits {
  'crawlable-anchors': CacheInsight;
  'duplicated-javascript': DuplicatedJavascript;
  'long-tasks': BootupTime;
  'unsized-images': CriticalRequestChains;
  'uses-rel-preconnect': UsesRelPreconnect;
  viewport: CacheInsight;
  'interaction-to-next-paint-insight': CacheInsight;
  'script-treemap-data': CacheInsight;
  'main-thread-tasks': CacheInsight;
  'render-blocking-resources': DuplicatedJavascript;
  redirects: CriticalRequestChains;
  'document-latency-insight': DocumentLatencyInsight;
  'render-blocking-insight': CacheInsight;
  'dom-size-insight': CacheInsight;
  'lcp-discovery-insight': CacheInsight;
  diagnostics: CacheInsight;
  'third-parties-insight': CriticalRequestChains;
  'mainthread-work-breakdown': CriticalRequestChains;
  'critical-request-chains': CriticalRequestChains;
  'network-rtt': DuplicatedJavascript;
  'robots-txt': CriticalRequestChains;
  'bootup-time': BootupTime;
  'is-crawlable': CacheInsight;
  'dom-size': DOMSize;
  'unused-css-rules': CriticalRequestChains;
  'layout-shifts': CacheInsight;
  'uses-text-compression': DuplicatedJavascript;
  canonical: CacheInsight;
  'cumulative-layout-shift': CumulativeLayoutShift;
  'http-status-code': CacheInsight;
  'modern-image-formats': DuplicatedJavascript;
  'first-meaningful-paint': CacheInsight;
  'duplicated-javascript-insight': CacheInsight;
  interactive: CriticalRequestChains;
  'total-blocking-time': DOMSize;
  'third-party-facades': BootupTime;
  'legacy-javascript-insight': CacheInsight;
  'no-document-write': CacheInsight;
  'largest-contentful-paint-element': CriticalRequestChains;
  'forced-reflow-insight': CacheInsight;
  metrics: BootupTime;
  'max-potential-fid': DuplicatedJavascript;
  'user-timings': DOMSize;
  'cache-insight': CacheInsight;
  'lcp-lazy-loaded': CacheInsight;
  'resource-summary': CriticalRequestChains;
  'document-title': CacheInsight;
  'efficient-animated-content': DuplicatedJavascript;
  'viewport-insight': CacheInsight;
  'image-delivery-insight': CacheInsight;
  'prioritize-lcp-image': CriticalRequestChains;
  'network-server-latency': CriticalRequestChains;
  'unminified-css': DOMSize;
  'final-screenshot': CacheInsight;
  'uses-responsive-images': CriticalRequestChains;
  'offscreen-images': DuplicatedJavascript;
  'first-contentful-paint': BootupTime;
  'unminified-javascript': DOMSize;
  'cls-culprits-insight': ClsCulpritsInsight;
  'structured-data': CriticalRequestChains;
  'third-party-summary': BootupTime;
  'font-display': CacheInsight;
  'uses-optimized-images': DuplicatedJavascript;
  'unused-javascript': CriticalRequestChains;
  'meta-description': CacheInsight;
  'uses-long-cache-ttl': DuplicatedJavascript;
  'largest-contentful-paint': CriticalRequestChains;
  'lcp-phases-insight': CacheInsight;
  'image-alt': CacheInsight;
  'network-dependency-tree-insight': CacheInsight;
  'link-text': CacheInsight;
  'font-display-insight': CacheInsight;
  'network-requests': CacheInsight;
  'uses-passive-event-listeners': CriticalRequestChains;
  hreflang: CacheInsight;
  'server-response-time': DuplicatedJavascript;
  'non-composited-animations': CacheInsight;
  'screenshot-thumbnails': CriticalRequestChains;
  'legacy-javascript': DuplicatedJavascript;
  'total-byte-weight': DOMSize;
  'speed-index': CumulativeLayoutShift;
}

export interface BootupTime {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: BootupTimeScoreDisplayMode;
  displayValue?: string;
  metricSavings?: BootupTimeMetricSavings;
  details?: BootupTimeDetails;
  numericValue?: number;
  numericUnit?: NumericUnit;
}

export interface BootupTimeDetails {
  items: PurpleItem[];
  summary?: PurpleSummary;
  type: string;
  sortedBy?: string[];
  headings?: DetailsHeading[];
  skipSumming?: string[];
  debugData?: PurpleDebugData;
  isEntityGrouped?: boolean;
}

export interface PurpleDebugData {
  type: DebugDataType;
  tasks: Task[];
  urls: string[];
}

export interface Task {
  duration: number;
  urlIndex: number;
  startTime: number;
  other: number;
  scriptEvaluation?: number;
}

export enum DebugDataType {
  Debugdata = 'debugdata',
}

export interface DetailsHeading {
  key: null | string;
  valueType: ScoreDisplayMode;
  label?: string;
  granularity?: number;
  subItemsHeading?: SubItemsHeading;
  displayUnit?: string;
}

export interface SubItemsHeading {
  key: string;
  valueType?: ScoreDisplayMode;
}

export enum ScoreDisplayMode {
  Bytes = 'bytes',
  Code = 'code',
  MS = 'ms',
  Node = 'node',
  Numeric = 'numeric',
  Text = 'text',
  TimespanMS = 'timespanMs',
  URL = 'url',
}

export interface PurpleItem {
  scriptParseCompile?: number;
  scripting?: number;
  url?: string;
  total?: number;
  startTime?: number;
  duration?: number;
  observedNavigationStart?: number;
  observedTimeOrigin?: number;
  observedFirstContentfulPaintAllFrames?: number;
  observedFirstContentfulPaintTs?: number;
  observedSpeedIndex?: number;
  observedSpeedIndexTs?: number;
  observedLastVisualChangeTs?: number;
  observedLargestContentfulPaintAllFrames?: number;
  observedNavigationStartTs?: number;
  observedLargestContentfulPaintTs?: number;
  observedLoadTs?: number;
  interactive?: number;
  observedFirstVisualChange?: number;
  cumulativeLayoutShiftMainFrame?: number;
  observedFirstVisualChangeTs?: number;
  observedTraceEndTs?: number;
  observedLoad?: number;
  cumulativeLayoutShift?: number;
  largestContentfulPaint?: number;
  observedDomContentLoaded?: number;
  observedLargestContentfulPaint?: number;
  observedLastVisualChange?: number;
  speedIndex?: number;
  observedCumulativeLayoutShift?: number;
  observedFirstPaintTs?: number;
  observedTraceEnd?: number;
  observedFirstContentfulPaintAllFramesTs?: number;
  timeToFirstByte?: number;
  observedDomContentLoadedTs?: number;
  maxPotentialFID?: number;
  firstContentfulPaint?: number;
  observedFirstContentfulPaint?: number;
  observedLargestContentfulPaintAllFramesTs?: number;
  observedTimeOriginTs?: number;
  observedCumulativeLayoutShiftMainFrame?: number;
  totalBlockingTime?: number;
  observedFirstPaint?: number;
  lcpInvalidated?: boolean;
  entity?: Name;
  mainThreadTime?: number;
  transferSize?: number;
  tbtImpact?: number;
  blockingTime?: number;
  subItems?: PurpleSubItems;
}

export enum Name {
  GoogleCDN = 'Google CDN',
  GoogleCOM = 'google.com',
  GoogleFonts = 'Google Fonts',
  OtherGoogleAPIsSDKs = 'Other Google APIs/SDKs',
}

export interface PurpleSubItems {
  items: FluffyItem[];
  type: string;
}

export interface FluffyItem {
  transferSize: number;
  tbtImpact: number;
  blockingTime: number;
  url: string;
  mainThreadTime: number;
}

export interface PurpleSummary {
  wastedMs: number;
  wastedBytes?: number;
}

export interface BootupTimeMetricSavings {
  TBT: number;
}

export enum NumericUnit {
  Byte = 'byte',
  Millisecond = 'millisecond',
}

export enum BootupTimeScoreDisplayMode {
  Binary = 'binary',
  Informative = 'informative',
  Manual = 'manual',
  MetricSavings = 'metricSavings',
  NotApplicable = 'notApplicable',
  Numeric = 'numeric',
}

export interface CacheInsight {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: BootupTimeScoreDisplayMode;
  details?: CacheInsightDetails;
  metricSavings?: CacheInsightMetricSavings;
  warnings?: any[];
  displayValue?: string;
  explanation?: string;
}

export interface CacheInsightDetails {
  items?: TentacledItem[];
  type: string;
  headings?: DetailsHeading[];
  timing?: number;
  data?: string;
  timestamp?: number;
  longestChain?: PurpleLongestChain;
  chains?: PurpleChains;
  debugData?: FluffyDebugData;
  nodes?: NodeElement[];
}

export interface PurpleChains {
  data: any;
}

export interface FluffyDebugData {
  type: DebugDataType;
  networkStartTimeTs: number;
}

export interface TentacledItem {
  mainDocumentTransferSize?: number;
  numScripts?: number;
  numFonts?: number;
  numRequests?: number;
  maxRtt?: number;
  numTasksOver50ms?: number;
  numTasksOver10ms?: number;
  totalTaskTime?: number;
  throughput?: number;
  numStylesheets?: number;
  rtt?: number;
  numTasksOver25ms?: number;
  numTasksOver500ms?: number;
  numTasksOver100ms?: number;
  maxServerLatency?: number;
  totalByteWeight?: number;
  numTasks?: number;
  statistic?: string;
  value?: Value;
  node?: PurpleNode;
  type?: NodeType;
  items?: NodeItem[];
  headings?: DetailsHeading[];
  score?: number;
  path?: string;
  snippet?: string;
  nodeLabel?: string;
  boundingRect?: NodeValue;
  selector?: string;
  lhId?: string;
  startTime?: number;
  duration?: number;
  experimentalFromMainFrame?: boolean;
  finished?: boolean;
  url?: string;
  networkEndTime?: number;
  entity?: Name;
  statusCode?: number;
  resourceSize?: number;
  sessionTargetType?: SessionTargetType;
  mimeType?: string;
  protocol?: Protocol;
  priority?: Priority;
  networkRequestTime?: number;
  rendererStartTime?: number;
  transferSize?: number;
  resourceType?: string;
  isLinkPreload?: boolean;
  subItems?: FluffySubItems;
  totalBytes?: number;
}

export interface NodeValue {
  bottom: number;
  height: number;
  left: number;
  top: number;
  width: number;
  right: number;
  id?: string;
}

export interface NodeItem {
  duration: number;
  label: string;
  phase: string;
}

export interface PurpleNode {
  value?: string;
  type: NodeType;
  nodeLabel?: string;
  snippet?: string;
  selector?: string;
  boundingRect?: NodeValue;
  path?: string;
  lhId?: string;
  headings?: DetailsHeading[];
  items?: NodeItem[];
}

export enum NodeType {
  Node = 'node',
  Table = 'table',
  Text = 'text',
}

export enum Priority {
  High = 'High',
  Low = 'Low',
  VeryHigh = 'VeryHigh',
  VeryLow = 'VeryLow',
}

export enum Protocol {
  Data = 'data',
  H2 = 'h2',
  HTTP11 = 'http/1.1',
}

export enum SessionTargetType {
  Page = 'page',
}

export interface FluffySubItems {
  type: string;
  items: StickyItem[];
}

export interface StickyItem {
  animation: string;
  failureReason: string;
}

export interface Value {
  type: ScoreDisplayMode;
  value: number;
  granularity: number;
}

export interface PurpleLongestChain {
  duration: number;
}

export interface NodeElement {
  resourceBytes: number;
  encodedBytes: number;
  children?: ChildElement[];
  unusedBytes: number;
  name: string;
}

export interface ChildElement {
  name: string;
  unusedBytes: number;
  resourceBytes: number;
}

export interface CacheInsightMetricSavings {
  INP?: number;
  CLS?: number;
  LCP?: number;
}

export interface ClsCulpritsInsight {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: BootupTimeScoreDisplayMode;
  metricSavings: ClsCulpritsInsightMetricSavings;
  details: ClsCulpritsInsightDetails;
}

export interface ClsCulpritsInsightDetails {
  type: string;
  items: IndigoItem[];
}

export interface IndigoItem {
  type: PurpleType;
  items: IndecentItem[];
  headings: PurpleHeading[];
  overallSavingsMs?: number;
  isEntityGrouped?: boolean;
}

export interface PurpleHeading {
  valueType: ScoreDisplayMode;
  key: string;
  label?: string;
  subItemsHeading?: SubItemsHeading;
  granularity?: number;
}

export interface IndecentItem {
  score?: number;
  node?: PurpleNode;
  requestCount?: number;
  resourceType?: string;
  transferSize?: number;
  label?: string;
  url?: string;
  responseTime?: number;
  mainThreadTime?: number;
  subItems?: TentacledSubItems;
  entity?: Name;
  duration?: number;
  timingType?: TimingType;
  name?: string;
  startTime?: number;
}

export interface TentacledSubItems {
  items: HilariousItem[];
  type: string;
}

export interface HilariousItem {
  transferSize: number;
  url: string;
  mainThreadTime: number;
}

export enum TimingType {
  Mark = 'Mark',
  Measure = 'Measure',
}

export enum PurpleType {
  Opportunity = 'opportunity',
  Table = 'table',
}

export interface ClsCulpritsInsightMetricSavings {
  CLS: number;
}

export interface CriticalRequestChains {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: BootupTimeScoreDisplayMode;
  displayValue?: string;
  details?: CriticalRequestChainsDetails;
  numericValue?: number;
  numericUnit?: NumericUnit;
  metricSavings?: CriticalRequestChainsMetricSavings;
}

export interface CriticalRequestChainsDetails {
  longestChain?: FluffyLongestChain;
  chains?: FluffyChains;
  type: string;
  items?: AmbitiousItem[];
  sortedBy?: string[];
  headings?: DetailsHeading[];
  overallSavingsMs?: number;
  scale?: number;
  isEntityGrouped?: boolean;
  debugData?: TentacledDebugData;
  overallSavingsBytes?: number;
}

export interface FluffyChains {
  A1F35AD1494B1CFCE0C4C7493A3B1FCA: A1F35Ad1494B1Cfce0C4C7493A3B1Fca;
}

export interface A1F35Ad1494B1Cfce0C4C7493A3B1Fca {
  request: Request;
  children: Children;
}

export interface Children {
  'A1F35AD1494B1CFCE0C4C7493A3B1FCA:redirect': A1F35AD1494B1CFCE0C4C7493A3B1FCARedirect;
}

export interface A1F35AD1494B1CFCE0C4C7493A3B1FCARedirect {
  request: Request;
  children: { [key: string]: ChildValue };
}

export interface ChildValue {
  request: Request;
}

export interface Request {
  startTime: number;
  url: string;
  transferSize: number;
  responseReceivedTime: number;
  endTime: number;
}

export interface TentacledDebugData {
  metricSavings: DebugDataMetricSavings;
  type: DebugDataType;
}

export interface DebugDataMetricSavings {
  LCP: number;
  FCP: number;
}

export interface AmbitiousItem {
  type?: NodeType;
  headings?: DetailsHeading[];
  items?: CunningItem[];
  groupLabel?: string;
  duration?: number;
  group?: string;
  serverResponseTime?: number;
  origin?: string;
  url?: string;
  wastedMs?: number;
  requestCount?: number;
  resourceType?: string;
  transferSize?: number;
  label?: string;
  timing?: number;
  timestamp?: number;
  data?: string;
  mainThreadTime?: number;
  subItems?: TentacledSubItems;
  entity?: Name;
  wastedPercent?: number;
  totalBytes?: number;
  wastedBytes?: number;
}

export interface CunningItem {
  node?: PurpleNode;
  percent?: string;
  timing?: number;
  phase?: string;
}

export interface FluffyLongestChain {
  duration: number;
  length: number;
  transferSize: number;
}

export interface CriticalRequestChainsMetricSavings {
  LCP?: number;
  TBT?: number;
  FCP?: number;
  CLS?: number;
}

export interface CumulativeLayoutShift {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  displayValue: string;
  details?: CumulativeLayoutShiftDetails;
  numericValue: number;
  numericUnit: string;
}

export interface CumulativeLayoutShiftDetails {
  items: MagentaItem[];
  type: DebugDataType;
}

export interface MagentaItem {
  newEngineResult: NewEngineResult;
  newEngineResultDiffered: boolean;
  cumulativeLayoutShiftMainFrame: number;
}

export interface NewEngineResult {
  cumulativeLayoutShiftMainFrame: number;
  cumulativeLayoutShift: number;
}

export interface DocumentLatencyInsight {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: BootupTimeScoreDisplayMode;
  metricSavings: DebugDataMetricSavings;
  details: DocumentLatencyInsightDetails;
}

export interface DocumentLatencyInsightDetails {
  type: string;
  items: Items;
}

export interface Items {
  serverResponseIsFast: NoRedirects;
  usesCompression: NoRedirects;
  noRedirects: NoRedirects;
}

export interface NoRedirects {
  value: boolean;
  label: string;
}

export interface DOMSize {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: BootupTimeScoreDisplayMode;
  displayValue?: string;
  metricSavings?: DOMSizeMetricSavings;
  details?: DOMSizeDetails;
  numericValue?: number;
  numericUnit?: string;
  warnings?: any[];
}

export interface DOMSizeDetails {
  headings: DetailsHeading[];
  type: PurpleType;
  items: FriskyItem[];
  sortedBy?: string[];
  overallSavingsBytes?: number;
  overallSavingsMs?: number;
  debugData?: TentacledDebugData;
}

export interface FriskyItem {
  statistic?: string;
  value?: Value;
  node?: PurpleNode;
  url?: string;
  totalBytes?: number;
  duration?: number;
  timingType?: TimingType;
  name?: string;
  startTime?: number;
}

export interface DOMSizeMetricSavings {
  TBT?: number;
  LCP?: number;
  FCP?: number;
}

export interface DuplicatedJavascript {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: BootupTimeScoreDisplayMode;
  metricSavings?: DebugDataMetricSavings;
  details?: DuplicatedJavascriptDetails;
  numericValue: number;
  numericUnit: NumericUnit;
  warnings?: any[];
  displayValue?: string;
}

export interface DuplicatedJavascriptDetails {
  sortedBy?: string[];
  items: MischievousItem[];
  overallSavingsMs?: number;
  type: PurpleType;
  overallSavingsBytes?: number;
  debugData?: TentacledDebugData;
  headings: DetailsHeading[];
}

export interface MischievousItem {
  origin?: string;
  rtt?: number;
  url?: string;
  responseTime?: number;
}

export interface UsesRelPreconnect {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: BootupTimeScoreDisplayMode;
  metricSavings: DebugDataMetricSavings;
  details: UsesRelPreconnectDetails;
  warnings: any[];
  numericValue: number;
  numericUnit: NumericUnit;
}

export interface UsesRelPreconnectDetails {
  items: BraggadociousItem[];
  summary?: FluffySummary;
  type: PurpleType;
  sortedBy: string[];
  headings: DetailsHeading[];
  overallSavingsMs?: number;
}

export interface BraggadociousItem {
  scriptParseCompile: number;
  scripting: number;
  url: string;
  total: number;
}

export interface FluffySummary {
  wastedMs: number;
}

export interface Categories {
  performance: Performance;
  seo: SEO;
}

export interface Performance {
  id: string;
  title: string;
  score: number;
  auditRefs: AuditRef[];
}

export interface AuditRef {
  id: string;
  weight: number;
  group?: Group;
  acronym?: string;
}

export enum Group {
  Diagnostics = 'diagnostics',
  Hidden = 'hidden',
  Metrics = 'metrics',
  SEOContent = 'seo-content',
  SEOCrawl = 'seo-crawl',
}

export interface SEO {
  id: string;
  title: string;
  description: string;
  score: number;
  manualDescription: string;
  auditRefs: AuditRef[];
}

export interface CategoryGroups {
  'a11y-color-contrast': A11YAria;
  'best-practices-trust-safety': BestPracticesBrowserCompat;
  'a11y-navigation': A11YAria;
  'a11y-aria': A11YAria;
  'a11y-best-practices': A11YAria;
  'a11y-tables-lists': A11YAria;
  'best-practices-ux': BestPracticesBrowserCompat;
  'seo-mobile': A11YAria;
  'a11y-names-labels': A11YAria;
  'seo-content': A11YAria;
  'best-practices-browser-compat': BestPracticesBrowserCompat;
  'seo-crawl': A11YAria;
  'a11y-language': A11YAria;
  'best-practices-general': BestPracticesBrowserCompat;
  diagnostics: A11YAria;
  'a11y-audio-video': A11YAria;
  metrics: BestPracticesBrowserCompat;
  insights: A11YAria;
}

export interface A11YAria {
  title: string;
  description: string;
}

export interface BestPracticesBrowserCompat {
  title: string;
}

export interface ConfigSettings {
  emulatedFormFactor: string;
  formFactor: string;
  locale: string;
  onlyCategories: string[];
  channel: string;
}

export interface Entity {
  name: Name;
  isUnrecognized?: boolean;
  origins: string[];
  homepage?: string;
  category?: string;
  isFirstParty?: boolean;
}

export interface Environment {
  networkUserAgent: string;
  hostUserAgent: string;
  benchmarkIndex: number;
  credits: Credits;
}

export interface Credits {
  'axe-core': string;
}

export interface FullPageScreenshot {
  nodes: { [key: string]: NodeValue };
  screenshot: Screenshot;
}

export interface Screenshot {
  height: number;
  width: number;
  data: string;
}

export interface I18N {
  rendererFormattedStrings: RendererFormattedStrings;
}

export interface RendererFormattedStrings {
  varianceDisclaimer: string;
  opportunityResourceColumnLabel: string;
  opportunitySavingsColumnLabel: string;
  errorMissingAuditInfo: string;
  errorLabel: string;
  warningHeader: string;
  passedAuditsGroupTitle: string;
  notApplicableAuditsGroupTitle: string;
  manualAuditsGroupTitle: string;
  toplevelWarningsMessage: string;
  crcLongestDurationLabel: string;
  crcInitialNavigation: string;
  lsPerformanceCategoryDescription: string;
  labDataTitle: string;
  warningAuditsGroupTitle: string;
  snippetExpandButtonLabel: string;
  snippetCollapseButtonLabel: string;
  thirdPartyResourcesLabel: string;
  runtimeDesktopEmulation: string;
  runtimeMobileEmulation: string;
  runtimeNoEmulation: string;
  runtimeSettingsBenchmark: string;
  runtimeSettingsCPUThrottling: string;
  runtimeSettingsDevice: string;
  runtimeSettingsNetworkThrottling: string;
  runtimeSettingsUANetwork: string;
  runtimeUnknown: string;
  dropdownCopyJSON: string;
  dropdownDarkTheme: string;
  dropdownPrintExpanded: string;
  dropdownPrintSummary: string;
  dropdownSaveGist: string;
  dropdownSaveHTML: string;
  dropdownSaveJSON: string;
  dropdownViewer: string;
  footerIssue: string;
  throttlingProvided: string;
  calculatorLink: string;
  runtimeSettingsAxeVersion: string;
  viewTreemapLabel: string;
  showRelevantAudits: string;
}

export interface Timing {
  total: number;
}

export interface LoadingExperience {
  id: string;
  metrics: Metrics;
  overall_category: Category;
  initial_url: string;
}

export interface Metrics {
  CUMULATIVE_LAYOUT_SHIFT_SCORE: CumulativeLayoutShiftScore;
  EXPERIMENTAL_TIME_TO_FIRST_BYTE: CumulativeLayoutShiftScore;
  FIRST_CONTENTFUL_PAINT_MS: CumulativeLayoutShiftScore;
  INTERACTION_TO_NEXT_PAINT: CumulativeLayoutShiftScore;
  LARGEST_CONTENTFUL_PAINT_MS: CumulativeLayoutShiftScore;
}

export interface CumulativeLayoutShiftScore {
  percentile: number;
  distributions: Distribution[];
  category: Category;
}

export enum Category {
  Average = 'AVERAGE',
  Fast = 'FAST',
}

export interface Distribution {
  min: number;
  max?: number;
  proportion: number;
}
