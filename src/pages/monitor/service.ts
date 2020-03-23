import request from 'umi-request';
// import { PoolQueryParams } from '@/pages/dashboard/concept/data';

// export async function fetchLimitUpData(queryParams: PoolQueryParams) {
//   return request('server/api/pools', { params: queryParams });
// }

export interface ConceptParamsType {
  cids: [];
  codes: [];
}

export async function fetchConcepts(params: ConceptParamsType) {
  let codes = '';
  let conceptIds = '';
  if (typeof (params.codes) !== 'undefined' && params.codes.length !== 0) {
    codes = params.codes.join(',');
  }
  if (typeof (params.cids) !== 'undefined' && params.cids.length !== 0) {
    conceptIds = params.cids.join(',');
  }
  return request('server/api/concepts', { params: { codes, cids: conceptIds } });
}

export async function fetchSecurityPools() {
  // const params = { date, codes };
  // if (typeof (codes) !== 'undefined' && codes.length !== 0) {
  //   params.codes = codes;
  // }
  return request('server/api/securities/pools');
}


export async function fetchConceptQuery(params: { date: string, codes: string }) {
  // const params = { date, codes };
  // if (typeof (codes) !== 'undefined' && codes.length !== 0) {
  //   params.codes = codes;
  // }
  return request('server/api/concepts/queries', { params });
}
