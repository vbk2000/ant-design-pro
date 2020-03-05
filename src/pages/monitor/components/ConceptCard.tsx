import {Card, Icon, Table, Tabs, Tooltip} from 'antd';
import React from 'react';

import {groupBy} from 'lodash';
import {LimitUpDataType} from '../data.d';
import {ConceptTable} from './Tables/ConceptTable'

const {TabPane} = Tabs;

interface LimitUpTableProps {
  loading: boolean;
  handleCodesChange: (selectCodes: string[]) => void;
  dropdownGroup: React.ReactNode;
  limitUpData: LimitUpDataType[];
}

const ConceptCard = ({
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
  // console.log(filters);
  const columns = [
    // {
    //   title: '编号',
    //   dataIndex: 'concept_id',
    //   key: 'concept_id',
    //   width: 16,
    //   // render: (text: React.ReactNode) => <a href="/">{text}</a>,
    //   align: 'left',
    // },
    {
      title: '概念',
      dataIndex: 'concept_name',
      key: 'concept_name',
      width: 32,
      // render: (text: React.ReactNode) => <a href="/">{text}</a>,
      align: 'left',
    },
    {
      title: '股票数',
      dataIndex: 'stock_count',
      key: 'stock_count',
      width: 16,
      align: 'center',
      sorter: (a, b) => a.stock_count - b.stock_count,
      sortDirections: ['descend', 'ascend'],
    },
    // {
    //   title: '涨停',
    //   dataIndex: 'stock_count',
    //   key: 'stock_count',
    //   width: 16,
    //   align: 'center',
    //   sorter: (a, b) => a.stock_count - b.stock_count,
    //   sortDirections: ['descend', 'ascend'],
    // },
    {
      title: '>8%',
      dataIndex: 'pct_change_8',
      key: 'pct_change_8',
      width: 16,
      align: 'center',
      sorter: (a, b) => a.pct_change_8 - b.pct_change_8,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '>5%',
      dataIndex: 'pct_change_5',
      key: 'pct_change_5',
      width: 16,
      align: 'center',
      sorter: (a, b) => a.pct_change_5 - b.pct_change_5,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '>0%',
      dataIndex: 'pct_change_0',
      key: 'pct_change_0',
      width: 16,
      align: 'center',
      sorter: (a, b) => a.pct_change_0 - b.pct_change_0,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '<0%',
      dataIndex: 'pct_change_down',
      key: 'pct_change_down',
      width: 16,
      align: 'center',
      sorter: (a, b) => a.pct_change_down - b.pct_change_down,
      sortDirections: ['descend', 'ascend'],
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

      handleCodesChange(selectedCodes);
    },
  };
  return (
    <Card
      loading={loading}
      bordered={false}
      bodyStyle={{
        padding: 16,
      }}
      style={{
        height: '100%',
      }}
    >
      <Tabs>
        <TabPane tab="概念列表" key="limit_up">
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
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ConceptCard;
