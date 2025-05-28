export interface BulkReferingDomainResponse {
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
  targets: string[];
}

export interface Result {
  items_count: number;
  items: Item[];
}

export interface Item {
  target: string;
  referring_domains: number;
  referring_domains_nofollow: number;
  referring_main_domains: number;
  referring_main_domains_nofollow: number;
}
