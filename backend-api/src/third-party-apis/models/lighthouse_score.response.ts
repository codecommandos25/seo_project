export interface LighthouseScoreResponse {
  version: string;
  status_code: number;
  status_message: string;
  time: string;
  cost: number;
  tasks_count: number;
  tasks_error: number;
  tasks: DemoTask[];
}

export interface DemoTask {
  id: string;
  status_code: number;
  status_message: string;
  time: string;
  cost: number;
  result_count: number;
  path: string[];
  data: TaskData;
  result: Result[];
}

export interface TaskData {
  api: string;
  function: string;
  url: string;
  for_mobile: boolean;
  categories: string[];
  audits: string[];
}

export interface Result {
  lighthouseVersion: string;
  requestedUrl: string;
  mainDocumentUrl: string;
  finalDisplayedUrl: string;
  finalUrl: string;
  fetchTime: Date;
  gatherMode: string;
  runWarnings: any[];
  userAgent: string;
  environment: Environment;
  audits: Audits;
  configSettings: ConfigSettings;
  categories: Categories;
  categoryGroups: CategoryGroups;
  stackPacks: StackPack[];
  entities: Entity[];
  fullPageScreenshot: FullPageScreenshot;
  timing: Timing;
  i18n: I18N;
}

export interface Audits {
  'is-on-https': Accesskeys;
  'redirects-http': Accesskeys;
  viewport: Viewport;
  'first-contentful-paint': CumulativeLayoutShift;
  'largest-contentful-paint': CumulativeLayoutShift;
  'first-meaningful-paint': Accesskeys;
  'speed-index': CumulativeLayoutShift;
  'screenshot-thumbnails': Accesskeys;
  'final-screenshot': Accesskeys;
  'total-blocking-time': CumulativeLayoutShift;
  'max-potential-fid': CumulativeLayoutShift;
  'cumulative-layout-shift': CumulativeLayoutShift;
  'errors-in-console': Accesskeys;
  'server-response-time': Redirects;
  interactive: CumulativeLayoutShift;
  'user-timings': CumulativeLayoutShift;
  'critical-request-chains': CriticalRequestChains;
  redirects: Redirects;
  'image-aspect-ratio': Accesskeys;
  'image-size-responsive': Accesskeys;
  deprecations: Accesskeys;
  'third-party-cookies': CumulativeLayoutShift;
  'mainthread-work-breakdown': DOMSize;
  'bootup-time': BootupTime;
  'uses-rel-preconnect': UsesRelPreconnect;
  'font-display': Accesskeys;
  diagnostics: Accesskeys;
  'network-requests': Accesskeys;
  'network-rtt': CumulativeLayoutShift;
  'network-server-latency': CumulativeLayoutShift;
  'main-thread-tasks': CumulativeLayoutShift;
  metrics: CumulativeLayoutShift;
  'resource-summary': Accesskeys;
  'third-party-summary': LongTasks;
  'third-party-facades': LongTasks;
  'largest-contentful-paint-element': LargestContentfulPaintElement;
  'lcp-lazy-loaded': CriticalRequestChains;
  'layout-shifts': LayoutShifts;
  'long-tasks': LongTasks;
  'non-composited-animations': Accesskeys;
  'unsized-images': CumulativeLayoutShift;
  'valid-source-maps': Accesskeys;
  'prioritize-lcp-image': CriticalRequestChains;
  'csp-xss': Accesskeys;
  'script-treemap-data': CumulativeLayoutShift;
  accesskeys: Accesskeys;
  'aria-allowed-attr': Accesskeys;
  'aria-allowed-role': Accesskeys;
  'aria-command-name': Accesskeys;
  'aria-conditional-attr': Accesskeys;
  'aria-deprecated-role': Accesskeys;
  'aria-dialog-name': Accesskeys;
  'aria-hidden-body': Accesskeys;
  'aria-hidden-focus': Accesskeys;
  'aria-input-field-name': Accesskeys;
  'aria-meter-name': Accesskeys;
  'aria-progressbar-name': Accesskeys;
  'aria-prohibited-attr': Accesskeys;
  'aria-required-attr': Accesskeys;
  'aria-required-children': Accesskeys;
  'aria-required-parent': Accesskeys;
  'aria-roles': Accesskeys;
  'aria-text': Accesskeys;
  'aria-toggle-field-name': Accesskeys;
  'aria-tooltip-name': Accesskeys;
  'aria-treeitem-name': Accesskeys;
  'aria-valid-attr-value': Accesskeys;
  'aria-valid-attr': Accesskeys;
  'button-name': Accesskeys;
  bypass: Accesskeys;
  'color-contrast': Accesskeys;
  'definition-list': Accesskeys;
  dlitem: Accesskeys;
  'document-title': Accesskeys;
  'duplicate-id-aria': Accesskeys;
  'empty-heading': Accesskeys;
  'form-field-multiple-labels': Accesskeys;
  'frame-title': Accesskeys;
  'heading-order': Accesskeys;
  'html-has-lang': Accesskeys;
  'html-lang-valid': Accesskeys;
  'html-xml-lang-mismatch': Accesskeys;
  'identical-links-same-purpose': Accesskeys;
  'image-alt': Accesskeys;
  'image-redundant-alt': Accesskeys;
  'input-button-name': Accesskeys;
  'input-image-alt': Accesskeys;
  'label-content-name-mismatch': Accesskeys;
  label: Accesskeys;
  'landmark-one-main': Accesskeys;
  'link-name': Accesskeys;
  'link-in-text-block': Accesskeys;
  list: CumulativeLayoutShift;
  listitem: Accesskeys;
  'meta-refresh': Accesskeys;
  'meta-viewport': Accesskeys;
  'object-alt': Accesskeys;
  'select-name': Accesskeys;
  'skip-link': Accesskeys;
  tabindex: CumulativeLayoutShift;
  'table-duplicate-name': CumulativeLayoutShift;
  'table-fake-caption': CumulativeLayoutShift;
  'target-size': CumulativeLayoutShift;
  'td-has-header': CumulativeLayoutShift;
  'td-headers-attr': CumulativeLayoutShift;
  'th-has-data-cells': CumulativeLayoutShift;
  'valid-lang': Accesskeys;
  'video-caption': CumulativeLayoutShift;
  'custom-controls-labels': Accesskeys;
  'custom-controls-roles': Accesskeys;
  'focus-traps': Accesskeys;
  'focusable-controls': Accesskeys;
  'interactive-element-affordance': Accesskeys;
  'logical-tab-order': Accesskeys;
  'managed-focus': CumulativeLayoutShift;
  'offscreen-content-hidden': Accesskeys;
  'use-landmarks': CumulativeLayoutShift;
  'visual-order-follows-dom': Accesskeys;
  'uses-long-cache-ttl': CumulativeLayoutShift;
  'total-byte-weight': CumulativeLayoutShift;
  'offscreen-images': DuplicatedJavascript;
  'render-blocking-resources': Redirects;
  'unminified-css': DuplicatedJavascript;
  'unminified-javascript': DuplicatedJavascript;
  'unused-css-rules': DuplicatedJavascript;
  'unused-javascript': DuplicatedJavascript;
  'modern-image-formats': DuplicatedJavascript;
  'uses-optimized-images': DuplicatedJavascript;
  'uses-text-compression': DuplicatedJavascript;
  'uses-responsive-images': DuplicatedJavascript;
  'efficient-animated-content': DuplicatedJavascript;
  'duplicated-javascript': DuplicatedJavascript;
  'legacy-javascript': DuplicatedJavascript;
  doctype: Accesskeys;
  charset: Accesskeys;
  'dom-size': DOMSize;
  'geolocation-on-start': Accesskeys;
  'inspector-issues': Accesskeys;
  'no-document-write': Accesskeys;
  'js-libraries': Accesskeys;
  'notification-on-start': CumulativeLayoutShift;
  'paste-preventing-inputs': Accesskeys;
  'uses-http2': Redirects;
  'uses-passive-event-listeners': CriticalRequestChains;
  'meta-description': Accesskeys;
  'http-status-code': Accesskeys;
  'font-size': Accesskeys;
  'link-text': CumulativeLayoutShift;
  'crawlable-anchors': Accesskeys;
  'is-crawlable': Accesskeys;
  'robots-txt': CumulativeLayoutShift;
  hreflang: Accesskeys;
  canonical: Accesskeys;
  'structured-data': CumulativeLayoutShift;
  'bf-cache': Accesskeys;
}

