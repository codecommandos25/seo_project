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
  'lcp-phases-insight': CacheInsight;
  'duplicated-javascript': DuplicatedJavascript;
  'unsized-images': CacheInsight;
  viewport: DOMSizeInsight;
  'layout-shifts': DOMSizeInsight;
  'cls-culprits-insight': ClsCulpritsInsight;
  'max-potential-fid': CumulativeLayoutShift;
  'forced-reflow-insight': CacheInsight;
  'modern-image-formats': DuplicatedJavascript;
  'lcp-discovery-insight': CacheInsight;
  'uses-text-compression': DuplicatedJavascript;
  'render-blocking-insight': CacheInsight;
  'screenshot-thumbnails': CacheInsight;
  'user-timings': CacheInsight;
  redirects: CumulativeLayoutShift;
  'third-parties-insight': CacheInsight;
  'final-screenshot': CacheInsight;
  metrics: CumulativeLayoutShift;
  'legacy-javascript-insight': CacheInsight;
  'main-thread-tasks': CacheInsight;
  'font-display-insight': CacheInsight;
  'unminified-javascript': CriticalRequestChains;
  'resource-summary': DOMSizeInsight;
  'render-blocking-resources': BootupTime;
  'dom-size': DOMSize;
  'unminified-css': CriticalRequestChains;
  'uses-long-cache-ttl': CumulativeLayoutShift;
  'font-display': DOMSizeInsight;
  'viewport-insight': DOMSizeInsight;
  'third-party-summary': DOMSizeInsight;
  'image-delivery-insight': CacheInsight;
  'network-requests': CacheInsight;
  'long-tasks': BootupTime;
  'mainthread-work-breakdown': CriticalRequestChains;
  'cache-insight': CacheInsight;
  'unused-css-rules': CriticalRequestChains;
  'document-latency-insight': DocumentLatencyInsight;
  'prioritize-lcp-image': CacheInsight;
  'uses-optimized-images': DuplicatedJavascript;
  'total-blocking-time': DuplicatedJavascript;
  'network-dependency-tree-insight': CacheInsight;
  'efficient-animated-content': DuplicatedJavascript;
  'first-contentful-paint': BootupTime;
  'total-byte-weight': DuplicatedJavascript;
  'network-rtt': BootupTime;
  'third-party-facades': DOMSizeInsight;
  'uses-responsive-images': CumulativeLayoutShift;
  'uses-passive-event-listeners': CacheInsight;
  'first-meaningful-paint': CacheInsight;
  'non-composited-animations': DOMSizeInsight;
  'duplicated-javascript-insight': CacheInsight;
  'critical-request-chains': CriticalRequestChains;
  'unused-javascript': CriticalRequestChains;
  'largest-contentful-paint-element': CriticalRequestChains;
  'interaction-to-next-paint-insight': CacheInsight;
  'offscreen-images': DuplicatedJavascript;
  interactive: CriticalRequestChains;
  'largest-contentful-paint': CriticalRequestChains;
  'uses-rel-preconnect': UsesRelPreconnect;
  'no-document-write': DOMSizeInsight;
  'cumulative-layout-shift': CumulativeLayoutShift;
  'network-server-latency': CriticalRequestChains;
  'lcp-lazy-loaded': CacheInsight;
  'server-response-time': BootupTime;
  'bootup-time': BootupTime;
  diagnostics: CacheInsight;
  'dom-size-insight': DOMSizeInsight;
  'script-treemap-data': CacheInsight;
  'legacy-javascript': DuplicatedJavascript;
  'speed-index': DOMSize;
}

export interface BootupTime {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  displayValue?: string;
  metricSavings?: BootupTimeMetricSavings;
  details?: BootupTimeDetails;
  numericValue?: number;
  numericUnit?: string;
}

export interface BootupTimeDetails {
  items: PurpleItem[];
  summary?: PurpleSummary;
  type: string;
  sortedBy?: string[];
  headings: NodeHeading[];
  debugData?: PurpleDebugData;
  skipSumming?: string[];
  overallSavingsMs?: number;
}

