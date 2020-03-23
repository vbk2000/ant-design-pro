import React, {useState} from 'react';
import {Button, Card, DatePicker, Tag, Badge} from 'antd';
import {LonghuTableItem, LonghuQueryParams} from '@/pages/longhu/data';
import {Table} from 'antd';
import moment, {Moment} from 'moment';
import {ColumnProps} from 'antd/es/table';
import {queryLonghu} from '@/pages/longhu/service';
import {useRequest} from '@umijs/hooks';

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD';

function getLonghuList(params: LonghuQueryParams): Promise<LonghuTableItem[]> {
  const result = queryLonghu(params)
    .then(res => res.data)
    .then(res => JSON.parse(res));
  console.log(result);
  return result;
}

const LonghuTable = () => {
  const [fromDate, setFromDate] = useState<Moment>(moment().subtract(3, 'days'));
  const [toDate, setToDate] = useState<Moment>(moment());

  const {data, loading, run, cancel} = useRequest(getLonghuList, {
    manual: true,
  });

  const columns: ColumnProps<LonghuTableItem>[] = [
    {
      title: '日期',
      dataIndex: 'date',
      render: val => moment(val).format(dateFormat),
      key: 'date',
      width: 100,
      fixed: 'left',
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
      width: 80,
      fixed: 'left',
      sorter: (a, b) => a.code - b.code,
    },
    {
      title: '简称',
      dataIndex: 'name',
      key: 'name',
      width: 80,
      fixed: 'left',
    },

    {
      title: '买入',
      dataIndex: 'buy_amt',
      width: 80,
    },
    {
      title: '卖出',
      dataIndex: 'sell_amt',
      width: 80,
    },
    {
      title: '净额',
      dataIndex: 'net_amt',
      width: 80,
    },
    {
      title: '总额',
      dataIndex: 'amount',
      width: 80,
    },
    {
      title: '价格',
      dataIndex: 'close',
      width: 80,
    },
    {
      title: '涨幅',
      dataIndex: 'pct_change',
      render: val => {
        let color = val > 0 ? 'red' : 'green';
        return <span style={{color: color}}>{val}%</span>
      }, //(`${val}%`)

      width: 80,
      sorter: (a, b) => a.pct_change - b.pct_change,
    },
    {
      title: '类型',
      dataIndex: 'period',
      key: 'period',
      render: val => (val === '1d' ? '1日' : '3日'),
      filters: [
        {text: '1日', value: '1d'},
        {text: '3日', value: '3d'},
      ],
      width: 80,
      onFilter: (value, record) => record.period.includes(value),
    },
    {
      title: '游资',
      dataIndex: 'buy_amt',
      width: 200,
    },
    {
      title: '概念',
      dataIndex: 'buy_amt',
      width: 200,
    },
    {
      title: '上榜原因',
      dataIndex: 'abnormal_name',
      key: 'abnormal_name',
      ellipsis: true,
    },
  ];

  function onRangePickerChange(dates: Moment[], dateStrings: string[]) {
    console.log(dates);
    if (dates !== null) {
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
        defaultValue={[moment(), moment().subtract(3, 'days')]}
        format={dateFormat}
        renderExtraFooter={() => '请选择龙虎榜日期范围，最大范围 3 个交易日'}
        // placeholder={['选择开始日期','选择结束日期']}
        dateRender={current => {
          return <div className="ant-picker-cell-inner">{current.date()}</div>;
        }}
        onChange={onRangePickerChange}
      />
      <Button
        onClick={() => {
          run({from: fromDate.format(dateFormat), to: toDate.format(dateFormat)});
        }}
      >
        刷新
      </Button>
      <Badge count={5}>
        <Tag color="gold">gold</Tag>
      </Badge>
      <Table<LonghuTableItem>
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{y: 480}}
        size="middle"
      />
    </Card>
  );
};

export default LonghuTable;