export interface Accesskeys {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: ScoreDisplayMode;
  details?: AccesskeysDetails;
  displayValue?: string;
  guidanceLevel?: number;
  warnings?: string[];
  metricSavings?: AccesskeysMetricSavings;
}

export interface AccesskeysDetails {
  type: DebugDataType;
  headings?: Heading[];
  items?: PurpleItem[];
  debugData?: PurpleDebugData;
  timing?: number;
  timestamp?: number;
  data?: string;
  scale?: number;
}

export interface PurpleDebugData {
  type: DebugDataType;
  impact?: string;
  tags?: string[];
  stacks?: Stack[];
  networkStartTimeTs?: number;
}

export interface Stack {
  id: string;
  version?: string;
}

export enum DebugDataType {
  Debugdata = 'debugdata',
  Filmstrip = 'filmstrip',
  Screenshot = 'screenshot',
  Table = 'table',
}

export interface Heading {
  key: null | string;
  valueType: ValueTypeEnum;
  subItemsHeading?: SubItemsHeading;
  label: string;
  granularity?: number;
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
  node?: RelatedNodeClass;
  reason?: string;
  failureType?: string;
  subItems?: PurpleSubItems;
  protocolReason?: string;
  severity?: Rity;
  description?: string;
  numRequests?: number;
  numScripts?: number;
  numStylesheets?: number;
  numFonts?: number;
  numTasks?: number;
  numTasksOver10ms?: number;
  numTasksOver25ms?: number;
  numTasksOver50ms?: number;
  numTasksOver100ms?: number;
  numTasksOver500ms?: number;
  rtt?: number;
  throughput?: number;
  maxRtt?: number;
  maxServerLatency?: number;
  totalByteWeight?: number;
  totalTaskTime?: number;
  mainDocumentTransferSize?: number;
  url?: string;
  wastedMs?: number;
  issueType?: string;
  name?: string;
  version?: string;
  npm?: string;
  sessionTargetType?: SessionTargetType;
  protocol?: Protocol;
  rendererStartTime?: number;
  networkRequestTime?: number;
  networkEndTime?: number;
  finished?: boolean;
  transferSize?: number;
  resourceSize?: number;
  statusCode?: number;
  mimeType?: MIMEType;
  resourceType?: string;
  priority?: Rity;
  experimentalFromMainFrame?: boolean;
  entity?: Name;
  isLinkPreload?: boolean;
  label?: string;
  requestCount?: number;
  timing?: number;
  timestamp?: number;
  data?: string;
}

export enum Name {
  CDNCookieyesCOM = 'cdn-cookieyes.com',
  CookieyesCOM = 'cookieyes.com',
  DataforseoCOM = 'dataforseo.com',
  FeaturebaseApp = 'featurebase.app',
  GoogleAnalytics = 'Google Analytics',
  GoogleDoubleclickAds = 'Google/Doubleclick Ads',
  GoogleFonts = 'Google Fonts',
  GoogleMaps = 'Google Maps',
  GoogleTagManager = 'Google Tag Manager',
  SendpulseCOM = 'sendpulse.com',
  SppopupsCOM = 'sppopups.com',
}

export enum MIMEType {
  ApplicationJSON = 'application/json',
  ApplicationJavascript = 'application/javascript',
  ApplicationOctetStream = 'application/octet-stream',
  Empty = '',
  FontWoff2 = 'font/woff2',
  ImageJPEG = 'image/jpeg',
  ImagePNG = 'image/png',
  ImageSVGXML = 'image/svg+xml',
  ImageWebp = 'image/webp',
  TextCSS = 'text/css',
  TextHTML = 'text/html',
  TextJavascript = 'text/javascript',
  TextPlain = 'text/plain',
}

export interface RelatedNodeClass {
  type: ValueTypeEnum;
  lhId?: string;
  path?: string;
  selector?: string;
  boundingRect?: NodeValue;
  snippet?: string;
  nodeLabel?: string;
  explanation?: string;
  value?: string;
}

export interface NodeValue {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
  id?: string;
}

export enum Rity {
  High = 'High',
  Low = 'Low',
  Medium = 'Medium',
  VeryHigh = 'VeryHigh',
  VeryLow = 'VeryLow',
}

export enum Protocol {
  H2 = 'h2',
}

export enum SessionTargetType {
  Iframe = 'iframe',
  Page = 'page',
}

export interface PurpleSubItems {
  type: SubItemsType;
  items: FluffyItem[];
}

export interface FluffyItem {
  frameUrl?: string;
  relatedNode?: RelatedNodeClass;
  url?: string;
  failureReason?: string;
  animation?: string;
}

export enum SubItemsType {
  Subitems = 'subitems',
}

export interface AccesskeysMetricSavings {
  CLS: number;
}

export enum ScoreDisplayMode {
  Binary = 'binary',
  Informative = 'informative',
  Manual = 'manual',
  MetricSavings = 'metricSavings',
  NotApplicable = 'notApplicable',
  Numeric = 'numeric',
}

export interface BootupTime {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  numericValue: number;
  numericUnit: NumericUnit;
  displayValue: string;
  metricSavings: BootupTimeMetricSavings;
  details: BootupTimeDetails;
  guidanceLevel: number;
}

export interface BootupTimeDetails {
  type: DebugDataType;
  headings: Heading[];
  items: TentacledItem[];
  summary: CoreLIBI18NI18NJSDisplayValueMSSavingSummary;
  sortedBy: string[];
}

export interface TentacledItem {
  url: string;
  total: number;
  scripting: number;
  scriptParseCompile: number;
}

export interface CoreLIBI18NI18NJSDisplayValueMSSavingSummary {
  wastedMs: number;
}

export interface BootupTimeMetricSavings {
  TBT: number;
}

export enum NumericUnit {
  Byte = 'byte',
  Millisecond = 'millisecond',
  Unitless = 'unitless',
}

export interface CriticalRequestChains {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: ScoreDisplayMode;
  displayValue?: string;
  details?: CriticalRequestChainsDetails;
  guidanceLevel: number;
  metricSavings?: CriticalRequestChainsMetricSavings;
}

export interface CriticalRequestChainsDetails {
  type: string;
  chains?: Chains;
  longestChain?: LongestChain;
  headings?: Heading[];
  items?: StickyItem[];
}

export interface Chains {
  B369F9663E73102EDE63C786FD045FD0: B369F9663E73102Ede63C786Fd045Fd0;
}

export interface B369F9663E73102Ede63C786Fd045Fd0 {
  request: Request;
  children: B369F9663E73102EDE63C786FD045FD0Children;
}

