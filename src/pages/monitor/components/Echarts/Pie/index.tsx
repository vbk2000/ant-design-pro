import * as React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';

export interface PieProps {
  title: {};
  pieData: {};
}

const Pie = ({ title, pieData }: PieProps) => {
  const getOption = () => ({
    title: {
      // text: '',
      // subtext: '纯属虚构',
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      type: 'plain',
      orient: 'horizontal',
      bottom: 100,
      data: pieData.legendData,
      // padding: [-20, 10],
      y: 'bottom',
    },
    series: [
      {
        // name: '涨停概念',
        type: 'pie',
        radius: '55%',
        center: ['50%', '35%'],
        data: pieData.seriesData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });

  return (
    <ReactEcharts
      option={getOption()}
      theme="macarons"
      style={{
        height: '100%',
        left: '100',
      }}
    />
  );
};

export default Pie;
