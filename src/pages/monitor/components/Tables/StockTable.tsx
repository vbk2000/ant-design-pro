import { Card, Col, Icon, Row, Table, Tooltip } from 'antd';
import React from 'react';

import { groupBy, map, join, find, isNil, concat } from 'lodash';
import { LimitUpDataType, SearchDataType, VisitDataType } from '../../data';


interface LimitUpTableProps {
  loading: boolean;
  handleCodesChange: (selectCodes: string[]) => void;
  dropdownGroup: React.ReactNode;
  limitUpData: LimitUpDataType[];
}

const StockTable = ({
                      loading,
                      handleCodesChange,
                      limitUpData,
                      dropdownGroup,
                    }: LimitUpTableProps) => {
  const arrayByPlate = groupBy(limitUpData, 'plate');
  const filters = Object.keys(arrayByPlate)
    .sort((a, b) => arrayByPlate[b].length - arrayByPlate[a].length)
    .map(key => ({
      text: key,
      value: key,
    }));
  console.log(filters);
  const columns = [
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
      width: 64,
      align: 'center',
    },
    {
      title: '简称',
      dataIndex: 'name',
      key: 'name',
      width: 64,
      render: (text: React.ReactNode) => <a href="/">{text}</a>,
      align: 'center',
    },
    {
      title: '触板',
      dataIndex: 'first_time',
      key: 'first_time',
      width: 64,
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
      title: '封板',
      dataIndex: 'last_time',
      key: 'last_time',
      sorter: (
        a: {
          last_time: string;
        },
        b: {
          last_time: string;
        },
      ) => {
        const a1 = parseInt(a.last_time.replace(':', ''), 0);
        const b1 = parseInt(b.last_time.replace(':', ''), 0);
        return a1 - b1;
      },
      sortDirections: ['descend', 'ascend'],
      width: 64,
      align: 'center',
    }, // {
    {
      title: '连板',
      dataIndex: 'days',
      key: 'days',
      width: 64,
      sorter: (a, b) => a.days - b.days,
      sortDirections: ['descend', 'ascend'],
      align: 'center',
    },
    {
      title: '概念',
      dataIndex: 'plate',
      key: 'plate',
      width: 160,
      filters,
      onFilter: (value, record) => record.plate.includes(value),
    },
    {
      title: '操作',
      key: 'operation',
      // render: (record) => <Icon type="line-chart" style={{ fontSize: '16px', color: '#08c' }}/>,
      render: (text, record) => (
        <a onClick={() => handleUpdateAddCode(record)}>
          <Tooltip placement="topRight" title="叠加分时图">
            <Icon
              type="line-chart"
              style={{
                // fontSize: '16px',
                color: '#08c',
              }}
            />
          </Tooltip>
        </a>
      ),
      width: 64,
    },
  ];

  function handleUpdateAddCode(record: any) {
    handleCodesChange([record.code]);
  }

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: {}[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      // @ts-ignore
      const selectedCodes = selectedRows.map(x => x.code);
      console.log(selectedCodes);
      console.log(selectedRowKeys);
      handleCodesChange(selectedCodes);
    },
  };
  return (
    <Card
      loading={loading}
      headStyle={{ height: 8 }}
      bordered={false}
      title="概念列表"
      type="inner"
      extra={dropdownGroup}
      style={{
        height: '100%',
      }}
    >
      <Table<any>
        rowKey={record => record.index}
        size="small"
        columns={columns}
        dataSource={limitUpData}
        pagination={false}
        scroll={{
          y: 480,
        }} // rowSelection={rowSelection}
      />
    </Card>
  );
};

export default StockTable;
