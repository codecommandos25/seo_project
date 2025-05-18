export interface CompetitorsDomainResponse {
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
  intersecting_domains: string[];
  language_name: string;
  location_code: number;
  limit: number;
}

export interface Result {
  se_type: string;
  target: string;
  location_code: number;
  language_code: string;
  total_count: number;
  items_count: number;
  items: Item[];
}

export interface Item {
  se_type: string;
  domain: string;
  avg_position: number;
  sum_position: number;
  intersections: number;
  full_domain_metrics: Metrics;
  metrics: Metrics;
  competitor_metrics: Metrics;
}

export interface Metrics {
  organic: { [key: string]: number | null };
  paid: { [key: string]: number | null };
  local_pack: null;
  featured_snippet: null;
}
