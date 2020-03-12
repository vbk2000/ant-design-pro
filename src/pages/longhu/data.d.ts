export interface LonghuTableItem {
  date: Date;
  code: string;
  period: string;
  buy_amt: number;
  sell_amt: number;
  net_amt:number;
  abnormal_name: string;

  market:string;
  price:number;
  pct_change:number;
}

export interface LonghuQueryParams {
  sorter?: string;
  status?: string;
  from?:string;
  to?:string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