export interface B369F9663E73102EDE63C786FD045FD0Children {
  '193527.5': The193527;
  '193527.6': The193527;
  '193527.7': The193527;
  '193527.8': The193527;
  '193527.9': The193527;
  '193527.10': The193527;
  '193527.11': The193527;
  '193527.12': The193527;
  '193527.13': The193527;
  '193527.14': The193527;
  '193527.15': The193527;
  '193527.16': The193527;
  '193527.17': The193527;
  '193527.18': The193527;
  '193527.19': The193527;
  '193527.20': The193527;
  '193527.21': The193527;
  '193527.22': The193527;
  '193527.23': The193527;
  '193527.24': The193527;
  '193527.25': The19352725;
  '193527.26': The193527;
  '193527.27': The193527;
  '193527.28': The193527;
  '193527.29': The19352729;
  '193527.30': The193527;
  '193527.31': The193527;
  '193527.32': The193527;
  '193527.33': The193527;
  '193527.34': The193527;
  '193527.35': The193527;
  '193527.87': The19352787;
  '193527.155': The193527;
  '193527.156': The193527;
  '193527.157': The193527;
  '193527.158': The193527;
  '193527.159': The193527;
  '193527.160': The193527;
  '193527.161': The193527;
  '193527.162': The193527;
  '193527.163': The193527;
  '193527.164': The193527;
  '193527.165': The193527;
  '193527.166': The193527;
  '193527.167': The193527;
  '193527.168': The193527;
  '193527.169': The193527;
  '193527.170': The193527;
  '193527.171': The193527;
  '193527.172': The193527;
  '193527.173': The193527;
  '193527.174': The193527;
  '193527.175': The193527;
  '193527.176': The193527;
  '193527.177': The193527;
  '193527.178': The193527;
  '193527.179': The193527;
  '193527.180': The193527;
  '193527.181': The193527;
  '193527.182': The193527;
  '193527.183': The193527;
  '193527.184': The193527;
  '193527.185': The193527;
  '193527.186': The193527;
  '193527.187': The193527;
  '193527.188': The193527;
  '193527.189': The193527;
  '193527.190': The193527;
  '193527.191': The193527;
  '193527.192': The193527;
  '193527.193': The193527;
  '193527.194': The193527;
  '193527.195': The193527;
  '193527.196': The193527;
  '193527.197': The193527;
  '193527.198': The193527;
  '193527.199': The193527;
  '193527.200': The193527;
  '193527.370': The193527;
  '193527.280': The193527;
  '193527.325': The193527;
  '193527.36': The193527;
  '193527.70': The193527;
  '193527.71': The193527;
  '193527.72': The193527;
  '193527.73': The193527;
  '193527.74': The193527;
  '193527.75': The193527;
  '193527.76': The193527;
  '193527.77': The193527;
  '193527.78': The193527;
  '193527.79': The193527;
  '193527.80': The193527;
  '193527.81': The193527;
  '193527.82': The193527;
  '193527.83': The193527;
  '193527.84': The193527;
  '193527.85': The193527;
  '193527.86': The193527;
}

export interface The193527 {
  request: Request;
}

export interface Request {
  url: string;
  startTime: number;
  endTime: number;
  responseReceivedTime: number;
  transferSize: number;
}

export interface The19352725 {
  request: Request;
  children: The19352725_Children;
}

export interface The19352725_Children {
  '193527.540': The193527;
}

export interface The19352729 {
  request: Request;
  children: The19352729_Children;
}

export interface The19352729_Children {
  '193527.561': The193527;
}

export interface The19352787 {
  request: Request;
  children: The19352787_Children;
}

export interface The19352787_Children {
  '193527.574': The193527;
}

export interface StickyItem {
  source: Source;
}

export interface Source {
  type: ValueTypeEnum;
  url: string;
  urlProvider: URLProvider;
  line: number;
  column: number;
}

export enum URLProvider {
  Network = 'network',
}

export interface LongestChain {
  duration: number;
  length: number;
  transferSize: number;
}

export interface CriticalRequestChainsMetricSavings {
  LCP: number;
}

export interface CumulativeLayoutShift {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: ScoreDisplayMode;
  numericValue?: number;
  numericUnit?: NumericUnit;
  displayValue?: string;
  scoringOptions?: ScoringOptions;
  details?: CumulativeLayoutShiftDetails;
  guidanceLevel?: number;
  metricSavings?: AccesskeysMetricSavings;
}

export interface CumulativeLayoutShiftDetails {
  type: PurpleType;
  items?: IndigoItem[];
  headings?: Heading[];
  observedMaxDurationLoaf?: ObservedMaxLoaf;
  observedMaxBlockingLoaf?: ObservedMaxLoaf;
  observedLoafs?: ObservedLoaf[];
  sortedBy?: string[];
  nodes?: NodeElement[];
  debugData?: FluffyDebugData;
  summary?: CoreLIBI18NI18NJSDisplayValueByteSavingSummary;
  skipSumming?: string[];
}

export interface FluffyDebugData {
  type: DebugDataType;
  impact: string;
  tags: string[];
}

export interface IndigoItem {
  cumulativeLayoutShiftMainFrame?: number;
  newEngineResult?: NewEngineResult;
  newEngineResultDiffered?: boolean;
  href?: string;
  text?: Text;
  duration?: number;
  startTime?: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  interactive?: number;
  speedIndex?: number;
  totalBlockingTime?: number;
  maxPotentialFID?: number;
  cumulativeLayoutShift?: number;
  timeToFirstByte?: number;
  observedTimeOrigin?: number;
  observedTimeOriginTs?: number;
  observedNavigationStart?: number;
  observedNavigationStartTs?: number;
  observedFirstPaint?: number;
  observedFirstPaintTs?: number;
  observedFirstContentfulPaint?: number;
  observedFirstContentfulPaintTs?: number;
  observedFirstContentfulPaintAllFrames?: number;
  observedFirstContentfulPaintAllFramesTs?: number;
  observedLargestContentfulPaint?: number;
  observedLargestContentfulPaintTs?: number;
  observedLargestContentfulPaintAllFrames?: number;
  observedLargestContentfulPaintAllFramesTs?: number;
  observedTraceEnd?: number;
  observedTraceEndTs?: number;
  observedLoad?: number;
  observedLoadTs?: number;
  observedDomContentLoaded?: number;
  observedDomContentLoadedTs?: number;
  observedCumulativeLayoutShift?: number;
  observedCumulativeLayoutShiftMainFrame?: number;
  observedFirstVisualChange?: number;
  observedFirstVisualChangeTs?: number;
  observedLastVisualChange?: number;
  observedLastVisualChangeTs?: number;
  observedSpeedIndex?: number;
  observedSpeedIndexTs?: number;
  lcpInvalidated?: boolean;
  origin?: string;
  rtt?: number;
  serverResponseTime?: number;
  node?: RelatedNodeClass;
  subItems?: FluffySubItems;
  name?: string;
  url?: string;
  totalBytes?: number;
  cacheLifetimeMs?: number;
  cacheHitProbability?: number;
  wastedBytes?: number;
  debugData?: TentacledDebugData;
}

export interface TentacledDebugData {
  type: DebugDataType;
  'max-age': number;
  public?: boolean;
  'no-transform'?: boolean;
}

export interface NewEngineResult {
  cumulativeLayoutShift: number;
  cumulativeLayoutShiftMainFrame: number;
}

export interface FluffySubItems {
  type: SubItemsType;
  items: IndecentItem[];
}

export interface IndecentItem {
  relatedNode: RelatedNodeClass;
}

export enum Text {
  LearnMore = 'LEARN MORE',
}

export interface NodeElement {
  name: string;
  resourceBytes: number;
  unusedBytes: number;
  children?: NodeElement[];
}

export interface ObservedLoaf {
  startTime: number;
  duration: number;
  blockingDuration: number;
}

export interface ObservedMaxLoaf {
  args: Args;
  cat: string;
  id2: Id2;
  name: string;
  ph: string;
  pid: number;
  scope: string;
  tid: number;
  ts: number;
}

export interface Args {
  data: ArgsData;
}

export interface ArgsData {
  blockingDuration: number;
  duration: number;
  numScripts: number;
  renderDuration: number;
  styleAndLayoutDuration: number;
}

export interface Id2 {
  local: string;
}

export interface CoreLIBI18NI18NJSDisplayValueByteSavingSummary {
  wastedBytes: number;
}

export enum PurpleType {
  Debugdata = 'debugdata',
  Table = 'table',
  TreemapData = 'treemap-data',
}

export interface ScoringOptions {
  p10: number;
  median: number;
}

export interface DOMSize {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  numericValue: number | number;
  numericUnit: string;
  displayValue: string;
  metricSavings: BootupTimeMetricSavings;
  details: DetailsElement;
  guidanceLevel: number;
}

export interface DetailsElement {
  type: ItemType;
  headings: Heading[];
  items: ItemItem[];
  debugData?: PurpleDebugData;
  sortedBy?: string[];
  overallSavingsMs?: number;
}

