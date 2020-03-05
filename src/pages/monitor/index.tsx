import { Col, Dropdown, Icon, Menu, Row } from 'antd';
import React, { Component, Suspense } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
// import { getTimeDistance } from './utils/utils';
import { ConceptMonitorData, StockDataType, ConceptDataType } from './data.d';
import styles from './style.less';

const PoolsCard = React.lazy(() => import('./components/PoolsCard'));

interface ConceptProps {
  conceptMonitor: ConceptMonitorData;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface ConceptState {
  conceptData: ConceptDataType[];
  stockData: StockDataType[];
}

@connect(
  ({
     conceptMonitor,
     loading,
   }: {
    conceptMonitor: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    conceptMonitor,
    loading: loading.effects['conceptMonitor/fetchConcepts'],
  }),
)
class Concept extends Component<ConceptProps, ConceptState> {
  // state: ConceptState = {
  //   currentTabKey: '',
  // };

  reqRef: number = 0;

  timeoutId: number = 0;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'conceptMonitor/fetchSecurityPools',
    });

    // dispatch({
    //   type: 'conceptMonitor/fetchConcepts',
    // });
  }

  componentWillUnmount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'conceptMonitor/clear',
    // });
  }

  handleTabChange = (key: string) => {
    console.log(key);
    const { dispatch } = this.props;
    dispatch({
      type: 'conceptMonitor/fetchSecurityPools',
    });
    // this.setState({
    //   currentTabKey: key,
    // });
  };

  handlePoolRefresh = (key: string) => {
    console.log(key);
    const { dispatch } = this.props;
    dispatch({
      type: 'conceptMonitor/fetchSecurityPools',
    });
    // this.setState({
    //   currentTabKey: key,
    // });
  };

  // refreshPieChart = (codes: []) => {
  //   codes = ['000001','600000'];
  //   console.log(codes);
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'conceptMonitor/fetchConcepts',
  //     payload: { codes, cids: [] },
  //   });
  // };

  render() {
    const { conceptMonitor, loading } = this.props;
    const { conceptData, poolData } = conceptMonitor;

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={null}>
            <PoolsCard
              poolData={poolData}
              handleTabChange={this.handleTabChange}
            />
          </Suspense>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Concept;
