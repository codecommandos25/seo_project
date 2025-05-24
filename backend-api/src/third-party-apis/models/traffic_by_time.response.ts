export interface TrafficGraphResponse {
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
  targets: string[];
  location_code: number;
  language_code: string;
  item_types: string[];
  date_from: Date;
  date_to: Date;
}

export interface Result {
  se_type: string;
  location_code: number;
  language_code: string;
  total_count: number;
  items_count: number;
  items: Item[];
}

export interface Item {
  se_type: string;
  target: string;
  metrics: Metrics;
}

export interface Metrics {
  organic: Organic[];
  paid: Organic[];
  local_pack: null;
  featured_snippet: null;
}

export interface Organic {
  year: number;
  month: number;
  etv: number;
  count: number;
}