export interface ItemItem {
  node?: RelatedNodeClass;
  reason?: string;
  failureType?: string;
  subItems?: TentacledSubItems;
  protocolReason?: string;
  severity?: Rity;
  description?: string;
  statistic?: string;
  value?: Value;
  url?: string;
  wastedMs?: number;
  issueType?: string;
  name?: string;
  version?: string;
  npm?: string;
  phase?: string;
  timing?: number;
  percent?: string;
  score?: number;
  href?: string;
  text?: Text;
  duration?: number;
  startTime?: number;
  group?: string;
  groupLabel?: string;
  sessionTargetType?: SessionTargetType;
  protocol?: Protocol;
  rendererStartTime?: number;
  networkRequestTime?: number;
  networkEndTime?: number;
  finished?: boolean;
  transferSize?: number;
  resourceSize?: number;
  statusCode?: number;
  mimeType?: MIMEType;
  resourceType?: string;
  priority?: Rity;
  experimentalFromMainFrame?: boolean;
  entity?: Name;
  isLinkPreload?: boolean;
  origin?: string;
  rtt?: number;
  serverResponseTime?: number;
  totalBytes?: number;
  label?: string;
  requestCount?: number;
  responseTime?: number;
  source?: Source;
}

export interface TentacledSubItems {
  type: SubItemsType;
  items: HilariousItem[];
}

export interface HilariousItem {
  frameUrl?: string;
  relatedNode?: RelatedNodeClass;
  url?: string;
  extra?: RelatedNodeClass;
  cause?: Cause;
  failureReason?: string;
  animation?: string;
}

export enum Cause {
  ALateNetworkRequestAdjustedThePageLayout = 'A late network request adjusted the page layout',
  MediaElementLackingAnExplicitSize = 'Media element lacking an explicit size',
}

export interface Value {
  type: ValueTypeEnum;
  granularity: number;
  value: number;
}

export enum ItemType {
  Opportunity = 'opportunity',
  Table = 'table',
}

export interface DuplicatedJavascript {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  numericValue: number;
  numericUnit: NumericUnit;
  displayValue: string;
  metricSavings: DebugDataMetricSavings;
  details: DuplicatedJavascriptDetails;
  guidanceLevel: number;
  warnings?: any[];
}

export interface DuplicatedJavascriptDetails {
  type: ItemType;
  headings: Heading[];
  items: AmbitiousItem[];
  overallSavingsMs: number;
  overallSavingsBytes: number;
  sortedBy: SortedBy[];
  debugData: StickyDebugData;
}

export interface StickyDebugData {
  type: DebugDataType;
  metricSavings: DebugDataMetricSavings;
}

export interface DebugDataMetricSavings {
  FCP: number;
  LCP: number;
}

export interface AmbitiousItem {
  url: string;
  wastedBytes: number;
  subItems?: StickySubItems;
  totalBytes: number;
  node?: RelatedNodeClass;
  fromProtocol?: boolean;
  isCrossOrigin?: boolean;
  wastedWebpBytes?: number;
  requestStartTime?: number;
  wastedPercent?: number;
}

export interface StickySubItems {
  type: SubItemsType;
  items: CunningItem[];
}

export interface CunningItem {
  signal: string;
  location: Source;
}

export enum SortedBy {
  WastedBytes = 'wastedBytes',
}

export interface LargestContentfulPaintElement {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  displayValue: string;
  metricSavings: CriticalRequestChainsMetricSavings;
  details: LargestContentfulPaintElementDetails;
  guidanceLevel: number;
}

export interface LargestContentfulPaintElementDetails {
  type: string;
  items: DetailsElement[];
}

export interface LayoutShifts {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  displayValue: string;
  metricSavings: AccesskeysMetricSavings;
  details: DetailsElement;
  guidanceLevel: number;
}

export interface LongTasks {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: ScoreDisplayMode;
  displayValue?: string;
  metricSavings: BootupTimeMetricSavings;
  details?: LongTasksDetails;
  guidanceLevel: number;
}

export interface LongTasksDetails {
  type: DebugDataType;
  headings: Heading[];
  items: MagentaItem[];
  sortedBy?: string[];
  skipSumming?: string[];
  debugData?: IndigoDebugData;
  summary?: PurpleSummary;
  isEntityGrouped?: boolean;
}

export interface IndigoDebugData {
  type: DebugDataType;
  urls: string[];
  tasks: DebugDataTask[];
}

export interface DebugDataTask {
  urlIndex: number;
  startTime: number;
  duration: number;
  other: number;
  scriptEvaluation?: number;
  paintCompositeRender?: number;
  styleLayout?: number;
}

export interface MagentaItem {
  url?: string;
  duration?: number;
  startTime?: number;
  mainThreadTime?: number;
  blockingTime?: number;
  transferSize?: number;
  tbtImpact?: number;
  entity?: Name;
  subItems?: IndigoSubItems;
}

export interface IndigoSubItems {
  type: SubItemsType;
  items: FriskyItem[];
}

export interface FriskyItem {
  url: string;
  mainThreadTime: number;
  blockingTime: number;
  transferSize: number;
  tbtImpact: number;
}

export interface PurpleSummary {
  wastedBytes: number;
  wastedMs: number;
}

export interface Redirects {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  numericValue: number;
  numericUnit: NumericUnit;
  displayValue?: string;
  metricSavings: DebugDataMetricSavings;
  details: DetailsElement;
  guidanceLevel: number;
}

export interface UsesRelPreconnect {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  numericValue: number;
  numericUnit: NumericUnit;
  displayValue: string;
  warnings: any[];
  metricSavings: DebugDataMetricSavings;
  details: DetailsElement;
  guidanceLevel: number;
}

export interface Viewport {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: ScoreDisplayMode;
  warnings: any[];
  metricSavings: ViewportMetricSavings;
  details: ViewportDetails;
  guidanceLevel: number;
}

export interface ViewportDetails {
  type: DebugDataType;
  viewportContent: string;
}

export interface ViewportMetricSavings {
  INP: number;
}

export interface Categories {
  performance: BestPractices;
  accessibility: Accessibility;
  'best-practices': BestPractices;
  seo: Accessibility;
}

export interface Accessibility {
  title: string;
  description: string;
  manualDescription: string;
  supportedModes: string[];
  auditRefs: AuditRef[];
  id: string;
  score: number;
}

export interface AuditRef {
  id: string;
  weight: number;
  group?: string;
  acronym?: string;
}

export interface BestPractices {
  title: string;
  supportedModes: string[];
  auditRefs: AuditRef[];
  id: string;
  score: number;
}

export interface CategoryGroups {
  metrics: BestPracticesBrowserCompat;
  diagnostics: A11YAria;
  'a11y-best-practices': A11YAria;
  'a11y-color-contrast': A11YAria;
  'a11y-names-labels': A11YAria;
  'a11y-navigation': A11YAria;
  'a11y-aria': A11YAria;
  'a11y-language': A11YAria;
  'a11y-audio-video': A11YAria;
  'a11y-tables-lists': A11YAria;
  'seo-mobile': A11YAria;
  'seo-content': A11YAria;
  'seo-crawl': A11YAria;
  'best-practices-trust-safety': BestPracticesBrowserCompat;
  'best-practices-ux': BestPracticesBrowserCompat;
  'best-practices-browser-compat': BestPracticesBrowserCompat;
  'best-practices-general': BestPracticesBrowserCompat;
  hidden: BestPracticesBrowserCompat;
}

export interface A11YAria {
  title: string;
  description: string;
}

export interface BestPracticesBrowserCompat {
  title: string;
}

export interface ConfigSettings {
  output: string[];
  maxWaitForFcp: number;
  maxWaitForLoad: number;
  pauseAfterFcpMs: number;
  pauseAfterLoadMs: number;
  networkQuietThresholdMs: number;
  cpuQuietThresholdMs: number;
  formFactor: string;
  throttling: Throttling;
  throttlingMethod: string;
  screenEmulation: ScreenEmulation;
  emulatedUserAgent: string;
  auditMode: boolean;
  gatherMode: boolean;
  clearStorageTypes: string[];
  disableStorageReset: boolean;
  debugNavigation: boolean;
  channel: string;
  usePassiveGathering: boolean;
  disableFullPageScreenshot: boolean;
  skipAboutBlank: boolean;
  blankPage: string;
  ignoreStatusCode: boolean;
  locale: string;
  blockedUrlPatterns: null;
  additionalTraceCategories: null;
  extraHeaders: null;
  precomputedLanternData: null;
  onlyAudits: null;
  onlyCategories: null;
  skipAudits: string[];
}

