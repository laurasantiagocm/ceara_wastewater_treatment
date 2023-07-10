import React from 'react';
import * as echarts from 'echarts';
import { useEffect } from 'react';

const LineChart = () => {
  useEffect(() => {
    const chartDom = document.getElementById('test');
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
  }, []);

  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  };

  return (
    <div id="test" style={{width: "300px", height: "300px"}}></div>
  )
}

export default LineChart;