import {LonghuQueryParams} from "@/pages/longhu/data";
import request from "@/utils/request";

export async function queryLonghu(params?: LonghuQueryParams) {
  return request('/api/longhu', {
    params,
  });
}