export interface PurpleDebugData {
  urls: string[];
  type: DebugDataType;
  tasks: Task[];
}

export interface Task {
  duration: number;
  scriptEvaluation?: number;
  startTime: number;
  urlIndex: number;
  other: number;
}

export enum DebugDataType {
  Debugdata = 'debugdata',
}

export interface NodeHeading {
  key: null | string;
  label: string;
  valueType: ValueTypeEnum;
  granularity?: number;
  subItemsHeading?: SubItemsHeading;
  displayUnit?: string;
}

export interface SubItemsHeading {
  key: string;
  valueType?: ValueTypeEnum;
}

export enum ValueTypeEnum {
  Bytes = 'bytes',
  Code = 'code',
  MS = 'ms',
  Node = 'node',
  Numeric = 'numeric',
  SourceLocation = 'source-location',
  Text = 'text',
  TimespanMS = 'timespanMs',
  URL = 'url',
}

export interface PurpleItem {
  total?: number;
  scriptParseCompile?: number;
  scripting?: number;
  url?: string;
  startTime?: number;
  duration?: number;
  rtt?: number;
  origin?: string;
  responseTime?: number;
}

export interface PurpleSummary {
  wastedMs: number;
}

export interface BootupTimeMetricSavings {
  TBT?: number;
  LCP?: number;
  FCP?: number;
}

export enum ScoreDisplayMode {
  Informative = 'informative',
  MetricSavings = 'metricSavings',
  NotApplicable = 'notApplicable',
  Numeric = 'numeric',
}

export interface CacheInsight {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: ScoreDisplayMode;
  details?: CacheInsightDetails;
  metricSavings?: CacheInsightMetricSavings;
  displayValue?: string;
}

export interface CacheInsightDetails {
  type: string;
  items?: FluffyItem[];
  timestamp?: number;
  data?: string;
  timing?: number;
  headings?: NodeHeading[];
  chains?: {
    [key: string]: FluffyChains;
  };
  longestChain?: PurpleLongestChain;
  debugData?: FluffyDebugData;
  scale?: number;
  nodes?: NodeElement[];
  isEntityGrouped?: boolean;
}

export interface FluffyDebugData {
  type: DebugDataType;
  networkStartTimeTs: number;
}

export interface FluffyItem {
  numTasks?: number;
  numScripts?: number;
  numStylesheets?: number;
  numTasksOver50ms?: number;
  throughput?: number;
  maxServerLatency?: number;
  mainDocumentTransferSize?: number;
  totalByteWeight?: number;
  numTasksOver10ms?: number;
  numTasksOver25ms?: number;
  numFonts?: number;
  maxRtt?: number;
  numRequests?: number;
  numTasksOver500ms?: number;
  numTasksOver100ms?: number;
  totalTaskTime?: number;
  rtt?: number;
  items?: TentacledItem[];
  type?: ItemType;
  headings?: NodeHeading[];
  lhId?: string;
  snippet?: string;
  selector?: string;
  nodeLabel?: string;
  boundingRect?: NodeValue;
  path?: string;
  duration?: number;
  startTime?: number;
  networkRequestTime?: number;
  mimeType?: string;
  entity?: Name;
  statusCode?: number;
  transferSize?: number;
  finished?: boolean;
  priority?: Priority;
  resourceSize?: number;
  networkEndTime?: number;
  sessionTargetType?: SessionTargetType;
  url?: string;
  rendererStartTime?: number;
  protocol?: Protocol;
  experimentalFromMainFrame?: boolean;
  resourceType?: string;
  isLinkPreload?: boolean;
  totalBytes?: number;
  timestamp?: number;
  data?: string;
  timing?: number;
  subItems?: PurpleSubItems;
  mainThreadTime?: number;
  timingType?: TimingType;
  name?: string;
}

export interface NodeValue {
  right: number;
  width: number;
  top: number;
  left: number;
  height: number;
  bottom: number;
  id?: string;
}