export interface ScreenEmulation {
  mobile: boolean;
  width: number;
  height: number;
  deviceScaleFactor: number;
  disabled: boolean;
}

export interface Throttling {
  rttMs: number;
  throughputKbps: number;
  requestLatencyMs: number;
  downloadThroughputKbps: number;
  uploadThroughputKbps: number;
  cpuSlowdownMultiplier: number;
}

export interface Entity {
  name: Name;
  origins: string[];
  isFirstParty?: boolean;
  isUnrecognized?: boolean;
  homepage?: string;
  category?: string;
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
  screenshot: Screenshot;
  nodes: { [key: string]: NodeValue };
}

export interface Screenshot {
  data: string;
  width: number;
  height: number;
}

export interface I18N {
  rendererFormattedStrings: { [key: string]: string };
  icuMessagePaths: IcuMessagePaths;
}

export interface IcuMessagePaths {
  'core/audits/is-on-https.js | title': string[];
  'core/audits/is-on-https.js | description': string[];
  'core/audits/redirects-http.js | title': string[];
  'core/audits/redirects-http.js | description': string[];
  'core/audits/viewport.js | title': string[];
  'core/audits/viewport.js | description': string[];
  'core/lib/i18n/i18n.js | firstContentfulPaintMetric': string[];
  'core/audits/metrics/first-contentful-paint.js | description': string[];
  'core/lib/i18n/i18n.js | seconds': Core[];
  'core/lib/i18n/i18n.js | largestContentfulPaintMetric': string[];
  'core/audits/metrics/largest-contentful-paint.js | description': string[];
  'core/lib/i18n/i18n.js | firstMeaningfulPaintMetric': string[];
  'core/audits/metrics/first-meaningful-paint.js | description': string[];
  'core/lib/i18n/i18n.js | speedIndexMetric': string[];
  'core/audits/metrics/speed-index.js | description': string[];
  'core/lib/i18n/i18n.js | totalBlockingTimeMetric': string[];
  'core/audits/metrics/total-blocking-time.js | description': string[];
  'core/lib/i18n/i18n.js | ms': Core[];
  'core/lib/i18n/i18n.js | maxPotentialFIDMetric': string[];
  'core/audits/metrics/max-potential-fid.js | description': string[];
  'core/lib/i18n/i18n.js | cumulativeLayoutShiftMetric': string[];
  'core/audits/metrics/cumulative-layout-shift.js | description': string[];
  'core/audits/errors-in-console.js | title': string[];
  'core/audits/errors-in-console.js | description': string[];
  'core/audits/server-response-time.js | title': string[];
  'core/audits/server-response-time.js | description': string[];
  'core/audits/server-response-time.js | displayValue': Core[];
  'core/lib/i18n/i18n.js | columnURL': string[];
  'core/lib/i18n/i18n.js | columnTimeSpent': string[];
  'core/lib/i18n/i18n.js | interactiveMetric': string[];
  'core/audits/metrics/interactive.js | description': string[];
  'core/audits/user-timings.js | title': string[];
  'core/audits/user-timings.js | description': string[];
  'core/audits/critical-request-chains.js | title': string[];
  'core/audits/critical-request-chains.js | description': string[];
  'core/audits/critical-request-chains.js | displayValue': CoreAuditsJSDisplayValue[];
  'core/audits/redirects.js | title': string[];
  'core/audits/redirects.js | description': string[];
  'core/audits/image-aspect-ratio.js | title': string[];
  'core/audits/image-aspect-ratio.js | description': string[];
  'core/audits/image-size-responsive.js | title': string[];
  'core/audits/image-size-responsive.js | description': string[];
  'core/audits/deprecations.js | title': string[];
  'core/audits/deprecations.js | description': string[];
  'core/audits/third-party-cookies.js | failureTitle': string[];
  'core/audits/third-party-cookies.js | description': string[];
  'core/audits/third-party-cookies.js | displayValue': CoreAuditsJSDisplayValue[];
  'core/lib/i18n/i18n.js | columnName': string[];
  'core/audits/mainthread-work-breakdown.js | failureTitle': string[];
  'core/audits/mainthread-work-breakdown.js | description': string[];
  'core/audits/mainthread-work-breakdown.js | columnCategory': string[];
  'core/audits/bootup-time.js | title': string[];
  'core/audits/bootup-time.js | description': string[];
  'core/audits/bootup-time.js | columnTotal': string[];
  'core/audits/bootup-time.js | columnScriptEval': string[];
  'core/audits/bootup-time.js | columnScriptParse': string[];
  'core/audits/uses-rel-preconnect.js | title': string[];
  'core/audits/uses-rel-preconnect.js | description': string[];
  'core/lib/i18n/i18n.js | displayValueMsSavings': CoreLIBI18NI18NJSDisplayValueMSSaving[];
  'core/lib/i18n/i18n.js | columnWastedBytes': string[];
  'core/audits/font-display.js | failureTitle': string[];
  'core/audits/font-display.js | description': string[];
  'core/audits/font-display.js | undeclaredFontOriginWarning': CoreAuditsFontDisplayJSUndeclaredFontOriginWarning[];
  'core/audits/network-rtt.js | title': string[];
  'core/audits/network-rtt.js | description': string[];
  'core/audits/network-server-latency.js | title': string[];
  'core/audits/network-server-latency.js | description': string[];
  'core/lib/i18n/i18n.js | columnResourceType': string[];
  'core/lib/i18n/i18n.js | columnRequests': string[];
  'core/lib/i18n/i18n.js | columnTransferSize': string[];
  'core/lib/i18n/i18n.js | totalResourceType': string[];
  'core/lib/i18n/i18n.js | scriptResourceType': string[];
  'core/lib/i18n/i18n.js | imageResourceType': string[];
  'core/lib/i18n/i18n.js | fontResourceType': string[];
  'core/lib/i18n/i18n.js | stylesheetResourceType': string[];
  'core/lib/i18n/i18n.js | otherResourceType': string[];
  'core/lib/i18n/i18n.js | documentResourceType': string[];
  'core/lib/i18n/i18n.js | mediaResourceType': string[];
  'core/lib/i18n/i18n.js | thirdPartyResourceType': string[];
  'core/audits/third-party-summary.js | title': string[];
  'core/audits/third-party-summary.js | description': string[];
  'core/audits/third-party-summary.js | displayValue': Core[];
  'core/audits/third-party-summary.js | columnThirdParty': string[];
  'core/lib/i18n/i18n.js | columnBlockingTime': string[];
  'core/audits/third-party-facades.js | title': string[];
  'core/audits/third-party-facades.js | description': string[];
  'core/audits/largest-contentful-paint-element.js | title': string[];
  'core/audits/largest-contentful-paint-element.js | description': string[];
  'core/lib/i18n/i18n.js | columnElement': string[];
  'core/audits/largest-contentful-paint-element.js | columnPhase': string[];
  'core/audits/largest-contentful-paint-element.js | columnPercentOfLCP': string[];
  'core/audits/largest-contentful-paint-element.js | columnTiming': string[];
  'core/audits/largest-contentful-paint-element.js | itemTTFB': string[];
  'core/audits/largest-contentful-paint-element.js | itemLoadDelay': string[];
  'core/audits/largest-contentful-paint-element.js | itemLoadTime': string[];
  'core/audits/largest-contentful-paint-element.js | itemRenderDelay': string[];
  'core/audits/lcp-lazy-loaded.js | title': string[];
  'core/audits/lcp-lazy-loaded.js | description': string[];
  'core/audits/layout-shifts.js | title': string[];
  'core/audits/layout-shifts.js | description': string[];
  'core/audits/layout-shifts.js | displayValueShiftsFound': CoreAuditsLayoutShiftsJSDisplayValueShiftsFound[];
  'core/audits/layout-shifts.js | columnScore': string[];
  'core/audits/layout-shifts.js | rootCauseUnsizedMedia': string[];
  'core/audits/layout-shifts.js | rootCauseRenderBlockingRequest': string[];
  'core/audits/long-tasks.js | title': string[];
  'core/audits/long-tasks.js | description': string[];
  'core/audits/long-tasks.js | displayValue': CoreAuditsJSDisplayValue[];
  'core/lib/i18n/i18n.js | columnStartTime': string[];
  'core/lib/i18n/i18n.js | columnDuration': string[];
  'core/audits/non-composited-animations.js | title': string[];
  'core/audits/non-composited-animations.js | description': string[];
  'core/audits/non-composited-animations.js | displayValue': CoreAuditsJSDisplayValue[];
  'core/audits/non-composited-animations.js | unsupportedCSSProperty': CoreAuditsNonCompositedAnimationsJSUnsupportedCSSProperty[];
  'core/audits/unsized-images.js | failureTitle': string[];
  'core/audits/unsized-images.js | description': string[];
  'core/audits/valid-source-maps.js | title': string[];
  'core/audits/valid-source-maps.js | description': string[];
  'core/audits/prioritize-lcp-image.js | title': string[];
  'core/audits/prioritize-lcp-image.js | description': string[];
  'core/audits/csp-xss.js | title': string[];
  'core/audits/csp-xss.js | description': string[];
  'core/lib/i18n/i18n.js | columnDescription': string[];
  'core/audits/csp-xss.js | columnDirective': string[];
  'core/audits/csp-xss.js | columnSeverity': string[];
  'core/lib/i18n/i18n.js | itemSeverityHigh': string[];
  'core/audits/csp-xss.js | noCsp': string[];
  'core/audits/accessibility/accesskeys.js | title': string[];
  'core/audits/accessibility/accesskeys.js | description': string[];
  'core/audits/accessibility/aria-allowed-attr.js | title': string[];
  'core/audits/accessibility/aria-allowed-attr.js | description': string[];
  'core/audits/accessibility/aria-allowed-role.js | failureTitle': string[];
  'core/audits/accessibility/aria-allowed-role.js | description': string[];
  'core/lib/i18n/i18n.js | columnFailingElem': string[];
  'core/audits/accessibility/aria-command-name.js | title': string[];
  'core/audits/accessibility/aria-command-name.js | description': string[];
  'core/audits/accessibility/aria-conditional-attr.js | title': string[];
  'core/audits/accessibility/aria-conditional-attr.js | description': string[];
  'core/audits/accessibility/aria-deprecated-role.js | title': string[];
  'core/audits/accessibility/aria-deprecated-role.js | description': string[];
  'core/audits/accessibility/aria-dialog-name.js | title': string[];
  'core/audits/accessibility/aria-dialog-name.js | description': string[];
  'core/audits/accessibility/aria-hidden-body.js | title': string[];
  'core/audits/accessibility/aria-hidden-body.js | description': string[];
  'core/audits/accessibility/aria-hidden-focus.js | title': string[];
  'core/audits/accessibility/aria-hidden-focus.js | description': string[];
  'core/audits/accessibility/aria-input-field-name.js | title': string[];
  'core/audits/accessibility/aria-input-field-name.js | description': string[];
  'core/audits/accessibility/aria-meter-name.js | title': string[];
  'core/audits/accessibility/aria-meter-name.js | description': string[];
  'core/audits/accessibility/aria-progressbar-name.js | title': string[];
  'core/audits/accessibility/aria-progressbar-name.js | description': string[];
  'core/audits/accessibility/aria-prohibited-attr.js | title': string[];
  'core/audits/accessibility/aria-prohibited-attr.js | description': string[];
  'core/audits/accessibility/aria-required-attr.js | title': string[];
  'core/audits/accessibility/aria-required-attr.js | description': string[];
  'core/audits/accessibility/aria-required-children.js | title': string[];
  'core/audits/accessibility/aria-required-children.js | description': string[];
  'core/audits/accessibility/aria-required-parent.js | title': string[];
  'core/audits/accessibility/aria-required-parent.js | description': string[];
  'core/audits/accessibility/aria-roles.js | title': string[];
  'core/audits/accessibility/aria-roles.js | description': string[];
  'core/audits/accessibility/aria-text.js | title': string[];
  'core/audits/accessibility/aria-text.js | description': string[];
  'core/audits/accessibility/aria-toggle-field-name.js | title': string[];
  'core/audits/accessibility/aria-toggle-field-name.js | description': string[];
  'core/audits/accessibility/aria-tooltip-name.js | title': string[];
  'core/audits/accessibility/aria-tooltip-name.js | description': string[];
  'core/audits/accessibility/aria-treeitem-name.js | title': string[];
  'core/audits/accessibility/aria-treeitem-name.js | description': string[];
  'core/audits/accessibility/aria-valid-attr-value.js | title': string[];
  'core/audits/accessibility/aria-valid-attr-value.js | description': string[];
  'core/audits/accessibility/aria-valid-attr.js | title': string[];
  'core/audits/accessibility/aria-valid-attr.js | description': string[];
  'core/audits/accessibility/button-name.js | failureTitle': string[];
  'core/audits/accessibility/button-name.js | description': string[];
  'core/audits/accessibility/bypass.js | title': string[];
  'core/audits/accessibility/bypass.js | description': string[];
  'core/audits/accessibility/color-contrast.js | failureTitle': string[];
  'core/audits/accessibility/color-contrast.js | description': string[];
  'core/audits/accessibility/definition-list.js | title': string[];
  'core/audits/accessibility/definition-list.js | description': string[];
  'core/audits/accessibility/dlitem.js | title': string[];
  'core/audits/accessibility/dlitem.js | description': string[];
  'core/audits/accessibility/document-title.js | title': string[];
  'core/audits/accessibility/document-title.js | description': string[];
  'core/audits/accessibility/duplicate-id-aria.js | title': string[];
  'core/audits/accessibility/duplicate-id-aria.js | description': string[];
  'core/audits/accessibility/empty-heading.js | title': string[];
  'core/audits/accessibility/empty-heading.js | description': string[];
  'core/audits/accessibility/form-field-multiple-labels.js | title': string[];
  'core/audits/accessibility/form-field-multiple-labels.js | description': string[];
  'core/audits/accessibility/frame-title.js | title': string[];
  'core/audits/accessibility/frame-title.js | description': string[];
  'core/audits/accessibility/heading-order.js | failureTitle': string[];
  'core/audits/accessibility/heading-order.js | description': string[];
  'core/audits/accessibility/html-has-lang.js | title': string[];
  'core/audits/accessibility/html-has-lang.js | description': string[];
  'core/audits/accessibility/html-lang-valid.js | title': string[];
  'core/audits/accessibility/html-lang-valid.js | description': string[];
  'core/audits/accessibility/html-xml-lang-mismatch.js | title': string[];
  'core/audits/accessibility/html-xml-lang-mismatch.js | description': string[];
  'core/audits/accessibility/identical-links-same-purpose.js | title': string[];
  'core/audits/accessibility/identical-links-same-purpose.js | description': string[];
  'core/audits/accessibility/image-alt.js | title': string[];
  'core/audits/accessibility/image-alt.js | description': string[];
  'core/audits/accessibility/image-redundant-alt.js | title': string[];
  'core/audits/accessibility/image-redundant-alt.js | description': string[];
  'core/audits/accessibility/input-button-name.js | title': string[];
  'core/audits/accessibility/input-button-name.js | description': string[];
  'core/audits/accessibility/input-image-alt.js | title': string[];
  'core/audits/accessibility/input-image-alt.js | description': string[];
  'core/audits/accessibility/label-content-name-mismatch.js | title': string[];
  'core/audits/accessibility/label-content-name-mismatch.js | description': string[];
  'core/audits/accessibility/label.js | title': string[];
  'core/audits/accessibility/label.js | description': string[];
  'core/audits/accessibility/landmark-one-main.js | title': string[];
  'core/audits/accessibility/landmark-one-main.js | description': string[];
  'core/audits/accessibility/link-name.js | title': string[];
  'core/audits/accessibility/link-name.js | description': string[];
  'core/audits/accessibility/link-in-text-block.js | title': string[];
  'core/audits/accessibility/link-in-text-block.js | description': string[];
  'core/audits/accessibility/list.js | title': string[];
  'core/audits/accessibility/list.js | description': string[];
  'core/audits/accessibility/listitem.js | title': string[];
  'core/audits/accessibility/listitem.js | description': string[];
  'core/audits/accessibility/meta-refresh.js | title': string[];
  'core/audits/accessibility/meta-refresh.js | description': string[];
  'core/audits/accessibility/meta-viewport.js | failureTitle': string[];
  'core/audits/accessibility/meta-viewport.js | description': string[];
  'core/audits/accessibility/object-alt.js | title': string[];
  'core/audits/accessibility/object-alt.js | description': string[];
  'core/audits/accessibility/select-name.js | title': string[];
  'core/audits/accessibility/select-name.js | description': string[];
  'core/audits/accessibility/skip-link.js | title': string[];
  'core/audits/accessibility/skip-link.js | description': string[];
  'core/audits/accessibility/tabindex.js | title': string[];
  'core/audits/accessibility/tabindex.js | description': string[];
  'core/audits/accessibility/table-duplicate-name.js | title': string[];
  'core/audits/accessibility/table-duplicate-name.js | description': string[];
  'core/audits/accessibility/table-fake-caption.js | title': string[];
  'core/audits/accessibility/table-fake-caption.js | description': string[];
  'core/audits/accessibility/target-size.js | failureTitle': string[];
  'core/audits/accessibility/target-size.js | description': string[];
  'core/audits/accessibility/td-has-header.js | title': string[];
  'core/audits/accessibility/td-has-header.js | description': string[];
  'core/audits/accessibility/td-headers-attr.js | title': string[];
  'core/audits/accessibility/td-headers-attr.js | description': string[];
  'core/audits/accessibility/th-has-data-cells.js | title': string[];
  'core/audits/accessibility/th-has-data-cells.js | description': string[];
  'core/audits/accessibility/valid-lang.js | title': string[];
  'core/audits/accessibility/valid-lang.js | description': string[];
  'core/audits/accessibility/video-caption.js | title': string[];
  'core/audits/accessibility/video-caption.js | description': string[];
  'core/audits/byte-efficiency/uses-long-cache-ttl.js | failureTitle': string[];
  'core/audits/byte-efficiency/uses-long-cache-ttl.js | description': string[];
  'core/audits/byte-efficiency/uses-long-cache-ttl.js | displayValue': CoreAuditsJSDisplayValue[];
  'core/lib/i18n/i18n.js | columnCacheTTL': string[];
  'core/audits/byte-efficiency/total-byte-weight.js | failureTitle': string[];
  'core/audits/byte-efficiency/total-byte-weight.js | description': string[];
  'core/audits/byte-efficiency/total-byte-weight.js | displayValue': CoreAuditsByteEfficiencyTotalByteWeightJSDisplayValue[];
  'core/audits/byte-efficiency/offscreen-images.js | title': string[];
  'core/audits/byte-efficiency/offscreen-images.js | description': string[];
  'core/lib/i18n/i18n.js | displayValueByteSavings': CoreLIBI18NI18NJSDisplayValueByteSaving[];
  'core/lib/i18n/i18n.js | columnResourceSize': string[];
  'core/audits/byte-efficiency/render-blocking-resources.js | title': string[];
  'core/audits/byte-efficiency/render-blocking-resources.js | description': string[];
  'core/audits/byte-efficiency/unminified-css.js | title': string[];
  'core/audits/byte-efficiency/unminified-css.js | description': string[];
  'core/audits/byte-efficiency/unminified-javascript.js | title': string[];
  'core/audits/byte-efficiency/unminified-javascript.js | description': string[];
  'core/audits/byte-efficiency/unused-css-rules.js | title': string[];
  'core/audits/byte-efficiency/unused-css-rules.js | description': string[];
  'core/audits/byte-efficiency/unused-javascript.js | title': string[];
  'core/audits/byte-efficiency/unused-javascript.js | description': string[];
  'core/audits/byte-efficiency/modern-image-formats.js | title': string[];
  'core/audits/byte-efficiency/modern-image-formats.js | description': string[];
  'core/audits/byte-efficiency/uses-optimized-images.js | title': string[];
  'core/audits/byte-efficiency/uses-optimized-images.js | description': string[];
  'core/audits/byte-efficiency/uses-text-compression.js | title': string[];
  'core/audits/byte-efficiency/uses-text-compression.js | description': string[];
  'core/audits/byte-efficiency/uses-responsive-images.js | title': string[];
  'core/audits/byte-efficiency/uses-responsive-images.js | description': string[];
  'core/audits/byte-efficiency/efficient-animated-content.js | title': string[];
  'core/audits/byte-efficiency/efficient-animated-content.js | description': string[];
  'core/audits/byte-efficiency/duplicated-javascript.js | title': string[];
  'core/audits/byte-efficiency/duplicated-javascript.js | description': string[];
  'core/audits/byte-efficiency/legacy-javascript.js | title': string[];
  'core/audits/byte-efficiency/legacy-javascript.js | description': string[];
  'core/audits/dobetterweb/doctype.js | title': string[];
  'core/audits/dobetterweb/doctype.js | description': string[];
  'core/audits/dobetterweb/charset.js | title': string[];
  'core/audits/dobetterweb/charset.js | description': string[];
  'core/audits/dobetterweb/dom-size.js | failureTitle': string[];
  'core/audits/dobetterweb/dom-size.js | description': string[];
  'core/audits/dobetterweb/dom-size.js | displayValue': CoreAuditsJSDisplayValue[];
  'core/audits/dobetterweb/dom-size.js | columnStatistic': string[];
  'core/audits/dobetterweb/dom-size.js | columnValue': string[];
  'core/audits/dobetterweb/dom-size.js | statisticDOMElements': string[];
  'core/audits/dobetterweb/dom-size.js | statisticDOMDepth': string[];
  'core/audits/dobetterweb/dom-size.js | statisticDOMWidth': string[];
  'core/audits/dobetterweb/geolocation-on-start.js | title': string[];
  'core/audits/dobetterweb/geolocation-on-start.js | description': string[];
  'core/audits/dobetterweb/inspector-issues.js | failureTitle': string[];
  'core/audits/dobetterweb/inspector-issues.js | description': string[];
  'core/audits/dobetterweb/inspector-issues.js | columnIssueType': string[];
  'core/audits/dobetterweb/no-document-write.js | title': string[];
  'core/audits/dobetterweb/no-document-write.js | description': string[];
  'core/audits/dobetterweb/js-libraries.js | title': string[];
  'core/audits/dobetterweb/js-libraries.js | description': string[];
  'core/audits/dobetterweb/js-libraries.js | columnVersion': string[];
  'core/audits/dobetterweb/notification-on-start.js | title': string[];
  'core/audits/dobetterweb/notification-on-start.js | description': string[];
  'core/audits/dobetterweb/paste-preventing-inputs.js | title': string[];
  'core/audits/dobetterweb/paste-preventing-inputs.js | description': string[];
  'core/audits/dobetterweb/uses-http2.js | title': string[];
  'core/audits/dobetterweb/uses-http2.js | description': string[];
  'core/audits/dobetterweb/uses-passive-event-listeners.js | failureTitle': string[];
  'core/audits/dobetterweb/uses-passive-event-listeners.js | description': string[];
  'core/lib/i18n/i18n.js | columnSource': string[];
  'core/audits/seo/meta-description.js | title': string[];
  'core/audits/seo/meta-description.js | description': string[];
  'core/audits/seo/http-status-code.js | title': string[];
  'core/audits/seo/http-status-code.js | description': string[];
  'core/audits/seo/font-size.js | title': string[];
  'core/audits/seo/font-size.js | description': string[];
  'core/audits/seo/link-text.js | failureTitle': string[];
  'core/audits/seo/link-text.js | description': string[];
  'core/audits/seo/link-text.js | displayValue': CoreAuditsJSDisplayValue[];
  'core/audits/seo/crawlable-anchors.js | failureTitle': string[];
  'core/audits/seo/crawlable-anchors.js | description': string[];
  'core/audits/seo/crawlable-anchors.js | columnFailingLink': string[];
  'core/audits/seo/is-crawlable.js | title': string[];
  'core/audits/seo/is-crawlable.js | description': string[];
  'core/audits/seo/robots-txt.js | title': string[];
  'core/audits/seo/robots-txt.js | description': string[];
  'core/audits/seo/hreflang.js | title': string[];
  'core/audits/seo/hreflang.js | description': string[];
  'core/audits/seo/canonical.js | title': string[];
  'core/audits/seo/canonical.js | description': string[];
  'core/audits/seo/manual/structured-data.js | title': string[];
  'core/audits/seo/manual/structured-data.js | description': string[];
  'core/audits/bf-cache.js | failureTitle': string[];
  'core/audits/bf-cache.js | description': string[];
  'core/audits/bf-cache.js | displayValue': CoreAuditsJSDisplayValue[];
  'core/audits/bf-cache.js | failureReasonColumn': string[];
  'core/audits/bf-cache.js | failureTypeColumn': string[];
  'core/lib/bf-cache-strings.js | unloadHandlerExistsInMainFrame': string[];
  'core/audits/bf-cache.js | actionableFailureType': string[];
  'core/config/default-config.js | performanceCategoryTitle': string[];
  'core/config/default-config.js | a11yCategoryTitle': string[];
  'core/config/default-config.js | a11yCategoryDescription': string[];
  'core/config/default-config.js | a11yCategoryManualDescription': string[];
  'core/config/default-config.js | bestPracticesCategoryTitle': string[];
  'core/config/default-config.js | seoCategoryTitle': string[];
  'core/config/default-config.js | seoCategoryDescription': string[];
  'core/config/default-config.js | seoCategoryManualDescription': string[];
  'core/config/default-config.js | metricGroupTitle': string[];
  'core/config/default-config.js | diagnosticsGroupTitle': string[];
  'core/config/default-config.js | diagnosticsGroupDescription': string[];
  'core/config/default-config.js | a11yBestPracticesGroupTitle': string[];
  'core/config/default-config.js | a11yBestPracticesGroupDescription': string[];
  'core/config/default-config.js | a11yColorContrastGroupTitle': string[];
  'core/config/default-config.js | a11yColorContrastGroupDescription': string[];
  'core/config/default-config.js | a11yNamesLabelsGroupTitle': string[];
  'core/config/default-config.js | a11yNamesLabelsGroupDescription': string[];
  'core/config/default-config.js | a11yNavigationGroupTitle': string[];
  'core/config/default-config.js | a11yNavigationGroupDescription': string[];
  'core/config/default-config.js | a11yAriaGroupTitle': string[];
  'core/config/default-config.js | a11yAriaGroupDescription': string[];
  'core/config/default-config.js | a11yLanguageGroupTitle': string[];
  'core/config/default-config.js | a11yLanguageGroupDescription': string[];
  'core/config/default-config.js | a11yAudioVideoGroupTitle': string[];
  'core/config/default-config.js | a11yAudioVideoGroupDescription': string[];
  'core/config/default-config.js | a11yTablesListsVideoGroupTitle': string[];
  'core/config/default-config.js | a11yTablesListsVideoGroupDescription': string[];
  'core/config/default-config.js | seoMobileGroupTitle': string[];
  'core/config/default-config.js | seoMobileGroupDescription': string[];
  'core/config/default-config.js | seoContentGroupTitle': string[];
  'core/config/default-config.js | seoContentGroupDescription': string[];
  'core/config/default-config.js | seoCrawlingGroupTitle': string[];
  'core/config/default-config.js | seoCrawlingGroupDescription': string[];
  'core/config/default-config.js | bestPracticesTrustSafetyGroupTitle': string[];
  'core/config/default-config.js | bestPracticesUXGroupTitle': string[];
  'core/config/default-config.js | bestPracticesBrowserCompatGroupTitle': string[];
  'core/config/default-config.js | bestPracticesGeneralGroupTitle': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | unused-css-rules': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | modern-image-formats': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | offscreen-images': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | total-byte-weight': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | render-blocking-resources': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | unminified-css': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | unminified-javascript': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | efficient-animated-content': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | unused-javascript': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | uses-long-cache-ttl': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | uses-optimized-images': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | uses-text-compression': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | uses-responsive-images': string[];
  'node_modules/lighthouse-stack-packs/packs/wordpress.js | server-response-time': string[];
  'node_modules/lighthouse-stack-packs/packs/wp-rocket.js | unused-css-rules': string[];
  'node_modules/lighthouse-stack-packs/packs/wp-rocket.js | modern-image-formats': string[];
  'node_modules/lighthouse-stack-packs/packs/wp-rocket.js | unused-javascript': string[];
  'node_modules/lighthouse-stack-packs/packs/wp-rocket.js | render-blocking-resources': string[];
  'node_modules/lighthouse-stack-packs/packs/wp-rocket.js | unminified-css': string[];
  'node_modules/lighthouse-stack-packs/packs/wp-rocket.js | unminified-javascript': string[];
  'node_modules/lighthouse-stack-packs/packs/wp-rocket.js | uses-optimized-images': string[];
  'node_modules/lighthouse-stack-packs/packs/wp-rocket.js | uses-rel-preconnect': string[];
  'node_modules/lighthouse-stack-packs/packs/wp-rocket.js | uses-rel-preload': string[];
  'node_modules/lighthouse-stack-packs/packs/wp-rocket.js | offscreen-images': string[];
}

