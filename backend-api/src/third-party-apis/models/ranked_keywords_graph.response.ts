export interface RankedKeywordsGraphResponse {
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
  location_code: number;
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
  year: number;
  month: number;
  metrics: Metrics;
}

export interface Metrics {
  organic: Organic;
  paid: Organic;
}

export interface Organic {
  pos_1: number;
  pos_2_3: number;
  pos_4_10: number;
  pos_11_20: number;
  pos_21_30: number;
  pos_31_40: number;
  pos_41_50: number;
  pos_51_60: number;
  pos_61_70: number;
  pos_71_80: number;
  pos_81_90: number;
  pos_91_100: number;
  etv: number;
  count: number;
  estimated_paid_traffic_cost: number;
  is_new: number;
  is_up: number;
  is_down: number;
  is_lost: number;
  clickstream_etv: number;
  clickstream_gender_distribution: ClickstreamGenderDistribution;
  clickstream_age_distribution: { [key: string]: number };
}

export interface ClickstreamGenderDistribution {
  female: number;
  male: number;
}
