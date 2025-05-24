export interface DomainAnalyticsResponse {
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
  se: string;
  limit: number;
  filters: Array<string[]>;
}

export interface Result {
  total_count: number;
  items_count: number;
  items: Item[];
}

export interface Item {
  domain: string;
  created_datetime: string;
  changed_datetime: string;
  expiration_datetime: string;
  updated_datetime: string;
  first_seen: FirstSeen;
  epp_status_codes: EppStatusCode[];
  tld: TLD;
  registered: boolean;
  registrar: Registrar;
  metrics: Metrics;
  backlinks_info: BacklinksInfo;
}

export interface BacklinksInfo {
  referring_domains: number;
  referring_main_domains: number;
  referring_pages: number;
  dofollow: number;
  backlinks: number;
  time_update: string;
}

export enum EppStatusCode {
  ClientDeleteProhibited = 'client_delete_prohibited',
  ClientTransferProhibited = 'client_transfer_prohibited',
  ClientUpdateProhibited = 'client_update_prohibited',
}

export enum FirstSeen {
  The202010062100000000 = '2020-10-06 21:00:00 +00:00',
}

export interface Metrics {
  organic: { [key: string]: number };
  paid: { [key: string]: number };
}

export enum Registrar {
  NameCheapInc = 'NameCheap, Inc.',
}

export enum TLD {
  COM = 'com',
  Org = 'org',
}