export interface CoreAuditsJSDisplayValue {
  values: CoreAuditsBfCacheJSDisplayValueValues;
  path: string;
}

export interface CoreAuditsBfCacheJSDisplayValueValues {
  itemCount: number;
}

export interface CoreAuditsByteEfficiencyTotalByteWeightJSDisplayValue {
  values: CoreAuditsByteEfficiencyTotalByteWeightJSDisplayValueValues;
  path: string;
}

export interface CoreAuditsByteEfficiencyTotalByteWeightJSDisplayValueValues {
  totalBytes: number;
}

export interface CoreAuditsFontDisplayJSUndeclaredFontOriginWarning {
  values: CoreAuditsFontDisplayJSUndeclaredFontOriginWarningValues;
  path: string;
}

export interface CoreAuditsFontDisplayJSUndeclaredFontOriginWarningValues {
  fontCountForOrigin: number;
  fontOrigin: string;
}

export interface CoreAuditsLayoutShiftsJSDisplayValueShiftsFound {
  values: CoreAuditsLayoutShiftsJSDisplayValueShiftsFoundValues;
  path: string;
}

export interface CoreAuditsLayoutShiftsJSDisplayValueShiftsFoundValues {
  shiftCount: number;
}

export interface CoreAuditsNonCompositedAnimationsJSUnsupportedCSSProperty {
  values: CoreAuditsNonCompositedAnimationsJSUnsupportedCSSPropertyValues;
  path: string;
}

