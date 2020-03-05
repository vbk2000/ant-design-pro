export interface StockDataType {
  conceptId: string;
  name: string;
  plateId: string;
}

export interface ConceptDataType {
  conceptId: string;
  name: string;
  plateId: string;
}

export interface ConceptPieDataType {
  conceptId: string;
  concept_name: string;
  join_count: number;
}

export interface ConceptMonitorData {
  conceptData: ConceptDataType[];
  stockData: StockDataType[];
  poolData: LimitUpDataType[];
  conceptPieData:ConceptPieDataType[];
}

// 计算概念的交集
export interface JoinCodes {
  joinCodeData: string[]
}

export interface LimitUpDataType {
  code: string;
  name: string;
  date: number;
  first_time: string;
  last_time: string;
  break_times: number;
  days: number;
  plate: string;
  title: string;
  content: string;
}