export enum Name {
  GoogleCDN = 'Google CDN',
  GoogleCOM = 'google.com',
  GoogleFonts = 'Google Fonts',
  OtherGoogleAPIsSDKs = 'Other Google APIs/SDKs',
}

export interface TentacledItem {
  source?: Source;
  reflowTime?: number;
  duration?: number;
  phase?: string;
  label?: string;
}

export interface Source {
  line?: number;
  column?: number;
  type: ValueTypeEnum;
  urlProvider?: string;
  url?: string;
  value?: string;
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

export interface PurpleSubItems {
  items: StickyItem[];
  type: string;
}

export interface StickyItem {
  transferSize: number;
  mainThreadTime: number;
  url: string;
}

export enum TimingType {
  Mark = 'Mark',
  Measure = 'Measure',
}

export enum ItemType {
  Node = 'node',
  Table = 'table',
  Text = 'text',
}

export interface PurpleLongestChain {
  duration: number;
}

export interface NodeElement {
  children?: ChildElement[];
  resourceBytes: number;
  encodedBytes: number;
  unusedBytes: number;
  name: string;
}

export interface ChildElement {
  name: string;
  unusedBytes: number;
  resourceBytes: number;
}

export interface CacheInsightMetricSavings {
  LCP?: number;
  CLS?: number;
}

export interface ClsCulpritsInsight {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  metricSavings: ClsCulpritsInsightMetricSavings;
  details: ClsCulpritsInsightDetails;
}

export interface ClsCulpritsInsightDetails {
  type: string;
  items: IndigoItem[];
}

export interface IndigoItem {
  headings: PurpleHeading[];
  type: string;
  items: IndecentItem[];
  overallSavingsMs?: number;
  isEntityGrouped?: boolean;
}

export interface PurpleHeading {
  label?: string;
  valueType: ValueTypeEnum;
  key: null | string;
  subItemsHeading?: SubItemsHeading;
  granularity?: number;
}

export interface IndecentItem {
  node?: PurpleNode;
  score?: number;
  requestCount?: number;
  transferSize?: number;
  resourceType?: string;
  label?: string;
  url?: string;
  responseTime?: number;
  subItems?: PurpleSubItems;
  mainThreadTime?: number;
  entity?: Name;
  startTime?: number;
  timingType?: TimingType;
  duration?: number;
  name?: string;
}

export interface PurpleNode {
  value?: string;
  type: ItemType;
  boundingRect?: NodeValue;
  lhId?: string;
  path?: string;
  selector?: string;
  nodeLabel?: string;
  snippet?: string;
  items?: NodeItem[];
  headings?: NodeHeading[];
}

export interface NodeItem {
  duration: number;
  phase: string;
  label: string;
}

export interface ClsCulpritsInsightMetricSavings {
  CLS: number;
}

export interface CriticalRequestChains {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  displayValue?: string;
  details?: CriticalRequestChainsDetails;
  numericValue?: number;
  numericUnit?: string;
  metricSavings?: BootupTimeMetricSavings;
  warnings?: any[];
}

export interface CriticalRequestChainsDetails {
  chains?: FluffyChains;
  type: string;
  longestChain?: FluffyLongestChain;
  items?: HilariousItem[];
  headings?: NodeHeading[];
  sortedBy?: string[];
  overallSavingsMs?: number;
  debugData?: TentacledDebugData;
  overallSavingsBytes?: number;
}

export interface FluffyChains {
  '03C004885528E14E5B0147E842D4B116': The03C004885528E14E5B0147E842D4B116;
}

export interface The03C004885528E14E5B0147E842D4B116 {
  request: Request;
  children: Children;
}

export interface Children {
  '03C004885528E14E5B0147E842D4B116:redirect': The03C004885528E14E5B0147E842D4B116Redirect;
}

export interface The03C004885528E14E5B0147E842D4B116Redirect {
  request: Request;
  children: { [key: string]: ChildValue };
}

export interface ChildValue {
  request: Request;
}

export interface Request {
  responseReceivedTime: number;
  transferSize: number;
  url: string;
  endTime: number;
  startTime: number;
}

export interface TentacledDebugData {
  metricSavings: DebugDataMetricSavings;
  type: DebugDataType;
}

export interface DebugDataMetricSavings {
  LCP: number;
  FCP: number;
}

export interface HilariousItem {
  items?: AmbitiousItem[];
  type?: ItemType;
  headings?: NodeHeading[];
  group?: string;
  duration?: number;
  groupLabel?: string;
  origin?: string;
  serverResponseTime?: number;
  wastedBytes?: number;
  totalBytes?: number;
  wastedPercent?: number;
  url?: string;
}

export interface AmbitiousItem {
  node?: PurpleNode;
  timing?: number;
  percent?: string;
  phase?: string;
}

export interface FluffyLongestChain {
  length: number;
  transferSize: number;
  duration: number;
}

export interface CumulativeLayoutShift {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  displayValue?: string;
  details?: CumulativeLayoutShiftDetails;
  numericValue: number;
  numericUnit: string;
  metricSavings?: DebugDataMetricSavings;
}

export interface CumulativeLayoutShiftDetails {
  type: string;
  items: CunningItem[];
  headings?: NodeHeading[];
  overallSavingsMs?: number;
  debugData?: TentacledDebugData;
  overallSavingsBytes?: number;
  sortedBy?: string[];
}

export interface CunningItem {
  newEngineResult?: NewEngineResult;
  newEngineResultDiffered?: boolean;
  cumulativeLayoutShiftMainFrame?: number;
  observedTraceEnd?: number;
  firstContentfulPaint?: number;
  observedLastVisualChangeTs?: number;
  observedFirstPaint?: number;
  observedSpeedIndex?: number;
  observedLargestContentfulPaintAllFrames?: number;
  observedLoad?: number;
  observedNavigationStart?: number;
  observedLargestContentfulPaint?: number;
  observedCumulativeLayoutShiftMainFrame?: number;
  maxPotentialFID?: number;
  observedFirstContentfulPaintTs?: number;
  largestContentfulPaint?: number;
  observedNavigationStartTs?: number;
  observedDomContentLoadedTs?: number;
  observedLoadTs?: number;
  observedSpeedIndexTs?: number;
  observedDomContentLoaded?: number;
  observedLastVisualChange?: number;
  observedCumulativeLayoutShift?: number;
  timeToFirstByte?: number;
  speedIndex?: number;
  observedTraceEndTs?: number;
  observedFirstContentfulPaint?: number;
  observedTimeOriginTs?: number;
  observedFirstVisualChange?: number;
  observedLargestContentfulPaintTs?: number;
  observedFirstContentfulPaintAllFramesTs?: number;
  observedFirstPaintTs?: number;
  cumulativeLayoutShift?: number;
  observedTimeOrigin?: number;
  observedFirstVisualChangeTs?: number;
  observedFirstContentfulPaintAllFrames?: number;
  interactive?: number;
  observedLargestContentfulPaintAllFramesTs?: number;
  totalBlockingTime?: number;
  lcpInvalidated?: boolean;
  wastedMs?: number;
  url?: string;
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
  scoreDisplayMode: ScoreDisplayMode;
  metricSavings: DebugDataMetricSavings;
  details: DocumentLatencyInsightDetails;
}

export interface DocumentLatencyInsightDetails {
  items: Items;
  type: string;
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
  scoreDisplayMode: ScoreDisplayMode;
  displayValue: string;
  metricSavings?: DOMSizeMetricSavings;
  details?: DOMSizeDetails;
  numericValue: number;
  numericUnit: string;
}

export interface DOMSizeDetails {
  headings: NodeHeading[];
  type: ItemType;
  items: MagentaItem[];
}

export interface MagentaItem {
  value: Value;
  statistic: string;
  node?: PurpleNode;
}

export interface Value {
  value: number;
  type: ValueTypeEnum;
  granularity: number;
}

export interface DOMSizeMetricSavings {
  TBT: number;
}

export interface DOMSizeInsight {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: ScoreDisplayMode;
  metricSavings?: DOMSizeInsightMetricSavings;
  details?: DOMSizeInsightDetails;
  warnings?: any[];
  displayValue?: string;
  explanation?: string;
}

export interface DOMSizeInsightDetails {
  type: ItemType;
  items: FriskyItem[];
  headings: PurpleHeading[];
  summary?: FluffySummary;
  isEntityGrouped?: boolean;
}

export interface FriskyItem {
  value?: Value;
  statistic?: string;
  node?: PurpleNode;
  score?: number;
  subItems?: FluffySubItems;
  requestCount?: number;
  transferSize?: number;
  resourceType?: string;
  label?: string;
  entity?: Name;
  tbtImpact?: number;
  mainThreadTime?: number;
  blockingTime?: number;
}

export interface FluffySubItems {
  items: MischievousItem[];
  type: string;
}

export interface MischievousItem {
  animation?: string;
  failureReason?: string;
  url?: string;
  tbtImpact?: number;
  transferSize?: number;
  blockingTime?: number;
  mainThreadTime?: number;
}

export interface FluffySummary {
  wastedMs: number;
  wastedBytes: number;
}

export interface DOMSizeInsightMetricSavings {
  INP?: number;
  CLS?: number;
  TBT?: number;
}

export interface DuplicatedJavascript {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  metricSavings?: DebugDataMetricSavings;
  details?: DuplicatedJavascriptDetails;
  numericValue: number;
  numericUnit: string;
  warnings?: any[];
  displayValue?: string;
}

export interface DuplicatedJavascriptDetails {
  overallSavingsMs?: number;
  type: string;
  overallSavingsBytes?: number;
  headings: NodeHeading[];
  debugData?: TentacledDebugData;
  items: BraggadociousItem[];
  sortedBy: string[];
}

export interface BraggadociousItem {
  totalBytes: number;
  url: string;
}

export interface UsesRelPreconnect {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  metricSavings: DebugDataMetricSavings;
  details: UsesRelPreconnectDetails;
  warnings: any[];
  numericValue: number;
  numericUnit: string;
}

export interface UsesRelPreconnectDetails {
  items: Item1[];
  summary?: PurpleSummary;
  type: string;
  sortedBy: string[];
  headings: NodeHeading[];
  overallSavingsMs?: number;
}

export interface Item1 {
  total: number;
  scriptParseCompile: number;
  scripting: number;
  url: string;
}

export interface Categories {
  performance: Performance;
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
  group: Group;
  acronym?: string;
}

export enum Group {
  Diagnostics = 'diagnostics',
  Hidden = 'hidden',
  Metrics = 'metrics',
}

export interface CategoryGroups {
  diagnostics: A11YAria;
  'seo-mobile': A11YAria;
  'a11y-color-contrast': A11YAria;
  metrics: BestPracticesBrowserCompat;
  'a11y-language': A11YAria;
  'a11y-tables-lists': A11YAria;
  'a11y-names-labels': A11YAria;
  'a11y-aria': A11YAria;
  'a11y-navigation': A11YAria;
  'seo-crawl': A11YAria;
  'best-practices-browser-compat': BestPracticesBrowserCompat;
  'best-practices-trust-safety': BestPracticesBrowserCompat;
  insights: A11YAria;
  'best-practices-general': BestPracticesBrowserCompat;
  'best-practices-ux': BestPracticesBrowserCompat;
  'a11y-audio-video': A11YAria;
  'seo-content': A11YAria;
  'a11y-best-practices': A11YAria;
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
}

export interface FullPageScreenshot {
  nodes: { [key: string]: NodeValue };
  screenshot: Screenshot;
}

export interface Screenshot {
  data: string;
  height: number;
  width: number;
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