export interface CoreAuditsNonCompositedAnimationsJSUnsupportedCSSPropertyValues {
  propertyCount: number;
  properties: string;
}

export interface Core {
  values: CoreAuditsServerResponseTimeJSDisplayValueValues;
  path: string;
}

export interface CoreAuditsServerResponseTimeJSDisplayValueValues {
  timeInMs: number;
}

export interface CoreLIBI18NI18NJSDisplayValueByteSaving {
  values: CoreLIBI18NI18NJSDisplayValueByteSavingSummary;
  path: string;
}

export interface CoreLIBI18NI18NJSDisplayValueMSSaving {
  values: CoreLIBI18NI18NJSDisplayValueMSSavingSummary;
  path: string;
}

export interface StackPack {
  id: string;
  title: string;
  iconDataURL: string;
  descriptions: Descriptions;
}

export interface Descriptions {
  'unused-css-rules': string;
  'modern-image-formats': string;
  'offscreen-images': string;
  'total-byte-weight'?: string;
  'render-blocking-resources': string;
  'unminified-css': string;
  'unminified-javascript': string;
  'efficient-animated-content'?: string;
  'unused-javascript': string;
  'uses-long-cache-ttl'?: string;
  'uses-optimized-images': string;
  'uses-text-compression'?: string;
  'uses-responsive-images'?: string;
  'server-response-time'?: string;
  'uses-rel-preconnect'?: string;
  'uses-rel-preload'?: string;
}

export interface Timing {
  entries: Entry[];
  total: number;
}

export interface Entry {
  startTime: number;
  name: string;
  duration: number;
  entryType: EntryType;
}

export enum EntryType {
  Measure = 'measure',
}
