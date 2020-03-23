import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { ConceptMonitorData } from './data.d';
import { fetchConcepts, fetchSecurityPools } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConceptMonitorData) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: ConceptMonitorData;
  effects: {
    // fetch: Effect;
    fetchSecurityPools: Effect;
    fetchConcepts: Effect;
    // fetchPriceData: Effect;
  };
  reducers: {
    save: Reducer<ConceptMonitorData>;
    // saveLimitUpData: Reducer<MonitorData>;
    clear: Reducer<ConceptMonitorData>;
  };
}

const initState = {
  conceptData: [],
  stockData: [],
  poolData: [],
  conceptPieData: [],
};

const Model: ModelType = {
  namespace: 'conceptMonitor',

  state: initState,

  effects: {
    // * fetch(_, { call, put }) {
    //   const response = yield call(fakeChartData);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // },
    * fetchSecurityPools(_, { call, put }) {
      const response = yield call(fetchSecurityPools);
      yield put({
        type: 'save',
        payload: {
          poolData: JSON.parse(response.data),
        },
      });
    },
    * fetchConcepts({ payload }, { call, put }) {
      const response = yield call(fetchConcepts, payload);
      yield put({
        type: 'save',
        payload: {
          conceptData: JSON.parse(response.data),
        },
      });
    },

    // * fetchPriceData({ payload }, { call, put }) {
    //   const response = yield call(fetchPriceData, payload);
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       limitUpChartData: JSON.parse(response.data),
    //     },
    //   });
    // },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
