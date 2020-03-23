import { Card, Icon, Radio, Table, Tooltip, Tabs } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
// import { VisitDataType } from '../data.d';
import styles from '../style.less';


const ConceptStocks = ({
                         dropdownGroup,
                         salesType,
                         loading,
                         // salesPieData,
                         handleChangeSalesType,
                       }: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  // salesPieData: VisitDataType[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => {
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
      title: '操作',
      key: 'operation',
      // render: (record) => <Icon type="line-chart" style={{ fontSize: '16px', color: '#08c' }}/>,
      width: 64,
    },
  ];


  return (
    <Card
      loading={loading}
      // className={styles.salesCard}
      bordered={false}
      title="概念股票"
      style={{
        height: '100%',
      }}
      bodyStyle={{
        padding: 16,
      }}

      // extra={
      //   <div className={styles.salesCardExtra}>
      //     {dropdownGroup}
      //     <div className={styles.salesTypeRadio}>
      //       <Radio.Group value={salesType} onChange={handleChangeSalesType}>
      //         <Radio.Button value="all">全部渠道</Radio.Button>
      //         <Radio.Button value="online">线上</Radio.Button>
      //         <Radio.Button value="stores">门店</Radio.Button>
      //       </Radio.Group>
      //     </div>
      //   </div>
      // }
    >
        <Table<any>
          rowKey={record => record.index}
          size="small"
          columns={columns}
          pagination={false}
          scroll={{
            y: 480,
          }} // rowSelection={rowSelection}
        />
    </Card>
  );
}

export default ConceptStocks;
