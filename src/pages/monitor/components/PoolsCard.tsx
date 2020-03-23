import {Button, Card, Col, DatePicker, Row, Table, Tabs, Icon} from 'antd';
import {RangePickerValue} from 'antd/es/date-picker/interface';
import React from 'react';
import {useRequest} from '@umijs/hooks';
import {map} from 'lodash';
import {LimitUpDataType} from '../data.d';
import styles from '../style.less';

const {TabPane} = Tabs;

export interface PoolsCardProps {
  rangePickerValue: RangePickerValue;
  isActive: (key: 'today' | 'week' | 'month' | 'year') => string;
  poolData: LimitUpDataType[];
  conceptPieData: [];
  loading: boolean;
  handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  selectDate: (key: 'today' | 'week' | 'month' | 'year') => void;
  refreshPool: (poolName: string) => void;
  handlePoolRefresh: () => void;
  refreshPieChart: (codes: []) => void;
}


const PoolsCard = ({
                     poolData,
                     isActive,
                     loading,
                     handleTabChange,
                     refreshPool,
                     refreshPieChart,
                   }: PoolsCardProps) => {
  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
      width: 12,
      align: 'center',
    },
    {
      title: '代码',
      dataIndex: 'code',
      width: 32,
      align: 'center',
    },
    {
      title: '简称',
      dataIndex: 'name',
      key: 'name',
      width: 32,
      render: (text: React.ReactNode) => <a href="/">{text}</a>,
      align: 'center',
    },
    {
      title: '首次封板',
      dataIndex: 'first_time',
      width: 32,
      sorter: (
        a: {
          first_time: string;
        },
        b: {
          first_time: string;
        },
      ) => {
        const a1 = parseInt(a.first_time.replace(':', ''), 0);
        const b1 = parseInt(b.first_time.replace(':', ''), 0);
        return a1 - b1;
      },
      sortDirections: ['descend', 'ascend'],
      align: 'center',
    },
    {
      title: '最后封板',
      dataIndex: 'last_time',
      width: 32,
      sorter: (
        a: {
          first_time: string;
        },
        b: {
          first_time: string;
        },
      ) => {
        const a1 = parseInt(a.first_time.replace(':', ''), 0);
        const b1 = parseInt(b.first_time.replace(':', ''), 0);
        return a1 - b1;
      },
      sortDirections: ['descend', 'ascend'],
      align: 'center',
    },
    {
      title: '开板',
      dataIndex: 'break_times',
      width: 16,
      align: 'center',
      sorter: (
        a: {
          days: number;
        },
        b: {
          days: number;
        },
      ) => a.days - b.days,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '连板',
      dataIndex: 'days',
      width: 16,
      align: 'center',
      sorter: (
        a: {
          days: number;
        },
        b: {
          days: number;
        },
      ) => a.days - b.days,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '概念',
      dataIndex: 'plate',
      width: 32,
      align: 'center',
    },
    {
      title: '原因',
      dataIndex: 'title',
      key: 'title',
      width: 64,
      align: 'center',
    },
  ];

  let pieData: { legendData: string[], seriesData: {}[] };

  // const expandedRowRender = record => <p>{record.content}</p>;

  const {data, error} = useRequest(() => 'server/api/currentUser', {
    pollingInterval: 5000,
    pollingWhenHidden: false,
    refreshOnWindowFocus: true,
  });


  console.log(data)
  // @ts-ignore
  return (
    <Card
      loading={loading}
      bordered={false}
      bodyStyle={{
        padding: 16,
        height: 480,
      }}
    >
      {/* <div className={styles.salesCard}> */}
      <Tabs
        onChange={handleTabChange}
        tabBarExtraContent={
          <div className={styles.salesExtraWrap}>
            <div className={styles.salesExtra}>
              <Button type="primary" onClick={() => refreshPool('limit_up')}>
                刷新
              </Button>
              <Button onClick={() => refreshPieChart([])}>
                概念
              </Button>
            </div>
          </div>
        }
        size="large"
        tabBarStyle={{
          marginBottom: 24,
        }}
      >
        <TabPane tab="涨停池" key="limit_up">
          <Row type="flex">
            {/* <Col xl={16} lg={12} md={12} sm={24} xs={24}> */}
            <div className={styles.salesBar}>
              <Table<any>
                rowKey={record => record.index}
                size="small"
                columns={columns}
                dataSource={poolData}
                // expandedRowRender={expandedRowRender}
                pagination={false}
                scroll={{
                  y: 480,
                }} // rowSelection={rowSelection}
              />
            </div>
            {/* </Col> */}
            {/* <Col xl={8} lg={12} md={12} sm={24} xs={24}> */}
            {/*    <h4 className={styles.rankingTitle}>概念占比</h4> */}
            {/*    <Pie title="test" pieData={pieData}/> */}
            {/* </Col> */}
          </Row>
        </TabPane>
        {/* <TabPane tab="强势股" key="hotStocks"> */}
        {/*  <Row> */}
        {/*    <Col xl={16} lg={12} md={12} sm={24} xs={24}> */}
        {/*      <div className={styles.salesBar}> */}
        {/*        /!* <Bar height={292} title="访问量趋势" data={salesData} /> *!/ */}
        {/*      </div> */}
        {/*    </Col> */}
        {/*    <Col xl={8} lg={12} md={12} sm={24} xs={24}> */}
        {/*      <div className={styles.salesRank}> */}
        {/*        <h4 className={styles.rankingTitle}>概念占比</h4> */}
        {/*      </div> */}
        {/*    </Col> */}
        {/*  </Row> */}
        {/* </TabPane> */}
      </Tabs>
      {/* </div> */}
    </Card>
  );
};

export default PoolsCard;
