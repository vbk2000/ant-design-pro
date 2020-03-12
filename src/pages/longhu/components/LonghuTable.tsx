import React, { useState } from 'react';
import { Button, Card, DatePicker } from 'antd';
import { LonghuTableItem, LonghuQueryParams } from '@/pages/longhu/data';
import { Table } from 'antd';
import moment, {Moment} from 'moment';
import { ColumnProps } from 'antd/es/table';
import { queryLonghu } from '@/pages/longhu/service';
import { useRequest } from '@umijs/hooks';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

function getLonghuList(params: LonghuQueryParams): Promise<LonghuTableItem[]> {
  const result = queryLonghu(params)
    .then(res => res.data)
    .then(res => JSON.parse(res));
  console.log(result);
  return result;
}

const LonghuTable = () => {
  const [fromDate, setFromDate] = useState<Moment>(moment());
  const [toDate, setToDate] = useState<Moment>(moment());

  const { data, loading, run, cancel } = useRequest(getLonghuList, {
    manual: true,
  });

  const columns: ColumnProps<LonghuTableItem>[] = [
    {
      title: '日期',
      dataIndex: 'date',
      render: val => moment(val).format(dateFormat),
      key: 'date',
    },
    {
      title: '代码/名称',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '类型',
      dataIndex: 'period',
      key: 'period',
      render: val => (val === '1d' ? '1天' : '3天'),
    },
    {
      title: '买入',
      dataIndex: 'buy_amt',
    },
    {
      title: '卖出',
      dataIndex: 'sell_amt',
    },
    {
      title: '净额',
      dataIndex: 'net_amt',
    },
    {
      title: '上榜原因',
      dataIndex: 'abnormal_name',
      key: 'abnormal_name',
    },
    // {
    //   title: '类型',
    //   dataIndex: 'type',
    // },
  ];

  function onRangePickerChange(dates: Moment[], dateStrings: string[]) {
    console.log(dates);
    if(dates !== null){
      // console.log('From: ', dates[0], ', to: ', dates[1]);
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      setFromDate(dates[0]);
      setToDate(dates[1]);
    }
  }

  console.log(data);
  return (
    <Card>
      <RangePicker
        defaultValue={[moment(), moment().subtract(5, 'days')]}
        format={dateFormat}
        renderExtraFooter={() => '请选择龙虎榜日期范围，最大范围 5 个交易日'}
        // placeholder={['选择开始日期','选择结束日期']}
        dateRender={current => {
          return <div className="ant-picker-cell-inner">{current.date()}</div>;
        }}
        onChange={onRangePickerChange}
      />
      <Button
        onClick={() => {
          run({from: fromDate.format(dateFormat), to: toDate.format(dateFormat) });
        }}
      >
        刷新
      </Button>
      <Table<LonghuTableItem> columns={columns} dataSource={data} />
    </Card>
  );
};

export default LonghuTable;
